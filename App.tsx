
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Features from './components/Features.tsx';
import TeamSection from './components/TeamSection.tsx';
import ServerStatus from './components/ServerStatus.tsx';
import Dashboard from './components/Dashboard.tsx';
import JoinSection from './components/JoinSection.tsx';
import Footer from './components/Footer.tsx';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard'>('home');

  // Sync scroll on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const togglePage = (page: 'home' | 'dashboard') => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[var(--bg-deep)] text-[var(--text-main)] transition-colors duration-500">
      <Navbar onNavigate={togglePage} currentPage={currentPage} />
      
      <main className="flex-grow">
        {currentPage === 'home' ? (
          <>
            <Hero />
            
            <section id="about" className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-[var(--bg-offset)] transition-colors duration-500">
              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    <div className="space-y-8 md:space-y-12">
                      <div className="inline-flex items-center gap-3 px-4 py-1 bg-[var(--primary)]/20 border border-[var(--primary)]/40 text-[var(--accent)] text-[10px] font-black tracking-[0.4em] uppercase">
                        Statusbericht HQ
                      </div>
                      <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-oswald leading-none transition-colors">
                        WIR SIND <br />
                        <span className="text-[var(--primary)]">MULTIGAMING.</span>
                      </h2>
                      <p className="text-lg md:text-xl leading-relaxed text-zinc-400 font-light">
                        Willkommen beim <span className="text-white font-bold">Taktischen Totalversagen</span>. 
                        Wir sind eine Ü30 Multigaming-Community, die den Ernst des Lebens an der <span className="hidden md:inline">Garderobe abgibt.</span> 
                      </p>
                      
                      <div className="grid grid-cols-2 gap-8 md:gap-12 py-4 border-y border-[var(--border)]">
                        <div>
                          <h4 className="text-3xl md:text-4xl font-bold text-[var(--accent)] font-oswald tracking-tighter">Ü30+</h4>
                          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-bold">Community-Basis</p>
                        </div>
                        <div>
                          <h4 className="text-3xl md:text-4xl font-bold text-[var(--accent)] font-oswald tracking-tighter">CROSS</h4>
                          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-bold">Einsatzgebiete</p>
                        </div>
                      </div>

                      <div className="p-6 md:p-10 glass-card border-l-8 border-l-[var(--primary)] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-[var(--primary)]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 font-oswald tracking-widest uppercase">Der Einsatz-Monitor</h3>
                        <p className="text-zinc-400 mb-8 font-light text-sm md:text-base">
                          Behalte die Front im Blick. Unser Live-Dashboard zeigt dir Echtzeit-Daten von unseren Servern.
                        </p>
                        <button 
                          onClick={() => togglePage('dashboard')}
                          className="btn-primary inline-flex items-center gap-4 px-6 py-3 md:px-8 md:py-4 font-oswald tracking-widest uppercase text-xs md:text-sm w-full md:w-auto justify-center"
                        >
                          Zentrale öffnen
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                        </button>
                      </div>
                    </div>

                    <div className="relative pt-8 md:pt-12 lg:pt-0">
                      <div className="absolute -inset-10 bg-[var(--primary)]/10 blur-[120px] rounded-full opacity-50"></div>
                      <div className="relative glass-card p-8 md:p-12 border border-white/5 shadow-2xl">
                        <div className="flex items-center gap-4 mb-8 md:mb-10 border-b border-[var(--border)] pb-6">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-[var(--primary)] flex items-center justify-center text-white font-black text-xl md:text-2xl font-oswald italic">!</div>
                            <h3 className="text-2xl md:text-4xl font-bold text-white font-oswald tracking-tight italic">VERHALTENSREGELN</h3>
                        </div>
                        <div className="space-y-6 md:space-y-10">
                          {[
                            "Seid freundlich zueinander, wer Unfrieden stiftet wird des Servers verwiesen",
                            "Rechtswidrige Aktivitäten werden nicht geduldet",
                            "Hier gilt allgemein Meinungsfreiheit, verboten sind jedoch Beleidigungen bzw. Mobbing, Rassismus und Verbreitung von Lügen jeder Art.",
                            "Die Mitgliedschaft in anderen Clans oder Communities ist explizit erlaubt"
                          ].map((rule, i) => (
                            <div key={i} className="flex gap-4 md:gap-6 group">
                              <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-zinc-800 text-[var(--accent)] flex items-center justify-center font-oswald font-bold border border-[var(--border)] group-hover:bg-[var(--primary)] group-hover:text-white transition-colors text-xs md:text-base">
                                0{i+1}
                              </div>
                              <p className="text-zinc-300 leading-relaxed pt-0.5 font-light text-xs md:text-sm italic">
                                "{rule}"
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <Features />
            <TeamSection />
            <ServerStatus />
            
            <section id="roles" className="py-16 md:py-24 lg:py-32 bg-[var(--bg-offset)] border-y border-[var(--border)] transition-colors duration-500">
               <div className="container mx-auto px-4">
                 <div className="text-center mb-12 md:mb-24">
                    <h2 className="text-3xl md:text-5xl font-bold text-white font-oswald mb-6 tracking-widest italic">DIE RÄNGE</h2>
                    <div className="w-24 md:w-32 h-1 bg-[var(--accent)] mx-auto"></div>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-7xl mx-auto">
                    {[
                      { role: '@Besucher', color: 'border-blue-500/40 text-blue-400 bg-blue-500/5', desc: 'Gäste, die unsere Voice Kanäle für gemeinsames Zusammenspiel nutzen können.' },
                      { role: '@Anwärter', color: 'border-green-600/40 text-green-500 bg-green-500/5', desc: 'Die 3-monatige Probezeit für alle, die vollwertiges Mitglied werden wollen.' },
                      { role: '@Member', color: 'border-yellow-500/40 text-yellow-500 bg-yellow-500/5', desc: 'Vollwertige Kameraden nach der Probezeit.' },
                      { role: '@Moderator', color: 'border-orange-500/40 text-orange-500 bg-orange-500/5', desc: 'Gründungsmitglieder und Administratoren unserer Infrastruktur.' }
                    ].map((item, idx) => (
                      <div key={idx} className={`p-6 md:p-10 border transition-all hover:-translate-y-2 cursor-default ${item.color}`}>
                        <div className="text-xl md:text-2xl font-bold mb-4 md:mb-6 font-oswald tracking-widest italic">{item.role}</div>
                        <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-light">{item.desc}</p>
                      </div>
                    ))}
                 </div>
               </div>
            </section>

            <JoinSection />
          </>
        ) : (
          <Dashboard />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
