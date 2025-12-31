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
      
      <div className="relative w-full max-w-3xl glass-card border-2 border-[#4b5320] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-[#4b5320] p-4 flex justify-between items-center">
          <h2 className="font-oswald text-2xl font-bold text-[#facc15] tracking-widest uppercase italic">Datenschutz // Protokoll</h2>
          <button onClick={onClose} className="text-white hover:text-[#facc15] transition-colors p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-8 max-h-[70vh] overflow-y-auto bg-[#1a1c12] text-zinc-300 font-light space-y-6 text-sm custom-scrollbar">
          <section>
            <h3 className="font-oswald text-[#facc15] text-lg mb-2 uppercase">1. Datenschutz auf einen Blick</h3>
            <p>Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese Seite dient lediglich Informationszwecken für die TTV-Community. Personenbezogene Daten werden nur im technisch notwendigen Umfang erhoben (z.B. beim Chat mit dem Recruitment Bot).</p>
          </section>

          <section>
            <h3 className="font-oswald text-[#facc15] text-lg mb-2 uppercase">2. Datenerfassung auf dieser Website</h3>
            <p><strong>Recruitment-Service:</strong> Wenn Sie den Recruitment-Bot nutzen, werden Ihre Eingaben an die Google Gemini API übertragen, um eine Antwort zu generieren. Es erfolgt keine dauerhafte Speicherung Ihrer IP-Adresse oder Nachrichtenverläufe auf unseren Servern.</p>
            <p><strong>Server-Widgets:</strong> Für die Anzeige des Serverstatus werden Daten von Drittanbietern (gamemonitoring.ru) geladen. Hierbei wird technisch bedingt Ihre IP-Adresse an den Anbieter des Widgets übertragen.</p>
          </section>

          <section>
            <h3 className="font-oswald text-[#facc15] text-lg mb-2 uppercase">3. Externe Dienste</h3>
            <p>Diese Website nutzt Google Fonts und Dienste von ESM.sh zur Bereitstellung von Bibliotheken. Hierbei können Daten an Server in den USA übertragen werden. Durch die Nutzung der Seite erklären Sie sich damit einverstanden.</p>
          </section>

          <section>
            <h3 className="font-oswald text-[#facc15] text-lg mb-2 uppercase">4. Ihre Rechte</h3>
            <p>Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten.</p>
          </section>
        </div>

        <div className="bg-[#4b5320]/10 p-4 border-t border-[#4b5320]/30 text-center">
          <button onClick={onClose} className="btn-army px-8 py-2 font-oswald text-sm tracking-[0.2em] uppercase">Bestätigt</button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;