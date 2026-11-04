import React from 'react';
import {
  COLORS,
  fontLabel,
  fontTitle,
  type Tone,
  toneColor,
} from '../lib/theme';
import {Arrow, Circle, Ellipse, Line, Path, Rect} from '../lib/rough';

export const Text: React.FC<{
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  font?: 'title' | 'label';
  tone?: Tone;
  color?: string;
  align?: 'left' | 'center' | 'right';
  width?: number;
  rotate?: number;
  draw?: number;
  mode?: 'wipe' | 'pop';
  weight?: number;
  letterSpacing?: number;
  lineHeight?: number;
  opacity?: number;
  style?: React.CSSProperties;
}> = ({
  x,
  y,
  children,
  size = 38,
  font = 'label',
  tone = 'ink',
  color,
  align = 'left',
  width,
  rotate = 0,
  draw = 1,
  mode = 'wipe',
  weight,
  letterSpacing = 0.3,
  lineHeight = 1.1,
  opacity = 1,
  style,
}) => {
  const p = Math.max(0, Math.min(1, draw));
  const scale = mode === 'pop' ? 0.92 + 0.08 * p : 1;
  const isTopHeading =
    typeof children === 'string' &&
    children.trim().length > 8 &&
    y < 250 &&
    x >= 110 &&
    x <= 140 &&
    (size >= 60 || (y >= 190 && size <= 34));
  if (isTopHeading) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        fontFamily: font === 'title' ? fontTitle : fontLabel,
        fontSize: size,
        fontWeight: weight,
        color: color ?? toneColor(tone),
        textAlign: align,
        letterSpacing,
        lineHeight,
        transform: `translateY(${(1 - p) * (mode === 'pop' ? 10 : 5)}px) rotate(${rotate}deg) scale(${scale})`,
        transformOrigin: align === 'center' ? 'center top' : 'left top',
        opacity: opacity * Math.min(1, p * 2.4),
        clipPath:
          mode === 'wipe'
            ? `inset(-15% ${Math.max(0, 100 - p * 100)}% -15% -15%)`
            : undefined,
        whiteSpace: 'pre-line',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Eyebrow: React.FC<{
  x: number;
  y: number;
  children: React.ReactNode;
  draw?: number;
  tone?: Tone;
  align?: 'left' | 'center' | 'right';
  width?: number;
}> = ({x, y, children, draw = 1, tone = 'faint', align = 'left', width}) => (
  <Text
    x={x}
    y={y}
    size={24}
    tone={tone}
    draw={draw}
    align={align}
    width={width}
    letterSpacing={4}
    style={{textTransform: 'uppercase', fontFamily: fontLabel}}
  >
    {children}
  </Text>
);

export const Underline: React.FC<{
  x: number;
  y: number;
  w: number;
  color?: string;
  draw?: number;
  seed?: number;
}> = ({x, y, w, color = COLORS.ink, draw = 1, seed = 4}) => (
  <Line
    x1={x}
    y1={y}
    x2={x + w}
    y2={y - 2}
    stroke={color}
    strokeWidth={3}
    draw={draw}
    seed={seed}
    roughness={1.7}
  />
);

export const Phone: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  draw?: number;
  screenFill?: string;
  stroke?: string;
  children?: React.ReactNode;
  seed?: number;
}> = ({
  x,
  y,
  w = 240,
  h = 480,
  draw = 1,
  screenFill = COLORS.screen,
  stroke = COLORS.ink,
  children,
  seed = 11,
}) => {
  const r = w * 0.14;
  const d = `M ${x + r} ${y} H ${x + w - r} Q ${x + w} ${y} ${x + w} ${y + r} V ${
    y + h - r
  } Q ${x + w} ${y + h} ${x + w - r} ${y + h} H ${x + r} Q ${x} ${y + h} ${x} ${
    y + h - r
  } V ${y + r} Q ${x} ${y} ${x + r} ${y} Z`;
  const inset = w * 0.045;
  const dScreen = `M ${x + r * 0.62} ${y + h * 0.09} H ${
    x + w - r * 0.62
  } V ${y + h - h * 0.075} H ${x + r * 0.62} Z`;
  return (
    <>
      <Path d={d} stroke={stroke} fill={COLORS.card} strokeWidth={3.4} draw={draw} seed={seed} />
      <Path
        d={dScreen}
        stroke={stroke}
        fill={screenFill}
        strokeWidth={2}
        draw={Math.max(0, (draw - 0.25) / 0.75)}
        seed={seed + 1}
      />
      <Line
        x1={x + w * 0.38}
        y1={y + h * 0.045}
        x2={x + w * 0.62}
        y2={y + h * 0.045}
        stroke={stroke}
        strokeWidth={4}
        draw={Math.max(0, (draw - 0.4) / 0.6)}
        seed={seed + 2}
      />
      <Line
        x1={x + w * 0.34}
        y1={y + h - h * 0.034}
        x2={x + w * 0.66}
        y2={y + h - h * 0.034}
        stroke={stroke}
        strokeWidth={4}
        draw={Math.max(0, (draw - 0.4) / 0.6)}
        seed={seed + 3}
      />
      {children}
    </>
  );
};

export const Bean: React.FC<{
  x: number;
  y: number;
  h?: number;
  draw?: number;
  fill?: string;
  stroke?: string;
  face?: 'neutral' | 'happy' | 'worried';
  arms?: 'none' | 'up' | 'out' | 'carry';
  seed?: number;
}> = ({
  x,
  y,
  h = 100,
  draw = 1,
  fill = COLORS.sand,
  stroke = COLORS.ink,
  face = 'neutral',
  arms = 'out',
  seed = 21,
}) => {
  const w = h * 0.62;
  const cy = y + h / 2;
  const eyeY = y + h * 0.40;
  const armY = y + h * 0.56;
  return (
    <>
      <Ellipse
        cx={x}
        cy={cy}
        w={w}
        h={h}
        fill={fill}
        stroke={stroke}
        strokeWidth={3.2}
        draw={draw}
        seed={seed}
      />
      {arms !== 'none' && (
        <>
          <Line
            x1={x - w * 0.36}
            y1={armY}
            x2={x - w * 0.8}
            y2={arms === 'up' ? armY - h * 0.26 : armY + h * 0.08}
            stroke={stroke}
            strokeWidth={3}
            draw={Math.max(0, (draw - 0.5) / 0.5)}
            seed={seed + 1}
          />
          <Line
            x1={x + w * 0.36}
            y1={armY}
            x2={x + w * 0.8}
            y2={arms === 'up' ? armY - h * 0.26 : armY + h * 0.08}
            stroke={stroke}
            strokeWidth={3}
            draw={Math.max(0, (draw - 0.5) / 0.5)}
            seed={seed + 2}
          />
        </>
      )}
      <Line
        x1={x - w * 0.2}
        y1={y + h * 0.82}
        x2={x - w * 0.24}
        y2={y + h * 0.98}
        stroke={stroke}
        strokeWidth={3}
        draw={Math.max(0, (draw - 0.6) / 0.4)}
        seed={seed + 3}
      />
      <Line
        x1={x + w * 0.2}
        y1={y + h * 0.82}
        x2={x + w * 0.24}
        y2={y + h * 0.98}
        stroke={stroke}
        strokeWidth={3}
        draw={Math.max(0, (draw - 0.6) / 0.4)}
        seed={seed + 4}
      />
      <Circle cx={x - w * 0.14} cy={eyeY} d={6.2} fill={COLORS.ink} stroke={COLORS.ink} strokeWidth={1} draw={draw} seed={seed + 5} />
      <Circle cx={x + w * 0.14} cy={eyeY} d={6.2} fill={COLORS.ink} stroke={COLORS.ink} strokeWidth={1} draw={draw} seed={seed + 6} />
      {face === 'neutral' && (
        <Path
          d={`M ${x - 7} ${eyeY + 17} Q ${x} ${eyeY + 21} ${x + 7} ${eyeY + 17}`}
          stroke={COLORS.ink}
          strokeWidth={2.6}
          draw={draw}
          seed={seed + 7}
        />
      )}
      {face === 'happy' && (
        <Path
          d={`M ${x - 9} ${eyeY + 14} Q ${x} ${eyeY + 25} ${x + 9} ${eyeY + 14}`}
          stroke={COLORS.ink}
          strokeWidth={2.6}
          draw={draw}
          seed={seed + 7}
        />
      )}
      {face === 'worried' && (
        <Path
          d={`M ${x - 8} ${eyeY + 22} Q ${x} ${eyeY + 14} ${x + 8} ${eyeY + 22}`}
          stroke={COLORS.ink}
          strokeWidth={2.6}
          draw={draw}
          seed={seed + 7}
        />
      )}
    </>
  );
};

export const Check: React.FC<{x: number; y: number; size?: number; color?: string; draw?: number}> = ({
  x,
  y,
  size = 26,
  color = COLORS.sage,
  draw = 1,
}) => (
  <Path
    d={`M ${x} ${y} L ${x + size * 0.38} ${y + size * 0.42} L ${x + size} ${y - size * 0.42}`}
    stroke={color}
    strokeWidth={5}
    draw={draw}
    seed={33}
    roughness={0.8}
  />
);

export const Cross: React.FC<{x: number; y: number; size?: number; color?: string; draw?: number}> = ({
  x,
  y,
  size = 26,
  color = COLORS.red,
  draw = 1,
}) => (
  <>
    <Line x1={x - size / 2} y1={y - size / 2} x2={x + size / 2} y2={y + size / 2} stroke={color} strokeWidth={4.5} draw={draw} seed={41} />
    <Line x1={x + size / 2} y1={y - size / 2} x2={x - size / 2} y2={y + size / 2} stroke={color} strokeWidth={4.5} draw={draw} seed={42} />
  </>
);

export const Notebook: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  draw?: number;
  label?: string;
  fill?: string;
  lines?: number;
  stroke?: string;
  seed?: number;
}> = ({x, y, w = 120, h = 150, draw = 1, label, fill = COLORS.card, lines = 4, stroke = COLORS.ink, seed = 51}) => (
  <>
    <Rect x={x} y={y} w={w} h={h} fill={fill} stroke={stroke} strokeWidth={3} draw={draw} seed={seed} />
    <Line x1={x + 14} y1={y} x2={x + 14} y2={y + h} stroke={stroke} strokeWidth={2.2} draw={draw} seed={seed + 1} />
    {Array.from({length: lines}).map((_, i) => (
      <Line
        key={i}
        x1={x + 26}
        y1={y + 26 + i * ((h - 44) / Math.max(1, lines - 1))}
        x2={x + w - 14}
        y2={y + 24 + i * ((h - 44) / Math.max(1, lines - 1))}
        stroke={stroke}
        strokeWidth={2}
        draw={Math.max(0, draw - 0.2 - i * 0.06)}
        seed={seed + 2 + i}
        opacity={0.7}
      />
    ))}
    {label && (
      <Text x={x + w / 2} y={y + h + 12} size={28} align="center" width={w + 200} draw={draw} style={{left: x - 100}}>
        {label}
      </Text>
    )}
  </>
);

export const Cloud: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  draw?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  seed?: number;
  children?: React.ReactNode;
}> = ({x, y, w = 300, h = 170, draw = 1, fill = COLORS.card, stroke = COLORS.ink, strokeWidth = 3.4, seed = 61, children}) => {
  const d = `M ${x + w * 0.16} ${y + h * 0.78}
    C ${x - w * 0.04} ${y + h * 0.78} ${x - w * 0.02} ${y + h * 0.48} ${x + w * 0.16} ${y + h * 0.46}
    C ${x + w * 0.13} ${y + h * 0.18} ${x + w * 0.42} ${y + h * 0.05} ${x + w * 0.55} ${y + h * 0.24}
    C ${x + w * 0.68} ${y + h * 0.06} ${x + w * 0.94} ${y + h * 0.15} ${x + w * 0.91} ${y + h * 0.43}
    C ${x + w * 1.06} ${y + h * 0.47} ${x + w * 1.04} ${y + h * 0.78} ${x + w * 0.9} ${y + h * 0.80}
    Z`;
  return (
    <>
      <Path d={d} fill={fill} stroke={stroke} strokeWidth={strokeWidth} draw={draw} seed={seed} />
      {children}
    </>
  );
};

export const Chip: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  sub?: string;
  draw?: number;
  tone?: Tone;
  fill?: string;
  seed?: number;
}> = ({x, y, w = 220, h = 140, label, sub, draw = 1, tone = 'ink', fill = COLORS.card, seed = 71}) => (
  <>
    <Rect x={x} y={y} w={w} h={h} fill={fill} stroke={toneColor(tone)} strokeWidth={3.2} draw={draw} seed={seed} />
    {Array.from({length: 4}).map((_, i) => (
      <React.Fragment key={i}>
        <Line x1={x + w * (0.2 + i * 0.2)} y1={y - 13} x2={x + w * (0.2 + i * 0.2)} y2={y} stroke={toneColor(tone)} strokeWidth={3} draw={draw} seed={seed + 1 + i} />
        <Line x1={x + w * (0.2 + i * 0.2)} y1={y + h} x2={x + w * (0.2 + i * 0.2)} y2={y + h + 13} stroke={toneColor(tone)} strokeWidth={3} draw={draw} seed={seed + 6 + i} />
      </React.Fragment>
    ))}
    <Text x={x} y={y + h * 0.28} size={44} align="center" width={w} draw={draw} color={toneColor(tone)}>
      {label}
    </Text>
    {sub && (
      <Text x={x} y={y + h * 0.62} size={26} align="center" width={w} draw={draw} opacity={0.8}>
        {sub}
      </Text>
    )}
  </>
);

export const Crayon: React.FC<{
  x: number;
  y: number;
  h?: number;
  color: string;
  draw?: number;
  seed?: number;
  label?: string;
}> = ({x, y, h = 150, color, draw = 1, seed = 81, label}) => {
  const w = 26;
  return (
    <>
      <Path
        d={`M ${x - w / 2} ${y} L ${x + w / 2} ${y} L ${x + w / 2} ${y + h - 30} L ${x} ${y + h} L ${x - w / 2} ${y + h - 30} Z`}
        fill={color}
        stroke={COLORS.ink}
        strokeWidth={2.6}
        draw={draw}
        seed={seed}
      />
      <Line x1={x - w / 2} y1={y + 14} x2={x + w / 2} y2={y + 14} stroke={COLORS.ink} strokeWidth={2.2} draw={draw} seed={seed + 1} />
      {label && (
        <Text x={x} y={y + h + 8} size={24} align="center" width={120} draw={draw} style={{left: x - 60}}>
          {label}
        </Text>
      )}
    </>
  );
};

export const Hat: React.FC<{x: number; y: number; w?: number; color?: string; draw?: number; kind?: 'top' | 'cap' | 'party'}> = ({
  x,
  y,
  w = 100,
  color = COLORS.red,
  draw = 1,
  kind = 'top',
}) => {
  if (kind === 'cap') {
    return (
      <>
        <Path d={`M ${x - w / 2} ${y + 20} Q ${x} ${y - 30} ${x + w / 2} ${y + 20} Z`} fill={color} stroke={COLORS.ink} strokeWidth={2.8} draw={draw} seed={91} />
        <Line x1={x + w * 0.18} y1={y + 18} x2={x + w * 0.7} y2={y + 28} stroke={COLORS.ink} strokeWidth={3} draw={draw} seed={92} />
      </>
    );
  }
  return (
    <>
      <Rect x={x - w * 0.3} y={y - 46} w={w * 0.6} h={48} fill={color} stroke={COLORS.ink} strokeWidth={2.8} draw={draw} seed={93} />
      <Line x1={x - w / 2} y1={y + 4} x2={x + w / 2} y2={y + 4} stroke={COLORS.ink} strokeWidth={4} draw={draw} seed={94} />
      <Line x1={x - w * 0.3} y1={y - 18} x2={x + w * 0.3} y2={y - 18} stroke={COLORS.ink} strokeWidth={2.2} draw={draw} seed={95} />
    </>
  );
};

export const Box: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  label?: string;
  draw?: number;
  fill?: string;
  tone?: Tone;
  seed?: number;
  strike?: number;
}> = ({x, y, w = 180, h = 120, label, draw = 1, fill = COLORS.card, tone = 'ink', seed = 101, strike = 0}) => (
  <>
    <Rect x={x} y={y} w={w} h={h} fill={fill} stroke={toneColor(tone)} strokeWidth={3.1} draw={draw} seed={seed} />
    {label && (
      <Text x={x} y={y + h / 2 - 21} size={32} align="center" width={w} draw={draw} tone={tone}>
        {label}
      </Text>
    )}
    {strike > 0 && (
      <Line x1={x + 10} y1={y + h * 0.82} x2={x + 10 + (w - 20) * strike} y2={y + h * 0.18} stroke={COLORS.red} strokeWidth={4} draw={strike} seed={seed + 1} />
    )}
  </>
);

export const Gear: React.FC<{x: number; y: number; r?: number; draw?: number; color?: string; teeth?: number}> = ({
  x,
  y,
  r = 46,
  draw = 1,
  color = COLORS.ink,
  teeth = 8,
}) => {
  const pts: [number, number][] = [];
  for (let i = 0; i < teeth * 2; i++) {
    const a = (i / (teeth * 2)) * Math.PI * 2;
    const rr = i % 2 === 0 ? r : r * 0.78;
    pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]);
  }
  return (
    <>
      <Path d={pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ') + ' Z'} stroke={color} strokeWidth={3} draw={draw} seed={111} />
      <Circle cx={x} cy={y} d={r * 0.55} stroke={color} strokeWidth={3} draw={draw} seed={112} />
    </>
  );
};

export const ArrowWithLabel: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
  color?: string;
  curve?: number;
  draw?: number;
  labelX?: number;
  labelY?: number;
  labelSize?: number;
  seed?: number;
}> = ({x1, y1, x2, y2, label, color = COLORS.ink, curve = 0, draw = 1, labelX, labelY, labelSize = 26, seed = 121}) => (
  <>
    <Arrow x1={x1} y1={y1} x2={x2} y2={y2} color={color} curve={curve} draw={draw} seed={seed} />
    {label && (
      <Text
        x={labelX ?? (x1 + x2) / 2 - 80}
        y={labelY ?? (y1 + y2) / 2 - 40}
        size={labelSize}
        align="center"
        width={160}
        draw={draw}
        color={color}
      >
        {label}
      </Text>
    )}
  </>
);
