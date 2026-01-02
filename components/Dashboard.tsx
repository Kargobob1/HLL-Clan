
import React, { useState, useEffect, useCallback } from 'react';
import { api, PlayerStats, GameState } from '../services/apiService.ts';

type DashboardTab = 'live' | 'stats' | 'archive';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('live');
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [players, setPlayers] = useState<PlayerStats[]>([]);
  const [topStats, setTopStats] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [gs, ps, ts] = await Promise.all([
        api.getGameState(), 
        api.getDetailedPlayers(),
        api.getTopStats()
      ]);
      
      if (!gs && ps.length === 0) {
        setError("Die Verbindung zum CRCON-Server konnte nicht hergestellt werden. (API nicht erreichbar oder CORS-Blockierung)");
      } else {
        setError(null);
        setGameState(gs);
        setPlayers(ps);
        setTopStats(ts);
      }
    } catch (err) {
      setError("Ein unerwarteter Fehler ist beim Abrufen der Live-Daten aufgetreten.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading) return (
    <div className="min-h-screen bg-[var(--bg-deep)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-16 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
        <div className="text-[var(--accent)] font-oswald text-2xl animate-pulse tracking-[0.5em] uppercase italic">Verbinde mit HQ-Server...</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--bg-deep)] pt-28 pb-20 px-4 md:px-8 font-inter overflow-hidden relative transition-colors duration-500">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--primary)]/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-900/30 border-2 border-red-500 p-6 flex items-center gap-6 animate-reveal">
             <div className="w-12 h-12 bg-red-600 flex items-center justify-center text-white font-black text-2xl animate-pulse">!</div>
             <div>
               <h4 className="font-oswald text-xl text-white uppercase tracking-widest">Funkstörung</h4>
               <p className="text-red-200 text-sm italic font-light">{error}</p>
             </div>
          </div>
        )}

        {/* HEADER & TABS */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-white/5 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2 text-[var(--accent)] font-mono text-[10px] tracking-[0.4em] uppercase font-bold">
              <span className={`w-2 h-2 rounded-full ${error ? 'bg-red-500 animate-pulse' : 'bg-green-500 animate-ping'}`}></span>
              {error ? 'Verbindung getrennt' : 'Signal stabil | Live-Stream aktiv'}
            </div>
            <h1 className="text-5xl font-oswald text-white font-black italic tracking-tighter uppercase">Einsatz-Monitor</h1>
          </div>
          
          <div className="flex gap-1 p-1 bg-black/40 border border-white/5 rounded-none overflow-hidden shadow-inner">
            {[
              { id: 'live', label: 'Live-Front', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
              { id: 'stats', label: 'Top-Performer', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
              { id: 'archive', label: 'Personalsuche', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as DashboardTab)}
                className={`flex items-center gap-3 px-6 py-3 font-oswald text-xs tracking-widest uppercase transition-all ${
                  activeTab === tab.id 
                  ? 'bg-[var(--primary)] text-white shadow-lg' 
                  : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon}></path></svg>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* TOP STATUS CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusCard label="Match-Punkte" value={`${gameState?.allied_score ?? '--'} : ${gameState?.axis_score ?? '--'}`} color="text-[var(--accent)]" sub="Allies vs Axis" />
          <StatusCard label="Frontabschnitt" value={typeof gameState?.current_map === 'string' ? gameState.current_map : gameState?.current_map?.pretty_name || '--'} color="text-white" sub="Einsatzgebiet" />
          <StatusCard label="Restlaufzeit" value={gameState?.time_remaining || '--:--:--'} color="text-red-500 font-mono" sub="Dauer bis Sektorschluss" />
          <StatusCard label="Truppenstärke" value={`${gameState?.player_count ?? 0}/100`} color="text-blue-400" sub="Soldaten im Gefecht" />
        </div>

        {/* DYNAMIC CONTENT */}
        <div className="animate-reveal">
          {activeTab === 'live' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TeamColumn title="Alliierte" color="blue" players={players.filter(p => p.team === 'allied')} />
              <TeamColumn title="Achsenmächte" color="red" players={players.filter(p => p.team === 'axis')} />
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatsTable title="Kampfwert" icon="🔥" players={topStats?.sortedByCombat || []} field="combat" />
              <StatsTable title="Präzisionsschützen" icon="🎯" players={topStats?.sortedByKills || []} field="kills" />
              <StatsTable title="Logistik & Bau" icon="🛠️" players={topStats?.sortedBySupport || []} field="support" />
            </div>
          )}

          {activeTab === 'archive' && (
            <div className="space-y-8">
               <div className="relative">
                  <input 
                    type="text" 
                    placeholder="SPIELERNAME ODER STEAM-ID..."
                    className="w-full bg-black/40 border-2 border-white/5 p-6 font-mono text-sm tracking-widest focus:border-[var(--accent)] focus:outline-none transition-all text-white placeholder:text-zinc-800"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-800">
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {players.length > 0 ? (
                   players.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 15).map(p => (
                    <div key={p.player_id} className="glass-card p-6 border-white/5 group hover:border-[var(--accent)]/50 transition-all">
                       <div className="flex justify-between items-start mb-4">
                         <div>
                           <h4 className="text-xl font-oswald text-white group-hover:text-[var(--accent)] transition-colors truncate max-w-[180px]">{p.name}</h4>
                           <span className="text-[9px] text-zinc-500 font-mono uppercase">ID: {p.player_id}</span>
                         </div>
                         <div className="bg-zinc-800 px-2 py-1 text-[10px] font-bold text-zinc-400 border border-white/5">Lvl {p.level}</div>
                       </div>
                       <div className="grid grid-cols-2 gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500 border-t border-white/5 pt-4">
                         <div>
                           <span className="block text-zinc-600 mb-1">Combat</span>
                           <span className="text-zinc-200">{p.combat.toLocaleString()}</span>
                         </div>
                         <div>
                           <span className="block text-zinc-600 mb-1">K/D</span>
                           <span className="text-zinc-200">{(p.kills / (p.deaths || 1)).toFixed(2)}</span>
                         </div>
                       </div>
                    </div>
                  ))
                 ) : (
                    <div className="col-span-full py-20 text-center text-zinc-700 italic border-2 border-dashed border-white/5">
                      Keine aktiven Truppendaten im Archiv-Speicher...
                    </div>
                 )}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatusCard = ({ label, value, color, sub }: any) => (
  <div className="glass-card p-6 border-b-4 border-white/5 hover:border-[var(--accent)] transition-all group">
    <span className="block text-[9px] uppercase tracking-[0.3em] text-zinc-600 font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">{label}</span>
    <h3 className={`text-2xl md:text-3xl font-oswald uppercase italic tracking-tighter ${color}`}>{value}</h3>
    <span className="block text-[8px] uppercase tracking-widest text-zinc-700 mt-2 font-mono">{sub}</span>
  </div>
);

const TeamColumn = ({ title, color, players }: any) => (
  <div className="space-y-6">
    <div className={`p-4 border-l-8 ${color === 'blue' ? 'bg-blue-900/10 border-blue-600' : 'bg-red-900/10 border-red-600'} flex justify-between items-center shadow-lg`}>
      <h2 className={`font-oswald text-2xl uppercase italic font-black ${color === 'blue' ? 'text-blue-400' : 'text-red-500'}`}>{title}</h2>
      <div className="flex flex-col items-end">
        <span className="font-mono text-[10px] text-zinc-400">{players.length} AKTIV</span>
        <span className="text-[8px] text-zinc-600 uppercase tracking-widest font-bold">Kampfbereit</span>
      </div>
    </div>
    <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
      {players.length === 0 ? (
        <div className="bg-white/5 border border-dashed border-white/5 text-zinc-700 text-[10px] uppercase tracking-widest p-8 text-center">
          Warte auf Signal...
        </div>
      ) : (
        players.map((p: PlayerStats) => (
          <div key={p.player_id} className="glass-card p-4 flex items-center justify-between hover:bg-white/5 border-white/5 group transition-all">
            <div className="flex items-center gap-5">
              <div className="w-10 h-10 bg-zinc-900/80 border border-white/10 flex items-center justify-center font-oswald text-xs group-hover:border-[var(--accent)] transition-colors">
                {p.level}
              </div>
              <div className="max-w-[150px] md:max-w-none">
                <span className="block text-sm font-bold text-white group-hover:text-[var(--accent)] transition-colors truncate">{p.name}</span>
                <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-mono">{p.role} // {p.unit_name}</span>
              </div>
            </div>
            <div className="text-right font-mono">
              <span className="block text-xs text-zinc-300 font-black">{p.combat.toLocaleString()}</span>
              <span className="text-[8px] text-zinc-700 uppercase font-bold">Punkte</span>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

const StatsTable = ({ title, icon, players, field }: any) => (
  <div className="glass-card overflow-hidden border-t-4 border-[var(--primary)] shadow-2xl">
    <div className="bg-[var(--primary)]/10 p-5 border-b border-white/5 flex items-center gap-4">
      <span className="text-2xl filter grayscale brightness-150">{icon}</span>
      <h3 className="font-oswald text-xl text-white uppercase italic tracking-tighter">{title}</h3>
    </div>
    <div className="p-2 space-y-1 bg-black/20">
      {players.length === 0 ? (
        <div className="p-8 text-[10px] text-zinc-800 uppercase tracking-[0.3em] italic text-center">
          Keine Felddaten...
        </div>
      ) : (
        players.map((p: any, i: number) => (
          <div key={p.player_id} className="flex items-center justify-between p-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
            <div className="flex items-center gap-4">
               <span className="font-oswald text-lg text-zinc-800 w-4 font-black">{i + 1}</span>
               <span className="text-sm text-zinc-400 font-bold truncate max-w-[140px]">{p.name}</span>
            </div>
            <span className="font-mono text-sm text-[var(--accent)] font-black">{p[field].toLocaleString()}</span>
          </div>
        ))
      )}
    </div>
  </div>
);

export default Dashboard;
