
import React from 'react';

const JoinSection: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-[#141612]">
      <div className="absolute inset-0 bg-[#4b5320] opacity-[0.02]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto glass-card border border-[#4b5320]/20 p-16 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-[#facc15] text-[#1a1c12] font-black font-oswald tracking-[0.4em] uppercase text-xs">
            Letzter Aufruf
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-8 font-oswald text-white tracking-tighter">BEREIT FÜR DIE <br /> FRONT?</h2>
          <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Wir suchen keine Profis. Wir suchen Kameraden, die Bock auf taktisches Gameplay haben, 
            aber auch mal über ein katastrophales Totalversagen lachen können.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <a 
              href="https://discord.gg/XJ4fFaTDDr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-yellow px-14 py-6 text-xl tracking-[0.2em] uppercase font-oswald transition-all hover:scale-105 flex items-center justify-center gap-4"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03z"/></svg>
              Discord Funk
            </a>
            <a 
              href="steam://connect/176.57.181.105:28215" 
              className="px-14 py-6 border-2 border-[#4b5320] text-[#4b5320] hover:text-white hover:bg-[#4b5320] font-oswald text-xl tracking-[0.2em] uppercase transition-all text-center"
            >
              Direkt Joinen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
