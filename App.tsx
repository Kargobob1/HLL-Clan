
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ServerStatus from './components/ServerStatus';
import RecruitmentOfficer from './components/RecruitmentOfficer';
import JoinSection from './components/JoinSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#0a0a0a]">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        <section id="about" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* About Us Text */}
                <div className="space-y-8">
                  <h2 className="text-5xl font-bold text-orange-500 font-oswald uppercase">Wer wir sind</h2>
                  <p className="text-xl leading-relaxed text-zinc-300">
                    Wir sind ein <span className="text-white font-bold underline decoration-orange-600 decoration-2">Ü30 Gaming Clan</span>. 
                    Unser Hauptspiel ist aktuell Hell Let Loose, aber wir spielen auch viele andere Spiele. 
                    Bei uns steht das Miteinander im Vordergrund – wir wollen gemeinsam eine gute Zeit haben.
                  </p>
                  <p className="text-zinc-400">
                    Um Teil unserer Community zu werden, komm einfach auf unseren Discord. 
                    Dort findest du im Kanal <span className="text-orange-500">#regeln</span> alle weiteren Infos. 
                    Wir freuen uns darauf, dich kennenzulernen!
                  </p>
                  
                  <div className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-xl shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-4 font-oswald uppercase tracking-wider">Der Weg zum Member</h3>
                    <p className="text-zinc-400 text-sm mb-4">
                      Stelle dich im Kanal <span className="text-orange-500 font-bold">#vorstellung</span> vor. 
                      Erzähle uns wer du bist (Name/Rufname), wie alt du bist und was du gerne spielst.
                    </p>
                    <a 
                      href="https://discord.gg/XJ4fFaTDDr" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-orange-500 font-bold hover:text-orange-400 transition-colors"
                    >
                      Zum Discord Kanal #vorstellung
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </a>
                  </div>
                </div>

                {/* Rules List (Exact Wording) */}
                <div className="bg-zinc-900/50 p-10 border border-zinc-800 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-8 font-oswald uppercase border-b border-orange-600 pb-2">Regelwerk</h3>
                  <ul className="space-y-6 text-zinc-300">
                    <li className="flex gap-4">
                      <span className="text-orange-600 font-black text-xl">1)</span>
                      <span>Seid freundlich zueinander, wer Unfrieden stiftet wird des Servers verwiesen</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-orange-600 font-black text-xl">2)</span>
                      <span>Rechtswidrige Aktivitäten werden nicht geduldet</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-orange-600 font-black text-xl">3)</span>
                      <span>Hier gilt allgemein Meinungsfreiheit, verboten sind jedoch Beleidigungen bzw. Mobbing, Rassismus und Verbreitung von Lügen jeder Art und Spamming in den Kanälen.</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-orange-600 font-black text-xl">4)</span>
                      <span>Die Mitgliedschaft in anderen Clans oder Communities ist explizit erlaubt</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Clan Roles Section */}
              <div className="mt-20">
                <h3 className="text-3xl font-bold text-white text-center mb-12 font-oswald uppercase">Unsere Clan-Struktur</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { role: '@Besucher', color: 'text-blue-400', desc: 'Gäste die Teile unserer Clan Infrastruktur nutzen können, zB.: Voice Kanäle für Zusammenspiel mit anderen Clans/Communities' },
                    { role: '@Anwärter', color: 'text-yellow-500', desc: 'Wenn du dich als Member bewirbst, musst du noch eine 3 Monatige Probezeit absolvieren' },
                    { role: '@Member', color: 'text-green-500', desc: 'Vollwertige Member nach Ablauf der Probezeit wenn es zu keinem Veto der bestehenden Member gibt.' },
                    { role: '@Moderator', color: 'text-red-600', desc: 'Gründungsmitglieder die den Server administrieren' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg hover:border-orange-500/30 transition-all">
                      <div className={`font-black text-xl mb-3 ${item.color}`}>{item.role}</div>
                      <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Features />
        <ServerStatus />
        
        <section id="ai-officer" className="py-24 bg-black border-y border-zinc-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <RecruitmentOfficer />
              </div>
              <div className="order-1 lg:order-2 space-y-8">
                <div>
                  <h2 className="text-5xl font-bold text-orange-500 font-oswald mb-4">Der Spieß hat das Wort</h2>
                  <div className="h-1 w-20 bg-orange-600"></div>
                </div>
                <p className="text-xl text-zinc-400 leading-relaxed">
                  Hast du Fragen zum Bewerbungsprozess oder zur Probezeit? 
                  Unser KI-gestützter <span className="text-white font-bold">Feldwebel Versagen</span> ist mit dem aktuellen Regelwerk vertraut. 
                  Erkläre ihm dein Anliegen, aber fass dich kurz!
                </p>
                <div className="p-6 border-l-4 border-orange-500 bg-zinc-900 shadow-xl italic text-lg text-zinc-300">
                  "Regeln sind da, um eingehalten zu werden. Wer quer schießt, kann seine Sachen packen."
                </div>
              </div>
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
