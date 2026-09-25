import { useState, useEffect, useRef } from 'react';

interface SmoothWatchImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export function SmoothWatchImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
}: SmoothWatchImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [incomingSrc, setIncomingSrc] = useState<string | null>(null);
  const [isIncomingLoaded, setIsIncomingLoaded] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (src === currentSrc) {
      setIncomingSrc(null);
      return;
    }

    // Set incoming image to be preloaded
    setIncomingSrc(src);
    setIsIncomingLoaded(false);

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsIncomingLoaded(true);
      // Allow crossfade duration before promoting incoming to current
      setTimeout(() => {
        setCurrentSrc(src);
        setIncomingSrc(null);
        setIsIncomingLoaded(false);
      }, 350);
    };
  }, [src, currentSrc]);

  return (
    <div className={`relative flex items-center justify-center overflow-visible ${className}`}>
      {/* Current Active Watch Image */}
      <img
        src={currentSrc}
        alt={alt}
        loading={loading}
        className={`w-full h-full object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] transition-all duration-350 ease-out will-change-[transform,opacity] ${
          incomingSrc && isIncomingLoaded ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
        }`}
      />

      {/* Incoming Watch Image (Fades in over current before promotion) */}
      {incomingSrc && (
        <img
          src={incomingSrc}
          alt={alt}
          loading="eager"
          className={`absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] transition-all duration-350 ease-out will-change-[transform,opacity] pointer-events-none ${
            isIncomingLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'
          }`}
        />
      )}
    </div>
  );
}
