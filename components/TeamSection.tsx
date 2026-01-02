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
    <section id="team" className="py-32 bg-[#141612] relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none flex items-center justify-center">
        <span className="text-[20vw] font-black font-oswald select-none">KOMMANDO</span>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <div className="inline-block px-4 py-1 bg-[#4b5320]/10 border border-[#4b5320]/30 text-[#facc15] text-[10px] font-black tracking-[0.4em] uppercase mb-6">
            Oberkommando TTV
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white font-oswald italic tracking-tight mb-8">DIE FÜHRUNGSRIEGE</h2>
          <p className="text-zinc-500 font-light tracking-widest uppercase text-sm">
            Hinter jedem glorreichen Totalversagen stehen Köpfe, die das Chaos koordinieren.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto justify-center">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="group relative">
              {/* Folder/Dossier Look */}
              <div className="absolute inset-0 bg-[#4b5320]/5 border border-[#4b5320]/20 translate-x-2 translate-y-2 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></div>
              <div className="relative glass-card p-8 border border-white/5 transition-all duration-300 group-hover:border-[#facc15]/50 group-hover:-translate-y-1">
                
                {/* "Profile Picture" Placeholder */}
                <div className="w-full aspect-square bg-[#0f110d] mb-8 flex items-center justify-center border border-[#4b5320]/30 overflow-hidden relative">
                   <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
                   <span className="text-6xl font-oswald font-black text-[#4b5320] group-hover:text-[#facc15] transition-colors duration-500 opacity-40">{member.avatar}</span>
                   
                   {/* Stencil Rank */}
                   <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-[#4b5320]/20 text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">
                     ID: {2024 + idx}-FOUNDER
                   </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="block text-[10px] text-[#4b5320] font-black uppercase tracking-[0.3em] mb-1">{member.rank}</span>
                    <h3 className="text-2xl font-bold text-white font-oswald tracking-widest italic">{member.name}</h3>
                  </div>
                  
                  <div className="h-px w-full bg-[#4b5320]/30"></div>
                  
                  <div className="space-y-2">
                    <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider">{member.role}</p>
                    <p className="text-zinc-600 text-[10px] italic font-light">Spezialgebiet: {member.specialty}</p>
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