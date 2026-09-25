import { ScrollReveal } from '@/components/ui/scroll-reveal';

export function Footer() {
  return (
    <footer className="w-full bg-[#060606] text-slate py-16 sm:py-20 px-5 sm:px-8 md:px-16 font-sans text-xs">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Tier: Wordmark & Navigation with Scroll Reveal */}
        <ScrollReveal direction="up" distance={20} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12">
          <div className="flex items-center gap-3">
            <img
              src="/logo/veritas logo.png"
              alt="Veritas Emblem"
              className="h-8 sm:h-9 w-auto object-contain opacity-90"
            />
            <span className="font-serif tracking-[0.25em] text-lg sm:text-xl font-bold text-ivory">
              VERITAS
            </span>
          </div>

          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 text-[11px] uppercase tracking-[0.25em] text-slate font-medium">
            <a href="#philosophy" className="hover:text-gold transition-colors">Philosophy</a>
            <a href="#collection" className="hover:text-gold transition-colors">Reference Gallery</a>
            <a href="#craft" className="hover:text-gold transition-colors">Craftsmanship</a>
            <a href="#tension" className="hover:text-gold transition-colors">Temporal Tension</a>
            <a href="#chronicle" className="hover:text-gold transition-colors">Chronicle</a>
            <a href="#contact" className="hover:text-gold transition-colors">Private Salon</a>
          </nav>
        </ScrollReveal>

        {/* Middle Tier: Horological Directory */}
        <ScrollReveal direction="up" delay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-slate-dark text-xs">
          <div className="space-y-3">
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-slate-light">
              Horological Studies
            </h5>
            <ul className="space-y-2 text-[11px]">
              <li>Chronograph Architecture</li>
              <li>Geometric Case Studies</li>
              <li>Dual-Time Complications</li>
              <li>Aviation Instrument Dials</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-slate-light">
              Materials & Atelier
            </h5>
            <ul className="space-y-2 text-[11px]">
              <li>Engine-Turned Guilloché</li>
              <li>Zirconium Oxide Ceramics</li>
              <li>Natural Black Mother-of-Pearl</li>
              <li>Precious Metal Metallurgy</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-slate-light">
              Advisory & Viewings
            </h5>
            <ul className="space-y-2 text-[11px]">
              <li>Private Salon Appointments</li>
              <li>Bespoke Commendations</li>
              <li>Curated Horological Archive</li>
              <li>Geneva & Global Salons</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-slate-light">
              Provenance
            </h5>
            <p className="text-[11px] leading-relaxed text-slate">
              Veritas: Latin for truth. An architectural pursuit of uncompromised horological precision and enduring design clarity.
            </p>
          </div>
        </ScrollReveal>

        {/* Bottom Tier: Copyright & Legal */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-dark">
          <p>© {new Date().getFullYear()} Veritas Watch Company. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate transition-colors cursor-pointer">Privacy Protocol</span>
            <span className="hover:text-slate transition-colors cursor-pointer">Terms of Horology</span>
            <span className="hover:text-slate transition-colors cursor-pointer">Archive Index</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
