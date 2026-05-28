# Remotion Eye Mascot

Transparent LED/dot-display eye mascot concept for the portfolio loading intro.

## Commands

```bash
npm install
npm run studio
npm run still
npm run render:webm
```

## Outputs

- `out/eye-mascot-warning-frame.png` — single-frame preview around `subject noticed`.
- `out/eye-mascot-transparent.webm` — transparent VP9 WebM for web embedding.

## Motion

The animation is frame-driven with Remotion APIs only:

- `useCurrentFrame()`
- `useVideoConfig()`
- `interpolate()`
- `Easing.bezier()`
- `spring()`

There are no CSS keyframes or CSS transitions in the Remotion composition.
