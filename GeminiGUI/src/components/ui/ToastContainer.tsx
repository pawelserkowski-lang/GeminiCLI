/**
 * GeminiGUI - Toast Container Component
 * @module components/ui/ToastContainer
 *
 * Container for rendering toast notifications in fixed position.
 */

import { Toast } from './Toast';
import type { ToastNotification } from '../../hooks/useToast';

// ============================================================================
// TYPES
// ============================================================================

export interface ToastContainerProps {
  /** Array of active toast notifications */
  toasts: ToastNotification[];
  /** Callback when a toast is dismissed */
  onDismiss: (id: string) => void;
  /** Position of the toast container (default: top-right) */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** Gap between toasts in pixels (default: 12) */
  gap?: number;
}

// ============================================================================
// POSITION STYLES
// ============================================================================

const getPositionClasses = (
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
): string => {
  const baseClasses = 'fixed pointer-events-none z-[9999]';

  switch (position) {
    case 'top-left':
      return `${baseClasses} top-6 left-6`;
    case 'top-right':
      return `${baseClasses} top-6 right-6`;
    case 'bottom-left':
      return `${baseClasses} bottom-6 left-6`;
    case 'bottom-right':
      return `${baseClasses} bottom-6 right-6`;
    default:
      return `${baseClasses} top-6 right-6`;
  }
};

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Toast container component for displaying multiple toasts
 *
 * @example
 * const { toasts, dismissToast } = useToast();
 * return (
 *   <ToastContainer
 *     toasts={toasts}
 *     onDismiss={dismissToast}
 *     position="top-right"
 *     gap={12}
 *   />
 * );
 */
export const ToastContainer = ({
  toasts,
  onDismiss,
  position = 'top-right',
  gap = 12,
}: ToastContainerProps) => {
  return (
    <div
      className={getPositionClasses(position)}
      style={{ gap: `${gap}px` }}
      role="region"
      aria-label="Notifications"
      aria-live="polite"
      aria-atomic="false"
    >
      <div className="flex flex-col" style={{ gap: `${gap}px` }}>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              id={toast.id}
              message={toast.message}
              variant={toast.variant}
              duration={toast.duration}
              onDismiss={onDismiss}
              dismissible={toast.dismissible}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

ToastContainer.displayName = 'ToastContainer';

export default ToastContainer;
