import React from 'react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-3xl glass-card border-2 border-[var(--primary)] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-[var(--primary)] p-4 flex justify-between items-center">
          <h2 className="font-oswald text-2xl font-bold text-[var(--accent)] tracking-widest uppercase italic">Datenschutz // Protokoll</h2>
          <button onClick={onClose} className="text-white hover:text-[var(--accent)] transition-colors p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-8 max-h-[70vh] overflow-y-auto bg-[var(--bg-offset)] text-zinc-300 font-light space-y-6 text-sm custom-scrollbar">
          <section>
            <h3 className="font-oswald text-[var(--accent)] text-lg mb-2 uppercase">1. Datenschutz auf einen Blick</h3>
            <p>Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese Seite dient lediglich Informationszwecken für die TTV-Community. Personenbezogene Daten werden nur im technisch notwendigen Umfang erhoben.</p>
          </section>

          <section>
            <h3 className="font-oswald text-[var(--accent)] text-lg mb-2 uppercase">2. Recruitment-Service</h3>
            <p>Wenn Sie den Recruitment-Bot nutzen, werden Ihre Eingaben an die Google Gemini API übertragen. Es erfolgt keine dauerhafte Speicherung Ihrer Nachrichtenverläufe auf unseren Servern.</p>
          </section>
        </div>

        <div className="bg-[var(--primary)]/10 p-4 border-t border-[var(--primary)]/30 text-center">
          <button onClick={onClose} className="btn-primary px-8 py-2 font-oswald text-sm tracking-[0.2em] uppercase">Bestätigt</button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;