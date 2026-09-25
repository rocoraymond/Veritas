import { PHILOSOPHY_STUDY } from '@/data/horology-studies';
import { ScrollReveal, ScrollParallax } from '@/components/ui/scroll-reveal';

export function PhilosophySection() {
  const PILLARS = [
    {
      num: '01',
      title: 'Precision',
      detail: 'Measured accuracy governed by mechanical equilibrium. Every component exists solely to serve temporal truth.',
    },
    {
      num: '02',
      title: 'Restraint',
      detail: 'The conscious rejection of decorative excess. True luxury resides in quiet surfaces, deliberate weights, and balanced proportions.',
    },
    {
      num: '03',
      title: 'Permanence',
      detail: 'Built to transcend ephemeral design cycles. Physical engineering that endures generations without obsolescence.',
    },
    {
      num: '04',
      title: 'Authenticity',
      detail: 'Veritas: Latin for truth. Complete transparency in materials, construction, and mechanical intention.',
    },
  ];

  return (
    <section id="philosophy" className="relative w-full bg-[#080807] text-foreground py-20 sm:py-28 md:py-48 px-5 sm:px-8 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24 md:space-y-28">
        {/* Oversized Statement Header with Scroll Transition */}
        <ScrollReveal direction="up" distance={30} className="max-w-4xl space-y-6">
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-gold font-medium">
            The Veritas Ethos
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory tracking-tight leading-[1.12]">
            “Time should not be decorated. <br />
            <span className="text-gold font-light italic">It should be engineered.”</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-slate leading-relaxed max-w-2xl pt-2">
            We perceive a timepiece not as jewelry, but as an instrument of chronological permanence. Our aesthetic is dictated by internal mechanical necessity.
          </p>
        </ScrollReveal>

        {/* Featured Dial Macro & Horological Narrative (Borderless Elevation) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center bg-[#111110] p-6 sm:p-10 md:p-16 rounded-sm shadow-2xl">
          <div className="lg:col-span-5 flex justify-center">
            <ScrollParallax speed={0.1} className="relative w-full max-w-[380px] overflow-hidden rounded-sm group">
              <ScrollReveal direction="up" scale={0.96}>
                <img
                  src={PHILOSOPHY_STUDY.image}
                  alt={PHILOSOPHY_STUDY.title}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </ScrollReveal>
              <div className="absolute bottom-4 left-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-gold bg-black/80 px-2.5 py-1 rounded-sm">
                  Macro Dial Study
                </span>
              </div>
            </ScrollParallax>
          </div>

          <div className="lg:col-span-7 space-y-8 lg:pl-6">
            <ScrollReveal direction="up" delay={0.1} className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-gold">
                Dial Architecture Study
              </span>
              <h3 className="font-serif text-2xl md:text-4xl text-ivory leading-snug">
                {PHILOSOPHY_STUDY.title}
              </h3>
              <p className="font-sans text-sm md:text-base text-slate leading-relaxed">
                {PHILOSOPHY_STUDY.description}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2} className="pt-6 grid grid-cols-2 gap-6 text-xs">
              <div className="space-y-1">
                <span className="text-slate-dark block font-mono uppercase tracking-wider text-[10px]">Guilloché Relief</span>
                <span className="text-ivory font-medium text-sm">Hand-Turned Basketweave</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-dark block font-mono uppercase tracking-wider text-[10px]">Temporal Disc</span>
                <span className="text-ivory font-medium text-sm">24-City Meridian Ring</span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Four Architectural Pillars (Borderless Clean Tones) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PILLARS.map((pillar, idx) => (
            <ScrollReveal
              key={pillar.num}
              direction="up"
              delay={idx * 0.1}
              className="p-8 bg-[#0E0E0D] hover:bg-[#131312] transition-colors duration-400 rounded-sm flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <span className="font-mono text-xs text-gold/70 group-hover:text-gold transition-colors">
                  {pillar.num}
                </span>
                <h4 className="font-serif text-xl text-ivory tracking-wide">
                  {pillar.title}
                </h4>
                <p className="font-sans text-xs md:text-sm text-slate leading-relaxed">
                  {pillar.detail}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
