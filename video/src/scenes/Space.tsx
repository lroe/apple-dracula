import React from 'react';
import {COLORS, easeOut, progress} from '../lib/theme';
import {Arrow, Circle, DotGrid, Line, Path, Rect} from '../lib/rough';
import {Bean, Box, Check, Chip, Cross, Hat, Phone, Text} from '../components/primitives';
import {BrickWall} from './Intro';
import {GroundLine, Stage, useSceneTime, type SceneProps} from '../components/Stage';

const pF = (t: number, start: number, cue: number, dur = 0.55) =>
  progress(t, cue <= start + 1.6 ? cue - 1.6 : cue, dur, easeOut);

const Clock: React.FC<{x: number; y: number; r?: number; draw?: number; handAngle?: number; tone?: string}> = ({
  x,
  y,
  r = 54,
  draw = 1,
  handAngle = -0.6,
  tone = COLORS.ink,
}) => (
  <>
    <Circle cx={x} cy={y} d={r * 2} stroke={tone} strokeWidth={3.2} draw={draw} seed={1001} />
    <Line x1={x} y1={y} x2={x + Math.cos(-Math.PI / 2) * r * 0.62} y2={y + Math.sin(-Math.PI / 2) * r * 0.62} stroke={tone} strokeWidth={3.2} draw={draw} seed={1002} />
    <Line x1={x} y1={y} x2={x + Math.cos(handAngle) * r * 0.78} y2={y + Math.sin(handAngle) * r * 0.78} stroke={tone} strokeWidth={3.2} draw={draw} seed={1003} />
    <Circle cx={x} cy={y} d={8} fill={tone} stroke={tone} strokeWidth={1} draw={draw} seed={1004} />
  </>
);

/* ------------------------------------------------------------------ */
export const Space: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="Wall one">
      <Text x={120} y={128} size={76} draw={p(60.2)}>
        The first wall: space
      </Text>
      <Text x={124} y={222} size={28} tone="faint" draw={p(60.5)}>
        how much memory the model needs
      </Text>

      <Text x={980} y={250} size={96} font="title" draw={p(65.18, 0.7)}>
        almost 6 GB
      </Text>
      <Text x={986} y={360} size={28} tone="red" draw={p(65.8, 0.7)}>
        16-bit weights alone
      </Text>

      <Text x={240} y={396} size={27} tone="faint" draw={p(60.2)}>
        phone memory · 8 GB
      </Text>
      <Rect x={240} y={448} w={1440} h={170} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(60.1)} seed={1011} />

      <Rect x={248} y={456} w={1060} h={154} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={2.8} draw={p(62.0)} seed={1012} />
      <Text x={300} y={478} size={37} draw={p(62.2)}>
        3B weights
      </Text>
      <Text x={300} y={530} size={26} tone="faint" draw={p(63.6)}>
        16-bit precision
      </Text>
      <Text x={990} y={488} size={66} font="title" draw={p(65.2)}>
        6 GB
      </Text>

      <Text x={1308} y={480} size={30} align="center" width={372} draw={p(61.4)} tone="sage" style={{left: 1308}}>
        2 GB
      </Text>
      <Text x={1308} y={526} size={26} align="center" width={372} draw={p(61.6)} tone="faint" style={{left: 1308}}>
        free
      </Text>

      <Text x={500} y={708} size={38} tone="red" draw={p(66.9, 0.7)}>
        and that's before anything else
      </Text>
      <Line x1={500} y1={760} x2={500 + 760 * p(67.2)} y2={756} stroke={COLORS.red} strokeWidth={2.5} draw={p(67.2)} seed={1013} opacity={0.55} />
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const OtherMemory: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  const needs = [
    {x: 240, label: 'prompt', cue: 69.52},
    {x: 512, label: 'calculations', cue: 71.24},
    {x: 800, label: 'temp results', cue: 72.3},
    {x: 1088, label: 'OS', cue: 73.86},
    {x: 1336, label: 'apps', cue: 76.04},
  ];

  return (
    <Stage eyebrow="The same 8 GB">
      <Text x={120} y={128} size={76} draw={p(68.8)}>
        And everything else
      </Text>
      <Text x={124} y={222} size={28} tone="faint" draw={p(69.0)}>
        prompt, calculations, OS, apps
      </Text>

      <Text x={240} y={320} size={27} tone="faint" draw={p(68.9)}>
        phone memory · 8 GB
      </Text>
      <Rect x={240} y={372} w={1440} h={160} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(68.8)} seed={1101} />
      <Rect x={248} y={380} w={1060} h={144} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={2.8} draw={p(68.9)} seed={1102} />
      <Text x={300} y={402} size={34} draw={p(69.0)}>
        model
      </Text>
      <Text x={300} y={450} size={26} tone="faint" draw={p(69.0)}>
        6 GB
      </Text>
      <Text x={1308} y={414} size={30} align="center" width={372} tone="sage" draw={p(68.95)} style={{left: 1308}}>
        2 GB free
      </Text>
      <Text x={1308} y={462} size={24} align="center" width={372} tone="faint" draw={p(69.0)} style={{left: 1308}}>
        before the rest
      </Text>

      {needs.map((n, i) => (
        <React.Fragment key={n.label}>
          <Rect x={n.x} y={632} w={238} h={104} fill={i % 2 === 0 ? COLORS.card : COLORS.sand} stroke={COLORS.ink} strokeWidth={2.8} draw={p(n.cue + 0.05)} seed={1110 + i} />
          <Text x={n.x} y={660} size={25} align="center" width={238} draw={p(n.cue + 0.1)} style={{left: n.x}}>
            {n.label}
          </Text>
        </React.Fragment>
      ))}

      <Line x1={240} y1={612} x2={1574} y2={612} stroke={COLORS.red} strokeWidth={2.6} draw={p(75.8, 0.6)} seed={1118} />
      <Line x1={240} y1={604} x2={240} y2={612} stroke={COLORS.red} strokeWidth={2.6} draw={p(75.8)} seed={1119} />
      <Line x1={1574} y1={604} x2={1574} y2={612} stroke={COLORS.red} strokeWidth={2.6} draw={p(75.8)} seed={1120} />
      <Arrow x1={1494} y1={608} x2={1494} y2={538} color={COLORS.red} width={3.2} draw={p(76.0, 0.7)} seed={1121} />
      <Text x={1250} y={560} size={25} tone="red" draw={p(76.2)}>
        also needs room
      </Text>

      <Text x={960} y={790} size={40} align="center" width={1200} tone="red" draw={p(78.2, 0.7)} style={{left: 360}}>
        the model can't have the whole house
      </Text>

      <Path d="M 1500 330 L 1500 290 L 1565 248 L 1630 290 L 1630 330 Z" stroke={COLORS.red} strokeWidth={3.4} draw={p(79.4)} seed={1130} />
      <Line x1={1520} y1={276} x2={1604} y2={326} stroke={COLORS.red} strokeWidth={4} draw={p(79.5)} seed={1131} />
      <Line x1={1610} y1={276} x2={1526} y2={326} stroke={COLORS.red} strokeWidth={4} draw={p(79.55)} seed={1132} />
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const Speed: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="Wall two">
      <Text x={120} y={128} size={76} draw={p(80.8)}>
        The second wall: speed
      </Text>
      <Text x={124} y={222} size={28} tone="faint" draw={p(81.0)}>
        how fast data can move
      </Text>

      <Rect x={220} y={400} w={300} h={290} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={3.2} draw={p(80.9)} seed={1201} />
      <Text x={220} y={352} size={34} align="center" width={300} draw={p(81.0)} style={{left: 220}}>
        memory
      </Text>
      <DotGrid x={252} y={448} cols={3} rows={3} gap={40} r={5} progress={p(81.0)} opacity={0.65} />

      <Chip x={1080} y={400} w={300} h={290} label="chip" sub="very fast" draw={p(81.2)} seed={1210} />
      <Text x={1080} y={724} size={27} align="center" width={300} tone="faint" draw={p(81.4)} style={{left: 1080}}>
        only waits for data
      </Text>

      {[0, 1, 2].map((i) => (
        <Arrow
          key={i}
          x1={540}
          y1={468 + i * 76}
          x2={1072}
          y2={468 + i * 76}
          color={COLORS.ink}
          width={3}
          draw={p(87.2 + i * 0.25, 0.55)}
          seed={1220 + i}
        />
      ))}
      <Text x={700} y={640} size={34} draw={p(87.5)}>
        numbers, again and again
      </Text>

      <Clock x={1460} y={250} r={60} draw={p(89.6)} handAngle={0.6} tone={COLORS.red} />
      <Text x={1390} y={338} size={35} tone="red" draw={p(89.9)}>
        waiting
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const Chef: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="A kitchen, basically">
      <GroundLine y={870} draw={p(92.0)} />
      <Text x={120} y={128} size={76} draw={p(92.1)}>
        A fast chef, a slow helper
      </Text>
      <Text x={124} y={222} size={28} tone="faint" draw={p(92.3)}>
        the kitchen is only as fast as the ingredients
      </Text>

      {/* pantry */}
      <Rect x={160} y={500} w={240} h={260} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(92.6)} seed={1301} />
      <Line x1={160} y1={580} x2={400} y2={580} stroke={COLORS.ink} strokeWidth={2.5} draw={p(92.7)} seed={1302} />
      <Line x1={160} y1={720} x2={400} y2={720} stroke={COLORS.ink} strokeWidth={2.5} draw={p(92.75)} seed={1303} />
      <Text x={160} y={452} size={30} align="center" width={240} draw={p(92.8)} style={{left: 160}}>
        memory
      </Text>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Rect key={i} x={180 + (i % 3) * 70} y={530 + Math.floor(i / 3) * 70} w={52} h={38} fill={i % 2 === 0 ? COLORS.sand : COLORS.card} stroke={COLORS.ink} strokeWidth={2} draw={p(92.85 + i * 0.03)} seed={1310 + i} />
      ))}

      {/* helper carrying box */}
      <Bean x={620} y={560} h={140} draw={p(93.3)} face="neutral" arms="carry" />
      <Box x={650} y={610} w={76} h={54} draw={p(93.6)} seed={1320} />
      <Text x={620} y={730} size={27} align="center" width={220} draw={p(93.8)} tone="faint" style={{left: 510}}>
        helper
      </Text>
      <Text x={560} y={794} size={27} tone="faint" draw={p(95.6)}>
        ingredients
      </Text>

      {/* chef */}
      <Hat x={1110} y={512} w={110} color={COLORS.sand} draw={p(94.0)} />
      <Bean x={1110} y={515} h={160} draw={p(94.0)} face="worried" arms="out" />
      <Text x={1110} y={730} size={30} align="center" width={240} draw={p(94.2)} style={{left: 990}}>
        chef
      </Text>
      <Text x={1110} y={770} size={24} tone="sage" align="center" width={240} draw={p(94.3)} style={{left: 990}}>
        fast
      </Text>

      <Clock x={1420} y={340} r={54} draw={p(96.0)} handAngle={1.4} tone={COLORS.red} />
      <Text x={1350} y={430} size={32} tone="red" draw={p(96.2)}>
        waiting
      </Text>

      <Arrow x1={430} y1={690} x2={560} y2={690} color={COLORS.ink} width={2.8} draw={p(95.2)} seed={1340} />
      <Arrow x1={770} y1={690} x2={1020} y2={690} color={COLORS.ink} width={2.8} draw={p(95.4)} seed={1341} />

      <Text x={1240} y={810} size={33} tone="red" draw={p(97.4)}>
        most of the day, just standing
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const PhoneLimits: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="The real world">
      <Text x={120} y={128} size={76} draw={p(100.2)}>
        The rest of the phone
      </Text>
      <Text x={124} y={222} size={28} tone="faint" draw={p(100.4)}>
        battery, heat, and everything else
      </Text>

      <Phone x={820} y={240} w={300} h={570} draw={p(100.2, 0.9)} screenFill={COLORS.screen} />

      <Rect x={240} y={320} w={410} h={170} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(101.8)} seed={1401} />
      <Text x={268} y={342} size={34} draw={p(101.9)}>
        battery
      </Text>
      <Rect x={290} y={402} w={250} h={52} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.8} draw={p(102.0)} seed={1402} />
      <Rect x={298} y={410} w={196} h={36} fill={COLORS.sage} stroke="none" draw={p(102.2)} seed={1403} />
      <Text x={566} y={400} size={28} tone="sage" draw={p(102.3)}>
        78%
      </Text>

      <Rect x={240} y={570} w={410} h={170} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(102.7)} seed={1404} />
      <Text x={268} y={592} size={34} draw={p(102.8)}>
        heat
      </Text>
      <Rect x={300} y={632} w={30} h={64} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.6} draw={p(102.9)} seed={1405} />
      <Circle cx={315} cy={708} d={52} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.6} draw={p(102.95)} seed={1406} />
      <Rect x={305} y={682} w={20} h={26} fill={COLORS.sage} stroke="none" draw={p(103.0)} seed={1407} />
      <Text x={370} y={670} size={44} tone="sage" draw={p(103.1)}>
        22°
      </Text>

      <Rect x={1240} y={400} w={410} h={230} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(105.6)} seed={1408} />
      <Text x={1268} y={422} size={34} draw={p(105.7)}>
        your app
      </Text>
      <Rect x={1268} y={462} w={354} h={138} fill={COLORS.screen} stroke={COLORS.ink} strokeWidth={2.2} draw={p(105.8)} seed={1409} />
      {[0, 1, 2].map((i) => (
        <Circle key={i} cx={1380 + i * 60} cy={530} d={20} fill={i === 1 ? COLORS.sage : COLORS.ink} draw={p(106.0 + i * 0.1)} seed={1410 + i} />
      ))}
      <Text x={1445} y={555} size={25} align="center" width={280} tone="sage" draw={p(106.4)} style={{left: 1305}}>
        responsive
      </Text>

      <Cross x={970} y={485} size={120} draw={p(107.7, 0.7)} />
      <Text x={970} y={620} size={50} align="center" width={300} tone="red" draw={p(108.0, 0.7)} style={{left: 820}}>
        never freeze
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const WallsRecap: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="The rules">
      <Text x={120} y={128} size={76} draw={p(110.0)}>
        Every trick goes after one
      </Text>
      <Text x={124} y={222} size={28} tone="faint" draw={p(110.2)}>
        memory size, or data speed
      </Text>

      <BrickWall x={450} y={330} w={320} h={340} draw={p(110.0)} seed={1501} />
      <BrickWall x={1150} y={330} w={320} h={340} draw={p(110.1)} seed={1521} />
      <Text x={450} y={706} size={46} align="center" width={320} draw={p(111.2)} style={{left: 450}}>
        memory size
      </Text>
      <Text x={1150} y={706} size={46} align="center" width={320} draw={p(111.3)} style={{left: 1150}}>
        data speed
      </Text>

      <Text x={820} y={820} size={36} align="center" width={280} draw={p(114.1)} style={{left: 820}}>
        every trick
      </Text>
      <Arrow x1={900} y1={790} x2={790} y2={520} color={COLORS.red} width={3.2} draw={p(114.3)} seed={1540} />
      <Arrow x1={1020} y1={790} x2={1130} y2={520} color={COLORS.red} width={3.2} draw={p(114.4)} seed={1541} />
    </Stage>
  );
};
