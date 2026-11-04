import React, {useEffect, useState} from 'react';
import {
  AbsoluteFill,
  Audio,
  continueRender,
  delayRender,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {COLORS, FPS} from './lib/theme';
import {DURATION_SECONDS, SCENES} from './data/timeline';

const FontLoader: React.FC = () => {
  const [handle] = useState(() => delayRender('Loading handwriting fonts'));
  useEffect(() => {
    const load = async () => {
      await Promise.all([
        document.fonts.load('64px Caveat'),
        document.fonts.load('32px "Patrick Hand"'),
      ]);
      await document.fonts.ready;
      continueRender(handle);
    };
    load().catch(() => continueRender(handle));
  }, [handle]);
  return null;
};

const SceneSlot: React.FC<{
  scene: (typeof SCENES)[number];
  localFrame: number;
}> = ({scene, localFrame}) => {
  const opacity =
    scene.start === 0 ? 1 : Math.max(0, Math.min(1, localFrame / 4));
  const Scene = scene.component;
  return (
    <AbsoluteFill style={{opacity}}>
      <Scene start={scene.start} end={scene.end} />
    </AbsoluteFill>
  );
};

export const Video: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: COLORS.paper}}>
      <FontLoader />
      <style>{`
        @font-face {
          font-family: 'Caveat';
          src: url('${staticFile('fonts/Caveat.ttf')}') format('truetype');
          font-weight: 400 700;
          font-display: block;
        }
        @font-face {
          font-family: 'Patrick Hand';
          src: url('${staticFile('fonts/PatrickHand-Regular.ttf')}') format('truetype');
          font-weight: 400;
          font-display: block;
        }
        * { -webkit-font-smoothing: antialiased; }
      `}</style>
      <Audio src={staticFile('audio.wav')} volume={1} />
      {SCENES.map((scene) => {
        const from = Math.round(scene.start * FPS);
        const durationInFrames = Math.max(
          1,
          Math.round((scene.end - scene.start) * FPS),
        );
        const localFrame = frame - from;
        if (localFrame < 0 || localFrame >= durationInFrames) return null;
        return (
          <SceneSlot
            key={scene.id}
            scene={scene}
            localFrame={localFrame}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export {DURATION_SECONDS};
