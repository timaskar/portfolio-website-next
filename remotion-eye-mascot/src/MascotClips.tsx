import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type ClipVariant =
  | "sleep"
  | "awake"
  | "wake"
  | "input"
  | "send"
  | "startle"
  | "lookInput"
  | "fallAsleep";

type MascotClipProps = {
  variant: ClipVariant;
};

type Pose = {
  faceX: number;
  faceY: number;
  yaw: number;
  rotate: number;
  scale: number;
  eyeX: number;
  eyeY: number;
  eyeScaleX: number;
  eyeScaleY: number;
  eyeOpacity: number;
  browLiftLeft: number;
  browLiftRight: number;
  browAngleLeft: number;
  browAngleRight: number;
  browYLeft: number;
  browYRight: number;
  glowOpacity: number;
  glowScaleY: number;
  zOpacity: number;
  intensity: number;
};

const DOT_COLOR = "242, 242, 238";
const GLYPHS = "0101101001110010";
const FACE_WIDTH = 284;
const FACE_HEIGHT = 162;
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeSnap = Easing.bezier(0.34, 1.56, 0.64, 1);
const easeInOut = Easing.bezier(0.45, 0, 0.55, 1);

const clamp = (value: number, min = 0, max = 1) =>
  Math.max(min, Math.min(max, value));

const mix = (a: number, b: number, t: number) => a + (b - a) * t;

const segment = (
  progress: number,
  from: number,
  to: number,
  easing = easeOut,
) =>
  interpolate(progress, [from, to], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

const pulse = (progress: number, center: number, radius: number) =>
  clamp(1 - Math.abs(progress - center) / radius);

const glyphFor = (index: number, frame: number, speed: number, seed = 0) =>
  GLYPHS[(index * 7 + Math.floor(frame * speed) + seed) % GLYPHS.length];

const Pixel: React.FC<{
  index: number;
  row: number;
  col: number;
  frame: number;
  seed: number;
  cell: number;
  fontSize: number;
  intensity: number;
  speed: number;
}> = ({ index, row, col, frame, seed, cell, fontSize, intensity, speed }) => {
  const shimmer =
    (Math.sin(frame * 0.18 + row * 0.74 + col * 1.17 + seed * 0.61) + 1) / 2;
  const centerFalloff =
    Math.abs(col - 2.2) * 0.032 + Math.abs(row - 5.4) * 0.012;
  const opacity = clamp(intensity - centerFalloff + shimmer * 0.12, 0.18, 1);

  return (
    <span
      style={{
        width: cell,
        height: cell,
        borderRadius: 1,
        display: "grid",
        placeItems: "center",
        backgroundColor: `rgba(${DOT_COLOR}, ${opacity * 0.12})`,
        color: `rgba(${DOT_COLOR}, ${opacity})`,
        fontFamily:
          '"IBM Plex Mono", "JetBrains Mono", SFMono-Regular, Consolas, monospace',
        fontSize,
        fontWeight: 850,
        lineHeight: `${cell}px`,
        transform: `scale(${mix(1.02, 1.16, shimmer)})`,
        textShadow: [
          `0 0 ${mix(4, 7, shimmer)}px rgba(${DOT_COLOR}, ${opacity * 0.66})`,
          `0 0 ${mix(12, 22, shimmer)}px rgba(${DOT_COLOR}, ${opacity * 0.3})`,
        ].join(", "),
        boxShadow: [
          `0 0 ${mix(4, 6, shimmer)}px rgba(${DOT_COLOR}, ${opacity * 0.62})`,
          `0 0 ${mix(13, 21, shimmer)}px rgba(${DOT_COLOR}, ${opacity * 0.28})`,
          `0 0 ${mix(26, 38, shimmer)}px rgba(${DOT_COLOR}, ${opacity * 0.1})`,
        ].join(", "),
      }}
    >
      {glyphFor(index, frame, speed, seed)}
    </span>
  );
};

const Eye: React.FC<{
  eye: number;
  frame: number;
  scaleX: number;
  scaleY: number;
  x: number;
  y: number;
  skew: number;
  opacity: number;
  intensity: number;
}> = ({ eye, frame, scaleX, scaleY, x, y, skew, opacity, intensity }) => (
  <div
    style={{
      position: "absolute",
      top: 76,
      left: eye === 0 ? 60 : 178,
      width: 46,
      height: 96,
      display: "grid",
      gridTemplateColumns: "repeat(5, 5px)",
      gridAutoRows: "5px",
      gap: 3,
      alignContent: "center",
      justifyContent: "center",
      overflow: "hidden",
      borderRadius: 5,
      opacity,
      transform: [
        `translate3d(${x}px, ${y}px, 0)`,
        `skewY(${skew}deg)`,
        `scaleX(${scaleX})`,
        `scaleY(${scaleY})`,
      ].join(" "),
      transformOrigin: "50% 50%",
      filter: [
        `drop-shadow(0 0 10px rgba(${DOT_COLOR}, ${0.36 * intensity}))`,
        `drop-shadow(0 0 26px rgba(${DOT_COLOR}, ${0.18 * intensity}))`,
      ].join(" "),
    }}
  >
    {Array.from({ length: 60 }).map((_, index) => (
      <Pixel
        key={index}
        index={index + eye * 60}
        row={Math.floor(index / 5)}
        col={index % 5}
        frame={frame}
        seed={eye * 23}
        cell={5}
        fontSize={7.2}
        intensity={intensity}
        speed={0.84}
      />
    ))}
  </div>
);

const Brow: React.FC<{
  side: "left" | "right";
  frame: number;
  lift: number;
  angle: number;
  y: number;
  opacity: number;
  intensity: number;
}> = ({ side, frame, lift, angle, y, opacity, intensity }) => (
  <div
    style={{
      position: "absolute",
      top: -42,
      left: side === "left" ? 24 : 186,
      width: 74,
      height: 24,
      display: "grid",
      gridTemplateColumns: "repeat(8, 5px)",
      gridAutoRows: "5px",
      gap: 3,
      alignContent: "center",
      justifyContent: "center",
      opacity,
      transform: [
        `translate3d(0, ${y - lift * 18}px, 0)`,
        `rotateZ(${angle}deg)`,
        `scaleX(${mix(0.98, 1.04, lift)})`,
      ].join(" "),
      transformOrigin: "50% 50%",
      filter: [
        `drop-shadow(0 0 10px rgba(${DOT_COLOR}, ${0.22 * intensity}))`,
        `drop-shadow(0 0 24px rgba(${DOT_COLOR}, ${0.1 * intensity}))`,
      ].join(" "),
    }}
  >
    {Array.from({ length: 24 }).map((_, index) => (
      <Pixel
        key={index}
        index={index}
        row={Math.floor(index / 8)}
        col={index % 8}
        frame={frame}
        seed={side === "left" ? 41 : 73}
        cell={5}
        fontSize={7}
        intensity={0.72 + lift * 0.22}
        speed={0.74}
      />
    ))}
  </div>
);

const SleepZ: React.FC<{ frame: number; progress: number }> = ({
  frame,
  progress,
}) => (
  <>
    {[0, 1, 2].map((index) => {
      const local = (progress + index * 0.16) % 1;
      const opacity = segment(local, 0.08, 0.3) * (1 - segment(local, 0.58, 0.92));
      return (
        <span
          key={index}
          style={{
            position: "absolute",
            top: -28 - index * 15 - local * 10,
            right: 26 - index * 20,
            color: `rgba(${DOT_COLOR}, ${opacity * 0.92})`,
            fontFamily:
              '"IBM Plex Mono", "JetBrains Mono", SFMono-Regular, Consolas, monospace',
            fontSize: 15 + index * 4,
            fontWeight: 950,
            WebkitTextStroke: `0.55px rgba(${DOT_COLOR}, ${opacity * 0.7})`,
            textShadow: [
              `0 0 2px rgba(${DOT_COLOR}, ${opacity})`,
              `0 0 10px rgba(${DOT_COLOR}, ${opacity * 0.74})`,
              `0 0 24px rgba(${DOT_COLOR}, ${opacity * 0.32})`,
            ].join(", "),
            transform: `scale(${mix(0.82, 1.08, segment(local, 0.08, 0.44))}) rotate(${Math.sin(frame * 0.03 + index) * 2}deg)`,
          }}
        >
          Z
        </span>
      );
    })}
  </>
);

const Glow: React.FC<{
  x: number;
  y: number;
  scaleY: number;
  opacity: number;
}> = ({ x, y, scaleY, opacity }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 116,
      height: 168,
      transform: `translate(-50%, -50%) scaleY(${scaleY})`,
      borderRadius: 999,
      opacity,
      background: `radial-gradient(ellipse at center, rgba(${DOT_COLOR}, 0.38) 0%, rgba(${DOT_COLOR}, 0.2) 28%, rgba(${DOT_COLOR}, 0.08) 54%, transparent 76%)`,
      filter: "blur(14px)",
    }}
  />
);

const sleepPose = (): Pose => ({
  faceX: 0,
  faceY: 8,
  yaw: 0,
  rotate: 0,
  scale: 0.96,
  eyeX: 0,
  eyeY: 0,
  eyeScaleX: 1.05,
  eyeScaleY: 0.075,
  eyeOpacity: 0.78,
  browLiftLeft: 0.06,
  browLiftRight: 0.06,
  browAngleLeft: -1,
  browAngleRight: 1,
  browYLeft: 2,
  browYRight: 2,
  glowOpacity: 0.1,
  glowScaleY: 0.2,
  zOpacity: 1,
  intensity: 0.74,
});

const awakePose = (): Pose => ({
  faceX: 0,
  faceY: 0,
  yaw: 0,
  rotate: 0,
  scale: 1,
  eyeX: 0,
  eyeY: 0,
  eyeScaleX: 0.96,
  eyeScaleY: 1,
  eyeOpacity: 0.94,
  browLiftLeft: 0.12,
  browLiftRight: 0.12,
  browAngleLeft: 4,
  browAngleRight: -4,
  browYLeft: 0,
  browYRight: 0,
  glowOpacity: 0.28,
  glowScaleY: 1,
  zOpacity: 0,
  intensity: 0.94,
});

const inputPose = (): Pose => ({
  ...awakePose(),
  faceY: 6,
  eyeY: 8,
  eyeScaleX: 0.97,
  eyeScaleY: 0.96,
  browLiftLeft: 0.2,
  browLiftRight: 0.2,
  browAngleLeft: 2,
  browAngleRight: -2,
  browYLeft: 2,
  browYRight: 2,
});

const blendPose = (from: Pose, to: Pose, amount: number): Pose => ({
  faceX: mix(from.faceX, to.faceX, amount),
  faceY: mix(from.faceY, to.faceY, amount),
  yaw: mix(from.yaw, to.yaw, amount),
  rotate: mix(from.rotate, to.rotate, amount),
  scale: mix(from.scale, to.scale, amount),
  eyeX: mix(from.eyeX, to.eyeX, amount),
  eyeY: mix(from.eyeY, to.eyeY, amount),
  eyeScaleX: mix(from.eyeScaleX, to.eyeScaleX, amount),
  eyeScaleY: mix(from.eyeScaleY, to.eyeScaleY, amount),
  eyeOpacity: mix(from.eyeOpacity, to.eyeOpacity, amount),
  browLiftLeft: mix(from.browLiftLeft, to.browLiftLeft, amount),
  browLiftRight: mix(from.browLiftRight, to.browLiftRight, amount),
  browAngleLeft: mix(from.browAngleLeft, to.browAngleLeft, amount),
  browAngleRight: mix(from.browAngleRight, to.browAngleRight, amount),
  browYLeft: mix(from.browYLeft, to.browYLeft, amount),
  browYRight: mix(from.browYRight, to.browYRight, amount),
  glowOpacity: mix(from.glowOpacity, to.glowOpacity, amount),
  glowScaleY: mix(from.glowScaleY, to.glowScaleY, amount),
  zOpacity: mix(from.zOpacity, to.zOpacity, amount),
  intensity: mix(from.intensity, to.intensity, amount),
});

const getPose = (
  variant: ClipVariant,
  progress: number,
  loop: number,
): Pose => {
  const sleep = sleepPose();
  const awake = awakePose();
  const input = inputPose();

  if (variant === "sleep") {
    return sleep;
  }

  if (variant === "wake") {
    const open = segment(progress, 0.18, 0.46, easeOut);
    const shake =
      interpolate(
        progress,
        [0.08, 0.16, 0.24, 0.32, 0.42],
        [0, -1, 0.84, -0.46, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeInOut },
      ) *
      (1 - segment(progress, 0.42, 0.58, easeOut));
    const surprise =
      segment(progress, 0.5, 0.66, easeSnap) *
      (1 - segment(progress, 0.7, 1, easeOut));
    const pose = blendPose(sleep, awake, open);

    return {
      ...pose,
      faceX: pose.faceX + shake * 14 - surprise * 6,
      faceY: pose.faceY + Math.abs(shake) * 3 - surprise * 6,
      yaw: pose.yaw + shake * 15 - surprise * 7,
      rotate: pose.rotate + shake * -6 - surprise * 2,
      scale: pose.scale * (1 + surprise * 0.08),
      eyeX: pose.eyeX - surprise * 2,
      eyeY: pose.eyeY - surprise * 2,
      eyeScaleX: pose.eyeScaleX * (1 + surprise * 0.12),
      eyeScaleY: pose.eyeScaleY * (1 + surprise * 0.14),
      browLiftLeft: clamp(pose.browLiftLeft + surprise * 0.95),
      browLiftRight: clamp(pose.browLiftRight + surprise * 0.95),
      browAngleLeft: pose.browAngleLeft - surprise * 7,
      browAngleRight: pose.browAngleRight + surprise * 7,
      glowOpacity: pose.glowOpacity + surprise * 0.18,
      zOpacity: sleep.zOpacity * (1 - segment(progress, 0.08, 0.34, easeOut)),
    };
  }

  if (variant === "fallAsleep") {
    return blendPose(awake, sleep, segment(progress, 0.16, 0.82, easeOut));
  }

  if (variant === "lookInput") {
    return blendPose(awake, input, segment(progress, 0.08, 0.7, easeOut));
  }

  if (variant === "input") {
    const blink = pulse(loop, 0.68, 0.055);
    const breathe = Math.sin(loop * Math.PI * 2) * 0.7;

    return {
      ...input,
      faceY: input.faceY + breathe,
      yaw: Math.sin(loop * Math.PI * 2) * 1.2,
      rotate: Math.sin(loop * Math.PI * 2) * 0.25,
      eyeScaleY: input.eyeScaleY * mix(1, 0.12, blink),
      eyeOpacity: input.eyeOpacity * mix(1, 0.38, blink),
    };
  }

  if (variant === "startle") {
    const surprise =
      segment(progress, 0.05, 0.22, easeSnap) *
      (1 - segment(progress, 0.5, 1, easeOut));

    return {
      ...awake,
      faceX: -surprise * 7,
      faceY: -surprise * 8,
      yaw: -surprise * 8,
      rotate: -surprise * 3,
      scale: 1 + surprise * 0.09,
      eyeX: -surprise * 2,
      eyeY: -surprise * 2,
      eyeScaleX: awake.eyeScaleX * (1 + surprise * 0.14),
      eyeScaleY: awake.eyeScaleY * (1 + surprise * 0.16),
      browLiftLeft: clamp(awake.browLiftLeft + surprise * 0.95),
      browLiftRight: clamp(awake.browLiftRight + surprise * 0.95),
      browAngleLeft: awake.browAngleLeft - surprise * 9,
      browAngleRight: awake.browAngleRight + surprise * 9,
      glowOpacity: awake.glowOpacity + surprise * 0.2,
    };
  }

  if (variant === "send") {
    const look =
      segment(progress, 0.06, 0.22, easeSnap) *
      (1 - segment(progress, 0.48, 0.86, easeOut));
    const blink =
      segment(progress, 0.5, 0.58, Easing.out(Easing.cubic)) *
      (1 - segment(progress, 0.6, 0.78, easeOut));

    return {
      ...input,
      faceX: input.faceX + look * 10,
      faceY: input.faceY + look * 5,
      yaw: input.yaw + look * 15,
      rotate: input.rotate + look * 1.2,
      scale: input.scale + look * 0.03,
      eyeX: input.eyeX + look * 9,
      eyeY: input.eyeY + look * 6,
      eyeScaleX: input.eyeScaleX - look * 0.06,
      eyeScaleY: input.eyeScaleY * mix(1, 0.18, blink),
      eyeOpacity: input.eyeOpacity * mix(1, 0.42, blink),
      browLiftRight: input.browLiftRight + look * 0.76,
      browAngleLeft: input.browAngleLeft + look * 3,
      browAngleRight: input.browAngleRight - look * 10,
      glowOpacity: input.glowOpacity + look * 0.14,
    };
  }

  const lookLeft =
    segment(loop, 0.08, 0.22, easeOut) * (1 - segment(loop, 0.34, 0.46, easeOut));
  const lookRight =
    segment(loop, 0.48, 0.6, easeOut) * (1 - segment(loop, 0.73, 0.84, easeOut));
  const blink = pulse(loop, 0.9, 0.045);

  return {
    ...awake,
    faceX: -lookLeft * 6 + lookRight * 6,
    faceY: Math.sin(loop * Math.PI * 2) * 0.8,
    yaw: -lookLeft * 10 + lookRight * 10,
    rotate: -lookLeft * 0.5 + lookRight * 0.5,
    eyeX: -lookLeft * 7 + lookRight * 7,
    eyeScaleY: awake.eyeScaleY * mix(1, 0.08, blink),
    eyeOpacity: awake.eyeOpacity * mix(1, 0.32, blink),
    browLiftLeft: awake.browLiftLeft + lookLeft * 0.62,
    browLiftRight: awake.browLiftRight + lookRight * 0.62,
    browAngleLeft: awake.browAngleLeft - lookLeft * 8 + lookRight * 3,
    browAngleRight: awake.browAngleRight + lookRight * 8 - lookLeft * 3,
  };
};

export const MascotClip: React.FC<MascotClipProps> = ({ variant }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = frame / Math.max(1, durationInFrames - 1);
  const loop = progress;
  const pose = getPose(variant, progress, loop);
  const isLoop = variant === "sleep" || variant === "awake" || variant === "input";
  const ledFrame = isLoop
    ? (1 - Math.cos(loop * Math.PI * 2)) * 36
    : Math.sin(progress * Math.PI) * 36;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: FACE_WIDTH,
          height: FACE_HEIGHT,
          transform: [
            "translate(-50%, -50%)",
            `translate3d(${pose.faceX}px, ${pose.faceY}px, 0)`,
            `scale(${pose.scale})`,
            "perspective(520px)",
            `rotateY(${pose.yaw}deg)`,
            `rotateZ(${pose.rotate}deg)`,
          ].join(" "),
          transformOrigin: "50% 50%",
        }}
      >
        <Brow
          side="left"
          frame={ledFrame}
          lift={pose.browLiftLeft}
          angle={pose.browAngleLeft}
          y={pose.browYLeft}
          opacity={0.86}
          intensity={pose.intensity}
        />
        <Brow
          side="right"
          frame={ledFrame}
          lift={pose.browLiftRight}
          angle={pose.browAngleRight}
          y={pose.browYRight}
          opacity={0.86}
          intensity={pose.intensity}
        />
        <Glow
          x={83 + pose.eyeX * 0.4}
          y={76 + pose.eyeY * 0.3}
          opacity={pose.glowOpacity}
          scaleY={pose.glowScaleY}
        />
        <Glow
          x={201 + pose.eyeX * 0.4}
          y={76 + pose.eyeY * 0.3}
          opacity={pose.glowOpacity}
          scaleY={pose.glowScaleY}
        />
        <Eye
          eye={0}
          frame={ledFrame}
          scaleX={pose.eyeScaleX}
          scaleY={pose.eyeScaleY}
          x={pose.eyeX}
          y={pose.eyeY}
          skew={pose.yaw * 0.11}
          opacity={pose.eyeOpacity}
          intensity={pose.intensity}
        />
        <Eye
          eye={1}
          frame={ledFrame}
          scaleX={pose.eyeScaleX}
          scaleY={pose.eyeScaleY}
          x={pose.eyeX}
          y={pose.eyeY}
          skew={pose.yaw * 0.11}
          opacity={pose.eyeOpacity}
          intensity={pose.intensity}
        />
        {pose.zOpacity > 0 ? <SleepZ frame={ledFrame} progress={loop} /> : null}
      </div>
    </AbsoluteFill>
  );
};
