import { useState } from 'react';
import { MACRO_CRAFTSMANSHIP_STUDIES, type MacroCraftDetail } from '@/data/horology-studies';
import { ScrollReveal, ScrollParallax } from '@/components/ui/scroll-reveal';
import { ShineCard } from '@/components/originkit/shine-card';
import { SmoothWatchImage } from '@/components/ui/SmoothWatchImage';

export function CraftsmanshipSection() {
  const [activeMacro, setActiveMacro] = useState<MacroCraftDetail>(MACRO_CRAFTSMANSHIP_STUDIES[0]);

  return (
    <section id="craft" className="relative w-full bg-[#080807] text-foreground py-20 sm:py-28 md:py-48 px-5 sm:px-8 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Section Header with Scroll Transition */}
        <ScrollReveal direction="up" distance={30} className="max-w-3xl space-y-4">
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-gold font-medium">
            Engineering & Metallurgy
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory tracking-tight">
            Built Beneath The Dial.
          </h2>
          <p className="font-sans text-sm md:text-base text-slate leading-relaxed pt-2">
            The mechanical integrity of a timepiece is revealed in its microscopic tolerances: the transition between hand-brushed facets, the crystalline structure of sintered ceramics, and the compression tolerances of the case perimeter.
          </p>
        </ScrollReveal>

        {/* Triple Macro Triptych with Origin Kit ShineCard Container (Zero Borders) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Active High-Res Macro Vertical View with Scroll Parallax (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <ScrollParallax speed={0.12} className="w-full max-w-[400px]">
              <ShineCard
                cardColor="#111110"
                highlight="#C6A56A"
                unlit="#080807"
                density={35}
                sparkle={70}
                radius="4px"
                className="shadow-2xl"
              >
                <div className="relative p-6 flex items-center justify-center">
                  <SmoothWatchImage
                    src={activeMacro.image}
                    alt={activeMacro.title}
                    className="w-full h-auto rounded-sm"
                  />
                  <div className="absolute top-8 left-8 bg-black/80 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-gold rounded-sm z-10">
                    Macro Study
                  </div>
                </div>
              </ShineCard>
            </ScrollParallax>
          </div>

          {/* Right: Technical Narrative & Macro Selector (7 Cols) */}
          <div className="lg:col-span-7 space-y-8 lg:pl-6">
            <ScrollReveal direction="up" delay={0.1} className="space-y-4">
              <span className="font-mono text-xs text-gold uppercase tracking-widest block">
                {activeMacro.focusArea}
              </span>
              <h3 className="font-serif text-2xl md:text-4xl text-ivory leading-snug">
                {activeMacro.title}
              </h3>
              <p className="font-sans text-sm md:text-base text-slate leading-relaxed">
                {activeMacro.description}
              </p>
            </ScrollReveal>

            {/* Macro Tabs (Zero Box Borders, Clean Subtle Elevation) */}
            <ScrollReveal direction="up" delay={0.2} className="space-y-3 pt-6">
              <span className="font-mono text-[11px] text-slate-dark uppercase tracking-wider block mb-3">
                Micro-Engineering Focus:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {MACRO_CRAFTSMANSHIP_STUDIES.map((study) => {
                  const isSelected = activeMacro.id === study.id;
                  return (
                    <button
                      key={study.id}
                      onClick={() => setActiveMacro(study)}
                      className={`text-left p-3 sm:p-4 rounded-sm transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#181816] text-ivory shadow-lg ring-1 ring-gold/30'
                          : 'bg-[#10100F] text-slate hover:bg-[#141413] hover:text-slate-light'
                      }`}
                    >
                      <span className="font-mono text-[9px] sm:text-[10px] text-gold block mb-1 uppercase tracking-wider">
                        {study.id === 'macro-bezel-brushing'
                          ? 'Finishing Geometry'
                          : study.id === 'macro-ceramic-metallurgy'
                          ? 'Ceramic Metallurgy'
                          : 'Case Tolerances'}
                      </span>
                      <span className="font-serif text-xs sm:text-sm block leading-snug break-words">
                        {study.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
