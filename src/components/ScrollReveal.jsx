import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TARGET_SELECTOR = [
  'main section',
  'main article',
  'main header',
  'main [data-reveal]',
].join(', ');

const STAGGER_MS = 80;
const MAX_STAGGER_STEPS = 6;

export default function ScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    const root = document.querySelector('main');
    if (!root) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') return undefined;

    const cleanup = (el) => {
      el.classList.remove('reveal', 'is-revealed');
      el.style.removeProperty('--reveal-delay');
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          observer.unobserve(el);
          el.classList.add('is-revealed');
          // Drop the reveal classes afterwards so they never override hover transforms.
          const delay = parseInt(el.style.getPropertyValue('--reveal-delay'), 10) || 0;
          window.setTimeout(() => cleanup(el), 900 + delay);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    );

    const scan = () => {
      const elements = root.querySelectorAll(TARGET_SELECTOR);
      const staggerByParent = new Map();

      elements.forEach((el) => {
        if (el.dataset.revealBound) return;
        if (el.closest('.fold') || el.closest('[data-no-reveal]')) return;
        el.dataset.revealBound = '1';

        const parent = el.parentElement;
        const step = staggerByParent.get(parent) ?? 0;
        staggerByParent.set(parent, step + 1);

        el.style.setProperty('--reveal-delay', `${Math.min(step, MAX_STAGGER_STEPS) * STAGGER_MS}ms`);
        el.classList.add('reveal');
        observer.observe(el);
      });
    };

    scan();

    let frame = 0;
    const mutationObserver = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mutationObserver.disconnect();
      observer.disconnect();
      root.querySelectorAll('.reveal').forEach(cleanup);
    };
  }, [location.pathname]);

  return null;
}
