import { CHRONICLE_STUDY } from '@/data/horology-studies';
import { ScrollReveal, ScrollParallax } from '@/components/ui/scroll-reveal';

export function ChronicleSection() {
  return (
    <section id="chronicle" className="relative w-full bg-[#080807] text-foreground py-32 md:py-48 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Magazine Editorial Typography with Scroll Reveals (6 Cols) */}
          <div className="lg:col-span-6 space-y-8">
            <ScrollReveal direction="up" distance={30} className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-gold font-medium">
                The Chronicle
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory leading-[1.1]">
                Horology as an <br />
                <span className="italic font-light text-gold-light">Exact Science</span>.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.15} className="space-y-6 text-slate text-sm md:text-base leading-relaxed font-sans">
              <p>
                A mechanical timepiece is an autonomous oscillator. Isolated from electrical currents, networks, and external satellites, it measures duration solely through the unwinding tension of a coiled spring regulated by an oscillating balance wheel.
              </p>
              <p>
                Veritas operates at the intersection of chronometric purity and architectural restraint. We honor the heritage of traditional complication architecture while stripping away sentimental ornament in pursuit of temporal clarity.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.25} className="py-2 my-8 font-serif text-xl md:text-2xl italic text-gold-light/90 leading-snug">
              “Precision is not an embellishment; it is the fundamental truth of mechanical timekeeping.”
            </ScrollReveal>
          </div>

          {/* Right: Curated Dual-Time Reference Image with Scroll Parallax (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <ScrollParallax speed={0.14} className="relative w-full max-w-[460px] bg-[#111110] p-8 sm:p-12 rounded-sm shadow-2xl">
              <ScrollReveal direction="up" scale={0.96}>
                <img
                  src={CHRONICLE_STUDY.image}
                  alt={CHRONICLE_STUDY.title}
                  className="w-full h-auto object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </ScrollReveal>
              <div className="pt-8 mt-6 text-left">
                <span className="font-mono text-[10px] uppercase tracking-widest text-gold block mb-1.5">
                  Editorial Study
                </span>
                <p className="font-sans text-xs text-slate leading-relaxed">
                  {CHRONICLE_STUDY.caption}
                </p>
              </div>
            </ScrollParallax>
          </div>
        </div>
      </div>
    </section>
  );
}
