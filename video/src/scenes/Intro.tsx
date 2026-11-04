import React from 'react';
import {COLORS, easeOut, mix, progress} from '../lib/theme';
import {Arrow, Circle, DotGrid, Ellipse, Line, Path, Rect} from '../lib/rough';
import {Bean, Check, Phone, Text} from '../components/primitives';
import {GroundLine, Stage, useSceneTime, type SceneProps} from '../components/Stage';

const pF = (t: number, start: number, cue: number, dur = 0.55) =>
  progress(t, cue <= start + 1.6 ? cue - 1.6 : cue, dur, easeOut);

const Token: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  draw?: number;
  fill?: string;
  tone?: 'ink' | 'red' | 'sage';
  size?: number;
  seed?: number;
}> = ({x, y, w, h, label, draw = 1, fill = COLORS.card, tone = 'ink', size = 34, seed = 301}) => (
  <>
    <Rect
      x={x}
      y={y}
      w={w}
      h={h}
      fill={fill}
      stroke={tone === 'ink' ? COLORS.ink : COLORS[tone]}
      strokeWidth={2.8}
      draw={draw}
      seed={seed}
    />
    <Text x={x} y={y + h / 2 - size * 0.58} size={size} align="center" width={w} draw={draw} tone={tone}>
      {label}
    </Text>
  </>
);

const BrickWall: React.FC<{x: number; y: number; w: number; h: number; draw?: number; seed?: number}> = ({
  x,
  y,
  w,
  h,
  draw = 1,
  seed = 401,
}) => {
  const rows = 6;
  const cols = 4;
  return (
    <>
      <Rect x={x} y={y} w={w} h={h} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.4} draw={draw} seed={seed} />
      {Array.from({length: rows - 1}).map((_, i) => (
        <Line
          key={`h${i}`}
          x1={x}
          y1={y + ((i + 1) * h) / rows}
          x2={x + w}
          y2={y + ((i + 1) * h) / rows}
          stroke={COLORS.ink}
          strokeWidth={2.2}
          draw={draw}
          seed={seed + i + 1}
          opacity={0.8}
        />
      ))}
      {Array.from({length: rows}).map((_, r) =>
        Array.from({length: cols - 1}).map((__, c) => {
          const offset = r % 2 === 0 ? w / (cols * 2) : 0;
          return (
            <Line
              key={`v${r}-${c}`}
              x1={x + offset + ((c + 1) * w) / cols}
              y1={y + (r * h) / rows}
              x2={x + offset + ((c + 1) * w) / cols}
              y2={y + ((r + 1) * h) / rows}
              stroke={COLORS.ink}
              strokeWidth={2.2}
              draw={draw}
              seed={seed + 20 + r * cols + c}
              opacity={0.8}
            />
          );
        }),
      )}
    </>
  );
};

/* ------------------------------------------------------------------ */
export const ThreeJobs: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.55) => pF(t, start, cue, dur);

  const cards = [
    {x: 500, label: 'Summarize', cue: 10.0},
    {x: 930, label: 'Find facts', cue: 11.55},
    {x: 1360, label: 'Sort', cue: 13.0},
  ];

  return (
    <Stage eyebrow="What it does">
      <Text x={120} y={128} size={76} draw={p(9.68)}>
        One model, three jobs
      </Text>
      <Text x={124} y={222} size={28} tone="faint" draw={p(9.9)}>
        all on the phone
      </Text>

      <Phone x={150} y={360} w={230} h={470} draw={p(9.7, 0.9)} screenFill={COLORS.screen} />
      <DotGrid x={196} y={448} cols={5} rows={6} gap={28} r={3} progress={p(9.85, 1.0)} opacity={0.65} />
      <Text x={265} y={720} size={30} align="center" width={230} draw={p(9.85)} style={{left: 150}}>
        small model
      </Text>

      {cards.map((c, i) => {
        const d = p(c.cue);
        return (
          <React.Fragment key={c.label}>
            <Rect x={c.x} y={355} w={370} h={340} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.1} draw={d} seed={420 + i} />
            <Text x={c.x + 30} y={382} size={38} draw={d}>
              {c.label}
            </Text>
            <Line x1={c.x + 30} y1={432} x2={c.x + 270} y2={430} stroke={COLORS.ink} strokeWidth={2} draw={d} seed={430 + i} opacity={0.5} />
          </React.Fragment>
        );
      })}

      {/* summarize icon */}
      <div style={{opacity: p(10.0)}}>
        {Array.from({length: 4}).map((_, i) => (
          <Line key={i} x1={530} y1={470 + i * 35} x2={530 + (i === 0 ? 280 : 230)} y2={468 + i * 35} stroke={COLORS.ink} strokeWidth={2.8} draw={p(10.05 + i * 0.05)} seed={440 + i} />
        ))}
        <Arrow x1={650} y1={615} x2={650} y2={665} color={COLORS.sage} width={2.8} draw={p(10.5)} seed={450} />
        <Line x1={545} y1={690} x2={755} y2={688} stroke={COLORS.sage} strokeWidth={4.2} draw={p(10.6)} seed={451} />
      </div>

      {/* find facts icon */}
      <div style={{opacity: p(11.55)}}>
        <Rect x={960} y={462} w={230} h={190} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.4} draw={p(11.6)} seed={460} />
        {Array.from({length: 5}).map((_, i) => (
          <Line key={i} x1={982} y1={492 + i * 30} x2={i === 2 ? 1130 : 1160} y2={490 + i * 30} stroke={COLORS.ink} strokeWidth={2.2} draw={p(11.65 + i * 0.04)} seed={461 + i} opacity={i === 2 ? 0.95 : 0.55} />
        ))}
        <Circle cx={1110} cy={585} d={92} stroke={COLORS.red} strokeWidth={4} draw={p(12.0)} seed={470} />
        <Line x1={1150} y1={625} x2={1200} y2={675} stroke={COLORS.red} strokeWidth={6} draw={p(12.15)} seed={471} />
        <Line x1={982} y1={535} x2={1080} y2={533} stroke={COLORS.red} strokeWidth={7} draw={p(12.1)} seed={472} opacity={0.35} />
      </div>

      {/* sort icon */}
      <div style={{opacity: p(13.0)}}>
        {[0, 1, 2].map((i) => (
          <React.Fragment key={i}>
            <Path
              d={`M ${1390 + i * 100} 620 L ${1390 + i * 100} 690 L ${1470 + i * 100} 690 L ${1470 + i * 100} 620 Z`}
              fill={i === 1 ? COLORS.sand : COLORS.card}
              stroke={COLORS.ink}
              strokeWidth={2.6}
              draw={p(13.05 + i * 0.1)}
              seed={480 + i}
            />
            <Text x={1430 + i * 100} y={642} size={25} align="center" width={80} draw={p(13.2 + i * 0.1)} style={{left: 1390 + i * 100}}>
              {['A', 'B', 'C'][i]}
            </Text>
          </React.Fragment>
        ))}
        {[0, 1, 2].map((i) => (
          <Circle key={i} cx={1430 + i * 100 + (i % 2) * 20} cy={585 - i * 10} d={16} fill={i === 1 ? COLORS.red : COLORS.ink} draw={p(13.35 + i * 0.08)} seed={490 + i} />
        ))}
      </div>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const Sharing: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="Same phone, same memory">
      <Text x={120} y={128} size={76} draw={p(15.84)}>
        Everything shares it
      </Text>
      <Text x={124} y={222} size={28} tone="faint" draw={p(16.0)}>
        one phone, one memory
      </Text>

      <Phone x={700} y={238} w={520} h={640} draw={p(15.9, 0.9)} screenFill={COLORS.screen} />

      <Rect x={738} y={332} w={444} h={228} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={3} draw={p(16.12)} seed={501} />
      <Text x={960} y={418} size={54} align="center" width={444} draw={p(16.2)} style={{left: 738}}>
        model
      </Text>
      <Text x={960} y={480} size={24} align="center" width={444} draw={p(16.35)} tone="faint" style={{left: 738}}>
        3B parameters
      </Text>

      <Rect x={738} y={586} w={444} h={112} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(17.24)} seed={502} />
      <Text x={960} y={616} size={38} align="center" width={444} draw={p(17.3)} style={{left: 738}}>
        operating system
      </Text>

      <Rect x={738} y={724} w={444} h={116} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(18.36)} seed={503} />
      <Text x={960} y={752} size={38} align="center" width={444} draw={p(18.4)} style={{left: 738}}>
        your apps
      </Text>
      {[0, 1, 2].map((i) => (
        <Rect key={i} x={850 + i * 80} y={800} w={48} h={28} fill={i === 1 ? COLORS.sage : COLORS.sandDeep} stroke={COLORS.ink} strokeWidth={2} draw={p(18.5 + i * 0.06)} seed={510 + i} />
      ))}

      <Text x={190} y={450} size={64} draw={p(16.3)}>
        one memory
      </Text>
      <Text x={194} y={518} size={30} tone="faint" draw={p(16.5)}>
        nobody gets it alone
      </Text>
      <Arrow x1={620} y1={540} x2={708} y2={540} color={COLORS.sage} width={3.2} draw={p(16.7)} seed={520} />
      <Text x={194} y={590} size={26} tone="sage" draw={p(17.4)}>
        model + OS + apps
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const NoSlow: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="The surprising part">
      <Text x={120} y={128} size={76} draw={p(20.4)}>
        No slowdown. No heat.
      </Text>
      <Text x={124} y={222} size={28} tone="faint" draw={p(20.6)}>
        and the battery is fine
      </Text>

      <Phone x={820} y={250} w={300} h={570} draw={p(20.4, 0.9)} screenFill={COLORS.screen} />
      <Check x={940} y={512} size={78} draw={p(21.1)} />
      <Text x={970} y={640} size={30} align="center" width={300} draw={p(21.2)} tone="sage" style={{left: 820}}>
        still fine
      </Text>

      {/* speed */}
      <Rect x={240} y={330} w={410} h={185} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(21.4)} seed={601} />
      <Text x={268} y={352} size={36} draw={p(21.5)}>
        speed
      </Text>
      <Path d="M 300 475 Q 420 340 540 475" stroke={COLORS.ink} strokeWidth={3} draw={p(21.6)} seed={602} />
      <Line x1={420} y1={470} x2={492} y2={390} stroke={COLORS.sage} strokeWidth={4.5} draw={p(21.8)} seed={603} />
      <Circle cx={420} cy={470} d={14} fill={COLORS.ink} draw={p(21.75)} seed={604} />

      {/* heat */}
      <Rect x={240} y={580} w={410} h={185} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(22.6)} seed={605} />
      <Text x={268} y={602} size={36} draw={p(22.7)}>
        heat
      </Text>
      <Rect x={300} y={638} w={34} h={80} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.8} draw={p(22.8)} seed={606} />
      <Circle cx={317} cy={728} d={58} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.8} draw={p(22.85)} seed={607} />
      <Rect x={306} y={694} w={22} h={32} fill={COLORS.sage} stroke="none" draw={p(23.0)} seed={608} />
      <Text x={380} y={694} size={48} draw={p(23.1)} tone="sage">
        22°
      </Text>

      {/* battery */}
      <Rect x={1240} y={430} w={410} h={215} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(23.6)} seed={609} />
      <Text x={1268} y={452} size={36} draw={p(23.7)}>
        battery
      </Text>
      <Rect x={1290} y={528} w={250} h={54} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(23.8)} seed={610} />
      <Rect x={1298} y={536} w={190} h={38} fill={COLORS.sage} stroke="none" draw={p(24.0)} seed={611} />
      <Line x1={1540} y1={544} x2={1540} y2={566} stroke={COLORS.ink} strokeWidth={7} draw={p(23.9)} seed={612} />
      <Text x={1415} y={588} size={25} align="center" width={260} draw={p(24.4)} tone="sage" style={{left: 1290}}>
        past lunch
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const HowQuestion: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="The question">
      <Phone x={760} y={300} w={250} h={460} draw={p(26.4, 0.9)} screenFill={COLORS.screen} />
      <DotGrid x={800} y={380} cols={5} rows={5} gap={26} r={3} progress={p(26.5)} opacity={0.6} />
      <Bean x={600} y={450} h={170} draw={p(26.4)} face="worried" arms="out" />
      <Text x={1090} y={310} size={170} font="label" draw={p(27.1, 0.7)}>
        How?
      </Text>
      <Line x1={1110} y1={560} x2={1110 + 340 * p(27.4)} y2={552} stroke={COLORS.red} strokeWidth={4} draw={p(27.4)} seed={701} />
      <Text x={1100} y={620} size={34} tone="faint" draw={p(27.6)}>
        not one big trick
      </Text>
      {[0, 1, 2].map((i) => (
        <Text key={i} x={690 + i * 40} y={320 - i * 50} size={50 + i * 12} tone="faint" draw={p(26.8 + i * 0.1)} opacity={0.7}>
          ?
        </Text>
      ))}
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const Decisions: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);
  const spread = progress(t, 32.9, 1.5, easeOut);

  return (
    <Stage eyebrow="The method">
      <Text x={120} y={128} size={76} draw={p(29.3)}>
        A pile of small decisions
      </Text>
      <Text x={124} y={222} size={28} tone="faint" draw={p(29.6)}>
        one by one, in plain words
      </Text>

      {Array.from({length: 6}).map((_, i) => {
        const finalX = 230 + i * 195;
        const startX = 280 + i * 9;
        const x = mix(startX, finalX, spread);
        const y = mix(420 + i * 8, 420, spread);
        const d = p(29.3 + i * 0.08, 0.5);
        return (
          <div key={i} style={{opacity: d}}>
            <Rect x={x} y={y} w={175} h={240} fill={i % 2 === 0 ? COLORS.card : COLORS.sand} stroke={COLORS.ink} strokeWidth={2.8} draw={d} seed={720 + i} />
            <Text x={x + 20} y={y + 18} size={30} tone="faint" draw={d}>
              0{i + 1}
            </Text>
            {Array.from({length: 3}).map((__, k) => (
              <Line key={k} x1={x + 20} y1={y + 100 + k * 28} x2={x + (k === 1 ? 120 : 148)} y2={y + 98 + k * 28} stroke={COLORS.ink} strokeWidth={2.2} draw={p(29.6 + i * 0.08)} seed={740 + i * 4 + k} opacity={0.55} />
            ))}
            <Circle cx={x + 40} cy={y + 210} d={10} fill={i < 2 ? COLORS.red : COLORS.sage} draw={d} seed={760 + i} />
          </div>
        );
      })}

      <Text x={1490} y={430} size={54} draw={p(36.9, 0.8)}>
        worth
      </Text>
      <Text x={1490} y={492} size={54} draw={p(37.1, 0.8)}>
        knowing
      </Text>
      <Line x1={1492} y1={560} x2={1492 + 250 * p(37.3)} y2={556} stroke={COLORS.sage} strokeWidth={4} draw={p(37.3)} seed={770} />

      <Text x={1490} y={650} size={28} tone="faint" draw={p(38.4, 0.8)}>
        thinking with
      </Text>
      <Text x={1490} y={688} size={36} tone="sage" draw={p(38.6, 0.8)}>
        little to work with
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const Tokens: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="Start with the problem">
      <Text x={120} y={122} size={72} draw={p(43.4)}>
        Tokens, not words
      </Text>
      <Text x={124} y={208} size={27} tone="faint" draw={p(43.6)}>
        the model reads in pieces
      </Text>

      <div style={{opacity: 1 - p(43.7, 0.4)}}>
        <Rect x={240} y={240} w={560} h={180} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.6} draw={p(41.7, 0.3)} seed={790} />
        {Array.from({length: 5}).map((_, i) => (
          <Line key={i} x1={280} y1={284 + i * 26} x2={280 + (i === 1 ? 360 : 460)} y2={282 + i * 26} stroke={COLORS.ink} strokeWidth={2.1} draw={p(41.75 + i * 0.03, 0.25)} seed={791 + i} opacity={0.55} />
        ))}
      </div>

      <Text x={150} y={270} size={30} tone="faint" draw={p(44.0)}>
        in
      </Text>
      {[
        {x: 220, label: 'The'},
        {x: 390, label: 'cat'},
        {x: 560, label: 'sat.'},
      ].map((b, i) => (
        <Token key={b.label} x={b.x} y={270} w={150} h={78} label={b.label} draw={p(44.0 + i * 0.08)} seed={801 + i} />
      ))}

      <Arrow x1={470} y1={355} x2={470} y2={424} color={COLORS.ink} width={3} draw={p(50.9)} seed={810} />
      <Text x={150} y={500} size={32} tone="faint" draw={p(54.7)}>
        layers
      </Text>
      <Arrow x1={300} y1={500} x2={350} y2={500} color={COLORS.ink} width={2.6} draw={p(54.8)} seed={811} />
      {Array.from({length: 4}).map((_, i) => (
        <Rect
          key={i}
          x={350}
          y={432 + i * 46}
          w={430}
          h={32}
          fill={i === 1 ? COLORS.sand : COLORS.card}
          stroke={COLORS.ink}
          strokeWidth={2.4}
          draw={p(54.7 + i * 0.14)}
          seed={815 + i}
        />
      ))}
      <Arrow x1={665} y1={628} x2={665} y2={712} color={COLORS.ink} width={3} draw={p(55.5)} seed={820} />

      <Text x={190} y={778} size={30} tone="faint" draw={p(51.8)}>
        out
      </Text>
      {[
        {x: 250, label: 'The'},
        {x: 420, label: 'cat'},
        {x: 590, label: 'sat'},
        {x: 760, label: 'on'},
      ].map((b, i) => (
        <Token key={b.label} x={b.x} y={770} w={150} h={76} label={b.label} draw={p(51.8 + i * 0.08)} fill={i === 3 ? COLORS.sand : COLORS.card} seed={830 + i} />
      ))}

      {/* examples on the right */}
      <Text x={1040} y={294} size={26} tone="faint" draw={p(46.9)}>
        one word
      </Text>
      <Token x={1040} y={340} w={180} h={78} label="cat" draw={p(47.24)} seed={840} />
      <Text x={1260} y={370} size={28} tone="sage" draw={p(47.5)}>
        whole word
      </Text>

      <Text x={1040} y={494} size={26} tone="faint" draw={p(48.0)}>
        pieces
      </Text>
      {[
        {x: 1040, label: 'un'},
        {x: 1175, label: 'believ'},
        {x: 1350, label: 'able'},
      ].map((b, i) => (
        <Token key={b.label} x={b.x} y={540} w={i === 1 ? 155 : 120} h={78} label={b.label} draw={p(48.1 + i * 0.08)} seed={845 + i} size={30} />
      ))}
      <Text x={1510} y={570} size={28} tone="sage" draw={p(48.4)}>
        word parts
      </Text>

      <Text x={1040} y={704} size={26} tone="faint" draw={p(49.0)}>
        punctuation
      </Text>
      <Token x={1040} y={748} w={100} h={78} label="!" draw={p(49.4)} seed={850} fill={COLORS.sand} />
      <Text x={1180} y={778} size={28} tone="sage" draw={p(49.6)}>
        its own token
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const TwoWalls: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);
  return (
    <Stage eyebrow="The problem, in two words">
      <Text x={120} y={128} size={76} draw={p(57.7)}>
        Two walls
      </Text>
      <BrickWall x={560} y={300} w={330} h={360} draw={p(57.9)} seed={901} />
      <BrickWall x={1030} y={300} w={330} h={360} draw={p(58.0)} seed={921} />
      <Text x={725} y={700} size={54} align="center" width={330} draw={p(58.3)} style={{left: 560}}>
        space
      </Text>
      <Text x={1195} y={700} size={54} align="center" width={330} draw={p(58.4)} style={{left: 1030}}>
        speed
      </Text>
      <Text x={960} y={790} size={31} align="center" width={900} tone="faint" draw={p(58.5)} style={{left: 510}}>
        memory size, and how fast data moves
      </Text>
    </Stage>
  );
};

export {BrickWall};
