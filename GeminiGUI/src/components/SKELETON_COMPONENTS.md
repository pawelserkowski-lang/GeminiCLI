# Skeleton Loading Components

Loading skeletons for GeminiHydra GUI with Matrix-themed animations. These components provide smooth placeholder UIs while content is loading.

## Components

### 1. `SkeletonText`

Animated text placeholder with configurable line count.

```tsx
import { SkeletonText } from './components/ui';

// Single line
<SkeletonText />

// Multiple lines
<SkeletonText lines={3} />

// Custom height and width
<SkeletonText lines={2} height="1.5em" width="80%" />

// Shimmer animation instead of pulse
<SkeletonText lines={3} variant="shimmer" />
```

**Props:**
- `lines?: number` - Number of skeleton lines (default: 1)
- `gap?: string | number` - Space between lines (default: '0.5rem')
- `width?: string | number` - Width of skeleton (default: '100%')
- `height?: string | number` - Height of each line (default: '1em')
- `variant?: 'pulse' | 'shimmer'` - Animation type (default: 'pulse')

---

### 2. `SkeletonAvatar`

Circular placeholder for avatars and profile pictures.

```tsx
import { SkeletonAvatar } from './components/ui';

// Default 40px size
<SkeletonAvatar />

// Custom sizes
<SkeletonAvatar size={32} />
<SkeletonAvatar size={64} />

// Shimmer variant
<SkeletonAvatar size={48} variant="shimmer" />
```

**Props:**
- `size?: number` - Diameter in pixels (default: 40)
- `variant?: 'pulse' | 'shimmer'` - Animation type (default: 'pulse')

---

### 3. `SkeletonCard`

Complete card skeleton with header and content lines.

```tsx
import { SkeletonCard } from './components/ui';

// Default card
<SkeletonCard />

// Custom height and line count
<SkeletonCard height="250px" lines={4} />

// Shimmer animation
<SkeletonCard lines={2} variant="shimmer" />
```

**Props:**
- `lines?: number` - Number of content lines (default: 3)
- `height?: string | number` - Card height (default: '200px')
- `width?: string | number` - Card width (default: '100%')
- `variant?: 'pulse' | 'shimmer'` - Animation type (default: 'pulse')

**Features:**
- Header with avatar and metadata lines
- Multiple content lines
- Full gap spacing

---

### 4. `SkeletonMessage`

Chat message placeholder with alternating alignment.

```tsx
import { SkeletonMessage } from './components/ui';

// Assistant message (left-aligned)
<SkeletonMessage isUser={false} />

// User message (right-aligned)
<SkeletonMessage isUser={true} />

// Custom dimensions
<SkeletonMessage isUser={true} width="70%" height="100px" variant="shimmer" />
```

**Props:**
- `isUser?: boolean` - Right-aligned if true (default: false)
- `width?: string | number` - Message width (default: '60%')
- `height?: string | number` - Message height (default: '80px')
- `variant?: 'pulse' | 'shimmer'` - Animation type (default: 'pulse')

---

### 5. `MessageSkeleton`

Multiple message skeletons with random widths for natural variation.

```tsx
import { MessageSkeleton } from './components/chat';

// Multiple assistant messages
<MessageSkeleton isUser={false} count={2} />

// Single user message
<MessageSkeleton isUser={true} count={1} />

// Shimmer animation
<MessageSkeleton isUser={false} count={3} variant="shimmer" />
```

**Props:**
- `isUser?: boolean` - Direction of alignment (default: false)
- `count?: number` - Number of skeletons to render (default: 1)
- `variant?: 'pulse' | 'shimmer'` - Animation type (default: 'pulse')

**Features:**
- Random widths (45-85%) for natural appearance
- Random heights (60px or 100px)

---

### 6. `MessageStreamSkeleton`

Complete conversation thread with alternating user and assistant messages.

```tsx
import { MessageStreamSkeleton } from './components/chat';

// Full conversation stream
<MessageStreamSkeleton />

// Shimmer animation
<MessageStreamSkeleton variant="shimmer" />
```

**Props:**
- `variant?: 'pulse' | 'shimmer'` - Animation type (default: 'pulse')

**Pattern:**
- User message → 2-3 Assistant messages → User message → Assistant response

---

### 7. `Skeleton` (Generic)

Flexible base skeleton for custom shapes.

```tsx
import { Skeleton } from './components/ui';

// Rectangle
<Skeleton width="100%" height="40px" className="rounded" />

// Square
<Skeleton width="200px" height="200px" className="rounded" />

// Button-like
<Skeleton width="120px" height="36px" className="rounded-lg" variant="shimmer" />
```

**Props:**
- `width?: string | number` - Width (default: '100%')
- `height?: string | number` - Height (default: '1rem')
- `variant?: 'pulse' | 'shimmer'` - Animation type (default: 'pulse')
- `className?: string` - Additional CSS classes

---

## Animation Variants

### Pulse Animation
Gentle opacity pulse effect. Good for subtle, background loading states.

```tsx
<SkeletonText variant="pulse" />
```

- Duration: 2 seconds
- Effect: Opacity changes from 5% to 12%
- Best for: General placeholders

### Shimmer Animation
Horizontal gradient sweep. More prominent and engaging loading state.

```tsx
<SkeletonText variant="shimmer" />
```

- Duration: 2.5 seconds
- Effect: Gradient sweeps left to right
- Best for: Cards, detailed content

---

## Theme Support

All skeleton components automatically adapt to dark and light themes using CSS variables:

```css
/* Dark Theme (default) */
--matrix-accent: #00ff41
background-color: rgba(0, 255, 65, 0.05);

/* Light Theme */
--matrix-accent: #059669
background-color: rgba(5, 150, 105, 0.08);
```

No additional props needed - theme switching is automatic!

---

## Usage Examples

### Loading Chat Messages

```tsx
import { MessageSkeleton, MessageStreamSkeleton } from './components/chat';

function ChatLoading() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="space-y-2">
      {isLoading ? (
        <MessageStreamSkeleton variant="pulse" />
      ) : (
        <MessageList messages={messages} />
      )}
    </div>
  );
}
```

### Loading Data Cards

```tsx
import { SkeletonCard } from './components/ui';

function DataCardLoading() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i} lines={3} />
      ))}
    </div>
  );
}
```

### Loading Profile Section

```tsx
import { SkeletonAvatar, SkeletonText } from './components/ui';

function ProfileLoading() {
  return (
    <div className="flex gap-4">
      <SkeletonAvatar size={64} />
      <SkeletonText lines={2} width="70%" />
    </div>
  );
}
```

### Loading Form

```tsx
import { SkeletonText, Skeleton } from './components/ui';

function FormLoading() {
  return (
    <div className="space-y-4">
      <SkeletonText lines={1} height="1.5em" width="50%" />
      <Skeleton width="100%" height="40px" className="rounded" />
      <Skeleton width="100%" height="40px" className="rounded" />
      <Skeleton width="120px" height="36px" className="rounded-lg" />
    </div>
  );
}
```

---

## CSS Classes Used

- `.skeleton-pulse` - Pulse animation class
- `.skeleton-shimmer` - Shimmer animation class
- `.rounded` - Border radius (Tailwind)
- `.rounded-lg` - Larger border radius (Tailwind)
- `.rounded-full` - Full circular border radius (Tailwind)

---

## Performance

- **Lightweight:** Pure CSS animations, no JavaScript overhead
- **Hardware-accelerated:** Uses CSS transforms for smooth animations
- **Theme-aware:** Respects system theme preferences
- **Accessible:** Reduced motion respected via `prefers-reduced-motion`

---

## Customization

### Custom Animation Timing

```tsx
<SkeletonText
  lines={3}
  style={{ animationDuration: '1.5s' }}
/>
```

### Custom Colors

```tsx
<Skeleton
  width="100%"
  height="40px"
  style={{
    backgroundColor: 'rgba(100, 200, 100, 0.1)',
    borderColor: 'rgba(100, 200, 100, 0.2)',
  }}
/>
```

### Custom Gap/Spacing

```tsx
<SkeletonText lines={3} gap="1rem" />
```

---

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- IE11: No support (use polyfills if needed)

---

## Accessibility

All skeleton components:
- Respect `prefers-reduced-motion` media query
- Have appropriate ARIA attributes where needed
- Use semantic HTML (`<div>` with `role` as needed)
- Don't interfere with screen readers

---

## Examples & Showcase

See `Skeleton.example.tsx` for a complete interactive showcase of all skeleton components with both animation variants.

```bash
# View the example in development
npm run dev
# Navigate to `/skeleton-showcase` route
```
