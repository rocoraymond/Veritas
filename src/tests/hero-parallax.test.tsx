import { describe, it, expect, vi } from 'vitest';

// Isolate hero test by mocking downstream heavy sections
vi.mock('@/components/sections/BackgroundSqueezeSection', () => ({ BackgroundSqueezeSection: () => null }));
vi.mock('@/components/sections/PhilosophySection', () => ({ PhilosophySection: () => null }));
vi.mock('@/components/sections/CollectionSection', () => ({ CollectionSection: () => null }));
vi.mock('@/components/sections/CraftsmanshipSection', () => ({ CraftsmanshipSection: () => null }));
vi.mock('@/components/sections/MaterialitySection', () => ({ MaterialitySection: () => null }));
vi.mock('@/components/sections/ChronicleSection', () => ({ ChronicleSection: () => null }));
vi.mock('@/components/sections/PrivateClientSection', () => ({ PrivateClientSection: () => null }));
vi.mock('@/components/sections/PostHeroTransition', () => ({ PostHeroTransition: () => null }));
vi.mock('@/components/layout/HeaderNav', () => ({ HeaderNav: () => null }));
vi.mock('@/components/layout/Footer', () => ({ Footer: () => null }));

// Define matchMedia and ResizeObserver before any component importing gsap/lenis plugins
if (typeof window !== 'undefined') {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

import { render } from '@testing-library/react';

describe('Hero Parallax Layering & Timepiece Scale', () => {
  it('renders all four parallax depth layers with correct layering identifiers', async () => {
    const { ParallaxComponent } = await import('@/components/ui/parallax-scrolling');
    render(<ParallaxComponent />);
    
    const layer1 = document.querySelector('[data-parallax-layer="1"]');
    const layer2 = document.querySelector('[data-parallax-layer="2"]');
    const layer3 = document.querySelector('[data-parallax-layer="3"]');
    const layer4 = document.querySelector('[data-parallax-layer="4"]');

    expect(layer1).not.toBeNull();
    expect(layer2).not.toBeNull();
    expect(layer3).not.toBeNull();
    expect(layer4).not.toBeNull();

    // Layer 3 is the title layer behind the timepiece
    expect(layer3?.classList.contains('parallax__layer-title-wrapper')).toBe(true);
    expect(layer3?.textContent).toContain('VERITAS');

    // Layer 4 is the timepiece layer in front of the title
    expect(layer4?.classList.contains('parallax__layer-watch-wrapper')).toBe(true);
    const watchImg = layer4?.querySelector('img');
    expect(watchImg).not.toBeNull();
    expect(watchImg?.getAttribute('src')).toBe('/hero-images/hero-watch.png');
  });

  it('defaults watchScale to 1.0 to ensure the timepiece is not artificially shrunken', async () => {
    const { ParallaxComponent } = await import('@/components/ui/parallax-scrolling');
    render(<ParallaxComponent />);
    const watchContainer = document.querySelector('.parallax__watch-container') as HTMLElement;
    expect(watchContainer).not.toBeNull();
    // Default scale should be 1, not downscaled to 0.85 or 0.82
    expect(watchContainer.style.transform).toBe('scale(1)');
  });

  it('in App.tsx, hero ParallaxComponent renders at full scale (watchScale >= 1.0)', async () => {
    const { default: App } = await import('@/App');
    render(<App />);
    const watchContainers = document.querySelectorAll('.parallax__watch-container');
    const heroWatchContainer = watchContainers[0] as HTMLElement;
    expect(heroWatchContainer).not.toBeNull();
    // Must NOT be shrunken to 0.82
    expect(heroWatchContainer.style.transform).not.toBe('scale(0.82)');
    expect(heroWatchContainer.style.transform).toBe('scale(1)');
  }, 15000);
});
