---
name: Dark Signal Portfolio
version: 0.1.0
status: draft
purpose: "A durable visual system for Tamirlan Askar's product design portfolio."
audience:
  - "Revolut design reviewers"
  - "Product and design leaders"
  - "AI coding agents implementing the portfolio UI"
principles:
  - "Product impact before decoration"
  - "Dark fintech control-room mood"
  - "Pixel signal, halftone texture, scan noise"
  - "Precise, restrained, readable"
  - "No generic SaaS portfolio styling"
tokens:
  colors:
    background:
      page: "#111111"
      panel: "#151515"
      panelRaised: "#191919"
      inverse: "#F4F4F0"
    text:
      primary: "#F2F2EE"
      secondary: "#A6A6A0"
      muted: "#70706A"
      disabled: "#4A4A46"
      inverse: "#111111"
    border:
      subtle: "#252521"
      default: "#34342E"
      strong: "#4A4A42"
      focus: "#9FFFD7"
    signal:
      active: "#9FFFD7"
      activeDim: "#4FD6B0"
      warning: "#E6D06C"
      danger: "#FF6B6B"
      neutral: "#D8D8D0"
    data:
      grid: "rgba(255, 255, 245, 0.055)"
      scan: "rgba(255, 255, 245, 0.08)"
      pixel: "rgba(255, 255, 245, 0.72)"
      shadow: "rgba(0, 0, 0, 0.55)"
  typography:
    fontFamilies:
      sans: "Inter, Manrope, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
      mono: "IBM Plex Mono, JetBrains Mono, SFMono-Regular, Consolas, Liberation Mono, monospace"
    weights:
      regular: 400
      medium: 500
      semibold: 600
      bold: 700
    scale:
      display:
        size: "clamp(56px, 9vw, 128px)"
        lineHeight: 0.9
        weight: 600
        letterSpacing: "0"
      h1:
        size: "clamp(44px, 7vw, 96px)"
        lineHeight: 0.95
        weight: 600
        letterSpacing: "0"
      h2:
        size: "clamp(32px, 4vw, 56px)"
        lineHeight: 1.02
        weight: 600
        letterSpacing: "0"
      h3:
        size: "clamp(22px, 2.5vw, 32px)"
        lineHeight: 1.1
        weight: 600
        letterSpacing: "0"
      body:
        size: "16px"
        lineHeight: 1.55
        weight: 400
        letterSpacing: "0"
      bodyLarge:
        size: "20px"
        lineHeight: 1.45
        weight: 400
        letterSpacing: "0"
      caption:
        size: "12px"
        lineHeight: 1.35
        weight: 500
        letterSpacing: "0.04em"
        transform: "uppercase"
      metric:
        size: "clamp(32px, 5vw, 72px)"
        lineHeight: 0.92
        weight: 600
        letterSpacing: "0"
        family: "mono"
  spacing:
    base: 4
    scale:
      1: "4px"
      2: "8px"
      3: "12px"
      4: "16px"
      5: "20px"
      6: "24px"
      8: "32px"
      10: "40px"
      12: "48px"
      16: "64px"
      20: "80px"
      24: "96px"
      32: "128px"
    page:
      mobile: "16px"
      tablet: "32px"
      desktop: "64px"
      wide: "80px"
    section:
      mobile: "72px"
      desktop: "128px"
  radii:
    none: "0"
    xs: "2px"
    sm: "4px"
    md: "6px"
    maxAllowed: "6px"
  borders:
    hairline: "1px solid #252521"
    default: "1px solid #34342E"
    focus: "1px solid #9FFFD7"
  shadows:
    none: "none"
    panel: "0 16px 60px rgba(0, 0, 0, 0.35)"
    glowSignal: "0 0 24px rgba(159, 255, 215, 0.18)"
  motion:
    durationFast: "120ms"
    durationBase: "220ms"
    durationSlow: "520ms"
    easing: "cubic-bezier(0.22, 1, 0.36, 1)"
    reducedMotion: "Keep all information visible without motion."
  components:
    button:
      radius: "4px"
      height: "40px"
      paddingX: "16px"
      font: "mono caption"
      defaultBackground: "transparent"
      defaultText: "#F2F2EE"
      defaultBorder: "#34342E"
      hoverBackground: "#F2F2EE"
      hoverText: "#111111"
      activeBackground: "#9FFFD7"
      activeText: "#111111"
    card:
      radius: "6px"
      background: "#151515"
      border: "#252521"
      paddingMobile: "20px"
      paddingDesktop: "28px"
      shadow: "none"
    metricCard:
      radius: "4px"
      background: "#151515"
      border: "#34342E"
      valueFont: "mono metric"
      labelFont: "mono caption"
      accent: "#9FFFD7"
    nav:
      height: "64px"
      background: "rgba(17, 17, 17, 0.82)"
      border: "#252521"
      blur: "12px"
    casePreview:
      radius: "6px"
      border: "#34342E"
      imageTreatment: "monochrome, high-contrast, optional halftone mask"
---

# Dark Signal Portfolio

This file is the visual source of truth for the portfolio rebuild. Every UI decision should map back to these tokens and rules. When the implementation needs a visual choice that is not explicit here, choose the option that feels more precise, darker, flatter, more editorial, and more product-systems-oriented.

## Overview

The portfolio should feel like a serious product-design control room rather than a personal landing page. It is dark, quiet, and technical. The reference mood is a near-black field with a pixel/halftone scan forming an abstract face or signal cloud: human, but mediated through data.

The site must still read as a senior product designer's portfolio. The pixel language is a visual system, not a gimmick. Use it to support themes of signal, evidence, product metrics, research, systems, fintech, and decision making.

## Colors

- Use `#111111` as the primary page background. Do not drift into blue-slate, purple-black, beige-black, or brown-black.
- Use off-white text, not pure white everywhere. Pure white is reserved for tiny highlights, selected states, and high-emphasis metric moments.
- Use muted gray text for metadata, labels, dates, captions, and secondary explanations.
- Use exactly one main accent family: cold signal green/cyan (`#9FFFD7`, dimmed as `#4FD6B0`).
- Accent color is for active states, focus rings, status dots, metric deltas, selected filters, and occasional scan highlights. It is not a background wash.
- Avoid big gradients. If depth is needed, use subtle noise, a hairline border, or controlled shadow.

## Typography

- Use a clean grotesk sans for paragraphs and headings.
- Use a mono face for metrics, timestamps, case metadata, labels, navigation numerals, and interface-like annotations.
- Letter spacing must be `0` for large type. Uppercase metadata may use small positive tracking.
- Hero typography should be large and calm, not loud or poster-like.
- Metrics should feel like instrument readings: numeric, sharp, compact, and easy to scan.
- Never use distressed, arcade, fantasy, or obviously "pixel game" fonts.

## Layout

- Start with a full-bleed dark hero field. The hero can contain a pixel/halftone portrait, scan cloud, or abstract data mass, but it must not become a split text/media layout.
- Preserve a hint of the next section on the first viewport across desktop and mobile.
- Use a restrained max width for text-heavy sections: about `720px` for body copy, `1120px` to `1280px` for case grids and metric systems.
- Case pages should read like product evidence: quick summary, metadata, metrics, problem, constraints, decision path, shipped solution, impact, learning.
- Do not use floating section cards. Sections are full-width dark bands or unframed layouts.
- Cards are allowed only for repeated case previews, metrics, compact evidence blocks, and quotes.

## Depth

- Depth should come from contrast, spacing, hairline borders, image treatment, and pixel density.
- Avoid glassmorphism, large blur panels, glossy reflections, and soft gradient blobs.
- Shadows must be subtle and black-only. Signal glow is allowed only on focused/active UI, not as decoration.
- Texture should be local and purposeful: halftone image masks, scan-line overlays, micro-grid, or sparse pixel dust.

## Shapes

- Radius is intentionally tight: `0px` to `6px`.
- Do not use pill-heavy UI unless the element is a small status tag or filter chip.
- Buttons and cards should look like precise interface surfaces, not soft marketing blocks.
- Lines can be used as structural grid marks, dividers, timelines, and metadata rails.
- Pixel motifs should be square, dot-matrix, or halftone; keep them monochrome unless a status state needs the signal accent.

## Components

### Navigation

- Use compact navigation with mono labels.
- Keep nav quiet: transparent or near-black with a single bottom border.
- Active section may use a small signal dot, bracket, underline, or text color change.

### Buttons

- Use sharp rectangular buttons with 2-4px radius.
- Primary action can invert to off-white or use signal green; choose one primary style per viewport.
- Include clear hover and focus states. Focus state uses signal border.
- Do not use oversized rounded CTA buttons.

### Case Cards

- Use flat dark panels with thin borders.
- Cover images should be real case visuals treated with monochrome, halftone, pixel crop, or scan overlay.
- Each card must show product/business signal: title, domain, role or timeline, and one measurable impact.
- Avoid decorative thumbnails that do not reveal the project.

### Metric Blocks

- Metrics should be large, mono, and paired with compact explanatory labels.
- Prefer clusters of 3-5 metrics. Do not create a generic dashboard unless it supports the case narrative.
- Use signal accent sparingly for deltas or active proof points.

### Hero Visual

- The hero visual should be a bitmap or canvas-rendered pixel/halftone field inspired by the reference image.
- It may be a portrait, an abstract scan cloud, or a signal map, but it should remain restrained and monochrome.
- The visual should never obscure the primary headline or essential CTA.
- Provide a static fallback for reduced motion and low-powered devices.

### Forms And Contact

- Contact UI should feel direct and operational: email, Telegram, LinkedIn, book a call.
- Inputs, if any, use dark fills, hairline borders, mono labels, and clear focus states.
- Avoid friendly SaaS form cards with large rounded corners.

## Do's And Don'ts

Do:

- Build from `#111111` outward.
- Use monochrome case imagery with pixel, scan, or halftone treatments.
- Make product impact visible early: users, revenue, conversion, retention, research efficiency.
- Keep typography sharp and readable.
- Use small terminal-like metadata to create structure.
- Use tight radii, thin borders, and disciplined spacing.
- Let empty space carry confidence.

Do not:

- Use purple or blue SaaS gradients.
- Use beige, cream, tan, brown, espresso, or warm editorial palettes.
- Use gradient orbs, bokeh blobs, glass cards, or soft 24px rounded containers.
- Make the site feel like a game, cyberpunk poster, NFT drop, or hacker theme.
- Hide the portfolio behind decorative animation.
- Put cards inside cards.
- Use in-app text explaining the visual style.
- Add generic stock imagery, fake dashboards, or fake product metrics.

## Accessibility

- Preserve strong contrast between text and background.
- Do not encode meaning with color alone; pair signal color with labels, icons, or position.
- Respect `prefers-reduced-motion`.
- Keep text selectable and real HTML wherever possible.
- Ensure pixel/halftone overlays never reduce body text readability.
- Focus states must be visible on all interactive elements.

## Implementation Mapping

- Treat the YAML tokens above as the starting source for Tailwind, CSS variables, or design-token generation.
- Keep CSS variables named by role, not raw color: `--color-bg-page`, `--color-text-primary`, `--color-signal-active`.
- Any new component must declare which token family it uses.
- If a visual change conflicts with this file, update this file in the same PR or do not ship the change.

## Visual QA Checklist

- The page reads as dark monochrome first, signal accent second.
- No section uses a generic light portfolio style.
- No card radius exceeds 6px.
- No gradient orb, beige palette, purple-blue SaaS treatment, or glass panel appears.
- Hero is full-bleed and dark, with a pixel/halftone/scan visual.
- Product impact is visible without scrolling too far.
- Desktop and mobile text remain readable, unclipped, and unobscured.
