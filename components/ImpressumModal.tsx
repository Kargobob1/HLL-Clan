import React from 'react';

interface ImpressumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImpressumModal: React.FC<ImpressumModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-2xl glass-card border-2 border-[var(--primary)] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-[var(--primary)] p-4 flex justify-between items-center">
          <h2 className="font-oswald text-2xl font-bold text-[var(--accent)] tracking-widest uppercase italic">Impressum // Vertraulich</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-[var(--accent)] transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-8 max-h-[70vh] overflow-y-auto bg-[var(--bg-offset)] text-zinc-300 font-light space-y-8 custom-scrollbar">
          <section>
            <h3 className="font-oswald text-[var(--accent)] text-lg mb-2 uppercase">Angaben gemäß § 5 TMG</h3>
            <p>Taktisches Totalversagen (TTV)<br />
            Clan-Leitung<br />
            - Vertreten durch das Oberkommando -<br />
            Discord: discord.gg/XJ4fFaTDDr</p>
          </section>

          <section>
            <h3 className="font-oswald text-[var(--accent)] text-lg mb-2 uppercase">Kontakt</h3>
            <p>E-Mail: kontakt@taktisches-totalversagen.de<br />
            Ansprechpartner: Knödeltiger, Isnaton, Caro</p>
          </section>

          <section className="text-xs text-zinc-500 space-y-4 pt-6 border-t border-[var(--primary)]/30 italic">
            <p><strong>Haftungsausschluss:</strong> Wir sind ein privater Gaming-Clan. Alle Inhalte dienen ausschließlich der Unterhaltung unserer Community.</p>
          </section>
        </div>

        <div className="bg-[var(--primary)]/10 p-4 border-t border-[var(--primary)]/30 text-center">
          <button 
            onClick={onClose}
            className="btn-primary px-8 py-2 font-oswald text-sm tracking-[0.2em] uppercase"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImpressumModal;