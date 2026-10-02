/**
 * Throwable card deck. Drag the top card past a tenth of the deck width (or
 * press left/right) to throw it aside; it re-stacks at the back.
 *
 * Markup: `[data-deck]` containing `[data-card]` elements with `data-name`,
 * plus optional `[data-deck-dot]` and `[data-deck-status]` in the same
 * `[data-deck-root]` wrapper.
 */
export function initDeck(deck: HTMLElement) {
  const root = deck.closest<HTMLElement>('[data-deck-root]') ?? deck;
  const cards = [...deck.querySelectorAll<HTMLElement>('[data-card]')];
  const dots = [...root.querySelectorAll<HTMLElement>('[data-deck-dot]')];
  const status = root.querySelector<HTMLElement>('[data-deck-status]');
  if (cards.length === 0) return;

  const reduce = !document.documentElement.classList.contains('motion-ok');
  const order = cards.map((_, i) => i);
  const top = () => cards[order[0]];
  let busy = false;

  const layout = (announce = false) => {
    order.forEach((ci, pos) => {
      const c = cards[ci];
      c.style.setProperty('--i', String(pos));
      c.style.zIndex = String(cards.length - pos);
      c.setAttribute('aria-hidden', pos === 0 ? 'false' : 'true');
    });
    dots.forEach((d, i) => d.toggleAttribute('data-active', i === order[0]));
    if (announce && status) {
      status.textContent = `${top().dataset.name}, ${order[0] + 1} of ${cards.length}`;
    }
  };

  const throwTop = (dir: number) => {
    if (busy) return;
    busy = true;
    const c = top();
    const w = deck.clientWidth;
    const finish = () => {
      // Snap the thrown card to the back without animating it across the deck.
      c.style.transition = 'none';
      c.style.transform = '';
      order.push(order.shift()!);
      layout(true);
      void c.offsetWidth;
      c.style.transition = '';
      busy = false;
    };
    if (reduce) return finish();
    c.style.transition = 'transform 0.42s cubic-bezier(0.3, 0.6, 0.3, 1)';
    c.style.transform = `translate(${dir * w * 1.1}px, -48px) rotate(${dir * 24}deg)`;
    window.setTimeout(finish, 420);
  };

  let drag: { id: number; x: number; y: number; dx: number } | null = null;

  deck.addEventListener('pointerdown', (e) => {
    if (busy || e.button !== 0 || !top().contains(e.target as Node)) return;
    e.preventDefault(); // stop the drag from selecting nearby text
    deck.focus({ preventScroll: true });
    drag = { id: e.pointerId, x: e.clientX, y: e.clientY, dx: 0 };
    deck.setPointerCapture(e.pointerId);
    top().style.transition = 'none';
  });

  deck.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    drag.dx = dx;
    top().style.transform = `translate(${dx}px, ${dy}px) rotate(${dx * 0.06}deg) scale(1.02)`;
  });

  const release = (e: PointerEvent) => {
    if (!drag || e.pointerId !== drag.id) return;
    const { dx } = drag;
    drag = null;
    if (Math.abs(dx) > deck.clientWidth * 0.1) {
      throwTop(Math.sign(dx));
    } else {
      const c = top();
      c.style.transition = '';
      c.style.transform = '';
    }
  };
  deck.addEventListener('pointerup', release);
  deck.addEventListener('pointercancel', release);

  deck.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      throwTop(e.key === 'ArrowRight' ? 1 : -1);
    }
  });

  layout();
}
