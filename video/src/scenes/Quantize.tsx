import React from 'react';
import {COLORS, easeOut, mix, progress} from '../lib/theme';
import {Arrow, Circle, DotGrid, Ellipse, Line, Path, Rect} from '../lib/rough';
import {Bean, Box, Check, Chip, Crayon, Cross, Hat, Phone, Text} from '../components/primitives';
import {ChapterTag, GroundLine, Stage, useSceneTime, type SceneProps} from '../components/Stage';

const pF = (t: number, start: number, cue: number, dur = 0.55) =>
  progress(t, cue <= start + 1.6 ? cue - 1.6 : cue, dur, easeOut);

const BitBox: React.FC<{x: number; y: number; w?: number; h?: number; label: string; draw?: number; fill?: string; seed?: number; size?: number}> = ({
  x,
  y,
  w = 44,
  h = 52,
  label,
  draw = 1,
  fill = COLORS.card,
  seed = 2001,
  size = 26,
}) => (
  <>
    <Rect x={x} y={y} w={w} h={h} fill={fill} stroke={COLORS.ink} strokeWidth={2.4} draw={draw} seed={seed} />
    <Text x={x} y={y + h / 2 - size * 0.58} size={size} align="center" width={w} draw={draw}>
      {label}
    </Text>
  </>
);

const ValueGrid: React.FC<{x: number; y: number; cols: number; rows: number; cell: number; gap: number; values: string[]; draw?: number; tone?: string}> = ({
  x,
  y,
  cols,
  rows,
  cell,
  gap,
  values,
  draw = 1,
  tone = COLORS.ink,
}) => (
  <>
    {Array.from({length: rows}).map((_, r) =>
      Array.from({length: cols}).map((__, c) => {
        const i = r * cols + c;
        return (
          <React.Fragment key={i}>
            <Rect
              x={x + c * (cell + gap)}
              y={y + r * (cell + gap)}
              w={cell}
              h={cell}
              fill={values[i] === '1' ? COLORS.sand : COLORS.card}
              stroke={tone}
              strokeWidth={2.2}
              draw={draw}
              seed={2100 + i}
              opacity={0.95}
            />
            <Text x={x + c * (cell + gap)} y={y + r * (cell + gap) + cell * 0.26} size={cell * 0.42} align="center" width={cell} draw={draw} tone="faint">
              {values[i]}
            </Text>
          </React.Fragment>
        );
      }),
    )}
  </>
);

/* ------------------------------------------------------------------ */
export const Trick1: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="Trick one">
      <Text x={120} y={164} size={170} font="title" tone="red" draw={p(118.2, 0.7)}>
        01
      </Text>

      <Rect x={220} y={420} w={500} h={310} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(119.5)} seed={2201} />
      <Text x={250} y={446} size={27} tone="faint" draw={p(119.6)}>
        16 bits
      </Text>
      <Text x={260} y={492} size={72} font="title" draw={p(119.7)}>
        0.7321
      </Text>
      {Array.from({length: 16}).map((_, i) => (
        <BitBox
          key={i}
          x={254 + (i % 8) * 55}
          y={596 + Math.floor(i / 8) * 60}
          w={42}
          h={46}
          label={i % 3 === 0 ? '1' : '0'}
          draw={p(123.6 + i * 0.018)}
          seed={2210 + i}
          size={24}
        />
      ))}

      <Arrow x1={740} y1={575} x2={1040} y2={575} color={COLORS.sage} width={3.4} draw={p(125.3, 0.6)} seed={2230} />
      <Text x={786} y={610} size={26} tone="sage" draw={p(125.4)}>
        quantise
      </Text>

      <Rect x={1060} y={420} w={360} h={310} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={3.2} draw={p(125.4)} seed={2231} />
      <Text x={1090} y={446} size={27} tone="faint" draw={p(125.5)}>
        2 bits
      </Text>
      <Text x={1090} y={500} size={80} font="title" draw={p(125.6)}>
        0.73
      </Text>
      <BitBox x={1090} y={610} label="1" draw={p(125.7)} seed={2232} />
      <BitBox x={1140} y={610} label="0" draw={p(125.8)} seed={2233} />

      <Text x={1140} y={330} size={54} draw={p(125.9, 0.7)} tone="sage">
        quantisation
      </Text>
      <Line x1={1142} y1={398} x2={1142 + 330 * p(126.1)} y2={394} stroke={COLORS.sage} strokeWidth={3.2} draw={p(126.1)} seed={2234} />
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const Crayons: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  const crayonColors = [COLORS.red, COLORS.sage, COLORS.sandDeep, COLORS.ink];
  return (
    <Stage eyebrow="Quantisation, visually">
      <Text x={120} y={128} size={76} draw={p(128.0)}>
        Shades of a number
      </Text>
      <Text x={124} y={222} size={28} tone="faint" draw={p(128.2)}>
        a big box, and a small box
      </Text>

      {/* 1000 crayons */}
      <Path d="M 170 400 L 170 690 L 560 690 L 560 400 Z" fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(128.3)} seed={2301} />
      <Path d="M 170 400 L 130 335 L 240 360 L 285 300 L 390 360 L 500 300 L 545 365 L 600 338 L 560 400" fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.8} draw={p(128.5)} seed={2302} />
      {Array.from({length: 32}).map((_, i) => (
        <Crayon
          key={i}
          x={204 + (i % 8) * 43}
          y={436 + Math.floor(i / 8) * 58}
          h={44}
          color={crayonColors[i % 4]}
          draw={p(128.8 + i * 0.02)}
          seed={2310 + i}
        />
      ))}
      <Text x={170} y={730} size={34} align="center" width={390} draw={p(130.3)} style={{left: 170}}>
        1,000 shades
      </Text>

      {/* 16 crayons */}
      <Path d="M 700 450 L 700 690 L 990 690 L 990 450 Z" fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(130.5)} seed={2340} />
      <Path d="M 700 450 L 670 400 L 750 418 L 790 376 L 860 420 L 940 380 L 985 420 L 1020 402 L 990 450" fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.6} draw={p(130.7)} seed={2341} />
      {Array.from({length: 16}).map((_, i) => (
        <Crayon
          key={i}
          x={730 + (i % 4) * 64}
          y={474 + Math.floor(i / 4) * 50}
          h={34}
          color={crayonColors[(i + 1) % 4]}
          draw={p(131.0 + i * 0.025)}
          seed={2350 + i}
        />
      ))}
      <Text x={700} y={730} size={34} align="center" width={290} draw={p(133.5)} style={{left: 700}}>
        16 shades
      </Text>

      {/* drawing */}
      <Rect x={1080} y={280} w={500} h={400} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.6} draw={p(134.9)} seed={2380} />
      <Circle cx={1470} cy={356} d={66} stroke={COLORS.red} strokeWidth={3.0} draw={p(135.2)} seed={2381} />
      <Path d="M 1090 640 Q 1230 540 1400 620 Q 1500 660 1580 610" stroke={COLORS.sage} strokeWidth={3.2} draw={p(135.4)} seed={2382} />
      <Path d="M 1280 640 L 1280 480" stroke={COLORS.sandDeep} strokeWidth={8} draw={p(135.6)} seed={2383} />
      <Circle cx={1210} cy={470} d={130} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.6} draw={p(135.8)} seed={2384} />
      <Circle cx={1280} cy={420} d={150} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.6} draw={p(135.9)} seed={2385} />
      <Circle cx={1350} cy={470} d={130} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.6} draw={p(136.0)} seed={2386} />
      <Circle cx={1220} cy={460} d={20} fill={COLORS.red} draw={p(136.2)} seed={2387} />
      <Circle cx={1290} cy={430} d={20} fill={COLORS.red} draw={p(136.3)} seed={2388} />
      <Circle cx={1350} cy={480} d={20} fill={COLORS.red} draw={p(136.4)} seed={2389} />
      <Check x={1020} y={704} size={42} draw={p(138.2)} />
      <Text x={1080} y={714} size={30} tone="sage" draw={p(138.3)}>
        still looks great
      </Text>

      {/* balance */}
      <Line x1={800} y1={865} x2={800} y2={930} stroke={COLORS.ink} strokeWidth={4} draw={p(139.3)} seed={2390} />
      <Line x1={680} y1={865} x2={920} y2={865} stroke={COLORS.ink} strokeWidth={4} draw={p(139.4)} seed={2391} />
      <Line x1={800} y1={930} x2={720} y2={960} stroke={COLORS.ink} strokeWidth={4} draw={p(139.5)} seed={2392} />
      <Line x1={800} y1={930} x2={880} y2={960} stroke={COLORS.ink} strokeWidth={4} draw={p(139.5)} seed={2393} />
      <Line x1={680} y1={865} x2={680} y2={910} stroke={COLORS.ink} strokeWidth={2.4} draw={p(139.6)} seed={2394} />
      <Line x1={920} y1={865} x2={920} y2={910} stroke={COLORS.ink} strokeWidth={2.4} draw={p(139.6)} seed={2395} />
      <Path d="M 630 910 Q 680 955 730 910 Z" fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={2.8} draw={p(139.7)} seed={2396} />
      <Path d="M 870 910 Q 920 955 970 910 Z" fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={2.8} draw={p(139.7)} seed={2397} />
      <Text x={610} y={1000} size={30} align="center" width={160} draw={p(140.2)} style={{left: 600}}>
        memory
      </Text>
      <Text x={870} y={1000} size={30} align="center" width={180} draw={p(140.2)} style={{left: 860}}>
        quality
      </Text>
      <Text x={1030} y={860} size={44} draw={p(140.8, 0.7)}>
        find the balance
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const PaintByNumber: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="Palettisation">
      <Text x={120} y={128} size={76} draw={p(145.5)}>
        Paint by numbers
      </Text>
      <Text x={124} y={222} size={28} tone="faint" draw={p(145.8)}>
        numbers instead of colour names
      </Text>

      <Rect x={240} y={280} w={620} h={580} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(151.1)} seed={2401} />
      <Line x1={240} y1={860} x2={860} y2={860} stroke={COLORS.ink} strokeWidth={2.3} draw={p(151.2)} seed={2402} opacity={0.6} />

      {/* flower */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
        return (
          <Circle
            key={i}
            cx={550 + Math.cos(a) * 120}
            cy={540 + Math.sin(a) * 120}
            d={150}
            fill={i === 3 ? COLORS.sand : COLORS.card}
            stroke={COLORS.ink}
            strokeWidth={2.8}
            draw={p(151.4 + i * 0.08)}
            seed={2410 + i}
          />
        );
      })}
      <Circle cx={550} cy={540} d={110} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.8} draw={p(151.9)} seed={2420} />
      <Path d="M 550 595 L 550 800" stroke={COLORS.ink} strokeWidth={3.2} draw={p(152.0)} seed={2421} />
      <Path d="M 550 710 Q 470 670 440 730 Q 500 770 550 740" fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.6} draw={p(152.1)} seed={2422} />
      <Path d="M 550 750 Q 630 710 660 770 Q 600 810 550 780" fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.6} draw={p(152.2)} seed={2423} />

      {[
        {x: 654, y: 435, n: '1'},
        {x: 430, y: 505, n: '1'},
        {x: 550, y: 505, n: '2'},
        {x: 470, y: 700, n: '3'},
      ].map((l, i) => (
        <Text key={i} x={l.x} y={l.y} size={38} align="center" width={60} draw={p(154.3 + i * 0.1)} style={{left: l.x - 30}}>
          {l.n}
        </Text>
      ))}

      <Text x={300} y={812} size={28} tone="faint" draw={p(158.5)}>
        just a small number
      </Text>

      {/* palette */}
      <Path
        d="M 1100 360 C 990 330 930 410 960 470 C 985 530 1080 540 1120 500 C 1140 480 1110 450 1120 430 C 1130 410 1190 410 1240 400 C 1320 385 1300 300 1210 300 C 1160 300 1150 340 1100 360 Z"
        fill={COLORS.sand}
        stroke={COLORS.ink}
        strokeWidth={3.2}
        draw={p(145.9)}
        seed={2430}
      />
      {[
        {x: 1040, y: 390, c: COLORS.red, n: '1'},
        {x: 1130, y: 350, c: COLORS.sage, n: '2'},
        {x: 1220, y: 380, c: COLORS.sandDeep, n: '3'},
      ].map((b, i) => (
        <React.Fragment key={i}>
          <Circle cx={b.x} cy={b.y} d={54} fill={b.c} stroke={COLORS.ink} strokeWidth={2.2} draw={p(146.2 + i * 0.15)} seed={2440 + i} />
          <Text x={b.x - 20} y={b.y - 18} size={24} align="center" width={40} draw={p(146.4 + i * 0.15)} style={{left: b.x - 20}}>
            {b.n}
          </Text>
        </React.Fragment>
      ))}
      <Text x={980} y={540} size={30} draw={p(149.96)} tone="sage">
        a painter's palette
      </Text>

      {/* key */}
      <Rect x={1000} y={600} w={560} h={230} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(161.4)} seed={2450} />
      <Text x={1026} y={620} size={28} tone="faint" draw={p(161.5)}>
        the key
      </Text>
      {[
        {n: '1', c: COLORS.red, label: 'red'},
        {n: '2', c: COLORS.sage, label: 'green'},
        {n: '3', c: COLORS.sandDeep, label: 'slate'},
      ].map((r, i) => (
        <React.Fragment key={r.n}>
          <Text x={1030} y={668 + i * 52} size={30} draw={p(161.7 + i * 0.1)}>
            {r.n}
          </Text>
          <Rect x={1070} y={672 + i * 52} w={42} h={28} fill={r.c} stroke={COLORS.ink} strokeWidth={2} draw={p(161.8 + i * 0.1)} seed={2460 + i} />
          <Text x={1130} y={668 + i * 52} size={30} draw={p(161.9 + i * 0.1)}>
            {r.label}
          </Text>
        </React.Fragment>
      ))}

      <Text x={980} y={880} size={32} tone="sage" draw={p(164.6, 0.7)}>
        same idea, with weights
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const LookupTable: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  const vals = [
    ['0.731', '0.729', '0.734'],
    ['0.212', '0.208', '0.215'],
    ['-0.551', '-0.548', '-0.553'],
  ];

  return (
    <Stage eyebrow="Palettisation, technically">
      <Text x={120} y={128} size={74} draw={p(167.1)}>
        A tiny lookup table
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(167.3)}>
        cluster the near-identical weights
      </Text>

      {vals.map((row, r) =>
        row.map((v, c) => (
          <React.Fragment key={`${r}-${c}`}>
            <Rect x={170 + c * 145} y={350 + r * 92} w={124} h={64} fill={c === 1 ? COLORS.sand : COLORS.card} stroke={COLORS.ink} strokeWidth={2.4} draw={p(167.4 + r * 0.08 + c * 0.04)} seed={2500 + r * 3 + c} />
            <Text x={170 + c * 145} y={364 + r * 92} size={27} align="center" width={124} draw={p(167.5 + r * 0.08 + c * 0.04)}>
              {v}
            </Text>
          </React.Fragment>
        )),
      )}

      <Line x1={610} y1={330} x2={610} y2={650} stroke={COLORS.ink} strokeWidth={2.4} draw={p(168.9)} seed={2520} />
      {[0, 1, 2].map((i) => (
        <React.Fragment key={i}>
          <Line x1={592} y1={382 + i * 92} x2={610} y2={382 + i * 92} stroke={COLORS.ink} strokeWidth={2.2} draw={p(168.95)} seed={2521 + i} />
          <Text x={620} y={366 + i * 92} size={24} tone="faint" draw={p(169.0)}>
            group {i + 1}
          </Text>
        </React.Fragment>
      ))}

      <Arrow x1={630} y1={490} x2={748} y2={490} color={COLORS.sage} width={3} draw={p(170.9)} seed={2530} />

      {/* table */}
      <Rect x={760} y={320} w={340} h={400} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(170.9)} seed={2531} />
      <Text x={760} y={340} size={26} align="center" width={340} tone="faint" draw={p(171.0)}>
        lookup table
      </Text>
      {[
        ['00', '0.731'],
        ['01', '0.212'],
        ['10', '-0.551'],
        ['11', '0.734'],
      ].map((row, i) => (
        <React.Fragment key={row[0]}>
          <Line x1={780} y1={382 + i * 78} x2={1080} y2={382 + i * 78} stroke={COLORS.ink} strokeWidth={1.8} draw={p(171.1 + i * 0.05)} seed={2540 + i} opacity={0.45} />
          <Text x={792} y={396 + i * 78} size={30} draw={p(171.2 + i * 0.05)} tone="faint">
            {row[0]}
          </Text>
          <Text x={892} y={396 + i * 78} size={32} draw={p(171.3 + i * 0.05)}>
            {row[1]}
          </Text>
        </React.Fragment>
      ))}

      {/* note card */}
      <Rect x={1290} y={390} w={390} h={190} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={3.2} draw={p(177.2)} seed={2550} />
      <Text x={1316} y={414} size={26} tone="faint" draw={p(177.3)}>
        one weight
      </Text>
      <Text x={1316} y={458} size={46} draw={p(177.35)}>
        0.731
      </Text>
      <Text x={1316} y={526} size={28} tone="sage" draw={p(177.5)}>
        note = 00
      </Text>
      <Arrow x1={1284} y1={486} x2={1112} y2={486} color={COLORS.sage} width={3} draw={p(178.1)} seed={2551} />
      <Text x={1130} y={452} size={24} tone="sage" draw={p(178.3)}>
        points to row 00
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const Bits: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="A very short note">
      <Text x={120} y={128} size={74} draw={p(180.2)}>
        How short can a note be?
      </Text>

      <Rect x={160} y={300} w={230} h={250} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(180.5)} seed={2601} />
      <Text x={160} y={258} size={28} align="center" width={230} tone="faint" draw={p(180.6)} style={{left: 160}}>
        one bit
      </Text>
      <BitBox x={192} y={340} w={70} h={80} label="0" draw={p(180.6)} seed={2602} size={44} />
      <BitBox x={288} y={340} w={70} h={80} label="1" draw={p(180.7)} seed={2603} size={44} />
      <Text x={160} y={470} size={28} align="center" width={230} draw={p(180.9)} style={{left: 160}}>
        zero or one
      </Text>

      <Text x={470} y={322} size={30} tone="faint" draw={p(184.4)}>
        two bits
      </Text>
      <BitBox x={470} y={360} w={56} h={62} label="0/1" draw={p(184.5)} seed={2604} size={22} />
      <BitBox x={536} y={360} w={56} h={62} label="0/1" draw={p(184.55)} seed={2605} size={22} />
      <Arrow x1={614} y1={390} x2={792} y2={390} color={COLORS.ink} width={2.8} draw={p(184.7)} seed={2606} />
      <Text x={470} y={452} size={26} tone="sage" draw={p(184.9)}>
        4 combinations
      </Text>
      {['00', '01', '10', '11'].map((v, i) => (
        <BitBox key={v} x={800 + (i % 2) * 72} y={340 + Math.floor(i / 2) * 72} w={58} h={58} label={v} draw={p(184.8 + i * 0.05)} seed={2610 + i} size={22} />
      ))}

      <Text x={470} y={620} size={30} tone="faint" draw={p(188.5)}>
        four bits
      </Text>
      {['0', '0', '1', '1'].map((v, i) => (
        <BitBox key={i} x={470 + i * 62} y={660} w={50} h={56} label={v} draw={p(188.55 + i * 0.06)} seed={2620 + i} size={24} />
      ))}
      <Arrow x1={740} y1={688} x2={790} y2={688} color={COLORS.ink} width={2.8} draw={p(188.8)} seed={2624} />
      <Text x={470} y={744} size={26} tone="sage" draw={p(189.0)}>
        16 combinations
      </Text>
      {Array.from({length: 16}).map((_, i) => (
        <BitBox key={i} x={800 + (i % 4) * 60} y={600 + Math.floor(i / 4) * 60} w={48} h={48} label={`${i}`} draw={p(188.9 + i * 0.02)} seed={2630 + i} size={20} />
      ))}

      <Text x={1260} y={330} size={28} tone="faint" draw={p(190.7)}>
        16-bit
      </Text>
      <Rect x={1260} y={366} w={380} h={58} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={2.8} draw={p(190.75)} seed={2650} />
      <Text x={1260} y={470} size={28} tone="faint" draw={p(190.8)}>
        2-bit
      </Text>
      <Rect x={1260} y={506} w={48} h={58} fill={COLORS.sage} stroke={COLORS.ink} strokeWidth={2.8} draw={p(190.85)} seed={2651} />
      <Text x={1330} y={530} size={31} tone="sage" draw={p(193.4, 0.7)}>
        8× smaller
      </Text>
      <Line x1={1330} y1={586} x2={1330 + 270 * p(193.6)} y2={582} stroke={COLORS.sage} strokeWidth={3} draw={p(193.6)} seed={2652} />
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const MixedBits: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  // 85 four-bit cells, 15 two-bit cells, deterministic distribution.
  const cells = Array.from({length: 100}).map((_, i) => (i % 7 === 0 || i % 13 === 0) ? '2' : '4');
  const redCount = cells.filter((c) => c === '2').length;

  return (
    <Stage eyebrow="The earlier model">
      <Text x={120} y={128} size={74} draw={p(195.3)}>
        Mixed sizes
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(195.5)}>
        some weights 2-bit, some 4-bit
      </Text>

      <Rect x={220} y={282} w={472} h={472} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(195.6)} seed={2701} />
      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
        {cells.map((v, i) => (
          <rect
            key={i}
            x={234 + (i % 10) * 44}
            y={296 + Math.floor(i / 10) * 44}
            width={38}
            height={38}
            rx={3}
            fill={v === '2' ? COLORS.red : COLORS.sage}
            stroke={COLORS.ink}
            strokeWidth={1.4}
            opacity={0.92}
          />
        ))}
      </svg>

      <Rect x={220} y={788} w={26} h={26} fill={COLORS.red} stroke={COLORS.ink} strokeWidth={2} draw={p(197.4)} seed={2710} />
      <Text x={258} y={786} size={27} draw={p(197.5)}>
        2-bit
      </Text>
      <Rect x={380} y={788} w={26} h={26} fill={COLORS.sage} stroke={COLORS.ink} strokeWidth={2} draw={p(197.55)} seed={2711} />
      <Text x={418} y={786} size={27} draw={p(197.6)}>
        4-bit
      </Text>

      <Text x={900} y={330} size={32} tone="faint" draw={p(202.5)}>
        on average
      </Text>
      <Text x={900} y={350} size={160} font="title" draw={p(202.5, 0.8)}>
        3.7
      </Text>
      <Text x={900} y={540} size={40} draw={p(203.5, 0.7)}>
        bits per weight
      </Text>
      <Line x1={900} y1={596} x2={900 + 520 * p(203.8)} y2={592} stroke={COLORS.ink} strokeWidth={3.2} draw={p(203.8)} seed={2720} />
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const RunNumbers: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="The arithmetic">
      <Text x={120} y={128} size={74} draw={p(205.3)}>
        Let's run the numbers
      </Text>

      <Text x={180} y={292} size={52} draw={p(205.6, 0.8)}>
        3,000,000,000 × 3.7 = 11,100,000,000 bits
      </Text>
      <Text x={180} y={392} size={62} draw={p(211.6, 0.8)}>
        ÷ 8 = 1.39 GB
      </Text>
      <Text x={180} y={490} size={26} tone="faint" draw={p(212.9)}>
        divide bits by 8 to get bytes
      </Text>

      <Text x={240} y={620} size={30} draw={p(213.8)}>
        1.39 GB
      </Text>
      <Rect x={240} y={664} w={330} h={62} fill={COLORS.sage} stroke={COLORS.ink} strokeWidth={2.8} draw={p(213.9)} seed={2801} />

      <Text x={240} y={790} size={30} draw={p(216.5)}>
        almost 6 GB
      </Text>
      <Rect x={240} y={834} w={1400} h={62} fill={COLORS.red} stroke={COLORS.ink} strokeWidth={2.8} draw={p(216.6)} seed={2802} opacity={0.85} />

      <Text x={1500} y={580} size={56} font="title" tone="sage" draw={p(219.5, 0.8)}>
        less than ¼
      </Text>
      <Text x={1500} y={646} size={26} tone="faint" draw={p(219.8)}>
        of the 16-bit model
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const Sensitivity: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="Not all parts are equal">
      <Text x={120} y={128} size={72} draw={p(221.2)}>
        Not every part is equal
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(221.4)}>
        sensitive parts get more bits
      </Text>

      <Rect x={360} y={286} w={900} h={46} fill={COLORS.sage} stroke={COLORS.ink} strokeWidth={2.6} draw={p(221.5)} seed={2895} opacity={0.85} />
      <Rect x={1260} y={286} w={300} h={46} fill={COLORS.red} stroke={COLORS.ink} strokeWidth={2.6} draw={p(221.6)} seed={2896} opacity={0.85} />
      <Text x={760} y={246} size={26} tone="sage" draw={p(221.7)}>
        4-bit
      </Text>
      <Text x={1360} y={246} size={26} tone="red" draw={p(221.8)}>
        2-bit
      </Text>

      <Path d="M 300 450 L 300 820 L 1120 820 L 1120 450 Z" fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.4} draw={p(226.5)} seed={2901} />
      <Path d="M 300 450 L 250 380 L 430 430 L 500 350 L 620 440 L 760 350 L 850 430 L 990 350 L 1050 410 L 1120 450" fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.8} draw={p(226.7)} seed={2902} />
      <Line x1={710} y1={450} x2={710} y2={820} stroke={COLORS.ink} strokeWidth={2.4} draw={p(227.0)} seed={2903} opacity={0.7} />

      <Text x={340} y={480} size={34} draw={p(227.7)}>
        socks
      </Text>
      <Text x={340} y={520} size={24} tone="faint" draw={p(227.8)}>
        can be squished
      </Text>
      {[0, 1, 2].map((i) => (
        <Path
          key={i}
          d={`M ${360 + i * 100} 640 Q ${400 + i * 100} 590 ${440 + i * 100} 640 Q ${410 + i * 100} 680 ${440 + i * 100} 720 Q ${390 + i * 100} 700 ${360 + i * 100} 720 Q ${390 + i * 100} 680 ${360 + i * 100} 640 Z`}
          fill={COLORS.sand}
          stroke={COLORS.ink}
          strokeWidth={2.6}
          draw={p(228.0 + i * 0.1)}
          seed={2910 + i}
        />
      ))}
      <Arrow x1={520} y1={540} x2={520} y2={610} color={COLORS.red} width={3} draw={p(234.3)} seed={2920} />
      <Text x={460} y={560} size={24} tone="red" draw={p(234.5)}>
        squeeze
      </Text>
      <Text x={340} y={760} size={28} tone="sage" draw={p(234.8)}>
        2 bits
      </Text>

      <Text x={760} y={480} size={34} draw={p(229.8)}>
        vase
      </Text>
      <Text x={760} y={520} size={24} tone="faint" draw={p(229.9)}>
        needs protection
      </Text>
      <Path d="M 840 590 L 910 590 L 905 622 Q 938 652 938 702 L 938 762 L 812 762 L 812 702 Q 812 652 845 622 Z" fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(230.0)} seed={2930} />
      <Line x1={832} y1={590} x2={918} y2={590} stroke={COLORS.ink} strokeWidth={3} draw={p(230.1)} seed={2931} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = (i / 8) * Math.PI * 2;
        return <Circle key={i} cx={875 + Math.cos(a) * 92} cy={660 + Math.sin(a) * 92} d={26} stroke={COLORS.ink} strokeWidth={2} draw={p(231.5 + i * 0.06)} seed={2940 + i} />;
      })}
      <Text x={760} y={790} size={28} tone="sage" draw={p(236.8)}>
        4 bits
      </Text>

      <Text x={1180} y={520} size={58} draw={p(235.2, 0.8)}>
        squeeze
      </Text>
      <Text x={1180} y={588} size={58} tone="red" draw={p(235.3, 0.8)}>
        gently
      </Text>
      <Line x1={1182} y1={666} x2={1182 + 270 * p(235.5)} y2={662} stroke={COLORS.red} strokeWidth={3.2} draw={p(235.5)} seed={2950} />
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const DecoderEmbed: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);
  const decoderActive = p(246.9, 0.6) * (1 - p(253.9, 0.6) * 0.7);
  const embeddingActive = p(253.9, 0.6);

  return (
    <Stage eyebrow="The newer model">
      <Text x={120} y={128} size={74} draw={p(239.0)}>
        Two parts, two sizes
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(239.2)}>
        the body, and the dictionary
      </Text>

      {/* decoder */}
      <Rect x={150} y={280} w={780} h={570} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(239.3)} seed={3001} opacity={0.55 + 0.45 * decoderActive} />
      <Text x={182} y={302} size={38} draw={p(239.4)}>
        decoder
      </Text>
      <Text x={780} y={306} size={46} font="title" tone="sage" align="right" width={120} draw={p(240.0)} style={{left: 780}}>
        2-bit
      </Text>

      <Path d="M 260 470 Q 260 400 330 400 Q 400 400 400 470 L 400 660 Q 400 720 330 720 Q 260 720 260 660 Z" fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={3.2} draw={p(240.2)} seed={3002} />
      <Circle cx={307} cy={500} d={9} fill={COLORS.ink} stroke={COLORS.ink} strokeWidth={1} draw={p(240.4)} seed={3003} />
      <Circle cx={353} cy={500} d={9} fill={COLORS.ink} stroke={COLORS.ink} strokeWidth={1} draw={p(240.4)} seed={3004} />
      <Path d="M 315 540 Q 330 552 345 540" stroke={COLORS.ink} strokeWidth={2.6} draw={p(240.5)} seed={3005} />
      <Text x={330} y={760} size={27} align="center" width={200} draw={p(240.6)} tone="faint" style={{left: 230}}>
        thinks
      </Text>

      <Arrow x1={420} y1={560} x2={540} y2={560} color={COLORS.ink} width={2.8} draw={p(246.9)} seed={3010} />
      {['one', 'token', 'at a', 'time'].map((s, i) => (
        <TokenMini key={s} x={560} y={480 + i * 64} label={s} draw={p(247.0 + i * 0.12)} seed={3011 + i} />
      ))}

      {/* embedding */}
      <Rect x={990} y={280} w={780} h={570} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(243.8)} seed={3020} opacity={0.55 + 0.45 * embeddingActive} />
      <Text x={1022} y={302} size={38} draw={p(243.9)}>
        embedding
      </Text>
      <Text x={1620} y={306} size={46} font="title" tone="sage" align="right" width={120} draw={p(243.98)} style={{left: 1620}}>
        4-bit
      </Text>

      <Text x={1060} y={370} size={26} tone="faint" draw={p(254.0)}>
        look up a token
      </Text>
      <TokenMini x={1060} y={402} label="cat" draw={p(254.1)} seed={3030} />
      <Arrow x1={1120} y1={486} x2={1120} y2={548} color={COLORS.sage} width={2.8} draw={p(254.3)} seed={3031} />

      <Path d="M 1060 580 Q 1060 548 1110 548 L 1230 548 Q 1280 548 1280 580 L 1280 740 Q 1280 772 1230 772 L 1110 772 Q 1060 772 1060 740 Z" fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={3.2} draw={p(254.4)} seed={3032} />
      <Line x1={1110} y1={548} x2={1110} y2={772} stroke={COLORS.ink} strokeWidth={2.2} draw={p(254.5)} seed={3033} />
      <Text x={1160} y={600} size={28} draw={p(254.6)}>
        A–Z
      </Text>
      <Text x={1160} y={650} size={22} tone="faint" draw={p(254.7)}>
        dictionary
      </Text>

      <Arrow x1={1300} y1={650} x2={1390} y2={650} color={COLORS.sage} width={2.8} draw={p(256.8)} seed={3040} />
      <Text x={1410} y={590} size={26} tone="faint" draw={p(257.0)}>
        a list of numbers
      </Text>
      <Text x={1410} y={632} size={30} draw={p(257.1)}>
        0.21, -1.04, 0.77
      </Text>
      <Text x={1410} y={676} size={30} draw={p(257.2)}>
        -0.42, 1.18, 0.05
      </Text>
    </Stage>
  );
};

const TokenMini: React.FC<{x: number; y: number; label: string; draw?: number; seed?: number; w?: number}> = ({x, y, label, draw = 1, seed = 3100, w = 130}) => (
  <>
    <Rect x={x} y={y} w={w} h={44} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.2} draw={draw} seed={seed} />
    <Text x={x} y={y + 8} size={w > 100 ? 25 : 22} align="center" width={w} draw={draw}>
      {label}
    </Text>
  </>
);

/* ------------------------------------------------------------------ */
export const Catch: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="The catch">
      <Text x={120} y={128} size={74} draw={p(260.5)}>
        The catch
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(260.7)}>
        rounding changes the model
      </Text>

      <Rect x={200} y={380} w={330} h={310} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={3.2} draw={p(260.7)} seed={3201} />
      <Text x={228} y={408} size={34} draw={p(260.8)}>
        trained model
      </Text>
      <Text x={228} y={468} size={70} font="title" draw={p(260.9)}>
        16-bit
      </Text>
      <Check x={228} y={590} size={34} draw={p(261.1)} />
      <Text x={276} y={582} size={25} tone="sage" draw={p(261.2)}>
        finished learning
      </Text>

      <Text x={620} y={322} size={28} tone="red" draw={p(262.5)}>
        round now?
      </Text>
      <Rect x={600} y={352} w={260} h={60} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(262.7)} seed={3210} />
      <Rect x={600} y={700} w={260} h={60} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(262.7)} seed={3211} />
      <Arrow x1={730} y1={420} x2={730} y2={588} color={COLORS.red} width={3.4} draw={p(262.9)} seed={3212} />
      <Arrow x1={730} y1={692} x2={730} y2={530} color={COLORS.red} width={3.4} draw={p(262.9)} seed={3213} />
      <Text x={620} y={790} size={30} tone="red" align="center" width={260} draw={p(263.1)} style={{left: 600}}>
        squeeze
      </Text>

      <Rect x={1020} y={390} w={430} h={290} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(264.0)} seed={3220} />
      <Text x={1048} y={416} size={30} draw={p(264.1)}>
        answer
      </Text>
      {Array.from({length: 4}).map((_, i) => (
        <Line key={i} x1={1050} y1={478 + i * 38} x2={1050 + (i === 1 ? 240 : 330)} y2={476 + i * 38} stroke={COLORS.ink} strokeWidth={2.4} draw={p(264.2 + i * 0.05)} seed={3221 + i} opacity={0.65} />
      ))}
      <Cross x={1190} y={600} size={94} draw={p(267.3, 0.7)} />
      <Text x={960} y={720} size={32} tone="red" draw={p(270.4)}>
        small errors pile up
      </Text>

      <Text x={1020} y={820} size={44} draw={p(273.1, 0.8)} tone="sage">
        quantisation-aware training
      </Text>
      <Line x1={1022} y1={888} x2={1022 + 560 * p(273.4)} y2={884} stroke={COLORS.sage} strokeWidth={3.2} draw={p(273.4)} seed={3230} />
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const QATLoop: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="Squeeze while learning">
      <Text x={120} y={128} size={72} draw={p(275.8)}>
        Squeeze while learning
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(276.0)}>
        not after the model is finished
      </Text>

      <Rect x={790} y={270} w={340} h={120} fill={COLORS.card} stroke={p(284.5) > 0.6 ? COLORS.sage : COLORS.ink} strokeWidth={3.2} draw={p(276.0)} seed={3301} />
      <Text x={960} y={306} size={34} align="center" width={340} draw={p(276.1)} style={{left: 790}}>
        try a task
      </Text>

      <Rect x={1120} y={660} w={330} h={120} fill={COLORS.card} stroke={p(285.5) > 0.6 ? COLORS.sage : COLORS.ink} strokeWidth={3.2} draw={p(276.2)} seed={3302} />
      <Text x={1285} y={696} size={34} align="center" width={330} draw={p(276.3)} style={{left: 1120}}>
        spot the error
      </Text>

      <Rect x={470} y={660} w={330} h={120} fill={COLORS.card} stroke={p(287.5) > 0.6 ? COLORS.sage : COLORS.ink} strokeWidth={3.2} draw={p(276.4)} seed={3303} />
      <Text x={635} y={696} size={34} align="center" width={330} draw={p(276.5)} style={{left: 470}}>
        nudge weights
      </Text>

      <Arrow x1={1130} y1={320} x2={1270} y2={650} color={COLORS.ink} width={3.2} draw={p(276.6)} seed={3310} />
      <Arrow x1={1110} y1={720} x2={810} y2={720} color={COLORS.ink} width={3.2} draw={p(276.8)} seed={3311} />
      <Arrow x1={650} y1={650} x2={800} y2={400} color={COLORS.ink} width={3.2} draw={p(277.0)} seed={3312} />

      <Text x={960} y={500} size={36} align="center" width={360} tone="faint" draw={p(280.0)} style={{left: 780}}>
        only a few values
      </Text>
      {['0.1', '0.4', '0.8', '1.2'].map((v, i) => (
        <TokenMini key={v} x={800 + i * 84} y={548} label={v} draw={p(280.1 + i * 0.12)} seed={3320 + i} w={74} />
      ))}
      <Text x={960} y={840} size={30} align="center" width={500} tone="sage" draw={p(292.2)} style={{left: 710}}>
        repeat, all through training
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const CrayonTest: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="Four crayons, from the start">
      <Text x={120} y={128} size={72} draw={p(294.8)}>
        The four-crayon test
      </Text>

      {/* left panel */}
      <Rect x={160} y={240} w={720} h={650} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(295.0)} seed={3401} />
      <Text x={190} y={268} size={32} draw={p(298.2)}>
        practice with 1,000
      </Text>
      <Rect x={210} y={340} w={620} h={360} fill={COLORS.screen} stroke={COLORS.ink} strokeWidth={2.4} draw={p(298.4)} seed={3402} />
      <Path d="M 260 600 Q 340 420 430 540 Q 520 660 610 500 Q 680 380 760 600" stroke={COLORS.red} strokeWidth={4} draw={p(299.0)} seed={3403} />
      <Path d="M 300 470 Q 400 620 520 450 Q 600 360 720 520" stroke={COLORS.ink} strokeWidth={3.2} draw={p(299.2)} seed={3404} />
      <Path d="M 290 640 Q 430 540 560 640 Q 660 720 780 560" stroke={COLORS.sage} strokeWidth={3.4} draw={p(299.4)} seed={3405} />
      <Text x={210} y={742} size={28} tone="red" draw={p(300.0)}>
        test day: 4 crayons
      </Text>
      <Cross x={770} y={760} size={44} draw={p(301.4)} />
      <Text x={590} y={826} size={38} tone="red" draw={p(301.6)}>
        messy
      </Text>

      {/* right panel */}
      <Rect x={1040} y={240} w={720} h={650} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(302.9)} seed={3410} />
      <Text x={1070} y={268} size={32} draw={p(302.9)}>
        practice with 4
      </Text>
      <Rect x={1090} y={340} w={620} h={360} fill={COLORS.screen} stroke={COLORS.ink} strokeWidth={2.4} draw={p(303.0)} seed={3411} />
      <Circle cx={1490} cy={392} d={62} stroke={COLORS.red} strokeWidth={3} draw={p(303.4)} seed={3412} />
      <Path d="M 1120 660 Q 1250 550 1400 640 Q 1510 700 1670 610" stroke={COLORS.sage} strokeWidth={3.4} draw={p(303.5)} seed={3413} />
      <Rect x={1260} y={520} w={190} h={140} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={3} draw={p(303.6)} seed={3414} />
      <Path d="M 1230 520 L 1355 430 L 1480 520 Z" fill={COLORS.card} stroke={COLORS.red} strokeWidth={3.2} draw={p(303.7)} seed={3415} />
      <Rect x={1320} y={590} w={54} h={70} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.6} draw={p(303.8)} seed={3416} />
      <Rect x={1380} y={548} w={44} h={40} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.4} draw={p(303.9)} seed={3417} />
      <Check x={1610} y={730} size={46} draw={p(305.4)} />
      <Text x={1440} y={826} size={38} tone="sage" draw={p(305.5)}>
        still good
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const DevLesson: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="For developers">
      <Text x={120} y={128} size={72} draw={p(307.6)}>
        Train for the size
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(307.8)}>
        don't shrink a finished model and hope
      </Text>

      <Text x={160} y={360} size={34} tone="red" draw={p(308.2)}>
        shrink later
      </Text>
      <Rect x={410} y={320} w={260} h={190} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={3} draw={p(308.4)} seed={3501} />
      <Text x={410} y={396} size={38} align="center" width={260} draw={p(308.5)}>
        full model
      </Text>
      <Arrow x1={720} y1={415} x2={1110} y2={415} color={COLORS.red} width={3} draw={p(308.7)} seed={3502} />
      <Rect x={1120} y={320} w={260} h={190} fill={COLORS.card} stroke={COLORS.red} strokeWidth={3.2} draw={p(309.0)} seed={3503} />
      <Path d="M 1180 360 L 1230 410 L 1190 450 L 1240 500" stroke={COLORS.red} strokeWidth={3} draw={p(309.2)} seed={3504} />
      <Path d="M 1300 360 L 1260 410 L 1310 450 L 1260 500" stroke={COLORS.red} strokeWidth={3} draw={p(309.3)} seed={3505} />
      <Cross x={1250} y={550} size={40} draw={p(309.6)} />

      <Text x={160} y={700} size={34} tone="sage" draw={p(312.6)}>
        train small
      </Text>
      <Rect x={410} y={650} w={260} h={190} fill={COLORS.sand} stroke={COLORS.sage} strokeWidth={3} draw={p(312.7)} seed={3510} />
      <Text x={410} y={726} size={38} align="center" width={260} draw={p(312.8)}>
        small-aware
      </Text>
      <Arrow x1={720} y1={745} x2={1110} y2={745} color={COLORS.sage} width={3} draw={p(312.9)} seed={3511} />
      <Rect x={1120} y={650} w={260} h={190} fill={COLORS.card} stroke={COLORS.sage} strokeWidth={3.2} draw={p(313.0)} seed={3512} />
      <Text x={1120} y={726} size={38} align="center" width={260} draw={p(313.1)}>
        holds up
      </Text>
      <Check x={1250} y={872} size={42} draw={p(312.8)} />
    </Stage>
  );
};
