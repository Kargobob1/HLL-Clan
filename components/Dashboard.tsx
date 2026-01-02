
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { api, LiveStatsResponse, PlayerStat } from '../services/apiService.ts';

type SortKey = 'combat' | 'kills' | 'support' | 'player' | 'offense' | 'defense';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<LiveStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>('combat');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStat | null>(null);

  const loadData = useCallback(async () => {
    try {
      const result = await api.getLiveStats();
      if (result) {
        setData(result);
        setError(null);
      }
    } catch (err: any) {
      setError(err.message || "Verbindung zur Kommandozentrale unterbrochen.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const timer = setInterval(loadData, 30000);
    return () => clearInterval(timer);
  }, [loadData]);

  const gs = data?.gamestate;
  
  const filteredAndSortedPlayers = useMemo(() => {
    if (!data?.stats) return [];
    
    return data.stats
      .filter(p => p.player.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (typeof valA === 'string' && typeof valB === 'string') {
          return valA.localeCompare(valB);
        }
        return (valB as number) - (valA as number);
      });
  }, [data?.stats, sortKey, searchTerm]);

  const currentMap = typeof gs?.current_map === 'object' ? gs.current_map.pretty_name : (gs?.current_map || 'Sektor Unbekannt');

  if (loading) return (
    <div className="min-h-screen bg-[var(--bg-deep)] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-2 border-[var(--accent)] border-t-transparent animate-spin mx-auto"></div>
        <div className="font-oswald text-[var(--accent)] tracking-[0.5em] uppercase animate-pulse italic text-sm">Synchronisiere Verschlüsselung...</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--bg-deep)] pt-28 pb-20 px-4 md:px-8 font-inter relative">
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {error && (
          <div className="bg-zinc-950 border-2 border-red-600/50 p-6 animate-reveal shadow-[0_0_40px_rgba(220,38,38,0.1)]">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <span className="text-4xl">⚠️</span>
              <div className="flex-grow text-center md:text-left">
                <h4 className="font-oswald text-lg text-white uppercase tracking-widest italic">Signalstörung</h4>
                <p className="text-zinc-400 text-sm italic">{error}</p>
              </div>
              <button onClick={loadData} className="btn-primary px-8 py-3 text-[10px] font-oswald tracking-widest uppercase">Erneut scannen</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatBox label="Score" value={`${gs?.allied_score ?? '--'}:${gs?.axis_score ?? '--'}`} sub="Allies : Axis" highlight />
          <StatBox label="Einsatzgebiet" value={currentMap} sub="Aktuelle Karte" />
          <StatBox label="Operation" value={gs?.time_remaining || "--:--:--"} sub="Restzeit" danger={gs?.time_remaining?.startsWith('00:0')} />
          <StatBox label="Einheiten" value={`${(gs?.num_allied_players ?? 0) + (gs?.num_axis_players ?? 0)}/100`} sub="Soldaten Online" />
        </div>

        <div className="glass-card border-t-4 border-t-[var(--primary)] overflow-hidden shadow-2xl animate-reveal">
          <div className="p-6 bg-white/5 border-b border-white/5 flex flex-col xl:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 w-full xl:w-auto">
               <h2 className="font-oswald text-2xl text-white italic font-black tracking-widest uppercase shrink-0">Scoreboard</h2>
               <div className="relative flex-grow max-w-sm group">
                  <input 
                    type="text"
                    placeholder="Soldat suchen..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 px-10 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[var(--accent)]/50 transition-all font-mono"
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-[var(--accent)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  {searchTerm && (
                    <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">✕</button>
                  )}
               </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              <SortBtn active={sortKey === 'combat'} onClick={() => setSortKey('combat')}>Combat</SortBtn>
              <SortBtn active={sortKey === 'offense'} onClick={() => setSortKey('offense')}>Offense</SortBtn>
              <SortBtn active={sortKey === 'defense'} onClick={() => setSortKey('defense')}>Defense</SortBtn>
              <SortBtn active={sortKey === 'support'} onClick={() => setSortKey('support')}>Support</SortBtn>
              <SortBtn active={sortKey === 'kills'} onClick={() => setSortKey('kills')}>Kills</SortBtn>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-black/60 text-[10px] uppercase tracking-widest text-zinc-500 font-bold border-b border-white/5">
                  <th className="p-4">Soldat</th>
                  <th className="p-4">Fraktion</th>
                  <th className="p-4 text-center">Kills</th>
                  <th className="p-4 text-center">Deaths</th>
                  <th className="p-4 text-center">Sup</th>
                  <th className="p-4 text-right">Combat Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredAndSortedPlayers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-24 text-center text-zinc-700 italic text-sm tracking-widest uppercase">
                      {searchTerm ? 'Keine Soldaten mit diesem Namen gefunden.' : 'Initialisiere Verbindung...'}
                    </td>
                  </tr>
                ) : filteredAndSortedPlayers.map((p, i) => (
                  <tr key={p.player_id + i} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-zinc-800 w-4">{i + 1}</span>
                        <button 
                          onClick={() => setSelectedPlayer(p)}
                          className="text-sm font-bold text-white group-hover:text-[var(--accent)] transition-colors truncate hover:underline underline-offset-4 decoration-[var(--accent)]/30"
                        >
                          {p.player}
                        </button>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 border ${p.team === 'allied' ? 'border-blue-500/30 text-blue-400' : 'border-red-500/30 text-red-500'}`}>
                        {p.team}
                      </span>
                    </td>
                    <td className="p-4 text-center font-mono text-xs text-white">{p.kills}</td>
                    <td className="p-4 text-center font-mono text-xs text-zinc-600">{p.deaths}</td>
                    <td className="p-4 text-center font-mono text-xs text-zinc-400">{p.support}</td>
                    <td className="p-4 text-right">
                      <span className="font-oswald text-lg text-[var(--accent)] font-bold">{p.combat}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PLAYER DOSSIER MODAL */}
      {selectedPlayer && (
        <PlayerDossier 
          player={selectedPlayer} 
          onClose={() => setSelectedPlayer(null)} 
        />
      )}
    </div>
  );
};

interface DossierProps {
  player: PlayerStat;
  onClose: () => void;
}

const PlayerDossier: React.FC<DossierProps> = ({ player, onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden glass-card border-2 border-[var(--primary)] shadow-[0_0_100px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in duration-300 flex flex-col">
        {/* Header */}
        <div className="bg-[var(--primary)] p-6 flex justify-between items-center border-b border-[var(--accent)]/20">
          <div className="flex items-center gap-6">
             <div className="w-16 h-16 bg-black/40 border border-[var(--accent)]/30 flex items-center justify-center text-3xl font-oswald text-[var(--accent)] italic font-black">
               {player.player.substring(0, 2).toUpperCase()}
             </div>
             <div>
                <h2 className="font-oswald text-3xl font-bold text-white tracking-tighter uppercase italic leading-none">{player.player}</h2>
                <div className="flex items-center gap-3 mt-2">
                   <span className={`text-[10px] px-2 py-0.5 font-bold uppercase ${player.team === 'allied' ? 'bg-blue-600 text-white' : 'bg-red-700 text-white'}`}>
                     {player.team} Infantry
                   </span>
                   <span className="text-[9px] text-zinc-400 font-mono tracking-widest uppercase">ID: {player.player_id.substring(0, 12)}...</span>
                </div>
             </div>
          </div>
          <button onClick={onClose} className="p-4 text-white/50 hover:text-white transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 bg-[var(--bg-offset)] custom-scrollbar">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Col: Core Stats */}
              <div className="space-y-8">
                 <div className="space-y-4">
                    <h4 className="font-oswald text-[var(--accent)] text-xs tracking-[0.3em] uppercase font-black border-b border-white/5 pb-2">Effizienz-Bericht</h4>
                    <div className="grid grid-cols-2 gap-4">
                       <DossierStat label="K/D Ratio" value={player.kill_death_ratio.toFixed(2)} />
                       <DossierStat label="Kills/Min" value={player.kills_per_minute.toFixed(2)} />
                       <DossierStat label="Streaks" value={`${player.kills_streak} K / ${player.death_streak} D`} />
                       <DossierStat label="Einsatzzeit" value={`${Math.floor(player.time_seconds / 60)} Min`} />
                    </div>
                 </div>

                 <div className="space-y-4">
                    <h4 className="font-oswald text-[var(--accent)] text-xs tracking-[0.3em] uppercase font-black border-b border-white/5 pb-2">Wertungspunkte</h4>
                    <div className="space-y-3">
                       <ProgressBar label="Combat" value={player.combat} max={1000} />
                       <ProgressBar label="Offense" value={player.offense} max={500} />
                       <ProgressBar label="Defense" value={player.defense} max={500} />
                       <ProgressBar label="Support" value={player.support} max={500} />
                    </div>
                 </div>
              </div>

              {/* Middle Col: Weapons & Victims */}
              <div className="space-y-8">
                 <div className="space-y-4">
                    <h4 className="font-oswald text-[var(--accent)] text-xs tracking-[0.3em] uppercase font-black border-b border-white/5 pb-2">Bevorzugte Bewaffnung</h4>
                    <div className="space-y-2">
                       {Object.keys(player.weapons).length > 0 ? Object.entries(player.weapons).map(([name, count]) => (
                         <div key={name} className="flex justify-between items-center bg-black/20 p-2 border border-white/5">
                            <span className="text-[10px] text-zinc-400 font-bold uppercase truncate pr-4">{name}</span>
                            <span className="text-xs text-white font-mono">{count}</span>
                         </div>
                       )) : <p className="text-xs text-zinc-600 italic">Keine Daten verfügbar</p>}
                    </div>
                 </div>

                 <div className="space-y-4">
                    <h4 className="font-oswald text-[var(--accent)] text-xs tracking-[0.3em] uppercase font-black border-b border-white/5 pb-2">Meiste Eliminierungen</h4>
                    <div className="space-y-2">
                       {Object.keys(player.most_killed).length > 0 ? Object.entries(player.most_killed).sort((a,b) => (b[1] as number) - (a[1] as number)).slice(0, 5).map(([name, count]) => (
                         <div key={name} className="flex justify-between items-center bg-red-900/10 p-2 border border-red-500/10">
                            <span className="text-[10px] text-zinc-300 font-bold uppercase truncate pr-4">{name}</span>
                            <span className="text-xs text-red-400 font-mono font-bold">{count}x</span>
                         </div>
                       )) : <p className="text-xs text-zinc-600 italic">Pazifist oder erfolglos.</p>}
                    </div>
                 </div>
              </div>

              {/* Right Col: Threat Intel */}
              <div className="space-y-8">
                 <div className="space-y-4">
                    <h4 className="font-oswald text-[var(--accent)] text-xs tracking-[0.3em] uppercase font-black border-b border-white/5 pb-2">Gefahrenanalyse (Tode durch)</h4>
                    <div className="space-y-2">
                       {Object.keys(player.death_by).length > 0 ? Object.entries(player.death_by).sort((a,b) => (b[1] as number) - (a[1] as number)).slice(0, 5).map(([name, count]) => (
                         <div key={name} className="flex justify-between items-center bg-zinc-900 p-2 border border-white/5">
                            <span className="text-[10px] text-zinc-500 font-bold uppercase truncate pr-4">{name}</span>
                            <span className="text-xs text-zinc-300 font-mono">{count}x</span>
                         </div>
                       )) : <p className="text-xs text-zinc-600 italic">Unsterblich.</p>}
                    </div>
                 </div>

                 <div className="p-6 bg-black/10 border border-white/5 opacity-40">
                    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest italic">Dokumentende // Dossier Ende</span>
                 </div>
              </div>

           </div>
        </div>

        <div className="bg-[var(--primary)]/20 p-4 border-t border-[var(--accent)]/10 text-center flex justify-between items-center">
          <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest italic">Dokument: TOP SECRET // CLASSIFIED TTV INFANTRY</span>
          <button onClick={onClose} className="btn-accent px-8 py-2 text-[10px] font-oswald uppercase tracking-widest">Dossier Schließen</button>
        </div>
      </div>
    </div>
  );
};

const DossierStat = ({ label, value }: any) => (
  <div className="bg-black/40 p-3 border border-white/5">
     <span className="block text-[8px] text-zinc-500 uppercase tracking-widest font-black mb-1">{label}</span>
     <span className="block text-lg font-oswald text-white italic leading-none">{value}</span>
  </div>
);

const ProgressBar = ({ label, value, max }: any) => {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">{label}</span>
        <span className="text-[9px] text-zinc-300 font-mono">{value}</span>
      </div>
      <div className="h-1 bg-black/60 w-full">
        <div 
          className="h-full bg-[var(--primary-light)] shadow-[0_0_10px_var(--primary)] transition-all duration-1000" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const StatBox = ({ label, value, sub, highlight, danger }: any) => (
  <div className={`glass-card p-6 border-b-4 ${highlight ? 'border-b-[var(--accent)]' : 'border-b-white/5'} transition-all group`}>
    <span className="block text-[10px] text-zinc-600 uppercase tracking-widest font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">{label}</span>
    <h3 className={`text-2xl font-oswald uppercase italic truncate ${danger ? 'text-red-500 animate-pulse' : highlight ? 'text-[var(--accent)]' : 'text-white'}`}>{value}</h3>
    <p className="text-[9px] text-zinc-700 uppercase tracking-[0.2em] mt-1 font-mono">{sub}</p>
  </div>
);

const SortBtn = ({ active, onClick, children }: any) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 text-[10px] font-oswald tracking-widest uppercase transition-all border ${active ? 'bg-[var(--accent)] text-[var(--bg-deep)] border-[var(--accent)] shadow-[0_0_20px_var(--accent-glow)]' : 'text-zinc-500 border-white/10 hover:border-white/30 hover:bg-white/5'}`}
  >
    {children}
  </button>
);

export default Dashboard;
