import React from 'react';
import {COLORS, fontTitle, progress, type Tone, toneColor} from '../lib/theme';
import {Text} from './primitives';
import {Stage, useSceneTime} from './Stage';

export const ChapterCard: React.FC<{
  start: number;
  number: string;
  title: string;
  subtitle: string;
  tone?: Tone;
  eyebrow?: string;
  children?: React.ReactNode;
}> = ({start, number, title, subtitle, tone = 'red', eyebrow = 'Chapter', children}) => {
  const t = useSceneTime(start);
  const p = (offset: number, dur = 0.5) => {
    const cue = start + offset;
    return progress(t, offset <= 0.9 ? cue - 1.0 : cue, dur);
  };
  return (
    <Stage eyebrow={eyebrow}>
      <Text x={160} y={286} size={210} font="title" tone={tone} draw={p(0.05, 0.6)}>
        {number}
      </Text>
      <Text x={470} y={230} size={104} draw={p(0.4, 0.6)} width={900}>
        {title}
      </Text>
      <div style={{position: 'absolute', left: 0, top: 0}}>{children}</div>
    </Stage>
  );
};

export const ChapterTitle: React.FC<{
  title: string;
  subtitle?: string;
  draw?: number;
  x?: number;
  y?: number;
  size?: number;
}> = ({title, subtitle, draw = 1, x = 120, y = 128, size = 76}) => (
  <>
    <Text x={x} y={y} size={size} draw={draw}>
      {title}
    </Text>
    {subtitle && (
      <Text x={x + 4} y={y + 94} size={28} tone="faint" draw={draw}>
        {subtitle}
      </Text>
    )}
  </>
);

export const NumberBadge: React.FC<{x: number; y: number; n: string; draw?: number; tone?: Tone}> = ({
  x,
  y,
  n,
  draw = 1,
  tone = 'red',
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 68,
      height: 68,
      borderRadius: 8,
      border: `3px solid ${toneColor(tone)}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: fontTitle,
      fontSize: 40,
      color: toneColor(tone),
      transform: `rotate(${-2 + 2 * draw}deg) scale(${0.85 + 0.15 * draw})`,
      opacity: draw,
    }}
  >
    {n}
  </div>
);
