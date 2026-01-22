/**
 * GeminiGUI - ErrorBoundary Usage Examples
 * @module components/ErrorBoundary.example
 *
 * This file demonstrates various ways to use the ErrorBoundary component.
 * These are example patterns - not actual implementation files.
 */

// ============================================================================
// EXAMPLE 1: Basic Usage - Wrap the entire App
// ============================================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from './ErrorBoundary';
import App from '../App';
import './ErrorBoundary.css';

/**
 * MAIN.TSX - Basic Error Boundary Wrapper
 *
 * Usage:
 * ```tsx
 * import { ErrorBoundary } from './components/ErrorBoundary';
 * import './components/ErrorBoundary.css';
 *
 * ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
 *   <React.StrictMode>
 *     <ErrorBoundary>
 *       <QueryClientProvider client={queryClient}>
 *         <App />
 *       </QueryClientProvider>
 *     </ErrorBoundary>
 *   </React.StrictMode>,
 * );
 * ```
 */
const BasicExample = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

// ============================================================================
// EXAMPLE 2: With Error Callback - Log to monitoring service
// ============================================================================

/**
 * Usage with error callback for monitoring/analytics
 */
const WithCallbackExample = () => {
  const handleErrorBoundaryError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Send to error tracking service (Sentry, Rollbar, etc.)
    console.error('Sending to monitoring service:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });

    // Example: Send to backend
    // fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     message: error.message,
    //     stack: error.stack,
    //     componentStack: errorInfo.componentStack,
    //   }),
    // });
  };

  return (
    <ErrorBoundary onError={handleErrorBoundaryError}>
      <App />
    </ErrorBoundary>
  );
};

// ============================================================================
// EXAMPLE 3: With Custom Fallback UI
// ============================================================================

/**
 * Usage with custom fallback UI
 */
const WithCustomFallbackExample = () => {
  const customFallback = (error: Error, retry: () => void) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1f0a 0%, #001a00 100%)',
      color: '#c0ffc0',
      fontFamily: 'JetBrains Mono, monospace',
      padding: '2rem',
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '500px',
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          💥 Critical Error
        </h1>
        <p style={{ marginBottom: '1rem', opacity: 0.8 }}>
          {error.message}
        </p>
        <button
          onClick={retry}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#00ff41',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginRight: '0.5rem',
          }}
        >
          Try Again
        </button>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'transparent',
            color: '#c0ffc0',
            border: '1px solid #00ff41',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Reload
        </button>
      </div>
    </div>
  );

  return (
    <ErrorBoundary fallback={customFallback}>
      <App />
    </ErrorBoundary>
  );
};

// ============================================================================
// EXAMPLE 4: Multiple ErrorBoundaries - Granular Error Handling
// ============================================================================

/**
 * Usage with multiple error boundaries for different sections
 */
const MultipleErrorBoundariesExample = () => (
  <ErrorBoundary
    onError={(error, errorInfo) => {
      console.error('App-level error:', error);
    }}
  >
    <div>
      <header>
        <ErrorBoundary
          fallback={(error, retry) => (
            <div style={{ padding: '1rem', background: 'rgba(255, 107, 107, 0.2)' }}>
              Header failed to load
              <button onClick={retry}>Retry</button>
            </div>
          )}
        >
          {/* Header Component */}
        </ErrorBoundary>
      </header>

      <main>
        <ErrorBoundary
          onError={(error) => console.error('Chat error:', error)}
        >
          {/* ChatContainer */}
        </ErrorBoundary>

        <ErrorBoundary
          onError={(error) => console.error('Sidebar error:', error)}
        >
          {/* Sidebar */}
        </ErrorBoundary>
      </main>

      <footer>
        <ErrorBoundary>
          {/* Footer Component */}
        </ErrorBoundary>
      </footer>
    </div>
  </ErrorBoundary>
);

// ============================================================================
// EXAMPLE 5: Integration with Monitoring Services
// ============================================================================

/**
 * Integration with Sentry for error tracking
 */
const WithSentryExample = () => {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // This would require: npm install @sentry/react

    // Example implementation:
    // import * as Sentry from "@sentry/react";
    // Sentry.captureException(error, {
    //   contexts: {
    //     react: {
    //       componentStack: errorInfo.componentStack,
    //     },
    //   },
    // });

    console.error('[ErrorBoundary] Captured error:', error.message);
  };

  return (
    <ErrorBoundary onError={handleError}>
      <App />
    </ErrorBoundary>
  );
};

// ============================================================================
// EXAMPLE 6: Local Storage - Persist Error State
// ============================================================================

/**
 * Usage with error persistence for debugging
 */
const WithErrorPersistenceExample = () => {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Store error in localStorage for debugging
    const errorLog = JSON.parse(localStorage.getItem('errorLog') || '[]');
    errorLog.push({
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });

    // Keep only last 10 errors
    if (errorLog.length > 10) {
      errorLog.shift();
    }

    localStorage.setItem('errorLog', JSON.stringify(errorLog));
    console.error('Error logged to localStorage');
  };

  return (
    <ErrorBoundary onError={handleError}>
      <App />
    </ErrorBoundary>
  );
};

// ============================================================================
// EXAMPLE 7: Development vs Production Error Handling
// ============================================================================

/**
 * Different error handling based on environment
 */
const WithEnvironmentAwareExample = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    if (isDevelopment) {
      console.error('[DEV] Full error details:');
      console.error(error);
      console.error(errorInfo.componentStack);
    } else {
      // In production, send to monitoring service
      fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: error.message,
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      }).catch(console.error);
    }
  };

  return (
    <ErrorBoundary onError={handleError}>
      <App />
    </ErrorBoundary>
  );
};

// ============================================================================
// IMPORTS NEEDED
// ============================================================================

/**
 * Don't forget to import the CSS file in your main app file:
 *
 * import './components/ErrorBoundary.css';
 *
 * Or in main.tsx:
 * import { ErrorBoundary } from './components/ErrorBoundary';
 * import './components/ErrorBoundary.css';
 */

// ============================================================================
// EXPORT EXAMPLES
// ============================================================================

export {
  BasicExample,
  WithCallbackExample,
  WithCustomFallbackExample,
  MultipleErrorBoundariesExample,
  WithSentryExample,
  WithErrorPersistenceExample,
  WithEnvironmentAwareExample,
};

// ============================================================================
// TESTING THE ERROR BOUNDARY
// ============================================================================

/**
 * To test the error boundary, create a component that throws an error:
 *
 * function BuggyComponent() {
 *   throw new Error('This is a test error!');
 * }
 *
 * Then wrap it with ErrorBoundary:
 * <ErrorBoundary>
 *   <BuggyComponent />
 * </ErrorBoundary>
 *
 * The error boundary will catch the error and display the fallback UI.
 */

// ============================================================================
// BEST PRACTICES
// ============================================================================

/**
 * 1. WRAP AT APPROPRIATE LEVELS
 *    - Wrap the entire app for catch-all error handling
 *    - Wrap sections (sidebars, chat, settings) for granular control
 *
 * 2. USE ERROR CALLBACKS FOR MONITORING
 *    - Integrate with error tracking services (Sentry, Rollbar, etc.)
 *    - Log environment info (URL, user agent, timestamp)
 *
 * 3. CUSTOM FALLBACK UI
 *    - Provide helpful error messages to users
 *    - Include retry buttons for better UX
 *    - Match your app's design system
 *
 * 4. DON'T CATCH EVERYTHING
 *    - Error Boundaries only catch React render errors
 *    - Use try-catch for async operations
 *    - Use try-catch for event handlers
 *
 * 5. CSS IMPORT
 *    - Always import ErrorBoundary.css
 *    - CSS variables must be defined (:root in globals.css)
 *
 * 6. TESTING
 *    - Test with intentional errors in development
 *    - Verify error logging works in production
 *    - Check that retry functionality works
 */
