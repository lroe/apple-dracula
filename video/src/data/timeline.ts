import React from 'react';
import type {SceneProps} from '../components/Stage';
import {Hero} from '../scenes/Hero';
import {
  Decisions,
  HowQuestion,
  NoSlow,
  Sharing,
  ThreeJobs,
  Tokens,
  TwoWalls,
} from '../scenes/Intro';
import {Chef, OtherMemory, PhoneLimits, Space, Speed, WallsRecap} from '../scenes/Space';
import {
  Bits,
  Catch,
  Crayons,
  CrayonTest,
  DecoderEmbed,
  DevLesson,
  LookupTable,
  MixedBits,
  PaintByNumber,
  QATLoop,
  RunNumbers,
  Sensitivity,
  Trick1,
} from '../scenes/Quantize';
import {
  AdapterConcept,
  Building,
  CacheGrows,
  CacheLesson,
  KV,
  LoRA,
  ManyFeatures,
  SwapAdapters,
  Trick2,
  Trick3,
} from '../scenes/Cache';
import {
  Encryption,
  Hardware,
  Layouts,
  MoE,
  MovingBoxes,
  PCC,
  PhoneVsCloud,
  Trick4,
  Trick5,
  TwoGears,
} from '../scenes/Hardware';
import {
  Hospital,
  Library,
  New2026,
  Nvidia,
  Sparse,
  Storage,
  TwentyB,
  ZoomOut,
} from '../scenes/Modern';
import {SixThings, WrapUp} from '../scenes/Outro';

export type SceneDef = {
  id: string;
  start: number;
  end: number;
  component: React.FC<SceneProps>;
  title: string;
};

export const DURATION_SECONDS = 732.16;

export const SCENES: SceneDef[] = [
  {id: 'hero', start: 0, end: 9.6, component: Hero, title: 'A model in your pocket'},
  {id: 'three-jobs', start: 9.6, end: 14.88, component: ThreeJobs, title: 'One model, three jobs'},
  {id: 'sharing', start: 14.88, end: 20.34, component: Sharing, title: 'Everything shares it'},
  {id: 'no-slow', start: 20.34, end: 26.3, component: NoSlow, title: 'No slowdown, no heat'},
  {id: 'how', start: 26.3, end: 29.08, component: HowQuestion, title: 'How?'},
  {id: 'decisions', start: 29.08, end: 41.62, component: Decisions, title: 'A pile of small decisions'},
  {id: 'tokens', start: 41.62, end: 57.62, component: Tokens, title: 'Tokens, not words'},
  {id: 'two-walls', start: 57.62, end: 60.12, component: TwoWalls, title: 'Two walls'},
  {id: 'space', start: 60.12, end: 68.76, component: Space, title: 'Wall one: space'},
  {id: 'other-memory', start: 68.76, end: 80.7, component: OtherMemory, title: 'And everything else'},
  {id: 'speed', start: 80.7, end: 91.94, component: Speed, title: 'Wall two: speed'},
  {id: 'chef', start: 91.94, end: 100.06, component: Chef, title: 'The chef and the helper'},
  {id: 'phone-limits', start: 100.06, end: 109.9, component: PhoneLimits, title: 'The rest of the phone'},
  {id: 'walls-recap', start: 109.9, end: 118.14, component: WallsRecap, title: 'Every trick goes after one'},
  {id: 'trick1', start: 118.14, end: 127.9, component: Trick1, title: 'Trick 1: smaller numbers'},
  {id: 'crayons', start: 127.9, end: 145.44, component: Crayons, title: 'A thousand shades'},
  {id: 'paint', start: 145.44, end: 167.02, component: PaintByNumber, title: 'Paint by numbers'},
  {id: 'lookup', start: 167.02, end: 180.18, component: LookupTable, title: 'A tiny lookup table'},
  {id: 'bits', start: 180.18, end: 195.22, component: Bits, title: 'How short is a note?'},
  {id: 'mixed', start: 195.22, end: 205.18, component: MixedBits, title: 'Mixed sizes'},
  {id: 'run-numbers', start: 205.18, end: 221.16, component: RunNumbers, title: 'Run the numbers'},
  {id: 'sensitivity', start: 221.16, end: 238.94, component: Sensitivity, title: 'Not every part is equal'},
  {id: 'decoder-embed', start: 238.94, end: 260.48, component: DecoderEmbed, title: 'Two parts, two sizes'},
  {id: 'catch', start: 260.48, end: 275.78, component: Catch, title: 'The catch'},
  {id: 'qat', start: 275.78, end: 294.74, component: QATLoop, title: 'Squeeze while learning'},
  {id: 'crayon-test', start: 294.74, end: 307.48, component: CrayonTest, title: 'The four-crayon test'},
  {id: 'dev-lesson', start: 307.48, end: 314.98, component: DevLesson, title: 'Train for the size'},
  {id: 'trick2', start: 314.98, end: 321.22, component: Trick2, title: 'Trick 2: no repeated homework'},
  {id: 'kv', start: 321.22, end: 340.22, component: KV, title: 'Look it up, do not redo it'},
  {id: 'cache-grows', start: 340.22, end: 362.52, component: CacheGrows, title: 'The notebook grows'},
  {id: 'building', start: 362.52, end: 387.6, component: Building, title: 'Eight floors, five notebooks'},
  {id: 'cache-lesson', start: 387.6, end: 394.4, component: CacheLesson, title: 'Do not forget the cache'},
  {id: 'trick3', start: 394.4, end: 397.26, component: Trick3, title: 'Trick 3: one brain, many hats'},
  {id: 'many-features', start: 397.26, end: 416.7, component: ManyFeatures, title: 'One phone, many features'},
  {id: 'adapters', start: 416.7, end: 432.72, component: AdapterConcept, title: 'One actor, many hats'},
  {id: 'lora', start: 432.72, end: 443.08, component: LoRA, title: 'Freeze the base'},
  {id: 'swap', start: 443.08, end: 455.68, component: SwapAdapters, title: 'One base, swap the hats'},
  {id: 'trick4', start: 455.68, end: 457.96, component: Trick4, title: 'Trick 4: keep the chips happy'},
  {id: 'hardware', start: 457.96, end: 477.1, component: Hardware, title: 'Three chips, one plan'},
  {id: 'layouts', start: 477.1, end: 485.14, component: Layouts, title: 'Split it, do not copy it'},
  {id: 'moving-boxes', start: 485.14, end: 499.12, component: MovingBoxes, title: 'Moving boxes'},
  {id: 'trick5', start: 499.12, end: 501.86, component: Trick5, title: 'Trick 5: know when to ask for help'},
  {id: 'phone-cloud', start: 501.86, end: 521.0, component: PhoneVsCloud, title: 'Phone first, cloud second'},
  {id: 'pcc', start: 521.0, end: 529.0, component: PCC, title: 'A protected space'},
  {id: 'encryption', start: 529.0, end: 542.54, component: Encryption, title: 'Locked all the way there'},
  {id: 'moe', start: 542.54, end: 558.14, component: MoE, title: 'Many experts, a few awake'},
  {id: 'two-gears', start: 558.14, end: 563.26, component: TwoGears, title: 'Two gears'},
  {id: 'new-2026', start: 563.26, end: 576.98, component: New2026, title: 'New in 2026'},
  {id: 'sparse', start: 576.98, end: 596.0, component: Sparse, title: 'Dense vs sparse'},
  {id: 'hospital', start: 596.0, end: 601.36, component: Hospital, title: 'A hospital of experts'},
  {id: 'twenty-b', start: 601.36, end: 614.48, component: TwentyB, title: 'Big model, small bill'},
  {id: 'storage', start: 614.48, end: 626.5, component: Storage, title: 'Load only what you need'},
  {id: 'library', start: 626.5, end: 632.1, component: Library, title: 'The basement library'},
  {id: 'nvidia', start: 632.1, end: 639.3, component: Nvidia, title: 'Google Cloud joins in'},
  {id: 'zoom-out', start: 639.3, end: 658.8, component: ZoomOut, title: 'Match power to the job'},
  {id: 'six-things', start: 658.8, end: 704.48, component: SixThings, title: 'Six things to remember'},
  {id: 'wrap-up', start: 704.48, end: 732.16, component: WrapUp, title: 'Look for waste'},
];
