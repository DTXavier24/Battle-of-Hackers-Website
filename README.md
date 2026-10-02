# Battle of Hackers Website

Single-page information site for APU's annual Battle of Hackers CTF, run by FSEC-SS.
Static build with Astro and Tailwind. No backend.

## Develop

```bash
npm install
npm run dev      # local server with hot reload
npm run build    # static output in dist/
npm run preview  # serve dist/ locally
npm run check    # type-check .astro and .ts files
npm test         # validates src/data/timeline.json
```

## Common edits

**Join CTF button.** `ctfUrl` in `src/data/site.ts` sets its target. It currently
points at the `#iboh-2026` registration section; set it to the CTFd URL once that is
live. While it is `null` the buttons render disabled with a "Coming soon" tooltip.

**Registration categories.** Edit `categories` in `src/data/site.ts` (name, image under
`public/`, registration link). They render as the card deck in the IBOH 2026
section. The fees table below it reads from `terms` and `termsNote` in the same file.

**Hero poster.** The portal hero reveals `public/posters/iboh-2026.webp` over a
pre-blurred copy, `iboh-2026-ambient.webp`. Replace both when the poster changes.

**Event details, socials.** Edit `src/data/site.ts`.

**Add a year to the timeline.** Drop the poster in `public/posters/` and append an
entry to `src/data/timeline.json`:

```json
{
  "id": "2027",
  "years": "2027",
  "title": "International Battle of Hackers",
  "subtitle": "Optional tagline",
  "description": "One or two sentences.",
  "poster": "/posters/iboh-2027.jpg"
}
```

Set `"status": "upcoming"` for a future edition; it gets a red node and year. A
poster is optional; without one a placeholder tile with an "Incoming" badge is shown.
`npm test` catches malformed entries and missing poster files.

**Logos.** Put `fsec-ss.png` and `apu.png` in `public/logos/`. The host section and
footer pick them up automatically and fall back to text marks otherwise.

**Motion.** The portal hero is bound to scroll position, so it reverses when scrolling
up. Entry reveals fire once. The mascot (`src/components/Mascot.astro`) peeks in from
the right edge when the About section arrives, stays put while you scroll, and
ducks out when the footer comes into view.

**Cursor trail.** A thin cyan line trails the mouse on desktop only (a mouse, at
least 1024px wide, reduced motion off). Colour, width, opacity and length are the
defaults in `src/scripts/cursor-trail.ts`. All motion is skipped when the visitor has
reduced motion turned on, and the page then renders in its finished state.

**Copy to replace.** Search the source for `PLACEHOLDER` to find draft text.

## Structure

```
src/data/        site config, timeline data and its schema
src/components/  Nav, Portal (hero), Statement, Register (deck), Terms, History, TimelineEntry,
                 Host, Close (footer), JoinButton, Mascot, CursorTrail
src/scripts/     scroll-driven portal, card deck, peeking mascot, cursor trail,
                 nav active-section
                 observer, scroll reveal
src/styles/      design tokens and shared utilities
images/          original poster files (source archive, not served)
public/posters/  posters served by the site
```

## Hosting

The build is plain static files. Cloudflare Pages or GitHub Pages will serve `dist/`
once a domain is available. Build command `npm run build`, output directory `dist`.
