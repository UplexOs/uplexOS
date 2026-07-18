'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: React.ReactNode;
  animate?: boolean;
  staggerDelay?: number;
  className?: string;
  style?: React.CSSProperties;
};

export function AnimatedWrapper({ children, animate = true, staggerDelay = 0.08, className = '', style }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current.children, {
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: staggerDelay,
        ease: 'power2.out',
      });
    }, ref);
    return () => ctx.revert();
  }, [animate, staggerDelay]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
