import { ArrowDownRight } from 'lucide-react';
import { ScrollReveal, ScrollParallax } from '@/components/ui/scroll-reveal';

export function PostHeroTransition() {
  return (
    <section className="relative w-full bg-[#0E0E0D] text-foreground pt-24 pb-36 md:pt-40 md:pb-52 px-6 md:px-16 overflow-hidden">
      {/* Editorial Watermark */}
      <div className="absolute top-8 right-8 select-none pointer-events-none opacity-[0.03] font-serif text-[15vw] font-bold tracking-widest text-ivory leading-none">
        VERITAS
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Editorial Subhead */}
        <ScrollReveal direction="up" distance={20} className="flex flex-col sm:flex-row sm:items-center justify-between pb-10 mb-16">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
            <span className="font-sans text-[11px] uppercase tracking-[0.35em] text-gold font-medium">
              Structural Geometry
            </span>
          </div>
          <span className="mt-2 sm:mt-0 font-mono text-[11px] tracking-[0.25em] text-slate-dark uppercase">
            Geneva Meridian · 46°12′N 6°09′E
          </span>
        </ScrollReveal>

        {/* Asymmetrical Layout with Scroll Transitions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Intentional Whitespace & Editorial Typography */}
          <div className="lg:col-span-5 space-y-8 z-10">
            <ScrollReveal direction="up" delay={0.1}>
              <p className="font-sans text-xs uppercase tracking-[0.4em] text-slate-light font-medium mb-3">
                Horological Architecture
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[1.08] tracking-tight">
                Form derived from <br />
                <span className="italic font-light text-gold-light">mechanical truth</span>, <br />
                not decoration.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.25}>
              <p className="font-sans text-sm md:text-base text-slate leading-relaxed max-w-lg">
                In classical watchmaking, aesthetic proportion is not applied as a veneer. It is the natural consequence of engineered rigidity, chamfered edge transitions, and mathematical dial subdivisions.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.35} className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <a
                href="#collection"
                className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-ivory hover:text-gold transition-colors font-medium group"
              >
                Inspect The Studies
                <ArrowDownRight className="w-4 h-4 text-gold group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
              </a>
              <span className="hidden sm:inline-block w-8 h-[1px] bg-white/10"></span>
              <span className="font-mono text-xs text-slate-dark tracking-wider">
                Ref. Geometric Study
              </span>
            </ScrollReveal>
          </div>

          {/* Right Column: Oversized Watch Visual with Parallax Depth */}
          <div className="lg:col-span-7 relative flex justify-center lg:justify-end">
            <ScrollParallax speed={0.12} className="relative z-10 w-full max-w-[540px] lg:max-w-[640px]">
              <ScrollReveal direction="up" scale={0.94} distance={40} duration={1.2}>
                <img
                  src="/watches/Royal_Oak_Selfwinding_Royal_Oak_15510.webp"
                  alt="Horological Reference: Geometric Case & Dial Study"
                  className="w-full h-auto object-contain filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] transition-transform duration-700 hover:scale-[1.02]"
                  loading="lazy"
                />
              </ScrollReveal>

              {/* Minimal Editorial Floating Caption (Responsive Positioning) */}
              <div className="relative mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:left-0 bg-[#111110]/95 p-4 sm:p-5 max-w-xs shadow-2xl rounded-sm border border-white/5">
                <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-gold mb-1">
                  Reference Architecture
                </p>
                <p className="font-sans text-xs text-slate-light font-medium leading-relaxed">
                  Geometric octagonal bezel with exposed structural fasteners and guilloché grid dial.
                </p>
              </div>
            </ScrollParallax>
          </div>
        </div>
      </div>
    </section>
  );
}
