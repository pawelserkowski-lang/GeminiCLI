# Skeleton Components - Quick Reference

Fast lookup guide for skeleton component API and common patterns.

---

## Component Overview

| Component | Use Case | Variants |
|-----------|----------|----------|
| `Skeleton` | Generic placeholder | pulse, shimmer |
| `SkeletonText` | Text content | pulse, shimmer |
| `SkeletonAvatar` | Profile pictures | pulse, shimmer |
| `SkeletonCard` | Content cards | pulse, shimmer |
| `SkeletonMessage` | Single chat message | pulse, shimmer |
| `MessageSkeleton` | Multiple messages | pulse, shimmer |
| `MessageStreamSkeleton` | Full conversation | pulse, shimmer |

---

## Imports

```tsx
// UI Skeletons
import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonMessage,
} from '@/components/ui';

// Chat Skeletons
import {
  MessageSkeleton,
  MessageStreamSkeleton,
} from '@/components/chat';
```

---

## Common Patterns

### Single Line Loading
```tsx
<SkeletonText lines={1} />
```

### Paragraph Loading
```tsx
<SkeletonText lines={3} />
```

### Multi-line with Custom Gap
```tsx
<SkeletonText lines={4} gap="1rem" />
```

### Avatar (Small)
```tsx
<SkeletonAvatar size={32} />
```

### Avatar (Large)
```tsx
<SkeletonAvatar size={64} />
```

### Card Loading
```tsx
<SkeletonCard lines={3} height="200px" />
```

### Chat Messages (Assistant)
```tsx
<MessageSkeleton isUser={false} count={2} />
```

### Chat Messages (User)
```tsx
<MessageSkeleton isUser={true} count={1} />
```

### Full Conversation Stream
```tsx
<MessageStreamSkeleton />
```

### Generic Shape
```tsx
<Skeleton width="120px" height="40px" className="rounded-lg" />
```

---

## Animation Variants

### Pulse (Subtle)
```tsx
variant="pulse"  // Default, 2 second cycle
```

### Shimmer (Prominent)
```tsx
variant="shimmer"  // More engaging, 2.5 second cycle
```

---

## Props Quick Reference

### Skeleton Base Props
```tsx
interface SkeletonBaseProps {
  width?: string | number;           // Default: '100%'
  height?: string | number;          // Default: '1rem'
  variant?: 'pulse' | 'shimmer';     // Default: 'pulse'
  className?: string;                // Custom CSS classes
  style?: CSSProperties;             // Inline styles
}
```

### SkeletonText Props
```tsx
interface SkeletonTextProps extends SkeletonBaseProps {
  lines?: number;                    // Default: 1
  gap?: string | number;             // Default: '0.5rem'
}
```

### SkeletonAvatar Props
```tsx
interface SkeletonAvatarProps extends SkeletonBaseProps {
  size?: number;                     // Default: 40 (pixels)
}
```

### SkeletonCard Props
```tsx
interface SkeletonCardProps extends SkeletonBaseProps {
  lines?: number;                    // Default: 3
}
```

### SkeletonMessage Props
```tsx
interface SkeletonMessageProps extends SkeletonBaseProps {
  isUser?: boolean;                  // Default: false
}
```

### MessageSkeleton Props
```tsx
interface MessageSkeletonProps {
  isUser?: boolean;                  // Default: false
  count?: number;                    // Default: 1
  variant?: 'pulse' | 'shimmer';     // Default: 'pulse'
}
```

---

## CSS Classes

All skeletons use these classes:
```tsx
.skeleton-pulse          // Pulse animation
.skeleton-shimmer       // Shimmer animation
.rounded                // Rounded corners
.rounded-lg             // Larger rounded corners
.rounded-full           // Circular
```

---

## Common Layouts

### Full Page Loading
```tsx
<div className="grid grid-cols-3 gap-4 h-screen">
  {/* Header */}
  <div className="col-span-3">
    <SkeletonText lines={1} height="2em" width="50%" />
  </div>

  {/* Main Content */}
  <div className="col-span-2 space-y-4">
    <SkeletonCard lines={2} />
    <SkeletonCard lines={3} />
  </div>

  {/* Sidebar */}
  <div className="space-y-4">
    <SkeletonCard lines={2} />
    <SkeletonAvatar size={64} />
  </div>
</div>
```

### Chat Interface
```tsx
<div className="flex flex-col h-full">
  <header className="p-4">
    <SkeletonText lines={1} width="50%" height="1.5em" />
  </header>

  <main className="flex-1 overflow-auto">
    <MessageStreamSkeleton variant="pulse" />
  </main>

  <footer className="p-4">
    <Skeleton width="100%" height="40px" className="rounded-lg" />
  </footer>
</div>
```

### Profile Card
```tsx
<div className="flex gap-4 p-4">
  <SkeletonAvatar size={48} />
  <div className="flex-1">
    <SkeletonText lines={2} width="80%" />
  </div>
</div>
```

### Data Grid
```tsx
<div className="grid grid-cols-3 gap-4">
  {Array.from({ length: 6 }).map((_, i) => (
    <SkeletonCard key={i} lines={4} />
  ))}
</div>
```

---

## Conditional Rendering

### Basic Pattern
```tsx
{isLoading ? <SkeletonText lines={3} /> : <p>{content}</p>}
```

### With Multiple Elements
```tsx
{isLoading ? (
  <>
    <SkeletonAvatar size={48} />
    <SkeletonText lines={2} />
  </>
) : (
  <Profile data={profile} />
)}
```

### With Query Hook
```tsx
const { data, isLoading } = useQuery({ ... });

return isLoading ? <SkeletonCard /> : <Card data={data} />;
```

---

## Styling Examples

### Custom Color
```tsx
<Skeleton
  style={{
    backgroundColor: 'rgba(100, 200, 100, 0.1)',
    borderColor: 'rgba(100, 200, 100, 0.2)',
  }}
/>
```

### Custom Duration
```tsx
<SkeletonText
  style={{ animationDuration: '1.5s' }}
/>
```

### Custom Width
```tsx
<SkeletonText lines={2} width="75%" />
```

### Custom Height
```tsx
<SkeletonText lines={2} height="1.5em" />
```

---

## Animation Control

### Prefer Reduced Motion
Automatically respected! No props needed.
```css
@media (prefers-reduced-motion: reduce) {
  /* Animations disabled */
}
```

---

## Testing

### Check for Skeleton
```tsx
expect(container.querySelector('.skeleton-pulse')).toBeInTheDocument();
```

### Check Skeleton is Gone
```tsx
expect(container.querySelector('.skeleton-pulse')).not.toBeInTheDocument();
```

### Render with Props
```tsx
render(<SkeletonText lines={3} variant="shimmer" />);
```

---

## Performance Tips

1. ✅ Use `memo()` for components with skeletons
2. ✅ Use `pulse` for subtle states (better performance)
3. ✅ Limit number of skeletons (virtualize if many)
4. ✅ Clear skeletons when content loaded
5. ✅ Don't animate skeletal UI longer than 3-5 seconds

---

## Troubleshooting

### Skeleton Not Showing?
- Check `variant` prop is correct
- Verify `width` and `height` are set
- Look for CSS class `.skeleton-pulse` or `.skeleton-shimmer`

### Wrong Animation?
- Verify `variant="shimmer"` or `variant="pulse"`
- Check browser console for CSS errors
- Ensure styles are injected (check DOM for `#skeleton-styles`)

### Colors Wrong?
- Verify theme is set (`data-theme="light"` or `data-theme="dark"`)
- Check CSS variables are defined
- Look for conflicting CSS rules

### Not Responsive?
- Set width as percentage (`width="100%"`)
- Use responsive classes (`className="w-full"`)
- Wrap in flex/grid container

---

## Browser Compatibility

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
❌ IE 11 (needs polyfills)

---

## Theme Support

Automatic! Uses CSS variables:

**Dark Mode**
- Accent: `#00ff41` (green)
- Background: `rgba(0, 255, 65, 0.05)`

**Light Mode**
- Accent: `#059669` (emerald)
- Background: `rgba(5, 150, 105, 0.08)`

No config needed - detects theme automatically!

---

## File Locations

```
src/components/
├── ui/
│   └── Skeleton.tsx
├── chat/
│   └── MessageSkeleton.tsx
└── SKELETON_COMPONENTS.md
```

---

## Documentation Links

- **Full API**: `SKELETON_COMPONENTS.md`
- **Integration Guide**: `INTEGRATION_GUIDE.md`
- **Examples**: `Skeleton.example.tsx`
- **Tests**: `Skeleton.test.tsx`, `MessageSkeleton.test.tsx`

---

## Quick Start Checklist

- [ ] Import component from `ui` or `chat`
- [ ] Add loading state to component
- [ ] Conditionally render skeleton or content
- [ ] Choose animation variant (pulse or shimmer)
- [ ] Customize with props if needed
- [ ] Test in dark and light themes
- [ ] Test with loading/loaded states

---

**Need more help?** See `SKELETON_COMPONENTS.md` for detailed documentation.
