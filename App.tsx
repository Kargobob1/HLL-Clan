
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
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-5xl font-bold mb-8 text-orange-500 font-oswald">Wer wir sind</h2>
              <p className="text-xl leading-relaxed text-zinc-400">
                Wir sind <span className="text-white font-bold text-2xl">Taktisches Totalversagen (TTV)</span>. 
                Bei uns ist der Name Programm – aber mit Herzblut. In Hell Let Loose legen wir Wert auf 
                Kommunikation, Teamplay und den Mut, auch mal glorreich unterzugehen. 
                Ob Veteran oder blutiger Anfänger: Wenn du weißt, wie man ein Mikrofon benutzt und 
                nicht alles bierernst nimmst, bist du bei uns richtig.
              </p>
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
                  <h2 className="text-5xl font-bold text-orange-500 font-oswald mb-4">Sprich mit dem Spieß</h2>
                  <div className="h-1 w-20 bg-orange-600"></div>
                </div>
                <p className="text-xl text-zinc-400 leading-relaxed">
                  Unser KI-gestützter Rekrutierungsoffizier <span className="text-white font-bold">"Feldwebel Versagen"</span> steht dir Rede und Antwort. 
                  Frage ihn nach unseren Aufnahmekriterien, Clan-Regeln oder lass dir erklären, warum 
                  eine fehlende Außenposten-Markierung den Krieg entscheiden kann.
                </p>
                <div className="p-6 border-l-4 border-orange-500 bg-zinc-900 shadow-xl italic text-lg text-zinc-300">
                  "Wir scheitern nicht einfach nur. Wir scheitern strategisch!"
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
