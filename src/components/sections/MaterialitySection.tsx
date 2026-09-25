import { useState } from 'react';
import { MATERIALITY_STUDIES, type MaterialStudy } from '@/data/horology-studies';
import { ScrollReveal, ScrollParallax } from '@/components/ui/scroll-reveal';
import { ShineCard } from '@/components/originkit/shine-card';
import { SmoothWatchImage } from '@/components/ui/SmoothWatchImage';

export function MaterialitySection() {
  const [activeMaterial, setActiveMaterial] = useState<MaterialStudy>(MATERIALITY_STUDIES[0]);

  return (
    <section className="relative w-full bg-[#0A0A09] text-foreground py-32 md:py-48 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Header with Scroll Transition */}
        <ScrollReveal direction="up" distance={30} className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
          <div className="space-y-3">
            <span className="font-sans text-xs uppercase tracking-[0.4em] text-gold font-medium">
              Atelier & Finishes
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ivory tracking-tight">
              Tactile Materiality
            </h2>
          </div>
          <p className="font-sans text-xs md:text-sm text-slate max-w-sm leading-relaxed">
            The dialogue between dial refraction and alloy metallurgy: geometric engine-turning, organic crystalline nacre, and precious metal surfaces.
          </p>
        </ScrollReveal>

        {/* Interactive Material Showcase (Origin Kit ShineCard + Scroll Parallax) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Canvas (6 Cols) */}
          <div className="lg:col-span-6 flex justify-center">
            <ScrollParallax speed={0.1} className="w-full max-w-[480px]">
              <ShineCard
                cardColor="#121211"
                highlight="#C6A56A"
                unlit="#080807"
                density={35}
                radius="4px"
                className="shadow-2xl"
              >
                <div className="p-8 md:p-14 flex items-center justify-center min-h-[460px] relative">
                  <SmoothWatchImage
                    src={activeMaterial.image}
                    alt={activeMaterial.materialName}
                    className="max-h-[380px] w-auto"
                  />
                  <div className="absolute top-6 right-6 bg-black/70 px-3 py-1 font-mono text-[10px] text-slate uppercase tracking-wider rounded-sm z-10">
                    {activeMaterial.surfaceFinish}
                  </div>
                </div>
              </ShineCard>
            </ScrollParallax>
          </div>

          {/* Selector & Details (6 Cols) */}
          <div className="lg:col-span-6 space-y-8 lg:pl-4">
            <ScrollReveal direction="up" delay={0.1} className="space-y-4">
              <span className="font-mono text-xs text-gold uppercase tracking-widest block">
                Selected Material Study
              </span>
              <h3 className="font-serif text-2xl md:text-4xl text-ivory leading-snug">
                {activeMaterial.materialName}
              </h3>
              <p className="font-sans text-sm md:text-base text-slate leading-relaxed">
                {activeMaterial.description}
              </p>
            </ScrollReveal>

            {/* Material Swatch Options (Zero Box Borders) */}
            <ScrollReveal direction="up" delay={0.2} className="space-y-3 pt-6">
              <span className="font-mono text-[11px] text-slate-dark uppercase tracking-wider block mb-2">
                Select Finish Study:
              </span>
              <div className="flex flex-col gap-2.5">
                {MATERIALITY_STUDIES.map((study) => {
                  const isSelected = activeMaterial.id === study.id;
                  return (
                    <button
                      key={study.id}
                      data-testid="material-option-btn"
                      onClick={() => setActiveMaterial(study)}
                      className={`text-left p-3.5 sm:p-4.5 rounded-sm transition-all duration-300 flex items-center justify-between gap-3 sm:gap-4 ${
                        isSelected
                          ? 'bg-[#181816] text-ivory shadow-lg ring-1 ring-gold/30'
                          : 'bg-[#111110] text-slate hover:bg-[#151514] hover:text-slate-light'
                      }`}
                    >
                      <div data-testid="material-text-container" className="min-w-0 flex-1">
                        <span className="font-serif text-xs sm:text-base block text-ivory leading-snug break-words">
                          {study.materialName}
                        </span>
                        <span className="font-sans text-[11px] sm:text-xs text-slate-dark block pt-0.5 leading-snug break-words">
                          {study.surfaceFinish}
                        </span>
                      </div>
                      <div
                        className={`w-2 h-2 rounded-full shrink-0 transition-all duration-300 ${
                          isSelected ? 'bg-gold scale-125' : 'bg-[#252522]'
                        }`}
                      ></div>
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
