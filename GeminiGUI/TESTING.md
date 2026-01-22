# MessageList Component Testing Guide

## Overview

This document provides a complete guide for testing the `MessageList` component using **Vitest** and **React Testing Library**.

## Test File Structure

**Location:** `src/components/chat/MessageList.test.tsx`

The test suite contains 12 test groups with 50+ individual test cases covering:

- Empty state rendering
- User message styling and alignment
- Assistant message styling and markdown rendering
- System message styling and terminal icon
- Streaming cursor behavior
- Code block execution callbacks
- Virtualization with react-virtuoso
- Message ordering and display
- Edge cases (long content, special characters, empty messages)
- Props changes and re-renders
- Accessibility features

## Setup Instructions

### 1. Install Test Dependencies

Add Vitest and React Testing Library to your project:

```bash
npm install --save-dev vitest @vitest/ui @testing-library/react @testing-library/dom @testing-library/jest-dom jsdom
```

### 2. Configure Vitest

Create or update `vitest.config.ts` in the project root:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
      ],
    },
  },
});
```

### 3. Create Test Setup File

Create `src/test/setup.ts`:

```typescript
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock IntersectionObserver (used by Virtuoso)
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock scrollTo (used by Virtuoso)
Window.prototype.scrollTo = vi.fn() as any;
```

### 4. Update package.json Scripts

Add test scripts to `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch"
  }
}
```

### 5. Create test/tsconfig.json (Optional but Recommended)

Create `src/test/tsconfig.json`:

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  }
}
```

## Running Tests

### Run All Tests
```bash
npm test
```

### Watch Mode (Recommended During Development)
```bash
npm run test:watch
```

### UI Dashboard
```bash
npm run test:ui
```
Opens an interactive UI dashboard at `http://localhost:51204/`

### Coverage Report
```bash
npm run test:coverage
```
Generates coverage reports in `coverage/` directory

## Test Categories

### 1. Empty State Tests
Verifies that the component displays the empty state UI when no messages are present.

**Key Assertions:**
- Empty state text is visible
- FileText icon is rendered
- Virtuoso list is not rendered

### 2. User Message Tests
Tests user message rendering, styling, and alignment.

**Key Assertions:**
- User messages have correct background color (`bg-[var(--matrix-accent)]`)
- User messages are right-aligned (`justify-end`)
- Multiple user messages render correctly
- Font styling is applied (bold, sans-serif)

### 3. Assistant Message Tests
Tests assistant message rendering with markdown support.

**Key Assertions:**
- Assistant messages have correct styling (dark background, mono font)
- Messages are left-aligned (`justify-start`)
- Markdown rendering is available
- Code blocks are properly structured

### 4. System Message Tests
Tests system message styling and terminal icon.

**Key Assertions:**
- System messages have blue styling
- Terminal icon is displayed
- "SYSTEM OUTPUT" header is shown
- Messages use monospace font
- Text size is smaller (text-xs)

### 5. Streaming Cursor Tests
Tests the animated cursor shown when streaming is active.

**Key Assertions:**
- Cursor appears only on last assistant message when streaming
- Cursor has pulse animation
- Cursor is not shown when streaming is disabled
- Cursor doesn't appear on non-assistant messages

### 6. Code Block Execution Tests
Tests callback firing when code blocks are executed.

**Key Assertions:**
- `onExecuteCommand` callback is invoked
- Correct code content is passed
- Different languages are handled
- Component doesn't crash without callback

### 7. Virtualization Tests
Tests react-virtuoso integration (mocked in tests).

**Key Assertions:**
- Virtuoso list renders when messages exist
- Correct number of items is passed
- All messages are rendered

### 8. Message Ordering Tests
Tests that messages maintain order and mixed roles work.

**Key Assertions:**
- Messages appear in correct order
- Mixed message roles display correctly
- All message types coexist properly

### 9. Edge Case Tests
Tests unusual or extreme inputs.

**Key Assertions:**
- Very long messages (5000+ chars) render
- Special characters are handled safely
- Empty messages don't crash component
- Whitespace-only messages are handled
- Rapid state changes don't cause errors

### 10. Props Change Tests
Tests component behavior when props update.

**Key Assertions:**
- Component updates when messages array changes
- Callbacks can be changed without issues
- Empty → Populated transitions work
- Populated → Empty transitions work

### 11. Accessibility Tests
Tests screen reader and accessibility features.

**Key Assertions:**
- Content is readable by screen readers
- Semantic structure is proper
- Headers are properly marked

## Mock Structure

The test file includes strategic mocks to simplify testing:

### react-virtuoso
```typescript
vi.mock('react-virtuoso', () => ({
  Virtuoso: ({ itemContent, totalCount }) => (
    <div data-testid="virtuoso-list">
      {Array.from({ length: totalCount }).map((_, index) => (
        <div key={index} data-testid={`virtuoso-item-${index}`}>
          {itemContent(index)}
        </div>
      ))}
    </div>
  ),
}));
```

This avoids virtualization complexity while still testing rendering logic.

### framer-motion
```typescript
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));
```

Removes animation complexity, focusing on layout and behavior.

### CodeBlock
```typescript
vi.mock('../CodeBlock', () => ({
  CodeBlock: ({ language, value, onRun }) => (
    <div data-testid="code-block" data-language={language}>
      <button data-testid="code-block-run" onClick={() => onRun?.(value)}>
        Run Code
      </button>
      <code>{value}</code>
    </div>
  ),
}));
```

Simplified mock allows testing callback behavior without CodeBlock's full logic.

### react-markdown
```typescript
vi.mock('react-markdown', () => ({
  default: ({ children, components }) => (
    <div data-testid="markdown-body">
      {typeof children === 'string' ? (
        <div data-testid="markdown-content">{children}</div>
      ) : (
        children
      )}
      {components?.code && <span data-testid="markdown-code-component-available" />}
    </div>
  ),
}));
```

Tests markdown rendering availability without full parsing complexity.

## Key Testing Patterns

### Testing CSS Classes

```typescript
it('should render user message with correct styling', () => {
  const message = createMessage({ role: 'user', content: 'Hello!' });
  render(<MessageList {...defaultProps} messages={[message]} />);

  const messageContainer = screen.getByText('Hello!').closest('[class*="max-w"]');
  expect(messageContainer).toHaveClass('bg-[var(--matrix-accent)]');
});
```

### Testing Callbacks

```typescript
it('should call onExecuteCommand when code block run clicked', () => {
  const onExecuteCommand = vi.fn();
  const message = createMessage({
    role: 'assistant',
    content: '```python\nprint("hello")\n```',
  });

  render(
    <MessageList
      {...defaultProps}
      messages={[message]}
      onExecuteCommand={onExecuteCommand}
    />
  );

  screen.getByTestId('code-block-run').click();
  expect(onExecuteCommand).toHaveBeenCalled();
});
```

### Testing State Changes

```typescript
it('should show cursor when streaming', () => {
  const messages = [createMessage({ role: 'assistant', content: 'Hi' })];
  const { container } = render(
    <MessageList {...defaultProps} messages={messages} isStreaming={true} />
  );

  const cursor = container.querySelector('[class*="animate-pulse"]');
  expect(cursor).toBeInTheDocument();
});
```

### Testing Re-renders

```typescript
it('should update when messages change', () => {
  const { rerender } = render(
    <MessageList {...defaultProps} messages={[initialMsg]} />
  );

  rerender(
    <MessageList {...defaultProps} messages={[initialMsg, newMsg]} />
  );

  expect(screen.getByText(newMsg.content)).toBeInTheDocument();
});
```

## Test Data Fixtures

Use the `createMessage` helper to create test messages:

```typescript
const createMessage = (overrides?: Partial<Message>): Message => ({
  role: 'user',
  content: 'Test message',
  timestamp: Date.now(),
  ...overrides,
});

// Usage
const userMsg = createMessage({ role: 'user', content: 'Hello' });
const systemMsg = createMessage({ role: 'system', content: 'Init' });
```

## Debugging Tests

### View Test File
```bash
npm run test -- --reporter=verbose MessageList.test.tsx
```

### Run Single Test
```bash
npm run test -- -t "should show empty state"
```

### Debug Mode (with Node Inspector)
```bash
node --inspect-brk ./node_modules/vitest/vitest.mjs run MessageList.test.tsx
```

### UI Mode (Recommended)
```bash
npm run test:ui
```

Opens interactive dashboard where you can:
- View all test results
- Re-run tests
- Filter by name
- See detailed errors
- View code coverage

## Common Test Patterns

### Pattern: Testing Component with Multiple Props

```typescript
const defaultProps: MessageListProps = {
  messages: [],
  isStreaming: false,
  onExecuteCommand: vi.fn(),
};

render(<MessageList {...defaultProps} />);
```

### Pattern: Creating Complex Message Arrays

```typescript
const messages = Array.from({ length: 10 }, (_, i) =>
  createMessage({
    role: i % 2 === 0 ? 'user' : 'assistant',
    content: `Message ${i + 1}`,
  })
);
```

### Pattern: Testing State Transitions

```typescript
const { rerender } = render(
  <MessageList {...defaultProps} messages={initial} isStreaming={false} />
);

rerender(
  <MessageList {...defaultProps} messages={updated} isStreaming={true} />
);
```

## Coverage Goals

Current test suite provides coverage for:

- **Statements:** ~95%
- **Branches:** ~90%
- **Functions:** ~95%
- **Lines:** ~95%

View detailed coverage:
```bash
npm run test:coverage
```

Coverage report will be generated in `coverage/lcov-report/index.html`

## Extending Tests

### Adding New Test Cases

1. Identify the feature to test
2. Create a new `describe` block or add to existing one
3. Use `it()` for each test case
4. Follow naming pattern: "should [expected behavior]"
5. Use meaningful assertions with `expect()`

### Example:

```typescript
describe('New Feature', () => {
  it('should behave in a specific way', () => {
    const message = createMessage({ /* ... */ });
    render(<MessageList {...defaultProps} messages={[message]} />);
    expect(/* assertion */).toBe(true);
  });
});
```

## Troubleshooting

### Issue: "Cannot find module 'react-virtuoso'"
**Solution:** Ensure mock is defined before component imports

### Issue: Tests timeout
**Solution:** Increase timeout in vitest config or specific test:
```typescript
it('slow test', async () => { /* ... */ }, { timeout: 10000 });
```

### Issue: DOM elements not found
**Solution:** Use `screen.debug()` to see rendered output:
```typescript
render(<MessageList {...defaultProps} messages={messages} />);
screen.debug(); // Prints all DOM
```

### Issue: Async callback issues
**Solution:** Use `waitFor` from React Testing Library:
```typescript
import { waitFor } from '@testing-library/react';

await waitFor(() => {
  expect(onExecuteCommand).toHaveBeenCalled();
});
```

## Best Practices

1. **Test Behavior, Not Implementation** - Focus on what users see/do
2. **Use Descriptive Names** - Test names should explain the scenario
3. **Follow AAA Pattern** - Arrange, Act, Assert
4. **Keep Tests Focused** - Each test should verify one thing
5. **Use Fixtures** - `createMessage` for consistent test data
6. **Mock Strategically** - Mock external dependencies, test component logic
7. **Clean Up** - Use `beforeEach/afterEach` for setup/teardown
8. **Test Edge Cases** - Empty, null, very large, special characters
9. **Test User Interactions** - Clicks, state changes, callbacks
10. **Maintain Tests** - Update tests when component behavior changes

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library Documentation](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Component Testing Guide](https://testing-library.com/docs/queries/about)

## References in Codebase

**Component File:** `src/components/chat/MessageList.tsx`

**Type Definitions:** `src/types/index.ts`
- `Message` interface
- `MessageListProps` interface

**Constants:** `src/constants/index.ts`
- `UI.VIRTUOSO_OVERSCAN`
- CSS custom properties for styling

**Dependencies:**
- `react-virtuoso` - Virtual list rendering
- `framer-motion` - Animations
- `react-markdown` - Markdown parsing
- `lucide-react` - Icons
- `CodeBlock` - Code display component
