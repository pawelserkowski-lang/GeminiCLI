# Toast Notification System

Comprehensive toast notification system for GeminiHydra GUI with Matrix theme styling, Framer Motion animations, and queue management.

## Features

- **Four Variants**: success, error, warning, info
- **Auto-dismiss**: Automatic dismissal after 3 seconds (configurable)
- **Queue Management**: Max 3 visible toasts at once
- **Animations**: Smooth slide-in/out animations via Framer Motion
- **Accessibility**: Full ARIA support (role="alert", aria-live, aria-atomic)
- **Theme Support**: Works with both dark and light Matrix themes
- **Manual Dismiss**: Close button for immediate dismissal
- **TypeScript**: Fully typed with excellent IDE support

## Architecture

```
┌─────────────────────────────────────────┐
│         useToast Hook                   │
│  (state management + queue logic)       │
├─────────────────────────────────────────┤
│  ToastContainer                         │
│  (renders multiple toasts, fixed pos)   │
├─────────────────────────────────────────┤
│  Toast Component                        │
│  (individual notification + animations) │
└─────────────────────────────────────────┘
```

## Quick Start

### 1. Setup in App.tsx

```tsx
import { useToast } from './hooks';
import { ToastContainer } from './components/ui';

function App() {
  const { toasts, dismissToast } = useToast();

  return (
    <>
      <ToastContainer
        toasts={toasts}
        onDismiss={dismissToast}
        position="top-right"
        gap={12}
      />
      {/* Your app content */}
    </>
  );
}
```

### 2. Use in Components

```tsx
import { useToast } from './hooks';

function MyComponent() {
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      await saveData();
      toast.success('Data saved successfully!');
    } catch (error) {
      toast.error('Failed to save data');
    }
  };

  return <button onClick={handleSave}>Save</button>;
}
```

## API Reference

### useToast Hook

Returns an object with toast methods and state management.

```typescript
const { toasts, toast, dismissToast, clearAll } = useToast();
```

#### Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `toast.success` | `(message: string, duration?: number) => void` | Show success toast |
| `toast.error` | `(message: string, duration?: number) => void` | Show error toast |
| `toast.warning` | `(message: string, duration?: number) => void` | Show warning toast |
| `toast.info` | `(message: string, duration?: number) => void` | Show info toast |
| `toast.custom` | `(message: string, variant: ToastVariant, duration?: number) => void` | Show custom toast |
| `dismissToast` | `(id: string) => void` | Dismiss specific toast |
| `clearAll` | `() => void` | Clear all toasts |

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `toasts` | `ToastNotification[]` | Array of active toasts |

### ToastContainer Component

Renders all active toasts in a fixed position.

```typescript
<ToastContainer
  toasts={toasts}
  onDismiss={dismissToast}
  position="top-right"
  gap={12}
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `toasts` | `ToastNotification[]` | - | Array of toasts to render |
| `onDismiss` | `(id: string) => void` | - | Callback when toast is dismissed |
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'top-right'` | Toast container position |
| `gap` | `number` | `12` | Gap between toasts in pixels |

### Toast Component

Individual toast notification component.

```typescript
<Toast
  id="toast-1"
  message="Hello!"
  variant="success"
  duration={3000}
  onDismiss={handleDismiss}
  dismissible={true}
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Unique toast identifier |
| `message` | `string` | - | Toast message content |
| `variant` | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` | Toast style variant |
| `duration` | `number` | `3000` | Auto-dismiss delay in ms |
| `onDismiss` | `(id: string) => void` | - | Callback when dismissed |
| `dismissible` | `boolean` | `true` | Show close button |

## Examples

### Basic Usage

```tsx
const { toast } = useToast();

toast.success('Operation completed!');
toast.error('Something went wrong!');
toast.warning('Please be careful');
toast.info('Here is some information');
```

### Custom Duration

```tsx
// Stay for 10 seconds
toast.success('Long lasting notification', 10000);

// No auto-dismiss
toast.info('Click to dismiss', 0);
```

### Multiple Toasts

```tsx
// Shows up to 3 at once, older ones disappear
toast.success('First');
toast.info('Second');
toast.warning('Third');
toast.error('Fourth'); // Replaces "First"
```

### Error Handling

```tsx
try {
  await riskyOperation();
  toast.success('Success!');
} catch (error) {
  toast.error(error instanceof Error ? error.message : 'Unknown error');
}
```

### Form Validation

```tsx
const handleSubmit = (formData: FormData) => {
  if (!formData.name) {
    toast.warning('Please enter a name');
    return;
  }

  saveForm(formData)
    .then(() => toast.success('Form saved!'))
    .catch(() => toast.error('Failed to save form'));
};
```

### Async Operations

```tsx
const handleUpload = async (file: File) => {
  const uploadId = 'upload-' + Date.now();

  try {
    const result = await uploadFile(file);
    toast.success(`${result.name} uploaded successfully`);
  } catch (error) {
    if (error.code === 'CANCELLED') {
      toast.info('Upload cancelled');
    } else if (error.code === 'TOO_LARGE') {
      toast.warning('File is too large');
    } else {
      toast.error('Upload failed');
    }
  }
};
```

## Styling

### Variants

#### Success (Emerald)
```css
background: rgba(5, 71, 46, 0.8);
border: 1px solid rgba(16, 185, 129, 0.3);
color: rgb(236, 253, 245);
shadow: 0 0 15px rgba(16, 185, 129, 0.2);
```

#### Error (Red)
```css
background: rgba(127, 29, 29, 0.8);
border: 1px solid rgba(248, 113, 113, 0.3);
color: rgb(254, 226, 226);
shadow: 0 0 15px rgba(239, 68, 68, 0.2);
```

#### Warning (Amber)
```css
background: rgba(120, 53, 15, 0.8);
border: 1px solid rgba(251, 191, 36, 0.3);
color: rgb(254, 243, 224);
shadow: 0 0 15px rgba(217, 119, 6, 0.2);
```

#### Info (Blue)
```css
background: rgba(30, 58, 138, 0.8);
border: 1px solid rgba(96, 165, 250, 0.3);
color: rgb(219, 234, 254);
shadow: 0 0 15px rgba(59, 130, 246, 0.2);
```

### Customization

To customize toast styling, edit the `toastVariants` CVA in `Toast.tsx`:

```tsx
const toastVariants = cva(
  'your-base-classes',
  {
    variants: {
      variant: {
        success: 'your-success-classes',
        error: 'your-error-classes',
        // ...
      },
    },
  }
);
```

## Animations

Toasts slide in from the right and slide out using Framer Motion:

```tsx
<motion.div
  initial={{ opacity: 0, x: 400 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: 400 }}
  transition={{
    type: 'spring',
    stiffness: 260,
    damping: 20,
  }}
>
  {/* Toast content */}
</motion.div>
```

Adjust spring animation in `Toast.tsx` if desired:
- `stiffness`: Higher = faster (default: 260)
- `damping`: Higher = less bouncy (default: 20)

## Accessibility

The toast system includes full accessibility support:

- **ARIA Roles**: `role="alert"` for toast, `role="region"` for container
- **ARIA Live**: `aria-live="polite"` for non-intrusive notifications
- **ARIA Atomic**: `aria-atomic="true"` to announce entire toast
- **Keyboard Support**: Close button is keyboard accessible
- **Screen Readers**: All content is read properly

```tsx
<div
  role="alert"
  aria-live="polite"
  aria-atomic="true"
>
  {/* Toast content */}
</div>
```

## Queue Management

Maximum 3 toasts visible at once. When exceeding the limit:

```tsx
toast.success('Toast 1'); // Shows
toast.success('Toast 2'); // Shows
toast.success('Toast 3'); // Shows
toast.success('Toast 4'); // Replaces Toast 1
toast.success('Toast 5'); // Replaces Toast 2
```

Keeps latest toasts, removes oldest ones automatically.

To change the limit, edit `MAX_VISIBLE_TOASTS` in `useToast.ts`:

```tsx
const MAX_VISIBLE_TOASTS = 3; // Change to desired number
```

## Performance

- **Minimal Re-renders**: Uses React hooks optimally
- **Memory Efficient**: Removes dismissed toasts from state
- **Animation Performance**: Leverages GPU with Framer Motion
- **Bundle Size**: ~5KB gzipped

## Testing

### Unit Tests

Toast component tests:
```bash
npm test src/components/ui/Toast.test.tsx
```

Hook tests:
```bash
npm test src/hooks/useToast.test.ts
```

### Example Tests

```tsx
it('shows success toast', () => {
  const { result } = renderHook(() => useToast());

  act(() => {
    result.current.toast.success('Test message');
  });

  expect(result.current.toasts).toHaveLength(1);
  expect(result.current.toasts[0].variant).toBe('success');
});
```

## Common Patterns

### Loading State

```tsx
const [loading, setLoading] = useState(false);
const { toast } = useToast();

const handleSubmit = async () => {
  setLoading(true);
  try {
    await api.submit(data);
    toast.success('Submitted!');
  } catch (error) {
    toast.error('Submission failed');
  } finally {
    setLoading(false);
  }
};
```

### Undo Action

```tsx
const handleDelete = async (id: string) => {
  const backup = data[id];

  try {
    await api.delete(id);
    toast.success('Deleted', 10000); // 10 second timeout for undo
  } catch (error) {
    toast.error('Failed to delete');
  }
};
```

### Batch Operations

```tsx
const handleBatchOperation = async (items: Item[]) => {
  const failed: Item[] = [];

  for (const item of items) {
    try {
      await processItem(item);
    } catch (error) {
      failed.push(item);
    }
  }

  if (failed.length === 0) {
    toast.success(`All ${items.length} items processed`);
  } else {
    toast.warning(`${failed.length}/${items.length} items failed`);
  }
};
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- All modern mobile browsers

Uses:
- CSS Grid/Flexbox
- CSS Variables
- CSS Backdrop Filter
- CSS Animations
- ES2020 JavaScript

## Troubleshooting

### Toasts not appearing

1. Check `ToastContainer` is rendered in your root component
2. Verify `useToast()` hook is called in parent
3. Confirm Z-index isn't being covered (default: 9999)

### Wrong position

Adjust `position` prop on `ToastContainer`:

```tsx
<ToastContainer
  toasts={toasts}
  onDismiss={dismissToast}
  position="bottom-right"  // or top-left, bottom-left
/>
```

### Animation issues

If animations are janky, check:
1. GPU acceleration is enabled
2. Browser isn't CPU-throttled
3. No other heavy animations running
4. Adjust spring `stiffness`/`damping` in Toast.tsx

### Accessibility issues

Use browser DevTools to test:
1. Lighthouse Accessibility audit
2. WAVE browser extension
3. Screen reader (NVDA, JAWS, VoiceOver)

## Contributing

To extend the toast system:

1. **Add new variant**: Update `toastVariants` CVA
2. **Change queue size**: Update `MAX_VISIBLE_TOASTS`
3. **Modify animation**: Update Framer Motion config
4. **Add features**: Extend hook with new methods

Keep tests updated when making changes!

## Files

```
src/
├── components/ui/
│   ├── Toast.tsx                 # Main toast component
│   ├── Toast.test.tsx            # Component tests
│   ├── Toast.example.tsx         # Usage examples
│   ├── ToastContainer.tsx        # Container component
│   └── index.ts                  # Exports
├── hooks/
│   ├── useToast.ts              # Hook with state management
│   ├── useToast.test.ts         # Hook tests
│   └── index.ts                 # Exports
└── ...
```

## License

Part of GeminiHydra GUI project.
