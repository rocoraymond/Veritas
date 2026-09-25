import { ParallaxComponent } from '@/components/ui/parallax-scrolling';
import { Compass, ArrowUpRight } from 'lucide-react';

// New Editorial Sections (Beginning Strictly After Protected Hero)
import { PostHeroTransition } from '@/components/sections/PostHeroTransition';
import { PhilosophySection } from '@/components/sections/PhilosophySection';
import { CollectionSection } from '@/components/sections/CollectionSection';
import { CraftsmanshipSection } from '@/components/sections/CraftsmanshipSection';
import { MaterialitySection } from '@/components/sections/MaterialitySection';
import { BackgroundSqueezeSection } from '@/components/sections/BackgroundSqueezeSection';
import { ChronicleSection } from '@/components/sections/ChronicleSection';
import { PrivateClientSection } from '@/components/sections/PrivateClientSection';
import { HeaderNav } from '@/components/layout/HeaderNav';
import { Footer } from '@/components/layout/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-gold selection:text-black">
      {/* Top Floating Navigation with Aesthetic Mobile Burger Drawer */}
      <HeaderNav />

      {/* ========================================================================= */}
      {/* VERITAS HERO — PROTECTED                                                  */}
      {/* This hero is approved and must not be modified during post-hero redesign. */}
      {/* All new editorial sections begin after this component.                    */}
      {/* ========================================================================= */}
      <ParallaxComponent
        layer1Image="/hero-images/hero-sky.png"
        layer2Image="/hero-images/hero-mnt.png"
        layer4Image="/hero-images/hero-watch.png"
        title="VERITAS"
        watchScale={1.0}
      >
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-surface border border-border text-gold mb-2">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="font-serif text-3xl md:text-5xl tracking-wide text-ivory">
            "Truth in Every Second"
          </h3>
          <p className="text-slate text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            <strong className="text-ivory font-medium">Veritas:</strong> Latin for truth. Speaks to uncompromised precision, architectural restraint, and clean, timeless dials built for eternity.
          </p>
          <div className="pt-4 flex items-center justify-center gap-4">
            <a
              href="#collection"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-semibold text-xs tracking-widest uppercase px-6 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-gold/10"
            >
              Explore Timepieces <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </ParallaxComponent>

      {/* Section 02 — Asymmetrical Post-Hero Transition */}
      <PostHeroTransition />

      {/* Section 03 — Veritas Philosophy */}
      <PhilosophySection />

      {/* Section 04 — Curated Collection (Reference Index) */}
      <CollectionSection />

      {/* Section 05 — Craftsmanship & Metallurgy */}
      <CraftsmanshipSection />

      {/* Section 06 — Atelier & Tactile Materiality */}
      <MaterialitySection />

      {/* Section 07 — Temporal Tension (Watch Squeezing The Background) */}
      <BackgroundSqueezeSection />

      {/* Section 08 — The Chronicle (Editorial Storytelling) */}
      <ChronicleSection />

      {/* Section 09 — Private Salon (Bespoke Viewing Inquiry) */}
      <PrivateClientSection />

      {/* Section 10 — Archival Footer */}
      <Footer />
    </div>
  );
}
