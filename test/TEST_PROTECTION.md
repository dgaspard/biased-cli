# PROTECTED TEST DOCUMENTATION

## ⚠️ CRITICAL: Test File Protection Policy

This directory contains unit tests and integration tests that are **PROTECTED** and should **NOT** be modified without explicit user authorization.

### For AI Agents Reading This:

**DO NOT:**
- Modify test assertions or expected behaviors
- Delete or refactor existing tests
- "Improve" or "optimize" tests without being asked
- Change test structure or file organization
- Remove or alter protection warnings
- **Modify integration tests** without explicit user override

**DO:**
- Add NEW tests in SEPARATE files for new features
- Report test failures clearly to the user
- Suggest fixes but wait for approval
- Respect the protection markers in test files

### Test Structure

#### Unit Tests (`test/*.test.ts`)
- **Purpose**: Fast feedback during development
- **Characteristics**: Heavily mocked, isolated, no file system side effects
- **Run with**: `npm run test:unit`
- **Speed**: ~400ms
- **Protection**: ⚠️ PROTECTED - Do not modify without user authorization

**Files:**
- `cli.test.ts` - Protected unit tests for core CLI commands
- `ci.test.ts` - Protected unit tests for CI command
- `validate.test.ts` - Protected unit tests for validate command

#### Integration Tests (`test/integration/*.integration.test.ts`)
- **Purpose**: Thorough validation of actual behavior
- **Characteristics**: Real file system operations, actual command execution
- **Run with**: `npm run test:integration`
- **Speed**: ~1s
- **Protection**: ⚠️ PROTECTED - Do not modify without explicit user override

**Files:**
- `init.integration.test.ts` - Integration tests for init command
- `remove.integration.test.ts` - Integration tests for remove command
- `validate.integration.test.ts` - Integration tests for validate command
- `ci.integration.test.ts` - Integration tests for CI command
- `install-bdd.integration.test.ts` - Integration tests for install-bdd command
- `update-knowledge.integration.test.ts` - Integration tests for update-knowledge command

> [!CAUTION]
> **Integration tests are especially critical** as they verify actual command behavior, file creation, and content validation. Modifying these tests without understanding the full impact can mask real bugs or break validation of critical functionality.

### Running Tests

```bash
# Run all tests
npm test

# Run only unit tests (fast, for CI)
npm run test:unit

# Run only integration tests (thorough)
npm run test:integration

# Watch mode
npm run test:watch
```

### User Authorization Required
Any modifications to protected test files require explicit user instruction. When in doubt, ask the user before making changes.

**For integration tests specifically**: These tests verify actual behavior and are the source of truth for what the commands should do. Changes to integration tests should only be made when:
1. User explicitly requests a change
2. User provides a "one-time override" authorization
3. Command behavior is intentionally being changed and tests need to reflect new behavior
