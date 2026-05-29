import React from "react";
import { Composition } from "remotion";
import { EyeMascot } from "./EyeMascot";
import { MascotClip } from "./MascotClips";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="EyeMascot"
        component={EyeMascot}
        durationInFrames={240}
        fps={30}
        width={1200}
        height={720}
        defaultProps={{
          dotColor: "242, 242, 238",
          warningColor: "230, 208, 108",
          glowStrength: 1,
          showPulse: false,
        }}
      />
      <Composition
        id="MascotSleepLoop"
        component={MascotClip}
        durationInFrames={240}
        fps={60}
        width={1024}
        height={640}
        defaultProps={{ variant: "sleep" }}
      />
      <Composition
        id="MascotAwakeLoop"
        component={MascotClip}
        durationInFrames={240}
        fps={60}
        width={1024}
        height={640}
        defaultProps={{ variant: "awake" }}
      />
      <Composition
        id="MascotWake"
        component={MascotClip}
        durationInFrames={96}
        fps={60}
        width={1024}
        height={640}
        defaultProps={{ variant: "wake" }}
      />
      <Composition
        id="MascotInputLoop"
        component={MascotClip}
        durationInFrames={180}
        fps={60}
        width={1024}
        height={640}
        defaultProps={{ variant: "input" }}
      />
      <Composition
        id="MascotSend"
        component={MascotClip}
        durationInFrames={90}
        fps={60}
        width={1024}
        height={640}
        defaultProps={{ variant: "send" }}
      />
    </>
  );
};
