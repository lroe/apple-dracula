# Apple on-device LLM — Remotion preview

Repo: https://github.com/lroe/How-Apple-Fits-a-Large-Language-Model-on-Your-iPhone.

Minimalist hand-drawn explainer built from `audio.wav` (12:12.16) and `audio.srt`, with word-level Whisper timing.

## Preview

```bash
cd video
npm install
npm run studio
```

Studio opens at **http://localhost:3000** by default (composition `AppleExplainer`). If that port is taken, Remotion prompts for the next free one.

- Canvas: 1920×1080
- FPS: 30
- Duration: 21,965 frames / 732.16 s
- Audio: `public/audio.wav`

**No final video has been rendered.** Dracula-themed still frames were rendered for layout QA (`out/qa/`, `out/preview-sheet.png`, `out/hero.png`).

To refresh the preview stills without rendering the MP4:

```bash
cd video
npm run preview
```


## Design rules

- Dracula night canvas (`#282A36`), foreground ink (`#F8F8F2`), red (`#FF5555`), green (`#50FA7B`), current-line surface (`#44475A`), and deep comment fills (`#6272A4`).
- Caveat for display type; Patrick Hand for labels.
- Secondary text is **lavender-grey `#B8B9C5`**, never the low-contrast comment blue.
- Word-level sync: every reveal uses an absolute cue from `src/data/words.json`; frame = seconds × 30.
- Arrows are drawn with the arrowhead tip exactly at the target edge. Source/target anchors are explicit in scene code.
- Layout zones are fixed; QA frames were rendered at the end of each scene to check collisions.

## Files

```
src/data/timeline.ts     57 scene definitions / exact time ranges
src/data/words.json      2266 word timestamps
src/scenes/              scene components grouped by chapter
src/components/          Stage, ChapterCard, sketch primitives
src/lib/rough.tsx        Rough.js path generation + arrow geometry
out/qa/                  still-frame QA renders for every scene
out/preview-sheet.png    57-frame overview contact sheet
render-preview.mjs       still-only preview renderer (no MP4)
```

The production timing sheet is at `../storyboard.md`.

## 4K render (Colab)

Open `colab_render.ipynb` in Colab. It clones the private repo with a GitHub token and runs `render-4k.mjs`.

- Output: **3840×2160**, 30 fps, H.264 CRF 16, AAC 320 kbps
- Every completed frame prints as `[frame 00000/21965] ... %`
- A 12-frame 4K test runs first
- Rendering is CPU-heavy; expect **2–6 hours** on a free Colab CPU runtime and less on High-RAM / more vCPUs

Command used under the hood:

```bash
CONCURRENCY=4 node render-4k.mjs
```

## Reading pass

- Removed the top-left eyebrow/title/subtitle from every content scene. The narration and the diagram labels carry the scene; no more “read top-left, then look center” eye movement.
- Chapter cards keep only the big chapter number, one title, and a motif. Subtitles and the footer line are gone.
- Scene transitions use a short **fade through the Dracula background** (4 frames), with the next diagram already pre-rolled underneath. No left-to-right wipe.
- Opening visuals are pre-rolled so they are already drawn when the fade completes.

## Pacing pass

A second timing pass gives the densest scenes more processing time without changing the audio:

- `Mixed sizes`: removed the hand-off line; the 3.7 average now holds ~2.7 s.
- `Split it, don't copy it`: "no extra copies" appears ~1.5 s earlier, holding ~2.4 s.
- `Dense vs sparse`: extended into the natural pause before "hospital"; final state holds ~2.4 s.
- `The basement library`: extended into the next pause; desk and final books hold ~1.9 s.
- `Wall two: speed`: clock/waiting appears earlier; holds ~1.9 s.
- `Look it up`: KV notebook appears earlier; final lookup holds ~3 s.
- `Paint by numbers`: final "same idea, with weights" moved earlier; holds ~2.4 s.
- `Google Cloud joins in`: cloud labels moved earlier; hold ~2.1 s.
- `New in 2026`: Core Advanced card moves with "along with"; holds ~3.3 s.
- `Trick 1`: 2-bit card/label moved earlier; quantization holds ~2 s.
- `Train for the size`: final check moved earlier; holds ~2.2 s.
- `One phone, many features`: removed the hand-off line so the red "three copies" frame holds ~5.3 s.
- `Match power to the job`: extended ~0.3 s into the next pause; final adaptive frame holds ~2 s.
- `Phone first, cloud second`: now runs through the PCC hand-off; hard-request arrow holds ~5.4 s.
- `A hospital of experts`: starts at the natural pause so the sparse comparison holds.


## Optional final render

Only if you explicitly want the MP4:

```bash
npx remotion render src/index.ts AppleExplainer out/apple-explainer.mp4 \
  --browser-executable=/usr/bin/google-chrome
```
