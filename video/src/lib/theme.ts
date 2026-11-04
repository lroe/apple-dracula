import React from 'react';

export const W = 1920;
export const H = 1080;
export const FPS = 30;

/**
 * Dracula dark palette.
 *
 * paper      – canvas / background
 * card       – raised surfaces (diagram cards, phones, panels)
 * screen     – recessed surfaces (phone screens, chart wells)
 * sand       – Dracula "current line", used for highlights and active objects
 * sandDeep   – Dracula "comment", used for deeper fills
 * faint      – readable secondary text (never use "comment" for text)
 */
export const COLORS = {
  ink: '#F8F8F2',
  paper: '#282A36',
  card: '#313342',
  screen: '#1E1F29',
  red: '#FF5555',
  sage: '#50FA7B',
  sand: '#44475A',
  sandDeep: '#6272A4',
  faint: '#B8B9C5',
  purple: '#BD93F9',
  cyan: '#8BE9FD',
  orange: '#FFB86C',
  pink: '#FF79C6',
  yellow: '#F1FA8C',
};

export type Tone =
  | 'ink'
  | 'red'
  | 'sage'
  | 'sand'
  | 'faint'
  | 'purple'
  | 'cyan'
  | 'orange'
  | 'pink'
  | 'yellow';

export const toneColor = (tone: Tone = 'ink') => COLORS[tone];

export const fontTitle = '"Caveat", "Patrick Hand", cursive';
export const fontLabel = '"Patrick Hand", "Caveat", cursive';
export const fontMono = '"Patrick Hand", monospace';

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export const easeOut = (t: number) => 1 - Math.pow(1 - clamp01(t), 3);
export const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Progress 0..1 for a reveal that starts at `start` seconds and lasts `dur`. */
export const progress = (
  localSeconds: number,
  start: number,
  dur = 0.55,
  ease: (t: number) => number = easeOut,
) => ease(clamp01((localSeconds - start) / Math.max(0.001, dur)));

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export const CueContext = React.createContext<{
  sceneStart: number;
  sceneEnd: number;
}>({sceneStart: 0, sceneEnd: 0});
