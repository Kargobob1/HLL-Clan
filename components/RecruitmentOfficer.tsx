
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
    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[550px]">
      <div className="bg-zinc-800 p-4 border-b border-zinc-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center font-bold text-white">FV</div>
          <div>
            <h4 className="font-bold text-sm text-white">Feldwebel Versagen</h4>
            <p className="text-[10px] text-green-500 uppercase tracking-widest font-bold animate-pulse">Einsatzbereit</p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 scroll-smooth bg-zinc-950/30">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-xl text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/20' 
                : 'bg-zinc-800 border border-zinc-700 text-zinc-200 shadow-md prose-chat'
            }`}>
              {m.role === 'user' ? (
                m.text
              ) : (
                <ReactMarkdown>{m.text}</ReactMarkdown>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 border border-zinc-700 p-4 rounded-xl text-sm text-zinc-400">
              <span className="flex gap-1">
                <span className="animate-bounce inline-block w-1.5 h-1.5 bg-zinc-500 rounded-full"></span>
                <span className="animate-bounce inline-block w-1.5 h-1.5 bg-zinc-500 rounded-full delay-75"></span>
                <span className="animate-bounce inline-block w-1.5 h-1.5 bg-zinc-500 rounded-full delay-150"></span>
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-zinc-800 bg-zinc-900 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Stell eine Frage, Rekrut..."
          className="flex-grow bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors text-white placeholder:text-zinc-600"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-orange-600 hover:bg-orange-700 disabled:bg-zinc-800 disabled:text-zinc-600 px-5 py-3 rounded-lg transition-all active:scale-95 flex items-center justify-center"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default RecruitmentOfficer;
