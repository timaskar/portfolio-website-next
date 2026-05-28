import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type EyeMascotProps = {
  dotColor: string;
  warningColor: string;
  glowStrength: number;
  showPulse: boolean;
};

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));

const mix = (a: number, b: number, t: number) => a + (b - a) * t;

const pct = (frame: number, duration: number) => (frame / Math.max(1, duration - 1)) * 100;

const segment = (
  progress: number,
  from: number,
  to: number,
  easing = Easing.bezier(0.45, 0, 0.2, 1),
) =>
  interpolate(progress, [from, to], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

const bootGlyphs = "0101101001110010";
const statusSteps = [
  { text: "waking up...", from: 2, to: 35 },
  { text: "someone joined", from: 35, to: 59 },
  { text: "wait. that's a human", from: 59, to: 73 },
  { text: "oh, he's looking at me", from: 73, to: 100, final: true },
];

const Dot: React.FC<{
  row: number;
  col: number;
  eye: number;
  color: string;
  progress: number;
  blink: number;
  glowStrength: number;
}> = ({ row, col, eye, color, progress, blink, glowStrength }) => {
  const index = row * 5 + col + eye * 60;
  const distanceX = Math.abs(col - 2) / 2;
  const distanceY = Math.abs(row - 5.5) / 5.5;
  const noise = ((row * 17 + col * 31 + eye * 13) % 9) / 100;
  const booting = progress < 35;
  const shimmer = (Math.sin(progress * 0.28 + row * 0.72 + col * 1.14 + eye * 1.8) + 1) / 2;
  const baseOpacity = clamp(0.96 - distanceX * 0.1 - distanceY * 0.18 + noise, 0.38, 1);
  const collapseMask = clamp(1 - Math.abs(row - 5.5) * blink * 0.34, 0, 1);
  const opacity = baseOpacity * collapseMask;
  const glyph = bootGlyphs[(index * 7 + Math.floor(progress * 2.4) * 5) % bootGlyphs.length];
  const glyphOpacity = booting
    ? 0.96
    : clamp((0.42 + shimmer * 0.4 - distanceY * 0.1 + noise) * collapseMask, 0.16, 0.9);
  const cellGlow = booting ? 0.64 : opacity * (0.42 + shimmer * 0.2);

  return (
    <span
      style={{
        width: 5,
        height: 5,
        borderRadius: 1,
        display: "grid",
        placeItems: "center",
        backgroundColor: booting
          ? "rgba(242, 242, 238, 0.12)"
          : `rgba(${color}, ${opacity * 0.16})`,
        color: `rgba(${color}, ${glyphOpacity})`,
        fontFamily: '"IBM Plex Mono", "JetBrains Mono", SFMono-Regular, Consolas, monospace',
        fontSize: booting ? 7.5 : 7.2,
        fontWeight: 800,
        lineHeight: "5px",
        transform: `scale(${booting ? 1.18 : mix(1.02, 1.14, shimmer)})`,
        textShadow: [
          `0 0 ${booting ? 5 : mix(3, 6, shimmer)}px rgba(${color}, ${booting ? 0.74 : glyphOpacity * 0.56})`,
          `0 0 ${booting ? 13 : mix(9, 17, shimmer)}px rgba(${color}, ${booting ? 0.32 : glyphOpacity * 0.22})`,
        ].join(", "),
        boxShadow: booting
          ? "0 0 6px rgba(242, 242, 238, 0.64), 0 0 16px rgba(242, 242, 238, 0.26)"
          : [
              `0 0 ${4 * glowStrength}px rgba(${color}, ${cellGlow})`,
              `0 0 ${12 * glowStrength}px rgba(${color}, ${cellGlow * 0.42})`,
              `0 0 ${24 * glowStrength}px rgba(${color}, ${cellGlow * 0.16})`,
            ].join(", "),
      }}
    >
      {glyph}
    </span>
  );
};

const Eye: React.FC<{
  eye: number;
  color: string;
  progress: number;
  blink: number;
  wakeClosed: number;
  glowStrength: number;
}> = ({ eye, color, progress, blink, wakeClosed, glowStrength }) => {
  const power = segment(progress, 0, 6, Easing.bezier(0.16, 1, 0.3, 1));
  const open = segment(progress, 19, 31, Easing.bezier(0.16, 1, 0.3, 1));
  const startle = segment(progress, 69, 79, Easing.bezier(0.34, 1.56, 0.64, 1));
  const scaleX = mix(1.08, 1, open) * mix(1, 1.12, startle) * mix(1, 0.84, blink) * mix(1, 1.06, wakeClosed);
  const scaleY = mix(0.11, 1, open) * mix(1, 1.08, startle) * mix(1, 0.1, blink) * mix(1, 0.82, wakeClosed);

  return (
    <div
      style={{
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
        opacity: mix(0, 0.92, power) * mix(1, 0.32, blink),
        transform: `scaleX(${scaleX}) scaleY(${scaleY})`,
        filter: [
          `drop-shadow(0 0 ${8 * glowStrength}px rgba(${color}, 0.34))`,
          `drop-shadow(0 0 ${22 * glowStrength}px rgba(${color}, 0.16))`,
        ].join(" "),
      }}
    >
      {Array.from({ length: 60 }).map((_, index) => (
        <Dot
          key={index}
          row={Math.floor(index / 5)}
          col={index % 5}
          eye={eye}
          color={color}
          progress={progress}
          blink={blink}
          glowStrength={glowStrength}
        />
      ))}
    </div>
  );
};

const Glow: React.FC<{ x: number; progress: number; color: string }> = ({ x, progress, color }) => {
  const boot = segment(progress, 0, 13);
  const startle = segment(progress, 69, 79, Easing.bezier(0.34, 1.56, 0.64, 1));
  const blink = segment(progress, 79, 88, Easing.bezier(0.7, 0, 0.84, 0));
  const opacity = (0.14 + boot * 0.28 + startle * 0.24) * (1 - blink);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 76,
        width: 98,
        height: 150,
        transform: "translate(-50%, -50%)",
        borderRadius: 999,
        opacity,
        background: `radial-gradient(ellipse at center, rgba(${color}, 0.38) 0%, rgba(${color}, 0.2) 28%, rgba(${color}, 0.08) 52%, transparent 76%)`,
        filter: "blur(13px)",
      }}
    />
  );
};

const Brow: React.FC<{
  x: number;
  lift: number;
  angle: number;
  color: string;
  glowStrength: number;
}> = ({
  x,
  lift,
  angle,
  color,
  glowStrength,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: -44,
      width: 74,
      height: 24,
      display: "grid",
      gridTemplateColumns: "repeat(8, 5px)",
      gridAutoRows: "5px",
      gap: 3,
      alignContent: "center",
      justifyContent: "center",
      opacity: mix(0.58, 0.94, lift),
      transform: `translate3d(0, ${mix(0, -24, lift)}px, 0) rotateZ(${angle}deg) scaleX(${mix(0.96, 1.03, lift)})`,
      filter: [
        `drop-shadow(0 0 ${mix(8, 16, lift) * glowStrength}px rgba(${color}, ${mix(0.18, 0.3, lift)}))`,
        `drop-shadow(0 0 ${mix(18, 34, lift) * glowStrength}px rgba(${color}, ${mix(0.06, 0.14, lift)}))`,
      ].join(" "),
      transformOrigin: "50% 50%",
    }}
  >
    {Array.from({ length: 24 }).map((_, index) => {
      const col = index % 8;
      const row = Math.floor(index / 8);
      const opacity = clamp(0.82 - Math.abs(col - 3.5) * 0.035 - row * 0.075, 0.48, 0.9);
      return (
        <span
          key={index}
          style={{
            width: 5,
            height: 5,
            borderRadius: 999,
            backgroundColor: `rgba(${color}, ${opacity})`,
            boxShadow: [
              `0 0 ${5 * glowStrength}px rgba(${color}, ${opacity * 0.54})`,
              `0 0 ${14 * glowStrength}px rgba(${color}, ${opacity * 0.2})`,
              `0 0 ${26 * glowStrength}px rgba(${color}, ${opacity * 0.08})`,
            ].join(", "),
          }}
        />
      );
    })}
  </div>
);

const Status: React.FC<{ progress: number }> = ({ progress }) => {
  const statusExit = segment(progress, 91, 100, Easing.bezier(0.7, 0, 0.84, 0));

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 602,
        transform: "translateX(-50%)",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) 28ch minmax(0, 1fr)",
        columnGap: 12,
        alignItems: "center",
        width: 560,
        fontFamily: '"IBM Plex Mono", "JetBrains Mono", SFMono-Regular, Consolas, monospace',
        fontSize: 13,
        letterSpacing: "0.055em",
        textTransform: "uppercase",
        opacity: 1 - statusExit,
      }}
    >
      <span
        style={{
          justifySelf: "end",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          color: "#70706a",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: "rgba(159, 255, 215, 0.8)",
            boxShadow: "0 0 8px rgba(159, 255, 215, 0.46), 0 0 18px rgba(159, 255, 215, 0.16)",
          }}
        />
        status
      </span>
      <span style={{ position: "relative", width: "28ch", height: "1.4em", textAlign: "center" }}>
        {statusSteps.map((item) => {
          const fadeIn = segment(progress, item.from, item.from + 4, Easing.bezier(0.16, 1, 0.3, 1));
          const fadeOut = item.final ? 0 : segment(progress, item.to - 5, item.to, Easing.bezier(0.7, 0, 0.84, 0));
          const emphasis = item.final ? segment(progress, item.from, item.from + 5, Easing.bezier(0.34, 1.56, 0.64, 1)) : 0;
          const opacity = fadeIn * (1 - fadeOut);
          return (
            <span
              key={item.text}
              style={{
                position: "absolute",
                inset: 0,
                opacity,
                color: "#f2f2ee",
                fontWeight: item.final ? 700 : 500,
                letterSpacing: item.final ? "0.08em" : "0.055em",
                transform: `translateY(${mix(5, 0, fadeIn) - fadeOut * 4}px) scale(${1 + emphasis * 0.045})`,
                textShadow: item.final
                  ? "0 0 10px rgba(242, 242, 238, 0.42), 0 0 24px rgba(242, 242, 238, 0.18)"
                  : "none",
                whiteSpace: "nowrap",
              }}
            >
              {item.text}
            </span>
          );
        })}
      </span>
      <span />
    </div>
  );
};

export const EyeMascot: React.FC<EyeMascotProps> = ({
  dotColor,
  glowStrength,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = pct(frame, durationInFrames);

  const enter = segment(progress, 0, 10, Easing.bezier(0.16, 1, 0.3, 1));
  const wakeIn = segment(progress, 2, 6, Easing.bezier(0.16, 1, 0.3, 1));
  const wakeOut = segment(progress, 23, 33, Easing.bezier(0.22, 1, 0.36, 1));
  const wake = wakeIn * (1 - wakeOut);
  const wakeClosed = wake * (1 - segment(progress, 22, 32, Easing.bezier(0.16, 1, 0.3, 1)));
  const wakeSwing =
    interpolate(progress, [4, 9, 14, 19, 24, 30], [0, -1, 0.82, -0.5, 0.22, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }) * wake;
  const left = segment(progress, 32, 40) * (1 - segment(progress, 43, 49));
  const right = segment(progress, 47, 53) * (1 - segment(progress, 64, 69));
  const startle = segment(progress, 69, 79, Easing.bezier(0.34, 1.56, 0.64, 1));
  const recoil =
    segment(progress, 73, 79, Easing.bezier(0.34, 1.56, 0.64, 1)) *
    (1 - segment(progress, 80, 91, Easing.bezier(0.22, 1, 0.36, 1)));
  const blinkClose = segment(progress, 79, 83, Easing.out(Easing.cubic));
  const blinkOpen = segment(progress, 84, 91, Easing.bezier(0.16, 1, 0.3, 1));
  const blink = blinkClose * (1 - blinkOpen);
  const fly = segment(progress, 84, 100, Easing.bezier(0.22, 1, 0.36, 1));
  const opacity = enter;

  const leftBrow = clamp(left + startle * 0.9 + wakeClosed * 0.18 - blink * 0.55);
  const rightBrow = clamp(right + startle * 0.9 + wakeClosed * 0.18 - blink * 0.55);
  const leftBrowAngle = -5 * wakeClosed - 10 * left + 5 * startle;
  const rightBrowAngle = 5 * wakeClosed + 10 * right - 5 * startle;
  const shakeX = wakeSwing * 11;
  const shakeY = Math.abs(wakeSwing) * 2.2;
  const wakeYaw = wakeSwing * 16;
  const wakeRotate = wakeSwing * -5.5;
  const x = -16 * left + 16 * right + shakeX - 7 * recoil;
  const yaw = -18 * left + 18 * right + wakeYaw - 7 * recoil;
  const rotateZ = -0.35 * left + 0.35 * right + wakeRotate - 3.5 * recoil;
  const startleY = interpolate(startle, [0, 0.35, 1], [0, 2, -7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flyY = interpolate(fly, [0, 1], [0, -172], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 350,
          width: 284,
          height: 162,
          opacity,
          transform: [
            "translate(-50%, -50%)",
            `translate3d(${x}px, ${startleY + flyY + shakeY - 24 * recoil}px, 0)`,
            `scale(${mix(0.96, 1, enter) * mix(0.99, 1.025, wake) * mix(1, 1.07, recoil) * mix(1, 0.68, fly)})`,
            `scaleX(${mix(1, 1.08, startle) * mix(1, 0.78, blink)})`,
            `scaleY(${mix(1, 1.04, startle) * mix(1, 0.18, blink)})`,
            "perspective(520px)",
            `rotateY(${yaw}deg)`,
            `rotateZ(${rotateZ}deg)`,
          ].join(" "),
          transformOrigin: "50% 50%",
        }}
      >
        <Brow x={24} lift={leftBrow} angle={leftBrowAngle} color={dotColor} glowStrength={glowStrength} />
        <Brow x={186} lift={rightBrow} angle={rightBrowAngle} color={dotColor} glowStrength={glowStrength} />
        <Glow x={72} progress={progress} color={dotColor} />
        <Glow x={212} progress={progress} color={dotColor} />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 76,
            transform: "translate(-50%, -50%)",
            display: "flex",
            gap: 72,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Eye
            eye={0}
            color={dotColor}
            progress={progress}
            blink={blink}
            wakeClosed={wakeClosed}
            glowStrength={glowStrength}
          />
          <Eye
            eye={1}
            color={dotColor}
            progress={progress}
            blink={blink}
            wakeClosed={wakeClosed}
            glowStrength={glowStrength}
          />
        </div>
      </div>
      <Status progress={progress} />
    </AbsoluteFill>
  );
};
