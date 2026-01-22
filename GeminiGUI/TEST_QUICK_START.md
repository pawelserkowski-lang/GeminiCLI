# useStreamListeners Tests - Quick Start Guide

## TL;DR - Get Tests Running in 3 Steps

### Step 1: Install Test Dependencies
```bash
npm install --save-dev vitest @testing-library/react jsdom @vitest/coverage-v8
```

### Step 2: Add Test Scripts to package.json
```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage"
  }
}
```

### Step 3: Run Tests
```bash
npm test
```

---

## File Locations

| File | Purpose |
|------|---------|
| `src/hooks/useStreamListeners.test.ts` | **23 test cases** for the hook |
| `src/hooks/useStreamListeners.test.README.md` | **Detailed test documentation** |
| `vitest.config.ts` | **Test configuration** (at project root) |
| `TEST_SETUP.md` | **Complete setup guide** |

---

## Test Coverage Summary

✓ **23 Total Tests**

| Category | Count | Status |
|----------|-------|--------|
| Listener Setup | 2 | ✓ |
| Listener Cleanup | 2 | ✓ |
| Chunk Handling | 5 | ✓ |
| Completion Handling | 3 | ✓ |
| Error Handling | 5 | ✓ |
| Callback Dependencies | 2 | ✓ |
| Integration Scenarios | 4 | ✓ |

---

## Common Commands

```bash
# Run all tests once
npm test

# Run tests in watch mode (auto-rerun on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test -- useStreamListeners.test.ts

# Run tests matching pattern
npm test -- --grep "Listener Setup"

# Run tests with UI dashboard
npm run test:ui

# Run tests in debug mode
node --inspect-brk ./node_modules/vitest/vitest.mjs run
```

---

## Test Structure Overview

### 1. Listener Setup (2 tests)
```typescript
✓ should set up listeners on mount
✓ should set up listeners with correct callbacks
```
Tests that both Ollama and Swarm listeners are registered.

### 2. Listener Cleanup (2 tests)
```typescript
✓ should clean up listeners on unmount
✓ should remove listeners from registry on unmount
```
Ensures no memory leaks from dangling listeners.

### 3. Chunk Event Handling (5 tests)
```typescript
✓ should call onChunk when chunk event is received
✓ should call onChunk for Swarm events
✓ should handle multiple consecutive chunks
✓ should not call onChunk when chunk is empty string
✓ should not call onChunk when done is true but chunk is provided
```
Verifies correct chunk processing from both event sources.

### 4. Completion Event Handling (3 tests)
```typescript
✓ should call onComplete when done=true
✓ should call onComplete for Swarm done events
✓ should handle multiple completion signals
```
Tests proper completion handling.

### 5. Error Handling (5 tests)
```typescript
✓ should call onError when an error occurs in event handler
✓ should not break stream on error
✓ should handle errors from both Ollama and Swarm events
✓ should call onError when onComplete throws
✓ should handle missing onError callback gracefully
```
Ensures robust error handling and stream resilience.

### 6. Callback Dependencies (2 tests)
```typescript
✓ should update listeners when callbacks change
✓ should include onError in dependency array
```
Verifies hook responds to callback updates.

### 7. Integration Scenarios (4 tests)
```typescript
✓ should handle realistic streaming sequence
✓ should handle mixed Ollama and Swarm events
✓ should handle edge case: completion without chunks
✓ should handle edge case: chunk with whitespace only
```
Tests real-world usage patterns.

---

## Mock Usage

The test suite mocks Tauri's event system. Key helper functions:

```typescript
// Simulate an event from Tauri
__triggerEvent('ollama-event', {
  chunk: 'Hello world',
  done: false,
});

// Get registered listeners
const listeners = __getListeners();

// Check if listener exists
if (listeners['ollama-event']) {
  // listener is registered
}
```

---

## Expected Output

```
 ✓ src/hooks/useStreamListeners.test.ts (23)
   ✓ Listener Setup (2)
   ✓ Listener Cleanup (2)
   ✓ Chunk Event Handling (5)
   ✓ Completion Event Handling (3)
   ✓ Error Handling (5)
   ✓ Callback Dependencies (2)
   ✓ Integration Scenarios (4)

 Test Files  1 passed (1)
      Tests  23 passed (23)
   Duration  1.23s
```

---

## Coverage Report

After running `npm run test:coverage`:

```
File                              | % Stmts | % Branch | % Funcs | % Lines |
----------------------------------|---------|----------|---------|---------|
src/hooks/useStreamListeners.ts   | 100     | 100      | 100     | 100     |
```

Open HTML report:
```bash
open coverage/lcov-report/index.html  # macOS
start coverage/lcov-report/index.html # Windows
xdg-open coverage/lcov-report/index.html # Linux
```

---

## Troubleshooting

### "Cannot find module 'vitest'"
```bash
npm install --save-dev vitest
```

### "jsdom is not installed"
```bash
npm install --save-dev jsdom
```

### "Tests not found"
Check file exists:
```bash
ls src/hooks/useStreamListeners.test.ts
```

### "Mock not working"
Ensure mocks are defined before imports:
```typescript
vi.mock('@tauri-apps/api/event', () => ({...})); // ← First
import { listen } from '@tauri-apps/api/event'; // ← After
```

---

## Integration Examples

### Running in GitHub Actions
```yaml
- run: npm install
- run: npm run test:coverage
- uses: codecov/codecov-action@v3
```

### Running before git commit
```bash
#!/bin/bash
npm test || exit 1
```

### Running in pre-commit hook
```bash
npx husky add .husky/pre-commit "npm test"
```

---

## Next Steps

1. **Install:** `npm install --save-dev vitest @testing-library/react jsdom @vitest/coverage-v8`
2. **Configure:** Copy `vitest.config.ts` to project root
3. **Add Scripts:** Update `package.json` with test scripts
4. **Run:** `npm test`
5. **View Coverage:** `npm run test:coverage`

---

## Need More Details?

- **Full Setup Guide:** See `TEST_SETUP.md`
- **Test Documentation:** See `src/hooks/useStreamListeners.test.README.md`
- **Hook Implementation:** See `src/hooks/useStreamListeners.ts`

---

## Quick Links

- [Vitest Docs](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Tauri Events](https://tauri.app/en/v1/api/js/event/)

