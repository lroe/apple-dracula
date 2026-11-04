import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';

const test = process.argv.includes('--test');
const TEST_FRAMES = 12;

// 1920 x 1080 -> 2560 x 1440 (true 16:9 2K).
const SCALE = 4 / 3;

const concurrency = Math.max(
  1,
  Number(process.env.CONCURRENCY || Math.min(2, os.cpus().length)),
);
const crf = Number(process.env.CRF || 18);
const x264Preset = process.env.X264_PRESET || 'veryfast';
const imageFormat = process.env.IMAGE_FORMAT === 'png' ? 'png' : 'jpeg';
const jpegQuality = Number(process.env.JPEG_QUALITY || 95);
const progressIntervalMs = Number(
  process.env.PROGRESS_INTERVAL_MS || 3000,
);
const browserExecutable =
  process.env.BROWSER_EXECUTABLE ||
  (fs.existsSync('/usr/bin/google-chrome') ? '/usr/bin/google-chrome' : undefined);

const outDir = path.resolve('out');
const outputLocation = path.join(
  outDir,
  test ? 'test-2k.mp4' : 'apple-explainer-2k.mp4',
);
fs.mkdirSync(outDir, {recursive: true});

const formatDuration = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '--:--:--';
  const s = Math.round(seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return [h, m, sec].map((v) => String(v).padStart(2, '0')).join(':');
};

const write = (line) => process.stdout.write(`${line}\n`);

write('==============================================');
write(`Remotion 2K render${test ? ' (TEST)' : ''}`);
write(`Started      : ${new Date().toISOString()}`);
write('==============================================');

const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const composition = await selectComposition({
  serveUrl,
  id: 'AppleExplainer',
  browserExecutable,
});

const displayTotal = test
  ? Math.min(TEST_FRAMES, composition.durationInFrames)
  : composition.durationInFrames;

const outputWidth = Math.round(composition.width * SCALE);
const outputHeight = Math.round(composition.height * SCALE);

write(`Composition  : ${composition.id}`);
write(`Frames       : ${displayTotal}`);
write(`Output       : ${outputLocation}`);
write(`Resolution   : ${outputWidth} x ${outputHeight}`);
write(`Concurrency  : ${concurrency}`);
write(`x264 preset  : ${x264Preset}`);
write(`CRF          : ${crf}`);
write(`Frame format : ${imageFormat}`);
write('==============================================');

let lastRendered = -1;
let lastEncoded = -1;
let lastPrintedAt = 0;
const startedAt = Date.now();

const printProgress = (renderedFrames, encodedFrames, force = false) => {
  const now = Date.now();
  if (!force && now - lastPrintedAt < progressIntervalMs) return;
  lastPrintedAt = now;

  const elapsed = (now - startedAt) / 1000;
  const pct = displayTotal > 0 ? (renderedFrames / displayTotal) * 100 : 0;
  const fps = elapsed > 0 ? renderedFrames / elapsed : 0;
  const remaining = Math.max(0, displayTotal - renderedFrames);
  const eta = fps > 0 ? remaining / fps : NaN;

  write(
    `[${formatDuration(elapsed)}] ${pct.toFixed(2).padStart(6, ' ')}% | ` +
      `frames ${renderedFrames}/${displayTotal} | encoded ${encodedFrames} | ` +
      `${fps.toFixed(2)} fps | ETA ${formatDuration(eta)}`,
  );
};

try {
  await renderMedia({
    composition,
    serveUrl,
    outputLocation,
    codec: 'h264',
    crf,
    pixelFormat: 'yuv420p',
    audioCodec: 'aac',
    audioBitrate: '320k',
    scale: SCALE,
    concurrency,
    x264Preset,
    imageFormat,
    jpegQuality,
    chromiumOptions: {gl: 'swangle'},
    browserExecutable,
    timeoutInMilliseconds: 600000,
    frameRange: test ? [0, displayTotal - 1] : undefined,
    overwrite: true,
    logLevel: 'error',
    onProgress: ({renderedFrames, encodedFrames}) => {
      if (
        renderedFrames === lastRendered &&
        encodedFrames === lastEncoded
      ) {
        return;
      }
      lastRendered = renderedFrames;
      lastEncoded = encodedFrames;
      printProgress(
        renderedFrames,
        encodedFrames,
        renderedFrames === displayTotal,
      );
    },
  });

  printProgress(displayTotal, displayTotal, true);
  const sizeMb = fs.statSync(outputLocation).size / (1024 * 1024);
  write('==============================================');
  write(`DONE: ${outputLocation} (${sizeMb.toFixed(1)} MB)`);
  write(`Total time: ${formatDuration((Date.now() - startedAt) / 1000)}`);
  write('==============================================');
} catch (error) {
  write('==============================================');
  write('RENDER FAILED');
  write(error instanceof Error ? error.stack ?? error.message : String(error));
  write('==============================================');
  process.exitCode = 1;
}
