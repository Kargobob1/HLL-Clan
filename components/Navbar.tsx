
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onNavigate: (page: 'home' | 'dashboard') => void;
  currentPage: 'home' | 'dashboard';
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMilitary, setIsMilitary] = useState(false); // Default to Modern (false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleNavClick = (page: 'home' | 'dashboard') => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  // Mobile navbar should always have a background to be visible against any content
  const mobileBgClass = 'bg-[var(--bg-deep)]/95 backdrop-blur-lg border-b border-[var(--border)] shadow-2xl py-3';
  // Desktop logic remains dynamic
  const desktopBgClass = scrolled || currentPage !== 'home' ? mobileBgClass : 'bg-transparent py-6 md:py-8';

  return (
    <nav className={`fixed w-full z-[200] transition-all duration-500 ${mobileMenuOpen ? mobileBgClass : ''} lg:${scrolled || currentPage !== 'home' ? 'bg-[var(--bg-deep)]/95 backdrop-blur-lg py-3 border-b border-[var(--border)] shadow-2xl' : 'bg-transparent py-6 md:py-8'} max-lg:${mobileBgClass}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* LOGO */}
        <button onClick={() => handleNavClick('home')} className="flex items-center space-x-3 md:space-x-4 group cursor-pointer outline-none z-[210]">
          <img 
            src="https://i.imgur.com/OqJyLQG.png" 
            alt="TTV Logo" 
            className="w-8 h-8 md:w-10 md:h-10 object-contain group-hover:rotate-12 transition-transform duration-500"
          />
          <div className="flex flex-col text-left">
            <span className="font-oswald text-lg md:text-xl font-bold tracking-tighter leading-none text-white">TTV</span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-[var(--accent)] font-black hidden sm:block">Tactical Community</span>
          </div>
        </button>
        
        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex items-center space-x-10 text-[10px] font-oswald tracking-[0.3em] uppercase font-bold">
            <button 
              onClick={() => handleNavClick('home')} 
              className={`${currentPage === 'home' ? 'text-[var(--accent)]' : 'text-zinc-400'} hover:text-[var(--accent)] transition-colors relative group uppercase`}
            >
              Startseite
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[var(--accent)] transition-all ${currentPage === 'home' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
            <button 
              onClick={() => handleNavClick('dashboard')} 
              className={`${currentPage === 'dashboard' ? 'text-[var(--accent)]' : 'text-zinc-400'} hover:text-[var(--accent)] transition-colors relative group uppercase`}
            >
              Einsatz-Monitor
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[var(--accent)] transition-all ${currentPage === 'dashboard' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
          </div>

          <div className="flex items-center gap-4 pl-4 border-l border-white/10">
            <button 
              onClick={toggleTheme}
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group"
              title={isMilitary ? "Wechsel zu Modern" : "Wechsel zu Military"}
            >
              {isMilitary ? (
                // Icon to switch back to Modern (Standard)
                <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
              ) : (
                // Icon to switch to Military
                 <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              )}
            </button>
            
            <a 
              href="https://discord.gg/XJ4fFaTDDr" 
              target="_blank" 
              className="btn-primary px-5 py-2 text-[10px] font-oswald tracking-[0.2em] uppercase transition-all"
            >
              Discord Funk
            </a>
          </div>
        </div>

        {/* MOBILE BURGER */}
        <div className="flex lg:hidden items-center gap-4 z-[210]">
             <button 
              onClick={toggleTheme}
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
            >
               {isMilitary ? <span className="text-xs">🌙</span> : <span className="text-xs">☀️</span>}
             </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[var(--accent)] border border-[var(--accent)]/30 bg-[var(--accent)]/10"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              )}
            </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-[var(--bg-deep)] pt-24 px-6 pb-6 flex flex-col items-center justify-start space-y-8 animate-in slide-in-from-top-10 duration-300">
           <div className="w-full h-px bg-[var(--primary)]/30 w-1/2 mx-auto"></div>
           
           <button 
             onClick={() => handleNavClick('home')}
             className={`text-2xl font-oswald font-bold uppercase tracking-widest ${currentPage === 'home' ? 'text-[var(--accent)]' : 'text-white'}`}
           >
             Startseite
           </button>
           
           <button 
             onClick={() => handleNavClick('dashboard')}
             className={`text-2xl font-oswald font-bold uppercase tracking-widest ${currentPage === 'dashboard' ? 'text-[var(--accent)]' : 'text-white'}`}
           >
             Einsatz-Monitor
           </button>

           <div className="w-full h-px bg-[var(--primary)]/30 w-1/2 mx-auto"></div>

           <a 
              href="https://discord.gg/XJ4fFaTDDr" 
              target="_blank" 
              className="btn-primary w-full max-w-xs py-4 text-center font-oswald tracking-widest uppercase flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03z"/></svg>
              Discord Funk
           </a>

           <div className="absolute bottom-8 text-[10px] text-zinc-600 uppercase tracking-widest">
              TTV // Tactical Totalversagen
           </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
