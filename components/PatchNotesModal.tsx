
import React from 'react';

interface PatchNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Patch {
  version: string;
  date: string;
  type: 'HOTFIX' | 'FEATURE' | 'UPDATE';
  changes: string[];
}

const patchHistory: Patch[] = [
  {
    version: "v1.0.2",
    date: "26.05.2025",
    type: "UPDATE",
    changes: [
      "[FEATURE] **Top-Statistiken (Broadcast)**: Aktivierungsschwelle angepasst. Die Highlight-Anzeige wird nun bereits ab 10 aktiven Spielern live geschaltet.",
      "[UI] Interface-Bereinigung: 'Signal zu schwach'-Overlay entfernt. Das Layout passt sich nun dynamisch an die Serverlast an.",
      "[CORE] Backend-Architektur: Umfassendes Refactoring der asynchronen Daten-Pipeline und Implementierung einer neuen Caching-Strategie zur Minimierung von RCON-Latenzen und Race-Conditions (8h Deep-Dive Stabilisierung)."
    ]
  },
  {
    version: "v1.0.1",
    date: "25.05.2025",
    type: "HOTFIX",
    changes: [
      "[LEGAL] Impressumsdaten aktualisiert (Standort Wettringen).",
      "[ASSETS] Favicon implementiert (Clan-Logo).",
      "[FIX] Mobile Ansicht der Navigation stabilisiert."
    ]
  },
  {
    version: "v1.0.0",
    date: "20.05.2025",
    type: "FEATURE",
    changes: [
      "[RELEASE] Initialer Launch der TTV Landingpage.",
      "[FEATURE] Live-Dashboard mit HLL RCON Schnittstelle.",
      "[FEATURE] KI-Rekrutierungsoffizier 'Feldwebel Versagen' aktiviert.",
      "[DESIGN] Dark-Mode Military Theme implementiert."
    ]
  }
];

const PatchNotesModal: React.FC<PatchNotesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-2xl glass-card border-2 border-[var(--primary)] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-[var(--primary)] p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
             <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
             <h2 className="font-oswald text-2xl font-bold text-[var(--accent)] tracking-widest uppercase italic">System Changelog</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-[var(--accent)] transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-0 overflow-y-auto custom-scrollbar bg-black/40">
           <div className="divide-y divide-white/10">
              {patchHistory.map((patch, idx) => (
                <div key={idx} className="p-6 hover:bg-white/5 transition-colors">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                         <div className="flex items-center gap-3">
                            <span className="font-mono text-[var(--accent)] font-bold text-lg">{patch.version}</span>
                            <span className={`text-[9px] px-2 py-0.5 rounded border ${
                                patch.type === 'HOTFIX' ? 'border-red-500 text-red-400 bg-red-500/10' :
                                patch.type === 'FEATURE' ? 'border-green-500 text-green-400 bg-green-500/10' :
                                'border-blue-500 text-blue-400 bg-blue-500/10'
                            } font-bold tracking-widest uppercase`}>
                                {patch.type}
                            </span>
                         </div>
                         <span className="text-xs text-zinc-500 font-mono mt-1 block">{patch.date}</span>
                      </div>
                   </div>
                   <ul className="space-y-2">
                      {patch.changes.map((change, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-3 text-sm text-zinc-300 font-light leading-relaxed">
                           <span className="mt-1.5 w-1 h-1 bg-[var(--primary)] shrink-0"></span>
                           <span dangerouslySetInnerHTML={{ 
                             __html: change.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>') 
                           }}></span>
                        </li>
                      ))}
                   </ul>
                </div>
              ))}
           </div>
        </div>

        {/* Footer */}
        <div className="bg-[var(--bg-deep)] p-4 border-t border-[var(--primary)]/30 text-center shrink-0">
          <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-[0.2em]">End of Log</p>
        </div>
      </div>
    </div>
  );
};

export default PatchNotesModal;
