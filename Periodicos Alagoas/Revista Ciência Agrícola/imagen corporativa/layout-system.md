# Revista Ciência Agrícola — Layout System

**Rule: Same skeleton every slide. Only content changes.**

## Core Principle
A layout template is a decision made once, never repeated. The structure never moves. Structure defines brand identity instantly. Skeleton is locked, only content varies.

---

## Three Layout Templates

### Template 1: Organic Divider + Text Left, Image Right (Primary)
**Usage**: Feature articles, main content

**LOCKED ELEMENTS** (Never changes):
- Logo position: Bottom left corner
- Headline position: Left column (~40% width), fixed height zone
- Gold accent words: Applied to specific key terms (locked by template styling)
- Organic curved divider: Diagonal S-curve from top-right to bottom-left, 8-12px white stroke
- Dark green background: Full slide (#1B4D3E)
- Margins: Moderate-generous (left: 40px, right: 0, top: 60px, bottom: 40px)
- Right image: Full-bleed edge (no padding between image and divider)

**VARIABLE ELEMENTS** (Content only):
- Headline text (white, 48-72px, bold 800-900 weight)
- Accent words in headline (gold #F4C430, italicized)
- Body copy (left column, white, 14-16px, sans-serif)
- Image (right column, full-bleed, professional photography, depth of field)
- Optional: Heat map or data visualization overlay on image

```
┌─────────────────────────────────────────────┐
│                                ╱╱╱╱╱╱╱╱╱  │
│  HEADLINE TEXT HERE       ╱╱╱╱╱╱╱  IMAGE  ╱│
│  with ACCENT words    ╱╱╱╱╱╱╱   (full-   ╱ │
│  ═════════════════  ╱╱╱╱╱╱╱      bleed)  ╱  │
│                  ╱╱╱╱╱╱╱╱                ╱   │
│  Body text white on dark green      ╱╱╱╱    │
│  explaining content with clarity.╱╱╱╱╱      │
│                              ╱╱╱╱╱          │
│  [ARTIGO]              ╱╱╱╱╱                 │
│  LOGO              ╱╱╱╱╱                     │
└─────────────────────────────────────────────┘
  White divider (organic curve)
```

---

### Template 2: Full-Width Image Top, Text Below (Secondary)
**Usage**: Visual-heavy content, data presentations

**LOCKED ELEMENTS**:
- Logo: Bottom left
- Full-width image area (top 65% of slide)
- Organic curved divider below image (white, 8-12px)
- Text area (bottom 35%, dark green background)
- White headline zone (fixed height)
- Margins: Consistent 40px

**VARIABLE ELEMENTS**:
- Image (full-width, professional photography, optional data overlay)
- Headline text (white, positioned below divider)
- Body copy (below headline)

```
┌─────────────────────────────────────────────┐
│  ┌─────────────────────────────────────┐   │
│  │                                     │   │
│  │   IMAGE (professional photography)  │   │
│  │   Full-width, depth of field        │   │
│  │                                     │   │
│  └─────────────────────────────────────┘   │
│  ╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱ │
│                                             │
│  HEADLINE TEXT HERE                         │
│  with ACCENT words emphasized               │
│                                             │
│  Body text white on dark green.             │
│  Supporting copy below headline.            │
│                                             │
│  [ARTIGO]                                   │
│  LOGO                                       │
└─────────────────────────────────────────────┘
```

---

### Template 3: Two-Column Split with Central Divider (Tertiary)
**Usage**: Comparisons, before/after, dual data visualizations

**LOCKED ELEMENTS**:
- Logo: Bottom left
- Organic curved divider: Vertical or diagonal, centered (#FFFFFF, 8-12px)
- Two-column layout (50/50 or 45/55 split)
- Dark green background full slide
- Fixed heading zones for each column
- Consistent padding: 30px between columns

**VARIABLE ELEMENTS**:
- Left column: Headline + body (white text)
- Right column: Headline + body or image
- Column content (text or imagery)

```
┌─────────────────────────────────────────────┐
│  LEFT COLUMN      ╱╱╱  RIGHT COLUMN        │
│  ═════════════  ╱╱╱╱╱  ═════════════      │
│  Headline       ╱╱╱╱╱╱  Image or text      │
│  with ACCENT  ╱╱╱╱╱╱╱   with ACCENT      │
│                ╱╱╱╱╱╱   words             │
│  Body text    ╱╱╱╱╱                       │
│  white on   ╱╱╱╱╱                         │
│  dark green ╱                              │
│            ╱                               │
│  [ARTIGO]                                  │
│  LOGO      [ARTIGO]                        │
└─────────────────────────────────────────────┘
  White organic divider
```

---

## Build Rules

1. **Fix headline position** — Same zone every slide. Headlines never float.
2. **Set consistent margins** — 40px sides, 60px top/bottom. Balance the dark background.
3. **Lock organic divider** — Position and style identical. White curve defines brand.
4. **Lock accent word styling** — Gold + italic. Same treatment always.
5. **Build 2-3 templates + 1 thumbnail** — Reuse forever. Content varies, skeleton locked.

**Rule**: Only content changes. The skeleton stays locked.

---

## Element Specifications

### Headline
- Font: Bold heavy sans-serif (800-900 weight, geometric)
- Size: 48-72px+
- Case: Mixed case (some uppercase)
- Color: White (#FFFFFF)
- Accent words: Gold (#F4C430), italicized
- Line height: 1.0-1.2 (tight, condensed)
- Letter spacing: Minimal
- Position: FIXED (Template determines exact zone)

### Body Text
- Font: Regular sans-serif
- Size: 14-16px
- Color: White (#FFFFFF)
- Line height: 1.4-1.6
- Alignment: Left-aligned
- Position: Below headline (Templates 1 & 3) or below divider (Template 2)
- Background: Dark forest green (#1B4D3E)

### Accent Words
- Color: Bright gold (#F4C430)
- Style: Italicized
- Usage: Key scientific terms, important concepts
- Position: Within body or headline text
- Rule: Applied consistently per content topic

### Organic Divider
- Color: White (#FFFFFF)
- Thickness: 8-12px
- Style: Smooth S-curve, flowing, wave pattern
- Direction: 
  - Template 1: Diagonal (top-right to bottom-left)
  - Template 2: Horizontal (below image)
  - Template 3: Vertical or diagonal (center, separating columns)
- Position: FIXED per template

### Images
- Treatment: High-quality professional photography
- Depth of field focus
- Optional overlay: Heat maps, data visualizations, graphs
- Framing:
  - Template 1: Full-bleed right side (image edge to viewport edge)
  - Template 2: Full-width, centered
  - Template 3: Column-width, same height as opposite column

### Tags/Labels
- Style: Rectangular badge
- Background: White or gold background (contrasts with green)
- Text: Dark green or white
- Position: Bottom left area (FIXED per template)

---

## Color Application

| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| Background | Dark Forest Green | #1B4D3E | Full slide background, canvas |
| Text Primary | White | #FFFFFF | Headlines, body copy, main content |
| Text Accent | Gold | #F4C430 | Key words, emphasis, italicized |
| Divider | White | #FFFFFF | Organic curves separating sections |
| Tags | White or Gold | #FFFFFF / #F4C430 | Article labels, badges |

---

## Application

**Every carousel slide follows ONE of the 3 templates.**
- Template selection based on content type (feature, visual-heavy, comparison)
- Skeleton never changes
- Only headlines, accent words, body text, images, and tags vary
- Organic white divider is brand signature

**Expected outcome**: Viewer sees white organic curves, gold accents on dark green, professional imagery, and immediately recognizes Revista Ciência Agrícola. Structure is unmistakable. Perfect brand consistency.
