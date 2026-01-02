import React from 'react';

const teamMembers = [
  {
    rank: "Generalstab",
    name: "Knödeltiger",
    role: "Gründer & Strategische Leitung",
    specialty: "Taktisches Chaos-Management",
    avatar: "KT"
  },
  {
    rank: "Generalstab",
    name: "Isnaton",
    role: "Gründer & Infrastruktur",
    specialty: "Sektor-Sicherung & IT-Logistik",
    avatar: "IS"
  },
  {
    rank: "Generalstab",
    name: "Caro",
    role: "Gründerin & Personalwesen",
    specialty: "Diplomatie & Community-Zusammenhalt",
    avatar: "CA"
  }
];

const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-32 bg-[var(--bg-deep)] relative overflow-hidden transition-colors duration-500">
      {/* Background Graphic */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none flex items-center justify-center">
        <span className="text-[20vw] font-black font-oswald select-none">KOMMANDO</span>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <div className="inline-block px-4 py-1 bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--accent)] text-[10px] font-black tracking-[0.4em] uppercase mb-6">
            Oberkommando TTV
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white font-oswald italic tracking-tight mb-8">DIE FÜHRUNGSRIEGE</h2>
          <p className="text-zinc-500 font-light tracking-widest uppercase text-sm">
            Hinter jedem glorreichen Totalversagen stehen Köpfe, die das Chaos koordinieren.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto items-stretch">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="group relative flex flex-col h-full">
              {/* Card Shadow/Offset Background */}
              <div className="absolute inset-0 bg-[var(--primary)]/5 border border-[var(--primary)]/20 translate-x-3 translate-y-3 transition-transform group-hover:translate-x-0 group-hover:translate-y-0 duration-500"></div>
              
              {/* Main Card Content */}
              <div className="relative glass-card p-8 border border-white/5 transition-all duration-300 group-hover:border-[var(--accent)]/50 flex flex-col h-full">
                
                {/* Dossier Image Container */}
                <div className="w-full aspect-square bg-black/40 mb-8 flex items-center justify-center border border-[var(--primary)]/30 overflow-hidden relative shrink-0">
                   {/* Scanline Effect Inside Avatar */}
                   <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-50"></div>
                   
                   <span className="text-7xl font-oswald font-black text-[var(--primary)] group-hover:text-[var(--accent)] transition-colors duration-700 opacity-30 select-none">
                     {member.avatar}
                   </span>
                   
                   <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 text-[8px] font-mono text-zinc-500 uppercase tracking-tighter border border-white/5">
                     FILE: {2024 + idx}-FOUNDER
                   </div>
                </div>

                {/* Info Block */}
                <div className="flex flex-col flex-grow">
                  <div className="mb-6">
                    <span className="block text-[10px] text-[var(--primary)] font-black uppercase tracking-[0.4em] mb-2">{member.rank}</span>
                    <h3 className="text-3xl font-bold text-white font-oswald tracking-widest italic uppercase leading-none">{member.name}</h3>
                  </div>
                  
                  <div className="h-px w-full bg-[var(--primary)]/30 mb-6"></div>
                  
                  <div className="space-y-4 flex-grow">
                    <div>
                      <p className="text-zinc-200 text-xs font-bold uppercase tracking-wider mb-1">{member.role}</p>
                      <p className="text-zinc-500 text-[11px] leading-relaxed italic font-light">
                        Spezialgebiet: {member.specialty}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between items-center opacity-30 group-hover:opacity-100 transition-opacity">
                     <div className="h-0.5 w-12 bg-[var(--primary)]"></div>
                     <span className="text-[10px] font-mono text-zinc-600">AUTH: LEVEL-4</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;