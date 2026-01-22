# GeminiGUI - Import Examples Guide

## Quick Reference

### Option 1: Import from Root (Recommended for new code)
```typescript
import {
  ChatContainer,
  MessageList,
  Button,
  useAppStore,
  selectTheme,
  useAppTheme,
  LIMITS,
  isValidUrl,
  type Message,
  type Settings,
} from '@/index';
```

### Option 2: Import from Modules
```typescript
// Components
import { ChatContainer, MessageList, Button } from '@/components';
import type { ChatContainerProps } from '@/components';

// Store
import { useAppStore, selectTheme } from '@/store';

// Hooks
import { useAppTheme, useToast } from '@/hooks';

// Types
import type { Message, Settings, AppState } from '@/types';

// Constants
import { LIMITS, STATUS, KEYBOARD_SHORTCUTS } from '@/constants';

// Utils
import { isValidUrl, sanitizeContent } from '@/utils';
```

### Option 3: Sub-module Imports (for specific domains)
```typescript
// Chat sub-components
import { MessageList, ChatInput, ModelSelector } from '@/components/chat';

// UI components
import { Button, Skeleton, Toast } from '@/components/ui';

// Detailed store
import {
  useAppStore,
  selectTheme,
  selectSettings,
  selectCurrentSession,
  selectMessagesBySessionId,
} from '@/store';
```

## Common Patterns

### Working with Components
```typescript
import { ChatContainer, SessionSidebar, RightSidebar, StatusFooter } from '@/components';

function App() {
  return (
    <div className="app">
      <SessionSidebar />
      <ChatContainer />
      <RightSidebar />
      <StatusFooter />
    </div>
  );
}
```

### Working with the Store
```typescript
import { useAppStore, selectTheme, selectSettings, selectIsApiKeySet } from '@/store';

function Settings() {
  const theme = useAppStore(selectTheme);
  const settings = useAppStore(selectSettings);
  const hasApiKey = useAppStore(selectIsApiKeySet);
  
  return <div>Theme: {theme}</div>;
}
```

### Working with Types
```typescript
import type { Message, Session, AppState } from '@/types';
import { useAppStore } from '@/store';

function MessageHandler() {
  const messages: Message[] = [];
  const session: Session = { id: 'abc', title: 'Chat', createdAt: Date.now() };
  
  return <div>{messages.length} messages in {session.title}</div>;
}
```

### Working with Utilities
```typescript
import { isValidUrl, sanitizeContent, isValidApiKey } from '@/utils';

function validateUserInput(url: string, content: string, apiKey: string) {
  if (!isValidUrl(url)) throw new Error('Invalid URL');
  if (!isValidApiKey(apiKey)) throw new Error('Invalid API key');
  
  const safe = sanitizeContent(content);
  return safe;
}
```

### Working with Constants
```typescript
import { LIMITS, STATUS, KEYBOARD_SHORTCUTS, AGENTS } from '@/constants';

function CheckLimits() {
  if (messages.length > LIMITS.MAX_MESSAGES_PER_SESSION) {
    console.log(STATUS.STREAMING);
  }
  
  console.log('Max sessions:', LIMITS.MAX_SESSIONS);
  console.log('Agent config:', AGENTS.GERALT);
}
```

## Import Organization

### Best Practice: Group by Module Type
```typescript
// External libraries
import React from 'react';
import { create } from 'zustand';

// Components
import { ChatContainer, Button } from '@/components';
import { MessageList } from '@/components/chat';

// Store & Hooks
import { useAppStore, selectTheme } from '@/store';
import { useAppTheme } from '@/hooks';

// Types
import type { Message, Settings } from '@/types';

// Constants & Utils
import { LIMITS } from '@/constants';
import { isValidUrl } from '@/utils';
```

## Using Default vs Named Exports

All components support both patterns:

```typescript
// Named exports (preferred)
import { ChatContainer } from '@/components';

// Default exports (also available)
import ChatContainerDefault from '@/components/ChatContainer';

// You can mix and match
import { ChatContainer as Chat } from '@/components';
import { MessageList } from '@/components/chat';
```

## Barrel Import Benefits

### Before:
```typescript
// Scattered deep imports - hard to find what's available
import { ChatContainer } from '@/components/ChatContainer';
import { MessageList } from '@/components/chat/MessageList';
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/store/useAppStore';
```

### After:
```typescript
// Clear, organized, easy to discover
import { ChatContainer, MessageList, Button } from '@/components';
import { useAppStore } from '@/store';
```

## IDE Autocompletion Tips

When using barrel exports, your IDE will show:

1. All available exports at the top level
2. Organized by category
3. Complete type information
4. JSDoc comments for each export

Example with VS Code:
```
Type: import { 
       - ChatContainer
       - SessionSidebar
       - Button
       - Skeleton
       - useAppStore
       ... (30+ more)
```

## Type-Only Imports

Always use type-only imports for types to improve tree-shaking:

```typescript
// Good - no runtime cost for types
import type { Message, Settings, ChatContainerProps } from '@/components';
import type { AppState } from '@/store';

// Still works, but includes type definitions at runtime (unnecessary)
import { Message, Settings } from '@/components';
```

## Migration Path

If you have existing code with deep imports, gradually migrate:

1. New files: Use barrel imports from the start
2. Existing files: Update imports during refactoring
3. Large refactors: Update entire module groups at once
4. Dependencies: Check that no circular dependencies are introduced

## Common Issues & Solutions

### Issue: Can't find a component in barrel export
**Solution:** Check if it's in a sub-module barrel export first
```typescript
// Not in /components/index.ts? Try:
import { MessageList } from '@/components/chat';
```

### Issue: Type not exported
**Solution:** Import from both components and types modules
```typescript
import { ChatContainer } from '@/components';
import type { ChatContainerProps } from '@/types';
// Or if props are defined in component file:
import type { ChatContainerProps } from '@/components';
```

### Issue: Circular dependency warning
**Solution:** Import from sub-modules instead of barrel exports
```typescript
// If getting circular import warning, try:
import { selectTheme } from '@/store/selectors';
// Instead of:
// import { selectTheme } from '@/store';
```

## File Structure Summary

```
src/
├── index.ts                    ← Main barrel (import everything from here)
├── components/
│   ├── index.ts               ← Component barrel
│   ├── ChatContainer.tsx
│   ├── ...
│   ├── chat/
│   │   ├── index.ts          ← Chat sub-barrel
│   │   ├── MessageList.tsx
│   │   └── ...
│   └── ui/
│       ├── index.ts          ← UI sub-barrel
│       ├── Button.tsx
│       └── ...
├── hooks/index.ts            ← Hooks barrel (already complete)
├── services/index.ts         ← Services barrel (already complete)
├── store/
│   ├── index.ts              ← Store barrel (new)
│   ├── useAppStore.ts
│   └── selectors.ts
├── types/index.ts            ← Types barrel (already complete)
├── constants/index.ts        ← Constants barrel (already complete)
└── utils/index.ts            ← Utils barrel (new)
```
