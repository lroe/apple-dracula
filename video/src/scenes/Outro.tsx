import React from 'react';
import {COLORS, easeOut, progress} from '../lib/theme';
import {Arrow, Circle, Line, Path, Rect} from '../lib/rough';
import {Bean, Check, Chip, Cloud, Cross, Hat, Notebook, Phone, Text} from '../components/primitives';
import {GroundLine, Stage, useSceneTime, type SceneProps} from '../components/Stage';

const pF = (t: number, start: number, cue: number, dur = 0.55) =>
  progress(t, cue <= start + 1.6 ? cue - 1.6 : cue, dur, easeOut);

const Magnifier: React.FC<{x: number; y: number; r?: number; draw?: number; color?: string; angle?: number}> = ({
  x,
  y,
  r = 90,
  draw = 1,
  color = COLORS.ink,
  angle = 0.8,
}) => (
  <>
    <Circle cx={x} cy={y} d={r * 2} stroke={color} strokeWidth={4} draw={draw} seed={7001} />
    <Line
      x1={x + Math.cos(angle) * r * 1.02}
      y1={y + Math.sin(angle) * r * 1.02}
      x2={x + Math.cos(angle) * r * 1.65}
      y2={y + Math.sin(angle) * r * 1.65}
      stroke={color}
      strokeWidth={8}
      draw={draw}
      seed={7002}
    />
  </>
);

/* ------------------------------------------------------------------ */
export const SixThings: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  const cards = [
    {n: '01', title: 'Know your two walls', sub: 'size + speed', cue: 663.2, icon: 'walls'},
    {n: '02', title: 'Compress carefully', sub: 'bits where it matters', cue: 669.5, icon: 'bits'},
    {n: '03', title: 'Watch the cache', sub: 'long inputs', cue: 677.2, icon: 'cache'},
    {n: '04', title: 'Share the base', sub: 'swap the hats', cue: 683.2, icon: 'hat'},
    {n: '05', title: 'Match the hardware', sub: 'layouts + copies', cue: 689.0, icon: 'chip'},
    {n: '06', title: 'Plan a fallback', sub: 'local first', cue: 696.7, icon: 'cloud'},
  ];

  let active = -1;
  cards.forEach((c, i) => {
    if (t >= c.cue) active = i;
  });

  return (
    <Stage eyebrow="Takeaways">
      <Text x={120} y={120} size={72} draw={p(658.8)}>
        Six things to remember
      </Text>

      {cards.map((c, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 160 + col * 530;
        const y = 270 + row * 330;
        const d = p(c.cue);
        const isActive = active === i;
        return (
          <React.Fragment key={c.n}>
            <Rect x={x} y={y} w={480} h={270} fill={COLORS.card} stroke={isActive ? COLORS.sage : COLORS.ink} strokeWidth={isActive ? 4 : 2.6} draw={p(659.0 + i * 0.04)} seed={7100 + i} opacity={d > 0 ? 1 : 0.35} />
            <Text x={x + 26} y={y + 18} size={30} tone={isActive ? 'sage' : 'faint'} draw={p(659.0 + i * 0.04)}>
              {c.n}
            </Text>
            <Text x={x + 26} y={y + 62} size={36} draw={d} width={370}>
              {c.title}
            </Text>
            <Text x={x + 26} y={y + 128} size={24} tone="faint" draw={p(c.cue + 0.15)} width={360}>
              {c.sub}
            </Text>
            <div style={{opacity: d}}>
              {c.icon === 'walls' && (
                <>
                  <Rect x={x + 330} y={y + 178} w={50} h={50} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2} draw={d} seed={7110 + i} />
                  <Rect x={x + 390} y={y + 178} w={50} h={50} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2} draw={d} seed={7111 + i} />
                  <Line x1={x + 330} y1={y + 202} x2={x + 380} y2={y + 202} stroke={COLORS.ink} strokeWidth={1.6} draw={d} seed={7112 + i} />
                  <Line x1={x + 390} y1={y + 202} x2={x + 440} y2={y + 202} stroke={COLORS.ink} strokeWidth={1.6} draw={d} seed={7113 + i} />
                </>
              )}
              {c.icon === 'bits' && (
                <>
                  <Rect x={x + 330} y={y + 178} w={44} h={50} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={2} draw={d} seed={7120 + i} />
                  <Rect x={x + 384} y={y + 178} w={44} h={50} fill={COLORS.sage} stroke={COLORS.ink} strokeWidth={2} draw={d} seed={7121 + i} />
                  <Text x={x + 330} y={y + 190} size={24} align="center" width={44} draw={d} style={{left: x + 330}}>
                    16
                  </Text>
                  <Text x={x + 384} y={y + 190} size={24} align="center" width={44} draw={d} color={COLORS.paper} style={{left: x + 384}}>
                    2
                  </Text>
                </>
              )}
              {c.icon === 'cache' && <Notebook x={x + 340} y={y + 166} w={70} h={82} draw={d} lines={3} seed={7130 + i} />}
              {c.icon === 'hat' && <Hat x={x + 390} y={y + 218} w={80} color={COLORS.red} draw={d} />}
              {c.icon === 'chip' && <Chip x={x + 320} y={y + 150} w={120} h={82} label="NE" draw={d} seed={7140 + i} />}
              {c.icon === 'cloud' && <Cloud x={x + 310} y={y + 156} w={150} h={88} draw={d} seed={7150 + i} />}
            </div>
          </React.Fragment>
        );
      })}
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const WrapUp: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);
  const final = p(724.1, 0.9);
  const magnifier = p(710.9, 0.8);

  const cuts = [
    {label: 'smaller weights', cue: 714.7},
    {label: 'slimmer cache', cue: 716.0},
    {label: 'shared base + light adapters', cue: 717.2},
    {label: 'hardware-aware code', cue: 719.1},
    {label: 'safe cloud path', cue: 721.0},
  ];

  return (
    <Stage eyebrow="The takeaway">
      <div style={{opacity: 1 - final}}>
        <Text x={120} y={128} size={74} draw={p(704.6)}>
          No big secret
        </Text>
        <Text x={124} y={220} size={28} tone="faint" draw={p(704.8)}>
          just waste, cut away
        </Text>

        <Phone x={220} y={300} w={340} h={560} draw={p(704.9)} screenFill={COLORS.screen} />
        <Circle cx={440} cy={520} d={90} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={2.6} draw={p(705.0)} seed={7201} />
        <Text x={440} y={506} size={30} align="center" width={90} draw={p(705.1)} style={{left: 395}}>
          lean
        </Text>

        <Magnifier x={640} y={480} r={92} draw={magnifier} color={COLORS.red} />
        <Text x={620} y={646} size={28} tone="red" draw={p(711.2)}>
          spot the waste
        </Text>

        <Rect x={980} y={300} w={400} h={110} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(705.5)} seed={7210} />
        <Text x={980} y={326} size={30} align="center" width={400} draw={p(705.6)} style={{left: 980}}>
          one big secret
        </Text>
        <Cross x={1180} y={356} size={58} draw={p(708.4)} />

        {cuts.map((c, i) => (
          <React.Fragment key={c.label}>
            <Check x={950} y={480 + i * 70} size={30} draw={p(c.cue)} />
            <Text x={1000} y={470 + i * 70} size={32} draw={p(c.cue)}>
              {c.label}
            </Text>
          </React.Fragment>
        ))}

        <Path d="M 680 820 L 720 950 L 820 950 L 860 820 Z" fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(712.0)} seed={7220} />
        {[0, 1, 2].map((i) => (
          <Rect key={i} x={710 + i * 38} y={790 + (i % 2) * 20} w={30} h={26} fill={COLORS.red} stroke={COLORS.ink} strokeWidth={1.8} draw={p(712.2 + i * 0.1)} seed={7230 + i} opacity={0.8} />
        ))}
      </div>

      <div style={{opacity: final}}>
        <Text x={400} y={330} size={130} font="title" draw={p(724.2, 0.8)}>
          Look for waste.
        </Text>
        <Text x={410} y={510} size={34} tone="faint" draw={p(729.2, 0.7)}>
          before you ask for a bigger device
        </Text>
        <Phone x={1280} y={400} w={250} h={480} draw={p(724.5, 0.8)} screenFill={COLORS.screen} />
        <Text x={1405} y={590} size={46} align="center" width={250} tone="faint" draw={p(724.7)} style={{left: 1280}}>
          3B
        </Text>
        <Magnifier x={1140} y={600} r={78} draw={p(725.0, 0.8)} color={COLORS.red} />
        <Text x={400} y={660} size={32} tone="sage" draw={p(726.0, 0.7)}>
          smaller, not bigger
        </Text>
      </div>
    </Stage>
  );
};
