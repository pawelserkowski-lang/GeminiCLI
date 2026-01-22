# Zustand Selectors Optimization Guide

## Overview

This document describes the optimized selectors added to the GeminiHydra GUI for better performance and reduced re-renders in React components.

## Files Modified/Created

### 1. `src/store/useAppStore.ts`
Enhanced with 6 new optimized selectors directly in the main store file.

### 2. `src/store/selectors.ts` (NEW)
Comprehensive selector module with 30+ memoized selectors organized by category.

## Required Selectors Added

All 6 required selectors have been implemented in both locations:

### 1. `selectIsApiKeySet`
Returns a boolean indicating if the Gemini API key is configured.

```typescript
const isApiKeySet = useAppStore(selectIsApiKeySet);

// In components:
{isApiKeySet ? <GeminiProvider /> : <ConfigPrompt />}
```

**Benefits:**
- Avoids full settings subscription
- Only returns boolean primitive
- Triggers re-render only when API key changes

---

### 2. `selectSessionById` (Curried Selector)
Curried selector that returns a specific session by ID without subscribing to all sessions.

```typescript
const sessionId = 'uuid-123';
const session = useAppStore(selectSessionById(sessionId));

// Returns: Session | undefined
{session && <SessionDetails title={session.title} />}
```

**Benefits:**
- Enables per-session subscriptions
- Prevents re-renders when other sessions change
- Perfect for rendering individual session items

**Pattern:**
```typescript
// Correct (memoized):
const session = useAppStore(selectSessionById(id));

// Wrong (creates new function on each render):
const session = useAppStore((state) => selectSessionById(id)(state));
```

---

### 3. `selectMessageCount`
Returns the total number of messages in the current session.

```typescript
const messageCount = useAppStore(selectMessageCount);

// In status bar:
<StatusBar>{messageCount} messages</StatusBar>
```

**Benefits:**
- Returns only a number (primitive)
- Prevents re-render when message content changes (only count matters)
- Lighter than subscribing to full message array

---

### 4. `selectHasMessages`
Returns a boolean indicating if the current session has any messages.

```typescript
const hasMessages = useAppStore(selectHasMessages);

// Conditional rendering:
{hasMessages ? <ChatHistory /> : <EmptyState />}
```

**Benefits:**
- Pure boolean return value
- Useful for UI state (show/hide placeholders)
- More efficient than checking array length

---

### 5. `selectUseSwarm`
Returns the `useSwarm` setting from the configuration.

```typescript
const useSwarm = useAppStore(selectUseSwarm);

// Feature gate:
{useSwarm && <SwarmPanel />}
```

**Benefits:**
- Isolated settings subscription
- Avoids full settings object subscription
- Perfect for feature flags

---

### 6. `selectOllamaEndpoint`
Returns the Ollama endpoint URL from settings.

```typescript
const endpoint = useAppStore(selectOllamaEndpoint);

// Initialize client:
const ollamaClient = new OllamaClient(endpoint);
```

**Benefits:**
- Separate from API key subscription
- Prevents re-renders when other settings change
- Lightweight string value

---

## Additional Selectors Available

The `selectors.ts` file includes extra selectors for common use cases:

### Basic State Selectors
- `selectTheme` - Theme setting ('dark' | 'light')
- `selectProvider` - Current provider ('ollama' | 'gemini')
- `selectCurrentSessionId` - Current session ID
- `selectCount` - Counter value

### Settings Selectors
- `selectSettings` - Full settings object
- `selectSystemPrompt` - System prompt string
- `selectDefaultProvider` - Default provider setting
- `selectGeminiApiKey` - Gemini API key (⚠️ sensitive)

### Session Selectors
- `selectSessions` - All sessions array
- `selectCurrentSession` - Current session object
- `selectSessionCount` - Number of sessions

### Message Selectors
- `selectChatHistory` - Full chat history record
- `selectCurrentMessages` - Messages array for current session
- `selectMessagesBySessionId(id)` - Messages for specific session (curried)
- `selectMessageCountBySessionId(id)` - Message count for specific session
- `selectSessionHasMessages(id)` - Check if session has messages
- `selectLastMessage` - Last message in current session
- `selectLastMessageBySessionId(id)` - Last message in specific session

### Composite Selectors (Multiple State Slices)
- `selectIsAppReady` - Check if app is ready (has sessions + current session)
- `selectSessionMetadata` - Session metadata object (count, ID, messages)
- `selectApiConfigStatus` - API configuration status
- `selectRuntimeSettings` - Runtime settings summary

---

## Usage Patterns

### Pattern 1: Simple Subscription
```typescript
import { useAppStore } from '../store/useAppStore';
import { selectIsApiKeySet } from '../store/selectors';

export function MyComponent() {
  const isApiKeySet = useAppStore(selectIsApiKeySet);

  return <div>{isApiKeySet ? 'Configured' : 'Not configured'}</div>;
}
```

### Pattern 2: Curried Selector
```typescript
import { useAppStore } from '../store/useAppStore';
import { selectSessionById } from '../store/selectors';

interface SessionItemProps {
  sessionId: string;
}

export function SessionItem({ sessionId }: SessionItemProps) {
  // This subscribes ONLY to changes of this specific session
  const session = useAppStore(selectSessionById(sessionId));

  if (!session) return null;

  return <div>{session.title}</div>;
}
```

### Pattern 3: Multiple Selectors
```typescript
import { useAppStore } from '../store/useAppStore';
import { selectMessageCount, selectHasMessages } from '../store/selectors';

export function ChatStatus() {
  const messageCount = useAppStore(selectMessageCount);
  const hasMessages = useAppStore(selectHasMessages);

  return (
    <div>
      {hasMessages && <span>Messages: {messageCount}</span>}
    </div>
  );
}
```

### Pattern 4: Composite Selector
```typescript
import { useAppStore } from '../store/useAppStore';
import { selectSessionMetadata } from '../store/selectors';

export function Header() {
  const metadata = useAppStore(selectSessionMetadata);

  return (
    <header>
      <h1>Sessions: {metadata.totalSessions}</h1>
      <p>Messages: {metadata.messageCount}</p>
    </header>
  );
}
```

---

## Performance Optimization Tips

### ✅ DO:
1. Use specific selectors instead of whole state
   ```typescript
   // Good - subscribes only to useSwarm
   const useSwarm = useAppStore(selectUseSwarm);

   // Bad - subscribes to entire settings object
   const { useSwarm } = useAppStore(state => state.settings);
   ```

2. Use curried selectors for list items
   ```typescript
   // Good - each item subscribes only to its own session
   <Session key={id} id={id} />

   // Inside Session component:
   const session = useAppStore(selectSessionById(id));
   ```

3. Use boolean/number selectors for flags and counts
   ```typescript
   // Good - primitive return prevents unnecessary renders
   const hasMessages = useAppStore(selectHasMessages);

   // Bad - always re-renders on any state change
   const messages = useAppStore(state => state.chatHistory[state.currentSessionId]);
   ```

4. Memoize curried selector IDs in parent components
   ```typescript
   // In parent:
   const sessionIds = useAppStore(selectSessions).map(s => s.id);

   // Then:
   {sessionIds.map(id => <SessionItem key={id} id={id} />)}
   ```

### ❌ DON'T:
1. Subscribe to entire objects when you need one field
   ```typescript
   // Bad
   const { useSwarm } = useAppStore(state => state.settings);
   ```

2. Create new curried selectors inline
   ```typescript
   // Bad - function recreated on every render
   const session = useAppStore((state) =>
     state.sessions.find(s => s.id === sessionId)
   );

   // Good - use pre-defined curried selector
   const session = useAppStore(selectSessionById(sessionId));
   ```

3. Destructure from store without selectors
   ```typescript
   // Bad - subscribes to entire state
   const { settings, sessions } = useAppStore();
   ```

---

## Migration Guide

### Before (Old Pattern)
```typescript
export function MyComponent() {
  const settings = useAppStore(state => state.settings);
  const isApiKeySet = Boolean(settings.geminiApiKey?.length > 0);

  return <div>{isApiKeySet ? 'Ready' : 'Configure'}</div>;
}
```

### After (New Pattern)
```typescript
import { selectIsApiKeySet } from '../store/selectors';

export function MyComponent() {
  const isApiKeySet = useAppStore(selectIsApiKeySet);

  return <div>{isApiKeySet ? 'Ready' : 'Configure'}</div>;
}
```

**Benefits:**
- Single line subscription
- No null-checking needed
- Cleaner component code
- Better TypeScript inference

---

## API Reference

### Selector Organization

The `selectors.ts` file is organized into sections:

1. **BASIC STATE SELECTORS** - Theme, provider, IDs
2. **SETTINGS SELECTORS** - Configuration values
3. **SESSION SELECTORS** - Session management
4. **MESSAGE SELECTORS** - Chat history and messages
5. **COMPOSITE SELECTORS** - Multi-slice aggregates

Each selector includes:
- JSDoc documentation
- Parameter descriptions
- Return type information
- Usage examples

---

## Testing Selectors

### Unit Test Example
```typescript
import { selectIsApiKeySet, selectMessageCount } from '../store/selectors';
import type { AppState } from '../types';

describe('Selectors', () => {
  it('selectIsApiKeySet returns true when API key exists', () => {
    const state: AppState = {
      settings: { geminiApiKey: 'test-key' },
      // ... other state
    };

    expect(selectIsApiKeySet(state)).toBe(true);
  });

  it('selectMessageCount returns correct count', () => {
    const state: AppState = {
      currentSessionId: 'session-1',
      chatHistory: {
        'session-1': [
          { role: 'user', content: 'hello', timestamp: 1 },
          { role: 'assistant', content: 'hi', timestamp: 2 },
        ],
      },
      // ... other state
    };

    expect(selectMessageCount(state)).toBe(2);
  });
});
```

---

## Re-export Convenience

You can re-export selectors from the main store file for convenience:

```typescript
// In src/store/useAppStore.ts
export * from './selectors';
export { useAppStore };

// Then in components:
import { useAppStore, selectIsApiKeySet } from '../store';
```

---

## Performance Metrics

Using optimized selectors compared to full state subscriptions:

| Selector Type | Re-render Trigger | Performance |
|---|---|---|
| Full state | Any state change | Poor |
| Full settings object | Any setting change | Fair |
| `selectIsApiKeySet` | Only API key changes | Excellent |
| `selectMessageCount` | Only message count changes | Excellent |
| `selectSessionById` (curried) | Only that session changes | Excellent |
| Composite selector | Any of its parts change | Good |

---

## Troubleshooting

### Issue: Curried selector creates memory leak
**Problem:** Defining selector inline causes it to be recreated
```typescript
// Bad - new function on every render
const session = useAppStore((state) => state.sessions.find(s => s.id === id));
```

**Solution:** Use pre-defined curried selector
```typescript
// Good - selector defined once
const session = useAppStore(selectSessionById(sessionId));
```

### Issue: Component re-renders too often
**Problem:** Subscribing to large objects
```typescript
// Bad - re-renders when ANY setting changes
const settings = useAppStore(state => state.settings);
```

**Solution:** Use specific selector
```typescript
// Good - re-renders only when this value changes
const useSwarm = useAppStore(selectUseSwarm);
```

---

## Summary

The optimized selectors provide:
- ✅ Better performance through granular subscriptions
- ✅ Cleaner component code
- ✅ Type-safe selector functions
- ✅ Comprehensive documentation
- ✅ Curried selectors for dynamic queries
- ✅ Composite selectors for complex state
- ✅ Easy migration from old patterns

**Start using selectors today for a faster, more responsive UI!**
