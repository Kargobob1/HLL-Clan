
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-[#141612]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ 
          backgroundImage: 'url(https://i.imgur.com/hBnusG5.jpeg)',
          filter: 'sepia(20%) grayscale(20%) contrast(110%)'
        }}
      ></div>
      
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#141612]/20 via-transparent to-[#141612]"></div>

      <div className="relative z-20 text-center px-4 max-w-5xl flex flex-col items-center">
        <div className="mb-10 relative">
           <div className="absolute inset-0 bg-[#4b5320]/30 blur-[80px] rounded-full"></div>
           <img 
            src="https://www.taktisches-totalversagen.de/wp-content/uploads/go-x/u/afb06e94-8863-4d10-b1a4-8bdd8c6c4345/image-455x455.png" 
            alt="TTV Clan Logo" 
            className="w-32 h-32 md:w-56 md:h-56 object-contain drop-shadow-[0_0_40px_rgba(75,83,32,0.5)] transition-all duration-700 hover:scale-105"
          />
        </div>
        
        <h1 className="text-6xl md:text-9xl font-black mb-4 tracking-tighter leading-none text-white font-oswald text-glow-army italic">
          TAKTISCHES <br />
          <span className="text-[#facc15] not-italic">TOTALVERSAGEN</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-300 mb-12 font-light tracking-widest max-w-3xl mx-auto leading-relaxed uppercase">
          Die Ü30 Veteranen-Lounge für <br />
          <span className="font-bold text-white border-b-2 border-[#4b5320]">Hell Let Loose</span> Enthusiasten
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full max-w-2xl">
          <a 
            href="https://discord.gg/XJ4fFaTDDr" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-12 py-5 btn-yellow rounded-none skew-x-[-10deg] transition-all hover:skew-x-0 flex items-center justify-center gap-3 group"
          >
            <span className="relative z-10 font-oswald text-xl tracking-widest uppercase">Einschreiben</span>
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03z"/></svg>
          </a>
          <a 
            href="#about" 
            className="w-full sm:w-auto px-12 py-5 border border-[#4b5320] text-[#4b5320] hover:text-white hover:bg-[#4b5320] font-oswald text-xl rounded-none skew-x-[-10deg] transition-all"
          >
            Über uns
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
