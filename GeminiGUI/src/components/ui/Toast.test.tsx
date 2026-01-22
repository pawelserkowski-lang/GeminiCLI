/**
 * GeminiGUI - Toast Component Tests
 * @module components/ui/Toast.test
 *
 * Unit tests for Toast notification component.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast } from './Toast';

describe('Toast Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders toast with message', () => {
      render(
        <Toast
          id="test-1"
          message="Test message"
          variant="success"
        />
      );

      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('renders with success variant', () => {
      const { container } = render(
        <Toast
          id="test-1"
          message="Success!"
          variant="success"
        />
      );

      const toast = container.querySelector('[role="alert"]');
      expect(toast).toHaveClass('bg-emerald-950/80');
    });

    it('renders with error variant', () => {
      const { container } = render(
        <Toast
          id="test-1"
          message="Error!"
          variant="error"
        />
      );

      const toast = container.querySelector('[role="alert"]');
      expect(toast).toHaveClass('bg-red-950/80');
    });

    it('renders with warning variant', () => {
      const { container } = render(
        <Toast
          id="test-1"
          message="Warning!"
          variant="warning"
        />
      );

      const toast = container.querySelector('[role="alert"]');
      expect(toast).toHaveClass('bg-amber-950/80');
    });

    it('renders with info variant', () => {
      const { container } = render(
        <Toast
          id="test-1"
          message="Info!"
          variant="info"
        />
      );

      const toast = container.querySelector('[role="alert"]');
      expect(toast).toHaveClass('bg-blue-950/80');
    });

    it('renders close button by default', () => {
      render(
        <Toast
          id="test-1"
          message="Test"
          variant="info"
        />
      );

      const closeButton = screen.getByLabelText('Dismiss notification');
      expect(closeButton).toBeInTheDocument();
    });

    it('hides close button when dismissible is false', () => {
      render(
        <Toast
          id="test-1"
          message="Test"
          variant="info"
          dismissible={false}
        />
      );

      const closeButton = screen.queryByLabelText('Dismiss notification');
      expect(closeButton).not.toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('calls onDismiss when close button is clicked', async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();

      render(
        <Toast
          id="test-1"
          message="Test"
          variant="info"
          onDismiss={onDismiss}
        />
      );

      const closeButton = screen.getByLabelText('Dismiss notification');
      await user.click(closeButton);

      expect(onDismiss).toHaveBeenCalledWith('test-1');
    });

    it('toast disappears after being closed', async () => {
      const user = userEvent.setup();

      const { container } = render(
        <Toast
          id="test-1"
          message="Test"
          variant="info"
        />
      );

      const closeButton = screen.getByLabelText('Dismiss notification');
      await user.click(closeButton);

      await waitFor(() => {
        expect(container.querySelector('[role="alert"]')).not.toBeInTheDocument();
      });
    });
  });

  describe('Auto-dismiss', () => {
    it('auto-dismisses after duration', async () => {
      vi.useFakeTimers();
      const onDismiss = vi.fn();

      render(
        <Toast
          id="test-1"
          message="Test"
          variant="info"
          duration={1000}
          onDismiss={onDismiss}
        />
      );

      expect(onDismiss).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1000);

      expect(onDismiss).toHaveBeenCalledWith('test-1');

      vi.useRealTimers();
    });

    it('does not auto-dismiss when duration is 0', async () => {
      vi.useFakeTimers();
      const onDismiss = vi.fn();

      render(
        <Toast
          id="test-1"
          message="Test"
          variant="info"
          duration={0}
          onDismiss={onDismiss}
        />
      );

      vi.advanceTimersByTime(5000);

      expect(onDismiss).not.toHaveBeenCalled();

      vi.useRealTimers();
    });

    it('clears timeout on unmount', async () => {
      vi.useFakeTimers();
      const onDismiss = vi.fn();

      const { unmount } = render(
        <Toast
          id="test-1"
          message="Test"
          variant="info"
          duration={1000}
          onDismiss={onDismiss}
        />
      );

      unmount();
      vi.advanceTimersByTime(1000);

      expect(onDismiss).not.toHaveBeenCalled();

      vi.useRealTimers();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      const { container } = render(
        <Toast
          id="test-1"
          message="Test message"
          variant="info"
        />
      );

      const alert = container.querySelector('[role="alert"]');
      expect(alert).toHaveAttribute('aria-live', 'polite');
      expect(alert).toHaveAttribute('aria-atomic', 'true');
    });

    it('close button has aria-label', () => {
      render(
        <Toast
          id="test-1"
          message="Test"
          variant="info"
        />
      );

      const closeButton = screen.getByLabelText('Dismiss notification');
      expect(closeButton).toHaveAttribute('type', 'button');
    });
  });

  describe('Icon Display', () => {
    it('displays correct icon for success variant', () => {
      const { container } = render(
        <Toast
          id="test-1"
          message="Success!"
          variant="success"
        />
      );

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('text-emerald-400');
    });

    it('displays correct icon for error variant', () => {
      const { container } = render(
        <Toast
          id="test-1"
          message="Error!"
          variant="error"
        />
      );

      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('text-red-400');
    });

    it('displays correct icon for warning variant', () => {
      const { container } = render(
        <Toast
          id="test-1"
          message="Warning!"
          variant="warning"
        />
      );

      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('text-amber-400');
    });

    it('displays correct icon for info variant', () => {
      const { container } = render(
        <Toast
          id="test-1"
          message="Info!"
          variant="info"
        />
      );

      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('text-blue-400');
    });
  });

  describe('Edge Cases', () => {
    it('handles very long messages', () => {
      const longMessage = 'A'.repeat(500);
      render(
        <Toast
          id="test-1"
          message={longMessage}
          variant="info"
        />
      );

      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it('handles special characters in message', () => {
      const specialMessage = '<script>alert("xss")</script>';
      render(
        <Toast
          id="test-1"
          message={specialMessage}
          variant="info"
        />
      );

      expect(screen.getByText(specialMessage)).toBeInTheDocument();
      expect(document.querySelector('script')).not.toBeInTheDocument();
    });

    it('handles multiple rapid dismissals gracefully', async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();

      const { rerender } = render(
        <Toast
          id="test-1"
          message="Test"
          variant="info"
          onDismiss={onDismiss}
        />
      );

      const closeButton = screen.getByLabelText('Dismiss notification');
      await user.click(closeButton);
      await user.click(closeButton);

      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
  });
});
