# Skeleton Components - Integration Guide

Quick guide to integrate skeleton loading components into GeminiHydra GUI.

---

## 1. Using Skeletons in MessageList

### Before (Original MessageList)
```tsx
export const MessageList = memo<MessageListProps>(
  ({ messages, isStreaming, onExecuteCommand }) => {
    const virtuosoRef = useRef<VirtuosoHandle>(null);

    if (messages.length === 0) {
      return <EmptyState />;
    }

    return (
      <Virtuoso
        ref={virtuosoRef}
        totalCount={messages.length}
        // ... rest of props
      />
    );
  }
);
```

### After (With Skeleton Support)
```tsx
import { MessageStreamSkeleton } from './MessageSkeleton';

export const MessageList = memo<MessageListProps>(
  ({ messages, isStreaming, onExecuteCommand, isLoading }) => {
    const virtuosoRef = useRef<VirtuosoHandle>(null);

    // Show skeleton while loading
    if (isLoading) {
      return (
        <div className="h-full overflow-y-auto scrollbar-thin">
          <MessageStreamSkeleton variant="pulse" />
        </div>
      );
    }

    if (messages.length === 0) {
      return <EmptyState />;
    }

    return (
      <Virtuoso
        ref={virtuosoRef}
        totalCount={messages.length}
        // ... rest of props
      />
    );
  }
);
```

---

## 2. Update MessageListProps

### Before
```tsx
export interface MessageListProps {
  messages: Message[];
  isStreaming: boolean;
  onExecuteCommand: (cmd: string) => void;
}
```

### After
```tsx
export interface MessageListProps {
  messages: Message[];
  isStreaming: boolean;
  isLoading?: boolean; // New prop for skeleton state
  onExecuteCommand: (cmd: string) => void;
}
```

---

## 3. Using in ChatContainer

### Example with Data Fetching

```tsx
import { MessageStreamSkeleton } from './components/chat';

function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      const response = await fetch('/api/messages');
      const data = await response.json();
      setMessages(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <MessageList
      messages={messages}
      isStreaming={isStreaming}
      isLoading={isLoading}
      onExecuteCommand={handleExecute}
    />
  );
}
```

---

## 4. Using Skeleton Components Directly

### Chat Message Loading
```tsx
import { MessageSkeleton } from './components/chat';

function ChatBox() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="chat-messages">
      {isLoading ? (
        <MessageSkeleton isUser={false} count={3} variant="pulse" />
      ) : (
        <MessageList messages={messages} />
      )}
    </div>
  );
}
```

### Card Loading
```tsx
import { SkeletonCard } from './components/ui';

function DataPanel() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="grid grid-cols-2 gap-4">
      {isLoading ? (
        Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} lines={3} variant="shimmer" />
        ))
      ) : (
        <CardList cards={cards} />
      )}
    </div>
  );
}
```

### Text Content Loading
```tsx
import { SkeletonText } from './components/ui';

function DataSection() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section>
      {isLoading ? (
        <SkeletonText lines={4} variant="pulse" />
      ) : (
        <p>{content}</p>
      )}
    </section>
  );
}
```

---

## 5. Profile Section with Avatar

```tsx
import { SkeletonAvatar, SkeletonText } from './components/ui';

function ProfileHeader() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex gap-4">
      {isLoading ? (
        <>
          <SkeletonAvatar size={64} variant="pulse" />
          <SkeletonText lines={2} width="70%" variant="pulse" />
        </>
      ) : (
        <>
          <img src={avatar} alt="Profile" className="w-16 h-16 rounded-full" />
          <div>
            <h2>{name}</h2>
            <p>{bio}</p>
          </div>
        </>
      )}
    </div>
  );
}
```

---

## 6. Complete Page Example

```tsx
import { MessageStreamSkeleton } from './components/chat';
import { SkeletonCard, SkeletonText } from './components/ui';

function ChatPage() {
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Load messages
    fetchMessages().finally(() => setIsLoadingMessages(false));

    // Load metadata
    fetchMetadata().finally(() => setIsLoadingMetadata(false));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 h-screen">
      {/* Main chat area */}
      <div className="col-span-2 flex flex-col">
        <header className="p-4 border-b border-[var(--matrix-border)]">
          {isLoadingMetadata ? (
            <SkeletonText lines={1} width="50%" height="1.5em" />
          ) : (
            <h1>{sessionName}</h1>
          )}
        </header>

        <main className="flex-1 overflow-hidden">
          {isLoadingMessages ? (
            <MessageStreamSkeleton variant="pulse" />
          ) : (
            <MessageList messages={messages} />
          )}
        </main>
      </div>

      {/* Sidebar */}
      <aside className="p-4 border-l border-[var(--matrix-border)]">
        {isLoadingMetadata ? (
          <div className="space-y-4">
            <SkeletonCard lines={2} height="150px" />
            <SkeletonCard lines={3} height="200px" />
          </div>
        ) : (
          <MetadataPanel data={metadata} />
        )}
      </aside>
    </div>
  );
}
```

---

## 7. With TanStack Query (Recommended)

```tsx
import { useQuery } from '@tanstack/react-query';
import { MessageStreamSkeleton } from './components/chat';

function ChatWithQuery() {
  const { data: messages, isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: () => fetch('/api/messages').then(r => r.json()),
  });

  return (
    <div className="h-full">
      {isLoading ? (
        <MessageStreamSkeleton variant="shimmer" />
      ) : (
        <MessageList messages={messages || []} />
      )}
    </div>
  );
}
```

---

## 8. Animation Variants

### When to Use Pulse
```tsx
// Background/subtle loading
<SkeletonText variant="pulse" />

// Secondary content
<SkeletonCard variant="pulse" />
```

### When to Use Shimmer
```tsx
// Primary content - more engaging
<MessageStreamSkeleton variant="shimmer" />

// Important cards
<SkeletonCard variant="shimmer" />
```

---

## 9. Styling & Customization

### Custom Gap
```tsx
<SkeletonText lines={3} gap="1.5rem" />
```

### Custom Height
```tsx
<SkeletonText lines={2} height="2em" />
```

### Custom Styling
```tsx
<Skeleton
  width="100%"
  height="40px"
  className="rounded-full"
  style={{ animationDuration: '1.5s' }}
/>
```

---

## 10. Testing Integration

### Mocking Skeleton States
```tsx
import { render, screen } from '@testing-library/react';
import { MessageList } from './MessageList';

describe('MessageList with Skeletons', () => {
  it('should show skeleton while loading', () => {
    const { container } = render(
      <MessageList
        messages={[]}
        isLoading={true}
        isStreaming={false}
        onExecuteCommand={() => {}}
      />
    );

    expect(container.querySelector('.skeleton-pulse')).toBeInTheDocument();
  });

  it('should show messages when loaded', () => {
    const messages = [
      { id: '1', role: 'user' as const, content: 'Hello' },
    ];

    const { container } = render(
      <MessageList
        messages={messages}
        isLoading={false}
        isStreaming={false}
        onExecuteCommand={() => {}}
      />
    );

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(container.querySelector('.skeleton-pulse')).not.toBeInTheDocument();
  });
});
```

---

## Key Takeaways

1. **Import where needed**: `import { ... } from './components/ui'` or `'./components/chat'`
2. **Add loading state**: Track loading in component state or query hook
3. **Conditional rendering**: Show skeleton if loading, content otherwise
4. **Choose animation**: Use `pulse` for subtle, `shimmer` for prominent
5. **Theme automatic**: No theme config needed, uses CSS variables
6. **Performant**: Pure CSS, no overhead

---

## Files to Reference

- **Implementation**: `src/components/ui/Skeleton.tsx`
- **Chat Components**: `src/components/chat/MessageSkeleton.tsx`
- **Full Documentation**: `src/components/SKELETON_COMPONENTS.md`
- **Interactive Showcase**: `src/components/ui/Skeleton.example.tsx`
- **Unit Tests**: `src/components/ui/Skeleton.test.tsx`

---

## Next Steps

1. Choose where to add skeletons first (ChatContainer is a good start)
2. Add `isLoading` state tracking
3. Wrap content with conditional skeleton rendering
4. Test with both animation variants
5. Gather user feedback on preference

---

## Questions?

Refer to:
- `SKELETON_COMPONENTS.md` - Complete API documentation
- `Skeleton.example.tsx` - Visual examples
- Test files - Real implementation patterns
