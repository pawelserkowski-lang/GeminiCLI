# Test Quick Reference Card

## Installation

```bash
npm install --save-dev vitest @vitest/ui @testing-library/react @testing-library/dom @testing-library/jest-dom jsdom
```

## NPM Scripts

```bash
npm test              # Run tests once
npm run test:watch   # Watch mode (re-run on changes)
npm run test:ui      # Interactive dashboard
npm run test:coverage # Generate coverage report
```

## Test File Location

`src/components/chat/MessageList.test.tsx`

## Test Statistics

- **Total Test Cases:** 50+
- **Test Suites:** 12
- **Coverage Target:** 85%+
- **Execution Time:** ~2-3 seconds

## Quick Test Running

### Run specific test file
```bash
npm test -- MessageList.test.tsx
```

### Run test by name
```bash
npm test -- -t "should show empty state"
```

### Run in watch mode
```bash
npm run test:watch
```

### View code coverage
```bash
npm run test:coverage
```

### Interactive UI (Recommended)
```bash
npm run test:ui
```

## Test Suite Overview

| Suite | Tests | Purpose |
|-------|-------|---------|
| Empty State | 2 | Test "no messages" UI |
| User Messages | 3 | Right-aligned, green styling |
| Assistant Messages | 4 | Left-aligned, markdown, code blocks |
| System Messages | 4 | Blue styling, terminal icon |
| Streaming Cursor | 4 | Blinking cursor when streaming |
| Code Execution | 3 | onExecuteCommand callback |
| Virtualization | 3 | Virtual scrolling with Virtuoso |
| Message Ordering | 2 | Message order and mixed roles |
| Edge Cases | 5 | Long text, special chars, etc. |
| Props Changes | 3 | Re-renders and updates |
| Accessibility | 2 | Screen reader support |

## Debugging Commands

### Verbose output
```bash
npm test -- --reporter=verbose
```

### Debug single test
```bash
npm test -- -t "test name" --reporter=verbose
```

### VS Code debugger
```bash
node --inspect-brk ./node_modules/vitest/vitest.mjs run MessageList.test.tsx
```

### View DOM in test
```typescript
import { screen } from '@testing-library/react';
// Inside test:
screen.debug();
```

## Coverage Goals

```
Lines:       85%+
Functions:   80%+
Branches:    80%+
Statements:  85%+
```

View coverage:
```bash
npm run test:coverage
```

---

**Last Updated:** January 22, 2026
**Component:** MessageList
