# Zustand Selectors - Quick Reference

## 6 Required Selectors

| Selector | Returns | Use Case |
|----------|---------|----------|
| `selectIsApiKeySet` | `boolean` | Check if Gemini API key is configured |
| `selectSessionById(id)` | `Session \| undefined` | Get specific session (curried) |
| `selectMessageCount` | `number` | Show message count in current session |
| `selectHasMessages` | `boolean` | Show/hide empty state |
| `selectUseSwarm` | `boolean` | Feature gate for swarm mode |
| `selectOllamaEndpoint` | `string` | Get Ollama server URL |

## Quick Usage

### Import
```typescript
import { useAppStore } from '../store/useAppStore';
import { selectIsApiKeySet, selectSessionById } from '../store/selectors';
```

### In Components
```typescript
// Single selector
const isApiKeySet = useAppStore(selectIsApiKeySet);

// Curried selector with ID
const session = useAppStore(selectSessionById('session-123'));

// Multiple selectors
const messageCount = useAppStore(selectMessageCount);
const hasMessages = useAppStore(selectHasMessages);
const useSwarm = useAppStore(selectUseSwarm);
const endpoint = useAppStore(selectOllamaEndpoint);
```

## Common Patterns

### API Configuration Check
```typescript
const isApiKeySet = useAppStore(selectIsApiKeySet);
const endpoint = useAppStore(selectOllamaEndpoint);

return (
  {isApiKeySet ? (
    <GeminiProvider />
  ) : endpoint ? (
    <OllamaProvider />
  ) : (
    <ConfigNeeded />
  )}
);
```

### Session List Rendering
```typescript
const sessions = useAppStore(state => state.sessions);

return sessions.map(session => (
  <SessionItem key={session.id} id={session.id} />
));

// Inside SessionItem component:
function SessionItem({ id }: { id: string }) {
  const session = useAppStore(selectSessionById(id));
  return <div>{session?.title}</div>;
}
```

### Chat Status Display
```typescript
const hasMessages = useAppStore(selectHasMessages);
const messageCount = useAppStore(selectMessageCount);
const useSwarm = useAppStore(selectUseSwarm);

return (
  <Status>
    {hasMessages && <span>{messageCount} msgs</span>}
    {useSwarm && <span>Swarm ON</span>}
  </Status>
);
```

## File Locations

| File | Purpose |
|------|---------|
| `src/store/useAppStore.ts` | Main store + 6 new selectors |
| `src/store/selectors.ts` | 30+ optimized selectors |
| `SELECTOR_GUIDE.md` | Full documentation |

## Key Benefits

✅ **Reduced Re-renders** - Subscribe only to needed state slices
✅ **Better Performance** - Primitive returns prevent unnecessary renders
✅ **Type-Safe** - Full TypeScript support
✅ **Memoized** - Curried selectors enable per-item subscriptions
✅ **Clean Code** - Single-line subscriptions

## Import All Selectors (Optional)

In `src/store/useAppStore.ts`, add at the end:
```typescript
export * from './selectors';
```

Then in components:
```typescript
import { useAppStore, selectIsApiKeySet } from '../store';
```
