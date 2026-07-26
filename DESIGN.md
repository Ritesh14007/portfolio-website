---
name: Ethereal Tech Portfolio
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#4ae176'
  on-secondary: '#003915'
  secondary-container: '#00b954'
  on-secondary-container: '#004119'
  tertiary: '#c1c6db'
  on-tertiary: '#2a3040'
  tertiary-container: '#8b90a4'
  on-tertiary-container: '#242939'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#6bff8f'
  secondary-fixed-dim: '#4ae176'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005321'
  tertiary-fixed: '#dde2f8'
  tertiary-fixed-dim: '#c1c6db'
  on-tertiary-fixed: '#151b2b'
  on-tertiary-fixed-variant: '#414658'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1200px
  gutter: 24px
  section-gap-desktop: 120px
  section-gap-mobile: 64px
---

## Brand & Style
The design system is engineered to project a premium, high-performance developer identity. It targets a sophisticated audience of tech recruiters and engineering leaders who value precision, modernity, and attention to detail.

The aesthetic is a fusion of **Futuristic Minimalism** and **Refined Glassmorphism**. It leverages the visual language of industry leaders like Vercel and Linear, emphasizing depth through translucency rather than heavy shadows. The emotional response should be one of "effortless power"—a calm, dark interface where code excellence is presented through a lens of high-end digital craftsmanship.

## Colors
This design system utilizes a deep-space palette to establish an immersive environment. 
- **Primary Accent (#3B82F6):** Used for critical actions, active states, and glowing accents.
- **Secondary Accent (#22C55E):** Reserved for success states, "Available for Work" indicators, and terminal-style syntax highlighting.
- **Surface Strategy:** The primary background is nearly black to allow glass surfaces to pop. Gradients should be subtle, typically transitioning from the primary blue to a soft transparent "glow" rather than harsh color shifts.

## Typography
The typography system relies on **Inter** for its neutral yet modern grotesque qualities, ensuring maximum readability in dark modes. 
- **Headings:** Utilize tight letter-spacing and heavy weights to create a "bold statement" look.
- **Monospace:** **JetBrains Mono** is introduced for technical labels, code snippets, and metadata to reinforce the developer-centric nature of the portfolio.
- **Hierarchy:** Contrast is created via scale and weight rather than font variety, maintaining a clean, systematic appearance.

## Layout & Spacing
This design system employs a **Fixed Grid** for desktop (12 columns) and a **Fluid Grid** for mobile. 
- **Rhythm:** An 8px base grid ensures consistent alignment across all components.
- **Breathability:** Large section gaps (120px+) are encouraged to prevent the dark UI from feeling cramped.
- **Responsive Behavior:** On mobile, margins reduce to 20px, and complex multi-column grids collapse into a single vertical stack, maintaining the card-based structure.

## Elevation & Depth
Depth is the core differentiator of this design system. It moves away from traditional drop shadows in favor of:
1.  **Backdrop Blurs:** Glass surfaces use a `20px` to `40px` blur to create a frosted feel over background gradients.
2.  **Inner Strokes:** Cards use a `1px` top-oriented semi-transparent white border to simulate light hitting a physical edge.
3.  **Glow Orbs:** Large, low-opacity radial gradients (Primary/Secondary accents) are placed behind glass cards to create a sense of light emission.
4.  **Z-Index Hierarchy:** Interactive elements "lift" on hover, increasing the blur intensity and opacity of the background glow.

## Shapes
The shape language is sophisticated and approachable. 
- **Standard Radius:** 16px (0.5rem) is the baseline for most cards and containers.
- **Large Radius:** 24px (1.5rem) is used for main project showcase cards and the hero section containers.
- **Interactive Elements:** Buttons and tags use a smaller, tighter 8px radius to feel more precise and tool-like.

## Components
- **Glass Cards:** The primary container. Features a `1px` stroke (rgba 255,255,255, 0.1), a `20px` backdrop blur, and a subtle inner glow. On hover, the border opacity increases and a subtle primary-colored glow appears beneath the card.
- **Primary Button:** Solid #3B82F6 background with white text. Includes a faint outer glow effect. Hover state should include a slight scale-up (1.02x).
- **Ghost Button:** Transparent background with a 1px border. Transitions to a glass state on hover.
- **Timeline Nodes:** Small circular points using a "pulse" animation. Completed nodes use the Secondary Accent (Green) with a soft glow.
- **Code Snippet Blocks:** Minimalist blocks using the `background_surface` color, no border, and JetBrains Mono text. Syntax highlighting should strictly use the Primary and Secondary accent colors.
- **Interactive Chips:** Small, pill-shaped labels for tech stacks. Subtle border, no background, turning solid on interaction.