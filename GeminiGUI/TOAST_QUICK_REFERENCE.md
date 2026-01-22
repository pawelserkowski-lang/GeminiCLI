# Toast Quick Reference

## Setup (5 minutes)

### 1. Add to App.tsx
```tsx
import { useToast } from './hooks';
import { ToastContainer } from './components/ui';

function App() {
  const { toasts, dismissToast } = useToast();
  return (
    <>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      {/* Your app */}
    </>
  );
}
```

### 2. Use in Component
```tsx
import { useToast } from './hooks';

function MyComponent() {
  const { toast } = useToast();
  
  return (
    <button onClick={() => toast.success('Done!')}>
      Click me
    </button>
  );
}
```

## Methods

```tsx
const { toast, dismissToast, clearAll, toasts } = useToast();

// Show notifications
toast.success('Success message');           // Green
toast.error('Error message');               // Red
toast.warning('Warning message');           // Yellow
toast.info('Info message');                 // Blue

// Custom duration (milliseconds)
toast.success('Message', 5000);             // 5 seconds
toast.success('Message', 0);                // No auto-dismiss

// Custom variant
toast.custom('Message', 'warning', 3000);

// Manage toasts
dismissToast(toastId);                      // Remove one
clearAll();                                 // Remove all

// Access toasts
console.log(toasts);                        // Array of active toasts
```

## Positioning

```tsx
<ToastContainer
  toasts={toasts}
  onDismiss={dismissToast}
  position="top-right"        // 'top-left', 'bottom-left', 'bottom-right'
  gap={12}                    // Space between toasts
/>
```

## Common Patterns

### API Call
```tsx
const { toast } = useToast();

const fetchData = async () => {
  try {
    const data = await api.get('/data');
    toast.success('Data loaded!');
    return data;
  } catch (error) {
    toast.error(error.message);
  }
};
```

### Form Submit
```tsx
const { toast } = useToast();

const handleSubmit = async (data) => {
  if (!data.email) {
    toast.warning('Email required');
    return;
  }
  
  try {
    await saveForm(data);
    toast.success('Saved!');
  } catch {
    toast.error('Save failed');
  }
};
```

### Multiple Operations
```tsx
const { toast } = useToast();

const handleBatch = async (items) => {
  let success = 0, failed = 0;
  
  for (const item of items) {
    try {
      await process(item);
      success++;
    } catch {
      failed++;
    }
  }
  
  if (failed === 0) {
    toast.success(`${success} items processed`);
  } else {
    toast.warning(`${failed}/${items.length} failed`);
  }
};
```

## Features

| Feature | Details |
|---------|---------|
| **Variants** | success, error, warning, info |
| **Auto-dismiss** | 3 seconds default (configurable) |
| **Queue** | Max 3 visible (older ones removed) |
| **Animation** | Slide from right (Framer Motion) |
| **Accessible** | ARIA role="alert", aria-live |
| **Theme** | Dark/light Matrix theme support |
| **Close** | Manual dismiss button included |

## Default Durations

```tsx
toast.success('msg');       // 3000ms auto-dismiss
toast.error('msg');         // 3000ms auto-dismiss
toast.warning('msg');       // 3000ms auto-dismiss
toast.info('msg');          // 3000ms auto-dismiss
toast.success('msg', 5000); // 5000ms auto-dismiss
toast.info('msg', 0);       // No auto-dismiss
```

## Customize (Advanced)

### Change Queue Size
Edit `src/hooks/useToast.ts`:
```tsx
const MAX_VISIBLE_TOASTS = 5; // Default: 3
```

### Change Animation
Edit `src/components/ui/Toast.tsx`:
```tsx
transition={{
  type: 'spring',
  stiffness: 100,   // Lower = slower
  damping: 30,      // Higher = less bouncy
}}
```

### Change Colors
Edit `toastVariants` in `src/components/ui/Toast.tsx`

## Files

| File | Purpose |
|------|---------|
| `src/components/ui/Toast.tsx` | Component |
| `src/hooks/useToast.ts` | Hook |
| `src/components/ui/ToastContainer.tsx` | Container |
| `src/components/ui/Toast.test.tsx` | Tests (50+) |
| `src/hooks/useToast.test.ts` | Tests (45+) |
| `src/components/ui/TOAST_SYSTEM.md` | Full docs |

## Tests

```bash
npm test -- Toast              # Run all toast tests
npm test Toast.test.tsx        # Test component
npm test useToast.test.ts      # Test hook
```

## Exports

```tsx
// From components/ui
import { Toast, ToastContainer } from './components/ui';
import type { ToastProps, ToastVariant } from './components/ui';

// From hooks
import { useToast } from './hooks';
import type { ToastNotification, UseToastReturn } from './hooks';
```

## Props

### ToastContainer
```tsx
<ToastContainer
  toasts={toasts}              // ToastNotification[]
  onDismiss={dismissToast}     // (id: string) => void
  position="top-right"         // Position: string
  gap={12}                     // Gap: number
/>
```

### Toast
```tsx
<Toast
  id="unique-id"               // string
  message="Text"               // string
  variant="success"            // 'success' | 'error' | 'warning' | 'info'
  duration={3000}              // number (ms)
  onDismiss={handleDismiss}    // (id: string) => void
  dismissible={true}           // boolean
/>
```

## Examples Location

Interactive examples: `src/components/ui/Toast.example.tsx`

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Toasts not showing | Add `ToastContainer` to App.tsx |
| Wrong position | Change `position` prop |
| Not auto-dismissing | Check `duration` value |
| Animations slow | Reduce `stiffness` or `damping` |
| Z-index issues | Default is 9999, adjust in code |

## Version

- **Installed in**: GeminiHydra GUI
- **Dependencies**: React 19+, Framer Motion, class-variance-authority
- **Browser Support**: Chrome 90+, Firefox 88+, Safari 14+

## Next Steps

1. ✓ Add `ToastContainer` to `src/App.tsx`
2. ✓ Import `useToast` in components
3. ✓ Call `toast.success()`, `toast.error()`, etc.
4. ✓ Run `npm test -- Toast` to verify
5. ✓ See `Toast.example.tsx` for more examples

---

For complete documentation, see: `src/components/ui/TOAST_SYSTEM.md`
