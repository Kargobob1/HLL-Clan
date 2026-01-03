
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { api, FullScoreboardData, PlayerCombatStats, Squad, SquadMember, TeamData } from '../services/apiService.ts';

const ROLES_ICON_MAP: Record<string, string> = {
  'armycommander': '⭐',
  'officer': '⚡',
  'rifleman': '⚔️',
  'assault': '💥',
  'automoticrifleman': '🔫',
  'medic': '🚑',
  'support': '📦',
  'heavygunner': '🔥',
  'machinegunner': '🔥',
  'antitank': '🚀',
  'engineer': '🔧',
  'tankcommander': '🛡️',
  'crewman': '⚙️',
  'spotter': '🔭',
  'sniper': '🎯'
};

const Dashboard: React.FC = () => {
  const [data, setData] = useState<FullScoreboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'allies' | 'axis' | 'server'>('server');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const loadData = useCallback(async () => {
    try {
      const result = await api.getLiveStats();
      if (result) {
        setData(result);
        setError(null);
        setLastUpdated(new Date());
      }
    } catch (err: any) {
      setError(err.message || "Verbindung zur Kommandozentrale unterbrochen.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const timer = setInterval(loadData, 15000); // 15s Refresh rate to respect cache
    return () => clearInterval(timer);
  }, [loadData]);

  // Helper to find stats for a specific player ID
  const getStats = useCallback((playerId: string, playerName: string) => {
    if (!data?.stats) return undefined;
    // Try matching by ID first, then Name
    return data.stats.find(s => s.player_id === playerId) || 
           data.stats.find(s => s.player === playerName);
  }, [data]);

  const gs = data?.gamestate;
  const currentMap = typeof gs?.current_map === 'object' ? gs.current_map.pretty_name : (gs?.current_map || 'Sektor Unbekannt');

  if (loading && !data) return (
    <div className="min-h-screen bg-[var(--bg-deep)] flex items-center justify-center pt-20">
      <div className="text-center space-y-6">
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 border-4 border-[var(--primary)]/30 rounded-full animate-ping"></div>
          <div className="absolute inset-2 border-4 border-t-[var(--accent)] border-r-[var(--accent)] border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center font-black text-white text-xs">LOADING</div>
        </div>
        <div className="font-oswald text-[var(--accent)] tracking-[0.5em] uppercase animate-pulse italic text-sm">
          Lade Einsatzdaten...
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--bg-deep)] pt-28 pb-20 px-2 md:px-8 font-inter relative">
      <div className="max-w-[1600px] mx-auto space-y-6 relative z-10">
        
        {/* Error Banner */}
        {error && (
          <div className="bg-red-950/50 border border-red-500/30 p-4 animate-reveal flex justify-between items-center rounded-sm">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <span className="text-red-200 text-sm font-mono">{error}</span>
            </div>
            <button onClick={loadData} className="text-xs border border-red-500/40 px-3 py-1 text-red-300 hover:bg-red-900/50 uppercase">Retry</button>
          </div>
        )}

        {/* --- Top Stats Bar (Server Info) --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
           <ScoreCard label="Allies Score" value={gs?.allied_score ?? 0} team="allies" />
           <ScoreCard label="Axis Score" value={gs?.axis_score ?? 0} team="axis" />
           <div className="col-span-2 lg:col-span-1 glass-card p-4 border-l-2 border-l-[var(--accent)] flex flex-col justify-center">
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-black">Aktueller Einsatz</span>
              <span className="text-lg md:text-xl font-oswald text-white truncate">{currentMap}</span>
           </div>
           <div className="col-span-2 lg:col-span-1 glass-card p-4 border-r-2 border-r-[var(--accent)] flex flex-col justify-center items-end text-right">
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-black">Verbleibende Zeit</span>
              <span className={`text-xl md:text-2xl font-mono tracking-wider ${gs?.time_remaining?.startsWith('00:') ? 'text-red-500 animate-pulse' : 'text-[var(--accent)]'}`}>
                {gs?.time_remaining || "--:--:--"}
              </span>
           </div>
        </div>

        {/* --- Mobile Tabs --- */}
        <div className="lg:hidden flex border-b border-white/10 mb-4 sticky top-20 z-50 bg-[var(--bg-deep)]/95 backdrop-blur">
          <TabButton active={activeTab === 'server'} onClick={() => setActiveTab('server')} label="Server Info" />
          <TabButton active={activeTab === 'allies'} onClick={() => setActiveTab('allies')} label="Allied Forces" color="text-blue-400" />
          <TabButton active={activeTab === 'axis'} onClick={() => setActiveTab('axis')} label="Axis Forces" color="text-red-400" />
        </div>

        {/* --- Main Content Area --- */}
        {data && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Allies Column */}
            <div className={`${(activeTab === 'allies' || activeTab === 'server') ? 'block' : 'hidden'} lg:block`}>
              <TeamHeader name="ALLIED FORCES" count={gs?.num_allied_players || 0} color="bg-blue-900/20 text-blue-400 border-blue-500/30" />
              <div className="space-y-4">
                 <CommanderRow commander={data.team_view?.allies?.commander} getStats={getStats} />
                 <SquadList squads={data.team_view?.allies?.squads} unassigned={data.team_view?.allies?.unassigned} getStats={getStats} colorClass="blue" />
              </div>
            </div>

            {/* Axis Column */}
            <div className={`${(activeTab === 'axis' || activeTab === 'server') ? 'block' : 'hidden'} lg:block`}>
              <TeamHeader name="AXIS FORCES" count={gs?.num_axis_players || 0} color="bg-red-900/20 text-red-400 border-red-500/30" />
              <div className="space-y-4">
                 <CommanderRow commander={data.team_view?.axis?.commander} getStats={getStats} />
                 <SquadList squads={data.team_view?.axis?.squads} unassigned={data.team_view?.axis?.unassigned} getStats={getStats} colorClass="red" />
              </div>
            </div>

          </div>
        )}

        <div className="text-center text-[10px] text-zinc-600 font-mono pt-8">
          LETZTE AKTUALISIERUNG: {lastUpdated.toLocaleTimeString()} // DATEN VOM TTV RCON PROXY
        </div>
      </div>
    </div>
  );
};

/* --- Sub-Components --- */

const ScoreCard = ({ label, value, team }: { label: string, value: number, team: 'allies' | 'axis' }) => (
  <div className={`glass-card p-4 flex flex-col items-center justify-center border-t-4 ${team === 'allies' ? 'border-t-blue-500' : 'border-t-red-600'}`}>
    <span className="text-[9px] text-zinc-500 uppercase tracking-[0.2em] font-bold mb-1">{label}</span>
    <span className={`text-4xl font-oswald font-bold ${team === 'allies' ? 'text-blue-400' : 'text-red-500'}`}>{value}</span>
  </div>
);

const TabButton = ({ active, onClick, label, color = 'text-zinc-400' }: any) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-4 text-xs font-oswald tracking-widest uppercase border-b-2 transition-colors ${active ? `border-[var(--accent)] text-white bg-white/5` : `border-transparent ${color} opacity-60`}`}
  >
    {label}
  </button>
);

const TeamHeader = ({ name, count, color }: any) => (
  <div className={`p-4 border-y border-x ${color} mb-6 flex justify-between items-center backdrop-blur-sm`}>
    <h3 className="font-oswald text-2xl tracking-tighter italic font-black">{name}</h3>
    <span className="text-xs font-mono font-bold tracking-widest opacity-80">{count} SOLDATEN</span>
  </div>
);

const CommanderRow = ({ commander, getStats }: { commander: any, getStats: any }) => {
  if (!commander) return null;
  const stats = getStats(commander.player_id, commander.name);
  
  return (
    <div className="mb-6 border border-[var(--accent)]/30 bg-[var(--accent)]/5">
      <div className="bg-[var(--accent)]/10 px-4 py-2 text-[10px] font-black text-[var(--accent)] uppercase tracking-[0.3em] flex items-center gap-2">
        <span>⭐</span> OBERKOMMANDO
      </div>
      <PlayerRow player={{...commander, role: 'armycommander'}} stats={stats} isCommander={true} />
    </div>
  );
};

const SquadList = ({ squads, unassigned, getStats, colorClass }: any) => {
  const borderColor = colorClass === 'blue' ? 'border-blue-500/20' : 'border-red-500/20';
  const headerBg = colorClass === 'blue' ? 'bg-blue-900/30' : 'bg-red-900/30';
  const textColor = colorClass === 'blue' ? 'text-blue-200' : 'text-red-200';

  // Convert squads object to array and sort
  const squadArray = squads ? Object.values(squads) : [];
  
  return (
    <div className="space-y-4">
      {squadArray.map((squad: any, idx: number) => (
        <div key={idx} className={`border ${borderColor} bg-black/20`}>
          {/* Squad Header */}
          <div className={`${headerBg} px-3 py-2 flex justify-between items-center border-b ${borderColor}`}>
             <div className="flex items-center gap-2">
               <span className="text-sm">
                 {squad.type === 'armor' ? '🛡️' : squad.type === 'recon' ? '🔭' : '⚔️'}
               </span>
               <span className={`font-oswald font-bold uppercase tracking-wider text-sm ${textColor}`}>
                 {squad.squad_name}
               </span>
             </div>
             <span className="text-[9px] font-mono opacity-50 uppercase">{squad.type}</span>
          </div>
          {/* Members */}
          <div className="divide-y divide-white/5">
            {squad.members.map((member: any) => (
              <PlayerRow 
                key={member.player_id || member.name} 
                player={member} 
                stats={getStats(member.player_id, member.name)} 
              />
            ))}
          </div>
        </div>
      ))}

      {/* Unassigned */}
      {unassigned && unassigned.length > 0 && (
        <div className="border border-zinc-700/30 bg-black/20 mt-8 opacity-70">
           <div className="bg-zinc-800/50 px-3 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
             Ohne Zuordnung
           </div>
           <div className="divide-y divide-white/5">
             {unassigned.map((member: any) => (
                <PlayerRow 
                  key={member.player_id || member.name} 
                  player={member} 
                  stats={getStats(member.player_id, member.name)} 
                />
             ))}
           </div>
        </div>
      )}
    </div>
  );
};

interface PlayerRowProps {
  player: SquadMember;
  stats: PlayerCombatStats | undefined;
  isCommander?: boolean;
}

const PlayerRow: React.FC<PlayerRowProps> = ({ player, stats, isCommander }) => {
  const roleIcon = ROLES_ICON_MAP[player.role] || '•';

  return (
    <div className={`px-3 py-2 flex items-center justify-between group hover:bg-white/5 transition-colors ${isCommander ? 'py-4' : ''}`}>
      
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="w-6 text-center text-sm" title={player.role}>{roleIcon}</div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className={`font-bold text-sm truncate ${isCommander ? 'text-[var(--accent)] text-base' : 'text-zinc-300 group-hover:text-white'}`}>
              {player.name}
            </span>
            {player.level && <span className="text-[9px] px-1 bg-white/10 text-zinc-400 rounded-sm">{player.level}</span>}
          </div>
          <span className="text-[9px] text-zinc-600 font-mono truncate hidden sm:block">
             {player.loadout || player.role}
          </span>
        </div>
      </div>

      {/* Stats Columns */}
      <div className="flex items-center gap-2 md:gap-6 text-right shrink-0">
         <StatItem label="K" value={stats?.kills} />
         <StatItem label="D" value={stats?.deaths} />
         <div className="w-16 hidden sm:block">
           <span className="block text-[10px] text-zinc-500 font-black uppercase">Score</span>
           <span className="block text-sm font-oswald text-[var(--accent)]">{stats?.combat || 0}</span>
         </div>
      </div>
    </div>
  );
};

const StatItem = ({ label, value }: { label: string, value?: number }) => (
  <div className="w-8 text-center">
    <span className="block text-[8px] text-zinc-600 font-bold">{label}</span>
    <span className="block text-xs font-mono text-zinc-300">{value ?? '-'}</span>
  </div>
);

export default Dashboard;
