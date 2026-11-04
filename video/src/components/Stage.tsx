import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, FPS, fontLabel, type Tone} from '../lib/theme';
import {Text} from './primitives';

export type SceneProps = {
  start: number;
  end: number;
};

export const useSceneTime = (start: number) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  // Scenes are rendered directly (not inside a Sequence), so current frame is
  // already the global frame. Return absolute seconds; cue helpers subtract the
  // scene start themselves.
  return frame / fps;
};

export const sceneDuration = (start: number, end: number) => end - start;

export const Stage: React.FC<{
  children: React.ReactNode;
  eyebrow?: string;
  eyebrowColor?: Tone;
  opacity?: number;
}> = ({children, eyebrow, eyebrowColor = 'faint', opacity = 1}) => (
  <AbsoluteFill
    style={{
      background: COLORS.paper,
      overflow: 'hidden',
      opacity,
    }}
  >
    {children}
  </AbsoluteFill>
);

/** Small hand-drawn chapter capsule used on trick cards. */
export const ChapterTag: React.FC<{
  x: number;
  y: number;
  number: string;
  label: string;
  draw?: number;
  tone?: Tone;
}> = ({x, y, number, label, draw = 1, tone = 'ink'}) => {
  const c = tone === 'ink' ? COLORS.ink : COLORS[tone];
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 74,
          height: 74,
          border: `3px solid ${c}`,
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: fontLabel,
          fontSize: 40,
          color: c,
          opacity: draw,
          transform: `rotate(${-2 + 2 * draw}deg) scale(${0.85 + 0.15 * draw})`,
        }}
      >
        {number}
      </div>
      <Text
        x={x + 94}
        y={y + 12}
        size={30}
        tone={tone}
        draw={draw}
        letterSpacing={3.5}
        style={{textTransform: 'uppercase'}}
      >
        {label}
      </Text>
    </>
  );
};

export const GroundLine: React.FC<{
  y?: number;
  x1?: number;
  x2?: number;
  draw?: number;
  tone?: Tone;
}> = ({y = 900, x1 = 120, x2 = 1800, draw = 1, tone = 'ink'}) => (
  <div
    style={{
      position: 'absolute',
      left: x1,
      top: y,
      width: (x2 - x1) * draw,
      height: 4,
      background: tone === 'ink' ? COLORS.ink : COLORS[tone],
      opacity: 0.9,
    }}
  />
);

export const useLocal = (start: number) => {
  const t = useSceneTime(start);
  return {
    t,
    p: (seconds: number, dur = 0.55) =>
      Math.max(0, Math.min(1, (t - seconds) / dur)),
    at: (seconds: number) => t - seconds,
  };
};
