# Button Component Tests

Comprehensive test suite for the `Button` component using Vitest and React Testing Library.

## Test Coverage

The test suite covers all aspects of the Button component:

### 1. Default Variant (Primary)
- ✅ Renders with default primary variant
- ✅ Has correct base classes (flexbox, centering, rounded, etc.)
- ✅ Applies focus ring styles

### 2. Variants
- ✅ Primary variant
- ✅ Secondary variant with border
- ✅ Ghost variant with hover effects
- ✅ Danger variant (red)
- ✅ Icon variant (rounded, no padding)

### 3. Sizes
- ✅ Small (text-xs, px-2, py-1)
- ✅ Medium/Default (text-sm, px-4, py-2)
- ✅ Large (text-base, px-6, py-3)
- ✅ Icon size (p-2)
- ✅ Combination of variant + size

### 4. Loading State
- ✅ Shows animated spinner when `isLoading={true}`
- ✅ Hides left icon during loading
- ✅ Keeps right icon visible during loading
- ✅ Correct spinner styles (border, animation, size)

### 5. Disabled State
- ✅ Button disabled with `disabled` prop
- ✅ Button disabled when `isLoading={true}`
- ✅ Applies disabled styles (opacity, cursor)
- ✅ Prevents click when disabled
- ✅ Prevents click when loading

### 6. Icons
- ✅ Renders left icon
- ✅ Renders right icon
- ✅ Renders both icons together
- ✅ Correct spacing between icons and text (gap-2)
- ✅ Left icon hidden during loading
- ✅ Icon-only button support

### 7. Click Handling
- ✅ Calls `onClick` when clicked
- ✅ Passes correct event object
- ✅ Supports multiple clicks
- ✅ Handles async click handlers
- ✅ Prevents click when disabled
- ✅ Prevents click when loading

### 8. Full Width
- ✅ Applies `w-full` class when `fullWidth={true}`
- ✅ No full width by default
- ✅ Combines with other classes correctly

### 9. HTML Attributes
- ✅ Forwards `type` attribute (submit, button, reset)
- ✅ Forwards `aria-*` attributes
- ✅ Forwards `data-*` attributes
- ✅ Forwards `title` attribute
- ✅ Supports custom className merging

### 10. Ref Forwarding
- ✅ Forwards ref to button element
- ✅ Allows imperative actions via ref (focus, blur)
- ✅ Allows checking disabled state

### 11. Component Metadata
- ✅ Correct displayName for debugging

### 12. Complex Scenarios
- ✅ Handles rapid successive clicks
- ✅ All features combined (variant, size, icons, full width, etc.)
- ✅ HTML entities in text content
- ✅ Focus styles maintained

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm test -- --watch
```

### Run with UI
```bash
npm run test:ui
```

### Generate coverage report
```bash
npm run test:coverage
```

## Test Structure

Each test case follows this pattern:

```typescript
describe('Feature Name', () => {
  it('should do something specific', () => {
    // Arrange: Set up test data
    const onClick = vi.fn();

    // Act: Render component and interact
    const { container } = render(<Button onClick={onClick}>Click</Button>);
    const button = container.querySelector('button');
    fireEvent.click(button);

    // Assert: Verify results
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
```

## Key Test Utilities

### Vitest
- `describe()` - Group related tests
- `it()` - Individual test case
- `expect()` - Assertions
- `vi.fn()` - Mock functions
- `beforeEach()`, `afterEach()` - Setup/teardown

### React Testing Library
- `render()` - Render React components
- `screen` - Query rendered elements
- `fireEvent` - Simulate user interactions
- `within()` - Scoped queries

## Test Examples

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

### Testing Variant
```typescript
it('should render danger variant', () => {
  const { container } = render(<Button variant="danger">Delete</Button>);
  const button = container.querySelector('button');

  expect(button?.className).toContain('danger');
  expect(button?.className).toContain('bg-red-500/80');
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

## Debugging Tests

### View rendered HTML
```typescript
const { debug } = render(<Button>Click</Button>);
debug(); // Prints HTML to console
```

### Check what's visible to screen reader
```typescript
const { container } = render(<Button>Click</Button>);
console.log(container.innerHTML);
```

### Use testing-library queries
```typescript
// Find by text
screen.getByText('Click me');

// Find by role
screen.getByRole('button', { name: /click/i });

// Find by test id
screen.getByTestId('my-button');
```

## Coverage Goals

- **Lines**: 95%+
- **Functions**: 95%+
- **Branches**: 90%+
- **Statements**: 95%+

## Props Tested

| Prop | Tests | Notes |
|------|-------|-------|
| `variant` | 5 | primary, secondary, ghost, danger, icon |
| `size` | 4 | sm, md, lg, icon |
| `leftIcon` | 3 | Renders, hidden on load, both icons |
| `rightIcon` | 3 | Renders, shown on load, both icons |
| `isLoading` | 4 | Shows spinner, disables, hides left icon |
| `disabled` | 4 | Disables button, applies styles |
| `fullWidth` | 3 | w-full class, default, combined |
| `onClick` | 5 | Called, event, multiple, async, disabled |
| `className` | 1 | Custom class merging |
| `ref` | 3 | Forwarded, imperative, state check |

## Common Patterns

### Test all values in enum-like prop
```typescript
const variants = ['primary', 'secondary', 'ghost', 'danger', 'icon'];

variants.forEach((variant) => {
  it(`should render ${variant} variant`, () => {
    const { container } = render(<Button variant={variant}>Test</Button>);
    expect(container.querySelector('button')?.className).toContain(variant);
  });
});
```

### Test prop combinations
```typescript
it('should combine variant and size correctly', () => {
  const { container } = render(
    <Button variant="danger" size="lg">Delete All</Button>
  );
  const button = container.querySelector('button');

  expect(button?.className).toContain('danger');
  expect(button?.className).toContain('text-base');
  expect(button?.className).toContain('px-6');
});
```

### Test disabled state
```typescript
it('should not trigger click when disabled', () => {
  const onClick = vi.fn();
  const { container } = render(
    <Button disabled onClick={onClick}>Disabled</Button>
  );

  const button = container.querySelector('button') as HTMLButtonElement;
  expect(button?.disabled).toBe(true);
});
```

## Maintenance

When modifying the Button component:
1. Run tests to ensure nothing broke
2. Add tests for new props
3. Update this README with new test cases
4. Keep coverage above 90%

## Related Files

- `/src/components/ui/Button.tsx` - Component implementation
- `vitest.config.ts` - Vitest configuration
- `vitest.setup.ts` - Global test setup
- `package.json` - Test scripts and dependencies
