# Remotion Prompt: LED Eye Mascot

Create a Remotion animation for a transparent-background LED/dot-display eye mascot.

## Goal

Make a tiny, friendly, slightly mysterious mascot made from two vertical eyes plus two very minimal LED-dot eyebrows. The eyes should feel like they are built from individual glowing LED dots on a dark/transparent display, not like flat CSS rectangles. The mascot is not a full face: no head shape, no mouth, no outline. The character emerges only from the eyes, brows, and their motion.

## Output

- Remotion composition.
- Transparent background.
- 30fps.
- 6.5 seconds.
- 1200x720 canvas.
- Export target: transparent WebM VP9 for web use, with PNG image frames and alpha.
- The animation should be usable as a website loading intro overlay.

## Visual Style

- Near-monochrome off-white LED dots.
- Dots should have subtle per-dot brightness variation, like a physical dot-matrix display.
- Dots should softly glow and illuminate nearby transparent space.
- No visible rectangular panel, no grid background, no face oval.
- The eyes are vertical rounded columns made from dots.
- Brows are also built from dots. They should be friendly and curious, not angry.
- During the warning/startle moment, the dots may briefly shift to a muted yellow warning color, but there should be no large yellow radial ping.
- Keep the style refined and high-end, not gamer, arcade, cyberpunk, or meme-like.

## Motion Story

Timeline:

1. `0.0s - 0.7s`: Eyes appear from almost nothing. Dots warm up unevenly, with a few late pixels.
2. `0.7s - 1.7s`: Mascot looks left. The entire eye-pair rotates as one object in perspective, not two independent eyes. Add a tiny anticipation in the opposite direction before turning.
3. `1.7s - 2.8s`: Mascot looks right. Same unified object behavior: the eye-pair turns as one rigid, soft object.
4. `2.8s - 3.7s`: Mascot returns to center and holds. Add a tiny settle/overshoot, then calm.
5. `3.7s - 4.5s`: Mascot notices the viewer. Eyes open slightly taller/wider, both brows lift, and the dots briefly warm toward yellow. Avoid a big radial yellow pulse.
6. `4.5s - 5.4s`: Mascot blinks hard by collapsing the dot-matrix vertically. It should feel like the eyes shut, not like the object fades.
7. `5.4s - 6.5s`: Eyes sink/hide downward and fade out, revealing the website.

## Animation Principles

- Use Remotion frame-driven animation only: `useCurrentFrame()`, `useVideoConfig()`, `interpolate()`, `Easing.bezier()`, and `spring()` when useful.
- Do not use CSS animations or transitions.
- Separate timing from mapping: define progress values for enter, look-left, look-right, center, startle, blink, and exit.
- Use anticipation, overshoot, and settle:
  - Before looking left/right, move 2-4px in the opposite direction.
  - Turn quickly, then slow into the final angle.
  - On return to center, overshoot by 2-3 degrees and settle.
  - On startle, use a small squash/stretch: down-compress for a few frames, then open taller.
- Keep left/right eyes synchronized as one character. The eye pair can rotate/translate together; individual eyes should not rotate in opposite ways.
- Perspective should affect the whole eye pair: `rotateY`, slight `rotateZ`, small `translateX`, and `scaleX`.
- The actual eye dots should remain attached to the eye columns.
- Brow behavior: when looking left, the left brow lifts; when looking right, the right brow lifts. On startle, both brows lift briefly.

## Suggested Timing And Curves

- Enter: `Easing.bezier(0.34, 1.56, 0.64, 1)` for a subtle soft pop.
- Look turns: `Easing.bezier(0.16, 1, 0.3, 1)` for fast-to-slow movement.
- Anticipation: `Easing.bezier(0.7, 0, 0.84, 0)`.
- Settle: `Easing.bezier(0.22, 1, 0.36, 1)`.
- Exit: `Easing.bezier(0.7, 0, 0.84, 0)`.

## Dot Matrix Details

- Each eye should be rendered as real dot elements or generated circles, not a flat gradient fill.
- Recommended matrix per eye: 5 columns x 12 rows.
- Dot size: 4-6px depending on canvas scale.
- Gap: 2-4px.
- Opacity variation: center dots brighter, outer/top/bottom dots slightly dimmer.
- Add tiny deterministic brightness flicker by frame, dot index, and eye index.
- During blink, reduce the visible matrix height or dot scaleY from full height to about 8-12% height.
- Eyebrows use a smaller 7 columns x 2 rows dot matrix.
- During startle, increase brightness and local glow before collapsing. Do not render a large yellow circular ping.

## Composition Contract

Expose props:

- `dotColor`: default `rgba(242, 242, 238, 1)`
- `warningColor`: default `rgba(230, 208, 108, 1)`
- `glowStrength`: default `1`
- `transparent`: default `true`
- `showPulse`: default `false`

The composition should render correctly over any dark website background.
