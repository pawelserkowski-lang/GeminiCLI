# ErrorBoundary Component

A React 19 Error Boundary component for GeminiGUI with Matrix/Emerald theme styling.

## Overview

The `ErrorBoundary` component catches JavaScript errors anywhere in the child component tree, logs those errors, and displays a fallback UI instead of crashing the entire application.

## Features

✨ **React 19 Class Component** - Proper Error Boundary implementation
🎨 **Matrix/Emerald Theme** - Matches GeminiGUI design system
📍 **Error Logging** - Automatic console logging with error details
🔄 **Retry Mechanism** - Reset error state and try again
🌓 **Light/Dark Theme Support** - CSS variables for theme switching
📱 **Responsive Design** - Mobile-friendly error display
♿ **Accessibility** - Proper ARIA labels and keyboard support
🎭 **Animation Effects** - Smooth slide-in and pulsing animations

## Installation

The ErrorBoundary is already created in the GeminiGUI project. You only need to import and use it.

### Files Created

- `src/components/ErrorBoundary.tsx` - Component implementation
- `src/components/ErrorBoundary.css` - Styling
- `src/components/index.ts` - Component exports

## Basic Usage

### 1. Wrap Your App

In `src/main.tsx`:

```tsx
import { ErrorBoundary } from './components/ErrorBoundary';
import './components/ErrorBoundary.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
```

### 2. Wrap Specific Sections

For granular error handling, wrap individual sections:

```tsx
import { ErrorBoundary } from './components/ErrorBoundary';

function MyApp() {
  return (
    <div>
      <ErrorBoundary>
        <ChatContainer />
      </ErrorBoundary>

      <ErrorBoundary>
        <Sidebar />
      </ErrorBoundary>
    </div>
  );
}
```

## Props

### `children: ReactNode` (Required)

The child component(s) to wrap with error boundary.

```tsx
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

### `onError?: (error: Error, errorInfo: ErrorInfo) => void` (Optional)

Callback function called when an error is caught. Useful for logging to monitoring services.

```tsx
<ErrorBoundary
  onError={(error, errorInfo) => {
    console.log('Error caught:', error.message);
    // Send to monitoring service
  }}
>
  <MyComponent />
</ErrorBoundary>
```

### `fallback?: (error: Error, retry: () => void) => ReactNode` (Optional)

Custom fallback UI to display when an error occurs. If not provided, uses the default error display.

```tsx
<ErrorBoundary
  fallback={(error, retry) => (
    <div>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <button onClick={retry}>Try Again</button>
    </div>
  )}
>
  <MyComponent />
</ErrorBoundary>
```

## Complete Example

```tsx
import { ErrorBoundary } from './components/ErrorBoundary';
import './components/ErrorBoundary.css';

function App() {
  const handleErrorBoundaryError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log to monitoring service
    console.error('App error:', {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });

    // Send to backend
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        url: window.location.href,
      }),
    }).catch(console.error);
  };

  return (
    <ErrorBoundary onError={handleErrorBoundaryError}>
      <main>
        <header>
          <h1>Gemini GUI</h1>
        </header>
        <section>
          <ChatContainer />
        </section>
        <footer>
          <StatusBar />
        </footer>
      </main>
    </ErrorBoundary>
  );
}

export default App;
```

## Styling

The component uses CSS variables defined in `globals.css`:

- `--matrix-bg-primary` - Primary background
- `--matrix-bg-secondary` - Secondary background
- `--matrix-accent` - Accent color (emerald green)
- `--matrix-text` - Main text color
- `--matrix-text-dim` - Dimmed text color
- `--matrix-border` - Border color
- `--matrix-panel-bg` - Panel background
- `--font-mono` - Monospace font family

### Light Theme

The component automatically adapts to light theme when `data-theme="light"` is set on the root element.

```html
<html data-theme="light">
  <!-- App content -->
</html>
```

## CSS Classes

If you need to customize styling, these CSS classes are available:

- `.error-boundary-container` - Main container
- `.error-boundary-panel` - Error panel background
- `.error-boundary-header` - Header section
- `.error-boundary-icon` - Error icon
- `.error-boundary-title` - Main title
- `.error-boundary-message` - Error message box
- `.error-boundary-code` - Code/stack display
- `.error-boundary-details` - Details toggle
- `.error-boundary-actions` - Button container
- `.error-boundary-button` - Button base
- `.retry-button` - Retry button
- `.reload-button` - Reload button
- `.error-boundary-help` - Help text

## Limitations

Error Boundaries **DO NOT** catch errors for:

- ❌ Event handlers (use try-catch instead)
- ❌ Asynchronous code (use try-catch or .catch())
- ❌ Server-side rendering
- ❌ Errors in the error boundary itself
- ❌ Class component lifecycle methods (generally)

## Error Handling in Event Handlers

For error handling in event handlers, use try-catch:

```tsx
function MyComponent() {
  const handleClick = async () => {
    try {
      await someAsyncOperation();
    } catch (error) {
      console.error('Error in click handler:', error);
    }
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

## Monitoring Integration Examples

### Sentry

```tsx
import * as Sentry from '@sentry/react';

<ErrorBoundary
  onError={(error, errorInfo) => {
    Sentry.captureException(error, {
      contexts: {
        react: { componentStack: errorInfo.componentStack },
      },
    });
  }}
>
  <App />
</ErrorBoundary>
```

### Rollbar

```tsx
import Rollbar from 'rollbar';

const rollbar = new Rollbar({
  accessToken: 'your-token',
  environment: process.env.NODE_ENV,
});

<ErrorBoundary
  onError={(error, errorInfo) => {
    rollbar.error(error, {
      custom: { componentStack: errorInfo.componentStack },
    });
  }}
>
  <App />
</ErrorBoundary>
```

### Custom Backend

```tsx
<ErrorBoundary
  onError={async (error, errorInfo) => {
    await fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      }),
    });
  }}
>
  <App />
</ErrorBoundary>
```

## Testing

To test the error boundary in development, create a component that throws an error:

```tsx
function BuggyComponent() {
  throw new Error('Test error for ErrorBoundary');
}

// Use it:
<ErrorBoundary>
  <BuggyComponent />
</ErrorBoundary>
```

## Best Practices

1. **Multiple Boundaries** - Use multiple boundaries for granular error handling
2. **Log Errors** - Always log errors to a monitoring service
3. **User Messaging** - Show helpful error messages to users
4. **Retry Logic** - Provide retry buttons for better UX
5. **Theme Support** - Ensure your app's theme CSS variables are defined
6. **CSS Import** - Always import ErrorBoundary.css
7. **Environment Check** - Use different error handling in dev vs production
8. **Error Context** - Include URL, user agent, and timestamp in error logs

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 15+
- Edge 90+

## Performance

- Minimal bundle impact (~8KB CSS + component)
- No external dependencies
- CSS animations respect `prefers-reduced-motion`
- Optimized for 60fps animations

## Accessibility

- Semantic HTML structure
- Proper contrast ratios
- Keyboard navigation support
- ARIA labels where appropriate
- Focus management

## TypeScript Support

Full TypeScript support with proper types:

```tsx
import { ErrorBoundary, type ErrorBoundaryProps } from './components/ErrorBoundary';

interface MyErrorBoundaryProps extends ErrorBoundaryProps {
  // Add custom props here
}

const MyErrorBoundary: React.FC<MyErrorBoundaryProps> = (props) => (
  <ErrorBoundary {...props} />
);
```

## Troubleshooting

### Error Boundary not catching errors

**Problem**: The component doesn't show the error UI.

**Solutions**:
- Make sure the error happens during render (not in event handler)
- Check that CSS is imported
- Verify the error is in a child component, not the boundary itself
- Check browser console for errors

### Styling not applied

**Problem**: The error display looks wrong.

**Solutions**:
- Import ErrorBoundary.css
- Verify CSS variables are defined in :root or [data-theme]
- Check browser DevTools for CSS errors
- Ensure globals.css is imported first

### Infinite error loops

**Problem**: The boundary keeps catching the same error.

**Solutions**:
- The retry button should fix the underlying issue
- Verify the component that throws error has been updated
- Check that component's dependencies are correct

## Contributing

When modifying the ErrorBoundary:

1. Update both .tsx and .css files
2. Keep Matrix theme consistent
3. Test with light/dark themes
4. Test on mobile devices
5. Update this README
6. Add example in ErrorBoundary.example.tsx

## License

Part of GeminiGUI project
