import React from 'react';
import {COLORS, easeOut, progress} from '../lib/theme';
import {DotGrid, Line, Path} from '../lib/rough';
import {Text} from '../components/primitives';
import {Stage, useSceneTime, type SceneProps} from '../components/Stage';

export const Hero: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (sec: number, dur = 0.6) => progress(t, sec, dur, easeOut);

  const phoneDraw = p(0.15, 1.2);
  const grid = p(0.9, 1.2);
  const bigNumber = p(1.5, 0.7);
  const memory = p(4.88, 0.8);
  const memoryLabel = p(8.15, 0.7);

  return (
    <Stage eyebrow="Apple · on-device intelligence">
      {/* Phone */}
      <div style={{opacity: 0.7 + 0.3 * phoneDraw}}>
        <Path
          d="M 345 300 H 555 Q 580 300 580 325 V 745 Q 580 770 555 770 H 345 Q 320 770 320 745 V 325 Q 320 300 345 300 Z"
          fill={COLORS.card}
          stroke={COLORS.ink}
          strokeWidth={3.6}
          draw={phoneDraw}
          seed={201}
        />
        <Path
          d="M 344 338 H 556 V 726 H 344 Z"
          fill={COLORS.screen}
          stroke={COLORS.ink}
          strokeWidth={2.2}
          draw={Math.max(0, (phoneDraw - 0.35) / 0.65)}
          seed={202}
        />
        <Line x1={411} y1={314} x2={489} y2={314} stroke={COLORS.ink} strokeWidth={4} draw={phoneDraw} seed={203} />
        <Line x1={414} y1={752} x2={486} y2={752} stroke={COLORS.ink} strokeWidth={4} draw={phoneDraw} seed={204} />
        <DotGrid
          x={382}
          y={402}
          cols={6}
          rows={9}
          gap={27}
          r={3}
          color={COLORS.ink}
          progress={grid}
          opacity={0.72}
          seed={2}
        />
        <Text x={450} y={624} size={42} align="center" width={220} draw={p(2.2, 0.6)} style={{left: 340}}>
          3B
        </Text>
        <Text x={450} y={664} size={21} align="center" width={220} draw={p(2.35, 0.6)} style={{left: 340}}>
          parameters
        </Text>
      </div>

      {/* Giant callout */}
      <Text x={740} y={302} size={150} font="title" draw={bigNumber}>
        3 billion
      </Text>
      <Text x={750} y={446} size={48} draw={p(1.85, 0.6)}>
        parameters
      </Text>
      <Line
        x1={750}
        y1={510}
        x2={750 + 470 * p(2.0, 0.6)}
        y2={507}
        stroke={COLORS.ink}
        strokeWidth={2.8}
        draw={p(2.0, 0.6)}
        seed={211}
        opacity={0.55}
      />

      <Text x={750} y={548} size={62} draw={p(4.9, 0.7)} tone="ink">
        = 3,000,000,000
      </Text>
      <Text x={750} y={624} size={28} tone="faint" draw={p(5.35, 0.7)}>
        tiny numbers, one after another
      </Text>

      {/* memory bracket */}
      <div style={{opacity: memory}}>
        <Path
          d="M 300 266 V 250 H 356 M 544 250 H 600 V 266 M 600 804 V 820 H 544 M 356 820 H 300 V 804"
          stroke={COLORS.sage}
          strokeWidth={3.8}
          draw={memory}
          seed={221}
        />
        <Text x={450} y={846} size={34} align="center" width={360} draw={memoryLabel} color={COLORS.sage} style={{left: 270}}>
          phone memory
        </Text>
        <Text x={450} y={886} size={23} align="center" width={360} draw={p(8.5, 0.7)} tone="faint" style={{left: 270}}>
          the whole model lives here
        </Text>
      </div>
    </Stage>
  );
};
