import React from "react";
import { Composition } from "remotion";
import { EyeMascot } from "./EyeMascot";

export const Root: React.FC = () => {
  return (
    <Composition
      id="EyeMascot"
      component={EyeMascot}
      durationInFrames={150}
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
  );
};
