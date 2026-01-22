# Keyboard Shortcuts - Quick Reference Card

## Available Shortcuts

```
Ctrl+Enter      Send message
Ctrl+N          New session
Ctrl+,          Open settings
Ctrl+L          Clear chat
Ctrl+E          Export chat
Escape          Close modal
Ctrl+B          Toggle sidebar
Ctrl+Shift+I    Focus input
Ctrl+F          Search sessions
Ctrl+Z          Undo
Ctrl+Shift+Z    Redo
```

## One-Minute Setup

### Single Shortcut (useHotkey)

```tsx
import { useHotkey } from '@/hooks';
import { KEYBOARD_SHORTCUTS } from '@/constants';

useHotkey(KEYBOARD_SHORTCUTS.SUBMIT_MESSAGE, () => {
  submitMessage();
});
```

### Multiple Shortcuts (useKeyboardShortcuts)

```tsx
import { useKeyboardShortcuts } from '@/hooks';
import { KEYBOARD_SHORTCUTS } from '@/constants';

const { registerShortcut } = useKeyboardShortcuts({
  [KEYBOARD_SHORTCUTS.NEW_SESSION]: createSession,
  [KEYBOARD_SHORTCUTS.OPEN_SETTINGS]: openSettings,
  [KEYBOARD_SHORTCUTS.CLOSE_MODAL]: closeModal,
});
```

## Hotkey Format Reference

```
'ctrl+enter'              Ctrl + Enter
'ctrl+shift+s'            Ctrl + Shift + S
'meta+n'                  Meta/Windows + N
'alt+f'                   Alt + F
'escape'                  Escape key
'arrowup'                 Up arrow
'space'                   Spacebar
```

## Hook API Summary

### useHotkey(hotkey, callback, options?)

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `hotkey` | string | - | Keyboard combination (e.g., 'ctrl+enter') |
| `callback` | () => void | - | Function to execute |
| `options.preventDefault` | boolean | true | Prevent browser default |
| `options.stopPropagation` | boolean | false | Stop event bubbling |
| `options.enabled` | boolean | true | Enable/disable hook |

### useKeyboardShortcuts(shortcuts, options?)

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `shortcuts` | Record<string, () => void> | {} | Hotkey → callback map |
| `options` | UseKeyboardShortcutsOptions | - | Same as useHotkey |

**Returns:**
```typescript
{
  registerShortcut: (hotkey: string, callback: () => void) => void;
  unregisterShortcut: (hotkey: string) => void;
}
```

## Common Patterns

### Pattern 1: Basic Modal Shortcut

```tsx
useHotkey(KEYBOARD_SHORTCUTS.CLOSE_MODAL, onClose, {
  enabled: isModalOpen
});
```

### Pattern 2: Global App Shortcuts

```tsx
useKeyboardShortcuts({
  [KEYBOARD_SHORTCUTS.NEW_SESSION]: createSession,
  [KEYBOARD_SHORTCUTS.OPEN_SETTINGS]: openSettings,
});
```

### Pattern 3: Dynamic Registration

```tsx
const { registerShortcut, unregisterShortcut } = useKeyboardShortcuts({});

// Later...
registerShortcut('ctrl+z', handleUndo);
unregisterShortcut('ctrl+z');
```

### Pattern 4: Context-Aware Shortcuts

```tsx
useKeyboardShortcuts(
  isEditing ? editingShortcuts : viewingShortcuts,
  { enabled: !isModalOpen }
);
```

## Constants Reference

```typescript
import { KEYBOARD_SHORTCUTS, KEYBOARD_SHORTCUTS_LABELS } from '@/constants';

// Use constants instead of strings
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

// Get human-readable labels
KEYBOARD_SHORTCUTS_LABELS['ctrl+enter'] // 'Send message'
```

## Utility Functions

### isHotkeyPressed(event, hotkey)

Check if a keyboard event matches a hotkey:

```tsx
import { isHotkeyPressed } from '@/hooks';

const handleKeyDown = (event: KeyboardEvent) => {
  if (isHotkeyPressed(event, 'ctrl+s')) {
    saveFile();
  }
};
```

## File Locations

```
src/
├── hooks/
│   ├── useHotkey.ts                   (126 lines)
│   ├── useKeyboardShortcuts.ts        (94 lines)
│   ├── KEYBOARD_SHORTCUTS_USAGE.md    (399 lines - detailed guide)
│   └── index.ts                       (exports)
├── constants/
│   └── index.ts                       (KEYBOARD_SHORTCUTS & LABELS)

Root/
├── KEYBOARD_SHORTCUTS_IMPLEMENTATION.md  (full documentation)
├── KEYBOARD_SHORTCUTS_EXAMPLES.tsx       (10+ examples)
└── KEYBOARD_SHORTCUTS_QUICK_REFERENCE.md (this file)
```

## Integration Checklist

- [ ] Import hooks in component
- [ ] Import constants
- [ ] Add useHotkey or useKeyboardShortcuts call
- [ ] Pass hotkey and callback
- [ ] Set enabled flag if conditional
- [ ] Test with keyboard input

## Example Component

```tsx
import { useHotkey, useKeyboardShortcuts } from '@/hooks';
import { KEYBOARD_SHORTCUTS } from '@/constants';

function ChatComponent() {
  // Multiple shortcuts
  const { registerShortcut } = useKeyboardShortcuts({
    [KEYBOARD_SHORTCUTS.SUBMIT_MESSAGE]: submitMessage,
    [KEYBOARD_SHORTCUTS.CLEAR_CHAT]: clearChat,
  });

  // Single shortcut
  useHotkey(KEYBOARD_SHORTCUTS.FOCUS_INPUT, () => {
    inputRef.current?.focus();
  });

  return <div>Chat Interface</div>;
}
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Shortcut not working | Check `enabled` is true, verify hotkey format |
| Works in one component but not another | Ensure `enabled` flag allows it in context |
| Browser intercepting shortcut | Set `preventDefault: true` |
| Multiple shortcuts conflicting | First match executes, check for duplicates |
| Memory leak warnings | Hook auto-cleans on unmount, should be fine |

## Best Practices

1. **Always use KEYBOARD_SHORTCUTS constants** - Avoids typos
2. **Set enabled conditionally** - Prevent conflicts
3. **Use preventDefault for browser shortcuts** - Like Ctrl+S
4. **Disable in modals** - Avoid unexpected behavior
5. **Clean up dynamic shortcuts** - Explicit unregister

## Performance

- ✓ No memory leaks (auto cleanup on unmount)
- ✓ Efficient modifier key checking
- ✓ Event delegation at window level
- ✓ Early exit on non-matching keys
- ✓ Minimal re-render impact

## Browser Support

✓ Chrome/Edge 88+
✓ Firefox 87+
✓ Safari 14+
✓ Mobile browsers (with soft keyboard)

## Next Steps

1. Read `KEYBOARD_SHORTCUTS_USAGE.md` for detailed guide
2. Check `KEYBOARD_SHORTCUTS_EXAMPLES.tsx` for 10+ real examples
3. Integrate hooks into your components
4. Test with different keyboard inputs
5. Add help dialog showing available shortcuts

---

For more details, see:
- `KEYBOARD_SHORTCUTS_USAGE.md` - Comprehensive guide
- `KEYBOARD_SHORTCUTS_EXAMPLES.tsx` - 10+ examples
- `KEYBOARD_SHORTCUTS_IMPLEMENTATION.md` - Full documentation
