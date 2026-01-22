# Toast System Integration Guide

Quick setup guide for integrating the Toast notification system into GeminiHydra GUI.

## Step 1: Add ToastContainer to App.tsx

Open `src/App.tsx` and add the following:

```tsx
import { useToast } from './hooks';
import { ToastContainer } from './components/ui';

export default function App() {
  // Get toast management hook
  const { toasts, dismissToast } = useToast();

  return (
    <div className="app-container">
      {/* Add ToastContainer at the root level */}
      <ToastContainer
        toasts={toasts}
        onDismiss={dismissToast}
        position="top-right"
        gap={12}
      />

      {/* Rest of your app */}
      <Router>
        {/* routes */}
      </Router>
    </div>
  );
}
```

## Step 2: Use useToast in Components

In any component that needs to show notifications:

```tsx
import { useToast } from './hooks';

export function MyComponent() {
  const { toast } = useToast();

  const handleAction = async () => {
    try {
      // Do something
      await someOperation();
      
      // Show success
      toast.success('Operation completed!');
    } catch (error) {
      // Show error
      toast.error('Something went wrong');
    }
  };

  return <button onClick={handleAction}>Do Action</button>;
}
```

## Step 3: Customize Position (Optional)

The `position` prop on `ToastContainer` supports:

```tsx
<ToastContainer
  toasts={toasts}
  onDismiss={dismissToast}
  position="top-right"  // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  gap={12}              // Space between toasts in pixels
/>
```

## API Quick Reference

### Methods

```tsx
const { toast } = useToast();

// Success toast (green)
toast.success('Operation successful!');

// Error toast (red)
toast.error('Something went wrong');

// Warning toast (yellow)
toast.warning('Please be careful');

// Info toast (blue)
toast.info('Here is some information');

// Custom variant and duration
toast.custom('Message', 'warning', 5000); // 5 seconds before auto-dismiss
```

### Default Duration

All toasts auto-dismiss after **3000ms (3 seconds)** by default.

To customize:

```tsx
// Stay longer
toast.success('Saved!', 10000); // 10 seconds

// No auto-dismiss (user must click close)
toast.info('Important info', 0);
```

### Managing Toasts

```tsx
const { toasts, dismissToast, clearAll } = useToast();

// Dismiss specific toast
dismissToast(toastId);

// Clear all toasts
clearAll();
```

## Common Use Cases

### API Error Handling

```tsx
const fetchData = async () => {
  try {
    const data = await api.getData();
    toast.success('Data loaded');
  } catch (error) {
    if (error.status === 404) {
      toast.info('No data found');
    } else if (error.status === 500) {
      toast.error('Server error');
    } else {
      toast.error(error.message);
    }
  }
};
```

### Form Validation

```tsx
const handleSubmit = (formData) => {
  if (!formData.email) {
    toast.warning('Email is required');
    return;
  }

  saveForm(formData)
    .then(() => toast.success('Form saved!'))
    .catch(() => toast.error('Failed to save'));
};
```

### Async Operations

```tsx
const handleUpload = async (file) => {
  try {
    const result = await uploadFile(file);
    toast.success(`Uploaded: ${result.filename}`);
  } catch (error) {
    toast.error('Upload failed');
  }
};
```

## Features

- **4 Variants**: success, error, warning, info
- **Auto-dismiss**: Configurable auto-dismiss (default 3 seconds)
- **Queue**: Max 3 visible toasts (older ones removed automatically)
- **Animations**: Smooth slide animations via Framer Motion
- **Accessible**: Full ARIA support for screen readers
- **Manual Close**: Each toast has a close button
- **Theme Support**: Works with dark/light Matrix themes

## File Locations

All toast-related files:

```
src/
├── components/ui/
│   ├── Toast.tsx                 # Main component
│   ├── Toast.test.tsx            # Tests (50+ test cases)
│   ├── Toast.example.tsx         # Usage examples
│   ├── ToastContainer.tsx        # Container component
│   ├── TOAST_SYSTEM.md           # Full documentation
│   └── index.ts                  # Exports
├── hooks/
│   ├── useToast.ts              # Hook with state management
│   ├── useToast.test.ts         # Tests (45+ test cases)
│   └── index.ts                 # Exports
└── ...
```

## Running Tests

```bash
# Test Toast component
npm test src/components/ui/Toast.test.tsx

# Test useToast hook
npm test src/hooks/useToast.test.ts

# Test all toast-related files
npm test -- Toast
```

## Customization

### Change Queue Size

Edit `MAX_VISIBLE_TOASTS` in `src/hooks/useToast.ts`:

```tsx
const MAX_VISIBLE_TOASTS = 3; // Change to desired number
```

### Change Animation Speed

Edit the spring animation in `src/components/ui/Toast.tsx`:

```tsx
transition={{
  type: 'spring',
  stiffness: 260,    // Lower = slower
  damping: 20,       // Higher = less bouncy
}}
```

### Change Toast Colors

Edit `toastVariants` CVA in `src/components/ui/Toast.tsx`:

```tsx
const toastVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        success: 'bg-emerald-950/80 border-emerald-400/30 ...',
        error: 'bg-red-950/80 border-red-400/30 ...',
        // ...
      },
    },
  }
);
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- All modern mobile browsers

## Troubleshooting

### Toasts not appearing?

1. ✓ Check `ToastContainer` is in your App.tsx
2. ✓ Verify `useToast()` is called in a parent component
3. ✓ Check browser console for errors
4. ✓ Ensure z-index isn't being overridden (default: 9999)

### Animations janky?

1. Check GPU acceleration is enabled in browser
2. Close other heavy applications
3. Reduce `stiffness` value in Toast.tsx

### Need help?

See full documentation in:
- `src/components/ui/TOAST_SYSTEM.md` - Complete API and examples
- `src/components/ui/Toast.example.tsx` - Interactive examples
- `src/hooks/useToast.ts` - Inline JSDoc comments

## Next Steps

1. Add `ToastContainer` to `src/App.tsx`
2. Import `useToast` where needed
3. Call `toast.success()`, `toast.error()`, etc.
4. Run tests to verify: `npm test -- Toast`
5. Check `Toast.example.tsx` for more examples

That's it! Your app now has professional toast notifications.
