
import React from 'react';

const ServerStatus: React.FC = () => {
  return (
    <section id="server" className="py-24 bg-zinc-950 border-y border-zinc-900 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 font-oswald text-white">Einsatzzentrale</h2>
          <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
            Unser Server ist der Dreh- und Angelpunkt für alle Operationen. Wir legen Wert auf 
            ausgeglichene Teams und eine toxinfreie Umgebung für alle Soldaten.
          </p>
          
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 mb-12 shadow-2xl backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
                <div className="text-left">
                  <span className="block font-bold text-xl text-white">Server Status</span>
                  <span className="text-zinc-500 text-sm tracking-wide uppercase">176.57.181.105:28215</span>
                </div>
              </div>
              <div className="h-px w-full md:w-px md:h-12 bg-zinc-800"></div>
              <div className="text-center md:text-right">
                <span className="text-green-500 text-2xl font-oswald tracking-[0.2em] font-bold uppercase">Online</span>
                <p className="text-zinc-500 text-xs mt-1">Geregelte Admin-Präsenz</p>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-zinc-800">
              <p className="text-zinc-400 text-sm mb-0">
                Live-Statistiken, aktuelle Map und Spielerliste werden in Echtzeit auf Battlemetrics übertragen.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="https://www.battlemetrics.com/servers/hll/36692122" 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded font-bold transition-all shadow-lg hover:shadow-orange-600/20 flex items-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10">Live-Stats auf Battlemetrics</span>
              <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
            <a 
              href="steam://connect/176.57.181.105:28215" 
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-10 py-5 rounded font-bold transition-all border border-zinc-700 flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              <span>Direkt Beitreten</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServerStatus;
