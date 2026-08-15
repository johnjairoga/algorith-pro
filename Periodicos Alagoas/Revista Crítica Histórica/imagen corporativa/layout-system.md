# Revista Crítica Histórica — Layout System

**Rule: Same skeleton every slide. Only content changes.**

## Core Principle
A layout template is a decision made once, never repeated. The structure never moves. Vogue changes every month, but you never mistake it for another magazine. The skeleton defines brand identity.

---

## Three Layout Templates

### Template 1: Text + Framed Image (Primary)
**Usage**: Feature articles, main content

**LOCKED ELEMENTS** (Never changes):
- Logo position: Top left corner
- Headline position: Left column, ~40% width, fixed height zone
- Rust-red accent line: Below headline, 20-30px width, fixed position
- Frame border: Right side, rounded corners (20-40px radius), rust-red (#A64D3F)
- Margins: Large generous whitespace (top: 60px, sides: 40px, bottom: 40px)
- Padding inside frame: 30-50px

**VARIABLE ELEMENTS** (Content only):
- Headline text (bold, 48-64px, dark brown #3C2419)
- Body copy (left column, small sans-serif, #3C2419)
- Image inside frame (sepia-toned, vintage, high contrast)
- Article tags/labels (ARTIGO tag, bottom left area)

```
┌─────────────────────────────────────────────┐
│  LOGO                                       │
│  ═════                                      │
│                                             │
│  HEADLINE TEXT HERE              ┌───────┐ │
│  Big and Bold                    │       │ │
│  ═══════════════════             │ IMAGE │ │
│                                  │ FRAME │ │
│  Body text goes here explaining  │       │ │
│  the article content in clean    │       │ │
│  readable format.                └───────┘ │
│                                             │
│  [ARTIGO] #tag                              │
└─────────────────────────────────────────────┘
```

---

### Template 2: Image Top, Text Bottom (Secondary)
**Usage**: Photo essays, visual-heavy content

**LOCKED ELEMENTS**:
- Logo: Top left
- Full-width image area (top 60% of slide)
- Horizontal rust-red divider line (below image, 4-6px thickness)
- Text area (bottom 40% of slide, dark brown background #3C2419 / cream background #E8DDD0)
- Margins: Consistent 40px

**VARIABLE ELEMENTS**:
- Image (sepia-toned, full-width)
- Headline text (positioned over/below image)
- Body copy (below divider)

```
┌─────────────────────────────────────────────┐
│  LOGO                                       │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │                                     │   │
│  │   IMAGE (sepia-toned)               │   │
│  │   vintage / archival                │   │
│  │                                     │   │
│  └─────────────────────────────────────┘   │
│  ═════════════════════════════════════════ │
│                                             │
│  HEADLINE TEXT HERE                         │
│                                             │
│  Body text below image with explanation.    │
│  Clean layout, generous spacing.            │
│                                             │
│  [ARTIGO]                                   │
└─────────────────────────────────────────────┘
```

---

### Template 3: Two-Column Asymmetrical (Tertiary)
**Usage**: Comparisons, data, dual perspectives

**LOCKED ELEMENTS**:
- Logo: Top left
- Two-column layout (40/60 split or 50/50)
- Rust-red accent borders on left column
- Fixed heading zones for each column
- Consistent padding between columns (30px)

**VARIABLE ELEMENTS**:
- Left column text (headline + body)
- Right column content (text or image)
- Column titles/labels

```
┌─────────────────────────────────────────────┐
│  LOGO                                       │
│  ════════════════════════════════════════   │
│                                             │
│  LEFT COLUMN          │  RIGHT COLUMN       │
│  ═════════════        │  ═════════════      │
│  Headline text        │  Image or text      │
│  here, bold and       │  content here,      │
│  impactful.           │  can be visual      │
│                       │  or textual.        │
│  Body copy support.   │                     │
│                       │                     │
│  [ARTIGO] #tag        │  [ARTIGO] #tag      │
└─────────────────────────────────────────────┘
```

---

## Build Rules

1. **Fix headline position** — Same zone every slide. Headline never floats.
2. **Set consistent margins** — 40px sides, 60px top/bottom. Whitespace is structure.
3. **Lock decorative elements** — Rust-red lines, frames, accent borders. Position never changes.
4. **Build 2-3 templates + 1 thumbnail** — Reuse forever. Variations by content, not structure.

**Rule**: Only content changes. The skeleton stays locked.

---

## Element Specifications

### Headline
- Font: Bold geometric sans-serif (900-700 weight)
- Size: 48-64px
- Case: Uppercase/title case, wide tracking
- Color: Dark brown (#3C2419)
- Line height: 1.0-1.2 (tight, condensed)
- Position: FIXED (Template determines exact zone)

### Body Text
- Font: Regular sans-serif
- Size: 14-16px
- Color: Dark brown (#3C2419)
- Line height: 1.4-1.6
- Alignment: Left-aligned
- Position: Below headline, left column (Templates 1 & 3) or below image (Template 2)

### Decorative Elements
- Accent line color: Rust-red (#A64D3F)
- Line thickness: 4-6px (dividers), 2-4px (accents)
- Frame borders: 20-40px radius, rust-red
- Position: FIXED per template

### Images
- Treatment: Sepia-toned, vintage photographs
- High contrast
- Framed with rust-red borders (Templates 1 & 3) or full-width (Template 2)
- Padding inside frame: 30-50px

### Tags/Labels
- Style: Rectangular with left accent border
- Background: Muted brown (#7A5752)
- Text: White/cream, small
- Position: Bottom left (FIXED per template)

---

## Application

**Every carousel slide follows ONE of the 3 templates.**
- Template selection based on content type (feature, photo essay, comparison)
- Skeleton never changes
- Only headlines, body text, images, and tags vary
- Consistency ensures instant brand recognition

**Expected outcome**: Viewer sees rust-red accents, vintage imagery, generous whitespace, and immediately knows it's Revista Crítica Histórica. No variation in structure. Perfect recognition.
