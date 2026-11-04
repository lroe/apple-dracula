import React from 'react';
import {Composition} from 'remotion';
import {Video} from './Video';
import {FPS, H, W} from './lib/theme';
import {DURATION_SECONDS} from './data/timeline';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="AppleExplainer"
    component={Video}
    durationInFrames={Math.ceil(DURATION_SECONDS * FPS)}
    fps={FPS}
    width={W}
    height={H}
  />
);
