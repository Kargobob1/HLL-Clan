
import React from 'react';

// New hierarchy based on user request
const leadershipGroups = [
  {
    title: "Der Senat",
    subtitle: "Gründer & Oberste Führung",
    color: "text-fuchsia-500",
    border: "border-fuchsia-500/20",
    bg: "bg-fuchsia-500/5",
    members: [
      { name: "Knödeltiger", role: "Imperator / Leitung", special: "Strategische Vision" },
      { name: "Isnaton", role: "Technologie & Infrastruktur", special: "Sektor-Sicherung" },
      { name: "CarolinchenBienchen", role: "Personal & Community", special: "Diplomatie" }
    ]
  },
  {
    title: "Konsuln",
    subtitle: "Administration & Management",
    color: "text-cyan-400",
    border: "border-cyan-400/20",
    bg: "bg-cyan-400/5",
    members: [
      { name: "Guderian1981", special: "" },
      { name: "Mr. M@tt", special: "" }
    ]
  },
  {
    title: "Präfekten",
    subtitle: "Moderation & Ordnung",
    color: "text-emerald-400",
    border: "border-emerald-400/20",
    bg: "bg-emerald-400/5",
    members: [
      { name: "N0cK0uT", special: "" },
      { name: "Kakarot | Cem", special: "" }
    ]
  }
];

const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-32 bg-[var(--bg-deep)] relative overflow-hidden transition-colors duration-500">
      {/* Background Graphic */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none flex items-center justify-center">
        <span className="text-[20vw] font-black font-oswald select-none">FÜHRUNG</span>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-block px-4 py-1 bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--accent)] text-[10px] font-black tracking-[0.4em] uppercase mb-6">
            Oberkommando TTV
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white font-oswald italic tracking-tight mb-8">DIE FÜHRUNGSRIEGE</h2>
          <p className="text-zinc-500 font-light tracking-widest uppercase text-sm">
            Hinter jedem glorreichen Totalversagen stehen Köpfe, die das Chaos koordinieren.
          </p>
        </div>

        <div className="space-y-16 max-w-7xl mx-auto">
          {leadershipGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="relative">
               <div className="flex items-center gap-4 mb-8">
                  <div className={`h-px flex-grow bg-gradient-to-r from-transparent to-zinc-700`}></div>
                  <div className="text-center">
                    <h3 className={`text-2xl md:text-3xl font-oswald font-bold uppercase tracking-widest ${group.color}`}>{group.title}</h3>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-bold">{group.subtitle}</p>
                  </div>
                  <div className={`h-px flex-grow bg-gradient-to-l from-transparent to-zinc-700`}></div>
               </div>

               <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                  {group.members.map((member: any, mIdx) => (
                    <div key={mIdx} className="w-full md:w-[350px] group relative">
                       {/* Card Shadow/Offset Background */}
                       <div className={`absolute inset-0 ${group.bg} border ${group.border} translate-x-2 translate-y-2 transition-transform group-hover:translate-x-0 group-hover:translate-y-0 duration-500`}></div>
                       
                       <div className="relative glass-card p-8 border border-white/5 transition-all duration-300 hover:border-white/20 h-full flex flex-col items-center text-center">
                          <h4 className="text-2xl font-bold text-white font-oswald tracking-widest uppercase mb-2">{member.name}</h4>
                          
                          {/* Colored Separator */}
                          <div className={`w-12 h-1 ${group.bg.replace('/5', '')} mb-4`}></div>
                          
                          {/* Role - Only shown if defined (Senat) */}
                          {member.role && (
                            <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${group.color}`}>{member.role}</p>
                          )}
                          
                          {/* Special Description */}
                          <p className="text-[10px] text-zinc-500 italic uppercase tracking-widest">{member.special}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
