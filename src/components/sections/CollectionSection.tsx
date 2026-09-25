import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  CURATED_HOROLOGY_STUDIES, 
  GALLERY_CATEGORIES, 
  filterStudiesByCategory,
  type HorologyStudy, 
  type GalleryCategoryId 
} from '@/data/horology-studies';
import { 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  MoveHorizontal, 
  SlidersHorizontal, 
  X, 
  Check 
} from 'lucide-react';
import { ShineCard } from '@/components/originkit/shine-card';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { SmoothWatchImage } from '@/components/ui/SmoothWatchImage';
import { 
  computeGalleryScrollState, 
  calculateScrubTarget, 
  type ScrollProgressState 
} from '@/lib/gallery-scroll';

export function CollectionSection() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategoryId>('all');
  const [activeStudy, setActiveStudy] = useState<HorologyStudy>(CURATED_HOROLOGY_STUDIES[0]);
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);
  const galleryScrollRef = useRef<HTMLDivElement>(null);
  const scrubberTrackRef = useRef<HTMLDivElement>(null);

  const filteredStudies = filterStudiesByCategory(selectedCategory);

  // Active category display label
  const activeCategoryLabel = GALLERY_CATEGORIES.find(c => c.id === selectedCategory)?.label || 'All References';

  // Gallery scroll progress and state
  const [scrollState, setScrollState] = useState<ScrollProgressState>({
    progressPercent: 0,
    canScrollLeft: false,
    canScrollRight: true,
    activeStudyIndex: 0,
    displayFraction: `01 / ${String(filteredStudies.length).padStart(2, '0')}`,
  });

  // Drag-to-scroll gesture state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const hasMovedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const updateScrollState = useCallback(() => {
    if (!galleryScrollRef.current) return;
    const el = galleryScrollRef.current;
    const state = computeGalleryScrollState(
      el.scrollLeft,
      el.scrollWidth,
      el.clientWidth,
      300,
      24,
      filteredStudies.length
    );
    setScrollState(state);
  }, [filteredStudies.length]);

  useEffect(() => {
    const el = galleryScrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      galleryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCategoryChange = (catId: GalleryCategoryId) => {
    setSelectedCategory(catId);
    const newFiltered = filterStudiesByCategory(catId);
    if (newFiltered.length > 0 && !newFiltered.some(s => s.id === activeStudy.id)) {
      setActiveStudy(newFiltered[0]);
    }
    // Close mobile side panel if open
    setIsMobilePanelOpen(false);
    // Reset scroll position smoothly
    if (galleryScrollRef.current) {
      galleryScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  // Mouse Drag-to-Scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!galleryScrollRef.current) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - galleryScrollRef.current.offsetLeft;
    scrollLeftStartRef.current = galleryScrollRef.current.scrollLeft;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !galleryScrollRef.current) return;
    const x = e.pageX - galleryScrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 6) {
      hasMovedRef.current = true;
    }
    galleryScrollRef.current.scrollLeft = scrollLeftStartRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const handleCardClick = (study: HorologyStudy) => {
    if (hasMovedRef.current) {
      // Ignore click if user was dragging
      return;
    }
    setActiveStudy(study);
  };

  // Interactive scrubber click handler
  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrubberTrackRef.current || !galleryScrollRef.current) return;
    const rect = scrubberTrackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const fraction = Math.min(1, Math.max(0, clickX / rect.width));
    const target = calculateScrubTarget(
      fraction,
      galleryScrollRef.current.scrollWidth,
      galleryScrollRef.current.clientWidth
    );
    galleryScrollRef.current.scrollTo({ left: target, behavior: 'smooth' });
  };

  return (
    <section id="collection" className="relative w-full bg-[#0E0E0D] text-foreground py-24 sm:py-32 md:py-48 px-5 sm:px-8 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="up" distance={30} className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-gold">
              <Layers className="w-4 h-4" />
              <span className="font-sans text-xs uppercase tracking-[0.4em] font-medium">
                The Reference Gallery
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ivory tracking-tight">
              Curated Horological Studies
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-slate max-w-md leading-relaxed">
            Curated explorations of dial subdivisions, case proportions, and bezel geometries. Use the architectural side panel to filter by discipline or inspect individual studies below.
          </p>
        </ScrollReveal>

        {/* Mobile / Tablet Filter Button (Opens Dedicated Side Panel Drawer) */}
        <div className="lg:hidden flex items-center justify-between gap-3 pt-1 pb-2">
          <button
            onClick={() => setIsMobilePanelOpen(true)}
            className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#141413] border border-gold/40 text-ivory text-xs font-sans tracking-wide hover:border-gold transition-all shadow-lg"
          >
            <SlidersHorizontal className="w-4 h-4 text-gold" />
            <span>Discipline: <strong className="text-gold font-semibold">{activeCategoryLabel}</strong></span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gold/20 text-gold">
              {filteredStudies.length}
            </span>
          </button>

          {/* Quick Chevrons for Mobile */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scrollGallery('left')}
              disabled={!scrollState.canScrollLeft}
              aria-label="Previous gallery studies"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                scrollState.canScrollLeft
                  ? 'bg-white/10 hover:bg-gold hover:text-black text-ivory active:scale-95 shadow-md'
                  : 'bg-white/5 text-slate-dark/40 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollGallery('right')}
              disabled={!scrollState.canScrollRight}
              aria-label="Next gallery studies"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                scrollState.canScrollRight
                  ? 'bg-white/10 hover:bg-gold hover:text-black text-ivory active:scale-95 shadow-md'
                  : 'bg-white/5 text-slate-dark/40 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Reference Gallery Architecture: Side Panel + Gallery Track */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Dedicated Architectural Side Panel (Desktop / Large Screens) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="bg-[#121211] border border-white/5 rounded-xl p-5 space-y-5 sticky top-28 shadow-2xl">
              <div className="space-y-1.5 pb-3 border-b border-white/5">
                <div className="flex items-center gap-2 text-gold">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] font-semibold">
                    Disciplines
                  </span>
                </div>
                <h3 className="font-serif text-base text-ivory">
                  Atelier Archives
                </h3>
                <p className="text-[11px] text-slate leading-relaxed">
                  Select discipline to filter the reference gallery track.
                </p>
              </div>

              {/* Vertical Category Side Panel List */}
              <nav className="space-y-1.5" aria-label="Reference categories">
                {GALLERY_CATEGORIES.map((category) => {
                  const isSelected = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-sans tracking-wide transition-all duration-200 flex items-center justify-between group ${
                        isSelected
                          ? 'bg-[#1A1A18] text-gold font-semibold border-l-2 border-gold shadow-md'
                          : 'bg-white/[0.02] hover:bg-white/5 text-slate hover:text-ivory border-l-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-1.5 h-1.5 rounded-full transition-all ${
                          isSelected ? 'bg-gold scale-125 shadow-[0_0_8px_rgba(198,165,106,0.8)]' : 'bg-white/20 group-hover:bg-white/40'
                        }`} />
                        <span className="line-clamp-1">{category.label}</span>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-gold/20 text-gold' : 'bg-white/5 text-slate-dark'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Archival Metadata Note */}
              <div className="pt-3 border-t border-white/5 text-[10px] font-mono text-slate-dark flex items-center justify-between">
                <span>TOTAL STUDIES</span>
                <span className="text-gold font-bold">{CURATED_HOROLOGY_STUDIES.length} REFERENCES</span>
              </div>
            </div>
          </aside>

          {/* Right Column: Horizontal Cards Track & Controls */}
          <div className="lg:col-span-9 space-y-6">
            {/* Header Track Bar */}
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.25em] text-slate-dark">
              <div className="flex items-center gap-2">
                <span className="text-gold font-medium">{activeCategoryLabel}</span>
                <span className="text-slate/60 font-sans">({filteredStudies.length} Studies)</span>
              </div>
              <div className="hidden lg:flex items-center gap-2">
                <button
                  onClick={() => scrollGallery('left')}
                  disabled={!scrollState.canScrollLeft}
                  aria-label="Previous gallery studies"
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    scrollState.canScrollLeft
                      ? 'bg-white/10 hover:bg-gold hover:text-black text-ivory active:scale-95 shadow-md'
                      : 'bg-white/5 text-slate-dark/40 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollGallery('right')}
                  disabled={!scrollState.canScrollRight}
                  aria-label="Next gallery studies"
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    scrollState.canScrollRight
                      ? 'bg-white/10 hover:bg-gold hover:text-black text-ivory active:scale-95 shadow-md'
                      : 'bg-white/5 text-slate-dark/40 cursor-not-allowed'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Cards Track with no-scrollbar and mouse drag-to-scroll */}
            <div
              ref={galleryScrollRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              className={`flex gap-3 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar -mx-5 px-5 sm:-mx-8 sm:px-8 md:-mx-0 md:px-0 select-none ${
                isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
              }`}
            >
              {filteredStudies.map((study) => {
                const isActive = activeStudy.id === study.id;
                return (
                  <div
                    key={study.id}
                    data-testid="gallery-card-item"
                    onClick={() => handleCardClick(study)}
                    className={`flex-shrink-0 w-[240px] xs:w-[260px] sm:w-[300px] snap-start rounded-lg p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between break-words leading-normal ${
                      isActive
                        ? 'bg-[#181816] shadow-xl shadow-black/60 ring-1 ring-gold/50'
                        : 'bg-[#111110] hover:bg-[#151513] text-slate'
                    }`}
                  >
                    <div className="space-y-2.5 sm:space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-wider shrink-0 ${isActive ? 'text-gold font-bold' : 'text-slate-dark'}`}>
                          {study.tag}
                        </span>
                        <span className="font-mono text-[9px] sm:text-[10px] text-slate-dark uppercase bg-white/5 px-2 py-0.5 rounded-sm truncate max-w-[110px]">
                          {study.category}
                        </span>
                      </div>

                      <div className="h-[160px] sm:h-[210px] flex items-center justify-center py-2 pointer-events-none">
                        <img
                          src={study.image}
                          alt={study.title}
                          className={`max-h-full w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] transition-transform duration-300 ${
                            isActive ? 'scale-105' : 'hover:scale-102'
                          }`}
                          loading="lazy"
                          draggable={false}
                        />
                      </div>
                    </div>

                    <div className="pt-3 sm:pt-4 border-t border-white/5 space-y-1 sm:space-y-1.5 pointer-events-none">
                      <h4 className="font-serif text-xs sm:text-base text-ivory line-clamp-1 leading-snug break-words">
                        {study.title}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] font-sans text-slate line-clamp-1 break-words">
                        {study.caseProfile}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Intuitive Luxury Scrubber & Navigation Track */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 pb-2 border-t border-white/5 text-xs">
              {/* Left: Study counter & subtle interaction cue */}
              <div className="flex items-center gap-3 text-slate w-full sm:w-auto justify-between sm:justify-start">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-gold">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  <span>Study {scrollState.displayFraction}</span>
                </div>
                <span className="hidden sm:inline-block text-white/20">•</span>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-sans text-slate-dark uppercase tracking-wider">
                  <MoveHorizontal className="w-3 h-3 text-gold/70" />
                  Drag or scroll track
                </span>
              </div>

              {/* Center: Precision Champagne-Gold Scrubber Track */}
              <div
                ref={scrubberTrackRef}
                onClick={handleScrubberClick}
                role="slider"
                aria-label="Reference gallery progress scrubber"
                aria-valuenow={scrollState.progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                className="w-full sm:w-64 md:w-80 h-2 bg-white/10 hover:bg-white/15 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 group"
              >
                <div
                  className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-gold/80 via-gold to-gold-light rounded-full shadow-[0_0_12px_rgba(198,165,106,0.6)] transition-all duration-150"
                  style={{
                    width: `${Math.max(12, scrollState.progressPercent)}%`,
                  }}
                />
              </div>

              {/* Right: Touch/Desktop Quick Navigation Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => scrollGallery('left')}
                  disabled={!scrollState.canScrollLeft}
                  aria-label="Previous gallery study"
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    scrollState.canScrollLeft
                      ? 'bg-white/10 hover:bg-gold hover:text-black text-ivory active:scale-95 shadow-md'
                      : 'bg-white/5 text-slate-dark/40 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollGallery('right')}
                  disabled={!scrollState.canScrollRight}
                  aria-label="Next gallery study"
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    scrollState.canScrollRight
                      ? 'bg-white/10 hover:bg-gold hover:text-black text-ivory active:scale-95 shadow-md'
                      : 'bg-white/5 text-slate-dark/40 cursor-not-allowed'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Inspection Showcase (Powered by Origin Kit ShineCard & SmoothWatchImage) */}
        <ScrollReveal direction="up" delay={0.15}>
          <ShineCard
            cardColor="#121211"
            highlight="#C6A56A"
            unlit="#0B0B0A"
            density={40}
            waveSpeed={25}
            sparkle={80}
            radius="8px"
            className="shadow-2xl"
          >
            <div className="p-5 sm:p-10 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-center">
              {/* Left Column: Watch Visual with Zero-Flicker Smooth Transition */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center min-h-[250px] sm:min-h-[340px] md:min-h-[420px] relative">
                <SmoothWatchImage
                  src={activeStudy.image}
                  alt={activeStudy.title}
                  className="max-h-[240px] sm:max-h-[320px] md:max-h-[400px] w-auto"
                />
              </div>

              {/* Right Column: In-Depth Architectural Analysis */}
              <div className="lg:col-span-6 space-y-5 sm:space-y-6">
                <div 
                  data-testid="inspection-header"
                  className="flex flex-col xs:flex-row sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4"
                >
                  <span className="self-start font-mono text-[10px] sm:text-xs uppercase tracking-widest text-gold bg-gold/10 px-2.5 sm:px-3 py-1 rounded-sm whitespace-nowrap">
                    {activeStudy.tag} · Detail Inspection
                  </span>
                  <span className="font-mono text-[10px] sm:text-[11px] text-slate-dark uppercase tracking-wider">
                    {activeStudy.category} Architecture
                  </span>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <h3 className="font-serif text-xl sm:text-3xl md:text-4xl text-ivory leading-tight sm:leading-snug break-words">
                    {activeStudy.title}
                  </h3>
                  <span className="font-sans text-[11px] sm:text-sm text-gold-light tracking-wider sm:tracking-widest uppercase block break-words">
                    {activeStudy.subtitle}
                  </span>
                </div>

                <p className="font-sans text-xs sm:text-sm text-slate leading-relaxed break-words">
                  {activeStudy.narrative}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 pt-1 sm:pt-2 text-xs">
                  <div className="space-y-1 bg-white/[0.02] p-3 sm:p-3.5 rounded border border-white/5">
                    <span className="font-mono text-[9px] sm:text-[10px] text-slate-dark uppercase tracking-wider block">Dial Treatment</span>
                    <span className="text-ivory font-medium text-xs sm:text-sm leading-snug block break-words">{activeStudy.dialDescription}</span>
                  </div>
                  <div className="space-y-1 bg-white/[0.02] p-3 sm:p-3.5 rounded border border-white/5">
                    <span className="font-mono text-[9px] sm:text-[10px] text-slate-dark uppercase tracking-wider block">Case Geometry</span>
                    <span className="text-ivory font-medium text-xs sm:text-sm leading-snug block break-words">{activeStudy.caseProfile}</span>
                  </div>
                </div>

                <div className="pt-2 sm:pt-4 flex items-center">
                  <a
                    href="#contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-black font-semibold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-gold/10"
                  >
                    <span>Inquire About Reference</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </ShineCard>
        </ScrollReveal>
      </div>

      {/* Mobile Slide-Out Side Panel Drawer */}
      {isMobilePanelOpen && (
        <div 
          className="fixed inset-0 z-[100] flex"
          role="dialog"
          aria-modal="true"
          aria-label="Atelier Disciplines Selection"
        >
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobilePanelOpen(false)}
          />

          {/* Slide-out Drawer */}
          <div className="relative w-4/5 max-w-sm bg-[#0E0E0D] border-r border-gold/20 h-full p-6 flex flex-col justify-between z-10 shadow-2xl overflow-y-auto">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-gold">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="font-mono text-xs uppercase tracking-[0.25em] font-semibold">
                    Disciplines
                  </span>
                </div>
                <button
                  onClick={() => setIsMobilePanelOpen(false)}
                  aria-label="Close disciplines side panel"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold hover:text-black text-ivory flex items-center justify-center transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                <h4 className="font-serif text-lg text-ivory">Atelier Archives</h4>
                <p className="text-xs text-slate">Filter reference models by architectural category.</p>
              </div>

              {/* Drawer Category Navigation List */}
              <nav className="space-y-2 pt-2">
                {GALLERY_CATEGORIES.map((category) => {
                  const isSelected = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full text-left p-3.5 rounded-xl text-xs font-sans tracking-wide transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-gold text-black font-bold shadow-lg shadow-gold/20'
                          : 'bg-white/5 hover:bg-white/10 text-slate-light'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isSelected ? (
                          <Check className="w-4 h-4 text-black" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-white/20" />
                        )}
                        <span>{category.label}</span>
                      </div>
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-black/20 text-black' : 'bg-white/10 text-slate'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Bottom Note */}
            <div className="pt-6 border-t border-white/10 text-center space-y-1 text-[11px] font-mono text-slate-dark">
              <span>VERITAS ATELIER HORLOGER</span>
              <span className="block text-gold/80">GENÈVE · SUISSE</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
