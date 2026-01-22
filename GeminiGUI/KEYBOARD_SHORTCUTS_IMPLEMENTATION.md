# Keyboard Shortcuts Implementation - GeminiHydra GUI

## Overview

A complete keyboard shortcuts system has been implemented for GeminiHydra GUI with two custom React hooks and centralized constants.

## Implementation Summary

### Files Created

#### 1. `src/hooks/useHotkey.ts` (127 lines)
Single keyboard hotkey listener hook with the following features:

- **Function**: `useHotkey(hotkey, callback, options?)`
- **Parameters**:
  - `hotkey`: string - Keyboard combination (e.g., 'ctrl+enter', 'escape')
  - `callback`: () => void - Function to execute
  - `options`: {
      - `preventDefault`: boolean (default: true)
      - `stopPropagation`: boolean (default: false)
      - `enabled`: boolean (default: true)
    }

- **Exported Utilities**:
  - `isHotkeyPressed(event: KeyboardEvent, hotkey: string): boolean` - Check if event matches hotkey

- **Supported Hotkey Formats**:
  - `'ctrl+s'`, `'ctrl+shift+s'`
  - `'cmd+k'` (Mac), `'meta+n'` (Windows key)
  - `'alt+f'`, `'shift+tab'`
  - Single keys: `'enter'`, `'escape'`, `'space'`
  - Special keys: `'arrowup'`, `'arrowdown'`, `'delete'`, `'backspace'`, etc.

**Use Case**: Register a single hotkey or simple keyboard shortcut.

#### 2. `src/hooks/useKeyboardShortcuts.ts` (94 lines)
Multiple hotkeys manager hook with dynamic registration/deregistration:

- **Function**: `useKeyboardShortcuts(shortcuts, options?)`
- **Parameters**:
  - `shortcuts`: Record<string, () => void> - Multiple hotkey → callback mappings
  - `options`: Same as useHotkey

- **Returns**:
  ```typescript
  {
    registerShortcut: (hotkey: string, callback: () => void) => void;
    unregisterShortcut: (hotkey: string) => void;
  }
  ```

- **Features**:
  - Register multiple shortcuts at once
  - Dynamically add/remove shortcuts at runtime
  - First matching shortcut executes (no conflicts)
  - Automatic cleanup on unmount

**Use Case**: Global or component-level shortcuts that need dynamic management.

#### 3. `src/constants/index.ts` (Updated)
Added keyboard shortcuts constants section:

```typescript
export const KEYBOARD_SHORTCUTS = {
  SUBMIT_MESSAGE: 'ctrl+enter',
  NEW_SESSION: 'ctrl+n',
  OPEN_SETTINGS: 'ctrl+comma',
  CLEAR_CHAT: 'ctrl+l',
  EXPORT_CHAT: 'ctrl+e',
  CLOSE_MODAL: 'escape',
  TOGGLE_SIDEBAR: 'ctrl+b',
  FOCUS_INPUT: 'ctrl+shift+i',
  SEARCH_SESSIONS: 'ctrl+f',
  UNDO: 'ctrl+z',
  REDO: 'ctrl+shift+z',
};

export const KEYBOARD_SHORTCUTS_LABELS = {
  [KEYBOARD_SHORTCUTS.SUBMIT_MESSAGE]: 'Send message',
  [KEYBOARD_SHORTCUTS.NEW_SESSION]: 'New session',
  [KEYBOARD_SHORTCUTS.OPEN_SETTINGS]: 'Open settings',
  [KEYBOARD_SHORTCUTS.CLEAR_CHAT]: 'Clear chat',
  [KEYBOARD_SHORTCUTS.EXPORT_CHAT]: 'Export chat',
  [KEYBOARD_SHORTCUTS.CLOSE_MODAL]: 'Close modal',
  [KEYBOARD_SHORTCUTS.TOGGLE_SIDEBAR]: 'Toggle sidebar',
  [KEYBOARD_SHORTCUTS.FOCUS_INPUT]: 'Focus input',
  [KEYBOARD_SHORTCUTS.SEARCH_SESSIONS]: 'Search sessions',
  [KEYBOARD_SHORTCUTS.UNDO]: 'Undo',
  [KEYBOARD_SHORTCUTS.REDO]: 'Redo',
};
```

#### 4. `src/hooks/index.ts` (Updated)
Added exports for new hooks:

```typescript
export { useHotkey, isHotkeyPressed, default as useHotkeyDefault } from './useHotkey';
export { useKeyboardShortcuts, default as useKeyboardShortcutsDefault } from './useKeyboardShortcuts';
```

#### 5. `src/hooks/KEYBOARD_SHORTCUTS_USAGE.md` (400 lines)
Comprehensive usage guide with:
- Detailed examples for each hook
- Real-world implementation patterns
- Constants usage examples
- Best practices and troubleshooting
- Type definitions
- Dynamic registration examples

## Quick Start

### 1. Single Hotkey

```tsx
import { useHotkey } from '@/hooks';
import { KEYBOARD_SHORTCUTS } from '@/constants';

function MyComponent() {
  useHotkey(KEYBOARD_SHORTCUTS.SUBMIT_MESSAGE, () => {
    submitMessage();
  });

  return <div>Press Ctrl+Enter to submit</div>;
}
```

### 2. Multiple Hotkeys

```tsx
import { useKeyboardShortcuts } from '@/hooks';
import { KEYBOARD_SHORTCUTS } from '@/constants';

function App() {
  const { registerShortcut } = useKeyboardShortcuts({
    [KEYBOARD_SHORTCUTS.NEW_SESSION]: createSession,
    [KEYBOARD_SHORTCUTS.OPEN_SETTINGS]: openSettings,
    [KEYBOARD_SHORTCUTS.CLOSE_MODAL]: closeModal,
  });

  return <main>{/* App content */}</main>;
}
```

### 3. Dynamic Registration

```tsx
import { useKeyboardShortcuts } from '@/hooks';

function AdvancedComponent() {
  const { registerShortcut, unregisterShortcut } = useKeyboardShortcuts({});

  const enableUndo = () => {
    registerShortcut('ctrl+z', handleUndo);
  };

  const disableUndo = () => {
    unregisterShortcut('ctrl+z');
  };

  return (
    <div>
      <button onClick={enableUndo}>Enable Undo</button>
      <button onClick={disableUndo}>Disable Undo</button>
    </div>
  );
}
```

## Available Shortcuts

| Constant | Hotkey | Description |
|----------|--------|-------------|
| `SUBMIT_MESSAGE` | Ctrl+Enter | Send message |
| `NEW_SESSION` | Ctrl+N | New session |
| `OPEN_SETTINGS` | Ctrl+, | Open settings |
| `CLEAR_CHAT` | Ctrl+L | Clear chat |
| `EXPORT_CHAT` | Ctrl+E | Export chat |
| `CLOSE_MODAL` | Escape | Close modal |
| `TOGGLE_SIDEBAR` | Ctrl+B | Toggle sidebar |
| `FOCUS_INPUT` | Ctrl+Shift+I | Focus input |
| `SEARCH_SESSIONS` | Ctrl+F | Search sessions |
| `UNDO` | Ctrl+Z | Undo |
| `REDO` | Ctrl+Shift+Z | Redo |

## Integration Points

### Recommended Components to Integrate

1. **ChatInput.tsx**
   - `SUBMIT_MESSAGE`: Submit message
   - `FOCUS_INPUT`: Focus input field
   - `CLEAR_CHAT`: Clear conversation

2. **SessionSidebar.tsx**
   - `NEW_SESSION`: Create new session
   - `SEARCH_SESSIONS`: Search/filter sessions
   - `CLOSE_MODAL`: Close any modals

3. **SettingsModal.tsx**
   - `OPEN_SETTINGS`: Open modal
   - `CLOSE_MODAL`: Close modal

4. **App.tsx** (Global)
   - `OPEN_SETTINGS`: Global settings
   - `TOGGLE_SIDEBAR`: Toggle sidebar visibility
   - `UNDO`/`REDO`: Global undo/redo

## Key Features

### Automatic Cleanup
- Event listeners removed on unmount
- No memory leaks
- Safe for conditional rendering

### Accessibility
- Respects browser defaults for some keys
- Configurable preventDefault behavior
- Supports modifier combinations

### Performance
- Debounced event handling
- Early exit on non-matching keys
- Efficient modifier key checking

### Developer Experience
- TypeScript fully typed
- Clear error messages
- Comprehensive documentation
- Easy to extend with new shortcuts

## Best Practices

1. **Always use constants** over string literals
   ```tsx
   // GOOD
   useHotkey(KEYBOARD_SHORTCUTS.SUBMIT_MESSAGE, callback);
   
   // AVOID
   useHotkey('ctrl+enter', callback);
   ```

2. **Disable contextually** to prevent conflicts
   ```tsx
   // Disable shortcuts when modal is open
   useKeyboardShortcuts(shortcuts, { enabled: !isModalOpen });
   ```

3. **Prevent default only when needed**
   ```tsx
   // Needed for browser shortcuts
   useHotkey('ctrl+s', save, { preventDefault: true });
   ```

4. **Use multiple shortcuts hook** for efficiency
   ```tsx
   // GOOD - single hook
   useKeyboardShortcuts({ 'ctrl+s': save, 'ctrl+z': undo });
   
   // AVOID - multiple hooks
   useHotkey('ctrl+s', save);
   useHotkey('ctrl+z', undo);
   ```

5. **Handle cleanup** for dynamic shortcuts
   ```tsx
   useEffect(() => {
     registerShortcut('ctrl+s', save);
     return () => unregisterShortcut('ctrl+s');
   }, []);
   ```

## Adding New Shortcuts

To add a new global shortcut:

1. Add constant to `KEYBOARD_SHORTCUTS` in `src/constants/index.ts`
2. Add display label to `KEYBOARD_SHORTCUTS_LABELS`
3. Use in components via hooks
4. Document in component/documentation

Example:
```typescript
// src/constants/index.ts
export const KEYBOARD_SHORTCUTS = {
  // ... existing
  SCREENSHOT: 'ctrl+shift+p',
};

export const KEYBOARD_SHORTCUTS_LABELS = {
  // ... existing
  [KEYBOARD_SHORTCUTS.SCREENSHOT]: 'Take screenshot',
};
```

Then use:
```tsx
import { KEYBOARD_SHORTCUTS } from '@/constants';
useHotkey(KEYBOARD_SHORTCUTS.SCREENSHOT, takeScreenshot);
```

## Testing

### Unit Test Example

```typescript
import { renderHook, act } from '@testing-library/react';
import { useHotkey } from '@/hooks';

describe('useHotkey', () => {
  it('should execute callback on hotkey press', () => {
    const callback = vi.fn();
    renderHook(() => useHotkey('ctrl+enter', callback));

    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
      ctrlKey: true,
    });

    act(() => {
      window.dispatchEvent(event);
    });

    expect(callback).toHaveBeenCalled();
  });
});
```

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (touch devices use soft keyboards)
- Keyboard event listeners work across all modern browsers

## Performance Notes

- Minimal overhead per hook
- Event delegation at window level
- No polling or intervals
- Automatic cleanup prevents memory leaks

## Troubleshooting

### Shortcut Not Working?

1. Verify hook is enabled: `{ enabled: true }`
2. Check hotkey string format (lowercase, plus-separated)
3. Check for event listener conflicts
4. Use browser DevTools Network tab to debug

### Shortcuts Disabled in Modal?

```tsx
// Explicitly enable for modal
useHotkey(shortcut, callback, { enabled: isModalOpen });
```

### Conflicting Shortcuts?

First matching shortcut executes. Ensure no duplicates in `useKeyboardShortcuts`.

## File Summary

```
src/
├── hooks/
│   ├── useHotkey.ts                         (NEW) - 127 lines
│   ├── useKeyboardShortcuts.ts              (NEW) - 94 lines
│   ├── KEYBOARD_SHORTCUTS_USAGE.md          (NEW) - 400 lines
│   └── index.ts                             (UPDATED) - Added exports
├── constants/
│   └── index.ts                             (UPDATED) - Added KEYBOARD_SHORTCUTS
└── [other files...]

KEYBOARD_SHORTCUTS_IMPLEMENTATION.md         (THIS FILE) - Overview & guide
```

## Next Steps

1. **Integrate hooks into components** (ChatInput, SessionSidebar, SettingsModal, App)
2. **Add help/documentation** showing available shortcuts to users
3. **Create keyboard shortcuts help modal** (Ctrl+?)
4. **Write unit tests** for hook behavior
5. **Add analytics** to track which shortcuts are used

## Support

For detailed usage examples, see `src/hooks/KEYBOARD_SHORTCUTS_USAGE.md`

For implementation questions or issues, refer to:
- Hook source code with inline documentation
- TypeScript types for IDE autocomplete
- Usage guide examples
