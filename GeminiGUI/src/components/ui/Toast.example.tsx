/**
 * GeminiGUI - Toast Example Component
 * @module components/ui/Toast.example
 *
 * Example demonstrating how to use Toast notifications in your app.
 * This file shows best practices and integration patterns.
 */

import { useToast, ToastContainer } from '../../hooks';
import { ToastContainer as ToastContainerComponent } from './ToastContainer';
import { Button } from './Button';

/**
 * Example: Basic Toast Usage
 *
 * Shows how to integrate Toast into your application.
 * Copy this pattern to your main App.tsx or any component that needs toasts.
 */
export const ToastExample = () => {
  const { toasts, toast, dismissToast, clearAll } = useToast();

  return (
    <div className="p-8 space-y-6">
      {/* Toast Container - Add this to your app's root/main component */}
      <ToastContainerComponent
        toasts={toasts}
        onDismiss={dismissToast}
        position="top-right"
        gap={12}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400">Toast Examples</h2>

        {/* Success Toast */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-emerald-300">Success</h3>
          <Button
            variant="primary"
            onClick={() => {
              toast.success('Operation completed successfully!');
            }}
          >
            Show Success Toast
          </Button>
          <p className="text-xs text-emerald-200/70">
            Displays a green success notification
          </p>
        </div>

        {/* Error Toast */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-red-300">Error</h3>
          <Button
            variant="primary"
            onClick={() => {
              toast.error('An error occurred!');
            }}
          >
            Show Error Toast
          </Button>
          <p className="text-xs text-red-200/70">
            Displays a red error notification
          </p>
        </div>

        {/* Warning Toast */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-amber-300">Warning</h3>
          <Button
            variant="primary"
            onClick={() => {
              toast.warning('Please be careful!');
            }}
          >
            Show Warning Toast
          </Button>
          <p className="text-xs text-amber-200/70">
            Displays a yellow warning notification
          </p>
        </div>

        {/* Info Toast */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-blue-300">Info</h3>
          <Button
            variant="primary"
            onClick={() => {
              toast.info('Here is some information');
            }}
          >
            Show Info Toast
          </Button>
          <p className="text-xs text-blue-200/70">
            Displays a blue informational notification
          </p>
        </div>

        {/* Custom Duration */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-emerald-300">
            Custom Duration
          </h3>
          <Button
            variant="primary"
            onClick={() => {
              toast.success('This toast will stay for 10 seconds', 10000);
            }}
          >
            Show 10s Toast
          </Button>
          <p className="text-xs text-emerald-200/70">
            Customize auto-dismiss duration in milliseconds
          </p>
        </div>

        {/* Multiple Toasts */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-emerald-300">Queue Demo</h3>
          <Button
            variant="primary"
            onClick={() => {
              toast.success('First notification');
              setTimeout(() => toast.info('Second notification'), 100);
              setTimeout(() => toast.warning('Third notification'), 200);
              setTimeout(() => toast.error('Fourth notification'), 300);
            }}
          >
            Show Multiple Toasts
          </Button>
          <p className="text-xs text-emerald-200/70">
            Max 3 visible at once. Older ones disappear automatically.
          </p>
        </div>

        {/* Clear All */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-emerald-300">Controls</h3>
          <Button
            variant="secondary"
            onClick={clearAll}
          >
            Clear All Toasts
          </Button>
          <p className="text-xs text-emerald-200/70">
            Dismiss all active toasts at once
          </p>
        </div>
      </div>

      {/* Integration Instructions */}
      <div className="mt-8 p-4 rounded-lg bg-emerald-950/40 border border-emerald-400/20">
        <h3 className="text-lg font-semibold text-emerald-400 mb-4">
          How to Integrate
        </h3>
        <ol className="space-y-2 text-sm text-emerald-200 list-decimal list-inside">
          <li>
            Add{' '}
            <code className="bg-black/30 px-2 py-1 rounded">useToast</code> hook
            to your component
          </li>
          <li>
            Add{' '}
            <code className="bg-black/30 px-2 py-1 rounded">ToastContainer</code>{' '}
            to your root component (App.tsx)
          </li>
          <li>
            Call{' '}
            <code className="bg-black/30 px-2 py-1 rounded">toast.success()</code>,{' '}
            <code className="bg-black/30 px-2 py-1 rounded">toast.error()</code>,
            etc.
          </li>
          <li>Toasts auto-dismiss after 3 seconds (configurable)</li>
          <li>Max 3 visible toasts at once (queue management)</li>
        </ol>
      </div>
    </div>
  );
};

/**
 * INTEGRATION CHECKLIST
 *
 * To add Toast to your app:
 *
 * 1. In your App.tsx or root component:
 *    ```tsx
 *    import { useToast } from './hooks';
 *    import { ToastContainer } from './components/ui';
 *
 *    function App() {
 *      const { toasts, dismissToast } = useToast();
 *
 *      return (
 *        <>
 *          <ToastContainer toasts={toasts} onDismiss={dismissToast} />
 *          {/* Your app content */}
 *        </>
 *      );
 *    }
 *    ```
 *
 * 2. In any child component:
 *    ```tsx
 *    import { useToast } from './hooks';
 *
 *    function MyComponent() {
 *      const { toast } = useToast();
 *
 *      const handleSubmit = async () => {
 *        try {
 *          await someAPI();
 *          toast.success('Data saved!');
 *        } catch (error) {
 *          toast.error('Failed to save data');
 *        }
 *      };
 *
 *      return <button onClick={handleSubmit}>Save</button>;
 *    }
 *    ```
 *
 * 3. Customization Options:
 *    - Position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
 *    - Duration: milliseconds (0 = no auto-dismiss)
 *    - Variants: 'success' | 'error' | 'warning' | 'info'
 *    - Max visible: 3 toasts (configurable in useToast.ts)
 */

export default ToastExample;
