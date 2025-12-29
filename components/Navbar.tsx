
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md py-2 border-b border-zinc-800' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-orange-600 rounded flex items-center justify-center font-bold text-xl text-white">T</div>
          <span className="font-oswald text-2xl font-bold tracking-tighter">TTV</span>
        </div>
        
        <div className="hidden md:flex space-x-8 text-sm font-oswald tracking-widest uppercase">
          <a href="#" className="hover:text-orange-500 transition-colors">Home</a>
          <a href="#about" className="hover:text-orange-500 transition-colors">Über Uns</a>
          <a href="#server" className="hover:text-orange-500 transition-colors">Server</a>
          <a href="#ai-officer" className="hover:text-orange-500 transition-colors">Rekrutierung</a>
          <a href="https://discord.gg/XJ4fFaTDDr" target="_blank" className="bg-orange-600 hover:bg-orange-700 px-4 py-1 rounded text-white transition-colors">Discord</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
