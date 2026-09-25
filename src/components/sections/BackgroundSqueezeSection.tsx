import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function BackgroundSqueezeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const watchRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Compute the organic squeeze SVG path
  const computePath = (pinch: number, mobile: boolean) => {
    const width = 1440;

    if (mobile) {
      // On mobile: matches the website view with a majestic sweeping white wave scooping
      // up under the watch case, leaving a clean, generous white zone at the bottom so
      // "CASE COMPRESSION INDEX" is 100% visible, perfectly legible, and elegant.
      const cx = 720;
      const bottomScoopY = 560 - pinch * 90;

      return `
        M 0,0
        L ${width},0
        L ${width},670
        C ${width - 140},710 ${cx + 280},660 ${cx + 140},${bottomScoopY + 45}
        C ${cx + 70},${bottomScoopY + 15} ${cx + 35},${bottomScoopY} ${cx},${bottomScoopY}
        C ${cx - 35},${bottomScoopY} ${cx - 70},${bottomScoopY + 15} ${cx - 140},${bottomScoopY + 45}
        C ${cx - 280},660 140,710 0,670
        Z
      `.replace(/\s+/g, ' ').trim();
    }

    // On desktop, watch is centered at 72.2% (x = 1040)
    const cx = 1040;
    const topScoopY = 135 + pinch * 115;
    const bottomScoopY = 745 - pinch * 95;
    const leftTopEdge = cx - 260;
    const rightTopEdge = cx + 260;

    return `
      M 0,0
      L ${leftTopEdge},0
      C ${cx - 180},0 ${cx - 95},${topScoopY * 0.3} ${cx - 65},${topScoopY * 0.75}
      C ${cx - 45},${topScoopY * 0.95} ${cx - 25},${topScoopY} ${cx},${topScoopY}
      C ${cx + 25},${topScoopY} ${cx + 45},${topScoopY * 0.95} ${cx + 65},${topScoopY * 0.75}
      C ${cx + 95},${topScoopY * 0.3} ${cx + 180},0 ${rightTopEdge},0
      L ${width},0
      L ${width},780
      C ${width - 100},820 ${cx + 140},780 ${cx + 75},${bottomScoopY + 50}
      C ${cx + 45},${bottomScoopY + 15} ${cx + 25},${bottomScoopY} ${cx},${bottomScoopY}
      C ${cx - 25},${bottomScoopY} ${cx - 45},${bottomScoopY + 15} ${cx - 75},${bottomScoopY + 50}
      C ${cx - 150},790 560,840 0,790
      Z
    `.replace(/\s+/g, ' ').trim();
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    const path = pathRef.current;
    const watch = watchRef.current;
    const content = contentRef.current;

    if (!section || !path) return;

    // Set initial path state
    const initialPinch = prefersReducedMotion ? 1 : 0.15;
    path.setAttribute('d', computePath(initialPinch, isMobile));

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Dynamic pinch animation scrubbed with scroll
      ScrollTrigger.create({
        trigger: section,
        start: 'top 85%',
        end: 'bottom 15%',
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          let pinch: number;
          if (progress < 0.5) {
            pinch = 0.15 + (progress / 0.5) * 0.85; // 0.15 -> 1.0
          } else {
            pinch = 1.0 - ((progress - 0.5) / 0.5) * 0.25; // 1.0 -> 0.75
          }
          path.setAttribute('d', computePath(pinch, isMobile));
        }
      });

      // Watch subtle 3D physical compression & counter parallax
      if (watch) {
        gsap.fromTo(
          watch,
          {
            y: isMobile ? 25 : 40,
            scale: isMobile ? 0.94 : 0.96,
            rotateZ: -1.5,
          },
          {
            y: isMobile ? -20 : -30,
            scale: isMobile ? 1.0 : 1.02,
            rotateZ: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 0.8,
            }
          }
        );
      }

      // Editorial content entrance
      if (content) {
        const textElements = content.querySelectorAll('.editorial-reveal');
        gsap.fromTo(
          textElements,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: content,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      id="tension"
      ref={sectionRef}
      className="relative w-full min-h-[960px] sm:min-h-[1020px] md:min-h-[920px] bg-[#FAF8F5] text-foreground overflow-hidden flex flex-col justify-between select-none"
    >
      {/* SVG Squeezed Silhouette Mask */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          fill="#080809"
          className="transition-colors duration-500"
        />
      </svg>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 pt-20 sm:pt-24 md:pt-36 pb-12 flex-1 flex flex-col justify-start md:justify-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left Column: High-Contrast Editorial Typography */}
          <div
            ref={contentRef}
            className="md:col-span-6 space-y-5 sm:space-y-6 md:space-y-8 max-w-xl text-left"
          >
            <div className="editorial-reveal inline-flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="font-mono text-xs tracking-[0.35em] uppercase text-gold font-medium">
                Gravitational Study
              </span>
            </div>

            <h2 className="editorial-reveal font-serif text-3xl sm:text-5xl md:text-6xl text-ivory leading-[1.08] tracking-tight">
              TEMPORAL <br />
              <span className="font-light italic text-gold-light">TENSION</span>
            </h2>

            <p className="editorial-reveal font-sans text-xs sm:text-sm md:text-base text-slate-light leading-relaxed max-w-md">
              Where horological mass exerts gravitational force. The architecture of the case draws the aesthetic continuum inward—mechanical tension held in absolute equilibrium.
            </p>

            <div className="editorial-reveal pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#collection"
                className="group inline-flex items-center gap-2.5 sm:gap-3 bg-white text-black hover:bg-gold hover:text-black px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-sans font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow-2xl hover:shadow-gold/20"
              >
                <span>Discover Reference</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-slate hover:text-gold transition-colors py-2 px-3 font-medium"
              >
                <span>Private Consultation</span>
                <ArrowDownRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Spacer for desktop column layout */}
          <div className="hidden md:block md:col-span-6" />
        </div>
      </div>

      {/* The Squeezing Timepiece (Positioned in the Pinched Waist) */}
      <div
        ref={watchRef}
        className="absolute z-20 pointer-events-none md:pointer-events-auto
                   left-1/2 md:left-[72.2%] top-[58%] sm:top-[60%] md:top-[47%]
                   -translate-x-1/2 -translate-y-1/2
                   w-[250px] sm:w-[320px] md:w-[410px] lg:w-[460px]
                   flex items-center justify-center filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
      >
        <img
          src="/watches/squeeze-watch-cutout.webp"
          alt="Veritas Chronometric Precision Reference in Tension"
          className="w-full h-auto object-contain select-none"
          loading="lazy"
        />
      </div>

      {/* Bottom Transition Area (Clean Editorial Bar Revealed Under Squeeze) */}
      <div
        data-testid="squeeze-bottom-bar"
        className="relative z-10 w-full px-5 sm:px-12 md:px-16 pb-8 md:pb-12 pt-6 sm:pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 border-t border-black/5"
      >
        <div className="space-y-0.5 text-black/80">
          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] block">
            Case Compression Index
          </span>
          <span className="font-serif text-xs sm:text-sm italic text-black/90 block">
            0.02 mm Architectural Tolerance
          </span>
        </div>

        <a
          href="#collection"
          className="group flex items-center gap-2.5 sm:gap-3 text-black hover:text-black/70 transition-colors"
        >
          <span className="font-serif text-xs sm:text-base md:text-xl tracking-wide uppercase font-light">
            Curated References
          </span>
          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:translate-y-0.5 shadow-md shrink-0">
            <ArrowDownRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </span>
        </a>
      </div>
    </section>
  );
}
