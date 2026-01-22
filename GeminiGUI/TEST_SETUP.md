# Test Setup Guide for GeminiGUI

Complete setup instructions for running the useStreamListeners test suite.

---

## Step 1: Install Dependencies

Add testing dependencies to your project:

```bash
npm install --save-dev vitest @testing-library/react jsdom @vitest/coverage-v8
```

### Verified Versions
```json
{
  "devDependencies": {
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.0.0",
    "jsdom": "^23.0.0",
    "@vitest/coverage-v8": "^1.0.0"
  }
}
```

---

## Step 2: Configure Vitest

### Option A: Using vitest.config.ts (Recommended)

A `vitest.config.ts` file has been created in the project root with:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      branches: 90,
      lines: 95,
      functions: 100,
      statements: 95,
    },
  },
});
```

This configuration:
- Enables global test utilities (`describe`, `it`, `expect`)
- Uses jsdom for DOM simulation
- Configures coverage thresholds
- Supports both .ts and .tsx test files

---

## Step 3: Update package.json

Add test scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "tauri": "tauri",
    "lint": "tsc --noEmit",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

---

## Step 4: Verify Test File Exists

The test file is located at:

```
src/hooks/useStreamListeners.test.ts
```

Verify it exists:
```bash
ls -la src/hooks/useStreamListeners.test.ts
```

---

## Step 5: Run Tests

### Quick Test Run
```bash
npm test
```

### Watch Mode (Recommended for development)
```bash
npm run test:watch
```

When in watch mode:
- Tests re-run automatically when files change
- Press `q` to quit
- Press `w` to show help menu

### Run with UI Dashboard
```bash
npm run test:ui
```

Opens an interactive test dashboard at `http://localhost:51204`

### Generate Coverage Report
```bash
npm run test:coverage
```

Generates coverage reports in `coverage/` directory:
- HTML report: `coverage/lcov-report/index.html`
- Text summary in console
- LCOV format for CI/CD integration

---

## Step 6: View Test Results

### Console Output Example

```
✓ src/hooks/useStreamListeners.test.ts (23)
  ✓ Listener Setup (2)
    ✓ should set up listeners on mount
    ✓ should set up listeners with correct callbacks
  ✓ Listener Cleanup (2)
    ✓ should clean up listeners on unmount
    ✓ should remove listeners from registry on unmount
  ✓ Chunk Event Handling (5)
  ✓ Completion Event Handling (3)
  ✓ Error Handling (5)
  ✓ Callback Dependencies (2)
  ✓ Integration Scenarios (4)

 Test Files  1 passed (1)
      Tests  23 passed (23)
   Start at  14:30:22
   Duration  1.23s
```

### HTML Coverage Report

After running `npm run test:coverage`, open:
```
coverage/lcov-report/index.html
```

This shows:
- Line coverage percentage
- Branch coverage percentage
- Function coverage percentage
- Statement coverage percentage
- Detailed drill-down by file

---

## Troubleshooting

### Issue: "Cannot find module 'vitest'"

**Solution:** Install dependencies
```bash
npm install
```

### Issue: "jsdom is not installed"

**Solution:** Install jsdom
```bash
npm install --save-dev jsdom
```

### Issue: "Tests are not running"

**Solution:** Check test file exists and is named correctly
```bash
# Should exist:
src/hooks/useStreamListeners.test.ts

# And should contain 'test' or 'it' statements
grep -c "it(" src/hooks/useStreamListeners.test.ts
```

### Issue: "Module resolution errors in tests"

**Solution:** Ensure Vitest config has correct aliases:
```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
},
```

### Issue: Mock not working as expected

**Solution:** Check that mocks are defined before imports:
```typescript
// ✓ Correct - mock first
vi.mock('@tauri-apps/api/event', () => ({...}));
import { listen } from '@tauri-apps/api/event';

// ✗ Wrong - mock after import
import { listen } from '@tauri-apps/api/event';
vi.mock('@tauri-apps/api/event', () => ({...}));
```

---

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

### GitLab CI Example

Create `.gitlab-ci.yml`:

```yaml
test:
  image: node:20
  script:
    - npm install
    - npm run test:coverage
  coverage: '/^Statements\s+:\s+(\d+\.\d+)%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
```

---

## Development Workflow

### 1. Make Changes to useStreamListeners.ts
```bash
# Edit the hook
nano src/hooks/useStreamListeners.ts
```

### 2. Run Tests in Watch Mode
```bash
npm run test:watch
```

The tests will automatically re-run when you save changes.

### 3. Review Coverage
If tests fail, check the coverage report:
```bash
npm run test:coverage
# Open coverage/lcov-report/index.html
```

### 4. Fix Issues
- Red lines = not covered
- Orange lines = conditionally covered
- Green lines = covered

### 5. Commit When All Tests Pass
```bash
git add src/hooks/useStreamListeners.ts
git commit -m "feat: improve useStreamListeners hook"
```

---

## Advanced Configuration

### Run Specific Test File
```bash
npm test -- useStreamListeners.test.ts
```

### Run Tests Matching Pattern
```bash
npm test -- --grep "Listener Setup"
```

### Debug Mode
```bash
node --inspect-brk ./node_modules/vitest/vitest.mjs run
```

Then open `chrome://inspect` in Chrome.

### Concurrent Tests
```bash
npm test -- --threads=4
```

### Single-threaded Mode (if needed)
```bash
npm test -- --threads=false
```

---

## Expected Test Results

All 23 tests should pass:

- **Listener Setup:** 2/2 ✓
- **Listener Cleanup:** 2/2 ✓
- **Chunk Event Handling:** 5/5 ✓
- **Completion Event Handling:** 3/3 ✓
- **Error Handling:** 5/5 ✓
- **Callback Dependencies:** 2/2 ✓
- **Integration Scenarios:** 4/4 ✓

**Total:** 23 tests, 0 failures

---

## Next Steps

1. ✅ Install dependencies: `npm install --save-dev vitest ...`
2. ✅ Verify test file exists: `src/hooks/useStreamListeners.test.ts`
3. ✅ Run tests: `npm test`
4. ✅ View coverage: `npm run test:coverage`
5. ✅ Integrate with CI/CD (optional)

---

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing React Hooks](https://react-hooks-testing-library.com/)
- [Tauri Event System](https://tauri.app/en/v1/api/js/event/)

---

## Support

For issues or questions:
1. Check test output: `npm test`
2. View detailed errors: `npm run test -- --reporter=verbose`
3. Check coverage gaps: `npm run test:coverage`
4. Review test file: `src/hooks/useStreamListeners.test.ts`
5. Check mock implementations in test file

