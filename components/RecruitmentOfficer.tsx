
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { chatWithOfficer } from '../services/geminiService';

interface Message {
  role: 'user' | 'officer';
  text: string;
}

const RecruitmentOfficer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'officer', text: 'Stillgestanden! Ich bin Feldwebel Versagen. Warum schleichst du hier rum? Willst du dich bei TTV einschreiben oder nur die Landschaft bewundern?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await chatWithOfficer(userMsg);
    setMessages(prev => [...prev, { role: 'officer', text: response || '... (Funkstille) ...' }]);
    setIsLoading(false);
  };

  return (
    <div className="w-full glass-card rounded-none overflow-hidden shadow-2xl flex flex-col h-[650px] border border-[#4b5320]/30 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      {/* Header */}
      <div className="bg-[#4b5320]/20 p-6 border-b border-[#4b5320]/30 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-12 h-12 bg-[#4b5320] flex items-center justify-center font-bold text-white border border-[#facc15]/30 italic text-xl font-oswald">
              FV
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1a1c12] shadow-lg"></div>
          </div>
          <div>
            <h4 className="font-oswald font-bold text-white tracking-[0.2em] text-xl leading-none uppercase">Feldwebel Versagen</h4>
            <p className="text-[9px] text-[#facc15] uppercase tracking-[0.3em] mt-2 font-black">Militärische KI-Einheit</p>
          </div>
        </div>
        <div className="flex gap-2">
            <div className="w-3 h-3 border border-[#4b5320] rotate-45"></div>
            <div className="w-3 h-3 bg-[#4b5320] rotate-45"></div>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-grow p-8 overflow-y-auto space-y-8 scroll-smooth relative z-10 bg-[#0f110d]/40">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-reveal`}>
            <div className={`max-w-[85%] p-6 text-[15px] leading-relaxed relative ${
              m.role === 'user' 
                ? 'bg-[#4b5320] text-white rounded-none border-r-4 border-[#facc15]' 
                : 'bg-zinc-900/80 border border-[#4b5320]/20 text-zinc-200 prose-chat rounded-none border-l-4 border-[#facc15]'
            }`}>
              {m.role === 'user' ? (
                <span className="font-medium tracking-wide uppercase text-xs block mb-1 opacity-50">Funkspruch:</span>
              ) : (
                <span className="font-oswald text-[#facc15] text-[10px] tracking-widest block mb-2 uppercase">Antwort Zentrale:</span>
              )}
              {m.role === 'user' ? (
                m.text
              ) : (
                <div className="font-light italic">
                    <ReactMarkdown>{m.text}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#4b5320]/10 border border-[#4b5320]/30 p-4 text-xs text-[#facc15] font-mono tracking-widest">
              EMPFANGE DATEN...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-8 border-t border-[#4b5320]/30 bg-[#4b5320]/10 flex gap-4 relative z-10">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="MELDUNG MACHEN..."
          className="flex-grow bg-black/60 border border-[#4b5320]/40 rounded-none px-6 py-5 text-sm focus:outline-none focus:border-[#facc15] transition-all text-white placeholder:text-zinc-700 font-mono"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-[#facc15] hover:bg-[#fde047] disabled:bg-zinc-800 disabled:text-zinc-600 px-8 py-5 transition-all active:scale-95 flex items-center justify-center text-[#1a1c12] font-black group"
        >
          <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default RecruitmentOfficer;
