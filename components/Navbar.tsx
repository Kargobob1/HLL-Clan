
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#1a1c12]/95 backdrop-blur-lg py-2 border-b border-[#4b5320]/30 shadow-2xl' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4 group cursor-pointer">
          <img 
            src="https://www.taktisches-totalversagen.de/wp-content/uploads/go-x/u/afb06e94-8863-4d10-b1a4-8bdd8c6c4345/image-455x455.png" 
            alt="TTV Logo" 
            className="w-12 h-12 object-contain"
          />
          <div className="flex flex-col">
            <span className="font-oswald text-2xl font-bold tracking-tighter leading-none text-white">TTV</span>
            <span className="text-[9px] uppercase tracking-[0.4em] text-[#facc15] font-black">Tactical Unit</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center space-x-12 text-[11px] font-oswald tracking-[0.3em] uppercase font-bold">
          <a href="#" className="text-zinc-400 hover:text-[#facc15] transition-colors relative group">
            HQ
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#facc15] transition-all group-hover:w-full"></span>
          </a>
          <a href="#about" className="text-zinc-400 hover:text-[#facc15] transition-colors relative group">
            Briefing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#facc15] transition-all group-hover:w-full"></span>
          </a>
          <a href="#server" className="text-zinc-400 hover:text-[#facc15] transition-colors relative group">
            Einsatzgebiet
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#facc15] transition-all group-hover:w-full"></span>
          </a>
          <a 
            href="https://discord.gg/XJ4fFaTDDr" 
            target="_blank" 
            className="btn-army px-6 py-2 shadow-lg text-white transition-all transform hover:scale-105 active:scale-95"
          >
            Discord Funk
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
