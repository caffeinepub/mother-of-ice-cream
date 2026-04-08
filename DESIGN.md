# Design Brief: Mother of Ice-cream — Premium Luxury Edition

**Emotional Tone:** Luxury, sophisticated, premium ice cream experience. Visually stunning with elegant restraint.

**Visual Direction:** Deep jewel-tone palette with electric accents — dark indigo (#1a1a3e) backgrounds, electric fuchsia (#d946ef) and hot pink (#ff2e97) highlights, warm gold (#ffd700) accents. Glassmorphic cards with subtle frosted-glass effect, neon glow on interactive elements, smooth micro-animations.

## Color Palette

| Token | OKLCH | Hex | Usage |
|-------|-------|-----|-------|
| **background** | 0.12 0.08 275 | #1a1a3e | Primary page background — deep indigo |
| **foreground** | 0.94 0.02 55 | #efe9e0 | Body text — warm cream |
| **card** | 0.18 0.06 275 | #24234a | Card/glass backgrounds — semi-transparent |
| **primary** | 0.65 0.29 310 | #d946ef | CTA buttons, key interactions — electric fuchsia |
| **secondary** | 0.63 0.27 345 | #ff2e97 | Accents, hover states — hot pink |
| **accent** | 0.84 0.18 85 | #ffd700 | Gold highlights, premium details — warm gold |
| **muted** | 0.22 0.05 275 | #35325a | Disabled/secondary states — dark purple |
| **destructive** | 0.55 0.28 25 | #ff3d47 | Cancel/delete actions — vibrant red |

## Typography

| Tier | Font | Weight | Size | Usage |
|------|------|--------|------|-------|
| **Display** | Space Grotesk | 700 | 48–56px | H1, hero headlines — bold, tight letter-spacing |
| **Heading** | Space Grotesk | 700 | 24–32px | H2, section titles — confident, modern |
| **Body** | Satoshi | 400 | 16px | Paragraph text, descriptions — smooth, readable |
| **Small** | Satoshi | 400 | 14px | Labels, captions, metadata |
| **Mono** | System mono | 400 | 12–14px | Code, prices, transaction refs |

## Structural Zones

| Zone | Background | Border | Shadow | Notes |
|------|------------|--------|--------|-------|
| **Header/Nav** | `card` with gradient | `border/0.5` opacity | `shadow-luxury` | Dark glass effect, logo in white, nav text in cream |
| **Hero Section** | `gradient-hero` (indigo to purple) | None | None | Full-width, video or image overlay, smooth entrance animation |
| **Content Sections** | `background` | None | None | Rich padding, alternating subtle background tints |
| **Product Cards** | `glass` (semi-transparent) | `border/0.5` | `shadow-luxury` on hover | Frosted glass appearance, image overlay, glow effect on CTA |
| **Footer** | `card` with dark gradient | `border-t` | None | Elevated from background, links in accent color |
| **Modals/Drawers** | `glass-lg` | `border` | `shadow-luxury-xl` | Backdrop blur, smooth entrance from bottom/side |

## Component Patterns

- **Buttons:** Primary = gradient fill + glow effect on hover; Secondary = glass border + accent text; Hover state = increased glow + scale 1.02
- **Cards:** Glass morphism with blur(10px), subtle border glow, smooth shadow elevation on hover
- **Input Fields:** Dark background, gold accent on focus, smooth transition, no harsh borders
- **Product Cards:** Image overlay, glass layer with product info below, CTA button with glow effect, smooth fade-in animation
- **Badge/Pills:** Rounded glass containers, accent text color, subtle border glow

## Motion & Animation

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| `fade-in-up` | 600ms | ease-out | Page load, card entrance |
| `glow-pulse` | 2s | ease-in-out | Attention-drawing on CTAs, featured products |
| shimmer | 2s | linear | Loading skeleton, premium effect |
| hover scale | 200ms | ease-out | Button/card interactive feedback |
| backdrop blur | 300ms | ease-out | Modal open/close |

## Constraints & Anti-patterns

- ✅ Use glassmorphism sparingly — cards and modals only, not on typography
- ✅ Neon glow on CTAs and featured elements — not on entire sections
- ✅ Gradients for hero/large sections — not on small components
- ✅ Smooth 0.3–0.4s transitions for interactive elements
- ❌ No harsh shadows — use subtle luxury shadows with border highlights
- ❌ No overlapping glows on same element
- ❌ No more than 3 accent colors per screen
- ❌ Never mix transparency + gradients without careful contrast testing

## Signature Detail

**Neon Glow Glassmorphic Cards:** Product cards combine frosted glass backgrounds with subtle neon pink/fuchsia glow borders that intensify on hover. This dual effect (luxury glass + electric accent) creates a premium, high-tech ice cream brand aesthetic — bridging dessert indulgence with modern sophistication.

---

**Design System Status:** ✅ Complete. All tokens defined in `index.css`, Tailwind mappings in `tailwind.config.js`. Fonts: Space Grotesk (display) + Satoshi (body). Ready for component implementation.
