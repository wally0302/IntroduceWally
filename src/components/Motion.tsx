'use client';

import { useEffect } from 'react';

export function Motion() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        gsap.fromTo('.branch-art', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power2.out', delay: .15 });
        document.querySelectorAll<HTMLElement>('.journey-item').forEach(el => {
          ScrollTrigger.create({ trigger: el, start: 'top 65%', end: 'bottom 35%', toggleClass: 'is-active' });
        });
        gsap.fromTo('.timeline-progress', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.journey-list', start: 'top 65%', end: 'bottom 65%', scrub: .3 } });
      });
      cleanup = () => context.revert();
    });
    const onChange = () => { if (media.matches) { disposed = true; cleanup?.(); } };
    media.addEventListener('change', onChange);
    return () => { disposed = true; cleanup?.(); media.removeEventListener('change', onChange); };
  }, []);
  return null;
}
