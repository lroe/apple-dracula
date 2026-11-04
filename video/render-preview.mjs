import fs from 'node:fs';
import path from 'node:path';
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';

const timeline = fs.readFileSync(
  path.resolve('src/data/timeline.ts'),
  'utf8',
);
const scenes = [...timeline.matchAll(/\{id: '([^']+)', start: ([\d.]+), end: ([\d.]+)/g)]
  .map(([, id, start, end]) => ({id, start: Number(start), end: Number(end)}))
  .sort((a, b) => a.start - b.start);

if (scenes.length === 0) {
  throw new Error('Could not read scenes from src/data/timeline.ts');
}

const outDir = path.resolve('out/qa');
fs.mkdirSync(outDir, {recursive: true});

const browserExecutable =
  process.env.BROWSER_EXECUTABLE ||
  (fs.existsSync('/usr/bin/google-chrome') ? '/usr/bin/google-chrome' : undefined);

console.log(`Bundling for ${scenes.length} preview stills...`);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const composition = await selectComposition({
  serveUrl,
  id: 'AppleExplainer',
  browserExecutable,
});

for (const [i, scene] of scenes.entries()) {
  const frame = Math.max(
    0,
    Math.min(
      composition.durationInFrames - 1,
      Math.round(scene.end * composition.fps) - 2,
    ),
  );
  const output = path.join(outDir, `${scene.id}.png`);
  await renderStill({
    composition,
    serveUrl,
    output,
    frame,
    browserExecutable,
    chromiumOptions: {gl: 'swangle'},
    overwrite: true,
    logLevel: 'error',
  });
  console.log(
    `[${String(i + 1).padStart(2, '0')}/${scenes.length}] ${scene.id} @ frame ${frame}`,
  );
}

const manifest = path.resolve('out/qa-order.txt');
fs.writeFileSync(
  manifest,
  scenes.map((scene) => path.join(outDir, `${scene.id}.png`)).join('\n') + '\n',
);
console.log(`Wrote ${manifest}`);
