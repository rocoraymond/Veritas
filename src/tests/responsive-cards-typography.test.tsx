import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { CollectionSection } from '@/components/sections/CollectionSection';
import { PhilosophySection } from '@/components/sections/PhilosophySection';
import { MaterialitySection } from '@/components/sections/MaterialitySection';
import { BackgroundSqueezeSection } from '@/components/sections/BackgroundSqueezeSection';

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(() => false),
    })),
  });
}

// Mock heavy external dependencies (gsap/lenis) for clean unit execution
vi.mock('gsap', () => {
  const gsapMock = {
    registerPlugin: vi.fn(),
    timeline: vi.fn(() => ({
      to: vi.fn().mockReturnThis(),
    })),
    context: vi.fn((fn: () => void) => {
      fn();
      return { revert: vi.fn() };
    }),
    to: vi.fn(),
    fromTo: vi.fn(),
    killTweensOf: vi.fn(),
    ticker: {
      add: vi.fn(),
      remove: vi.fn(),
      lagSmoothing: vi.fn(),
    },
  };
  return {
    default: gsapMock,
    gsap: gsapMock,
  };
});

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn(() => ({})),
    getAll: vi.fn(() => []),
    update: vi.fn(),
  },
}));

vi.mock('@studio-freight/lenis', () => {
  return {
    default: class MockLenis {
      on() {}
      raf() {}
      destroy() {}
    },
  };
});

describe('Mobile Cards & Typography Responsiveness (Tecno Android & iPhone 13-16)', () => {
  it('verifies CollectionSection detail inspection card header supports responsive stacking to prevent badge collisions', () => {
    const { container } = render(<CollectionSection />);
    // The inspection card header with tag badge and category architecture label must support responsive stacking
    // It should have flex-col xs:flex-row / sm:flex-row with gap to prevent overlap on 360px-390px viewports
    const headerWrapper = container.querySelector('[data-testid="inspection-header"]');
    expect(headerWrapper).not.toBeNull();
    expect(headerWrapper?.className).toMatch(/flex-col.*sm:flex-row|gap-/);
  });

  it('verifies CollectionSection cards track items have responsive widths and leading/break-word classes', () => {
    const { container } = render(<CollectionSection />);
    // Cards track items should have responsive widths (w-[240px] or w-[250px] on small mobile)
    const cardItems = container.querySelectorAll('[data-testid="gallery-card-item"]');
    expect(cardItems.length).toBeGreaterThan(0);
    const firstCard = cardItems[0];
    expect(firstCard.className).toContain('w-[');
    expect(firstCard.className).toMatch(/break-words|leading-/);
  });

  it('verifies BackgroundSqueezeSection bottom compression bar supports responsive wrapping', () => {
    const { container } = render(<BackgroundSqueezeSection />);
    const bottomBar = container.querySelector('[data-testid="squeeze-bottom-bar"]');
    expect(bottomBar).not.toBeNull();
    expect(bottomBar?.className).toMatch(/flex-col.*sm:flex-row/);
  });

  it('verifies PhilosophySection pillars have responsive padding for compact viewports', () => {
    const { container } = render(<PhilosophySection />);
    const pillarCards = container.querySelectorAll('[data-testid="philosophy-pillar-card"]');
    expect(pillarCards.length).toBe(4);
    pillarCards.forEach((card) => {
      // Must use responsive padding like p-5 sm:p-6 or p-6 sm:p-8 rather than rigid p-8
      expect(card.className).toMatch(/p-[456]\s+(sm|md):p-[68]/);
    });
  });

  it('verifies MaterialitySection option buttons support flex-1 min-w-0 for long text wrap', () => {
    const { container } = render(<MaterialitySection />);
    const optionButtons = container.querySelectorAll('[data-testid="material-option-btn"]');
    expect(optionButtons.length).toBeGreaterThan(0);
    optionButtons.forEach((btn) => {
      const textContainer = btn.querySelector('[data-testid="material-text-container"]');
      expect(textContainer).not.toBeNull();
      expect(textContainer?.className).toContain('min-w-0');
    });
  });
});
