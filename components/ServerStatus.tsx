
import React from 'react';

const ServerStatus: React.FC = () => {
  return (
    <section id="server" className="py-32 bg-transparent relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-[#4b5320]/10 border border-[#4b5320]/20 text-[#facc15] text-[10px] font-bold tracking-[0.3em] uppercase mb-6">
            Einsatzbereit
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 font-oswald text-white tracking-tight">Einsatzzentrale</h2>
          <p className="text-xl text-zinc-400 mb-16 leading-relaxed max-w-2xl mx-auto font-light">
            Unser Server ist der Dreh- und Angelpunkt für alle Operationen. <br className="hidden md:block" /> 
            Wir legen Wert auf Teamplay und eine toxinfreie Umgebung.
          </p>
          
          <div className="glass-card rounded-none p-6 md:p-12 mb-16 shadow-2xl relative group overflow-hidden border-t-4 border-t-[#facc15]">
            {/* Hintergrund-Deko */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#4b5320]/10 blur-[100px] rounded-full group-hover:bg-[#4b5320]/20 transition-colors"></div>
            
            <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                        <div className="w-5 h-5 bg-green-500 rounded-full animate-pulse shadow-[0_0_20px_rgba(34,197,94,0.4)]"></div>
                        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
                    </div>
                    <div className="text-left">
                      <span className="block font-oswald font-bold text-2xl text-white tracking-wide uppercase">TTV am Bollwerk</span>
                      <span className="text-zinc-500 text-sm tracking-widest uppercase font-mono">176.57.181.105:28215</span>
                    </div>
                  </div>
                  <div className="h-px w-full md:w-px md:h-16 bg-white/10"></div>
                  <div className="text-center md:text-right">
                    <span className="text-[#facc15] text-3xl font-oswald tracking-[0.2em] font-bold uppercase text-glow-army">Live-Feed</span>
                    <p className="text-zinc-500 text-[10px] tracking-[0.2em] uppercase mt-2 font-bold">Status: Operativ</p>
                  </div>
                </div>

                {/* Server Banner Integration - Optimized Container */}
                <div className="flex justify-center w-full overflow-hidden transition-all duration-500 hover:scale-[1.01]">
                  <a 
                    href="https://gamemonitoring.ru/servers/10180718" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full max-w-[560px] bg-black/40 p-2 border border-white/5 shadow-inner"
                  >
                    <img 
                      src="https://widgets.gamemonitoring.ru/servers/10180718/560x95.png" 
                      alt="[GER] Taktisches Totalversagen [TTV] am Bollwerk | Mic Only" 
                      title="[GER] Taktisches Totalversagen [TTV] am Bollwerk | Mic Only"
                      className="w-full h-auto brightness-110 contrast-110 block"
                      style={{ minHeight: '80px' }}
                    />
                  </a>
                </div>
            </div>
            
            <div className="mt-12 bg-black/20 py-3 text-zinc-500 text-[9px] tracking-[0.4em] uppercase font-bold border-t border-white/5">
              Automatische Aktualisierung alle 60 Sekunden
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a 
              href="https://www.battlemetrics.com/servers/hll/36692122" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-army text-white px-12 py-5 font-oswald font-bold tracking-widest transition-all flex items-center justify-center gap-3 group uppercase"
            >
              <span>Detaillierte Statistiken</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
            <a 
              href="steam://connect/176.57.181.105:28215" 
              className="bg-white/5 hover:bg-white/10 text-white px-12 py-5 font-oswald font-bold tracking-widest transition-all border border-white/10 flex items-center justify-center gap-3 uppercase"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              <span>Server beitreten</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServerStatus;
