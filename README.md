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
live. While it is `null` the button renders disabled with a "Coming soon" note.

**Registration categories.** Edit `categories` in `src/data/site.ts` (name, image under
`public/`, registration link). They render in the IBOH 2026 section.

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

Set `"status": "upcoming"` for a future edition; it gets a red node and
year. A poster is optional for upcoming entries (a teaser works well); without one
a placeholder tile with an "Incoming" badge is shown. `npm test` catches malformed
entries and missing poster files.

**Logos.** Put `fsec-ss.png` and `apu.png` in `public/logos/`. The host section and
footer pick them up automatically and fall back to text marks otherwise.

**Copy to replace.** Search the source for `PLACEHOLDER` to find draft text.

## Structure

```
src/data/        site config, timeline data and its schema
src/components/  Hero, Host, Timeline, TimelineEntry, Register, SideRail, Footer
src/scripts/     rail active-section observer, scroll reveal
src/styles/      design tokens and shared utilities
images/          original poster files (source archive, not served)
public/posters/  posters served by the site
```

## Hosting

The build is plain static files. Cloudflare Pages or GitHub Pages will serve `dist/`
once a domain is available. Build command `npm run build`, output directory `dist`.
