import { describe, it, expect } from 'vitest';
import { 
  CURATED_HOROLOGY_STUDIES, 
  GALLERY_CATEGORIES, 
  filterStudiesByCategory
} from '@/data/horology-studies';

describe('Collection Gallery Logic', () => {
  it('defines the curated gallery categories', () => {
    expect(GALLERY_CATEGORIES).toBeDefined();
    expect(GALLERY_CATEGORIES.length).toBeGreaterThanOrEqual(4);
    expect(GALLERY_CATEGORIES.map(c => c.id)).toContain('all');
    expect(GALLERY_CATEGORIES.map(c => c.id)).toContain('chronograph');
    expect(GALLERY_CATEGORIES.map(c => c.id)).toContain('architectural');
    expect(GALLERY_CATEGORIES.map(c => c.id)).toContain('complication');
  });

  it('filters studies correctly for "all"', () => {
    const results = filterStudiesByCategory('all');
    expect(results.length).toBe(CURATED_HOROLOGY_STUDIES.length);
  });

  it('filters studies correctly for "chronograph"', () => {
    const results = filterStudiesByCategory('chronograph');
    expect(results.length).toBeGreaterThan(0);
    results.forEach(study => {
      expect(study.category).toBe('chronograph');
    });
  });

  it('filters studies correctly for "architectural"', () => {
    const results = filterStudiesByCategory('architectural');
    expect(results.length).toBeGreaterThan(0);
    results.forEach(study => {
      expect(study.category).toBe('architectural');
    });
  });

  it('filters studies correctly for "instrument"', () => {
    const results = filterStudiesByCategory('instrument');
    expect(results.length).toBeGreaterThan(0);
    results.forEach(study => {
      expect(study.category).toBe('instrument');
    });
  });
});

describe('Gallery Scroll & Scrubber Utilities', () => {
  it('calculates scroll progress correctly', async () => {
    const { calculateScrollProgress } = await import('@/lib/gallery-scroll');
    
    // At start
    expect(calculateScrollProgress(0, 2000, 1000)).toBe(0);
    // At half
    expect(calculateScrollProgress(500, 2000, 1000)).toBe(50);
    // At end
    expect(calculateScrollProgress(1000, 2000, 1000)).toBe(100);
    // Over-scroll clamped
    expect(calculateScrollProgress(1200, 2000, 1000)).toBe(100);
    // Negative scroll clamped
    expect(calculateScrollProgress(-50, 2000, 1000)).toBe(0);
    // Non-scrollable container returns 100
    expect(calculateScrollProgress(0, 1000, 1000)).toBe(100);
  });

  it('calculates active study index correctly', async () => {
    const { calculateActiveStudyIndex } = await import('@/lib/gallery-scroll');
    const cardWidth = 300;
    const gap = 24; // total item width = 324
    const totalCount = 6;

    expect(calculateActiveStudyIndex(0, cardWidth, gap, totalCount)).toBe(0);
    expect(calculateActiveStudyIndex(324, cardWidth, gap, totalCount)).toBe(1);
    expect(calculateActiveStudyIndex(648, cardWidth, gap, totalCount)).toBe(2);
    // Clamped at bounds
    expect(calculateActiveStudyIndex(9999, cardWidth, gap, totalCount)).toBe(5);
  });

  it('calculates scrub target correctly', async () => {
    const { calculateScrubTarget } = await import('@/lib/gallery-scroll');
    const scrollWidth = 2000;
    const clientWidth = 800; // maxScroll = 1200

    expect(calculateScrubTarget(0, scrollWidth, clientWidth)).toBe(0);
    expect(calculateScrubTarget(0.5, scrollWidth, clientWidth)).toBe(600);
    expect(calculateScrubTarget(1, scrollWidth, clientWidth)).toBe(1200);
    expect(calculateScrubTarget(1.5, scrollWidth, clientWidth)).toBe(1200);
  });

  it('computes complete gallery scroll state', async () => {
    const { computeGalleryScrollState } = await import('@/lib/gallery-scroll');
    
    const stateStart = computeGalleryScrollState(0, 1800, 600, 300, 20, 6);
    expect(stateStart.progressPercent).toBe(0);
    expect(stateStart.canScrollLeft).toBe(false);
    expect(stateStart.canScrollRight).toBe(true);
    expect(stateStart.activeStudyIndex).toBe(0);
    expect(stateStart.displayFraction).toBe('01 / 06');

    const stateMid = computeGalleryScrollState(600, 1800, 600, 300, 20, 6);
    expect(stateMid.progressPercent).toBe(50);
    expect(stateMid.canScrollLeft).toBe(true);
    expect(stateMid.canScrollRight).toBe(true);
    expect(stateMid.activeStudyIndex).toBe(2);
    expect(stateMid.displayFraction).toBe('03 / 06');

    const stateEnd = computeGalleryScrollState(1200, 1800, 600, 300, 20, 6);
    expect(stateEnd.progressPercent).toBe(100);
    expect(stateEnd.canScrollLeft).toBe(true);
    expect(stateEnd.canScrollRight).toBe(false);
  });
});

describe('Side Panel Category Navigation', () => {
  it('contains comprehensive architectural categories with counts', () => {
    expect(GALLERY_CATEGORIES.length).toBeGreaterThanOrEqual(5);
    const totalCount = GALLERY_CATEGORIES.find(c => c.id === 'all')?.count;
    expect(totalCount).toBe(CURATED_HOROLOGY_STUDIES.length);

    // Ensure all category counts are positive numbers
    GALLERY_CATEGORIES.forEach(cat => {
      expect(cat.count).toBeGreaterThan(0);
      expect(typeof cat.label).toBe('string');
      expect(cat.label.length).toBeGreaterThan(0);
    });
  });

  it('correctly maps side panel selection to active studies', () => {
    // For each category, filtering must produce non-empty valid array
    for (const cat of GALLERY_CATEGORIES) {
      const filtered = filterStudiesByCategory(cat.id);
      expect(filtered.length).toBe(cat.count);
      if (cat.id !== 'all') {
        filtered.forEach(study => {
          expect(study.category).toBe(cat.id);
        });
      }
    }
  });
});
