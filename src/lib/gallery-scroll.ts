/**
 * Gallery Scroll & Scrubber Utilities for Haute Horlogerie Reference Gallery
 * Provides precision progress tracking, interactive scrubbing, and drag momentum calculations.
 */

export interface ScrollProgressState {
  progressPercent: number; // 0 to 100
  canScrollLeft: boolean;
  canScrollRight: boolean;
  activeStudyIndex: number; // 0 to totalCount - 1
  displayFraction: string; // e.g. "01 / 06"
}

/**
 * Calculates scroll percentage bounded strictly between 0 and 100.
 */
export function calculateScrollProgress(
  scrollLeft: number,
  scrollWidth: number,
  clientWidth: number
): number {
  const maxScroll = scrollWidth - clientWidth;
  if (maxScroll <= 0) return 100;
  const progress = (scrollLeft / maxScroll) * 100;
  return Math.min(100, Math.max(0, Math.round(progress)));
}

/**
 * Calculates which study is active based on horizontal scroll offset.
 */
export function calculateActiveStudyIndex(
  scrollLeft: number,
  cardWidth: number,
  gap: number,
  totalCount: number
): number {
  if (totalCount <= 0) return 0;
  const itemWidth = cardWidth + gap;
  if (itemWidth <= 0) return 0;
  const index = Math.round(scrollLeft / itemWidth);
  return Math.min(totalCount - 1, Math.max(0, index));
}

/**
 * Calculates target scroll position given a fractional scrub position (0 to 1).
 */
export function calculateScrubTarget(
  fraction: number,
  scrollWidth: number,
  clientWidth: number
): number {
  const maxScroll = Math.max(0, scrollWidth - clientWidth);
  const clampedFraction = Math.min(1, Math.max(0, fraction));
  return clampedFraction * maxScroll;
}

/**
 * Computes full state summary for gallery scrollbar & progress indicators.
 */
export function computeGalleryScrollState(
  scrollLeft: number,
  scrollWidth: number,
  clientWidth: number,
  cardWidth: number,
  gap: number,
  totalCount: number
): ScrollProgressState {
  const maxScroll = Math.max(0, scrollWidth - clientWidth);
  const progressPercent = calculateScrollProgress(scrollLeft, scrollWidth, clientWidth);
  const activeStudyIndex = calculateActiveStudyIndex(scrollLeft, cardWidth, gap, totalCount);
  
  // Pad index numbers with leading zero, e.g. 01 / 06
  const currentNum = String(activeStudyIndex + 1).padStart(2, '0');
  const totalNum = String(Math.max(1, totalCount)).padStart(2, '0');
  const displayFraction = `${currentNum} / ${totalNum}`;

  return {
    progressPercent,
    canScrollLeft: scrollLeft > 5,
    canScrollRight: scrollLeft < maxScroll - 5,
    activeStudyIndex,
    displayFraction,
  };
}
