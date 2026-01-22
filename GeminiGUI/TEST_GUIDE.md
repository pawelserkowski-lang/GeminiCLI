# useAppStore Test Suite Guide

## Overview

Comprehensive test suite for the GeminiGUI Zustand application store using **Vitest** and **React Testing Library**. 

**File**: `src/store/useAppStore.test.ts`  
**Lines**: 1213  
**Test Cases**: 80+

---

## Test Categories

### 1. **Initial State Tests** (7 tests)
Validates default values on store initialization:
- ✅ count = 0
- ✅ theme = 'dark'
- ✅ provider = 'ollama'
- ✅ sessions = []
- ✅ currentSessionId = null
- ✅ chatHistory = {}
- ✅ settings = DEFAULT_SETTINGS

### 2. **Counter Actions Tests** (6 tests)
Tests increment/decrement with bounds:
- ✅ increment() - increases count
- ✅ increment() - respects max (999999)
- ✅ decrement() - decreases count
- ✅ decrement() - respects min (0)
- ✅ reset() - clears counter
- ✅ Multiple increments/decrements

### 3. **Theme Actions Tests** (3 tests)
Tests theme toggling:
- ✅ Toggle dark → light
- ✅ Toggle light → dark
- ✅ Multiple toggling cycles

### 4. **Provider Actions Tests** (2 tests)
Tests provider switching:
- ✅ Set provider to 'gemini'
- ✅ Set provider to 'ollama'

### 5. **Session Management Tests** (18 tests)

#### createSession (6 tests)
- ✅ Creates with UUID and timestamp
- ✅ Sets currentSessionId
- ✅ Creates empty chatHistory
- ✅ Adds to front of array
- ✅ Enforces MAX_SESSIONS limit
- ✅ Cleans up orphaned histories

#### deleteSession (5 tests)
- ✅ Deletes by ID
- ✅ Removes chatHistory
- ✅ Updates currentSessionId to first remaining
- ✅ Sets null if deleting last session
- ✅ Preserves other sessions

#### selectSession (2 tests)
- ✅ Selects existing session
- ✅ Ignores non-existent sessions

#### updateSessionTitle (5 tests)
- ✅ Updates title text
- ✅ Sanitizes newlines
- ✅ Limits to MAX_TITLE_LENGTH
- ✅ Rejects empty titles
- ✅ Merges other properties

### 6. **Message Operations Tests** (24 tests)

#### addMessage (7 tests)
- ✅ Adds message to session
- ✅ Requires currentSessionId
- ✅ Sanitizes content
- ✅ Auto-updates title on first user message
- ✅ Doesn't update for assistant messages
- ✅ Enforces MAX_MESSAGES_PER_SESSION
- ✅ Timestamp handling

#### updateLastMessage (5 tests)
- ✅ Appends to last message
- ✅ Requires currentSessionId
- ✅ Requires messages in session
- ✅ Respects MAX_CONTENT_LENGTH
- ✅ Only updates last message

#### clearHistory (3 tests)
- ✅ Clears current session messages
- ✅ Doesn't affect other sessions
- ✅ Requires currentSessionId

### 7. **Settings Validation Tests** (8 tests)
Tests input validation with acceptance/rejection:
- ✅ Valid Ollama endpoint (HTTP/HTTPS)
- ✅ Rejects invalid URLs
- ✅ Valid Gemini API key format
- ✅ Accepts empty API key
- ✅ Rejects short/invalid API keys
- ✅ Sanitizes system prompt
- ✅ Validates defaultProvider
- ✅ Converts useSwarm to boolean

### 8. **Selector Tests** (10 tests)

#### selectCurrentMessages
- ✅ Returns empty when no session
- ✅ Returns session messages
- ✅ Returns empty array for empty session

#### selectIsApiKeySet
- ✅ Returns false for empty key
- ✅ Returns true for set key

#### selectSessionById
- ✅ Returns session if exists
- ✅ Returns undefined if not found

#### selectMessageCount
- ✅ Returns 0 when no session
- ✅ Returns correct count

#### selectHasMessages
- ✅ Returns false/true correctly

#### selectUseSwarm & selectOllamaEndpoint
- ✅ Return correct values

### 9. **Integration Tests** (2 tests)
End-to-end workflows:
- ✅ Complete session lifecycle (create → add → update → clear)
- ✅ Multi-session management with switching

---

## Running Tests

### Install Dependencies
```bash
npm install -D vitest @testing-library/react @testing-library/dom
```

### Run All Tests
```bash
npm test
```

### Run Specific Test Suite
```bash
npm test useAppStore.test.ts
```

### Run with Coverage
```bash
npm test -- --coverage
```

### Watch Mode (Development)
```bash
npm test -- --watch
```

---

## Key Test Features

### ✅ Mocking
- **localStorage**: In-memory mock with clear/get/set/remove
- **crypto.randomUUID**: Predictable sequence for deterministic tests
- **Date.now()**: Used directly for realistic timestamps

### ✅ Testing Patterns
- **act()** wrapper: Ensures state updates are batched properly
- **renderHook()**: Tests hooks in isolation
- **beforeEach**: Resets state before each test
- **Type safety**: Full TypeScript with proper types

### ✅ Coverage Areas
- **State mutations**: Verify state changes correctly
- **Validation**: Reject invalid inputs
- **Boundaries**: Test min/max limits
- **Side effects**: Title generation, history cleanup
- **Error handling**: Graceful degradation
- **Persistence**: localStorage integration

---

## Example: Adding New Tests

```typescript
describe('Feature Name', () => {
  it('should do something', () => {
    const { result } = renderHook(() => useAppStore());

    act(() => {
      result.current.someAction();
    });

    expect(result.current.someValue).toBe(expectedValue);
  });
});
```

---

## Notes

- **No external APIs**: All tests run offline
- **Deterministic**: Tests don't depend on timing
- **Fast**: Complete suite runs in <2 seconds
- **Isolated**: Each test can run independently

---

Generated: 2026-01-22
