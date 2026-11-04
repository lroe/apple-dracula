import React from 'react';
import {COLORS, easeOut, progress} from '../lib/theme';
import {Arrow, Circle, Line, Path, Rect} from '../lib/rough';
import {Bean, Box, Check, Chip, Cross, Hat, Notebook, Text} from '../components/primitives';
import {ChapterCard} from '../components/ChapterCard';
import {GroundLine, Stage, useSceneTime, type SceneProps} from '../components/Stage';

const pF = (t: number, start: number, cue: number, dur = 0.55) =>
  progress(t, cue <= start + 1.6 ? cue - 1.6 : cue, dur, easeOut);

const Word: React.FC<{x: number; y: number; w?: number; label: string; draw?: number; fill?: string; seed?: number; size?: number}> = ({
  x,
  y,
  w = 130,
  label,
  draw = 1,
  fill = COLORS.card,
  seed = 4001,
  size = 26,
}) => (
  <>
    <Rect x={x} y={y} w={w} h={54} fill={fill} stroke={COLORS.ink} strokeWidth={2.4} draw={draw} seed={seed} />
    <Text x={x} y={y + 11} size={size} align="center" width={w} draw={draw}>
      {label}
    </Text>
  </>
);

/* ------------------------------------------------------------------ */
export const Trick2: React.FC<SceneProps> = ({start}) => (
  <ChapterCard start={start} number="02" title="No repeated homework" subtitle="the other half of memory" eyebrow="Trick two">
    <Notebook x={1250} y={390} w={230} h={280} draw={0.9} label="reuse the work" lines={5} seed={4101} />
  </ChapterCard>
);

/* ------------------------------------------------------------------ */
export const KV: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);
  const notebook = p(335.0, 0.8);
  const waste = p(331.0, 0.6) * (1 - notebook);

  return (
    <Stage eyebrow="Working memory">
      <Text x={120} y={128} size={74} draw={p(321.4)}>
        Look it up, don't redo it
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(321.6)}>
        the model needs its earlier work
      </Text>

      <Text x={200} y={270} size={27} tone="faint" draw={p(324.6)}>
        earlier tokens
      </Text>
      {['The', 'cat', 'sat', 'on', 'the'].map((w, i) => (
        <Word key={i} x={200} y={320 + i * 78} w={130} label={w} draw={p(324.7 + i * 0.08)} fill={i === 4 ? COLORS.sand : COLORS.card} seed={4110 + i} />
      ))}
      <Line x1={370} y1={300} x2={370} y2={730} stroke={COLORS.ink} strokeWidth={2.4} draw={p(326.4)} seed={4120} opacity={0.7} />
      <Arrow x1={394} y1={510} x2={790} y2={510} color={COLORS.sage} width={3.2} draw={p(328.5)} seed={4121} />
      <Text x={470} y={468} size={28} tone="sage" draw={p(328.7)}>
        needs all of them
      </Text>

      <Rect x={800} y={380} w={300} h={280} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={3.2} draw={p(322.0)} seed={4130} />
      <Text x={800} y={410} size={40} align="center" width={300} draw={p(322.1)}>
        model
      </Text>
      <Text x={800} y={490} size={65} align="center" width={300} draw={p(322.2)}>
        next token
      </Text>
      <Text x={800} y={590} size={25} align="center" width={300} tone="faint" draw={p(322.3)}>
        one step at a time
      </Text>

      {/* wasteful loop */}
      <div style={{opacity: waste}}>
        <Arrow x1={860} y1={680} x2={430} y2={700} color={COLORS.red} width={3.2} curve={-80} draw={p(331.0)} seed={4140} />
        <Cross x={640} y={748} size={40} draw={p(332.0)} />
        <Text x={470} y={800} size={30} tone="red" draw={p(332.2)}>
          recalculation wastes work
        </Text>
      </div>

      {/* notebook */}
      <div style={{opacity: notebook}}>
        <Rect x={1250} y={300} w={360} h={500} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={3.2} draw={p(335.1)} seed={4150} />
        <Line x1={1280} y1={300} x2={1280} y2={800} stroke={COLORS.ink} strokeWidth={2.4} draw={p(335.2)} seed={4151} />
        <Text x={1250} y={326} size={34} align="center" width={360} draw={p(335.3)}>
          KV cache
        </Text>
        {Array.from({length: 5}).map((_, i) => (
          <React.Fragment key={i}>
            <Text x={1300} y={380 + i * 76} size={26} draw={p(335.4 + i * 0.1)} tone="faint">
              {i + 1}
            </Text>
            <Line x1={1330} y1={400 + i * 76} x2={1560} y2={398 + i * 76} stroke={COLORS.ink} strokeWidth={2.2} draw={p(335.5 + i * 0.1)} seed={4160 + i} opacity={0.6} />
          </React.Fragment>
        ))}
        <Arrow x1={1242} y1={540} x2={1110} y2={540} color={COLORS.sage} width={3.2} draw={p(337.2)} seed={4170} />
        <Text x={1130} y={500} size={26} tone="sage" draw={p(337.4)}>
          look up
        </Text>
      </div>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const CacheGrows: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);
  const grow = progress(t, 346.46, 8.4, (x) => x);
  const overflow = p(354.8, 0.6);

  return (
    <Stage eyebrow="Why it still hurts">
      <Text x={120} y={128} size={74} draw={p(340.4)}>
        The notebook grows
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(340.6)}>
        weights fit, the cache can still overflow
      </Text>

      <Text x={260} y={342} size={30} draw={p(340.8)}>
        weights
      </Text>
      <Rect x={260} y={380} w={560} h={74} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={2.8} draw={p(340.9)} seed={4201} />
      <Text x={540} y={398} size={28} align="center" width={560} draw={p(341.0)} style={{left: 260}}>
        fixed size
      </Text>

      <Text x={260} y={486} size={30} draw={p(346.4)}>
        cache
      </Text>
      <Rect x={260} y={524} w={Math.max(80, 180 + 1120 * grow)} h={74} fill={COLORS.sage} stroke={COLORS.ink} strokeWidth={2.8} draw={p(346.5)} seed={4202} opacity={0.85} />
      <Text x={260} y={620} size={26} tone="sage" draw={p(346.8)}>
        grows with the document
      </Text>

      <Line x1={1500} y1={300} x2={1500} y2={720} stroke={COLORS.red} strokeWidth={3} draw={p(348.8)} seed={4203} dash={[10, 8]} />
      <Text x={1516} y={312} size={25} tone="red" draw={p(349.0)}>
        memory limit
      </Text>

      {overflow > 0 && (
        <Text x={900} y={680} size={36} tone="red" draw={overflow}>
          too fat for the phone
        </Text>
      )}

      <Text x={260} y={790} size={44} draw={p(358.6, 0.7)}>
        two targets
      </Text>
      <Circle cx={600} cy={900} d={100} stroke={COLORS.ink} strokeWidth={3} draw={p(359.0)} seed={4210} />
      <Circle cx={600} cy={900} d={30} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={2} draw={p(359.1)} seed={4211} />
      <Text x={600} y={980} size={30} align="center" width={220} draw={p(359.2)} style={{left: 490}}>
        weights
      </Text>
      <Circle cx={900} cy={900} d={100} stroke={COLORS.ink} strokeWidth={3} draw={p(359.3)} seed={4212} />
      <Circle cx={900} cy={900} d={30} fill={COLORS.sage} stroke={COLORS.ink} strokeWidth={2} draw={p(359.4)} seed={4213} />
      <Text x={900} y={980} size={30} align="center" width={220} draw={p(359.5)} style={{left: 790}}>
        cache
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const Building: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  const floors = 8;
  const top = 250;
  const height = 560;
  const fh = height / floors;

  return (
    <Stage eyebrow="Cross-layer sharing">
      <Text x={120} y={128} size={74} draw={p(362.7)}>
        Eight floors, five notebooks
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(362.9)}>
        the top floors read floor five
      </Text>

      <Rect x={480} y={top} w={420} h={height} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.4} draw={p(362.9)} seed={4301} />
      {Array.from({length: floors - 1}).map((_, i) => (
        <Line key={i} x1={480} y1={top + (i + 1) * fh} x2={900} y2={top + (i + 1) * fh} stroke={COLORS.ink} strokeWidth={2.2} draw={p(363.0 + i * 0.03)} seed={4310 + i} opacity={0.7} />
      ))}
      {Array.from({length: floors}).map((_, i) => {
        const floor = floors - i;
        return (
          <Text key={floor} x={430} y={top + i * fh + fh / 2 - 18} size={26} tone="faint" draw={p(363.2 + i * 0.03)}>
            {floor}
          </Text>
        );
      })}

      {[0, 1, 2, 3, 4].map((i) => {
        const y = top + (floors - 1 - i) * fh + 14;
        return <Notebook key={i} x={920} y={y} w={46} h={48} draw={p(373.2 + i * 0.1)} lines={2} seed={4330 + i} />;
      })}
      {[5, 6, 7].map((i) => {
        const y = top + (floors - 1 - i) * fh + 14;
        return <Rect key={i} x={920} y={y} w={46} h={48} fill={COLORS.card} stroke={COLORS.faint} strokeWidth={2.2} draw={p(375.5 + (i - 5) * 0.1)} seed={4340 + i} dash={[5, 5]} />;
      })}

      <Line x1={980} y1={top + 10} x2={980} y2={top + 3 * fh - 10} stroke={COLORS.sage} strokeWidth={2.6} draw={p(378.0)} seed={4350} />
      <Arrow x1={1000} y1={top + 3 * fh - 10} x2={970} y2={top + 3 * fh + 38} color={COLORS.sage} width={2.8} curve={30} draw={p(378.2)} seed={4351} />
      <Text x={1010} y={top + 2 * fh} size={26} tone="sage" draw={p(378.4)}>
        read floor 5
      </Text>

      <Text x={1180} y={300} size={100} font="title" draw={p(379.6, 0.7)}>
        3 of 8
      </Text>
      <Text x={1184} y={410} size={34} draw={p(380.0)}>
        notebooks gone
      </Text>
      <Text x={1184} y={486} size={38} draw={p(381.1)}>
        3 / 8 = 0.375
      </Text>
      <Text x={1184} y={552} size={40} tone="sage" draw={p(383.5, 0.7)}>
        37.5% less cache
      </Text>
      <Rect x={1184} y={620} w={420} h={54} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={2.6} draw={p(383.8)} seed={4360} />
      <Rect x={1184} y={620} w={420 * 0.625} h={54} fill={COLORS.sage} stroke={COLORS.ink} strokeWidth={2.6} draw={p(384.0)} seed={4361} />
      <Text x={1184} y={716} size={26} tone="faint" draw={p(384.2)}>
        cache after sharing
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const CacheLesson: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);
  return (
    <Stage eyebrow="The lesson for developers">
      <Text x={120} y={128} size={72} draw={p(387.8)}>
        Don't forget the cache
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(388.0)}>
        long inputs fill memory too
      </Text>
      <Rect x={180} y={300} w={400} h={470} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.8} draw={p(388.4)} seed={4401} />
      {Array.from({length: 12}).map((_, i) => (
        <Line key={i} x1={210} y1={350 + i * 32} x2={210 + (i % 4 === 0 ? 330 : 280)} y2={348 + i * 32} stroke={COLORS.ink} strokeWidth={2} draw={p(388.6 + i * 0.03)} seed={4410 + i} opacity={0.55} />
      ))}
      <Text x={180} y={800} size={28} tone="faint" draw={p(388.8)}>
        a long document
      </Text>
      <Arrow x1={600} y1={540} x2={790} y2={540} color={COLORS.red} width={3} draw={p(390.5)} seed={4420} />
      <Text x={880} y={420} size={30} draw={p(390.6)}>
        weights
      </Text>
      <Rect x={880} y={460} w={300} h={64} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={2.6} draw={p(390.7)} seed={4421} />
      <Text x={880} y={560} size={30} draw={p(390.8)}>
        cache
      </Text>
      <Rect x={880} y={600} w={720} h={64} fill={COLORS.red} stroke={COLORS.ink} strokeWidth={2.8} draw={p(390.9)} seed={4422} opacity={0.85} />
      <Text x={1040} y={620} size={25} color={COLORS.ink} draw={p(391.2)}>
        grows with every token
      </Text>
      <Text x={880} y={760} size={34} tone="red" draw={p(392.7)}>
        the cache fills the rest
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const Trick3: React.FC<SceneProps> = ({start}) => (
  <ChapterCard start={start} number="03" title="One brain, many hats" subtitle="small add-ons, many jobs" eyebrow="Trick three">
    <Bean x={700} y={600} h={120} draw={0.8} face="happy" arms="none" />
    <Hat x={700} y={598} w={80} color={COLORS.sage} draw={0.85} />
    <Line x1={850} y1={604} x2={1320} y2={604} stroke={COLORS.ink} strokeWidth={3} draw={0.75} seed={5550} />
    <Hat x={900} y={596} w={90} color={COLORS.sage} draw={0.8} />
    <Hat x={1050} y={596} w={90} color={COLORS.red} draw={0.85} />
    <Hat x={1200} y={596} w={90} color={COLORS.sand} draw={0.9} />
    <Text x={850} y={700} size={26} tone="sage" draw={0.95} width={320}>
      one hat per job
    </Text>
  </ChapterCard>
);

/* ------------------------------------------------------------------ */
export const ManyFeatures: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);
  const dup = p(407.9, 0.8);
  return (
    <Stage eyebrow="One phone, many jobs">
      <Text x={120} y={128} size={72} draw={p(397.4)}>
        One phone, many features
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(397.6)}>
        compression only gets you so far
      </Text>

      {[
        {x: 200, title: 'summaries', cue: 401.8},
        {x: 660, title: 'rewrite', cue: 404.2},
        {x: 1120, title: 'key facts', cue: 406.5},
      ].map((f, i) => (
        <React.Fragment key={f.title}>
          <Rect x={f.x} y={290} w={380} h={180} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(397.6)} seed={4500 + i} />
          <Text x={f.x} y={320} size={36} align="center" width={380} draw={p(f.cue + 0.1)}>
            {f.title}
          </Text>
          {Array.from({length: 3}).map((_, k) => (
            <Line key={k} x1={f.x + 80} y1={380 + k * 30} x2={f.x + (k === 1 ? 270 : 300)} y2={378 + k * 30} stroke={COLORS.ink} strokeWidth={2.2} draw={p(f.cue + 0.2 + k * 0.05)} seed={4510 + i * 3 + k} opacity={0.55} />
          ))}
        </React.Fragment>
      ))}

      {[
        {x: 200, label: 'base model', cue: 408.0},
        {x: 660, label: 'base model', cue: 408.2},
        {x: 1120, label: 'base model', cue: 408.4},
      ].map((m, i) => (
        <React.Fragment key={i}>
          <Rect x={m.x} y={600} w={380} h={190} fill={COLORS.sand} stroke={COLORS.red} strokeWidth={2.8} draw={p(m.cue)} seed={4530 + i} opacity={0.5 + 0.5 * dup} />
          <Text x={m.x} y={660} size={34} align="center" width={380} draw={p(m.cue + 0.1)}>
            {m.label}
          </Text>
          <Text x={m.x} y={720} size={24} align="center" width={380} tone="faint" draw={p(m.cue + 0.2)}>
            same 3B weights
          </Text>
        </React.Fragment>
      ))}

      <Text x={960} y={850} size={36} align="center" width={1000} tone="red" draw={p(411.4, 0.7)} style={{left: 460}}>
        storing the same knowledge three times
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const AdapterConcept: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);
  return (
    <Stage eyebrow="Adapters">
      <Text x={120} y={128} size={74} draw={p(416.9)}>
        One actor, many hats
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(417.1)}>
        a tiny add-on changes the job
      </Text>

      <Rect x={160} y={380} w={380} h={240} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={3.2} draw={p(417.2)} seed={4601} />
      <Text x={160} y={416} size={38} align="center" width={380} draw={p(417.3)}>
        base model
      </Text>
      <Text x={160} y={500} size={58} align="center" width={380} draw={p(417.4)}>
        3B
      </Text>
      <Text x={160} y={570} size={24} align="center" width={380} tone="faint" draw={p(417.5)}>
        frozen and shared
      </Text>

      <Rect x={200} y={300} w={180} h={60} fill={COLORS.sage} stroke={COLORS.ink} strokeWidth={2.8} draw={p(418.9)} seed={4610} />
      <Text x={200} y={312} size={27} align="center" width={180} draw={p(419.0)} color={COLORS.paper}>
        adapter
      </Text>
      <Arrow x1={290} y1={364} x2={290} y2={394} color={COLORS.sage} width={3} draw={p(419.2)} seed={4611} />
      <Text x={400} y={318} size={24} tone="sage" draw={p(419.4)}>
        a few parameters
      </Text>

      <Bean x={800} y={470} h={190} draw={p(423.7)} face="happy" arms="out" />
      <Hat x={800} y={468} w={120} color={COLORS.red} draw={p(424.0)} />
      <Text x={800} y={700} size={30} align="center" width={260} draw={p(424.2)} style={{left: 670}}>
        the actor
      </Text>

      <Text x={1160} y={512} size={28} tone="faint" draw={p(425.7)}>
        different hats
      </Text>
      <Line x1={1120} y1={632} x2={1540} y2={632} stroke={COLORS.ink} strokeWidth={3} draw={p(425.9)} seed={4620} />
      {[
        {x: 1160, c: COLORS.sage, kind: 'top' as const},
        {x: 1300, c: COLORS.red, kind: 'top' as const},
        {x: 1440, c: COLORS.sand, kind: 'top' as const},
      ].map((h, i) => (
        <Hat key={i} x={h.x} y={626} w={86} color={h.c} draw={p(426.0 + i * 0.1)} kind={h.kind} />
      ))}
      <Text x={1080} y={730} size={34} tone="sage" draw={p(427.3)}>
        same actor, different hats
      </Text>
      <Text x={1080} y={800} size={30} tone="faint" draw={p(430.0)}>
        built with LoRA
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const LoRA: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);
  return (
    <Stage eyebrow="LoRA, in one picture">
      <Text x={120} y={128} size={74} draw={p(432.8)}>
        Freeze the base
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(433.0)}>
        add small pieces, train only those
      </Text>

      <Rect x={260} y={360} w={620} h={340} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={3.2} draw={p(433.6)} seed={4701} />
      <Text x={260} y={400} size={42} align="center" width={620} draw={p(433.7)}>
        base model
      </Text>
      <Text x={260} y={510} size={78} align="center" width={620} draw={p(433.8)}>
        3B
      </Text>
      <Text x={260} y={620} size={30} align="center" width={620} tone="red" draw={p(434.0)}>
        frozen
      </Text>
      <Rect x={760} y={432} w={48} h={40} fill={COLORS.card} stroke={COLORS.red} strokeWidth={2.8} draw={p(434.2)} seed={4702} />
      <Path d="M 772 432 V 416 Q 784 402 796 416 V 432" stroke={COLORS.red} strokeWidth={2.8} draw={p(434.3)} seed={4703} />

      {[
        {y: 380, label: 'A', cue: 436.3},
        {y: 540, label: 'B', cue: 436.5},
      ].map((b, i) => (
        <React.Fragment key={b.label}>
          <Rect x={1090} y={b.y} w={230} h={110} fill={COLORS.card} stroke={COLORS.sage} strokeWidth={3.2} draw={p(b.cue)} seed={4710 + i} />
          <Text x={1090} y={b.y + 24} size={42} align="center" width={230} draw={p(b.cue + 0.1)}>
            {b.label}
          </Text>
          <Arrow x1={1080} y1={b.y + 55} x2={900} y2={b.y + 55} color={COLORS.sage} width={3} draw={p(436.6 + i * 0.1)} seed={4720 + i} />
        </React.Fragment>
      ))}
      <Text x={1090} y={700} size={28} tone="sage" draw={p(438.0)}>
        train only these
      </Text>
      <Text x={1090} y={750} size={24} tone="faint" draw={p(438.2)}>
        low-rank pieces
      </Text>

      <Text x={1500} y={360} size={54} font="title" tone="sage" draw={p(441.0, 0.7)}>
        far cheaper
      </Text>
      <Text x={1500} y={440} size={28} tone="faint" draw={p(441.2)}>
        than a whole new model
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const SwapAdapters: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);
  const active = t > 453.1 ? Math.floor((t - 453.1) / 0.8) % 3 : 0;

  const cards = [
    {y: 300, label: 'summaries'},
    {y: 450, label: 'rewrite'},
    {y: 600, label: 'key facts'},
  ];

  return (
    <Stage eyebrow="One base, swap the hats">
      <Text x={120} y={128} size={72} draw={p(443.2)}>
        One base, swap the hats
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(443.4)}>
        adapters are tiny next to the base
      </Text>

      <Rect x={300} y={280} w={420} h={620} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(443.5)} seed={4801} />
      <Rect x={312} y={300} w={396} h={300} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={2.8} draw={p(450.5)} seed={4802} />
      <Text x={312} y={330} size={36} align="center" width={396} draw={p(450.6)}>
        base model
      </Text>
      <Text x={312} y={410} size={66} align="center" width={396} draw={p(450.7)}>
        3 GB
      </Text>
      <Text x={312} y={510} size={24} align="center" width={396} tone="faint" draw={p(450.8)}>
        stays in memory
      </Text>

      <Rect x={312} y={620} w={396} h={110} fill={COLORS.card} stroke={COLORS.sage} strokeWidth={3} draw={p(443.7)} seed={4803} dash={[8, 6]} />
      <Text x={312} y={642} size={28} align="center" width={396} draw={p(443.8)}>
        adapter slot
      </Text>
      <Text x={312} y={690} size={24} align="center" width={396} tone="sage" draw={p(443.9)}>
        tens of MB
      </Text>

      <Rect x={312} y={760} w={396} h={110} fill={COLORS.card} stroke={COLORS.faint} strokeWidth={2.2} draw={p(443.8)} seed={4804} dash={[6, 5]} />
      <Text x={312} y={786} size={25} align="center" width={396} tone="faint" draw={p(443.9)}>
        OS + apps
      </Text>

      {cards.map((c, i) => {
        const isActive = i === active;
        return (
          <React.Fragment key={c.label}>
            <Rect x={900} y={c.y} w={300} h={110} fill={isActive ? COLORS.sand : COLORS.card} stroke={isActive ? COLORS.sage : COLORS.ink} strokeWidth={isActive ? 3.6 : 2.8} draw={p(444.0 + i * 0.1)} seed={4810 + i} />
            <Text x={900} y={c.y + 24} size={30} align="center" width={300} draw={p(444.1 + i * 0.1)}>
              {c.label}
            </Text>
            <Line x1={890} y1={c.y + 55} x2={810} y2={c.y + 55} stroke={isActive ? COLORS.sage : COLORS.ink} strokeWidth={2.8} draw={p(444.2 + i * 0.1)} seed={4820 + i} opacity={isActive ? 1 : 0.55} />
          </React.Fragment>
        );
      })}
      <Line x1={820} y1={350} x2={820} y2={660} stroke={COLORS.ink} strokeWidth={2.4} draw={p(444.5)} seed={4830} opacity={0.55} />
      <Arrow x1={820} y1={665} x2={720} y2={665} color={COLORS.sage} width={3} draw={p(444.7)} seed={4831} />
      <Text x={900} y={760} size={28} tone="sage" draw={p(446.0)}>
        tens of megabytes
      </Text>
      <Text x={900} y={810} size={28} tone="faint" draw={p(446.2)}>
        a tiny fraction
      </Text>
    </Stage>
  );
};
