/**
 * GeminiGUI - useToast Hook
 * @module hooks/useToast
 *
 * Custom hook for managing toast notifications with queue support.
 * Max 3 visible toasts at a time.
 */

import { useCallback, useRef, useState } from 'react';
import type { ToastVariant } from '../components/ui/Toast';

// ============================================================================
// TYPES
// ============================================================================

export interface ToastNotification {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
  dismissible?: boolean;
}

export interface UseToastReturn {
  toasts: ToastNotification[];
  toast: {
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    warning: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
    custom: (
      message: string,
      variant: ToastVariant,
      duration?: number
    ) => void;
  };
  dismissToast: (id: string) => void;
  clearAll: () => void;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const MAX_VISIBLE_TOASTS = 3;
const DEFAULT_DURATION = 3000;

// ============================================================================
// HOOK
// ============================================================================

/**
 * Hook for managing toast notifications
 *
 * @example
 * const { toasts, toast, dismissToast } = useToast();
 *
 * // Show success toast
 * toast.success('Operation completed!');
 *
 * // Show error with custom duration
 * toast.error('Something went wrong', 5000);
 *
 * // Show custom toast
 * toast.custom('Custom message', 'warning', 4000);
 *
 * // Dismiss specific toast
 * dismissToast(toastId);
 *
 * // Clear all toasts
 * clearAll();
 */
export const useToast = (): UseToastReturn => {
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const idRef = useRef(0);

  /**
   * Generate unique toast ID
   */
  const generateId = useCallback(() => {
    idRef.current += 1;
    return `toast-${idRef.current}-${Date.now()}`;
  }, []);

  /**
   * Add a new toast with queue management
   */
  const addToast = useCallback(
    (
      message: string,
      variant: ToastVariant,
      duration: number = DEFAULT_DURATION
    ) => {
      const id = generateId();

      setToasts((prevToasts) => {
        const newToasts = [
          ...prevToasts,
          {
            id,
            message,
            variant,
            duration,
            dismissible: true,
          },
        ];

        // Keep only the last MAX_VISIBLE_TOASTS
        if (newToasts.length > MAX_VISIBLE_TOASTS) {
          return newToasts.slice(-MAX_VISIBLE_TOASTS);
        }

        return newToasts;
      });

      return id;
    },
    [generateId]
  );

  /**
   * Dismiss a specific toast
   */
  const dismissToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  /**
   * Clear all toasts
   */
  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  /**
   * Show success toast
   */
  const showSuccess = useCallback(
    (message: string, duration?: number) => {
      addToast(message, 'success', duration ?? DEFAULT_DURATION);
    },
    [addToast]
  );

  /**
   * Show error toast
   */
  const showError = useCallback(
    (message: string, duration?: number) => {
      addToast(message, 'error', duration ?? DEFAULT_DURATION);
    },
    [addToast]
  );

  /**
   * Show warning toast
   */
  const showWarning = useCallback(
    (message: string, duration?: number) => {
      addToast(message, 'warning', duration ?? DEFAULT_DURATION);
    },
    [addToast]
  );

  /**
   * Show info toast
   */
  const showInfo = useCallback(
    (message: string, duration?: number) => {
      addToast(message, 'info', duration ?? DEFAULT_DURATION);
    },
    [addToast]
  );

  /**
   * Show custom toast
   */
  const showCustom = useCallback(
    (message: string, variant: ToastVariant, duration?: number) => {
      addToast(message, variant, duration ?? DEFAULT_DURATION);
    },
    [addToast]
  );

  return {
    toasts,
    toast: {
      success: showSuccess,
      error: showError,
      warning: showWarning,
      info: showInfo,
      custom: showCustom,
    },
    dismissToast,
    clearAll,
  };
};

export default useToast;
