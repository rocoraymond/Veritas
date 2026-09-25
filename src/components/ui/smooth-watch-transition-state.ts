export interface WatchTransitionState {
  currentSrc: string;
  nextSrc: string | null;
  isTransitioning: boolean;
  requestTransition: (newSrc: string) => WatchTransitionState;
  completeTransition: () => WatchTransitionState;
}

export function createWatchTransitionState(initialSrc: string): WatchTransitionState {
  return {
    currentSrc: initialSrc,
    nextSrc: null,
    isTransitioning: false,
    requestTransition(newSrc: string): WatchTransitionState {
      if (newSrc === this.currentSrc) {
        return this;
      }
      return {
        ...this,
        nextSrc: newSrc,
        isTransitioning: true,
      };
    },
    completeTransition(): WatchTransitionState {
      if (!this.nextSrc) {
        return this;
      }
      return {
        ...this,
        currentSrc: this.nextSrc,
        nextSrc: null,
        isTransitioning: false,
      };
    },
  };
}
