
import React, { useEffect, useState } from 'react';
import { api, FullScoreboardData } from '../services/apiService.ts';

interface ServerStatusProps {
  onNavigate: (page: 'home' | 'dashboard') => void;
}

const ServerStatus: React.FC<ServerStatusProps> = ({ onNavigate }) => {
  const [status, setStatus] = useState<FullScoreboardData | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await api.getLiveStats();
        setStatus(data);
      } catch (e) {
        console.error("Server status widget error:", e);
      }
    };
    fetchStatus();
  }, []);

  const mapName = status?.gamestate?.current_map?.pretty_name || "Karte wird geladen...";
  const allyScore = status?.gamestate?.allied_score ?? 0;
  const axisScore = status?.gamestate?.axis_score ?? 0;
  const playerCount = (status?.gamestate?.num_allied_players || 0) + (status?.gamestate?.num_axis_players || 0);

  return (
    <section id="server" className="py-24 bg-transparent relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1 rounded-none bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--accent)] text-[10px] font-bold tracking-[0.3em] uppercase mb-6 animate-pulse">
            Status: Online
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-12 font-oswald text-white tracking-tight italic">EINSATZZENTRALE</h2>
          
          <div className="glass-card rounded-none p-8 md:p-12 mb-12 shadow-2xl relative group overflow-hidden border-t-4 border-t-[var(--accent)]">
            {/* Background Effect */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--primary)]/10 blur-[100px] rounded-full group-hover:bg-[var(--primary)]/20 transition-colors"></div>
            
            <div className="relative z-10 flex flex-col items-center">
                {/* Header Info */}
                <h3 className="font-oswald font-bold text-2xl md:text-3xl text-white tracking-wide uppercase mb-2">
                  Hell Let Loose | Bollwerk
                </h3>
                <p className="text-zinc-500 text-xs md:text-sm tracking-[0.2em] uppercase font-mono mb-8">
                  Offizieller TTV Server
                </p>

                {/* Score & Map Display */}
                <div className="w-full bg-black/30 border border-white/5 p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
                   <div className="text-center md:text-left">
                      <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Aktuelle Operation</div>
                      <div className="text-white font-oswald text-xl tracking-wider">{mapName}</div>
                   </div>
                   
                   <div className="flex items-center gap-6 md:gap-8">
                      <div className="text-center">
                        <span className="block text-3xl font-oswald font-bold text-blue-500">{allyScore}</span>
                      </div>
                      <div className="h-8 w-px bg-white/10"></div>
                      <div className="text-center">
                        <span className="block text-3xl font-oswald font-bold text-red-500">{axisScore}</span>
                      </div>
                   </div>

                   <div className="text-center md:text-right">
                      <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Spieler</div>
                      <div className="text-[var(--accent)] font-mono font-bold">{playerCount} / 100</div>
                   </div>
                </div>

                {/* IP Display */}
                <div className="flex items-center gap-3 bg-[var(--bg-deep)] border border-[var(--primary)]/30 px-6 py-3 mb-8 hover:border-[var(--accent)] transition-colors cursor-copy group/ip" title="Server IP">
                   <svg className="w-4 h-4 text-zinc-500 group-hover/ip:text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v4a2 2 0 00-2-2"></path></svg>
                   <code className="font-mono text-lg text-zinc-300 tracking-widest">176.57.181.105:28215</code>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                   <a 
                     href="steam://connect/176.57.181.105:28215" 
                     className="btn-primary px-8 py-3 text-sm font-oswald tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-[var(--primary-light)]"
                   >
                     <span>Direkt Verbinden</span>
                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                   </a>
                   
                   <button 
                     onClick={() => onNavigate('dashboard')}
                     className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-3 text-sm font-oswald tracking-[0.2em] uppercase text-white flex items-center justify-center gap-2 transition-all"
                   >
                     <span>Einsatz-Monitor (Details)</span>
                     <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                   </button>
                </div>
            </div>
            
            <div className="mt-8 pt-4 border-t border-white/5 text-center">
              <span className="text-[9px] text-zinc-600 uppercase tracking-[0.3em]">
                Live-Daten werden synchronisiert
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServerStatus;
