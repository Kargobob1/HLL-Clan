
import React, { useState } from 'react';
import ImpressumModal from './ImpressumModal.tsx';

const Footer: React.FC = () => {
  const [isImpressumOpen, setIsImpressumOpen] = useState(false);

  return (
    <footer className="bg-[#0f110d] py-20 border-t border-[#4b5320]/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start mb-16">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center space-x-4">
                <img 
                  src="https://www.taktisches-totalversagen.de/wp-content/uploads/go-x/u/afb06e94-8863-4d10-b1a4-8bdd8c6c4345/image-455x455.png" 
                  alt="TTV Logo" 
                  className="w-16 h-16 object-contain"
                />
                <div className="flex flex-col">
                    <span className="font-oswald text-3xl font-bold tracking-tighter text-white">TTV</span>
                    <span className="text-[10px] uppercase tracking-[0.4em] text-[#4b5320] font-black">Est. 2024</span>
                </div>
            </div>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed italic">
              "Taktik ist, wenn man trotzdem lacht." - Die Ü30 Community für entspanntes Multigaming.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 text-[11px] font-oswald uppercase tracking-[0.3em] text-zinc-400 font-bold">
            <div className="flex flex-col space-y-4">
                <h5 className="text-[#facc15] mb-2 tracking-[0.5em]">Navigation</h5>
                <a href="#" className="hover:text-white transition-colors">Startseite</a>
                <a href="#team" className="hover:text-white transition-colors">Das Team</a>
                <a href="#server" className="hover:text-white transition-colors">Server</a>
            </div>
            <div className="flex flex-col space-y-4">
                <h5 className="text-[#facc15] mb-2 tracking-[0.5em]">Legal</h5>
                <button 
                  onClick={() => setIsImpressumOpen(true)}
                  className="text-left hover:text-white transition-colors uppercase"
                >
                  Impressum
                </button>
                <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
                <a href="https://discord.gg/XJ4fFaTDDr" target="_blank" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
          
          <div className="flex flex-col space-y-6 items-center md:items-end">
             <h5 className="text-[11px] font-oswald uppercase tracking-[0.5em] text-[#facc15] font-bold">Social Kontakte</h5>
             <div className="flex gap-4">
                <a href="https://discord.gg/XJ4fFaTDDr" target="_blank" className="w-12 h-12 bg-[#4b5320]/10 border border-[#4b5320]/20 flex items-center justify-center text-zinc-400 hover:text-[#facc15] hover:border-[#facc15] transition-all">
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03z"/></svg>
                </a>
                <div className="w-12 h-12 bg-[#4b5320]/10 border border-[#4b5320]/20 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer">
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12"/></svg>
                </div>
             </div>
          </div>
        </div>
        
        <div className="text-center pt-10 border-t border-[#4b5320]/10 text-zinc-600 text-[9px] uppercase tracking-[0.4em] font-bold">
          &copy; {new Date().getFullYear()} Taktisches Totalversagen. Inoffizielle Fan-Seite. Alle Rechte bei den jeweiligen Eigentümern.
        </div>
      </div>

      <ImpressumModal 
        isOpen={isImpressumOpen} 
        onClose={() => setIsImpressumOpen(false)} 
      />
    </footer>
  );
};

export default Footer;
