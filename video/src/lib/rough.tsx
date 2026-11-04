import React, {useMemo} from 'react';
import rough from 'roughjs';
import type {Options} from 'roughjs/bin/core';
import {COLORS, toneColor, type Tone} from './theme';

const gen = rough.generator();

type ShapeKind =
  | {kind: 'line'; x1: number; y1: number; x2: number; y2: number}
  | {kind: 'rect'; x: number; y: number; w: number; h: number}
  | {kind: 'circle'; cx: number; cy: number; d: number}
  | {kind: 'ellipse'; cx: number; cy: number; w: number; h: number}
  | {kind: 'path'; d: string}
  | {kind: 'polygon'; points: [number, number][]};

export type SketchProps = {
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  fillStyle?: 'solid' | 'hachure' | 'cross-hatch' | 'zigzag' | 'dots' | 'dashed';
  hachureGap?: number;
  roughness?: number;
  bowing?: number;
  seed?: number;
  dash?: number[];
  opacity?: number;
  draw?: number;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
};

const usePaths = (
  kind: ShapeKind,
  opts: Options,
) =>
  useMemo(() => {
    let drawable;
    switch (kind.kind) {
      case 'line':
        drawable = gen.line(kind.x1, kind.y1, kind.x2, kind.y2, opts);
        break;
      case 'rect':
        drawable = gen.rectangle(kind.x, kind.y, kind.w, kind.h, opts);
        break;
      case 'circle':
        drawable = gen.circle(kind.cx, kind.cy, kind.d, opts);
        break;
      case 'ellipse':
        drawable = gen.ellipse(kind.cx, kind.cy, kind.w, kind.h, opts);
        break;
      case 'path':
        drawable = gen.path(kind.d, opts);
        break;
      case 'polygon':
        drawable = gen.polygon(kind.points, opts);
        break;
    }
    return gen.toPaths(drawable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(kind), JSON.stringify(opts)]);

export const SketchNode: React.FC<{
  shape: ShapeKind;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  fillStyle?: SketchProps['fillStyle'];
  hachureGap?: number;
  roughness?: number;
  bowing?: number;
  seed?: number;
  dash?: number[];
  opacity?: number;
  draw?: number;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}> = ({
  shape,
  stroke = COLORS.ink,
  fill,
  strokeWidth = 3.2,
  fillStyle = 'solid',
  hachureGap = 9,
  roughness = 1.35,
  bowing = 1.15,
  seed = 7,
  dash,
  opacity = 1,
  draw = 1,
  style,
  className,
  children,
}) => {
  const paths = usePaths(shape, {
    stroke,
    strokeWidth,
    fill,
    fillStyle,
    hachureGap,
    fillWeight: 1.2,
    roughness,
    bowing,
    seed,
    preserveVertices: true,
    strokeLineDash: dash,
    maxRandomnessOffset: 2.2,
  });
  const p = Math.max(0, Math.min(1, draw));
  const bbox = useMemo(() => {
    switch (shape.kind) {
      case 'line':
        return {
          x: Math.min(shape.x1, shape.x2) - 30,
          y: Math.min(shape.y1, shape.y2) - 30,
          w: Math.abs(shape.x2 - shape.x1) + 60,
          h: Math.abs(shape.y2 - shape.y1) + 60,
        };
      case 'rect':
        return {x: shape.x - 30, y: shape.y - 30, w: shape.w + 60, h: shape.h + 60};
      case 'circle':
        return {
          x: shape.cx - shape.d / 2 - 30,
          y: shape.cy - shape.d / 2 - 30,
          w: shape.d + 60,
          h: shape.d + 60,
        };
      case 'ellipse':
        return {
          x: shape.cx - shape.w / 2 - 30,
          y: shape.cy - shape.h / 2 - 30,
          w: shape.w + 60,
          h: shape.h + 60,
        };
      case 'polygon': {
        const xs = shape.points.map((pt) => pt[0]);
        const ys = shape.points.map((pt) => pt[1]);
        return {
          x: Math.min(...xs) - 30,
          y: Math.min(...ys) - 30,
          w: Math.max(...xs) - Math.min(...xs) + 60,
          h: Math.max(...ys) - Math.min(...ys) + 60,
        };
      }
      case 'path':
      default:
        return {x: 0, y: 0, w: 1920, h: 1080};
    }
  }, [shape]);

  return (
    <svg
      className={className}
      viewBox={`${bbox.x} ${bbox.y} ${bbox.w} ${bbox.h}`}
      style={{
        position: 'absolute',
        left: bbox.x,
        top: bbox.y,
        width: bbox.w,
        height: bbox.h,
        overflow: 'visible',
        opacity,
        clipPath: `inset(-20% ${100 - p * 100}% -20% -20%)`,
        ...style,
      }}
    >
      {paths.map((path, i) => (
        <path
          key={i}
          d={path.d}
          stroke={path.stroke ?? 'none'}
          strokeWidth={path.strokeWidth}
          fill={path.fill ?? 'none'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {children}
    </svg>
  );
};

export const Line = (p: Omit<Extract<ShapeKind, {kind: 'line'}>, 'kind'> & SketchProps) => (
  <SketchNode
    shape={{kind: 'line', x1: p.x1, y1: p.y1, x2: p.x2, y2: p.y2}}
    stroke={p.stroke}
    strokeWidth={p.strokeWidth}
    dash={p.dash}
    roughness={p.roughness}
    bowing={p.bowing}
    seed={p.seed}
    draw={p.draw}
    opacity={p.opacity}
  />
);

export const Rect = (
  p: Omit<Extract<ShapeKind, {kind: 'rect'}>, 'kind'> & SketchProps,
) => (
  <SketchNode
    shape={{kind: 'rect', x: p.x, y: p.y, w: p.w, h: p.h}}
    stroke={p.stroke}
    fill={p.fill}
    fillStyle={p.fillStyle}
    hachureGap={p.hachureGap}
    strokeWidth={p.strokeWidth}
    roughness={p.roughness}
    bowing={p.bowing}
    seed={p.seed}
    draw={p.draw}
    opacity={p.opacity}
    dash={p.dash}
  />
);

export const Circle = (
  p: Omit<Extract<ShapeKind, {kind: 'circle'}>, 'kind'> & SketchProps,
) => (
  <SketchNode
    shape={{kind: 'circle', cx: p.cx, cy: p.cy, d: p.d}}
    stroke={p.stroke}
    fill={p.fill}
    fillStyle={p.fillStyle}
    strokeWidth={p.strokeWidth}
    roughness={p.roughness}
    bowing={p.bowing}
    seed={p.seed}
    draw={p.draw}
    opacity={p.opacity}
  />
);

export const Ellipse = (
  p: Omit<Extract<ShapeKind, {kind: 'ellipse'}>, 'kind'> & SketchProps,
) => (
  <SketchNode
    shape={{kind: 'ellipse', cx: p.cx, cy: p.cy, w: p.w, h: p.h}}
    stroke={p.stroke}
    fill={p.fill}
    fillStyle={p.fillStyle}
    strokeWidth={p.strokeWidth}
    roughness={p.roughness}
    bowing={p.bowing}
    seed={p.seed}
    draw={p.draw}
    opacity={p.opacity}
    dash={p.dash}
  />
);

export const Path = (
  p: Omit<Extract<ShapeKind, {kind: 'path'}>, 'kind'> & SketchProps,
) => (
  <SketchNode
    shape={{kind: 'path', d: p.d}}
    stroke={p.stroke}
    fill={p.fill}
    fillStyle={p.fillStyle}
    strokeWidth={p.strokeWidth}
    roughness={p.roughness}
    bowing={p.bowing}
    seed={p.seed}
    draw={p.draw}
    opacity={p.opacity}
    dash={p.dash}
  />
);

/** An arrow whose tip lands exactly on (x2,y2). */
export const Arrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  width?: number;
  head?: number;
  curve?: number;
  draw?: number;
  dash?: number[];
  seed?: number;
  opacity?: number;
}> = ({
  x1,
  y1,
  x2,
  y2,
  color = toneColor('ink'),
  width = 3,
  head = 18,
  curve = 0,
  draw = 1,
  dash,
  seed = 12,
  opacity = 1,
}) => {
  // Unit direction at the tip (handles a quadratic bend).
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.max(0.001, Math.hypot(dx, dy));
  const nx = -dy / len;
  const ny = dx / len;
  const cx = mx + nx * curve;
  const cy = my + ny * curve;
  const tx = x2 - cx;
  const ty = y2 - cy;
  const tlen = Math.max(0.001, Math.hypot(tx, ty));
  const ux = tx / tlen;
  const uy = ty / tlen;
  const ang = Math.atan2(uy, ux);
  const spread = 0.48;
  const hx1 = x2 - head * Math.cos(ang - spread);
  const hy1 = y2 - head * Math.sin(ang - spread);
  const hx2 = x2 - head * Math.cos(ang + spread);
  const hy2 = y2 - head * Math.sin(ang + spread);
  const pathD =
    Math.abs(curve) < 0.5
      ? `M ${x1} ${y1} L ${x2} ${y2}`
      : `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  const headD = `M ${hx1} ${hy1} L ${x2} ${y2} L ${hx2} ${hy2}`;
  return (
    <>
      <Path
        d={pathD}
        stroke={color}
        strokeWidth={width}
        draw={draw}
        dash={dash}
        seed={seed}
        roughness={0.9}
        bowing={0.6}
        opacity={opacity}
      />
      <Path
        d={headD}
        stroke={color}
        strokeWidth={width}
        draw={Math.max(0, (draw - 0.55) / 0.45)}
        seed={seed + 2}
        roughness={0.55}
        bowing={0}
        opacity={opacity}
      />
    </>
  );
};

export const DotGrid: React.FC<{
  x: number;
  y: number;
  cols: number;
  rows: number;
  gap: number;
  r?: number;
  color?: string;
  fill?: string;
  opacity?: number;
  progress?: number;
  jitter?: number;
  seed?: number;
}> = ({
  x,
  y,
  cols,
  rows,
  gap,
  r = 4,
  color = COLORS.ink,
  fill,
  opacity = 1,
  progress = 1,
  jitter = 0.7,
  seed = 3,
}) => {
  const dots: React.ReactElement[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const idx = row * cols + col;
      const threshold = (idx + 1) / (cols * rows);
      if (threshold > progress + 0.001) continue;
      const jx = Math.sin((idx + seed) * 12.9898) * jitter;
      const jy = Math.cos((idx + seed) * 78.233) * jitter;
      dots.push(
        <circle
          key={idx}
          cx={x + col * gap + jx}
          cy={y + row * gap + jy}
          r={r}
          fill={fill ?? color}
          stroke="none"
          opacity={0.92}
        />,
      );
    }
  }
  return (
    <svg
      width={1920}
      height={1080}
      style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}
      opacity={opacity}
    >
      {dots}
    </svg>
  );
};
