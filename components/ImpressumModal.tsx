
import React from 'react';

interface ImpressumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImpressumModal: React.FC<ImpressumModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl glass-card border-2 border-[#4b5320] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header Stencil Look */}
        <div className="bg-[#4b5320] p-4 flex justify-between items-center">
          <h2 className="font-oswald text-2xl font-bold text-[#facc15] tracking-widest uppercase italic">Impressum // Vertraulich</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-[#facc15] transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-8 max-h-[70vh] overflow-y-auto bg-[#1a1c12] text-zinc-300 font-light space-y-8 custom-scrollbar">
          <section>
            <h3 className="font-oswald text-[#facc15] text-lg mb-2 uppercase">Angaben gemäß § 5 TMG</h3>
            <p>Max Mustermann<br />
            Taktisches Totalversagen (TTV) Clan-Leitung<br />
            Musterstraße 123<br />
            12345 Musterstadt</p>
          </section>

          <section>
            <h3 className="font-oswald text-[#facc15] text-lg mb-2 uppercase">Kontakt</h3>
            <p>E-Mail: kontakt@taktisches-totalversagen.de<br />
            Discord: TTV_Administration</p>
          </section>

          <section>
            <h3 className="font-oswald text-[#facc15] text-lg mb-2 uppercase">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
            <p>Max Mustermann<br />
            Musterstraße 123<br />
            12345 Musterstadt</p>
          </section>

          <section className="text-xs text-zinc-500 space-y-4 pt-6 border-t border-[#4b5320]/30 italic">
            <p><strong>Haftung für Inhalte:</strong> Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.</p>
            <p><strong>Haftung für Links:</strong> Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.</p>
            <p><strong>Urheberrecht:</strong> Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
          </section>
        </div>

        <div className="bg-[#4b5320]/10 p-4 border-t border-[#4b5320]/30 text-center">
          <button 
            onClick={onClose}
            className="btn-army px-8 py-2 font-oswald text-sm tracking-[0.2em] uppercase"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImpressumModal;
