
import React, { useState } from 'react';

const excuses = [
  "Der Ping war zu hoch (obwohl ich Host bin).",
  "Die Sonne hat geblendet! (auf einer Nachtmap)",
  "Meine Katze hat 'Alt+F4' gedrückt.",
  "Ich dachte, Friendly Fire heilt.",
  "Das war ein taktischer Rückzug in den Tod.",
  "Der Commander hat zu leise geschrien.",
  "Mein Monitor hat Ghosting, ich habe drei Panzer gesehen.",
  "Ich wollte nur testen, ob die Granate wirklich explodiert.",
  "Das Visier war beschlagen.",
  "Lag! Eindeutig Lag! ... oder Skill-Issue.",
  "Ich habe nach Gehör gespielt (ohne Headset).",
  "Die Hitbox von dem Grashalm war riesig!",
  "Ich dachte, das wäre ein NPC.",
  "Meine W Taste hat geklemmt... im Rückwärtsgang.",
  "Ich habe versucht, den Gegner mit Freundlichkeit zu töten.",
  "Das war kein Missclick, das war ein Warnschuss in den Kopf.",
  "Der Busch hat sich bewegt!",
  "Mein Gaming-Stuhl hat gewackelt."
];

const loadingTexts = [
  "Kalibriere Unfähigkeit...",
  "Suche Sündenbock...",
  "Berechne Windgeschwindigkeit im Wohnzimmer...",
  "Lade Ausreden-Datenbank...",
  "Analysiere Skill-Level (Ergebnis: 0)..."
];

const ExcuseGenerator: React.FC = () => {
  const [excuse, setExcuse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadText, setLoadText] = useState("");

  const generateExcuse = () => {
    if (loading) return;
    setLoading(true);
    setExcuse(null);
    setLoadText(loadingTexts[Math.floor(Math.random() * loadingTexts.length)]);

    setTimeout(() => {
      const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
      setExcuse(randomExcuse);
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto glass-card border border-[var(--border)] p-8 md:p-12 text-center relative overflow-hidden group">
            
            {/* Background Details */}
            <div className="absolute top-0 left-0 w-full h-2 bg-[var(--primary)]/20 repeating-linear-gradient-45"></div>
            <div className="absolute -right-10 -bottom-10 text-[10rem] text-white/5 font-black font-oswald select-none rotate-12">FAIL</div>

            <div className="relative z-10">
                <div className="inline-block px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-black tracking-[0.3em] uppercase mb-4 animate-pulse">
                    Notfall-System
                </div>
                <h2 className="text-3xl md:text-5xl font-bold font-oswald text-white mb-4 uppercase italic">
                    T.A.G. 3000
                </h2>
                <p className="text-zinc-500 text-sm tracking-widest uppercase mb-10">
                    Taktischer Ausreden-Generator (Modell "Totalversagen")
                </p>

                <div className="min-h-[120px] flex items-center justify-center mb-10">
                    {loading ? (
                        <div className="flex flex-col items-center gap-4">
                             <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-[var(--accent)] rounded-full animate-spin"></div>
                             <span className="text-xs font-mono text-[var(--accent)] animate-pulse">{loadText}</span>
                        </div>
                    ) : excuse ? (
                        <div className="animate-in zoom-in duration-300">
                             <div className="text-2xl md:text-4xl font-bold text-white font-oswald leading-tight">
                                "{excuse}"
                             </div>
                             <div className="mt-4 text-xs text-zinc-500 font-mono uppercase">
                                Zertifizierte Ausrede #{(Math.random() * 1000).toFixed(0)}
                             </div>
                        </div>
                    ) : (
                        <div className="text-zinc-600 font-light italic">
                            Drücke den Knopf, wenn du wieder mal <br/> grundlos gestorben bist.
                        </div>
                    )}
                </div>

                <button 
                    onClick={generateExcuse}
                    disabled={loading}
                    className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-[var(--primary)] font-oswald tracking-widest uppercase hover:bg-[var(--primary-light)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                    <span className="relative flex items-center gap-3">
                        {loading ? 'BERECHNE...' : 'AUSREDE GENERIEREN'}
                        {!loading && <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>}
                    </span>
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ExcuseGenerator;
