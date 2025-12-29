
import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
  <div className="glass-card p-10 rounded-2xl transition-all group hover:border-amber-500/30">
    <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 mb-8 group-hover:scale-110 transition-transform duration-500">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4 font-oswald text-white tracking-wide">{title}</h3>
    <p className="text-zinc-400 leading-relaxed font-light">{description}</p>
  </div>
);

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-transparent relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard 
            title="Keine Pflichten"
            description="Reallife geht immer vor. Wir haben keine Trainingspflicht oder festen Anwesenheitszwang. Zock wenn du Zeit und Lust hast."
            icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
          />
          <FeatureCard 
            title="Teamplay & Funk"
            description="Wir spielen taktisch. Squad-Kommunikation und Teamwork stehen an oberster Stelle, auch wenn wir am Ende verlieren."
            icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>}
          />
          <FeatureCard 
            title="Eigener Server"
            description="Wir betreiben einen stabilen HLL Server mit aktiven Admins für faire Matches und eine gute Atmosphäre."
            icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v4a2 2 0 00-2-2"></path></svg>}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
