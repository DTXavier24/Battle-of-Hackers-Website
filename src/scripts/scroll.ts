/**
 * Scroll-position driven effects. Everything here is a pure function of scroll
 * position, so it plays in reverse when the reader scrolls back up.
 *
 * `[data-portal]` gets `--open` (panels, image, wash, dots) and `--t` (title).
 *
 * Does nothing unless <html> has `motion-ok` (set when reduced motion is off).
 */
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

export function initScrollFx() {
  if (!document.documentElement.classList.contains('motion-ok')) return;

  const portal = document.querySelector<HTMLElement>('[data-portal]');

  let queued = false;
  const update = () => {
    queued = false;
    const vh = window.innerHeight;

    if (portal) {
      const r = portal.getBoundingClientRect();
      const span = r.height - vh;
      const p = span > 0 ? clamp(-r.top / span) : 1;
      // Panels finish opening at 70% so the open image holds for a beat.
      portal.style.setProperty('--open', smooth(clamp(p / 0.7)).toFixed(4));
      portal.style.setProperty('--t', smooth(p).toFixed(4));
    }
  };

  const request = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  update();
}
