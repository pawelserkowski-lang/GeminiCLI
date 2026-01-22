/**
 * useStreamListeners - Tauri Stream Event Listeners
 * @module hooks/useStreamListeners
 *
 * Sets up listeners for Ollama and Swarm streaming events.
 */

import { useEffect, useCallback } from 'react';
import { listen } from '@tauri-apps/api/event';
import { TAURI_EVENTS } from '../constants';
import type { StreamPayload } from '../types';

interface UseStreamListenersOptions {
  onChunk: (chunk: string) => void;
  onComplete: () => void;
  onError?: (error: unknown) => void;
}

/**
 * Hook for listening to Tauri streaming events
 *
 * @example
 * ```tsx
 * useStreamListeners({
 *   onChunk: (chunk) => updateLastMessage(chunk),
 *   onComplete: () => setIsStreaming(false),
 * });
 * ```
 */
export const useStreamListeners = ({
  onChunk,
  onComplete,
  onError,
}: UseStreamListenersOptions): void => {
  const handleStreamEvent = useCallback(
    (payload: StreamPayload) => {
      const { chunk, done } = payload;
      if (!done && chunk) {
        onChunk(chunk);
      } else if (done) {
        onComplete();
      }
    },
    [onChunk, onComplete]
  );

  useEffect(() => {
    // Listen to Ollama events
    const unlistenOllama = listen<StreamPayload>(
      TAURI_EVENTS.OLLAMA_EVENT,
      (event) => {
        try {
          handleStreamEvent(event.payload);
        } catch (error) {
          console.error('[StreamListeners] Ollama event error:', error);
          onError?.(error);
        }
      }
    );

    // Listen to Swarm events
    const unlistenSwarm = listen<StreamPayload>(
      TAURI_EVENTS.SWARM_DATA,
      (event) => {
        try {
          handleStreamEvent(event.payload);
        } catch (error) {
          console.error('[StreamListeners] Swarm event error:', error);
          onError?.(error);
        }
      }
    );

    // Cleanup listeners on unmount
    return () => {
      unlistenOllama.then((f) => f());
      unlistenSwarm.then((f) => f());
    };
  }, [handleStreamEvent, onError]);
};

export default useStreamListeners;
