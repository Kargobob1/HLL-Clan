import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMilitary, setIsMilitary] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isMilitary;
    setIsMilitary(next);
    document.documentElement.className = next ? 'theme-military' : 'theme-normal';
  };

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-[var(--bg-deep)]/95 backdrop-blur-lg py-3 border-b border-[var(--border)] shadow-2xl' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-4 group cursor-pointer">
          <img 
            src="https://www.taktisches-totalversagen.de/wp-content/uploads/go-x/u/afb06e94-8863-4d10-b1a4-8bdd8c6c4345/image-455x455.png" 
            alt="TTV Logo" 
            className="w-10 h-10 object-contain group-hover:rotate-12 transition-transform duration-500"
          />
          <div className="flex flex-col">
            <span className="font-oswald text-xl font-bold tracking-tighter leading-none text-white">TTV</span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-[var(--accent)] font-black">Tactical Community</span>
          </div>
        </a>
        
        <div className="flex items-center space-x-8">
          <div className="hidden lg:flex items-center space-x-10 text-[10px] font-oswald tracking-[0.3em] uppercase font-bold">
            <a href="#about" className="text-zinc-400 hover:text-[var(--accent)] transition-colors relative group">
              Briefing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)] transition-all group-hover:w-full"></span>
            </a>
            <a href="#team" className="text-zinc-400 hover:text-[var(--accent)] transition-colors relative group">
              Personal
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)] transition-all group-hover:w-full"></span>
            </a>
            <a href="#server" className="text-zinc-400 hover:text-[var(--accent)] transition-colors relative group">
              Einsatzgebiet
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)] transition-all group-hover:w-full"></span>
            </a>
          </div>

          <div className="flex items-center gap-4 pl-4 border-l border-white/10">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group"
              title={isMilitary ? "Community Modus" : "Taktik Modus"}
            >
              {isMilitary ? (
                <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              ) : (
                <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
              )}
            </button>
            
            <a 
              href="https://discord.gg/XJ4fFaTDDr" 
              target="_blank" 
              className="btn-primary px-5 py-2 text-[10px] font-oswald tracking-[0.2em] uppercase transition-all hidden sm:block"
            >
              Discord Funk
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;