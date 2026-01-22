# Zustand Selectors - Practical Implementation Examples

## Real-World Component Examples

These examples show how to use the optimized selectors in actual GeminiGUI components.

---

## Example 1: Settings Panel Component

Shows configuration status using multiple selectors.

```typescript
import { useAppStore } from '../store/useAppStore';
import { selectIsApiKeySet, selectOllamaEndpoint, selectUseSwarm } from '../store/selectors';

export function SettingsPanel() {
  // Subscribe to individual settings
  const isApiKeySet = useAppStore(selectIsApiKeySet);
  const ollamaEndpoint = useAppStore(selectOllamaEndpoint);
  const useSwarm = useAppStore(selectUseSwarm);

  // Only updates when these specific settings change
  return (
    <div className="settings-panel">
      <div className="setting-item">
        <label>Gemini API Key</label>
        <span>{isApiKeySet ? '✅ Configured' : '❌ Not Set'}</span>
      </div>

      <div className="setting-item">
        <label>Ollama Endpoint</label>
        <input
          type="url"
          value={ollamaEndpoint}
          onChange={(e) =>
            useAppStore.setState((state) => ({
              settings: {
                ...state.settings,
                ollamaEndpoint: e.target.value,
              },
            }))
          }
        />
      </div>

      <div className="setting-item">
        <label>
          <input
            type="checkbox"
            checked={useSwarm}
            onChange={(e) =>
              useAppStore.setState((state) => ({
                settings: {
                  ...state.settings,
                  useSwarm: e.target.checked,
                },
              }))
            }
          />
          Enable Swarm Mode
        </label>
      </div>
    </div>
  );
}
```

**Performance:** Component re-renders only when `useSwarm` changes, not when other settings change.

---

## Example 2: Chat Status Bar

Displays message count and swarm status using primitive selectors.

```typescript
import { useAppStore } from '../store/useAppStore';
import { selectMessageCount, selectHasMessages, selectUseSwarm } from '../store/selectors';

export function ChatStatusBar() {
  const messageCount = useAppStore(selectMessageCount);
  const hasMessages = useAppStore(selectHasMessages);
  const useSwarm = useAppStore(selectUseSwarm);

  return (
    <div className="status-bar">
      <div className="status-left">
        {hasMessages && (
          <span className="message-count">
            📧 {messageCount} message{messageCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div className="status-right">
        {useSwarm && <span className="swarm-badge">🐝 Swarm Active</span>}
      </div>
    </div>
  );
}
```

**Performance:** Each selector is independent - message count changes don't trigger swarm status re-render.

---

## Example 3: Session List with Per-Item Subscriptions

Uses curried selector to subscribe to individual sessions.

```typescript
import { useAppStore } from '../store/useAppStore';
import { selectSessions, selectCurrentSessionId, selectSessionById } from '../store/selectors';

export function SessionSidebar() {
  // Subscribe to sessions list
  const sessions = useAppStore(selectSessions);
  const currentSessionId = useAppStore(selectCurrentSessionId);

  return (
    <div className="sidebar-sessions">
      <h3>Sessions ({sessions.length})</h3>
      <div className="session-list">
        {sessions.map((session) => (
          <SessionItem key={session.id} id={session.id} />
        ))}
      </div>
    </div>
  );
}

// Separate component for individual session
interface SessionItemProps {
  id: string;
}

function SessionItem({ id }: SessionItemProps) {
  // IMPORTANT: Use curried selector to subscribe only to THIS session
  const session = useAppStore(selectSessionById(id));
  const currentSessionId = useAppStore(selectCurrentSessionId);
  const updateSessionTitle = useAppStore((state) => state.updateSessionTitle);

  if (!session) return null;

  const isActive = id === currentSessionId;

  return (
    <div
      className={`session-item ${isActive ? 'active' : ''}`}
      onClick={() => useAppStore.setState({ currentSessionId: id })}
    >
      <span className="session-title">{session.title}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          const newTitle = prompt('New title:', session.title);
          if (newTitle) updateSessionTitle(id, newTitle);
        }}
      >
        ✏️
      </button>
    </div>
  );
}
```

**Performance:** Each session item only re-renders when its own session data changes, not when other sessions change.

---

## Example 4: Chat Container with Message Count Display

Shows conditional rendering based on message state.

```typescript
import { useAppStore } from '../store/useAppStore';
import { selectCurrentMessages, selectHasMessages, selectMessageCount } from '../store/selectors';

export function ChatContainer() {
  const messages = useAppStore(selectCurrentMessages);
  const hasMessages = useAppStore(selectHasMessages);
  const messageCount = useAppStore(selectMessageCount);

  return (
    <div className="chat-container">
      {!hasMessages ? (
        <EmptyState />
      ) : (
        <>
          <div className="message-header">
            <h2>Conversation ({messageCount})</h2>
          </div>
          <div className="messages-list">
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} message={msg} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="empty-state">
      <h3>No messages yet</h3>
      <p>Start a new conversation by sending a message</p>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  return (
    <div className={`message bubble ${message.role}`}>
      <p>{message.content}</p>
      <time>{new Date(message.timestamp).toLocaleTimeString()}</time>
    </div>
  );
}
```

**Performance:** `selectHasMessages` is a boolean check, preventing re-renders from message content changes.

---

## Example 5: Provider Switcher with API Key Check

Conditionally show provider options based on API key configuration.

```typescript
import { useAppStore } from '../store/useAppStore';
import { selectIsApiKeySet } from '../store/selectors';

export function ProviderSwitcher() {
  const isApiKeySet = useAppStore(selectIsApiKeySet);
  const provider = useAppStore((state) => state.provider);
  const setProvider = useAppStore((state) => state.setProvider);

  return (
    <div className="provider-switcher">
      <button
        className={`provider-btn ${provider === 'ollama' ? 'active' : ''}`}
        onClick={() => setProvider('ollama')}
      >
        🦙 Ollama
      </button>

      <button
        className={`provider-btn ${provider === 'gemini' ? 'active' : ''}`}
        onClick={() => setProvider('gemini')}
        disabled={!isApiKeySet}
        title={!isApiKeySet ? 'Configure API key first' : undefined}
      >
        ✨ Gemini {!isApiKeySet && '(Not Configured)'}
      </button>
    </div>
  );
}
```

**Performance:** Gemini button re-renders only when API key is configured/removed, not on other state changes.

---

## Example 6: Advanced - Composite Selector for Dashboard

Uses composite selector for dashboard overview.

```typescript
import { useAppStore } from '../store/useAppStore';
import { selectSessionMetadata, selectApiConfigStatus } from '../store/selectors';

export function Dashboard() {
  // Single subscription combines multiple values
  const sessionMeta = useAppStore(selectSessionMetadata);
  const apiStatus = useAppStore(selectApiConfigStatus);

  return (
    <div className="dashboard">
      <div className="card sessions-overview">
        <h3>Sessions</h3>
        <p>Total: {sessionMeta.totalSessions}</p>
        <p>Current: {sessionMeta.currentSessionId || 'None'}</p>
        <p>Messages: {sessionMeta.messageCount}</p>
      </div>

      <div className="card api-overview">
        <h3>Configuration</h3>
        <p>
          Gemini: {apiStatus.hasGeminiKey ? '✅ Ready' : '❌ Not Set'}
        </p>
        <p>
          Ollama: {apiStatus.ollamaEndpoint ? '✅ Ready' : '❌ Not Set'}
        </p>
        <p>
          Status: {apiStatus.isConfigured ? '✅ Configured' : '❌ Incomplete'}
        </p>
      </div>
    </div>
  );
}
```

**Performance:** Dashboard only re-renders when any of these specific values change.

---

## Example 7: Initialization Hook - Check Configuration on Mount

Custom hook to check if app needs configuration.

```typescript
import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { selectIsApiKeySet } from '../store/selectors';

export function useCheckConfiguration() {
  const isApiKeySet = useAppStore(selectIsApiKeySet);

  useEffect(() => {
    if (!isApiKeySet) {
      console.warn('⚠️ Gemini API key not configured');
      // Show configuration modal or prompt
    }
  }, [isApiKeySet]);

  return isApiKeySet;
}

// In App component:
function App() {
  const isConfigured = useCheckConfiguration();

  return <>{isConfigured ? <ChatInterface /> : <ConfigurationWizard />}</>;
}
```

---

## Example 8: Message Count for Title/Notifications

Update browser title with message count.

```typescript
import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { selectMessageCount } from '../store/selectors';

export function useChatTitleUpdate() {
  const messageCount = useAppStore(selectMessageCount);

  useEffect(() => {
    if (messageCount > 0) {
      document.title = `Chat (${messageCount}) - GeminiGUI`;
    } else {
      document.title = 'GeminiGUI';
    }
  }, [messageCount]);
}

// In App component:
function App() {
  useChatTitleUpdate();
  return <ChatInterface />;
}
```

---

## Example 9: Feature Gate Based on Swarm Setting

Conditionally render UI features based on settings.

```typescript
import { useAppStore } from '../store/useAppStore';
import { selectUseSwarm } from '../store/selectors';

export function ChatTools() {
  const useSwarm = useAppStore(selectUseSwarm);

  return (
    <div className="chat-tools">
      <button>💬 Chat</button>

      {useSwarm && (
        <>
          <button>🐝 Agent Swarm</button>
          <button>🧠 Knowledge Graph</button>
          <button>📊 Swarm Analytics</button>
        </>
      )}
    </div>
  );
}
```

**Performance:** Swarm tools only render/update when swarm setting changes.

---

## Example 10: Custom Hook Pattern - useSessionMessages

Reusable hook for session message management.

```typescript
import { useAppStore } from '../store/useAppStore';
import { selectMessagesBySessionId, selectMessageCountBySessionId } from '../store/selectors';

interface UseSessionMessagesOptions {
  sessionId: string;
}

export function useSessionMessages({ sessionId }: UseSessionMessagesOptions) {
  const messages = useAppStore(selectMessagesBySessionId(sessionId));
  const messageCount = useAppStore(selectMessageCountBySessionId(sessionId));
  const addMessage = useAppStore((state) => state.addMessage);

  return {
    messages,
    messageCount,
    isEmpty: messageCount === 0,
    addMessage,
  };
}

// Usage in component:
function SessionViewer({ sessionId }: { sessionId: string }) {
  const { messages, messageCount, isEmpty } = useSessionMessages({
    sessionId,
  });

  return (
    <>
      <h3>Session Messages ({messageCount})</h3>
      {isEmpty ? (
        <p>No messages</p>
      ) : (
        <ul>
          {messages.map((msg, i) => (
            <li key={i}>{msg.content}</li>
          ))}
        </ul>
      )}
    </>
  );
}
```

---

## Best Practices Demonstrated

✅ **Single Responsibility** - Each selector returns one thing
✅ **Memoization** - Curried selectors prevent re-renders
✅ **Type Safety** - Full TypeScript support
✅ **Performance** - Granular subscriptions
✅ **Reusability** - Custom hooks encapsulate logic
✅ **Documentation** - Clear JSDoc comments
✅ **Testing** - Selectors are pure functions

---

## Quick Copy-Paste Templates

### Template 1: Settings Component
```typescript
import { useAppStore } from '../store/useAppStore';
import { selectUseSwarm, selectOllamaEndpoint } from '../store/selectors';

export function MySettings() {
  const useSwarm = useAppStore(selectUseSwarm);
  const endpoint = useAppStore(selectOllamaEndpoint);

  return (
    <div>
      {/* Use selectors here */}
    </div>
  );
}
```

### Template 2: List Item with Curried Selector
```typescript
import { useAppStore } from '../store/useAppStore';
import { selectSessionById } from '../store/selectors';

interface ItemProps {
  id: string;
}

function Item({ id }: ItemProps) {
  const item = useAppStore(selectSessionById(id));

  if (!item) return null;

  return <div>{/* Render item */}</div>;
}
```

### Template 3: Custom Hook
```typescript
import { useAppStore } from '../store/useAppStore';
import { selectMessageCount } from '../store/selectors';

export function useMessageInfo() {
  const count = useAppStore(selectMessageCount);
  return { count, hasMessages: count > 0 };
}
```

---

## Summary

These examples show how to:
1. Use primitive selectors for boolean/number values
2. Use curried selectors for per-item subscriptions
3. Build reusable custom hooks
4. Organize feature-related logic
5. Optimize performance with granular subscriptions
6. Maintain type safety across the application

Start using these patterns in your GeminiGUI components for optimal performance!
