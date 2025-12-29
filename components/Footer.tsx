
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-zinc-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center font-bold text-lg text-white">T</div>
                <span className="font-oswald text-xl font-bold tracking-tighter">TTV</span>
            </div>
            <p className="text-zinc-500 text-sm max-w-xs">
              Die Gemeinschaft für Hell Let Loose Spieler, die taktisches Gameplay lieben, 
              aber den Spaß nie vergessen.
            </p>
          </div>
          
          <div className="flex gap-8 text-sm font-oswald uppercase tracking-widest text-zinc-400">
            <a href="https://discord.gg/XJ4fFaTDDr" target="_blank" className="hover:text-white transition-colors">Discord</a>
            <a href="https://www.battlemetrics.com/servers/hll/36692122" target="_blank" className="hover:text-white transition-colors">Server</a>
            <a href="#" className="hover:text-white transition-colors">Impressum</a>
          </div>
          
          <div className="text-zinc-600 text-xs">
            &copy; {new Date().getFullYear()} Taktisches Totalversagen. Not affiliated with Team17.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
