# useStreamListeners Hook - Test Suite Documentation

## Overview

This test suite provides comprehensive coverage for the `useStreamListeners` React hook, which manages Tauri event listeners for streaming data from Ollama and Swarm providers.

**Test File:** `src/hooks/useStreamListeners.test.ts`

---

## Dependencies

The test suite uses:

- **Vitest** - Fast unit test framework
- **@testing-library/react** - React hook testing utilities
- **Mocking** - Vitest's `vi` for mocking Tauri APIs

### Installation

```bash
npm install --save-dev vitest @testing-library/react jsdom
```

### Configuration (vite.config.ts or vitest.config.ts)

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
  },
});
```

### Update package.json

```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage"
  }
}
```

---

## Test Structure

### 1. **Listener Setup** (2 tests)
Tests that verify listeners are correctly registered on component mount.

```typescript
✓ should set up listeners on mount
✓ should set up listeners with correct callbacks
```

**What it tests:**
- Both `ollama-event` and `swarm-data` listeners are registered
- Callbacks are passed to the `listen` function

---

### 2. **Listener Cleanup** (2 tests)
Tests that verify proper cleanup of listeners on component unmount.

```typescript
✓ should clean up listeners on unmount
✓ should remove listeners from registry on unmount
```

**What it tests:**
- Unlisten functions are called during cleanup
- Listeners are removed from the internal registry
- No memory leaks from dangling listeners

---

### 3. **Chunk Event Handling** (5 tests)
Tests that verify correct behavior when receiving chunk events.

```typescript
✓ should call onChunk when chunk event is received
✓ should call onChunk for Swarm events
✓ should handle multiple consecutive chunks
✓ should not call onChunk when chunk is empty string
✓ should not call onChunk when done is true but chunk is provided
```

**What it tests:**
- `onChunk` callback is invoked with the correct chunk data
- Both Ollama and Swarm events trigger chunk handling
- Multiple chunks are processed sequentially
- Empty chunks are filtered out
- When streaming completes (`done: true`), chunks are ignored

---

### 4. **Completion Event Handling** (3 tests)
Tests that verify correct behavior when streaming completes.

```typescript
✓ should call onComplete when done=true
✓ should call onComplete for Swarm done events
✓ should handle multiple completion signals
```

**What it tests:**
- `onComplete` callback is invoked when `done: true`
- Both event sources can trigger completion
- Multiple chunks followed by completion work correctly

---

### 5. **Error Handling** (5 tests)
Tests that verify robust error handling and recovery.

```typescript
✓ should call onError when an error occurs in event handler
✓ should not break stream on error
✓ should handle errors from both Ollama and Swarm events
✓ should call onError when onComplete throws
✓ should handle missing onError callback gracefully
```

**What it tests:**
- `onError` callback is invoked when callbacks throw exceptions
- Stream continues processing after errors
- Errors from any event source are handled
- Optional `onError` callback doesn't break when undefined
- Completion callback errors are caught

---

### 6. **Callback Dependencies** (2 tests)
Tests that verify the hook correctly updates when callbacks change.

```typescript
✓ should update listeners when callbacks change
✓ should include onError in dependency array
```

**What it tests:**
- Hook responds to callback updates via `rerender`
- New callbacks are used after re-renders
- `onError` is properly included in the dependency array

---

### 7. **Integration Scenarios** (4 tests)
Tests that simulate realistic usage patterns.

```typescript
✓ should handle realistic streaming sequence
✓ should handle mixed Ollama and Swarm events
✓ should handle edge case: completion without chunks
✓ should handle edge case: chunk with whitespace only
```

**What it tests:**
- Multiple chunks followed by completion
- Interleaved events from different providers
- Immediate completion without data
- Whitespace-only chunks are preserved

---

## Mock Architecture

### Tauri Event System Mock

The test suite mocks `@tauri-apps/api/event` with a custom implementation:

```typescript
vi.mock('@tauri-apps/api/event', () => {
  const listeners: Record<string, (event: any) => void> = {};
  const unlisteners: Record<string, () => void> = {};

  return {
    listen: vi.fn((eventName: string, callback: (event: any) => void) => {
      listeners[eventName] = callback;
      return Promise.resolve(() => {
        if (unlisteners[eventName]) {
          unlisteners[eventName]();
        }
        delete listeners[eventName];
      });
    }),
    __triggerEvent: (eventName: string, payload: any) => {
      if (listeners[eventName]) {
        listeners[eventName]({ payload });
      }
    },
    __getListeners: () => listeners,
    __setUnlistener: (eventName: string, fn: () => void) => {
      unlisteners[eventName] = fn;
    },
  };
});
```

**Key features:**
- Stores registered listeners in memory
- Provides `__triggerEvent()` helper to simulate events
- `__getListeners()` for inspecting registered listeners
- Properly returns unlisten functions

### Constants Mock

```typescript
vi.mock('../constants', () => ({
  TAURI_EVENTS: {
    OLLAMA_EVENT: 'ollama-event',
    SWARM_DATA: 'swarm-data',
    GEMINI_STREAM: 'gemini-stream',
  },
  // ... other mocked constants
}));
```

---

## Running the Tests

### Run all tests
```bash
npm run test
```

### Run in watch mode (auto-rerun on file changes)
```bash
npm run test:watch
```

### Run specific test file
```bash
npm run test -- useStreamListeners.test.ts
```

### Run with coverage report
```bash
npm run test:coverage
```

### Run specific test suite
```bash
npm run test -- --grep "Listener Setup"
```

---

## Example Test Output

```
 ✓ src/hooks/useStreamListeners.test.ts (23)
   ✓ Listener Setup (2)
     ✓ should set up listeners on mount
     ✓ should set up listeners with correct callbacks
   ✓ Listener Cleanup (2)
     ✓ should clean up listeners on unmount
     ✓ should remove listeners from registry on unmount
   ✓ Chunk Event Handling (5)
     ✓ should call onChunk when chunk event is received
     ✓ should call onChunk for Swarm events
     ✓ should handle multiple consecutive chunks
     ✓ should not call onChunk when chunk is empty string
     ✓ should not call onChunk when done is true but chunk is provided
   ✓ Completion Event Handling (3)
     ✓ should call onComplete when done=true
     ✓ should call onComplete for Swarm done events
     ✓ should handle multiple completion signals
   ✓ Error Handling (5)
     ✓ should call onError when an error occurs in event handler
     ✓ should not break stream on error
     ✓ should handle errors from both Ollama and Swarm events
     ✓ should call onError when onComplete throws
     ✓ should handle missing onError callback gracefully
   ✓ Callback Dependencies (2)
     ✓ should update listeners when callbacks change
     ✓ should include onError in dependency array
   ✓ Integration Scenarios (4)
     ✓ should handle realistic streaming sequence
     ✓ should handle mixed Ollama and Swarm events
     ✓ should handle edge case: completion without chunks
     ✓ should handle edge case: chunk with whitespace only

 Test Files  1 passed (1)
      Tests  23 passed (23)
```

---

## Key Testing Patterns

### Pattern 1: Simulating Events

```typescript
// Trigger an event from the mock listener
__triggerEvent('ollama-event', {
  chunk: 'Hello world',
  done: false,
});

expect(onChunk).toHaveBeenCalledWith('Hello world');
```

### Pattern 2: Testing Cleanup

```typescript
const { unmount } = renderHook(() =>
  useStreamListeners({ onChunk, onComplete, onError })
);

unmount();
await new Promise((resolve) => setTimeout(resolve, 0));

expect(unlistenOllama).toHaveBeenCalled();
```

### Pattern 3: Testing Error Scenarios

```typescript
const throwingOnChunk = vi.fn(() => {
  throw new Error('Processing error');
});

renderHook(() =>
  useStreamListeners({
    onChunk: throwingOnChunk,
    onComplete,
    onError,
  })
);

__triggerEvent('ollama-event', { chunk: 'data', done: false });
expect(onError).toHaveBeenCalledWith(expect.any(Error));
```

### Pattern 4: Testing Hook Re-renders

```typescript
const { rerender } = renderHook(
  ({ onChunk: chunk }) =>
    useStreamListeners({ onChunk: chunk, onComplete, onError }),
  { initialProps: { onChunk } }
);

rerender({ onChunk: newOnChunk });
__triggerEvent('ollama-event', { chunk: 'data', done: false });
expect(newOnChunk).toHaveBeenCalled();
```

---

## Coverage Goals

This test suite aims for:
- **Line Coverage:** >95%
- **Branch Coverage:** >90%
- **Function Coverage:** 100%

Current coverage should include:
- ✓ Hook initialization
- ✓ Listener registration
- ✓ Event handling (all paths)
- ✓ Error handling (catch blocks)
- ✓ Cleanup logic
- ✓ Dependency updates

---

## Common Issues & Solutions

### Issue: Tests timeout waiting for async operations
**Solution:** Increase Jest timeout or use `vi.useFakeTimers()`

```typescript
vi.useFakeTimers();
// ... test code ...
vi.runAllTimers();
```

### Issue: Mock listeners not triggering
**Solution:** Ensure `__triggerEvent` is called after hook is rendered and promise settles

```typescript
await new Promise((resolve) => setTimeout(resolve, 0));
__triggerEvent('ollama-event', payload);
```

### Issue: Cleanup functions not being called
**Solution:** Ensure unmount happens after listeners are fully set up

```typescript
const { unmount } = renderHook(() => useStreamListeners(...));
await new Promise((resolve) => setTimeout(resolve, 0));
unmount();
```

---

## Extending the Tests

To add new test cases:

1. **Identify the scenario** - What behavior should be tested?
2. **Create test function** - Use descriptive names
3. **Setup** - Create mocks and render hook
4. **Trigger** - Call `__triggerEvent` with appropriate payload
5. **Assert** - Verify expected behavior

Example:
```typescript
it('should handle custom event types', async () => {
  renderHook(() =>
    useStreamListeners({ onChunk, onComplete, onError })
  );

  __triggerEvent('custom-event', {
    chunk: 'custom data',
    done: false,
  });

  expect(onChunk).toHaveBeenCalledWith('custom data');
});
```

---

## Related Files

- **Hook Implementation:** `src/hooks/useStreamListeners.ts`
- **Types Definition:** `src/types/index.ts`
- **Constants:** `src/constants/index.ts`
- **Test Configuration:** `vitest.config.ts` (or `vite.config.ts`)

---

## Further Reading

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing React Hooks](https://react-hooks-testing-library.com/)
- [Tauri Event System](https://tauri.app/en/v1/api/js/event)
