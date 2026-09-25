'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  scale?: number;
  scrub?: boolean | number;
  duration?: number;
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 40,
  scale = 1,
  scrub = false,
  duration = 1.1,
  ...restProps
}: ScrollRevealProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = elRef.current;
    if (!el) return;

    let x = 0;
    let y = 0;
    if (direction === 'up') y = distance;
    if (direction === 'down') y = -distance;
    if (direction === 'left') x = distance;
    if (direction === 'right') x = -distance;

    const ctx = gsap.context(() => {
      if (scrub) {
        gsap.fromTo(
          el,
          { y, x, scale: scale !== 1 ? scale : 1, opacity: 0.2 },
          {
            y: 0,
            x: 0,
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              end: 'top 35%',
              scrub: scrub === true ? 1 : scrub,
            },
          }
        );
      } else {
        gsap.fromTo(
          el,
          { y, x, scale: scale !== 1 ? scale : 1, opacity: 0 },
          {
            y: 0,
            x: 0,
            scale: 1,
            opacity: 1,
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, elRef);

    return () => ctx.revert();
  }, [direction, distance, delay, scale, scrub, duration]);

  return (
    <div ref={elRef} className={className} {...restProps}>
      {children}
    </div>
  );
}

/**
 * Parallax floating image that translates gracefully with scroll like on atom.uprock.pro
 */
export function ScrollParallax({
  children,
  className = '',
  speed = 0.2, // -0.5 to 0.5
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = elRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: () => -window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    }, elRef);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
}
