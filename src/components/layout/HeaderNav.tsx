import { useState, useEffect } from 'react';
import { X, ArrowUpRight, Compass } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Philosophy', href: '#philosophy', num: '01' },
  { label: 'Reference Gallery', href: '#collection', num: '02' },
  { label: 'Craftsmanship', href: '#craft', num: '03' },
  { label: 'Temporal Tension', href: '#tension', num: '04' },
  { label: 'Chronicle', href: '#chronicle', num: '05' },
];

export function HeaderNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on ESC key and prevent body scroll when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 sm:px-8 md:px-12 py-3.5 md:py-4 bg-[#0E0E0D]/90 backdrop-blur-md border-b border-white/5 transition-all">
        {/* Brand Identity */}
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 group">
          <img
            src="/logo/veritas logo.png"
            alt="Veritas Brand Mark"
            className="h-8 sm:h-9 md:h-10 w-auto object-contain drop-shadow-[0_2px_12px_rgba(198,165,106,0.35)] transition-transform group-hover:scale-105"
          />
          <span className="font-serif tracking-[0.25em] text-lg sm:text-xl font-bold text-ivory">
            VERITAS
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.3em] text-gold border border-gold/30 px-2 py-0.5 rounded-full">
            Geneva
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.25em] text-slate-light font-medium">
          <a href="#philosophy" className="hover:text-gold transition-colors">Philosophy</a>
          <a href="#collection" className="hover:text-gold transition-colors">Reference Gallery</a>
          <a href="#craft" className="hover:text-gold transition-colors">Craftsmanship</a>
          <a href="#tension" className="hover:text-gold transition-colors">Temporal Tension</a>
          <a href="#chronicle" className="hover:text-gold transition-colors">Chronicle</a>
        </nav>

        {/* Action CTA + Mobile Hamburger Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="#contact"
            className="text-xs uppercase tracking-[0.2em] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-black transition-all duration-300 font-semibold shadow-sm"
          >
            Inquire
          </a>

          {/* Aesthetic Luxury Mobile Burger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 p-2 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-ivory focus:outline-none focus:ring-1 focus:ring-gold/50"
          >
            <span
              className={`w-5 h-[1.5px] bg-ivory rounded-full transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-[4.5px] bg-gold' : ''
              }`}
            />
            <span
              className={`w-3.5 h-[1.5px] bg-gold rounded-full transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-[4.5px] w-5' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Luxury Fullscreen Opaque Mobile Drawer (Rendered outside header at z-[100]) */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{ backgroundColor: '#090908' }}
          className="fixed inset-0 z-[100] md:hidden flex flex-col justify-between p-6 sm:p-10 animate-fadeIn text-foreground overflow-y-auto"
        >
          {/* Drawer Top Header (Completely opaque bar) */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img
                src="/logo/veritas logo.png"
                alt="Veritas Logo"
                className="h-8 w-auto object-contain"
              />
              <div>
                <span className="font-serif tracking-[0.25em] text-sm font-bold text-ivory block">
                  VERITAS
                </span>
                <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-gold block">
                  Geneva · Switzerland
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation menu"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-ivory active:scale-95 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <nav className="flex flex-col gap-5 sm:gap-6 my-auto py-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="group flex items-baseline justify-between text-2xl sm:text-3xl font-serif text-ivory hover:text-gold transition-all duration-300 py-2.5 border-b border-white/5"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-gold/70 tracking-wider">
                    {item.num}
                  </span>
                  <span className="tracking-wide group-hover:translate-x-1 transition-transform">
                    {item.label}
                  </span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-dark group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </a>
            ))}
          </nav>

          {/* Drawer Footer & Direct Inquire Action */}
          <div className="pt-6 border-t border-white/10 space-y-4">
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="w-full py-4 rounded-full bg-gold hover:bg-gold-light text-black font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-lg shadow-gold/20 active:scale-[0.99]"
            >
              <span>Schedule Private Salon</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-dark uppercase tracking-widest pt-2">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-gold" />
                Swiss Chronometric Standard
              </span>
              <span>46°12' N · 6°09' E</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
