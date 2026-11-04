import React from 'react';
import {COLORS, easeOut, progress} from '../lib/theme';
import {Arrow, Circle, Line, Path, Rect} from '../lib/rough';
import {Bean, Check, Chip, Cloud, Cross, Phone, Text} from '../components/primitives';
import {GroundLine, Stage, useSceneTime, type SceneProps} from '../components/Stage';

const pF = (t: number, start: number, cue: number, dur = 0.55) =>
  progress(t, cue <= start + 1.6 ? cue - 1.6 : cue, dur, easeOut);

const MiniGrid: React.FC<{
  x: number;
  y: number;
  cols: number;
  rows: number;
  cell: number;
  gap: number;
  active?: number[];
  draw?: number;
  faint?: boolean;
  tone?: string;
}> = ({x, y, cols, rows, cell, gap, active = [], draw = 1, faint = false}) => (
  <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0, opacity: draw}}>
    {Array.from({length: cols * rows}).map((_, i) => {
      const r = Math.floor(i / cols);
      const c = i % cols;
      const isOn = active.includes(i);
      return (
        <rect
          key={i}
          x={x + c * (cell + gap)}
          y={y + r * (cell + gap)}
          width={cell}
          height={cell}
          rx={4}
          fill={isOn ? COLORS.sage : faint ? COLORS.card : COLORS.sand}
          stroke={isOn ? COLORS.ink : faint ? COLORS.faint : COLORS.ink}
          strokeWidth={isOn ? 2.2 : 1.4}
          opacity={isOn ? 1 : faint ? 0.5 : 0.75}
          strokeDasharray={faint && !isOn ? '6 5' : undefined}
        />
      );
    })}
  </svg>
);

/* ------------------------------------------------------------------ */
export const New2026: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="What's new">
      <Text x={120} y={128} size={76} draw={p(563.5)}>
        New in 2026
      </Text>
      <Text x={124} y={222} size={28} tone="faint" draw={p(563.7)}>
        the same idea, updated
      </Text>

      <Rect x={1480} y={130} w={260} h={170} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.0} draw={p(563.6)} seed={6201} />
      <Line x1={1520} y1={130} x2={1520} y2={98} stroke={COLORS.ink} strokeWidth={3} draw={p(563.7)} seed={6202} />
      <Line x1={1700} y1={130} x2={1700} y2={98} stroke={COLORS.ink} strokeWidth={3} draw={p(563.7)} seed={6203} />
      <Text x={1480} y={166} size={76} align="center" width={260} font="title" draw={p(563.8)} style={{left: 1480}}>
        2026
      </Text>

      <Rect x={240} y={350} w={540} h={430} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(569.2)} seed={6210} />
      <Text x={270} y={380} size={40} draw={p(569.3)}>
        AFM3 Core
      </Text>
      <Text x={270} y={486} size={150} font="title" draw={p(569.4)}>
        3B
      </Text>
      <Text x={270} y={650} size={28} tone="faint" draw={p(569.5)}>
        dense, small, on-device
      </Text>
      <Phone x={630} y={500} w={90} h={180} draw={p(570.0)} screenFill={COLORS.screen} />

      <Rect x={1000} y={350} w={540} h={430} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(573.7)} seed={6211} />
      <Text x={1030} y={380} size={40} draw={p(573.8)}>
        Core Advanced
      </Text>
      <Text x={1030} y={470} size={28} tone="faint" draw={p(574.0)}>
        the larger sibling
      </Text>
      <MiniGrid x={1220} y={520} cols={4} rows={3} cell={36} gap={8} active={[1, 5, 9]} draw={p(574.2)} faint />
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const Sparse: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="Dense vs sparse">
      <Text x={120} y={128} size={74} draw={p(576.98)}>
        Two shapes of a model
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(577.2)}>
        dense works everywhere, sparse picks experts
      </Text>

      <Rect x={170} y={300} w={720} h={520} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(577.3)} seed={6301} />
      <Text x={200} y={320} size={34} draw={p(582.0)}>
        dense
      </Text>
      <Text x={200} y={368} size={25} tone="faint" draw={p(582.1)}>
        every parameter, every token
      </Text>
      <MiniGrid x={300} y={420} cols={8} rows={5} cell={54} gap={8} draw={p(582.2)} />

      <Rect x={1030} y={300} w={720} h={520} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(577.3)} seed={6310} />
      <Text x={1060} y={320} size={34} draw={p(586.1)}>
        sparse
      </Text>
      <Text x={1060} y={368} size={25} tone="faint" draw={p(586.2)}>
        lots of small specialists
      </Text>
      <MiniGrid x={1160} y={420} cols={8} rows={5} cell={54} gap={8} active={[13, 29, 37]} draw={p(586.3)} faint />

      <Text x={170} y={880} size={28} tone="red" draw={p(584.3)}>
        all work, all the time
      </Text>
      <Text x={1030} y={880} size={28} tone="sage" draw={p(591.3)}>
        only the needed experts wake
      </Text>
      <Text x={1030} y={920} size={24} tone="faint" draw={p(593.6)}>
        the rest sit idle
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const Hospital: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="The hospital metaphor">
      <Text x={120} y={128} size={74} draw={p(596.0)}>
        A hospital of experts
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(596.1)}>
        hundreds inside, a few on your case
      </Text>

      <Rect x={420} y={260} w={940} h={500} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.4} draw={p(596.1)} seed={6401} />
      <Rect x={790} y={228} w={200} h={60} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.8} draw={p(596.2)} seed={6402} />
      <Text x={890} y={240} size={34} align="center" width={200} draw={p(596.3)} style={{left: 790}}>
        hospital
      </Text>
      <Line x1={870} y1={300} x2={870} y2={360} stroke={COLORS.red} strokeWidth={10} draw={p(596.4)} seed={6403} />
      <Line x1={840} y1={330} x2={900} y2={330} stroke={COLORS.red} strokeWidth={10} draw={p(596.45)} seed={6404} />

      {Array.from({length: 18}).map((_, i) => {
        const active = [4, 11, 15].includes(i);
        return (
          <Rect
            key={i}
            x={480 + (i % 6) * 140}
            y={410 + Math.floor(i / 6) * 100}
            w={76}
            h={58}
            fill={active ? COLORS.sage : COLORS.sand}
            stroke={COLORS.ink}
            strokeWidth={2.2}
            draw={p(596.6 + i * 0.02)}
            seed={6410 + i}
            opacity={active ? 1 : 0.55}
          />
        );
      })}
      <Rect x={830} y={670} w={120} h={90} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(596.8)} seed={6440} />
      <Text x={890} y={694} size={26} align="center" width={120} draw={p(596.9)} style={{left: 830}}>
        door
      </Text>

      <Bean x={250} y={620} h={130} draw={p(597.0)} face="worried" arms="out" />
      <Text x={180} y={790} size={28} tone="faint" draw={p(597.2)}>
        one problem
      </Text>
      <Arrow x1={350} y1={700} x2={410} y2={700} color={COLORS.sage} width={3} draw={p(597.4)} seed={6450} />

      <Text x={1120} y={800} size={32} tone="sage" draw={p(599.1)}>
        two or three doctors
      </Text>
      <Text x={500} y={820} size={27} tone="faint" draw={p(596.9)}>
        hundreds of doctors inside
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const TwentyB: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="Core Advanced">
      <Text x={120} y={128} size={74} draw={p(601.5)}>
        Big model, small bill
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(601.7)}>
        20B total, only 1–4B awake
      </Text>

      <Rect x={200} y={320} w={380} h={320} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(601.8)} seed={6501} />
      <MiniGrid x={240} y={360} cols={5} rows={4} cell={54} gap={10} active={[2, 9, 16, 23]} draw={p(601.9)} faint />
      <Text x={200} y={676} size={28} tone="faint" draw={p(602.0)}>
        20 experts in total
      </Text>

      <Text x={920} y={390} size={30} draw={p(602.5)}>
        total
      </Text>
      <Rect x={920} y={430} w={620} h={64} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={2.8} draw={p(602.6)} seed={6510} />
      <Text x={1120} y={448} size={30} align="center" width={620} draw={p(602.7)} style={{left: 920}}>
        20B parameters
      </Text>

      <Text x={920} y={560} size={30} draw={p(605.4)}>
        awake
      </Text>
      <Rect x={920} y={600} w={160} h={64} fill={COLORS.sage} stroke={COLORS.ink} strokeWidth={2.8} draw={p(605.5)} seed={6511} />
      <Text x={920} y={618} size={25} align="center" width={160} draw={p(605.6)} color={COLORS.paper} style={{left: 920}}>
        1–4B
      </Text>
      <Text x={1110} y={624} size={26} tone="sage" draw={p(605.7)}>
        depending on the chip
      </Text>

      <Rect x={920} y={720} w={520} h={16} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.2} draw={p(608.2)} seed={6512} />
      <Circle cx={1040} cy={728} d={40} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={2.4} draw={p(608.3)} seed={6513} />
      <Text x={920} y={780} size={25} tone="faint" draw={p(608.4)}>
        Apple Silicon sets the budget
      </Text>

      <Text x={920} y={840} size={30} draw={p(610.9)}>
        knowledge of a big model
      </Text>
      <Text x={920} y={882} size={30} tone="sage" draw={p(612.6)}>
        running cost of a small one
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const Storage: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="Storage">
      <Text x={120} y={128} size={74} draw={p(614.7)}>
        Load only what you need
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(614.9)}>
        the whole model is on flash
      </Text>

      <Rect x={220} y={320} w={440} h={420} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(615.0)} seed={6601} />
      <Text x={220} y={274} size={28} align="center" width={440} tone="faint" draw={p(615.1)} style={{left: 220}}>
        flash storage
      </Text>
      <MiniGrid x={260} y={360} cols={6} rows={5} cell={54} gap={10} active={[5, 17, 29]} draw={p(615.2)} faint />

      <Rect x={1200} y={340} w={420} h={280} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(619.3)} seed={6610} />
      <Text x={1200} y={294} size={28} align="center" width={420} tone="faint" draw={p(619.4)} style={{left: 1200}}>
        phone memory
      </Text>
      <MiniGrid x={1240} y={380} cols={4} rows={3} cell={64} gap={12} active={[1, 5, 9]} draw={p(619.5)} faint />

      <Arrow x1={680} y1={520} x2={1180} y2={520} color={COLORS.sage} width={3.4} draw={p(619.3)} seed={6620} />
      <Text x={760} y={480} size={27} tone="sage" draw={p(619.5)}>
        per prompt, not per token
      </Text>

      <Rect x={780} y={790} w={140} h={58} fill={COLORS.card} stroke={COLORS.red} strokeWidth={2.8} draw={p(623.1)} seed={6630} />
      <Text x={780} y={800} size={25} align="center" width={140} draw={p(623.2)}>
        token
      </Text>
      <Cross x={850} y={819} size={48} draw={p(623.4)} />
      <Text x={960} y={804} size={26} tone="red" draw={p(623.5)}>
        no swapping for every token
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const Library: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="The basement">
      <GroundLine y={860} draw={p(626.7)} />
      <Text x={120} y={128} size={74} draw={p(627.1)}>
        A huge library downstairs
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(627.3)}>
        with a few books on your desk
      </Text>

      <Rect x={180} y={320} w={760} h={500} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(626.7)} seed={6701} />
      {[0, 1, 2, 3].map((s) => (
        <Line key={s} x1={180} y1={440 + s * 95} x2={940} y2={440 + s * 95} stroke={COLORS.ink} strokeWidth={2.6} draw={p(626.9 + s * 0.05)} seed={6710 + s} opacity={0.75} />
      ))}
      {Array.from({length: 40}).map((_, i) => {
        const shelf = Math.floor(i / 10);
        const col = i % 10;
        return (
          <Rect
            key={i}
            x={220 + col * 68}
            y={360 + shelf * 95}
            w={18 + (i % 3) * 4}
            h={64 + (i % 4) * 6}
            fill={[COLORS.sand, COLORS.sage, COLORS.red, COLORS.card][i % 4]}
            stroke={COLORS.ink}
            strokeWidth={1.8}
            draw={p(627.8 + i * 0.015)}
            seed={6730 + i}
            opacity={0.85}
          />
        );
      })}

      <Rect x={1200} y={690} w={500} h={30} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={2.8} draw={p(630.4)} seed={6770} />
      <Line x1={1240} y1={720} x2={1240} y2={850} stroke={COLORS.ink} strokeWidth={3.2} draw={p(630.5)} seed={6771} />
      <Line x1={1660} y1={720} x2={1660} y2={850} stroke={COLORS.ink} strokeWidth={3.2} draw={p(630.5)} seed={6772} />
      {[0, 1, 2].map((i) => (
        <Rect key={i} x={1350} y={670 - i * 22} w={150} h={20} fill={[COLORS.red, COLORS.sage, COLORS.sand][i]} stroke={COLORS.ink} strokeWidth={1.8} draw={p(630.6 + i * 0.12)} seed={6780 + i} />
      ))}
      <Arrow x1={950} y1={640} x2={1188} y2={700} color={COLORS.sage} width={3} draw={p(629.2)} seed={6790} curve={-40} />
      <Text x={1020} y={600} size={26} tone="sage" draw={p(629.4)}>
        a few books
      </Text>
      <Text x={1200} y={880} size={30} tone="faint" draw={p(630.2)}>
        the desk
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const Nvidia: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="The cloud grew">
      <Text x={120} y={128} size={74} draw={p(632.2)}>
        Google Cloud joins in
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(632.4)}>
        PCC workloads on NVIDIA GPUs
      </Text>

      <Cloud x={500} y={250} w={980} h={540} draw={p(632.3)} seed={6801} />
      <Text x={620} y={320} size={28} tone="sage" draw={p(632.5)}>
        Private Cloud Compute
      </Text>

      <Rect x={760} y={390} w={340} h={260} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(635.0)} seed={6810} />
      <Chip x={800} y={430} w={260} h={160} label="NVIDIA" sub="GPU" draw={p(636.2)} seed={6811} />
      <Text x={1240} y={520} size={30} tone="sage" draw={p(636.8)}>
        Google Cloud
      </Text>
      <Text x={1240} y={570} size={24} tone="faint" draw={p(637.2)}>
        more capacity
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const ZoomOut: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="The one idea">
      <Text x={120} y={128} size={74} draw={p(639.4)}>
        Match power to the job
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(639.6)}>
        the model adapts to the resources it has
      </Text>

      <Phone x={200} y={380} w={260} h={470} draw={p(640.0)} screenFill={COLORS.screen} />
      <Text x={330} y={600} size={50} align="center" width={260} tone="faint" draw={p(646.4)} style={{left: 200}}>
        3B
      </Text>
      <Text x={200} y={880} size={28} align="center" width={260} tone="faint" draw={p(646.5)} style={{left: 200}}>
        small phone
      </Text>
      <Text x={200} y={920} size={26} align="center" width={260} tone="sage" draw={p(646.7)} style={{left: 200}}>
        squeezed model
      </Text>

      <Rect x={720} y={430} w={380} h={250} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(640.2)} seed={6901} />
      <Text x={720} y={476} size={36} align="center" width={380} draw={p(649.0)}>
        stronger device
      </Text>
      <MiniGrid x={780} y={540} cols={6} rows={2} cell={38} gap={8} active={[1, 4, 7, 10]} draw={p(649.2)} faint />
      <Text x={720} y={724} size={26} align="center" width={380} tone="sage" draw={p(649.4)} style={{left: 720}}>
        more experts
      </Text>

      <Cloud x={1340} y={360} w={420} h={280} draw={p(640.4)} seed={6910} />
      <Text x={1340} y={600} size={28} align="center" width={420} tone="faint" draw={p(651.6)} style={{left: 1340}}>
        hard request
      </Text>
      <Text x={1340} y={642} size={26} align="center" width={420} tone="sage" draw={p(651.8)} style={{left: 1340}}>
        cloud
      </Text>

      <Arrow x1={500} y1={620} x2={700} y2={620} color={COLORS.sage} width={3} draw={p(647.8)} seed={6920} />
      <Text x={520} y={580} size={24} tone="sage" draw={p(648.0)}>
        more capacity
      </Text>
      <Arrow x1={1120} y1={620} x2={1320} y2={620} color={COLORS.sage} width={3} draw={p(651.0)} seed={6921} />
      <Text x={1130} y={580} size={24} tone="sage" draw={p(651.2)}>
        harder jobs
      </Text>

      <Text x={960} y={820} size={34} align="center" width={900} draw={p(653.7)} style={{left: 510}}>
        no single model has to fit every situation
      </Text>
      <Text x={960} y={900} size={46} tone="sage" align="center" width={900} draw={p(656.9)} style={{left: 510}}>
        so the system adapts
      </Text>
    </Stage>
  );
};
