/**
 * Fixed mascot pinned to the right edge. It pops out with a quick, springy peek
 * once the reader reaches `data-start` (default #about), stays put while the
 * reader scrolls, and ducks back out when `data-end` (default the footer)
 * arrives or when the reader scrolls back above the start.
 *
 * Writes --x (percent) and --y (px, a gentle idle bob) on the element. With
 * reduced motion it only toggles between shown and hidden.
 */
type Spring = { v: number; vel: number };

const HIDDEN = 105; // percent of own width, fully off-screen

export function initMascot(el = document.querySelector<HTMLElement>('[data-mascot]')) {
  if (!el) return;
  const start = document.querySelector<HTMLElement>(el.dataset.start ?? '#about');
  const end = document.querySelector<HTMLElement>(el.dataset.end ?? 'footer');

  const shouldShow = () => {
    const vh = window.innerHeight;
    const started = start ? start.getBoundingClientRect().top < vh * 0.5 : true;
    const notEnded = end ? end.getBoundingClientRect().top > vh * 0.85 : true;
    return started && notEnded;
  };

  if (!document.documentElement.classList.contains('motion-ok')) {
    const apply = () => el.style.setProperty('--x', shouldShow() ? '0%' : `${HIDDEN}%`);
    window.addEventListener('scroll', apply, { passive: true });
    window.addEventListener('resize', apply);
    apply();
    return;
  }

  const x: Spring = { v: HIDDEN, vel: 0 };
  // Damped spring step; k is stiffness, c is damping.
  const step = (s: Spring, target: number, k: number, c: number, dt: number) => {
    s.vel += (k * (target - s.v) - c * s.vel) * dt;
    s.v += s.vel * dt;
  };

  let raf = 0;
  let lastT = 0;

  const frame = (now: number) => {
    const dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;
    const show = shouldShow();
    // Underdamped on the way in for a quick overshooting peek; near-critical on the way out.
    if (show) step(x, 0, 260, 16, dt);
    else step(x, HIDDEN, 180, 26, dt);
    const bob = show ? Math.sin(now / 650) * 4 : 0;

    el.style.setProperty('--x', `${x.v.toFixed(2)}%`);
    el.style.setProperty('--y', `${bob.toFixed(2)}px`);

    if (!show && x.v > HIDDEN - 1 && Math.abs(x.vel) < 2) {
      x.v = HIDDEN;
      x.vel = 0;
      el.style.setProperty('--x', `${HIDDEN}%`);
      raf = 0; // park the loop while hidden; the next scroll wakes it
      return;
    }
    raf = requestAnimationFrame(frame);
  };

  const wake = () => {
    if (raf) return;
    lastT = performance.now();
    raf = requestAnimationFrame(frame);
  };
  window.addEventListener('scroll', wake, { passive: true });
  window.addEventListener('resize', wake);
  wake();
}
