# ErrorBoundary - Visual & Technical Reference Guide

## 🎨 Visual Components

The ErrorBoundary displays a beautiful Matrix-themed error screen with several key sections:

```
┌─────────────────────────────────────────────────────────┐
│                  FULL PAGE OVERLAY                       │
│            (Fixed position, z-index: 9999)              │
│                                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │      ERROR BOUNDARY PANEL (z-index: 10000)       │  │
│  │   max-width: 600px, dark glass morphism panel    │  │
│  │                                                   │  │
│  │  ┌─────────────────────────────────────────┐    │  │
│  │  │ HEADER (with bottom border)             │    │  │
│  │  │                                          │    │  │
│  │  │  🔴 [PULSING] "Something went wrong"   │    │  │
│  │  │                                          │    │  │
│  │  └─────────────────────────────────────────┘    │  │
│  │                                                   │  │
│  │  ┌─────────────────────────────────────────┐    │  │
│  │  │ ERROR MESSAGE SECTION                    │    │  │
│  │  │ Error Details:                           │    │  │
│  │  │ └─ [Red code block with error message]  │    │  │
│  │  └─────────────────────────────────────────┘    │  │
│  │                                                   │  │
│  │  ┌─────────────────────────────────────────┐    │  │
│  │  │ DETAILS (Expandable)                    │    │  │
│  │  │ ▶ Component Stack                       │    │  │
│  │  │   [Click to expand and see stack trace] │    │  │
│  │  └─────────────────────────────────────────┘    │  │
│  │                                                   │  │
│  │  [🔄 RETRY] [⟳ RELOAD PAGE]                     │  │
│  │                                                   │  │
│  │  "If the problem persists, please check       │  │
│  │   the browser console for more details."        │  │
│  │                                                   │  │
│  └───────────────────────────────────────────────────┘  │
│              (Radial glow effect behind)                │
└─────────────────────────────────────────────────────────┘
```

## 🎨 Color Scheme (Dark Theme)

```
BACKGROUND:
├─ Primary: #0a1f0a (very dark green)
├─ Secondary: #001a00 (darker green)
└─ Radial gradient at top: rgba(0, 255, 65, 0.08)

PANEL:
├─ Background: rgba(10, 20, 10, 0.8)
├─ Backdrop: blur(24px) saturate(200%)
└─ Border: rgba(0, 255, 65, 0.15)

TEXT:
├─ Primary: #c0ffc0 (light green)
├─ Dimmed: #80c080 (medium green)
└─ Error: #ff6b6b (red)

ACCENTS:
├─ Primary: #00ff41 (bright matrix green)
└─ Border: rgba(0, 255, 65, 0.15) (subtle)
```

## 🌓 Color Scheme (Light Theme)

```
BACKGROUND:
├─ Primary: #f0fdf4 (light green)
├─ Secondary: #ffffff (white)
└─ Radial gradient: rgba(5, 150, 105, 0.1)

PANEL:
├─ Background: rgba(255, 255, 255, 0.6)
├─ Backdrop: blur(24px) saturate(200%)
└─ Border: rgba(5, 150, 105, 0.2)

TEXT:
├─ Primary: #064e3b (dark green)
├─ Dimmed: #34d399 (light green)
└─ Error: #ff6b6b (red)

ACCENTS:
├─ Primary: #059669 (emerald)
└─ Border: rgba(5, 150, 105, 0.2)
```

## 🎭 Animation Timeline

```
LOAD (0ms):
│
├─ 0ms-400ms: Error panel slides in from top
│            Panel: translateY(-20px) → translateY(0)
│            Opacity: 0 → 1
│            Scale: 0.95 → 1
│
├─ 0ms-∞: Icon pulse effect repeating
│        Opacity: 1 → 0.8 → 1 (2s loop)
│        Glow: 8px → 12px shadow
│
├─ 0ms-∞: Background glow pulsing
│        Opacity: 0.3 → 0.6 → 0.3 (3s loop)
│
└─ 0ms-∞: Button hover effects
         Background: subtle increase
         Box-shadow: glow effect
         Transform: translateY(-2px)
```

## 🔘 Interactive Elements

### Retry Button
```
┌─────────────────────────────────────────┐
│         [🔄 RETRY]                      │
└─────────────────────────────────────────┘

States:
├─ Default: Green (#00ff41) + glow
├─ Hover: Brighter green + larger glow + -2px lift
├─ Active: Original glow + no lift
└─ Disabled: 50% opacity + no cursor

On Click:
├─ Reset hasError to false
├─ Clear error and errorInfo
└─ Remount child components
```

### Reload Button
```
┌─────────────────────────────────────────┐
│         [⟳ RELOAD PAGE]                 │
└─────────────────────────────────────────┘

States:
├─ Default: Red border (#ff6b6b) with transparency
├─ Hover: Darker red + border highlight + -2px lift
├─ Active: Original state + no lift
└─ Disabled: 50% opacity + no cursor

On Click:
├─ window.location.reload()
└─ Full page refresh (hard reload)
```

### Component Stack Details
```
┌─────────────────────────────────────────┐
│ ▶ Component Stack                       │  (collapsed)
│                                          │
└─────────────────────────────────────────┘
        ↓ (click)
┌─────────────────────────────────────────┐
│ ▼ Component Stack                       │  (expanded)
│                                          │
│ at MyComponent                          │
│   at Parent                             │
│   at ErrorBoundary                      │
│   at App                                │
│   ...                                   │
│                                          │
└─────────────────────────────────────────┘
```

## 📐 Responsive Breakpoints

```
DESKTOP (> 640px):
├─ Panel max-width: 600px
├─ Padding: 2rem
├─ Buttons: flex row, equal width
├─ Font sizes: Full size
└─ Actions: Horizontal layout

TABLET (≤ 640px):
├─ Panel max-width: 100%
├─ Padding: 1.5rem
├─ Buttons: flex column, full width
├─ Font sizes: Slightly reduced
└─ Actions: Vertical stack

MOBILE (< 480px):
├─ Panel: Fits within padding
├─ Icon: 24px (down from 32px)
├─ Title: 1.25rem (down from 1.5rem)
├─ Buttons: Full width, stacked
└─ Message: Wrapped text
```

## 🔤 Typography

```
TITLE:
├─ Font: JetBrains Mono
├─ Size: 1.5rem (desktop) / 1.25rem (mobile)
├─ Weight: 700 (bold)
├─ Color: var(--matrix-text)
├─ Letter-spacing: 0.02em
└─ Family: Monospace (futuristic feel)

LABELS:
├─ Font: JetBrains Mono
├─ Size: 0.875rem
├─ Weight: 600
├─ Color: var(--matrix-text-dim)
├─ Text-transform: uppercase
├─ Letter-spacing: 0.1em
└─ Purpose: Section headers

CODE / STACK:
├─ Font: JetBrains Mono
├─ Size: 0.875rem (message) / 0.75rem (stack)
├─ Weight: 400
├─ Color: #ff6b6b (message) / var(--matrix-text-dim) (stack)
├─ Line-height: 1.5 / 1.4
└─ White-space: pre-wrap

HELP TEXT:
├─ Font: JetBrains Mono
├─ Size: 0.875rem
├─ Weight: 400
├─ Color: var(--matrix-text-dim)
├─ Line-height: 1.6
└─ Opacity: Standard
```

## 🎯 CSS Variable Dependencies

```
Component uses these CSS variables from globals.css:

REQUIRED VARIABLES (must be defined):
├─ --matrix-bg-primary: #0a1f0a
├─ --matrix-bg-secondary: #001a00
├─ --matrix-accent: #00ff41
├─ --matrix-text: #c0ffc0
├─ --matrix-text-dim: #80c080
├─ --matrix-panel-bg: rgba(10, 20, 10, 0.8)
├─ --matrix-border: rgba(0, 255, 65, 0.15)
├─ --matrix-input-bg: rgba(0, 0, 0, 0.5)
└─ --font-mono: 'JetBrains Mono', monospace

LIGHT THEME OVERRIDES (in [data-theme="light"]):
├─ --matrix-bg-primary: #f0fdf4
├─ --matrix-bg-secondary: #ffffff
├─ --matrix-accent: #059669
├─ --matrix-text: #064e3b
├─ --matrix-text-dim: #34d399
├─ --matrix-panel-bg: rgba(255, 255, 255, 0.6)
├─ --matrix-border: rgba(5, 150, 105, 0.2)
└─ --matrix-input-bg: rgba(255, 255, 255, 0.5)
```

## 📊 Box Shadow Effects

```
CONTAINER SHADOW:
├─ Outer: 0 8px 32px rgba(0, 0, 0, 0.3)
│        (darkness behind panel)
└─ Inner: 0 0 20px rgba(0, 255, 65, 0.1)
         (subtle glow from emerald)

BUTTON SHADOWS:

Retry Button (default):
└─ 0 0 15px color-mix(in srgb, var(--matrix-accent) 20%, transparent)

Retry Button (hover):
└─ 0 0 25px color-mix(in srgb, var(--matrix-accent) 40%, transparent)

Icon Shadow (pulsing):
└─ drop-shadow(0 0 8px rgba(255, 107, 107, 0.3))
   to
   drop-shadow(0 0 12px rgba(255, 107, 107, 0.5))

Background Glow:
├─ Type: Radial gradient
├─ Direction: Centered
└─ Colors: Transparent to var(--matrix-accent) 10%
```

## 🔄 State Transitions

```
COMPONENT STATES:

1. NORMAL STATE:
   ├─ hasError: false
   ├─ error: null
   ├─ errorInfo: null
   └─ Render: Children

2. ERROR CAUGHT STATE:
   ├─ hasError: true
   ├─ error: Error object
   ├─ errorInfo: ErrorInfo object
   └─ Render: Error UI

3. AFTER RETRY:
   ├─ hasError: false (reset)
   ├─ error: null (cleared)
   ├─ errorInfo: null (cleared)
   └─ Render: Children (re-mounted)

Lifecycle:
Normal → Error Caught → (User clicks Retry) → Normal
```

## 🎨 Glassmorphism Details

```
GLASS EFFECT BREAKDOWN:

Background:
├─ Color: var(--matrix-panel-bg)
│         rgba(10, 20, 10, 0.8)
└─ Opacity: 80% (slight transparency)

Backdrop Filter:
├─ blur(24px): Creates frosted glass effect
├─ saturate(200%): Enhances color vibrancy
└─ -webkit-backdrop-filter: Safari support

Border:
├─ Color: var(--matrix-border)
│         rgba(0, 255, 65, 0.15)
├─ Width: 1px
└─ Radius: 16px (rounded corners)

Shadow:
├─ Layer 1: 0 8px 32px rgba(0, 0, 0, 0.3)
│          (main depth)
└─ Layer 2: 0 0 20px rgba(0, 255, 65, 0.1)
           (emerald glow)

Result: Floating panel with depth and glow
```

## ⚡ Performance Optimizations

```
ANIMATIONS:
├─ GPU accelerated: transform & opacity only
├─ No layout thrashing
├─ Respects prefers-reduced-motion
└─ Smooth 60fps potential

CSS:
├─ Uses CSS variables (cached)
├─ Minimal repaints
├─ Efficient selectors
└─ No expensive properties

JavaScript:
├─ Class component (minimal overhead)
├─ No external dependencies
├─ Efficient state updates
└─ Event delegation
```

## 🔐 Z-Index Layering

```
Z-INDEX HIERARCHY:

9999: error-boundary-container
      └─ Full-page overlay
         └─ Takes focus

10000: error-boundary-panel
       └─ Error display panel
          └─ Above everything

Ensures error UI always visible above other content
```

## 📝 Responsive Text Sizes

```
DESKTOP → MOBILE:

Title:        1.5rem   → 1.25rem
Label:        0.875rem → 0.875rem (no change)
Code:         0.875rem → 0.875rem (no change)
Help Text:    0.875rem → 0.875rem (no change)
Button Text:  0.875rem → 0.875rem (no change)
Icon:         32px     → 24px
```

## ✨ Animation Keyframes

```
SLIDE IN (error-boundary-slide-in):
0%:   opacity: 0, translateY(-20px), scale(0.95)
100%: opacity: 1, translateY(0), scale(1)
Duration: 400ms
Easing: ease-out

ICON PULSE (error-boundary-icon-pulse):
0%:   opacity: 1, drop-shadow(0 0 8px ...)
50%:  opacity: 0.8, drop-shadow(0 0 12px ...)
100%: opacity: 1, drop-shadow(0 0 8px ...)
Duration: 2s infinite

GLOW PULSE (error-boundary-glow-pulse):
0%:   opacity: 0.3
50%:  opacity: 0.6
100%: opacity: 0.3
Duration: 3s infinite
```

---

## 🎯 Summary

The ErrorBoundary provides:
- **Beautiful**: Matrix/emerald themed with glassmorphism
- **Responsive**: Works on all screen sizes
- **Accessible**: High contrast, keyboard support
- **Animated**: Smooth, professional transitions
- **Themed**: Light/dark mode automatic
- **Readable**: Clear typography hierarchy
- **Performant**: GPU-accelerated animations
- **Layered**: Proper z-index management
