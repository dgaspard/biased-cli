# E2E Testing Guidelines

> [!IMPORTANT]
> **ALL TESTS MUST PASS.**

## Instructions for AI Agents and Developers

This project enforces strict regression testing standards. Please adhere to the following rules:

1.  **Maintain Test Integrity**: Do **not** modify these tests to make them pass if the application code is broken. The tests represent the source of truth for the expected user experience.
2.  **Notify on Failure**: If a change to the codebase causes these tests to fail, you **MUST** notify the user immediately. Do not silently "fix" the test to match the new (potentially broken) behavior.
3.  **User Override Required**: You are restricted from changing the logic or assertions in these tests unless the user explicitly instructs you to "override the test", "update the test expectations", or otherwise change the feature requirements.

## Running Tests

Execute the E2E test suite with the following command:

```bash
npm run test:e2e
```
