/**
 * Subtle cursor trail: a thin line that tapers and fades behind the mouse.
 * Draws on a fixed, full-viewport 2D canvas inside `host`. The loop only runs
 * while there are live trail points, so a still mouse costs nothing.
 */
export type CursorTrailOptions = {
  /** RGB channels of the trail colour, e.g. '72, 224, 224' for the site cyan. */
  rgb: string;
  /** How long a point stays visible, in ms. */
  lifeMs: number;
  /** Line width at the cursor, in CSS px; it tapers to 0 at the tail. */
  width: number;
  /** Opacity at the cursor. */
  opacity: number;
};

const DEFAULTS: CursorTrailOptions = {
  rgb: '72, 224, 224',
  lifeMs: 320,
  width: 2.5,
  opacity: 0.55,
};

type Point = { x: number; y: number; t: number };

export function createCursorTrail(host: HTMLElement, options: Partial<CursorTrailOptions> = {}) {
  const o = { ...DEFAULTS, ...options };
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  canvas.style.cssText = 'display:block;width:100%;height:100%;pointer-events:none';
  host.appendChild(canvas);

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };
  resize();

  const points: Point[] = [];
  let raf = 0;

  const draw = () => {
    const now = performance.now();
    while (points.length && now - points[0].t > o.lifeMs) points.shift();
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1];
      const b = points[i];
      // 0 at the oldest end, 1 at the cursor.
      const k = 1 - (now - b.t) / o.lifeMs;
      if (k <= 0) continue;
      ctx.strokeStyle = `rgba(${o.rgb}, ${(o.opacity * k).toFixed(3)})`;
      ctx.lineWidth = o.width * k;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    // Keep going until every point has expired. A lone point draws nothing yet
    // but must survive to join the next one: Chrome delivers at most one
    // pointermove per frame, so most frames add exactly one point.
    raf = points.length ? requestAnimationFrame(draw) : 0;
  };

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const t = performance.now();
    // Chrome merges fast movements into one event per frame; the coalesced
    // events hold the in-between positions, which keep the line smooth.
    const coalesced = e.getCoalescedEvents?.() ?? [];
    for (const ev of coalesced.length ? coalesced : [e]) {
      points.push({ x: ev.clientX, y: ev.clientY, t });
    }
    if (!raf) raf = requestAnimationFrame(draw);
  };
  const onLeave = () => {
    points.length = 0;
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('resize', resize);
  document.documentElement.addEventListener('mouseleave', onLeave);

  return () => {
    if (raf) cancelAnimationFrame(raf);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('resize', resize);
    document.documentElement.removeEventListener('mouseleave', onLeave);
    canvas.remove();
  };
}
