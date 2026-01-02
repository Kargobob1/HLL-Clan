import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { chatWithOfficer } from '../services/geminiService.ts';

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
    <div className="w-full glass-card rounded-none overflow-hidden shadow-2xl flex flex-col h-[650px] border border-[var(--border)] relative">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      {/* Header */}
      <div className="bg-[var(--primary)]/20 p-6 border-b border-[var(--border)] flex items-center justify-between relative z-10">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-12 h-12 bg-[var(--primary)] flex items-center justify-center font-bold text-white border border-[var(--accent)]/30 italic text-xl font-oswald">
              FV
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[var(--bg-deep)] shadow-lg"></div>
          </div>
          <div>
            <h4 className="font-oswald font-bold text-white tracking-[0.2em] text-xl leading-none uppercase">Feldwebel Versagen</h4>
            <p className="text-[9px] text-[var(--accent)] uppercase tracking-[0.3em] mt-2 font-black">KI-Support Einheit</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-grow p-8 overflow-y-auto space-y-8 scroll-smooth relative z-10 bg-black/40">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-reveal`}>
            <div className={`max-w-[85%] p-6 text-[14px] leading-relaxed relative ${
              m.role === 'user' 
                ? 'bg-[var(--primary)] text-white rounded-none border-r-4 border-[var(--accent)] shadow-xl' 
                : 'bg-zinc-900/80 border border-[var(--border)] text-zinc-200 rounded-none border-l-4 border-[var(--accent)]'
            }`}>
              <span className={`font-oswald text-[10px] tracking-widest block mb-2 uppercase ${m.role === 'user' ? 'text-white/60' : 'text-[var(--accent)]'}`}>
                {m.role === 'user' ? 'Funkspruch:' : 'Zentrale:'}
              </span>
              <div className="font-light">
                  <ReactMarkdown>{m.text}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[var(--primary)]/10 border border-[var(--border)] p-4 text-xs text-[var(--accent)] font-mono tracking-widest animate-pulse">
              EMPFANGE DATEN...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-8 border-t border-[var(--border)] bg-[var(--primary)]/10 flex gap-4 relative z-10">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="MELDUNG MACHEN..."
          className="flex-grow bg-black/60 border border-[var(--border)] rounded-none px-6 py-5 text-sm focus:outline-none focus:border-[var(--accent)] transition-all text-white placeholder:text-zinc-700 font-mono"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-[var(--accent)] hover:filter hover:brightness-110 disabled:bg-zinc-800 disabled:text-zinc-600 px-8 py-5 transition-all active:scale-95 flex items-center justify-center text-[var(--bg-deep)] font-black"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default RecruitmentOfficer;