# Keyboard Shortcuts Hooks - Usage Guide

This guide demonstrates how to use the keyboard shortcuts hooks in GeminiGUI.

## Available Hooks

### 1. `useHotkey` - Single Hotkey Hook

Registers a single keyboard shortcut. Best for handling one specific hotkey.

#### Basic Usage

```tsx
import { useHotkey } from '@/hooks';

function MyComponent() {
  useHotkey('ctrl+s', () => {
    console.log('Save pressed!');
  });

  return <div>Press Ctrl+S to save</div>;
}
```

#### With Options

```tsx
useHotkey(
  'ctrl+enter',
  () => submitMessage(),
  {
    preventDefault: true,      // Prevent browser default behavior
    stopPropagation: true,     // Stop event bubbling
    enabled: isActive,         // Conditionally enable/disable
  }
);
```

#### Supported Hotkey Formats

- `'ctrl+s'` - Ctrl + S
- `'ctrl+shift+s'` - Ctrl + Shift + S
- `'cmd+k'` - Cmd/Meta + K (macOS)
- `'meta+n'` - Meta/Windows key + N
- `'alt+f'` - Alt + F
- `'shift+tab'` - Shift + Tab
- `'enter'` - Single key
- `'escape'` - Single key

#### Special Key Names

Supported special keys:
- `enter`, `escape`, `tab`, `delete`, `backspace`
- `arrowup`, `arrowdown`, `arrowleft`, `arrowright`
- `space`

### 2. `useKeyboardShortcuts` - Multiple Hotkeys Hook

Manages multiple keyboard shortcuts at once. Returns methods to dynamically add/remove shortcuts.

#### Basic Usage

```tsx
import { useKeyboardShortcuts } from '@/hooks';

function ChatInput() {
  const { registerShortcut, unregisterShortcut } = useKeyboardShortcuts({
    'ctrl+enter': () => submitMessage(),
    'ctrl+n': () => newSession(),
    'escape': () => closeModal(),
    'ctrl+l': () => clearChat(),
  });

  return <input placeholder="Type a message..." />;
}
```

#### Dynamic Shortcut Registration

```tsx
import { useKeyboardShortcuts } from '@/hooks';

function AdvancedComponent() {
  const { registerShortcut, unregisterShortcut } = useKeyboardShortcuts({});

  // Register a shortcut dynamically
  const addUndoShortcut = () => {
    registerShortcut('ctrl+z', () => {
      console.log('Undo!');
    });
  };

  // Unregister a shortcut
  const removeUndoShortcut = () => {
    unregisterShortcut('ctrl+z');
  };

  return (
    <div>
      <button onClick={addUndoShortcut}>Enable Undo</button>
      <button onClick={removeUndoShortcut}>Disable Undo</button>
    </div>
  );
}
```

#### With Options

```tsx
const { registerShortcut } = useKeyboardShortcuts(
  {
    'ctrl+enter': () => submitMessage(),
    'tab': () => autocomplete(),
  },
  {
    preventDefault: true,
    stopPropagation: true,
    enabled: !isModalOpen,  // Disable shortcuts when modal is open
  }
);
```

### 3. `isHotkeyPressed` - Utility Function

Manually check if a keyboard event matches a hotkey pattern.

```tsx
import { isHotkeyPressed } from '@/hooks';

function CustomKeyHandler(event: KeyboardEvent) {
  if (isHotkeyPressed(event, 'ctrl+s')) {
    console.log('Save!');
  }
}

window.addEventListener('keydown', CustomKeyHandler);
```

## Constants - `KEYBOARD_SHORTCUTS`

Pre-defined shortcuts available in `src/constants/index.ts`:

```tsx
import { KEYBOARD_SHORTCUTS, KEYBOARD_SHORTCUTS_LABELS } from '@/constants';

// Available shortcuts
KEYBOARD_SHORTCUTS.SUBMIT_MESSAGE    // 'ctrl+enter'
KEYBOARD_SHORTCUTS.NEW_SESSION       // 'ctrl+n'
KEYBOARD_SHORTCUTS.OPEN_SETTINGS     // 'ctrl+comma'
KEYBOARD_SHORTCUTS.CLEAR_CHAT        // 'ctrl+l'
KEYBOARD_SHORTCUTS.EXPORT_CHAT       // 'ctrl+e'
KEYBOARD_SHORTCUTS.CLOSE_MODAL       // 'escape'
KEYBOARD_SHORTCUTS.TOGGLE_SIDEBAR    // 'ctrl+b'
KEYBOARD_SHORTCUTS.FOCUS_INPUT       // 'ctrl+shift+i'
KEYBOARD_SHORTCUTS.SEARCH_SESSIONS   // 'ctrl+f'
KEYBOARD_SHORTCUTS.UNDO              // 'ctrl+z'
KEYBOARD_SHORTCUTS.REDO              // 'ctrl+shift+z'

// Labels for UI display
const label = KEYBOARD_SHORTCUTS_LABELS['ctrl+enter']; // 'Send message'
```

## Real-World Examples

### Example 1: Chat Input with Shortcuts

```tsx
import { useKeyboardShortcuts } from '@/hooks';
import { KEYBOARD_SHORTCUTS } from '@/constants';

function ChatInput() {
  const [message, setMessage] = useState('');

  const { registerShortcut } = useKeyboardShortcuts({
    [KEYBOARD_SHORTCUTS.SUBMIT_MESSAGE]: () => {
      if (message.trim()) {
        submitMessage(message);
        setMessage('');
      }
    },
    [KEYBOARD_SHORTCUTS.FOCUS_INPUT]: () => {
      inputRef.current?.focus();
    },
  });

  return (
    <input
      ref={inputRef}
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Type your message..."
    />
  );
}
```

### Example 2: Modal with Escape to Close

```tsx
import { useHotkey } from '@/hooks';
import { KEYBOARD_SHORTCUTS } from '@/constants';

function SettingsModal({ isOpen, onClose }) {
  useHotkey(
    KEYBOARD_SHORTCUTS.CLOSE_MODAL,
    onClose,
    { enabled: isOpen }
  );

  return isOpen && (
    <div className="modal">
      {/* Modal content */}
    </div>
  );
}
```

### Example 3: Global App Shortcuts

```tsx
import { useKeyboardShortcuts } from '@/hooks';
import { KEYBOARD_SHORTCUTS } from '@/constants';

function App() {
  const { registerShortcut } = useKeyboardShortcuts({
    [KEYBOARD_SHORTCUTS.NEW_SESSION]: createNewSession,
    [KEYBOARD_SHORTCUTS.OPEN_SETTINGS]: openSettings,
    [KEYBOARD_SHORTCUTS.SEARCH_SESSIONS]: openSearch,
  });

  return (
    <main>
      {/* App content */}
    </main>
  );
}
```

### Example 4: Conditional Shortcuts

```tsx
import { useKeyboardShortcuts } from '@/hooks';

function Editor() {
  const [isEditing, setIsEditing] = useState(false);

  const { registerShortcut } = useKeyboardShortcuts(
    {
      'ctrl+s': saveFile,
      'ctrl+z': undo,
      'ctrl+shift+z': redo,
    },
    { enabled: isEditing }  // Only active when editing
  );

  return <div>{/* Editor UI */}</div>;
}
```

## Best Practices

### 1. Use Constants Over Strings

```tsx
// GOOD
import { KEYBOARD_SHORTCUTS } from '@/constants';
useHotkey(KEYBOARD_SHORTCUTS.SUBMIT_MESSAGE, handleSubmit);

// AVOID
useHotkey('ctrl+enter', handleSubmit);
```

### 2. Enable/Disable Contextually

```tsx
// Good - disable shortcuts in modal
useKeyboardShortcuts(shortcuts, { enabled: !isModalOpen });

// Good - disable during loading
useHotkey(shortcut, callback, { enabled: !isLoading });
```

### 3. Prevent Default Only When Needed

```tsx
// Needed for Ctrl+S (browser save)
useHotkey('ctrl+s', handleSave, { preventDefault: true });

// Not needed for custom shortcuts
useHotkey('ctrl+shift+custom', handleCustom, { preventDefault: false });
```

### 4. Use Single Hook for Multiple Shortcuts

```tsx
// GOOD - use useKeyboardShortcuts for multiple
const { registerShortcut } = useKeyboardShortcuts({
  'ctrl+s': save,
  'ctrl+z': undo,
  'escape': close,
});

// AVOID - multiple useHotkey calls
useHotkey('ctrl+s', save);
useHotkey('ctrl+z', undo);
useHotkey('escape', close);
```

### 5. Cleanup Dynamic Shortcuts

```tsx
function Component() {
  const { registerShortcut, unregisterShortcut } = useKeyboardShortcuts({});

  useEffect(() => {
    // Register on mount
    registerShortcut('ctrl+s', handleSave);

    // Cleanup on unmount
    return () => {
      unregisterShortcut('ctrl+s');
    };
  }, []);
}
```

## Troubleshooting

### Shortcut Not Working

1. Check if the hook is enabled: `{ enabled: true }`
2. Verify hotkey string format (lowercase, correct modifiers)
3. Check if another event listener is preventing it
4. Use browser DevTools to check `event.ctrlKey`, `event.key`, etc.

### Shortcuts Not Firing in Modal

```tsx
// Make sure modal shortcuts have `enabled` option
useHotkey('escape', onClose, { enabled: isModalOpen });
```

### Conflicting Shortcuts

The first matching shortcut will execute. Order matters in `useKeyboardShortcuts`:

```tsx
// Register more specific shortcuts first
useKeyboardShortcuts({
  'ctrl+shift+s': saveAs,    // More specific
  'ctrl+s': save,             // Less specific
});
```

## Type Definitions

```typescript
interface UseHotkeyOptions {
  preventDefault?: boolean;      // Default: true
  stopPropagation?: boolean;     // Default: false
  enabled?: boolean;             // Default: true
}

interface UseKeyboardShortcutsOptions {
  preventDefault?: boolean;
  stopPropagation?: boolean;
  enabled?: boolean;
}

// Hook returns (useKeyboardShortcuts)
{
  registerShortcut: (hotkey: string, callback: () => void) => void;
  unregisterShortcut: (hotkey: string) => void;
}

// Utility function
isHotkeyPressed(event: KeyboardEvent, hotkey: string): boolean;
```

## Adding New Shortcuts

To add a new global shortcut:

1. Add constant to `KEYBOARD_SHORTCUTS` in `src/constants/index.ts`
2. Add label to `KEYBOARD_SHORTCUTS_LABELS`
3. Use in components via `useHotkey` or `useKeyboardShortcuts`

Example:
```typescript
export const KEYBOARD_SHORTCUTS = {
  // ... existing
  MY_CUSTOM_ACTION: 'ctrl+shift+x',
} as const;

export const KEYBOARD_SHORTCUTS_LABELS = {
  // ... existing
  [KEYBOARD_SHORTCUTS.MY_CUSTOM_ACTION]: 'My Custom Action',
} as const;
```
