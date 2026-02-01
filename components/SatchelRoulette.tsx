
import React, { useState } from 'react';

const outcomes = [
  { text: "VOLLTREFFER! Feindlicher Tiger zu Altmetall verarbeitet.", type: "win" },
  { text: "UPS... Das war der eigene Supply Truck. Der Commander weint.", type: "fail" },
  { text: "Satchel am Zaun hängen geblieben. Du hast dich selbst gesprengt.", type: "fail" },
  { text: "Feindliche Garnison zerstört! +50 Punkte für Gryffindor!", type: "win" },
  { text: "TEAMKILL x6! Der Admin tippt bereits /ban...", type: "mega-fail" },
  { text: "Blindgänger. Peinlich. Alle schauen dich an.", type: "neutral" },
  { text: "Du hast versehentlich eine Kuh gesprengt. Tierschützer sind alarmiert.", type: "neutral" },
  { text: "Lunte zu kurz! BUMM direkt im Gesicht.", type: "fail" },
  { text: "Perfekt platziert! Der gegnerische Bunker ist Geschichte.", type: "win" }
];

const SatchelRoulette: React.FC = () => {
  const [gameState, setGameState] = useState<'idle' | 'ticking' | 'result'>('idle');
  const [result, setResult] = useState<typeof outcomes[0] | null>(null);
  const [timer, setTimer] = useState(3);

  const pullTrigger = () => {
    if (gameState === 'ticking') return;
    
    setGameState('ticking');
    setTimer(3);
    setResult(null);

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          revealResult();
          return 0;
        }
        return prev - 1;
      });
    }, 800);
  };

  const revealResult = () => {
    const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
    setResult(randomOutcome);
    setGameState('result');
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto glass-card border border-red-500/30 p-10 text-center relative overflow-hidden group">
            
            {/* Background Details */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[var(--primary)]/20"></div>
            <div className="absolute -left-10 -bottom-10 text-[8rem] text-red-500/5 font-black font-oswald select-none -rotate-12">BOOM</div>

            <div className="relative z-10">
                <div className="inline-block px-3 py-1 bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-black tracking-[0.3em] uppercase mb-4">
                    Sprengmeister-Training
                </div>
                <h2 className="text-3xl md:text-5xl font-bold font-oswald text-white mb-4 uppercase italic tracking-tight">
                    SATCHEL ROULETTE
                </h2>
                <p className="text-zinc-500 text-sm tracking-widest uppercase mb-10 max-w-lg mx-auto">
                    30 Sekunden Timer? Langweilig. Wir spielen mit dem Schicksal.
                    Drück den Knopf und bete, dass es den Feind trifft.
                </p>

                <div className="min-h-[140px] flex items-center justify-center mb-8 bg-black/20 border border-white/5 mx-auto max-w-lg rounded-sm relative overflow-hidden">
                    {gameState === 'idle' && (
                        <div className="text-zinc-600 font-mono text-sm uppercase tracking-widest animate-pulse">
                            [ System bereit - Sprengladung scharf ]
                        </div>
                    )}

                    {gameState === 'ticking' && (
                        <div className="flex flex-col items-center">
                            <div className="text-6xl font-black font-oswald text-red-500 animate-ping mb-2">
                                {timer}
                            </div>
                            <div className="text-red-400 text-xs font-mono uppercase tracking-[0.5em]">
                                Lunte brennt...
                            </div>
                        </div>
                    )}

                    {gameState === 'result' && result && (
                        <div className={`p-6 w-full h-full flex flex-col items-center justify-center animate-in zoom-in duration-200 ${
                            result.type === 'win' ? 'bg-green-500/10' : 
                            result.type === 'mega-fail' ? 'bg-red-600/20' : 
                            result.type === 'fail' ? 'bg-orange-500/10' : 'bg-zinc-800'
                        }`}>
                            <div className={`text-xl md:text-2xl font-bold font-oswald uppercase leading-tight mb-2 ${
                                result.type === 'win' ? 'text-green-400' : 
                                result.type === 'mega-fail' ? 'text-red-500 animate-pulse' : 
                                result.type === 'fail' ? 'text-orange-400' : 'text-zinc-400'
                            }`}>
                                {result.text}
                            </div>
                            {result.type === 'mega-fail' && <div className="text-[10px] text-red-500 font-mono mt-2">ADMIN ALARM TRIGGERED</div>}
                        </div>
                    )}
                </div>

                <button 
                    onClick={pullTrigger}
                    disabled={gameState === 'ticking'}
                    className={`
                        relative inline-flex items-center justify-center px-10 py-5 
                        font-black text-white transition-all duration-200 font-oswald tracking-[0.2em] uppercase 
                        border-2 focus:outline-none focus:ring-4 focus:ring-red-500/50
                        ${gameState === 'ticking' 
                            ? 'bg-zinc-800 border-zinc-700 cursor-not-allowed grayscale' 
                            : 'bg-red-600 border-red-500 hover:bg-red-700 hover:scale-105 shadow-[0_0_30px_rgba(220,38,38,0.4)]'
                        }
                    `}
                >
                    {gameState === 'ticking' ? 'LAUF WEG!' : 'LUNTE ZÜNDEN'}
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default SatchelRoulette;
