
import React, { useState, useEffect, useCallback } from 'react';
import { api, LiveStatsResponse, PlayerStat } from '../services/apiService.ts';

type SortKey = 'combat' | 'kills' | 'support' | 'player';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<LiveStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>('combat');

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
    const timer = setInterval(loadData, 30000); // Auto-Update alle 30 Sek.
    return () => clearInterval(timer);
  }, [loadData]);

  if (loading) return (
    <div className="min-h-screen bg-[var(--bg-deep)] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-2 border-[var(--accent)] border-t-transparent animate-spin mx-auto"></div>
        <div className="font-oswald text-[var(--accent)] tracking-[0.5em] uppercase animate-pulse italic">Abfrage der Frontdaten...</div>
      </div>
    </div>
  );

  const gs = data?.gamestate;
  const players = data?.stats || [];
  const sortedPlayers = [...players].sort((a, b) => {
    if (typeof a[sortKey] === 'string') return (a[sortKey] as string).localeCompare(b[sortKey] as string);
    return (b[sortKey] as number) - (a[sortKey] as number);
  });

  const currentMap = typeof gs?.current_map === 'object' ? gs.current_map.pretty_name : (gs?.current_map || 'Sektor Unbekannt');

  return (
    <div className="min-h-screen bg-[var(--bg-deep)] pt-28 pb-20 px-4 md:px-8 font-inter relative">
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {error && (
          <div className="bg-zinc-950 border-2 border-red-600/50 p-6 animate-reveal shadow-[0_0_40px_rgba(220,38,38,0.1)] overflow-hidden">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <span className="text-4xl">📡</span>
              <div className="flex-grow text-center md:text-left">
                <h4 className="font-oswald text-lg text-white uppercase tracking-widest italic">Signalstörung</h4>
                <p className="text-zinc-400 text-sm italic">{error}</p>
              </div>
              <button 
                onClick={loadData}
                className="btn-primary px-8 py-3 text-[10px] font-oswald tracking-widest uppercase"
              >
                Erneut scannen
              </button>
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
          <div className="p-6 bg-white/5 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="font-oswald text-2xl text-white italic font-black tracking-widest uppercase">Echtzeit-Scoreboard</h2>
            <div className="flex gap-2">
              <SortBtn active={sortKey === 'combat'} onClick={() => setSortKey('combat')}>Combat</SortBtn>
              <SortBtn active={sortKey === 'kills'} onClick={() => setSortKey('kills')}>Kills</SortBtn>
              <SortBtn active={sortKey === 'support'} onClick={() => setSortKey('support')}>Support</SortBtn>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-black/60 text-[10px] uppercase tracking-widest text-zinc-500 font-bold border-b border-white/5">
                  <th className="p-4">Name</th>
                  <th className="p-4">Fraktion</th>
                  <th className="p-4 text-center">K</th>
                  <th className="p-4 text-center">D</th>
                  <th className="p-4 text-center">Sup</th>
                  <th className="p-4 text-right">Combat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {!data && !error ? (
                  <tr>
                    <td colSpan={6} className="p-24 text-center text-zinc-700 italic text-sm tracking-widest uppercase">
                      Initialisiere Verbindung...
                    </td>
                  </tr>
                ) : sortedPlayers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-24 text-center text-zinc-700 italic text-sm tracking-widest uppercase">
                      Der Server ist momentan leer.
                    </td>
                  </tr>
                ) : sortedPlayers.map((p, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-zinc-800 w-4">{i + 1}</span>
                        <span className="text-sm font-bold text-white group-hover:text-[var(--accent)] transition-colors truncate">
                          {p.player}
                        </span>
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

        <div className="text-center">
            <button onClick={() => window.location.reload()} className="btn-primary inline-flex items-center gap-4 px-12 py-5 font-oswald tracking-[0.3em] uppercase text-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              HQ-Verbindung erneuern
            </button>
        </div>
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
    className={`px-4 py-2 text-[10px] font-oswald tracking-widest uppercase transition-all border ${active ? 'bg-[var(--accent)] text-[var(--bg-deep)] border-[var(--accent)] shadow-[0_0_20px_var(--accent-glow)]' : 'text-zinc-500 border-white/10 hover:border-white/30'}`}
  >
    {children}
  </button>
);

export default Dashboard;
