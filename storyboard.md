# Storyboard & Timing Sheet

**Project:** Apple on-device LLM explainer  

**Audio:** `audio.wav` — 12:12.16  

**Canvas:** 1920×1080, 30 fps  

**Style:** Dracula night paper (`#282A36`), foreground linework (`#F8F8F2`), red/green accents (`#FF5555` / `#50FA7B`), current-line highlights (`#44475A`), Caveat + Patrick Hand. Secondary text is lavender-grey (`#B8B9C5`), never low-contrast grey. Phone-safe floor: 36px text, 3px strokes.  

**Sync source:** word-level Whisper timestamps, reconciled against `audio.srt`.  

**Rule:** no full narration on screen; every visual/arrow is anchored to a spoken beat.  


| # | Time | Scene | Narration cue | Visual | On-screen emphasis |
|---:|---|---|---|---|---|
| 01 | 00:00.0–00:09.6 | A model in your pocket | Apple runs a 3 billion parameter language model | Phone on a clean groundline, packing a 3B dot-grid into memory. | 3 billion parameters · phone memory |
| 02 | 00:09.6–00:14.9 | One model, three jobs | The model summarizes text, pulls out key facts, | Three paper cards: summarize, find facts, sort. | Summarize · Find facts · Sort |
| 03 | 00:14.9–00:20.3 | Everything shares it | It does all of that while sharing the | One large phone stack: model, OS, apps share the same memory. | one memory · model + OS + apps |
| 04 | 00:20.3–00:26.3 | No slowdown, no heat | And somehow the phone doesn't slow down. | Phone plus speedometer, thermometer, battery dials. | speed · heat · battery · past lunch |
| 05 | 00:26.3–00:29.1 | How? | So how did Apple do it? | Small bean and phone facing a huge handwritten “How?”. | How? · not one big trick |
| 06 | 00:29.1–00:41.6 | A pile of small decisions | It's a pile of small, careful decisions. | Six numbered cards slide out of a stack one by one. | small decisions 01–06 · worth knowing |
| 07 | 00:41.6–00:57.6 | Tokens, not words | Let's start with the problem. | Sentence splinters into token chips; tokens pass through layer bars. | in / out · layers · whole word / pieces / punctuation |
| 08 | 00:57.6–01:00.1 | Two walls | Two things make this hard on a phone. | Two brick walls labelled space and speed. | space · speed |
| 09 | 01:00.1–01:08.8 | Wall one: space | The first is space. | 8 GB memory bar; 6 GB of 16-bit weights fills three quarters. | 16-bit · 3B weights · almost 6 GB |
| 10 | 01:08.8–01:20.7 | And everything else | The model also needs room for your prompt, | Prompt/calculations/OS/apps crowd the remaining 2 GB. | prompt · calculations · temp results · OS · apps |
| 11 | 01:20.7–01:31.9 | Wall two: speed | The second is speed, or really, how fast | Memory box, chip, three repeated data arrows, waiting clock. | memory · chip · again and again · waiting |
| 12 | 01:31.9–01:40.1 | The chef and the helper | Even a very fast chip ends up waiting | Fast chef, slow helper carrying an ingredient box; clock idles. | memory · ingredients · fast · waiting |
| 13 | 01:40.1–01:49.9 | The rest of the phone | On top of that, the phone has to | Phone with battery, heat, app responsiveness; red freeze X. | battery · heat · responsive · never freeze |
| 14 | 01:49.9–01:58.1 | Every trick goes after one | So those are the two walls. | Two walls, one central “every trick” arrow split in two. | memory size · data speed · every trick |
| 15 | 01:58.1–02:07.9 | Trick 1: smaller numbers | Trick one. | 16-bit weight card shrinks to a 2-bit note. | 01 · fewer bits · quantisation |
| 16 | 02:07.9–02:25.4 | A thousand shades | Picture a box of a thousand crayons, each | 1,000-shade box vs 16-shade box; simple drawing; balance. | 1,000 shades · 16 shades · still looks great |
| 17 | 02:25.4–02:47.0 | Paint by numbers | Apple uses a kind of quantization called palettization. | Paint-by-number flower, palette and key. | numbers · palette · key |
| 18 | 02:47.0–03:00.2 | A tiny lookup table | A lot of weights have nearly the same | Three groups of near-identical weights feed a small lookup table. | groups · lookup table · note = 00 |
| 19 | 03:00.2–03:15.2 | How short is a note? | How short can that note be? | Bits → 2-bit/4-bit combinations; 8× smaller comparison bars. | one bit · two bits → 4 · four bits → 16 · 8× smaller |
| 20 | 03:15.2–03:25.2 | Mixed sizes | In an earlier version of the model, Apple | 10×10 weight grid with mixed 2-bit and 4-bit cells; 3.7 average. | 2-bit + 4-bit · 3.7 average |
| 21 | 03:25.2–03:41.2 | Run the numbers | Let's run the numbers. | Handwritten arithmetic and 1.39 GB vs 5.9 GB bars. | 3B × 3.7 = 11.1B bits · ÷ 8 = 1.39 GB · less than ¼ |
| 22 | 03:41.2–03:58.9 | Not every part is equal | So why mix sizes at all? | Packing box: squishable socks vs bubble-wrapped vase. | socks → 2 bits · vase → 4 bits · squeeze gently |
| 23 | 03:58.9–04:20.5 | Two parts, two sizes | The newer model goes further. | Decoder body writes tokens; embedding dictionary returns numbers. | decoder 2-bit · embedding 4-bit · one token at a time |
| 24 | 04:20.5–04:35.8 | The catch | There's a catch, though. | Finished model is squeezed; red errors pile up in the answer. | 16-bit trained model · squeeze · errors pile up |
| 25 | 04:35.8–04:54.7 | Squeeze while learning | Instead of squeezing the model at the end, | Three-node training loop: try, spot error, nudge; repeat. | try a task · spot the error · nudge weights · repeat |
| 26 | 04:54.7–05:07.5 | The four-crayon test | It's like a drawing test where you only | Two drawing tests: 1,000-crayon practice vs 4-crayon practice. | practice with 1,000 · test day: 4 · messy · still good |
| 27 | 05:07.5–05:15.0 | Train for the size | For developers, that means you shouldn't shrink a | Two developer rows: shrink later vs train small. | shrink later × · train small ✓ |
| 28 | 05:15.0–05:21.2 | Trick 2: no repeated homework | Trick two. | Chapter card with a reused notebook. | 02 · no repeated homework · the other half of memory |
| 29 | 05:21.2–05:40.2 | Look it up, do not redo it | The model needs memory while it works, too. | Earlier tokens feed the model; notebook replaces recalculation. | earlier tokens · next token · KV cache · look up |
| 30 | 05:40.2–06:02.5 | The notebook grows | It's a notebook where the model writes down | Weights stay fixed; cache bar grows past the memory limit. | weights fixed · cache grows · memory limit · two targets |
| 31 | 06:02.5–06:27.6 | Eight floors, five notebooks | For the cache, Apple uses cross-layer KV | Eight-floor cross-section; top three floors read floor five. | eight floors · 3 of 8 notebooks gone · 37.5% less cache |
| 32 | 06:27.6–06:34.4 | Do not forget the cache | The lesson for developers is to not stop | Long document pushes the cache bar past the budget. | long document · weights · cache · fills the rest |
| 33 | 06:34.4–06:37.3 | Trick 3: one brain, many hats | Compression makes one model smaller, but a phone | Chapter card: one bean, three hats on a shelf. | 03 · one brain, many hats · one hat per job |
| 34 | 06:37.3–06:56.7 | One phone, many features | Compression makes one model smaller, but a phone | Three feature cards above three duplicated base models. | summaries · rewrite · key facts · base model ×3 |
| 35 | 06:56.7–07:12.7 | One actor, many hats | Adapters fix that. | Base model + small adapter; actor with a hat rack. | adapter = a few parameters · same actor, different hats |
| 36 | 07:12.7–07:23.1 | Freeze the base | short for low-rank adaptation. | Frozen 3B base with small trainable A/B pieces. | frozen base · A/B · train only these · far cheaper |
| 37 | 07:23.1–07:35.7 | One base, swap the hats | That's far cheaper than training or shipping a | Phone memory: fixed base, adapter slot, three swappable cards. | base model 3GB · adapter slot · tens of MB · swap |
| 38 | 07:35.7–07:38.0 | Trick 4: keep the chips happy | Even a small model needs a plan for | Chapter card with a Neural Engine chip. | 04 · keep the chips happy · feed the data right |
| 39 | 07:38.0–07:57.1 | Three chips, one plan | Even a small model needs a plan for | Model block fanning into CPU, GPU and Neural Engine. | CPU · GPU · NE · not just one |
| 40 | 07:57.1–08:05.1 | Split it, do not copy it | one of them and call it done. | Array split into three chunks; copy icon crossed out. | chunks · no extra copies |
| 41 | 08:05.1–08:19.1 | Moving boxes | It's a lot like moving boxes between rooms. | Bad lane copies each box; good lane carries one packed load. | copy each step · takes forever · packed, one trip |
| 42 | 08:19.1–08:21.9 | Trick 5: know when to ask for help | Trick five. | Chapter card with a cloud. | 05 · ask for help · phone first, cloud second |
| 43 | 08:21.9–08:41.0 | Phone first, cloud second | Even with all of that, the model on | Phone handles simple tasks; hard request routes to cloud. | 3B phone · summarise/find facts/sort · request · hard job |
| 44 | 08:41.0–08:49.0 | A protected space | Private cloud compute is a protected space in | Cloud boundary, lock, verified server; outsiders blocked. | protected space · locked · verified server · authorized only |
| 45 | 08:49.0–09:02.5 | Locked all the way there | Your device encrypts the request for verified servers | Phone → locked envelope → verified server; no keys outside. | encrypted · keys · no keys, no read · even Apple staff |
| 46 | 09:02.5–09:18.1 | Many experts, a few awake | Once it arrives, a separate, larger server model | Expert grid, three awake experts feed three parallel tracks. | prompt · experts · parallel tracks · pick a few |
| 47 | 09:18.1–09:23.3 | Two gears | So the system has two gears. | Phone gear meshing with cloud gear. | phone · cloud · when you can · when you must |
| 48 | 09:23.3–09:37.0 | New in 2026 | Now, what's new in 2026? | Two AFM3 cards and a 2026 calendar. | AFM3 Core 3B · Core Advanced |
| 49 | 09:37.0–09:56.0 | Dense vs sparse | Core Advanced is a sparse model. | Dense all-on grid vs sparse grid with three awake experts. | dense: every token · sparse: a few experts wake |
| 50 | 09:56.0–10:01.4 | A hospital of experts | It's like a big hospital with hundreds of | Hospital with many windows; three green windows lit. | hundreds inside · two or three doctors |
| 51 | 10:01.4–10:14.5 | Big model, small bill | Core Advanced has 20 billion parameters in total, | 20B total bar vs 1–4B active bar; expert grid. | 20B total · 1–4B awake · Apple Silicon budget |
| 52 | 10:14.5–10:26.5 | Load only what you need | The storage side is clever too. | Flash grid with only three experts loaded into memory. | flash storage · phone memory · per prompt, not per token |
| 53 | 10:26.5–10:32.1 | The basement library | Think of a huge library in the basement, | Basement bookshelf; a few books on the desk. | a few books · the desk |
| 54 | 10:32.1–10:39.3 | Google Cloud joins in | The cloud side grew as well. | Cloud with NVIDIA GPU server and Google Cloud label. | Private Cloud Compute · NVIDIA GPU · Google Cloud |
| 55 | 10:39.3–10:58.8 | Match power to the job | Zoom out and there's one idea underneath all | Phone, stronger device, cloud in one resource ladder. | small phone · stronger device · cloud · system adapts |
| 56 | 10:58.8–11:44.5 | Six things to remember | So what can you take from this for | Six recap cards with active green highlight. | six numbered cards, one green active |
| 57 | 11:44.5–12:12.2 | Look for waste | To wrap up, Apple didn't get a language | Phone, waste bin, cut list; final “Look for waste.” card. | no big secret · smaller weights · slimmer cache · safe cloud path · Look for waste. |

## QA checklist

- All 57 scenes are contiguous; total duration 12:12.16.
- Focal elements share fixed margins; no title/callout sits on a diagram edge.
- Arrow tips are computed from endpoint geometry; arrows point to object edges, not labels.
- Completed frames hold 1.5–3 s wherever narration allows; long scenes stage elements one-by-one.
- No top-left headings/subheadings: narration + figure labels carry the scene.
- Transitions use a short 4-frame fade through the Dracula background (`#282A36`); next visuals are pre-rolled so the gap is a blink.
- Phone-safe pass: no on-screen text below 36px at 1080p, no diagram stroke below 3px. Labels that do not fit are cut, not shrunk.
- Opening visuals are pre-rolled so scene start + 0.4 s is never blank.
- Pacing pass: every final reveal now holds at least ~2 s, with dense scenes held 2.4–5 s.
- Word timings are stored in `video/src/data/words.json` for frame-accurate cueing.

## Preview

```bash
cd video
npm install
npm run studio
```

Open `http://localhost:3000`. Still-frame QA renders are in `video/out/qa/`.
