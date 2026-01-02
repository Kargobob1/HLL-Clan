import React from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Features from './components/Features.tsx';
import TeamSection from './components/TeamSection.tsx';
import ServerStatus from './components/ServerStatus.tsx';
import RecruitmentOfficer from './components/RecruitmentOfficer.tsx';
import JoinSection from './components/JoinSection.tsx';
import Footer from './components/Footer.tsx';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[var(--bg-deep)] text-[var(--text-main)] transition-colors duration-500">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        <section id="about" className="py-32 relative overflow-hidden bg-[var(--bg-offset)] transition-colors duration-500">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                <div className="space-y-12">
                  <div className="inline-flex items-center gap-3 px-4 py-1 bg-[var(--primary)]/20 border border-[var(--primary)]/40 text-[var(--accent)] text-[10px] font-black tracking-[0.4em] uppercase">
                    Statusbericht HQ
                  </div>
                  <h2 className="text-6xl md:text-7xl font-bold text-white font-oswald leading-none transition-colors">
                    WIR SIND <br />
                    <span className="text-[var(--primary)]">MULTIGAMING.</span>
                  </h2>
                  <p className="text-xl leading-relaxed text-zinc-400 font-light">
                    Willkommen beim <span className="text-white font-bold">Taktischen Totalversagen</span>. 
                    Wir sind eine Ü30 Multigaming-Community, die den Ernst des Lebens an der <span className="hidden md:inline">Garderobe abgibt.</span> 
                    Ob wir in HLL die Front halten, in Squad taktieren oder in anderen Welten scheitern – bei uns zählt der Kamerad.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-12 py-4 border-y border-[var(--border)]">
                    <div>
                      <h4 className="text-4xl font-bold text-[var(--accent)] font-oswald tracking-tighter">Ü30+</h4>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-bold">Community-Basis</p>
                    </div>
                    <div>
                      <h4 className="text-4xl font-bold text-[var(--accent)] font-oswald tracking-tighter">CROSS</h4>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-bold">Einsatzgebiete</p>
                    </div>
                  </div>

                  <div className="p-10 glass-card border-l-8 border-l-[var(--primary)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
                    <h3 className="text-2xl font-bold text-white mb-4 font-oswald tracking-widest uppercase">Der Rekrutierungsweg</h3>
                    <p className="text-zinc-400 mb-8 font-light">
                      Kein langes Formular. Komm auf unseren Discord, geh in den Kanal <span className="text-[var(--accent)] font-bold">#vorstellung</span> und sag wer du bist und was du zockst.
                    </p>
                    <a 
                      href="https://discord.gg/XJ4fFaTDDr" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center gap-4 px-8 py-4 font-oswald tracking-widest uppercase text-sm"
                    >
                      Im Discord melden
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                    </a>
                  </div>
                </div>

                <div className="relative pt-12 lg:pt-0">
                  <div className="absolute -inset-10 bg-[var(--primary)]/10 blur-[120px] rounded-full opacity-50"></div>
                  <div className="relative glass-card p-12 border border-white/5 shadow-2xl">
                    <div className="flex items-center gap-4 mb-10 border-b border-[var(--border)] pb-6">
                        <div className="w-12 h-12 bg-[var(--primary)] flex items-center justify-center text-white font-black text-2xl font-oswald italic">!</div>
                        <h3 className="text-4xl font-bold text-white font-oswald tracking-tight italic">VERHALTENSREGELN</h3>
                    </div>
                    <div className="space-y-10">
                      {[
                        "Seid freundlich zueinander, wer Unfrieden stiftet wird des Servers verwiesen",
                        "Rechtswidrige Aktivitäten werden nicht geduldet",
                        "Hier gilt allgemein Meinungsfreiheit, verboten sind jedoch Beleidigungen bzw. Mobbing, Rassismus und Verbreitung von Lügen jeder Art und Spamming in den Kanälen.",
                        "Die Mitgliedschaft in anderen Clans oder Communities ist explizit erlaubt"
                      ].map((rule, i) => (
                        <div key={i} className="flex gap-6 group">
                          <div className="flex-shrink-0 w-8 h-8 bg-zinc-800 text-[var(--accent)] flex items-center justify-center font-oswald font-bold border border-[var(--border)] group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                            0{i+1}
                          </div>
                          <p className="text-zinc-300 leading-relaxed pt-0.5 font-light text-sm italic">
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
        
        {/* KI-OFFICER SEKTION VORERST AUSKOMMENTIERT 
        <section id="ai-officer" className="py-32 bg-[var(--bg-deep)] relative transition-colors duration-500">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="order-2 lg:order-1">
                <RecruitmentOfficer />
              </div>
              <div className="order-1 lg:order-2 space-y-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black tracking-widest uppercase">
                  KI-Unterstützte Rekrutierung
                </div>
                <h2 className="text-6xl font-bold text-white font-oswald leading-tight italic">FRAG DEN <br /><span className="text-[var(--accent)]">SPIESS</span></h2>
                <p className="text-xl text-zinc-400 leading-relaxed font-light italic">
                  "Ich habe schon Rekruten wie dich gefrühstückt. Wenn du wissen willst, wie wir hier ticken, frag einfach. Aber mach es kurz!"
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-[var(--primary)]/5 border border-[var(--border)] rounded-none">
                    <span className="block text-[var(--accent)] font-oswald font-bold mb-2 tracking-widest uppercase">DISZIPLIN</span>
                    <span className="text-xs text-zinc-500 uppercase font-mono">Taktisch</span>
                  </div>
                  <div className="p-6 bg-[var(--primary)]/5 border border-[var(--border)] rounded-none">
                    <span className="block text-[var(--accent)] font-oswald font-bold mb-2 tracking-widest uppercase">LAUNE</span>
                    <span className="text-xs text-zinc-500 uppercase font-mono">Multigaming-Modus</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        */}

        <section id="roles" className="py-32 bg-[var(--bg-offset)] border-y border-[var(--border)] transition-colors duration-500">
           <div className="container mx-auto px-4">
             <div className="text-center mb-24">
                <h2 className="text-5xl font-bold text-white font-oswald mb-6 tracking-widest italic">DIE HIERARCHIE</h2>
                <div className="w-32 h-1 bg-[var(--accent)] mx-auto"></div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {[
                  { role: '@Besucher', color: 'border-blue-500/40 text-blue-400 bg-blue-500/5', desc: 'Gäste, die unsere Voice Kanäle für gemeinsames Zusammenspiel nutzen können.' },
                  { role: '@Anwärter', color: 'border-[var(--accent)]/40 text-[var(--accent)] bg-[var(--accent)]/5', desc: 'Die 3-monatige Probezeit für alle, die vollwertiges Mitglied werden wollen.' },
                  { role: '@Member', color: 'border-[var(--primary)]/40 text-[var(--primary)] bg-[var(--primary)]/5', desc: 'Vollwertige Kameraden nach der Probezeit (Veto-Recht der bestehenden Member).' },
                  { role: '@Moderator', color: 'border-red-500/40 text-red-500 bg-red-500/5', desc: 'Gründungsmitglieder und Administratoren unserer Infrastruktur.' }
                ].map((item, idx) => (
                  <div key={idx} className={`p-10 border transition-all hover:-translate-y-2 cursor-default ${item.color}`}>
                    <div className="text-2xl font-bold mb-6 font-oswald tracking-widest italic">{item.role}</div>
                    <p className="text-zinc-400 text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                ))}
             </div>
           </div>
        </section>

        <JoinSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;