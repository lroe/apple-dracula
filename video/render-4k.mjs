import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';

const test = process.argv.includes('--test');
const testFrames = 12;
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const composition = await selectComposition({
  serveUrl,
  id: 'AppleExplainer',
});

const total = composition.durationInFrames;
const outputLocation = path.resolve(
  test ? 'out/test-4k.mp4' : 'out/apple-explainer-4k.mp4',
);
const concurrency = Math.max(
  1,
  Number(process.env.CONCURRENCY || Math.min(4, os.cpus().length)),
);
const scale = 2;

fs.mkdirSync(path.dirname(outputLocation), {recursive: true});

console.log('==============================================');
console.log(`Remotion 4K render${test ? ' (TEST)' : ''}`);
console.log(`Composition : ${composition.id}`);
console.log(`Frames      : ${test ? testFrames : total}`);
console.log(`Output      : ${outputLocation}`);
console.log(`Scale       : ${scale} → ${composition.width * scale}×${composition.height * scale}`);
console.log(`Concurrency : ${concurrency}`);
console.log('==============================================');

let lastRendered = -1;
const started = Date.now();
const displayTotal = test ? testFrames : total;

await renderMedia({
  composition,
  serveUrl,
  outputLocation,
  codec: 'h264',
  crf: 16,
  pixelFormat: 'yuv420p',
  audioCodec: 'aac',
  audioBitrate: '320k',
  scale,
  concurrency,
  x264Preset: 'medium',
  imageFormat: 'png',
  chromiumOptions: {gl: 'swangle'},
  timeoutInMilliseconds: 300000,
  frameRange: test ? [0, testFrames - 1] : undefined,
  overwrite: true,
  onProgress: ({renderedFrames, encodedFrames}) => {
    if (renderedFrames === lastRendered) return;
    lastRendered = renderedFrames;
    const pct = ((renderedFrames / displayTotal) * 100).toFixed(2).padStart(6, ' ');
    const elapsed = ((Date.now() - started) / 1000).toFixed(0);
    console.log(
      `[frame ${String(renderedFrames).padStart(5, '0')}/${displayTotal}] ` +
        `encoded ${String(encodedFrames).padStart(5, '0')} | ${pct}% | ${elapsed}s`,
    );
  },
});

const size = fs.statSync(outputLocation).size / (1024 * 1024);
console.log('==============================================');
console.log(`DONE: ${outputLocation} (${size.toFixed(1)} MB)`);
console.log('==============================================');
