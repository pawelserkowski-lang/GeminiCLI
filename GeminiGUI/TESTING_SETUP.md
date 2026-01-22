# Testing Setup for GeminiGUI

This document describes the comprehensive testing setup created for the GeminiGUI project, with focus on the Button component.

## 📦 What Was Created

### 1. Test File
**File:** `/src/components/ui/Button.test.tsx` (629 lines)

Comprehensive test suite with **50+ test cases** covering:
- Default rendering and variants
- All button variants (primary, secondary, ghost, danger, icon)
- All button sizes (sm, md, lg, icon)
- Loading state with animated spinner
- Disabled state (via disabled prop and isLoading)
- Left and right icon rendering
- Click handling and event propagation
- Full width functionality
- HTML attribute forwarding (type, aria-*, data-*, etc.)
- Ref forwarding for imperative actions
- Complex real-world scenarios

### 2. Configuration Files

#### `vitest.config.ts`
- Vitest configuration with jsdom environment
- Coverage settings (v8 provider, HTML reports)
- Global test utilities (no imports needed)
- Test timeout settings

#### `vitest.setup.ts`
- Global test setup and teardown
- Mock implementations for window APIs
- IntersectionObserver and ResizeObserver mocks
- Auto cleanup after each test

### 3. Test Utilities
**File:** `/src/test/test-utils.tsx`

Reusable testing helpers including:
- Custom render function with providers
- Mock click handler factory
- Test data constants (variants, sizes)
- Test ID generators
- Assertion helpers
- Component builders for common scenarios
- Re-exports of RTL utilities

### 4. Documentation
**File:** `/src/components/ui/Button.test.README.md`

Complete testing guide including:
- Test coverage checklist
- Running tests instructions
- Test structure patterns
- Examples for each test type
- Debugging tips
- Common patterns
- Props coverage matrix

## 🚀 Getting Started

### Installation

Install dependencies:
```bash
npm install
```

This installs:
- `vitest` - Test runner
- `@testing-library/react` - Component testing
- `@testing-library/user-event` - User interaction simulation
- `jsdom` - DOM environment
- `@vitest/ui` - Visual test UI
- `@vitest/coverage-v8` - Code coverage

### Running Tests

```bash
# Run all tests
npm test

# Run in watch mode (auto-rerun on file changes)
npm test -- --watch

# Run specific test file
npm test Button.test.tsx

# Run with UI dashboard
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## 📊 Test Statistics

### Button Component Test Suite
- **Total Test Cases:** 50+
- **Test Groups:** 12 describe blocks
- **Lines of Test Code:** 629
- **Coverage Target:** 90%+

### Test Breakdown by Category

| Category | Tests | Coverage |
|----------|-------|----------|
| Default Rendering | 3 | Primary variant, base classes, focus styles |
| Variants | 5 | primary, secondary, ghost, danger, icon |
| Sizes | 5 | sm, md, lg, icon, combinations |
| Loading State | 4 | Spinner, hidden icons, styles, disabled state |
| Disabled State | 5 | disabled prop, isLoading, styles, click prevention |
| Icons | 6 | left, right, both, spacing, loading behavior |
| Click Handling | 6 | Single click, event, multiple, async, disabled |
| Full Width | 3 | w-full class, default, combinations |
| HTML Attributes | 5 | type, aria-*, data-*, title, className |
| Ref Forwarding | 3 | Forwarded ref, imperative actions, state |
| Metadata | 1 | displayName |
| Complex Scenarios | 4 | Rapid clicks, all features, HTML entities, focus |

## 🧪 Test Examples

### Testing Variants
```typescript
it('should render danger variant', () => {
  const { container } = render(<Button variant="danger">Delete</Button>);
  const button = container.querySelector('button');

  expect(button?.className).toContain('danger');
  expect(button?.className).toContain('bg-red-500/80');
  expect(button?.className).toContain('text-white');
});
```

### Testing Loading State
```typescript
it('should show loading spinner when isLoading is true', () => {
  const { container } = render(<Button isLoading>Loading</Button>);
  const spinner = container.querySelector('.animate-spin');

  expect(spinner).toBeInTheDocument();
});
```

### Testing Click Handler
```typescript
it('should call onClick when clicked', () => {
  const onClick = vi.fn();
  const { container } = render(<Button onClick={onClick}>Click</Button>);
  const button = container.querySelector('button');

  fireEvent.click(button);

  expect(onClick).toHaveBeenCalledTimes(1);
});
```

### Testing Icons
```typescript
it('should render left icon', () => {
  render(
    <Button leftIcon={<AlertCircle data-testid="left-icon" />}>
      With Icon
    </Button>
  );

  const leftIcon = screen.getByTestId('left-icon');
  expect(leftIcon).toBeInTheDocument();
});
```

## 📁 File Structure

```
GeminiGUI/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── Button.tsx              # Component implementation
│   │       ├── Button.test.tsx         # Test suite (NEW - 629 lines)
│   │       ├── Button.test.README.md   # Test documentation (NEW)
│   │       └── index.ts
│   └── test/
│       └── test-utils.tsx              # Test utilities (NEW)
├── vitest.config.ts                    # Vitest configuration (NEW)
├── vitest.setup.ts                     # Global test setup (NEW)
├── TESTING_SETUP.md                    # This file (NEW)
└── package.json                        # Updated with test scripts
```

## 🛠️ Package.json Updates

Added scripts:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

Added devDependencies:
```json
{
  "devDependencies": {
    "@testing-library/react": "^15.0.0",
    "@testing-library/user-event": "^14.5.0",
    "@vitest/ui": "^2.1.9",
    "jsdom": "^24.1.0",
    "vitest": "^2.1.9",
    "@vitest/coverage-v8": "^4.0.17"
  }
}
```

## 🎯 Coverage Goals

The test suite targets:
- **Lines:** 95%+
- **Functions:** 95%+
- **Branches:** 90%+
- **Statements:** 95%+

## 🔄 Test Patterns

### Arrange-Act-Assert Pattern
All tests follow the AAA pattern:
```typescript
// Arrange - Set up test data
const onClick = vi.fn();

// Act - Render and interact
const { container } = render(<Button onClick={onClick}>Click</Button>);
fireEvent.click(container.querySelector('button'));

// Assert - Verify results
expect(onClick).toHaveBeenCalledTimes(1);
```

### Variant Testing
```typescript
describe('Variants', () => {
  const variants = ['primary', 'secondary', 'ghost', 'danger', 'icon'];

  variants.forEach((variant) => {
    it(`should render ${variant} variant`, () => {
      const { container } = render(<Button variant={variant}>Test</Button>);
      expect(container.querySelector('button')?.className).toContain(variant);
    });
  });
});
```

## 🧬 Using Test Utilities

Import and use the test utilities:
```typescript
import {
  renderWithProviders,
  createMockClickHandler,
  BUTTON_VARIANTS,
  assertions,
  builders
} from '@/test/test-utils';

// Use assertion helpers
const { container } = render(<Button>Test</Button>);
const button = container.querySelector('button')!;
assertions.hasFocusStyles(button);
assertions.isEnabled(button);

// Use builders
const buttonProps = builders.button({ variant: 'danger' });
```

## 📝 Best Practices

1. **Specificity**: Test specific behavior, not implementation details
2. **Isolation**: Each test should be independent
3. **Clarity**: Test names should describe what is being tested
4. **Setup**: Use beforeEach for common setup, not afterEach cleanup
5. **Mocks**: Mock external dependencies, not components
6. **Assertions**: Use specific assertions, not generic ones

## 🐛 Debugging Tests

### View Rendered HTML
```typescript
const { debug } = render(<Button>Test</Button>);
debug(); // Prints HTML
```

### Use screen queries
```typescript
import { screen } from '@testing-library/react';

screen.getByText('Click me');
screen.getByRole('button', { name: /click/i });
screen.getByTestId('my-button');
```

### Visual debugging
```bash
npm run test:ui
```

Opens an interactive dashboard showing all tests, their status, and execution time.

## 🚨 Common Issues

### "Cannot find module '@testing-library/react'"
Solution: Run `npm install`

### Tests timing out
Solution: Increase timeout in vitest.config.ts:
```typescript
testTimeout: 10000 // ms
```

### Queries not finding elements
Solution: Use screen debugging:
```typescript
const { debug } = render(<Button>Test</Button>);
debug(); // See what's actually rendered
```

## 📚 Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library Docs](https://testing-library.com/react)
- [Testing Best Practices](https://testingjavascript.com/)
- [Jest Matchers](https://vitest.dev/api/expect.html)

## 🔮 Future Improvements

1. **Snapshot Testing**: Add snapshot tests for visual regression
2. **Visual Testing**: Integrate visual regression testing (Percy, Chromatic)
3. **Accessibility Testing**: Add @testing-library/jest-dom for a11y assertions
4. **E2E Tests**: Add Playwright/Cypress for end-to-end testing
5. **Performance Tests**: Benchmark rendering performance
6. **Integration Tests**: Test components in real application context

## 📞 Questions?

Refer to:
1. `/src/components/ui/Button.test.README.md` - Test-specific documentation
2. `vitest.config.ts` - Configuration reference
3. `src/test/test-utils.tsx` - Utility functions and helpers

---

**Last Updated:** January 22, 2026
**Test Framework:** Vitest 2.1.9
**Component Tested:** Button (src/components/ui/Button.tsx)
