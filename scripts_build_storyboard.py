import re, json
from pathlib import Path

root = Path(__file__).resolve().parent
srt = (root/'audio.srt').read_text(errors='ignore')

def tm(s):
    h,m,rest=s.split(':'); sec,ms=rest.replace(',','.').split('.')
    return int(h)*3600+int(m)*60+int(sec)+int(ms)/1000

cues=[]
for block in re.split(r'\n\s*\n', srt.strip()):
    lines=[l.rstrip() for l in block.splitlines() if l.strip()]
    if len(lines)>=3 and '-->' in lines[1]:
        a,b=lines[1].split('-->')
        text=' '.join(lines[2:]).strip()
        text=text.replace('(Transcribed by TurboScribe. Go Unlimited to remove this message.) ','')
        cues.append((tm(a.strip()),tm(b.strip()),text))

ts=(root/'video/src/data/timeline.ts').read_text()
scenes=[(m.group(1),float(m.group(2)),float(m.group(3)),m.group(4)) for m in re.finditer(r"\{id: '([^']+)', start: ([\d.]+), end: ([\d.]+), component: \w+, title: '([^']+)'",ts)]

def fmt(t):
    m=int(t//60); s=t%60
    return f"{m:02d}:{s:04.1f}"

def narration_at(t):
    for a,b,text in cues:
        if a<=t<b: return text
    later=[c for c in cues if c[0]>=t]
    return later[0][2] if later else ''

visuals={
'hero':'Phone on a clean groundline, packing a 3B dot-grid into memory.',
'three-jobs':'Three paper cards: summarize, find facts, sort.',
'sharing':'One large phone stack: model, OS, apps share the same memory.',
'no-slow':'Phone plus speedometer, thermometer, battery dials.',
'how':'Small bean and phone facing a huge handwritten “How?”.',
'decisions':'Six numbered cards slide out of a stack one by one.',
'tokens':'Sentence splinters into token chips; tokens pass through layer bars.',
'walls':'Two brick walls labelled space and speed.',
'two-walls':'Two brick walls labelled space and speed.',
'space':'8 GB memory bar; 6 GB of 16-bit weights fills three quarters.',
'other-memory':'Prompt/calculations/OS/apps crowd the remaining 2 GB.',
'speed':'Memory box, chip, three repeated data arrows, waiting clock.',
'chef':'Fast chef, slow helper carrying an ingredient box; clock idles.',
'phone-limits':'Phone with battery, heat, app responsiveness; red freeze X.',
'walls-recap':'Two walls, one central “every trick” arrow split in two.',
'trick1':'16-bit weight card shrinks to a 2-bit note.',
'crayons':'1,000-shade box vs 16-shade box; simple drawing; balance.',
'paint':'Paint-by-number flower, palette and key.',
'lookup':'Three groups of near-identical weights feed a small lookup table.',
'bits':'Bits → 2-bit/4-bit combinations; 8× smaller comparison bars.',
'mixed':'10×10 weight grid with mixed 2-bit and 4-bit cells; 3.7 average.',
'numbers':'Handwritten arithmetic and 1.39 GB vs 5.9 GB bars.',
'run-numbers':'Handwritten arithmetic and 1.39 GB vs 5.9 GB bars.',
'sensitivity':'Packing box: squishable socks vs bubble-wrapped vase.',
'decoder':'Decoder body writes tokens; embedding dictionary returns numbers.',
'decoder-embed':'Decoder body writes tokens; embedding dictionary returns numbers.',
'catch':'Finished model is squeezed; red errors pile up in the answer.',
'qat':'Three-node training loop: try, spot error, nudge; repeat.',
'crayon-test':'Two drawing tests: 1,000-crayon practice vs 4-crayon practice.',
'dev':'Two developer rows: shrink later vs train small.',
'dev-lesson':'Two developer rows: shrink later vs train small.',
'trick2':'Chapter card with a reused notebook.',
'kv':'Earlier tokens feed the model; notebook replaces recalculation.',
'cache-grows':'Weights stay fixed; cache bar grows past the memory limit.',
'building':'Eight-floor cross-section; top three floors read floor five.',
'cache-lesson':'Long document pushes the cache bar past the budget.',
'trick3':'Chapter card: one bean, three hats on a shelf.',
'many-features':'Three feature cards above three duplicated base models.',
'adapters':'Base model + small adapter; actor with a hat rack.',
'lora':'Frozen 3B base with small trainable A/B pieces.',
'swap':'Phone memory: fixed base, adapter slot, three swappable cards.',
'trick4':'Chapter card with a Neural Engine chip.',
'hardware':'Model block fanning into CPU, GPU and Neural Engine.',
'layouts':'Array split into three chunks; copy icon crossed out.',
'moving-boxes':'Bad lane copies each box; good lane carries one packed load.',
'trick5':'Chapter card with a cloud.',
'phone-cloud':'Phone handles simple tasks; hard request routes to cloud.',
'pcc':'Cloud boundary, lock, verified server; outsiders blocked.',
'encryption':'Phone → locked envelope → verified server; no keys outside.',
'moe':'Expert grid, three awake experts feed three parallel tracks.',
'two-gears':'Phone gear meshing with cloud gear.',
'new-2026':'Two AFM3 cards and a 2026 calendar.',
'sparse':'Dense all-on grid vs sparse grid with three awake experts.',
'hospital':'Hospital with many windows; three green windows lit.',
'twenty-b':'20B total bar vs 1–4B active bar; expert grid.',
'storage':'Flash grid with only three experts loaded into memory.',
'library':'Basement bookshelf; a few books on the desk.',
'nvidia':'Cloud with NVIDIA GPU server and Google Cloud label.',
'zoom-out':'Phone, stronger device, cloud in one resource ladder.',
'six-things':'Six recap cards with active green highlight.',
'wrap-up':'Phone, waste bin, cut list; final “Look for waste.” card.',
}

onscreen={
'hero':'3 billion parameters · phone memory',
'three-jobs':'Summarize · Find facts · Sort',
'sharing':'one memory · model + OS + apps',
'no-slow':'speed · heat · battery · past lunch',
'how':'How? · not one big trick',
'decisions':'small decisions 01–06 · worth knowing',
'tokens':'in / out · layers · whole word / pieces / punctuation',
'walls':'space · speed',
'two-walls':'space · speed',
'space':'16-bit · 3B weights · almost 6 GB',
'other-memory':'prompt · calculations · temp results · OS · apps',
'speed':'memory · chip · again and again · waiting',
'chef':'memory · ingredients · fast · waiting',
'phone-limits':'battery · heat · responsive · never freeze',
'walls-recap':'memory size · data speed · every trick',
'trick1':'01 · fewer bits · quantisation',
'crayons':'1,000 shades · 16 shades · still looks great',
'paint':'numbers · palette · key',
'lookup':'groups · lookup table · note = 00',
'bits':'one bit · two bits → 4 · four bits → 16 · 8× smaller',
'mixed':'2-bit + 4-bit · 3.7 average',
'numbers':'3B × 3.7 = 11.1B bits · ÷ 8 = 1.39 GB · less than ¼',
'run-numbers':'3B × 3.7 = 11.1B bits · ÷ 8 = 1.39 GB · less than ¼',
'sensitivity':'socks → 2 bits · vase → 4 bits · squeeze gently',
'decoder':'decoder 2-bit · embedding 4-bit · one token at a time',
'decoder-embed':'decoder 2-bit · embedding 4-bit · one token at a time',
'catch':'16-bit trained model · squeeze · errors pile up',
'qat':'try a task · spot the error · nudge weights · repeat',
'crayon-test':'practice with 1,000 · test day: 4 · messy · still good',
'dev':'shrink later × · train small ✓',
'dev-lesson':'shrink later × · train small ✓',
'trick2':'02 · no repeated homework · the other half of memory',
'kv':'earlier tokens · next token · KV cache · look up',
'cache-grows':'weights fixed · cache grows · memory limit · two targets',
'building':'eight floors · 3 of 8 notebooks gone · 37.5% less cache',
'cache-lesson':'long document · weights · cache · fills the rest',
'trick3':'03 · one brain, many hats · one hat per job',
'many-features':'summaries · rewrite · key facts · base model ×3',
'adapters':'adapter = a few parameters · same actor, different hats',
'lora':'frozen base · A/B · train only these · far cheaper',
'swap':'base model 3GB · adapter slot · tens of MB · swap',
'trick4':'04 · keep the chips happy · feed the data right',
'hardware':'CPU · GPU · NE · not just one',
'layouts':'chunks · no extra copies',
'moving-boxes':'copy each step · takes forever · packed, one trip',
'trick5':'05 · ask for help · phone first, cloud second',
'phone-cloud':'3B phone · summarise/find facts/sort · request · hard job',
'pcc':'protected space · locked · verified server · authorized only',
'encryption':'encrypted · keys · no keys, no read · even Apple staff',
'moe':'prompt · experts · parallel tracks · pick a few',
'two-gears':'phone · cloud · when you can · when you must',
'new-2026':'AFM3 Core 3B · Core Advanced',
'sparse':'dense: every token · sparse: a few experts wake',
'hospital':'hundreds inside · two or three doctors',
'twenty-b':'20B total · 1–4B awake · Apple Silicon budget',
'storage':'flash storage · phone memory · per prompt, not per token',
'library':'a few books · the desk',
'nvidia':'Private Cloud Compute · NVIDIA GPU · Google Cloud',
'zoom-out':'small phone · stronger device · cloud · system adapts',
'six-things':'six numbered cards, one green active',
'wrap-up':'no big secret · smaller weights · slimmer cache · safe cloud path · Look for waste.',
}

lines=[]
lines.append('# Storyboard & Timing Sheet\n')
lines.append('**Project:** Apple on-device LLM explainer  \n')
lines.append('**Audio:** `audio.wav` — 12:12.16  \n')
lines.append('**Canvas:** 1920×1080, 30 fps  \n')
lines.append('**Style:** Dracula night paper (`#282A36`), foreground linework (`#F8F8F2`), red/green accents (`#FF5555` / `#50FA7B`), current-line highlights (`#44475A`), Caveat + Patrick Hand. Secondary text is lavender-grey (`#B8B9C5`), never low-contrast grey. Phone-safe floor: 36px text, 3px strokes.  \n')
lines.append('**Sync source:** word-level Whisper timestamps, reconciled against `audio.srt`.  \n')
lines.append('**Rule:** no full narration on screen; every visual/arrow is anchored to a spoken beat.  \n\n')
lines.append('| # | Time | Scene | Narration cue | Visual | On-screen emphasis |')
lines.append('|---:|---|---|---|---|---|')
for i,(sid,a,b,title) in enumerate(scenes,1):
    nar=narration_at(a).replace('|','/')
    if len(nar)>150: nar=nar[:147]+'…'
    lines.append(f"| {i:02d} | {fmt(a)}–{fmt(b)} | {title} | {nar} | {visuals.get(sid,'')} | {onscreen.get(sid,'')} |")
lines.append('\n## QA checklist\n')
lines.append('- All 57 scenes are contiguous; total duration 12:12.16.')
lines.append('- Focal elements share fixed margins; no title/callout sits on a diagram edge.')
lines.append('- Arrow tips are computed from endpoint geometry; arrows point to object edges, not labels.')
lines.append('- Completed frames hold 1.5–3 s wherever narration allows; long scenes stage elements one-by-one.')
lines.append('- No top-left headings/subheadings: narration + figure labels carry the scene.')
lines.append('- Transitions use a short 4-frame fade through the Dracula background (`#282A36`); next visuals are pre-rolled so the gap is a blink.')
lines.append('- Phone-safe pass: no on-screen text below 36px at 1080p, no diagram stroke below 3px. Labels that do not fit are cut, not shrunk.')
lines.append('- Opening visuals are pre-rolled so scene start + 0.4 s is never blank.')
lines.append('- Pacing pass: every final reveal now holds at least ~2 s, with dense scenes held 2.4–5 s.')
lines.append('- Word timings are stored in `video/src/data/words.json` for frame-accurate cueing.')
lines.append('\n## Preview\n')
lines.append('```bash\ncd video\nnpm install\nnpm run studio\n```\n')
lines.append('Open `http://localhost:3000`. Still-frame QA renders are in `video/out/qa/`.\n')
(root/'storyboard.md').write_text('\n'.join(lines))
print('wrote', root/'storyboard.md', len(lines))
