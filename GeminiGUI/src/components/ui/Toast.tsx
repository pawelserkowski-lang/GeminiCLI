/**
 * GeminiGUI - Toast Notification Component
 * @module components/ui/Toast
 *
 * Toast notifications with variants, auto-dismiss, and animations.
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';

// ============================================================================
// TOAST VARIANTS
// ============================================================================

const toastVariants = cva(
  'relative flex items-start gap-3 px-4 py-3 rounded-lg font-medium backdrop-blur-xl border glass-panel max-w-sm',
  {
    variants: {
      variant: {
        success:
          'bg-emerald-950/80 border-emerald-400/30 text-emerald-50 shadow-[0_0_15px_rgba(16,185,129,0.2)]',
        error:
          'bg-red-950/80 border-red-400/30 text-red-100 shadow-[0_0_15px_rgba(239,68,68,0.2)]',
        warning:
          'bg-amber-950/80 border-amber-400/30 text-amber-100 shadow-[0_0_15px_rgba(217,119,6,0.2)]',
        info:
          'bg-blue-950/80 border-blue-400/30 text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.2)]',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

// ============================================================================
// ICON COMPONENTS
// ============================================================================

const SuccessIcon = () => (
  <svg
    className="w-5 h-5 flex-shrink-0 text-emerald-400"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg
    className="w-5 h-5 flex-shrink-0 text-red-400"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  </svg>
);

const WarningIcon = () => (
  <svg
    className="w-5 h-5 flex-shrink-0 text-amber-400"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

const InfoIcon = () => (
  <svg
    className="w-5 h-5 flex-shrink-0 text-blue-400"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="w-4 h-4"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

// ============================================================================
// TYPES
// ============================================================================

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps extends VariantProps<typeof toastVariants> {
  /** Toast unique ID */
  id: string;
  /** Toast message content */
  message: string;
  /** Auto-dismiss duration in milliseconds (default: 3000) */
  duration?: number;
  /** Callback when toast is dismissed */
  onDismiss?: (id: string) => void;
  /** Allow manual dismissal via close button (default: true) */
  dismissible?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const Toast = ({
  id,
  message,
  variant = 'info',
  duration = 3000,
  onDismiss,
  dismissible = true,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onDismiss?.(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onDismiss]);

  const handleClose = () => {
    setIsVisible(false);
    onDismiss?.(id);
  };

  const getIcon = () => {
    switch (variant) {
      case 'success':
        return <SuccessIcon />;
      case 'error':
        return <ErrorIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'info':
      default:
        return <InfoIcon />;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={id}
          initial={{ opacity: 0, x: 400, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 400, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className={toastVariants({ variant })}
          role="alert"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Icon */}
          <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>

          {/* Message */}
          <div className="flex-1">
            <p className="text-sm leading-snug">{message}</p>
          </div>

          {/* Close Button */}
          {dismissible && (
            <button
              onClick={handleClose}
              className="flex-shrink-0 text-current/60 hover:text-current transition-colors p-1 rounded-md hover:bg-white/10"
              aria-label="Dismiss notification"
              type="button"
            >
              <CloseIcon />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Toast.displayName = 'Toast';

export default Toast;
