---
name: Ambient Chat Portfolio
version: 0.2.0
status: draft
purpose: "A durable visual system for Tamirlan Askar's chat-first product design portfolio."
audience:
  - "Revolut design reviewers"
  - "Product and design leaders"
  - "AI coding agents implementing the portfolio UI"
principles:
  - "The chat composer is the primary interface object"
  - "Assistant responses stay mostly unframed and readable"
  - "User requests appear as compact glass bubbles"
  - "Suggestions are soft glass chips, not generic CTA pills"
  - "Black stage, warm off-white type, restrained signal glow"
  - "No generic SaaS portfolio styling"
tokens:
  colors:
    background:
      page: "#000000"
      panel: "#090909"
      panelRaised: "#101010"
      fade: "rgba(0, 0, 0, 0.92)"
    text:
      primary: "#F2F2EE"
      secondary: "#A6A6A0"
      muted: "#70706A"
      dim: "rgba(242, 242, 238, 0.56)"
      placeholder: "rgba(242, 242, 238, 0.44)"
      inverse: "#000000"
    border:
      subtle: "#252521"
      default: "#34342E"
      glass: "rgba(255, 255, 255, 0.15)"
      glassSoft: "rgba(255, 255, 255, 0.12)"
      glassHover: "rgba(230, 255, 248, 0.32)"
      request: "rgba(221, 255, 244, 0.24)"
      focus: "rgba(159, 255, 215, 0.42)"
    surface:
      glass: "rgba(255, 255, 255, 0.075)"
      glassStrong: "rgba(255, 255, 255, 0.11)"
      glassChip: "rgba(255, 255, 255, 0.055)"
      glassChipHover: "rgba(230, 255, 248, 0.12)"
      request: "rgba(225, 255, 246, 0.13)"
      send: "rgba(255, 255, 255, 0.11)"
      sendHover: "rgba(255, 255, 255, 0.16)"
    signal:
      active: "#9FFFD7"
      activeDim: "#4FD6B0"
      warning: "#E6D06C"
      neutral: "#D8D8D0"
      glow: "rgba(230, 255, 248, 0.10)"
    effects:
      glassShine: "rgba(255, 255, 255, 0.22)"
      shadow: "rgba(0, 0, 0, 0.56)"
      pixel: "rgba(242, 242, 238, 0.82)"
      pixelDim: "rgba(242, 242, 238, 0.18)"
      scan: "rgba(242, 242, 238, 0.055)"
  typography:
    fontFamilies:
      sans: "Inter, Manrope, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
      mono: "IBM Plex Mono, JetBrains Mono, SFMono-Regular, Consolas, Liberation Mono, monospace"
    weights:
      regular: 400
      medium: 500
      semibold: 650
      response: 620
      bold: 700
    scale:
      assistantIdle:
        size: "clamp(28px, 3.6vw, 42px)"
        lineHeight: 1.08
        weight: 620
        letterSpacing: "0"
      assistantThread:
        size: "14px"
        lineHeight: 1.45
        weight: 500
        letterSpacing: "0"
      requestBubble:
        size: "14px"
        lineHeight: 1.3
        weight: 400
        letterSpacing: "0"
      control:
        size: "14px"
        lineHeight: 1.2
        weight: 650
        letterSpacing: "0"
      input:
        size: "14px"
        lineHeight: "40px"
        weight: 400
        letterSpacing: "0"
      monoMeta:
        size: "11px"
        lineHeight: 1.25
        weight: 600
        letterSpacing: "0.04em"
        transform: "uppercase"
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
    page:
      mobile: "16px"
      desktop: "24px"
    chat:
      idleWidth: "min(560px, calc(100vw - 48px))"
      activeWidth: "min(760px, calc(100vw - 48px))"
      mobileWidth: "calc(100vw - 32px)"
      threadGap: "10px"
      suggestionGap: "7px"
      composerGap: "8px"
      bottomOffset: "clamp(28px, 5vh, 54px)"
  radii:
    glassLarge: "28px"
    glassLargeMobile: "32px"
    request: "22px"
    requestTail: "10px"
    suggestion: "18px"
    suggestionMobile: "21px"
    iconCircle: "999px"
    card: "6px"
    pixel: "1px"
  borders:
    glass: "1px solid rgba(255, 255, 255, 0.15)"
    suggestion: "1px solid rgba(255, 255, 255, 0.12)"
    suggestionHover: "1px solid rgba(230, 255, 248, 0.32)"
    request: "1px solid rgba(221, 255, 244, 0.24)"
    focus: "1px solid rgba(159, 255, 215, 0.42)"
  shadows:
    composer:
      - "inset 0 1px 0 rgba(255, 255, 255, 0.13)"
      - "inset 0 -1px 0 rgba(255, 255, 255, 0.035)"
      - "0 24px 80px rgba(0, 0, 0, 0.34)"
    bubble:
      - "inset 0 1px 0 rgba(255, 255, 255, 0.11)"
      - "inset 0 -1px 0 rgba(255, 255, 255, 0.035)"
      - "0 18px 58px rgba(0, 0, 0, 0.28)"
    suggestionHover: "0 0 28px rgba(230, 255, 248, 0.10)"
    sendHover: "0 0 30px rgba(255, 255, 255, 0.10)"
  filters:
    composerGlass: "blur(34px) saturate(1.42)"
    bubbleGlass: "blur(30px) saturate(1.35)"
    suggestionGlass: "blur(22px) saturate(1.22)"
    sendGlass: "blur(18px) saturate(1.18)"
  motion:
    durationFast: "150ms"
    durationBase: "160ms"
    durationPanel: "360ms"
    durationLayout: "620ms"
    durationEnter: "760ms"
    easing: "cubic-bezier(0.16, 1, 0.3, 1)"
    reducedMotion: "Keep the chat usable and visible without mascot or entrance motion."
components:
  composer:
    width: "min(560px, 100%)"
    grid: "minmax(0, 1fr) auto"
    radius: "28px"
    padding: "6px 6px 6px 17px"
    mobilePadding: "8px 8px 8px 16px"
    background: "rgba(255, 255, 255, 0.11)"
    border: "rgba(255, 255, 255, 0.15)"
    backdrop: "blur(34px) saturate(1.42)"
  promptInput:
    height: "40px"
    mobileHeight: "42px"
    padding: "0 2px"
    background: "transparent"
    placeholder: "rgba(242, 242, 238, 0.44)"
  sendButton:
    size: "40px"
    mobileSize: "42px"
    radius: "999px"
    iconSize: "16px"
    iconStroke: "2.4"
  suggestion:
    minHeight: "36px"
    mobileMinHeight: "42px"
    maxWidth: "280px"
    radius: "18px"
    mobileRadius: "21px"
    padding: "7px 9px 7px 13px"
    mobilePadding: "9px 10px 9px 14px"
    arrowSize: "20px"
  requestBubble:
    maxWidth: "min(420px, 82%)"
    radius: "22px"
    tailRadius: "10px"
    padding: "7px 12px 8px"
  assistantResponse:
    idleAlignment: "center"
    threadAlignment: "left"
    bubble: "none"
---

# Ambient Chat Portfolio

This file is the visual source of truth for the portfolio rebuild. The current product is a chat-first portfolio, not a static portfolio page with a chat widget attached. Every new screen, section, generated response, or component should feel like it grew from the composer, suggestions, and request bubble already in the interface.

When implementation needs a visual choice that is not explicit here, choose the option that feels closer to the current chat chrome: black stage, soft translucent glass, compact off-white type, subtle inner shine, and restrained signal glow.

## North Star

The interface should feel like an ambient AI portfolio agent on a black stage. The user is not entering a marketing site; they are starting a conversation with Tim's work.

The visual center is the input composer. Suggestions sit directly above it as lightweight next actions. The user request becomes a compact glass bubble. The assistant response is mostly text, not another card. This hierarchy matters more than decorative portfolio conventions.

Pixel, scan, and signal details still exist, but they are supporting texture for the mascot, case preview art, and focused states. They are no longer the whole design system.

## Color

- Use `#000000` as the primary page background. The experience should read as true black, not charcoal, navy, purple, or warm editorial dark.
- Use `#F2F2EE` for primary text. It should feel warm and readable without becoming pure white everywhere.
- Use muted off-white alpha values for secondary UI: `rgba(242, 242, 238, 0.76)`, `0.56`, and `0.44` are preferred steps.
- Glass surfaces use white alpha on black, not colored panels: `rgba(255, 255, 255, 0.055)` through `0.11`.
- Signal green `#9FFFD7` remains available for focus, selected case accents, and rare active proof moments. It should not become a large background wash.
- Hover states may use the soft mint-white tint `rgba(230, 255, 248, 0.12)` with a low glow.
- Avoid beige, tan, brown, espresso, purple-blue SaaS gradients, and colorful ambient blobs.

## Typography

- Use the sans stack for chat, controls, portfolio copy, and interface labels.
- Use mono only for metadata, case tags, timestamps, technical labels, and tiny system readings.
- Letter spacing is `0` for chat text, input text, buttons, suggestions, and headings. Only compact mono metadata may use positive tracking.
- The idle assistant prompt is large and quiet: `clamp(28px, 3.6vw, 42px)`, `620` weight, `1.08` line height.
- After the user asks something, assistant copy becomes compact: `14px`, `500`, `1.45` on desktop. Mobile may use `16px` with tighter line height when readability needs it.
- User requests, suggestions, and input text are `14px`. Suggestions and send controls use `650` weight.
- Do not introduce poster typography, novelty pixel fonts, distressed type, or oversized marketing headlines unless the chat surface is no longer the primary screen.

## Layout

- Keep the first screen centered on the mascot, assistant prompt, composer, and suggestions.
- The idle chat stack uses `min(560px, calc(100vw - 48px))`.
- Once the user has asked something, the active chat width can expand to `min(760px, calc(100vw - 48px))`.
- The active thread scrolls above the suggestions and composer. The composer stays near the bottom at `clamp(28px, 5vh, 54px)`.
- Use a black bottom fade behind the active composer area so the thread disappears cleanly into the input zone.
- Suggestions belong directly above the composer. Do not move them into a separate card, sidebar, hero panel, or marketing section.
- On mobile, the chat stack uses `calc(100vw - 32px)`, suggestions stack vertically, and the composer stays full width.

## Glass System

Glass is now a core interface material, but it must stay precise and low-contrast.

- Composer glass: `rgba(255,255,255,0.11)`, `1px` white alpha border, `blur(34px) saturate(1.42)`, radius `28px`.
- Suggestion glass: `rgba(255,255,255,0.055)`, `blur(22px) saturate(1.22)`, radius `18px`.
- Request bubble glass: `rgba(225,255,246,0.13)` with a mint-white border and one tighter tail corner.
- Use inner highlights for glass: a subtle top inset line and a very faint bottom inset line.
- Use black shadows for depth. Glows are allowed on hover and focus only.
- Do not create large glass cards for whole page sections. Glass is for chat controls, request bubbles, small chips, scroll controls, and focused micro-surfaces.

## Components

### Composer

- The composer is the primary control and should be treated as a first-class component.
- Use a two-column grid: flexible input plus circular send button.
- Desktop composer: radius `28px`, padding `6px 6px 6px 17px`, gap `8px`, width `min(560px, 100%)`.
- Mobile composer: radius `32px`, padding `8px 8px 8px 16px`.
- The input itself is transparent. The glass belongs to the composer shell, not the input field.
- Prompt text is `14px`; placeholder is `rgba(242,242,238,0.44)`.
- Keep the input vertically calm: `40px` line height on desktop, `42px` height on mobile.
- Do not add labels, helper text, validation copy, or a form card around the composer unless the user task explicitly requires it.

### Send Button

- The send button is a circular glass icon button: `40px` desktop, `42px` mobile.
- Use an arrow icon, not a text label.
- Border is `rgba(255,255,255,0.18)`, background is `rgba(255,255,255,0.11)`.
- Hover and focus increase the border and fill slightly, with a soft white glow.
- Keep icon size at `16px` with an approximately `2.4px` stroke.

### Suggestions

- Suggestions are follow-up chips, not primary buttons.
- They sit in a horizontal rail on desktop with `7px` gaps and horizontal overflow.
- Each suggestion uses a text label plus a small circular arrow container.
- Desktop chip: min height `36px`, max width `280px`, radius `18px`, padding `7px 9px 7px 13px`.
- Mobile chip: full width, min height `42px`, radius `21px`, padding `9px 10px 9px 14px`.
- Text truncates with ellipsis on one line. Do not allow chip text to wrap unless the chip design is intentionally changed.
- Hover, focus, and active states use `rgba(230,255,248,0.12)` fill, a mint-white border, and a small glow.
- The arrow circle is `20px`; on hover it moves `2px` to the right.
- Hide used suggestions rather than leaving inactive clutter in the rail.

### Request Bubble

- The user request bubble is the only default message bubble in the active thread.
- It aligns right and stays compact: max width `min(420px, 82%)`.
- Active request bubble uses radius `22px` with a tighter bottom-right corner at `10px`.
- Padding is `7px 12px 8px`; text is `14px`, line height `1.3`.
- Background is `rgba(225,255,246,0.13)`, border is `rgba(221,255,244,0.24)`.
- The bubble should feel like a quiet glass receipt of the user's prompt, not a CTA and not a large card.

### Assistant Response

- Assistant response text is usually unframed.
- In the idle state, the assistant message is centered and large: "Ask me about Tim" is the model for scale and tone.
- In the active thread, assistant text aligns left and becomes compact body copy.
- Do not wrap assistant answers in a glass panel by default.
- Use cards only inside assistant responses when showing repeated artifacts such as case previews, evidence blocks, or downloadable items.
- If a response contains case previews, cards stay flat and dark with tight `6px` radius, not large glass bubbles.

### Thread And Fade

- The active thread scrolls without visible scrollbars.
- Use vertical masks at the top and bottom of the thread so content fades into the stage.
- Keep the thread above the suggestion rail and composer. The input area always wins the visual hierarchy.
- The bottom fade should be black, progressing from transparent to near-black to `#000000`.

### Case Preview Cards

- Case cards are the exception to the soft glass language: they are flat dark evidence objects.
- Use `6px` radius, thin off-white alpha borders, and a dark `rgba(12,12,12,0.94)` surface.
- Art can use grid, scan, pixel, path, and tiny signal accents.
- Each card should reveal product/business signal: title, domain, source, role, timeline, or measurable impact.
- Do not let case cards become generic bento cards or decorative thumbnails.

### Mascot And Pixel Detail

- The mascot is an ambient companion for the input, not a decorative logo.
- Pixel LEDs, eye glow, scan texture, and tiny mono details are allowed in the mascot and case art.
- Pixel motifs should stay small, luminous, and purposeful.
- Do not spread pixel blocks across every section or turn the site into a dense technical theme.

## Motion

- Motion should support attention: composer entry, mascot gaze, suggestion hover, arrow nudge, and card reveal.
- UI hover/focus transitions are usually `150ms` to `160ms` with `cubic-bezier(0.16, 1, 0.3, 1)`.
- Larger layout transitions can use `620ms`.
- The console entrance can use `760ms`.
- Respect `prefers-reduced-motion`: the chat must remain fully usable and readable without animation.
- Avoid decorative motion that distracts from reading the response or using the composer.

## Do's And Don'ts

Do:

- Build new UI outward from the composer, suggestions, and request bubble.
- Use true black as the stage.
- Use soft glass only for controls and compact chat surfaces.
- Keep assistant responses mostly text-first and unframed.
- Keep suggestion chips concise, actionable, and close to the input.
- Use signal green sparingly for focus, selection, and case evidence.
- Let the mascot and small pixels provide personality.

Do not:

- Revert to the previous pixel-first system as the dominant style.
- Use sharp rectangular buttons for the main chat controls.
- Ban glass or pill radii in chat chrome; they are now intentional.
- Add generic SaaS hero sections, split hero cards, gradient orbs, or bokeh blobs.
- Wrap the input, suggestions, and response inside a large parent card.
- Put cards inside cards.
- Add in-app text explaining how the interface works.
- Turn every assistant response into a dashboard, bento grid, or framed panel.
- Use beige, tan, brown, purple-blue gradients, or stock portfolio imagery.

## Accessibility

- Preserve strong contrast between off-white text and the black stage.
- Focus states must be visible on composer, send button, suggestions, scroll controls, and case cards.
- Do not encode meaning with color alone; pair signal color with position, text, icon state, or selection state.
- Keep chat text selectable and real HTML wherever possible.
- Ensure glass and masks never reduce body text readability.
- Maintain stable control sizes so hover, focus, loading, or active states do not shift layout.

## Implementation Mapping

- Treat the YAML tokens above as the starting source for CSS variables or design-token generation.
- Keep variable names role-based: `--bg-page`, `--text-primary`, `--glass-fill`, `--glass-fill-strong`, `--glass-border`, `--signal-active`.
- New chat components should declare whether they are composer glass, suggestion glass, request bubble, unframed assistant text, flat evidence card, or mascot detail.
- If generated UI conflicts with this file, update this file in the same change or keep the generated UI aligned with the chat system.

## Visual QA Checklist

- The first screen reads as a chat-first portfolio agent, not a conventional landing page.
- The composer is the strongest interface object.
- Suggestions sit close to the composer and match the soft glass chip style.
- The user's request appears as a compact right-aligned glass bubble.
- Assistant responses are unframed text by default.
- Glass is subtle, translucent, and black-stage compatible.
- Signal green is present only as focus, selection, or evidence accent.
- No old rectangular button style appears in the chat chrome.
- No generic SaaS hero, gradient orb, beige palette, purple-blue treatment, or large glass card appears.
- Desktop and mobile text remain readable, unclipped, and unobscured.
