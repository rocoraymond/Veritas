import { describe, it, expect } from 'vitest';
import { createWatchTransitionState } from '@/components/ui/smooth-watch-transition-state';

describe('Smooth Watch Transition State (Anti-Flicker)', () => {
  it('initializes with active image displayed and not transitioning', () => {
    const state = createWatchTransitionState('/watches/Daytona_Black.webp');
    expect(state.currentSrc).toBe('/watches/Daytona_Black.webp');
    expect(state.nextSrc).toBeNull();
    expect(state.isTransitioning).toBe(false);
  });

  it('queues a new image when requested without unmounting current image', () => {
    let state = createWatchTransitionState('/watches/Daytona_Black.webp');
    state = state.requestTransition('/watches/Sky-Dweller_Mint_Green.webp');

    // Current image is STILL visible (no blank flicker)
    expect(state.currentSrc).toBe('/watches/Daytona_Black.webp');
    // Next image is queued for loading
    expect(state.nextSrc).toBe('/watches/Sky-Dweller_Mint_Green.webp');
    expect(state.isTransitioning).toBe(true);
  });

  it('completes transition when next image loads, promoting it to currentSrc', () => {
    let state = createWatchTransitionState('/watches/Daytona_Black.webp');
    state = state.requestTransition('/watches/Sky-Dweller_Mint_Green.webp');
    state = state.completeTransition();

    expect(state.currentSrc).toBe('/watches/Sky-Dweller_Mint_Green.webp');
    expect(state.nextSrc).toBeNull();
    expect(state.isTransitioning).toBe(false);
  });

  it('handles same image request without triggering unnecessary transition', () => {
    let state = createWatchTransitionState('/watches/Daytona_Black.webp');
    state = state.requestTransition('/watches/Daytona_Black.webp');

    expect(state.isTransitioning).toBe(false);
    expect(state.nextSrc).toBeNull();
  });
});
