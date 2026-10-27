# PaletteMash — Demo Script & Jan 3 Presentation Outline

This script serves two uses: (A) the demo-video narration, and (B) Rene's
live Zoom presentation at InnovArt 2027 on **Jan 3, 2027**. The live slot is
**10 minutes total including ~3 minutes of judge Q&A**, so the talk portion
below is timed to **~7 minutes**. Keep the app open in a browser tab and this
outline on a second screen.

---

## Part B (primary): Live talk — 7 minutes

**Setup before the slot:** run `node server.js`, open http://localhost:4173,
generate one mashup in advance (seed 2027) so the canvas isn't empty, and
have `output/mashup-3-sources.png` open as a backup image in case of any
screen-share hiccup.

### 0:00–0:45 — Hook
"I'm Rene Turcios. This is PaletteMash — an AI art-curator mashup studio.
A curator's real skill isn't hanging paintings side by side; it's knowing
which colours in a room change each other. PaletteMash does that inside a
single canvas — and unlike most AI art, it can show you *exactly* what it
took from where. Nothing in this project is scraped, and I'll prove that
live."

### 0:45–2:00 — The sources (screen-share the picker)
- Point at the three source cards. "These are not Van Gogh, Hokusai, and
  Mondrian paintings. Each is an **original procedural rendering generated
  by this tool's own code**, inspired by a public-domain master — Van Gogh
  died in 1890, Hokusai in 1849, Mondrian in 1944. The code paints spirals,
  wave arcs, and grids in their manner. No image file of anyone's art
  exists anywhere in this project — that's deliberate, and it's the whole
  ethics design."
- Show the palette swatches under each card: "What's extracted is only
  colour — six characteristic colours per source, by quantisation."

### 2:00–4:15 — Live curation (do it live)
- Keep Swirl Night + Great Wave + Grid Composition ticked, turbulence 0.65,
  seed 2027 → **Curate my mashup**.
- Narrate the roles as the piece appears: "First pick becomes **movement** —
  two hundred flow-field ribbons in Swirl Night's blues and golds. Second
  pick is **atmosphere** — the Great Wave's pale wash behind everything.
  Third is **structure** — Mondrian-palette shards trying to organise the
  weather."
- Drag turbulence up, hit a new seed: "Same curation, different weather.
  And because it's seeded, this exact piece is reproducible by anyone."
- Click **Export PNG**: "That's a finished, downloadable artwork."

### 4:15–5:30 — The curation statement (scroll to it)
- Read two lines aloud. "Every piece ships with this: sources, roles, the
  actual hex colours drawn from each, the method, the seed. Remix culture
  usually hides its ingredients. We think the statement *is* the artwork's
  provenance — curation as an auditable act, not a black box."

### 5:30–6:30 — How AI was used (say it plainly)
- "Two honest disclosures. One: the tool is procedural generation and
  explicit rules — no diffusion model, no training on artists' work.
  Two: the tool itself was **built by my AI agents** under my direction
  during the hackathon period — I set the concept and the no-scraped-art
  constraint; agents coded and tested it. That's disclosed in the repo,
  the submission, and right now, out loud."

### 6:30–7:00 — Close
- "What's next: more procedural studies, drag-to-assign palette roles, and
  a gallery-wall mode. PaletteMash's bet is simple — AI art people can
  trust is AI art that shows its ingredients. Thank you — happy to take
  questions."

### 7:00–10:00 — Q&A (anticipated questions)
- **"Is it really art if rules made it?"** → The rules are the medium, like
  a woodblock or a loom; the curatorial choices (sources, order, turbulence,
  seed) are human, and the statement makes them visible.
- **"Why not use the real paintings from Wikimedia Commons?"** → We could
  legally — they're public domain. We chose procedural sources so the
  provenance claim is absolute rather than licensed: zero pixels of anyone
  else's work, ever, even by a public-domain master.
- **"Where's the AI?"** → In the building (agent-built, disclosed) and in
  the curatorial framing; the generator itself is deliberately transparent
  procedural code — that's a design position, not a limitation we're
  hiding.
- **"Can users add copyrighted images?"** → A user can palette-extract
  their *own* photo locally; nothing uploads. The shipped sources are
  procedural only.
- **"What would you build with more time?"** → Role-dragging UI, more
  studies (pointillism, Bauhaus), print-resolution export.

---

## Part A: Demo video (2–3 min cut of the same material)

1. (0:00) Title card + one-line pitch over `output/mashup-3-sources.png`.
2. (0:15) The three source studies full-screen, one beat each, with their
   public-domain credits as captions.
3. (0:45) Screen recording: tick sources → set turbulence → Generate →
   zoom into the flow field → Export PNG.
4. (1:45) The curation statement scrolling; highlight the hex colours.
5. (2:15) The ethics line, on screen and in narration: "Every visual
   generated by this repo's code. No scraped art. No copyrighted art."
6. (2:30) End card: name, "Built by AI agents directed by Rene Turcios —
   fully disclosed," repo URL placeholder.
