
import React from 'react';

const ServerStatus: React.FC = () => {
  return (
    <section id="server" className="py-24 bg-zinc-950 border-y border-zinc-900 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <h2 className="text-5xl font-bold mb-6 font-oswald">Einsatzzentrale</h2>
            <p className="text-xl text-zinc-400 mb-10 max-w-lg leading-relaxed">
              Checke den Status unseres Servers live auf Battlemetrics. Wir legen Wert auf 
              ausgeglichene Teams und eine toxinfreie Umgebung für alle Soldaten.
            </p>
            
            <div className="space-y-4 mb-10">
              <div className="flex items-center justify-between p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                  <span className="font-bold text-lg">Server Status</span>
                </div>
                <span className="text-green-500 uppercase font-oswald tracking-[0.2em] font-bold">Online</span>
              </div>
              
              <div className="flex items-center justify-between p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                <span className="text-zinc-400 font-medium">Aktuelle Besetzung</span>
                <span className="font-bold text-white text-lg">98 / 100</span>
              </div>
              
              <div className="flex items-center justify-between p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                <span className="text-zinc-400 font-medium">Aktuelle Karte</span>
                <span className="font-bold text-white text-lg">Sainte-Mère-Église</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://www.battlemetrics.com/servers/hll/36692122" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded font-bold transition-all shadow-lg hover:shadow-orange-600/20"
              >
                Server Statistiken öffnen
              </a>
              <a 
                href="steam://connect/36692122" // Direct connect simulation link
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 rounded font-bold transition-all border border-zinc-700"
              >
                Direkt Beitreten
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative group">
             <div className="absolute -inset-4 bg-orange-600/20 rounded-2xl blur-3xl group-hover:bg-orange-600/30 transition-all duration-700"></div>
             <div className="relative aspect-video bg-zinc-900 rounded-2xl border-2 border-zinc-800 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-60 bg-[url('https://images.unsplash.com/photo-1547149666-769b42053e67?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
                    <div className="inline-block p-6 rounded-full bg-orange-600/20 backdrop-blur-md mb-6 border-2 border-orange-500/50 group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-16 h-16 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                    </div>
                    <p className="font-oswald tracking-[0.4em] text-white text-xl font-bold uppercase drop-shadow-md">Live Einsatz</p>
                    <p className="text-zinc-400 text-sm mt-2">Serveraufzeichnung läuft...</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServerStatus;
