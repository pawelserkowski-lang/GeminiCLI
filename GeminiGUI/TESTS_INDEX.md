# GeminiGUI - Test Suite Index

Complete reference guide to all test files and testing infrastructure.

## 📋 Test Files

### Button Component Tests
**File:** `src/components/ui/Button.test.tsx`
- **Lines:** 629
- **Test Cases:** 50+
- **Imports:** Vitest, React Testing Library, lucide-react icons
- **Coverage:** 90%+ target

**Test Categories:**
1. Default Rendering (3 tests)
2. Variants - primary, secondary, ghost, danger, icon (5 tests)
3. Sizes - sm, md, lg, icon (5 tests)
4. Loading State with Spinner (4 tests)
5. Disabled State (5 tests)
6. Icons - left, right, both (6 tests)
7. Click Handling (7 tests)
8. Full Width (3 tests)
9. HTML Attributes (5 tests)
10. Ref Forwarding (3 tests)
11. Component Metadata (1 test)
12. Complex Scenarios (4 tests)

## 🔧 Configuration Files

### Vitest Config
**File:** `vitest.config.ts`
- jsdom environment for DOM testing
- Coverage configuration (v8 provider)
- Global test utilities enabled
- Test timeout: 10000ms
- Coverage targets: 70% minimum

### Setup File
**File:** `vitest.setup.ts`
- Global cleanup after each test
- window.matchMedia mock
- IntersectionObserver mock
- ResizeObserver mock
- Console error suppression

## 🛠️ Test Utilities

### Test Utilities Module
**File:** `src/test/test-utils.tsx`
- Custom render function (renderWithProviders)
- Mock click handler factory
- Test data constants
- Test ID generators
- Assertion helper functions
- Component builders

**Key Exports:**
```typescript
// Render
export function renderWithProviders(ui, options?)

// Utilities
export function createMockClickHandler()

// Constants
export const BUTTON_VARIANTS
export const BUTTON_SIZES

// Generators
export const testIds

// Assertions
export const assertions

// Builders
export const builders

// Re-exports
export { render, screen, fireEvent, waitFor, vi }
```

## 📚 Documentation Files

### Main Testing Setup Guide
**File:** `TESTING_SETUP.md`
- Complete overview of testing infrastructure
- Installation instructions
- Running tests guide
- Test statistics and breakdown
- Test examples with code
- File structure overview
- Package.json updates
- Coverage goals
- Test patterns
- Debugging guide
- Common issues and solutions
- Resources and future improvements

### Button-Specific Test Documentation
**File:** `src/components/ui/Button.test.README.md`
- Button test coverage checklist
- Running tests instructions
- Test structure patterns
- Test examples for each pattern
- Debugging tips
- Common patterns for testing
- Props coverage matrix
- Maintenance guidelines
- Related files reference

### Quick Reference Guide
**File:** `TEST_QUICK_REFERENCE.md`
- Quick commands for running tests
- Complete test checklist
- Test structure template
- Test locations reference
- Common queries and assertions
- Test cases by category
- Debugging techniques
- Test utilities quick reference
- Fixing common issues
- Coverage report info
- Props tested table
- Pro tips and tricks

## 📦 Package.json Updates

### New Scripts
```json
{
  "test": "vitest",
  "test:ui": "vitest --ui",
  "test:coverage": "vitest --coverage"
}
```

### New DevDependencies
```json
{
  "@testing-library/react": "^15.0.0",
  "@testing-library/user-event": "^14.5.0",
  "@vitest/ui": "^2.1.9",
  "jsdom": "^24.1.0",
  "vitest": "^2.1.9",
  "@vitest/coverage-v8": "^4.0.17"
}
```

## 📊 Testing Statistics

### Overall Test Suite
- **Total Test Files:** 1 (Button component)
- **Total Test Cases:** 50+
- **Total Lines of Test Code:** 629
- **Test Configuration Files:** 2 (config + setup)
- **Documentation Files:** 3
- **Utility Files:** 1

### Button Component Tests Breakdown
| Category | Tests | Status |
|----------|-------|--------|
| Default Rendering | 3 | ✅ Complete |
| Variants | 5 | ✅ Complete |
| Sizes | 5 | ✅ Complete |
| Loading State | 4 | ✅ Complete |
| Disabled State | 5 | ✅ Complete |
| Icons | 6 | ✅ Complete |
| Click Handling | 7 | ✅ Complete |
| Full Width | 3 | ✅ Complete |
| HTML Attributes | 5 | ✅ Complete |
| Ref Forwarding | 3 | ✅ Complete |
| Metadata | 1 | ✅ Complete |
| Complex Scenarios | 4 | ✅ Complete |
| **TOTAL** | **51** | **✅ Complete** |

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Tests
```bash
npm test
```

### 3. View Results with UI
```bash
npm run test:ui
```

### 4. Generate Coverage Report
```bash
npm run test:coverage
```

## 📁 Complete File Structure

```
GeminiGUI/
│
├── 📝 TESTS_INDEX.md                    # This file
├── 📝 TESTING_SETUP.md                  # Main testing guide
├── 📝 TEST_QUICK_REFERENCE.md           # Quick reference
│
├── vitest.config.ts                     # Vitest configuration
├── vitest.setup.ts                      # Global test setup
│
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── Button.tsx               # Component implementation
│   │       ├── Button.test.tsx          # Main test file (629 lines)
│   │       ├── Button.test.README.md    # Button test docs
│   │       └── index.ts
│   │
│   └── test/
│       └── test-utils.tsx               # Reusable test utilities
│
└── package.json                         # Updated with test scripts
```

## 🎯 What's Tested

### Button Component Props
- ✅ `variant` - primary, secondary, ghost, danger, icon
- ✅ `size` - sm, md, lg, icon
- ✅ `leftIcon` - React node
- ✅ `rightIcon` - React node
- ✅ `isLoading` - boolean
- ✅ `disabled` - boolean
- ✅ `fullWidth` - boolean
- ✅ `onClick` - event handler
- ✅ `className` - custom classes
- ✅ `ref` - forwarded ref
- ✅ HTML attributes (type, aria-*, data-*, title)

### Button Behaviors
- ✅ Renders with correct classes
- ✅ Applies focus ring styles
- ✅ Shows loading spinner
- ✅ Disables button when needed
- ✅ Hides left icon during loading
- ✅ Shows right icon during loading
- ✅ Handles click events
- ✅ Forwards HTML attributes
- ✅ Supports ref forwarding
- ✅ Applies full width class
- ✅ Handles complex scenarios

## 🔍 Viewing Test Results

### Terminal Output
```bash
npm test
```
Shows pass/fail status and execution time for each test.

### Interactive UI Dashboard
```bash
npm run test:ui
```
Opens visual dashboard showing:
- All test cases with pass/fail indicators
- Execution time for each test
- Error messages and stack traces
- Coverage visualization

### HTML Coverage Report
```bash
npm run test:coverage
```
Generates HTML report at `coverage/lcov-report/index.html`

## 📖 Documentation Map

```
Choose the right document:

START HERE:
→ TESTING_SETUP.md (comprehensive guide)

Quick Commands?
→ TEST_QUICK_REFERENCE.md (commands and shortcuts)

Button Tests Specifically?
→ src/components/ui/Button.test.README.md (test patterns)

Need a File Index?
→ TESTS_INDEX.md (this file)
```

## ⚙️ Configuration Reference

### Vitest Settings
- **Environment:** jsdom (DOM testing)
- **Test Timeout:** 10000ms
- **Hook Timeout:** 10000ms
- **Coverage Provider:** v8
- **Globals:** Enabled (no imports needed)

### Coverage Targets
- **Lines:** 70%+
- **Functions:** 70%+
- **Branches:** 70%+
- **Statements:** 70%+

### Excluded from Coverage
- node_modules/
- dist/
- **/*.test.{ts,tsx}
- **/*.spec.{ts,tsx}

## 🔗 Useful Links

### Test Framework Docs
- [Vitest Official Docs](https://vitest.dev/)
- [React Testing Library Docs](https://testing-library.com/react)
- [Vitest API Reference](https://vitest.dev/api/)

### Testing Best Practices
- [Testing JavaScript](https://testingjavascript.com/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Jest Matchers](https://vitest.dev/api/expect.html)

## 💡 Tips and Tricks

### Use Assertion Helpers
```typescript
import { assertions } from '@/test/test-utils';

assertions.hasVariant(button, 'primary');
assertions.isDisabled(button);
assertions.hasFocusStyles(button);
```

### Use Component Builders
```typescript
import { builders } from '@/test/test-utils';

const props = builders.button({ variant: 'danger' });
const allVariants = builders.allVariants();
```

### Debug in Tests
```typescript
const { debug } = render(<Button>Test</Button>);
debug(); // Print HTML to console
```

### Run Specific Tests
```bash
npm test -- -t "loading"
npm test -- -t "variants"
npm test Button.test.tsx
```

## 🚨 Troubleshooting

### Tests Not Running?
1. Check Node.js version (≥20.0.0)
2. Run `npm install`
3. Check for syntax errors

### Module Not Found?
1. Run `npm install`
2. Check import paths
3. Check file exists

### Tests Timing Out?
1. Increase timeout in `vitest.config.ts`
2. Check for infinite loops
3. Check async/await usage

## 📈 Next Steps

1. **Verify Installation:** `npm test`
2. **Check Coverage:** `npm run test:coverage`
3. **View UI:** `npm run test:ui`
4. **Add More Tests:** For other components
5. **Configure CI/CD:** Add tests to your pipeline

## 📞 Help Resources

| Topic | Location |
|-------|----------|
| Test Commands | TEST_QUICK_REFERENCE.md |
| Setup & Config | TESTING_SETUP.md |
| Button Tests | src/components/ui/Button.test.README.md |
| Test Utilities | src/test/test-utils.tsx |

---

**Created:** January 22, 2026
**Testing Framework:** Vitest 2.1.9
**Test Library:** React Testing Library 15.0.0
**Status:** ✅ Ready to Use
