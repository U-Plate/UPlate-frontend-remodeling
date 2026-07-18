---
name: UPlate
description: A free, AI-powered meal-planning companion for university students
colors:
  pale-sky: "#DCEDFF"
  surface-white: "#FFFFFF"
  surface-soft: "#F3F8FF"
  surface-sunken: "#EAF2FC"
  powder-blue: "#94B0DA"
  accent-strong: "#6F92C5"
  slate-indigo: "#4E6088"
  deep-navy: "#3A4C7E"
  ink-navy: "#14213D"
  ink-soft: "#3B4A6B"
  ink-muted: "#526181"
  macro-green: "#166534"
  macro-amber: "#9A4508"
  danger: "#C0392B"
  success: "#2F855A"
typography:
  display:
    fontFamily: "Fraunces, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.5rem, 6vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.5rem, 3vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.02em"
rounded:
  sm: "10px"
  md: "14px"
  lg: "20px"
  xl: "28px"
  pill: "999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.ink-navy}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.pill}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.deep-navy}"
  button-secondary:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink-navy}"
    rounded: "{rounded.pill}"
    padding: "16px 32px"
  icon-badge:
    backgroundColor: "{colors.slate-indigo}"
    rounded: "{rounded.lg}"
    size: "56px"
  card:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink-navy}"
    rounded: "{rounded.lg}"
    padding: "24px"
  chip-selected:
    backgroundColor: "{colors.slate-indigo}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  chip-unselected:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink-navy}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
---

# Design System: UPlate

## 1. Overview

**Creative North Star: "The Campus Sky"**

UPlate's new visual language trades the old black-glass-and-violet-gradient look for something that reads like an early morning walk to the dining hall: pale sky-blue gradients, soft white cards, and a single confident navy that carries every interactive and data moment. It's light where the old site was dark, warm where it was clinical, and built from one blue hue family instead of a decorative multi-stop gradient.

This isn't a hypothetical direction: `unsubscribe.html` already ships it in production, pairing a **Fraunces display serif** with **Inter body text** over exactly this pale-sky-to-white gradient. That page is the ground truth for this system, ahead of the inferred app-mockup sampling — treat its tokens as canonical and bring the rest of the site (landing page, about page) up to match it, not the other way around.

This system explicitly rejects the dark-mode-plus-glassmorphism-plus-violet-gradient template the old landing page uses. No frosted blur, no gradient text, no generic AI-SaaS chrome. Depth comes from soft tonal layering and real shadow (see Elevation), not `backdrop-filter`.

**Key Characteristics:**
- Light, airy, sky-blue-to-white radial gradients as the default canvas, not black
- A serif display face (Fraunces) paired with Inter body text — warmth and editorial confidence instead of an all-sans tech-SaaS voice
- One blue-navy hue family spans every neutral and every accent — background, button, and text are all tinted from the same source
- Two deliberate breaks from the blue system — green and amber — reserved exclusively for macro data (protein/fat), never used decoratively
- Squircle icon badges as a signature anchor motif, replacing generic icon-circle clichés
- Fully pill-shaped primary buttons everywhere, including on pages (like the current unsubscribe page) that haven't caught up to it yet

## 2. Colors

The palette is a single tinted-blue ramp, from near-white through pale sky to deep navy, with two narrow semantic breaks reserved for nutrition data and standard status colors for form feedback.

### Primary
- **Ink Navy** (#14213D): the strongest, most saturated step of the ramp. Primary buttons, the boldest headline moments, and the CTA card fill.
- **Deep Navy** (#3A4C7E): one step lighter than Ink Navy. Hover/focus state on primary buttons, ring strokes on stat displays, premium/celebratory moments.
- **Slate Indigo** (#4E6088): icon badges, secondary interactive fills, selected chip states.

### Secondary
- **Pale Sky** (#DCEDFF): the default background wash, radial-gradiented into white behind hero and card content.
- **Powder Blue** (#94B0DA): mid-tone accent for dividers, borders, unselected chip outlines.
- **Accent Strong** (#6F92C5): a step darker than Powder Blue, used for focus rings and input borders. Not for static text — at 3.2:1 on white it fails WCAG AA for body text; use Deep Navy for any link or label that needs to read as text.

### Tertiary (macro data + status only)
- **Macro Green** (#166534): protein values only. Never decorative, never a button or link color.
- **Macro Amber** (#9A4508): fat values only. Same rule.
- **Danger** (#C0392B) / **Success** (#2F855A): form validation states only (waitlist errors, unsubscribe confirmation).

### Neutral
- **Surface White** (#FFFFFF): cards, inputs, the top of every gradient.
- **Surface Soft** (#F3F8FF) / **Surface Sunken** (#EAF2FC): intermediate steps for nested surfaces (input fills, subtle section dividers) that need to sit between white and Pale Sky.
- **Ink Soft** (#3B4A6B): secondary body copy.
- **Ink Muted** (#526181): placeholder text, de-emphasized labels, footer copy. Darkened from an earlier #6F7E9C draft to clear WCAG AA (4.5:1) on both white and Pale Sky backgrounds.

### Named Rules
**The One Blue Family Rule.** Every background, button, and text color is a lightness/chroma step of the same navy-blue hue. Macro Green, Macro Amber, Danger, and Success are the only exceptions, and each is locked to one specific job.

**The No-Glass Rule.** Surfaces are opaque, never translucent or blurred. If a card needs to feel "premium," reach for Ink Navy or Deep Navy as a solid fill, not frosted glass.

## 3. Typography

**Display Font:** Fraunces (with Georgia, Times New Roman serif fallback)
**Body Font:** Inter (with ui-sans-serif, -apple-system fallback)

**Character:** A warm editorial serif for anything that needs to feel like a headline or a moment, set against a clean, quiet sans for everything functional. This is already live on `unsubscribe.html`; the rest of the site should sound like the same voice, not a different product.

### Hierarchy
- **Display** (600, `clamp(2.5rem, 6vw, 3.75rem)`, 1.08 line-height, -0.02em tracking): hero headline only. Always solid Ink Navy, never gradient-filled.
- **Title** (600, `clamp(1.5rem, 3vw, 2rem)`, 1.15 line-height): section headings, card titles.
- **Body** (400, 1.0625rem, 1.5 line-height): supporting copy, max 65–75ch line length, Ink Soft color.
- **Label** (600, 0.8125rem, 1.3 line-height, 0.02em tracking, uppercase where used as an eyebrow): button text, chip labels, small kicker text.

### Named Rules
**The Solid Headline Rule.** Display and title text is always a solid Ink Navy fill. No `background-clip: text` gradients — emphasis comes from the serif's natural contrast and size, not decoration.

## 4. Elevation

Depth comes from a real, tiered shadow scale plus tonal layering (white cards on a pale-sky gradient), never from blur or glass. This is the exact scale already in production on `unsubscribe.html`.

### Shadow Vocabulary
- **Shadow-sm** (`0 1px 2px rgba(20, 33, 61, 0.06)`): resting state for inputs and small controls.
- **Shadow-md** (`0 12px 32px -12px rgba(31, 61, 110, 0.22)`): the standard "card-lift" — feature cards, stat displays, nav.
- **Shadow-lg** (`0 40px 80px -40px rgba(31, 61, 110, 0.45)`): the hero moment — the main content card, modals, anything that needs to feel like it's floating above the page.

### Named Rules
**The Flat-By-Default Rule.** Buttons, chips, and inputs are flat at rest (shadow-sm at most). Shadow scales up with the importance of the surface, not decoration for its own sake.

## 5. Components

### Buttons
- **Shape:** fully rounded pill (`border-radius: 999px`) for every primary call-to-action across all three pages.
- **Primary:** Ink Navy fill (#14213D), white bold label text, `16px 32px` padding.
- **Hover / Focus:** fill shifts to Deep Navy (#3A4C7E); a subtle `translateY(-1px)` lift plus shadow-md is fine (already the pattern on unsubscribe's submit button) — no bounce, no scale-pop.
- **Secondary:** white fill, Ink Navy text, Powder Blue border.
- **Note:** `unsubscribe.html`'s current submit button uses a 14px rounded-rect, not a pill — that's a leftover from before this system was fully settled. Bring it to the pill shape for consistency.

### Chips (dietary filters, allergy tags, macro labels)
- **Style:** pill-shaped, same radius as buttons.
- **Unselected:** white fill, Ink Navy text, thin Powder Blue border.
- **Selected:** Slate Indigo fill, white text, no border.

### Cards / Containers
- **Corner Style:** 20px radius (`rounded.lg`) for primary cards, 14px for nested/inline elements.
- **Background:** Surface White, occasionally Ink Navy for premium/CTA moments.
- **Shadow Strategy:** shadow-md at rest, shadow-lg for the single most important card on a page.
- **Internal Padding:** 24–32px depending on card size.

### Inputs / Fields
- **Style:** Surface Soft fill (#F3F8FF), 14px radius, Powder-Blue-tinted border (`rgba(148,176,218,0.32)`), shadow-sm at rest.
- **Hover:** border shifts to Powder Blue, background to Surface White.
- **Focus:** border shifts to Accent Strong, background Surface White, plus a soft `0 0 0 3px` accent-tinted focus ring.
- **Error:** Danger-colored helper text beneath the field; the field itself doesn't need a red border unless testing shows it's needed for clarity.

### Icon Badge (signature component)
A rounded-square ("squircle," 20px radius, ~56px box) filled with Slate Indigo, holding a single white line icon. Anchor visual for feature/how-it-works callouts, replacing generic icon-circle clichés.

### Stat Ring (signature component)
A thick Deep Navy ring on a white circular card displaying one large number (e.g. calorie target) with a small uppercase label beneath. Macro sub-values use the macro-green/amber/navy trio. Strong, ownable visual for a "your numbers" moment — worth adapting for the landing page instead of a generic bar chart.

## 6. Do's and Don'ts

### Do:
- **Do** pair Fraunces (display) with Inter (body) everywhere — it's already shipping on `unsubscribe.html`; the rest of the site should match, not diverge.
- **Do** build every background from the Pale Sky → white gradient family (#DCEDFF into #FFFFFF), not black.
- **Do** use Ink Navy (#14213D) as the strongest primary, Deep Navy (#3A4C7E) for hover/secondary-bold moments, Slate Indigo (#4E6088) for icon badges and lighter interactive fills.
- **Do** use the squircle icon badge as the recurring anchor motif in feature/how-it-works sections.
- **Do** reserve Macro Green and Macro Amber strictly for nutrition data call-outs; Danger/Success strictly for form feedback.
- **Do** unify every primary button on every page (including unsubscribe's current 14px-radius submit button) to the same fully-rounded pill shape.
- **Do** vary section layout and rhythm — the stat ring, the icon-badge feature callout, and a plain text section should all look different from each other.

### Don't:
- **Don't** use glassmorphism, translucent blurred cards, or `backdrop-filter` anywhere.
- **Don't** use the violet-to-pink gradient (`#667eea → #764ba2 → #f093fb`) or any decorative multi-stop gradient — the exact look this redesign is leaving behind.
- **Don't** apply `background-clip: text` gradient fills to headlines. Solid Ink Navy only.
- **Don't** repeat the same icon+heading+text card grid in back-to-back sections.
- **Don't** default to a pure black (#000) or pure white (#FFF) surface without the blue tint.
- **Don't** leave mismatched button shapes between pages — the pill is the one committed shape, everywhere.
