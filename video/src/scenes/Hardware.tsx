import React from 'react';
import {COLORS, easeOut, progress} from '../lib/theme';
import {Arrow, Circle, DotGrid, Ellipse, Line, Path, Rect} from '../lib/rough';
import {Bean, Box, Check, Chip, Cloud, Cross, Gear, Hat, Phone, Text} from '../components/primitives';
import {ChapterCard} from '../components/ChapterCard';
import {GroundLine, Stage, useSceneTime, type SceneProps} from '../components/Stage';

const pF = (t: number, start: number, cue: number, dur = 0.55) =>
  progress(t, cue <= start + 1.6 ? cue - 1.6 : cue, dur, easeOut);

/* ------------------------------------------------------------------ */
export const Trick4: React.FC<SceneProps> = ({start}) => (
  <ChapterCard start={start} number="04" title="Keep the chips happy" subtitle="feed the data right" eyebrow="Trick four">
    <Chip x={1250} y={390} w={260} h={180} label="NE" sub="efficient" draw={0.8} seed={5101} />
  </ChapterCard>
);

/* ------------------------------------------------------------------ */
export const Hardware: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="The hardware">
      <Text x={120} y={128} size={74} draw={p(458.1)}>
        Three chips, one plan
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(458.3)}>
        each does something different
      </Text>

      <Rect x={740} y={280} w={420} h={200} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={3.2} draw={p(458.2)} seed={5201} />
      <Text x={740} y={316} size={44} align="center" width={420} draw={p(458.3)}>
        the model
      </Text>
      <Text x={740} y={390} size={30} align="center" width={420} tone="faint" draw={p(458.4)}>
        needs a data plan
      </Text>

      <Chip x={260} y={680} w={340} h={180} label="CPU" sub="general work" draw={p(463.4)} seed={5210} />
      <Chip x={760} y={680} w={340} h={180} label="GPU" sub="many numbers" draw={p(466.5)} seed={5211} />
      <Chip x={1260} y={680} w={340} h={180} label="NE" sub="ML, efficiently" draw={p(469.5)} seed={5212} />

      <Arrow x1={900} y1={490} x2={430} y2={672} color={COLORS.ink} width={3} draw={p(463.6)} seed={5220} />
      <Arrow x1={950} y1={490} x2={930} y2={672} color={COLORS.ink} width={3} draw={p(466.8)} seed={5221} />
      <Arrow x1={1000} y1={490} x2={1430} y2={672} color={COLORS.ink} width={3} draw={p(469.8)} seed={5222} />

      <Text x={1420} y={520} size={30} tone="red" draw={p(474.9)}>
        not just one
      </Text>
      <Line x1={1422} y1={574} x2={1422 + 220 * p(475.2)} y2={570} stroke={COLORS.red} strokeWidth={3} draw={p(475.2)} seed={5230} />
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const Layouts: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="Data layout">
      <Text x={120} y={128} size={74} draw={p(477.2)}>
        Split it, don't copy it
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(477.4)}>
        shape the data for the chip
      </Text>

      <Rect x={220} y={300} w={380} h={260} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(477.5)} seed={5301} />
      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
        {Array.from({length: 24}).map((_, i) => (
          <rect key={i} x={236 + (i % 6) * 60} y={316 + Math.floor(i / 6) * 60} width={52} height={52} rx={3} fill={i % 3 === 0 ? COLORS.sand : COLORS.card} stroke={COLORS.ink} strokeWidth={1.6} />
        ))}
      </svg>

      {[2, 4].map((c, i) => (
        <Line key={i} x1={236 + c * 60 - 4} y1={310} x2={236 + c * 60 - 4} y2={548} stroke={COLORS.sage} strokeWidth={2.4} draw={p(478.8 + i * 0.1)} seed={5310 + i} dash={[7, 5]} />
      ))}

      {[0, 1, 2].map((i) => (
        <React.Fragment key={i}>
          <Arrow x1={600} y1={370 + i * 72} x2={1058} y2={330 + i * 130} color={COLORS.sage} width={2.8} draw={p(479.9 + i * 0.12)} seed={5320 + i} />
          <Rect x={1060} y={300 + i * 140} w={320} h={86} fill={i === 1 ? COLORS.sand : COLORS.card} stroke={COLORS.ink} strokeWidth={2.8} draw={p(480.0 + i * 0.12)} seed={5330 + i} />
          <Text x={1060} y={326 + i * 140} size={26} align="center" width={320} draw={p(480.1 + i * 0.12)}>
            chunk {i + 1}
          </Text>
        </React.Fragment>
      ))}

      <Rect x={1400} y={720} w={120} h={100} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.8} draw={p(482.2)} seed={5340} />
      <Rect x={1430} y={750} w={120} h={100} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.8} draw={p(482.3)} seed={5341} />
      <Cross x={1460} y={770} size={58} draw={p(482.5)} />
      <Text x={1400} y={866} size={30} tone="red" draw={p(482.7)}>
        no extra copies
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const MovingBoxes: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="Why layout matters">
      <Text x={120} y={128} size={74} draw={p(485.3)}>
        Moving boxes between rooms
      </Text>

      {/* bad lane */}
      <Rect x={150} y={240} w={230} h={230} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(485.6)} seed={5401} />
      <Rect x={1540} y={240} w={230} h={230} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(485.7)} seed={5402} />
      <Text x={150} y={188} size={26} align="center" width={230} tone="faint" draw={p(485.8)} style={{left: 150}}>
        room A
      </Text>
      <Text x={1540} y={188} size={26} align="center" width={230} tone="faint" draw={p(485.8)} style={{left: 1540}}>
        room B
      </Text>
      <Line x1={390} y1={355} x2={1530} y2={355} stroke={COLORS.red} strokeWidth={2.4} draw={p(487.6)} seed={5410} dash={[8, 8]} />
      {[0, 1, 2, 3].map((i) => (
        <React.Fragment key={i}>
          <Rect x={510 + i * 250} y={320} w={62} h={52} fill={i === 3 ? COLORS.sand : COLORS.card} stroke={COLORS.red} strokeWidth={2.4} draw={p(487.7 + i * 0.1)} seed={5420 + i} />
          {i < 3 && <Arrow x1={580 + i * 250} y1={346} x2={730 + i * 250} y2={346} color={COLORS.red} width={2.6} draw={p(487.9 + i * 0.1)} seed={5430 + i} />}
        </React.Fragment>
      ))}
      <Text x={760} y={460} size={30} tone="red" draw={p(489.8)}>
        one at a time, copying each step
      </Text>
      <Text x={760} y={512} size={26} tone="red" draw={p(490.9)}>
        takes forever
      </Text>

      {/* good lane */}
      <Rect x={150} y={670} w={230} h={220} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(491.9)} seed={5440} />
      <Rect x={1540} y={670} w={230} h={220} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(492.0)} seed={5441} />
      <Arrow x1={390} y1={780} x2={1528} y2={780} color={COLORS.sage} width={3.2} draw={p(492.1)} seed={5442} />
      {[0, 1, 2, 3].map((i) => (
        <Rect key={i} x={800} y={790 - i * 30} w={110} h={28} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={2.2} draw={p(492.2 + i * 0.08)} seed={5450 + i} />
      ))}
      <Line x1={790} y1={790} x2={790} y2={920} stroke={COLORS.ink} strokeWidth={3} draw={p(492.1)} seed={5455} />
      <Circle cx={790} cy={930} d={30} stroke={COLORS.ink} strokeWidth={3} draw={p(492.15)} seed={5456} />
      <Text x={760} y={966} size={30} tone="sage" draw={p(493.8)}>
        packed, one trip — fast
      </Text>

      <Text x={960} y={1010} size={28} tone="faint" draw={p(496.1)}>
        tiny choices change speed and memory
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const Trick5: React.FC<SceneProps> = ({start}) => (
  <ChapterCard start={start} number="05" title="Ask for help" subtitle="phone first, cloud second" eyebrow="Trick five">
    <Cloud x={1260} y={360} w={400} h={230} draw={0.85} seed={5501} />
    <Text x={1260} y={606} size={34} align="center" width={400} draw={0.95} style={{left: 1260}}>
      cloud
    </Text>
  </ChapterCard>
);

/* ------------------------------------------------------------------ */
export const PhoneVsCloud: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="Two gears">
      <Text x={120} y={128} size={72} draw={p(501.9)}>
        Phone first, cloud second
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(502.1)}>
        limits are fine
      </Text>

      <Phone x={220} y={300} w={300} h={520} draw={p(502.0)} screenFill={COLORS.screen} />
      <Text x={370} y={520} size={54} align="center" width={300} tone="faint" draw={p(502.1)} style={{left: 220}}>
        3B
      </Text>
      <Text x={220} y={846} size={30} align="center" width={300} tone="faint" draw={p(502.2)} style={{left: 220}}>
        phone
      </Text>

      {[
        {y: 350, label: 'summarise'},
        {y: 440, label: 'find facts'},
        {y: 530, label: 'sort'},
      ].map((r, i) => (
        <React.Fragment key={r.label}>
          <Check x={580} y={r.y + 8} size={28} draw={p(506.4 + i * 0.25)} />
          <Text x={620} y={r.y} size={32} draw={p(506.5 + i * 0.25)}>
            {r.label}
          </Text>
        </React.Fragment>
      ))}

      <Cloud x={1340} y={290} w={420} h={270} draw={p(502.3)} seed={5601} />
      <Text x={1340} y={590} size={30} align="center" width={420} tone="faint" draw={p(502.5)} style={{left: 1340}}>
        cloud
      </Text>
      <Text x={1340} y={642} size={26} align="center" width={420} tone="sage" draw={p(518.0)} style={{left: 1340}}>
        Private Cloud Compute
      </Text>

      <WordBox x={900} y={680} label="request" draw={p(511.3)} seed={5610} />
      <Arrow x1={900} y1={710} x2={530} y2={710} color={COLORS.sage} width={3} draw={p(513.5)} seed={5611} />
      <Text x={600} y={670} size={25} tone="sage" draw={p(513.7)}>
        can it fit?
      </Text>

      <Arrow x1={1080} y1={680} x2={1358} y2={485} color={COLORS.ink} width={3} draw={p(515.6)} seed={5612} curve={-40} />
      <Text x={1080} y={620} size={25} tone="faint" draw={p(515.8)}>
        hard job
      </Text>
    </Stage>
  );
};

const WordBox: React.FC<{x: number; y: number; label: string; draw?: number; seed?: number}> = ({x, y, label, draw = 1, seed = 5600}) => (
  <>
    <Rect x={x} y={y} w={180} h={60} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={2.6} draw={draw} seed={seed} />
    <Text x={x} y={y + 10} size={27} align="center" width={180} draw={draw}>
      {label}
    </Text>
  </>
);

/* ------------------------------------------------------------------ */
export const PCC: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="Private Cloud Compute">
      <Text x={120} y={128} size={74} draw={p(521.1)}>
        A protected space
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(521.3)}>
        only authorized software gets in
      </Text>

      <Phone x={160} y={400} w={260} h={440} draw={p(521.2)} screenFill={COLORS.screen} />
      <Text x={290} y={580} size={50} align="center" width={260} tone="faint" draw={p(521.3)} style={{left: 160}}>
        3B
      </Text>
      <Text x={160} y={866} size={28} align="center" width={260} tone="faint" draw={p(521.4)} style={{left: 160}}>
        your iPhone
      </Text>

      <Cloud x={860} y={250} w={820} h={460} draw={p(521.4)} seed={5701} />
      <Text x={1100} y={360} size={28} tone="sage" draw={p(521.6)}>
        Private Cloud Compute
      </Text>

      <Rect x={1120} y={400} w={360} h={240} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(522.0)} seed={5702} />
      <Text x={1120} y={416} size={28} align="center" width={360} draw={p(522.1)}>
        verified server
      </Text>
      {[0, 1, 2].map((i) => (
        <Line key={i} x1={1150} y1={480 + i * 46} x2={1450} y2={478 + i * 46} stroke={COLORS.ink} strokeWidth={2.2} draw={p(522.2 + i * 0.05)} seed={5710 + i} opacity={0.55} />
      ))}
      <Check x={1450} y={620} size={32} draw={p(523.1)} />
      <Text x={980} y={690} size={30} tone="sage" draw={p(523.2)}>
        authorized only
      </Text>

      <Rect x={1000} y={320} w={50} h={44} fill={COLORS.card} stroke={COLORS.sage} strokeWidth={2.8} draw={p(521.8)} seed={5720} />
      <Path d="M 1012 320 V 304 Q 1025 290 1038 304 V 320" stroke={COLORS.sage} strokeWidth={2.8} draw={p(521.9)} seed={5721} />
      <Text x={980} y={380} size={26} tone="sage" draw={p(522.0)}>
        locked
      </Text>

      <Bean x={520} y={730} h={120} draw={p(526.1)} face="worried" arms="out" />
      <Bean x={660} y={730} h={120} draw={p(526.2)} face="neutral" arms="out" />
      <Cross x={590} y={742} size={38} draw={p(526.4)} />
      <Text x={460} y={880} size={30} tone="red" draw={p(526.5)}>
        outside parties, blocked
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const Encryption: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="On the wire">
      <Text x={120} y={128} size={74} draw={p(529.1)}>
        Locked all the way there
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(529.3)}>
        the device encrypts the request
      </Text>

      <Phone x={160} y={400} w={260} h={440} draw={p(529.2)} screenFill={COLORS.screen} />
      <Text x={290} y={580} size={50} align="center" width={260} tone="faint" draw={p(529.3)} style={{left: 160}}>
        3B
      </Text>
      <Text x={160} y={866} size={28} align="center" width={260} tone="faint" draw={p(529.4)} style={{left: 160}}>
        your iPhone
      </Text>

      <Cloud x={1320} y={300} w={440} h={360} draw={p(529.5)} seed={5801} />
      <Text x={1400} y={378} size={28} align="center" width={280} draw={p(530.3)} style={{left: 1400}}>
        verified server
      </Text>
      <Rect x={1400} y={420} w={280} h={160} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.8} draw={p(530.4)} seed={5802} />
      <Text x={1400} y={450} size={28} align="center" width={280} draw={p(530.5)}>
        keys
      </Text>
      {[0, 1, 2].map((i) => (
        <Circle key={i} cx={1450 + i * 70} cy={520} d={22} stroke={COLORS.sage} strokeWidth={2.4} draw={p(530.6 + i * 0.1)} seed={5810 + i} />
      ))}

      <Arrow x1={420} y1={620} x2={1352} y2={620} color={COLORS.sage} width={3} draw={p(532.4)} seed={5820} dash={[9, 7]} />
      <Rect x={780} y={560} w={160} h={120} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3} draw={p(529.8)} seed={5821} />
      <Path d="M 820 560 V 548 L 900 548 L 900 560" stroke={COLORS.ink} strokeWidth={2.6} draw={p(529.9)} seed={5822} />
      <Rect x={836} y={604} w={48} h={38} fill={COLORS.sage} stroke={COLORS.ink} strokeWidth={2.2} draw={p(530.0)} seed={5823} />
      <Path d="M 848 604 V 590 Q 860 578 872 590 V 604" stroke={COLORS.ink} strokeWidth={2.4} draw={p(530.1)} seed={5824} />
      <Text x={780} y={710} size={26} align="center" width={160} tone="sage" draw={p(530.2)} style={{left: 780}}>
        encrypted
      </Text>

      <Rect x={760} y={790} w={250} h={130} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.8} draw={p(535.1)} seed={5830} />
      <Text x={760} y={820} size={26} align="center" width={250} draw={p(535.2)}>
        outside machine
      </Text>
      <Cross x={885} y={895} size={40} draw={p(535.4)} />
      <Text x={760} y={960} size={28} tone="red" draw={p(535.5)}>
        no keys, no read
      </Text>

      <Bean x={500} y={780} h={110} draw={p(538.3)} face="neutral" arms="out" />
      <Line x1={470} y1={812} x2={530} y2={812} stroke={COLORS.red} strokeWidth={4} draw={p(538.5)} seed={5840} />
      <Text x={390} y={920} size={26} tone="red" draw={p(538.6)}>
        even Apple staff
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const MoE: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  const active = new Set([11, 23, 35]); // right column, rows 2/4/6 (0-indexed)
  return (
    <Stage eyebrow="Mixture of experts">
      <Text x={120} y={128} size={74} draw={p(542.7)}>
        Many experts, a few awake
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(542.9)}>
        a bigger server model picks its best parts
      </Text>

      <WordBox x={150} y={500} label="prompt" draw={p(543.0)} seed={5901} />
      <Arrow x1={340} y1={530} x2={518} y2={530} color={COLORS.sage} width={3} draw={p(544.0)} seed={5902} />

      <Rect x={520} y={280} w={400} h={400} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={3.2} draw={p(543.2)} seed={5903} />
      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
        {Array.from({length: 36}).map((_, i) => {
          const r = Math.floor(i / 6);
          const c = i % 6;
          const isActive = active.has(i);
          return (
            <rect
              key={i}
              x={536 + c * 62}
              y={296 + r * 62}
              width={50}
              height={50}
              rx={3}
              fill={isActive ? COLORS.sage : COLORS.card}
              stroke={COLORS.ink}
              strokeWidth={1.6}
              opacity={isActive ? 1 : 0.35}
            />
          );
        })}
      </svg>
      <Text x={520} y={716} size={26} align="center" width={400} tone="faint" draw={p(543.4)} style={{left: 520}}>
        experts
      </Text>

      {[0, 1, 2].map((i) => {
        const y = 296 + (1 + i * 2) * 62 + 25;
        return (
          <React.Fragment key={i}>
            <Arrow x1={920} y1={y} x2={1288} y2={346 + i * 160} color={COLORS.sage} width={2.8} draw={p(547.2 + i * 0.2)} seed={5910 + i} />
            <Rect x={1290} y={300 + i * 160} w={420} h={92} fill={COLORS.card} stroke={COLORS.ink} strokeWidth={2.8} draw={p(549.8 + i * 0.2)} seed={5920 + i} />
            <Text x={1290} y={326 + i * 160} size={27} align="center" width={420} draw={p(549.9 + i * 0.2)}>
              parallel track {i + 1}
            </Text>
          </React.Fragment>
        );
      })}
      <Text x={1290} y={810} size={28} tone="sage" draw={p(552.6)}>
        pick a few, spread the work
      </Text>
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
export const TwoGears: React.FC<SceneProps> = ({start}) => {
  const t = useSceneTime(start);
  const p = (cue: number, dur = 0.6) => pF(t, start, cue, dur);

  return (
    <Stage eyebrow="The whole system">
      <Text x={120} y={128} size={74} draw={p(558.3)}>
        Two gears
      </Text>
      <Text x={124} y={220} size={28} tone="faint" draw={p(558.5)}>
        the phone turns one, the cloud turns the other
      </Text>

      <Gear x={790} y={520} r={125} draw={p(558.6)} color={COLORS.ink} teeth={10} />
      <Gear x={1000} y={550} r={90} draw={p(558.8)} color={COLORS.sage} teeth={9} />
      <Text x={790} y={690} size={38} align="center" width={300} draw={p(559.9)} style={{left: 640}}>
        phone
      </Text>
      <Text x={1000} y={680} size={38} align="center" width={260} draw={p(561.3)} style={{left: 870}}>
        cloud
      </Text>

      <Text x={660} y={760} size={26} tone="sage" draw={p(560.0)}>
        when you can
      </Text>
      <Text x={980} y={760} size={26} tone="faint" draw={p(561.4)}>
        when you must
      </Text>
    </Stage>
  );
};
