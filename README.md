# Veritas — Haute Horlogerie Digital Atelier

> **"Truth in Every Second"**
> An architectural, editorial digital experience crafted for the connoisseurs of haute horlogerie. Veritas merges Swiss chronometric rigor with cutting-edge front-end design, visceral GSAP scrub animations, and tactile physics.

---

## Architecture & Curated Sections

1. **Top Floating Navigation (`HeaderNav`)**:
   - Architectural translucent header with brushed gold accents.
   - Fully responsive layout featuring an aesthetic mobile burger drawer with accessible modal dialog controls.
2. **Hero Parallax Canvas (`ParallaxComponent`)**:
   - Multi-depth 4-layer parallax with Lenis smooth-scrolling and GSAP ScrollTrigger.
   - Grand layered presentation where the 3D timepiece sculpture layers directly in front of the typography, creating an authentic optical depth upon scroll.
3. **Asymmetrical Post-Hero Transition (`PostHeroTransition`)**:
   - Monolithic editorial statement framing the brand's foundational pillars.
4. **Veritas Philosophy (`PhilosophySection`)**:
   - Clean, high-contrast horological philosophy and Swiss precision standards.
5. **Curated Reference Gallery (`CollectionSection`)**:
   - Dual-mode architectural gallery: desktop vertical Atelier Disciplines side panel paired with an interactive horizontal swipeable track, smooth anti-flicker transitions, and active full-detail inspection panel.
   - Mobile slide-out disciplines drawer for effortless touch navigation.
6. **Craftsmanship & Metallurgy (`CraftsmanshipSection`)**:
   - Engineering metrics, case finishing, and high-frequency escapement analysis.
7. **Tactile Materiality (`MaterialitySection`)**:
   - Interactive material study powered by Origin Kit `ShineCard` with dial reflection highlights.
8. **Temporal Tension (`BackgroundSqueezeSection`)**:
   - Signature gravitational mass study featuring an organic SVG waveform that physically squeezes the background around the timepiece as the user scrolls.
9. **The Chronicle (`ChronicleSection`)**:
   - Editorial storytelling on chronometric purity and complication architecture.
10. **Private Salon & Concierge (`PrivateClientSection`)**:
    - Bespoke viewing booking interface with date picker and complication selector.
11. **Archival Footer (`Footer`)**:
    - Swiss horological index and atelier credentials.

---

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Bundler & Tooling**: Vite
- **Styling**: Tailwind CSS, PostCSS
- **Animation & Motion**: GSAP (GreenSock), ScrollTrigger, Lenis Smooth Scroll
- **Icons**: Lucide React
- **Testing**: Vitest, React Testing Library, JSDOM

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/rocoraymond/Veritas.git

# Enter project directory
cd Veritas

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

### Running Tests

```bash
npm test -- --run
```

### Production Build

```bash
npm run build
```

---

## License

Private repository. All rights reserved.