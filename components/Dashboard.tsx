
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { api, FullScoreboardData, PlayerCombatStats, SquadMember, TeamData } from '../services/apiService.ts';

// --- Icons & Config ---

const ROLE_ICONS: Record<string, React.ReactNode> = {
  'armycommander': <span title="Commander">⭐</span>,
  'officer': <span title="Squad Leader">⚡</span>,
  'spotter': <span title="Spotter">🔭</span>,
  'sniper': <span title="Sniper">🎯</span>,
  'tankcommander': <span title="Tank Commander">🛡️</span>,
  'crewman': <span title="Crewman">⚙️</span>,
  'machinegunner': <span title="MG">🔥</span>,
  'antitank': <span title="Anti-Tank">🚀</span>,
  'medic': <span title="Medic">🚑</span>,
  'engineer': <span title="Engineer">🔧</span>,
  'support': <span title="Support">📦</span>,
  'assault': <span title="Assault">💥</span>,
  'automoticrifleman': <span title="Auto Rifleman">🔫</span>,
  'rifleman': <span title="Rifleman">⚔️</span>
};

const getRoleIcon = (role: string) => ROLE_ICONS[role] || <span title={role}>•</span>;

const formatTime = (seconds: number) => {
  if (!seconds) return "0m";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

// --- Helper Functions ---

const resolveTeam = (playerId: string, teamView: FullScoreboardData['team_view']): 'allies' | 'axis' | 'unknown' => {
  // Check Allies
  if (teamView.allies.commander?.player_id === playerId) return 'allies';
  for (const squad of Object.values(teamView.allies.squads || {})) {
    if (squad.members.some(m => m.player_id === playerId)) return 'allies';
  }
  if (teamView.allies.unassigned.some(m => m.player_id === playerId)) return 'allies';

  // Check Axis
  if (teamView.axis.commander?.player_id === playerId) return 'axis';
  for (const squad of Object.values(teamView.axis.squads || {})) {
    if (squad.members.some(m => m.player_id === playerId)) return 'axis';
  }
  if (teamView.axis.unassigned.some(m => m.player_id === playerId)) return 'axis';

  return 'unknown';
};

// --- Components ---

const Dashboard: React.FC = () => {
  const [data, setData] = useState<FullScoreboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'squads' | 'table'>('squads');
  
  // Filter & Sort State
  const [minPlaytime, setMinPlaytime] = useState(0); // Minutes
  const [filterTeam, setFilterTeam] = useState<'all' | 'allies' | 'axis'>('all');
  const [sortConfig, setSortConfig] = useState<{ key: keyof PlayerCombatStats | 'name'; dir: 'asc' | 'desc' }>({ key: 'kills', dir: 'desc' });
  const [expandedPlayer, setExpandedPlayer] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      const result = await api.getLiveStats();
      if (result) {
        setData(result);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error("Dashboard Update Failed", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, [loadData]);

  // --- Aggregation & Processing ---

  const processedStats = useMemo(() => {
    const emptyTeamStats = { kills: 0, deaths: 0, combat: 0, support: 0, count: 0 };
    const emptyHighlights = { maxKills: 0, maxSupport: 0, maxLife: 0 };

    if (!data) return { 
      players: [], 
      highlights: emptyHighlights, 
      teamStats: { allies: { ...emptyTeamStats }, axis: { ...emptyTeamStats } } 
    };

    let maxKills = 0;
    let maxSupport = 0;
    let maxLife = 0;

    // Team Aggregations
    const teamStats = {
      allies: { kills: 0, deaths: 0, combat: 0, support: 0, count: 0 },
      axis: { kills: 0, deaths: 0, combat: 0, support: 0, count: 0 }
    };

    const enrichedPlayers = data.stats.map(stat => {
      const team = resolveTeam(stat.player_id, data.team_view);
      
      // Update Max Values for Highlights
      if (stat.kills > maxKills) maxKills = stat.kills;
      if (stat.support > maxSupport) maxSupport = stat.support;
      if ((stat.longest_life_secs || 0) > maxLife) maxLife = stat.longest_life_secs || 0;

      // Update Team Stats
      if (team !== 'unknown') {
        teamStats[team].kills += stat.kills;
        teamStats[team].deaths += stat.deaths;
        teamStats[team].combat += stat.combat;
        teamStats[team].support += stat.support;
        teamStats[team].count += 1;
      }

      return { ...stat, team };
    });

    return { 
      players: enrichedPlayers, 
      highlights: { maxKills, maxSupport, maxLife },
      teamStats
    };
  }, [data]);

  const sortedAndFilteredPlayers = useMemo(() => {
    let filtered = processedStats.players.filter(p => {
      if (filterTeam !== 'all' && p.team !== filterTeam) return false;
      if ((p.time_seconds / 60) < minPlaytime) return false;
      return true;
    });

    return filtered.sort((a, b) => {
      const valA = a[sortConfig.key as keyof typeof a];
      const valB = b[sortConfig.key as keyof typeof b];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortConfig.dir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      // Numeric sort
      const numA = Number(valA || 0);
      const numB = Number(valB || 0);
      return sortConfig.dir === 'asc' ? numA - numB : numB - numA;
    });
  }, [processedStats.players, filterTeam, minPlaytime, sortConfig]);

  if (loading && !data) return <LoadingScreen />;

  const gs = data?.gamestate;
  const mapName = typeof gs?.current_map === 'object' ? gs.current_map.pretty_name : gs?.current_map;

  return (
    <div className="min-h-screen bg-[var(--bg-deep)] text-[var(--text-main)] pt-24 pb-20 px-4 font-inter">
      <div className="max-w-[1800px] mx-auto space-y-8">
        
        {/* --- Header Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Match Info */}
          <div className="lg:col-span-2 glass-card border-t-4 border-t-[var(--accent)] p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-50">
               <span className="text-[10px] uppercase tracking-[0.3em] font-mono border border-white/10 px-2 py-1">Live Feed</span>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 h-full">
              <div className="text-center md:text-left z-10">
                <span className="block text-[var(--accent)] text-xs font-black tracking-[0.4em] uppercase mb-2">Einsatzgebiet</span>
                <h1 className="text-4xl md:text-5xl font-oswald font-bold text-white uppercase italic tracking-tight">{mapName}</h1>
                <div className="mt-4 flex items-center gap-4 text-sm font-mono text-zinc-400">
                   <span className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> {gs?.time_remaining}</span>
                   <span className="opacity-30">|</span>
                   <span>{processedStats.players.length} Spieler Aktiv</span>
                </div>
              </div>

              {/* Score Big Display */}
              <div className="flex items-center gap-8 md:gap-16 z-10">
                 <div className="text-center">
                    <span className="block text-5xl md:text-7xl font-oswald font-bold text-blue-500">{gs?.allied_score}</span>
                    <span className="text-[10px] uppercase tracking-widest text-blue-300">Allies</span>
                 </div>
                 <div className="h-16 w-px bg-white/10 skew-x-12"></div>
                 <div className="text-center">
                    <span className="block text-5xl md:text-7xl font-oswald font-bold text-red-500">{gs?.axis_score}</span>
                    <span className="text-[10px] uppercase tracking-widest text-red-300">Axis</span>
                 </div>
              </div>
            </div>
            {/* Background Decor */}
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-[80px]"></div>
          </div>

          {/* Team Comparison Stats */}
          <div className="glass-card p-6 flex flex-col justify-center space-y-6">
             <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">Truppen-Vergleich</h3>
             <StatBar label="Kills" allied={processedStats.teamStats.allies.kills} axis={processedStats.teamStats.axis.kills} />
             <StatBar label="Combat Score" allied={processedStats.teamStats.allies.combat} axis={processedStats.teamStats.axis.combat} />
             <StatBar label="Support" allied={processedStats.teamStats.allies.support} axis={processedStats.teamStats.axis.support} />
             <div className="flex justify-between text-[10px] font-mono text-zinc-600 pt-2 border-t border-white/5">
                <span>Avg K/D: {(processedStats.teamStats.allies.kills / (processedStats.teamStats.allies.deaths || 1)).toFixed(2)}</span>
                <span>Avg K/D: {(processedStats.teamStats.axis.kills / (processedStats.teamStats.axis.deaths || 1)).toFixed(2)}</span>
             </div>
          </div>
        </div>

        {/* --- View Controls --- */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-white/10 pb-4 sticky top-20 bg-[var(--bg-deep)]/95 backdrop-blur z-40">
          <div className="flex gap-2 bg-black/30 p-1 rounded-sm border border-white/5">
            <button 
              onClick={() => setViewMode('squads')}
              className={`px-6 py-2 text-xs font-oswald uppercase tracking-widest transition-all ${viewMode === 'squads' ? 'bg-[var(--primary)] text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Taktische Ansicht
            </button>
            <button 
              onClick={() => setViewMode('table')}
              className={`px-6 py-2 text-xs font-oswald uppercase tracking-widest transition-all ${viewMode === 'table' ? 'bg-[var(--accent)] text-[var(--bg-deep)] font-bold shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Intel Datenbank
            </button>
          </div>

          {viewMode === 'table' && (
            <div className="flex gap-4 items-center overflow-x-auto max-w-full">
              <select 
                value={filterTeam} 
                onChange={(e) => setFilterTeam(e.target.value as any)}
                className="bg-black/40 border border-white/10 text-xs text-zinc-300 px-3 py-2 outline-none focus:border-[var(--accent)]"
              >
                <option value="all">Alle Fraktionen</option>
                <option value="allies">Allied Forces</option>
                <option value="axis">Axis Forces</option>
              </select>
              <select 
                value={minPlaytime}
                onChange={(e) => setMinPlaytime(Number(e.target.value))}
                className="bg-black/40 border border-white/10 text-xs text-zinc-300 px-3 py-2 outline-none focus:border-[var(--accent)]"
              >
                <option value="0">Alle Spielzeiten</option>
                <option value="15">> 15 Minuten</option>
                <option value="30">> 30 Minuten</option>
                <option value="60">> 1 Stunde</option>
              </select>
            </div>
          )}
        </div>

        {/* --- Main Content --- */}
        {viewMode === 'squads' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TeamColumn 
              teamData={data!.team_view.allies} 
              allStats={data!.stats} 
              teamName="Allied Forces" 
              theme="blue" 
              highlights={processedStats.highlights}
            />
            <TeamColumn 
              teamData={data!.team_view.axis} 
              allStats={data!.stats} 
              teamName="Axis Forces" 
              theme="red" 
              highlights={processedStats.highlights}
            />
          </div>
        ) : (
          <div className="overflow-x-auto glass-card border border-white/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/40 text-[9px] uppercase tracking-[0.2em] text-zinc-500 border-b border-white/10">
                  <SortHeader label="Soldat" sortKey="name" currentSort={sortConfig} onSort={setSortConfig} className="pl-6 py-4" />
                  <SortHeader label="Fraktion" sortKey="team" currentSort={sortConfig} onSort={setSortConfig} />
                  <SortHeader label="Rolle" sortKey="role" currentSort={sortConfig} onSort={setSortConfig} />
                  <SortHeader label="Kills" sortKey="kills" currentSort={sortConfig} onSort={setSortConfig} className="text-right" />
                  <SortHeader label="Deaths" sortKey="deaths" currentSort={sortConfig} onSort={setSortConfig} className="text-right" />
                  <SortHeader label="K/D" sortKey="kill_death_ratio" currentSort={sortConfig} onSort={setSortConfig} className="text-right text-[var(--accent)]" />
                  <SortHeader label="Combat" sortKey="combat" currentSort={sortConfig} onSort={setSortConfig} className="text-right" />
                  <SortHeader label="Support" sortKey="support" currentSort={sortConfig} onSort={setSortConfig} className="text-right" />
                  <SortHeader label="Defense" sortKey="defense" currentSort={sortConfig} onSort={setSortConfig} className="text-right" />
                  <SortHeader label="Zeit" sortKey="time_seconds" currentSort={sortConfig} onSort={setSortConfig} className="text-right pr-6" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {sortedAndFilteredPlayers.map((player, idx) => (
                  <React.Fragment key={player.player_id + idx}>
                    <tr 
                      onClick={() => setExpandedPlayer(expandedPlayer === player.player_id ? null : player.player_id)}
                      className={`hover:bg-white/5 transition-colors cursor-pointer group ${expandedPlayer === player.player_id ? 'bg-white/5' : ''}`}
                    >
                      <td className="pl-6 py-3">
                         <div className="flex items-center gap-3">
                            <span className={`font-bold font-oswald text-sm ${player.team === 'allies' ? 'text-blue-300' : player.team === 'axis' ? 'text-red-300' : 'text-zinc-400'}`}>
                              {player.player}
                            </span>
                            <Badges player={player} highlights={processedStats.highlights} />
                         </div>
                      </td>
                      <td className="py-3 text-xs text-zinc-500 uppercase">{player.team}</td>
                      <td className="py-3 text-xs text-zinc-400">{getRoleIcon((player as any).role || 'rifleman')}</td>
                      <td className="py-3 text-right font-mono text-zinc-300">{player.kills}</td>
                      <td className="py-3 text-right font-mono text-zinc-500">{player.deaths}</td>
                      <td className="py-3 text-right font-mono text-[var(--accent)] font-bold">{player.kill_death_ratio.toFixed(1)}</td>
                      <td className="py-3 text-right font-mono text-zinc-400">{player.combat}</td>
                      <td className="py-3 text-right font-mono text-zinc-400">{player.support}</td>
                      <td className="py-3 text-right font-mono text-zinc-400">{player.defense}</td>
                      <td className="pr-6 py-3 text-right font-mono text-zinc-500 text-xs">{formatTime(player.time_seconds)}</td>
                    </tr>
                    {expandedPlayer === player.player_id && (
                      <tr>
                        <td colSpan={10} className="bg-black/40 p-0">
                           <WeaponStats stats={player} />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="text-center pt-12 border-t border-white/5">
           <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
             Datenaktualisierung: {lastUpdated.toLocaleTimeString()} // Synchronisiert mit HLL RCON
           </p>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Components ---

const StatBar = ({ label, allied, axis }: { label: string, allied: number, axis: number }) => {
  const total = allied + axis || 1;
  const alliedPct = (allied / total) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1 text-zinc-400">
        <span>{allied.toLocaleString()}</span>
        <span>{label}</span>
        <span>{axis.toLocaleString()}</span>
      </div>
      <div className="h-2 bg-black/50 flex w-full overflow-hidden">
        <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${alliedPct}%` }}></div>
        <div className="h-full bg-red-600 flex-grow transition-all duration-1000"></div>
      </div>
    </div>
  );
};

const LoadingScreen = () => (
  <div className="min-h-screen bg-[var(--bg-deep)] flex items-center justify-center pt-20">
    <div className="text-center space-y-6">
      <div className="relative w-24 h-24 mx-auto">
        <div className="absolute inset-0 border-4 border-[var(--primary)]/30 rounded-full animate-ping"></div>
        <div className="absolute inset-2 border-4 border-t-[var(--accent)] border-r-[var(--accent)] border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
      <div className="font-oswald text-[var(--accent)] tracking-[0.5em] uppercase animate-pulse italic text-sm">
        Verbindung wird hergestellt...
      </div>
    </div>
  </div>
);

// --- Squad View Components ---

const TeamColumn = ({ teamData, allStats, teamName, theme, highlights }: any) => {
  const isBlue = theme === 'blue';
  const borderColor = isBlue ? 'border-blue-500/30' : 'border-red-500/30';
  const headerBg = isBlue ? 'bg-blue-900/20' : 'bg-red-900/20';
  const textColor = isBlue ? 'text-blue-400' : 'text-red-400';

  const findStats = (id: string) => allStats.find((s: any) => s.player_id === id);

  return (
    <div className="flex flex-col space-y-4">
      {/* Team Header */}
      <div className={`p-4 border-y border-x ${borderColor} ${headerBg} backdrop-blur-sm flex justify-between items-center`}>
        <h2 className={`font-oswald text-2xl font-black italic tracking-tighter ${textColor}`}>{teamName}</h2>
        <span className="text-xs font-mono font-bold tracking-widest opacity-60">INFANTRY & ARMOR</span>
      </div>

      {/* Commander */}
      {teamData.commander && (
        <div className={`border ${borderColor} bg-black/20 p-4 relative overflow-hidden group`}>
           <div className={`absolute left-0 top-0 bottom-0 w-1 ${isBlue ? 'bg-blue-500' : 'bg-red-500'}`}></div>
           <div className="text-[9px] uppercase tracking-[0.3em] font-black mb-2 opacity-50 flex items-center gap-2">
              <span>⭐</span> Oberkommando
           </div>
           <PlayerRow 
             player={teamData.commander} 
             stats={findStats(teamData.commander.player_id)} 
             roleIcon={ROLE_ICONS['armycommander']}
             highlights={highlights}
           />
        </div>
      )}

      {/* Squads */}
      <div className="space-y-4">
        {Object.values(teamData.squads || {}).map((squad: any, idx: number) => {
          // Squad Aggregation
          const squadKills = squad.members.reduce((acc: number, m: any) => acc + (findStats(m.player_id)?.kills || 0), 0);
          const squadCombat = squad.members.reduce((acc: number, m: any) => acc + (findStats(m.player_id)?.combat || 0), 0);
          
          return (
            <div key={idx} className={`border border-white/5 bg-black/20 hover:border-white/10 transition-colors`}>
              {/* Squad Header */}
              <div className="bg-white/5 px-3 py-2 flex justify-between items-center border-b border-white/5">
                 <div className="flex items-center gap-3">
                   <span className="text-sm opacity-70">{squad.type === 'armor' ? '🛡️' : squad.type === 'recon' ? '🔭' : '⚔️'}</span>
                   <span className={`font-oswald font-bold uppercase tracking-wider text-sm ${textColor}`}>{squad.squad_name}</span>
                 </div>
                 <div className="flex gap-4 text-[9px] font-mono text-zinc-500">
                    <span title="Squad Kills">K: {squadKills}</span>
                    <span title="Squad Combat Score">C: {squadCombat}</span>
                 </div>
              </div>
              {/* Members */}
              <div className="divide-y divide-white/5">
                {squad.members.map((member: any) => (
                  <div key={member.player_id} className="px-3 py-1.5">
                    <PlayerRow 
                      player={member} 
                      stats={findStats(member.player_id)} 
                      roleIcon={getRoleIcon(member.role)}
                      highlights={highlights}
                      compact
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Unassigned */}
      {teamData.unassigned.length > 0 && (
         <div className="opacity-50 border border-white/5 p-4">
            <h4 className="text-[10px] uppercase tracking-widest mb-2 font-bold">Ohne Zuordnung</h4>
            <div className="space-y-2">
              {teamData.unassigned.map((m: any) => (
                <div key={m.player_id} className="text-xs text-zinc-500">{m.name}</div>
              ))}
            </div>
         </div>
      )}
    </div>
  );
};

const PlayerRow = ({ player, stats, roleIcon, highlights, compact }: any) => {
  const [showWeapons, setShowWeapons] = useState(false);

  return (
    <div className="group">
      <div 
        onClick={() => setShowWeapons(!showWeapons)}
        className="flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-5 text-center text-xs opacity-70">{roleIcon}</div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className={`font-bold truncate ${compact ? 'text-xs text-zinc-300' : 'text-sm text-white'}`}>
                {player.name}
              </span>
              <Badges player={stats} highlights={highlights} compact={compact} />
              {player.is_vip && <span className="text-[8px] bg-[var(--accent)] text-black px-1 font-bold rounded">VIP</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-right shrink-0">
          <div className="w-8">
            {!compact && <span className="block text-[7px] uppercase text-zinc-600">Kills</span>}
            <span className="block font-mono text-zinc-300 text-xs">{stats?.kills ?? '-'}</span>
          </div>
          <div className="w-8">
            {!compact && <span className="block text-[7px] uppercase text-zinc-600">Deaths</span>}
            <span className="block font-mono text-zinc-500 text-xs">{stats?.deaths ?? '-'}</span>
          </div>
          {!compact && (
             <div className="w-10">
                <span className="block text-[7px] uppercase text-zinc-600">Score</span>
                <span className="block font-mono text-[var(--accent)] text-xs">{stats?.combat ?? '-'}</span>
             </div>
          )}
        </div>
      </div>
      
      {/* Weapon Dropdown in Squad View */}
      {showWeapons && stats && (
         <div className="mt-2 pl-8 pb-2">
           <WeaponStats stats={stats} />
         </div>
      )}
    </div>
  );
};

const WeaponStats = ({ stats }: { stats: PlayerCombatStats }) => {
  if (!stats.weapons || Object.keys(stats.weapons).length === 0) return <div className="text-xs text-zinc-600 italic p-4">Keine Waffendaten verfügbar</div>;
  
  const sortedWeapons = Object.entries(stats.weapons).sort((a, b) => b[1] - a[1]);

  return (
    <div className="p-4 bg-black/20 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
      <div>
        <h5 className="text-[var(--accent)] uppercase tracking-wider text-[10px] mb-2 font-bold border-b border-white/10 pb-1">Waffen Kills</h5>
        <div className="space-y-1">
          {sortedWeapons.map(([weapon, count]) => (
            <div key={weapon} className="flex justify-between text-zinc-300">
              <span>{weapon}</span>
              <span className="font-mono">{count}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h5 className="text-red-400 uppercase tracking-wider text-[10px] mb-2 font-bold border-b border-white/10 pb-1">Eliminiert durch</h5>
        <div className="space-y-1">
          {Object.entries(stats.death_by || {})
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([weapon, count]) => (
            <div key={weapon} className="flex justify-between text-zinc-400">
              <span>{weapon}</span>
              <span className="font-mono">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Badges = ({ player, highlights, compact }: any) => {
  if (!player) return null;
  
  const badges = [];
  
  if (player.kills >= highlights.maxKills && player.kills > 5) {
    badges.push({ icon: '💀', title: 'Top Killer', color: 'text-red-500' });
  }
  if (player.support >= highlights.maxSupport && player.support > 100) {
    badges.push({ icon: '📦', title: 'Logistik Meister', color: 'text-blue-400' });
  }
  if (player.kill_death_ratio > 3.0 && player.kills > 10) {
    badges.push({ icon: '🎯', title: 'Scharfschütze (K/D > 3)', color: 'text-[var(--accent)]' });
  }
  if (player.longest_life_secs >= highlights.maxLife && player.longest_life_secs > 300) {
    badges.push({ icon: '⛺', title: 'Überlebenskünstler', color: 'text-green-400' });
  }

  if (badges.length === 0) return null;

  return (
    <div className="flex gap-1">
      {badges.map((b, i) => (
        <span key={i} title={b.title} className={`${compact ? 'text-[10px]' : 'text-xs'} ${b.color} cursor-help`}>
          {b.icon}
        </span>
      ))}
    </div>
  );
};

const SortHeader = ({ label, sortKey, currentSort, onSort, className = "" }: any) => {
  const active = currentSort.key === sortKey;
  return (
    <th 
      className={`cursor-pointer hover:text-white transition-colors select-none ${className}`}
      onClick={() => onSort({ key: sortKey, dir: active && currentSort.dir === 'desc' ? 'asc' : 'desc' })}
    >
      <div className={`flex items-center gap-1 ${className.includes('right') ? 'justify-end' : ''}`}>
        {label}
        <span className={`text-[8px] ${active ? 'opacity-100' : 'opacity-20'}`}>
           {active && currentSort.dir === 'asc' ? '▲' : '▼'}
        </span>
      </div>
    </th>
  );
};

export default Dashboard;
