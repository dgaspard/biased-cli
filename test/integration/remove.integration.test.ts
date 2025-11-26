/**
 * ⚠️ PROTECTED INTEGRATION TEST FILE ⚠️
 * DO NOT MODIFY WITHOUT EXPLICIT USER AUTHORIZATION
 * 
 * This file contains critical integration tests that verify actual command behavior.
 * These tests are the source of truth for what the remove command should do.
 * 
 * IMPORTANT FOR AI AGENTS:
 * - DO NOT modify test assertions or expected behaviors
 * - DO NOT delete or refactor existing tests
 * - DO NOT "improve" or "optimize" tests unless asked
 * - If adding new features, create ADDITIONAL tests in a separate file
 * 
 * User Authorization Required: Any changes to this file must be explicitly
 * requested by the user or require a "one-time override" authorization.
 * 
 * Integration tests for biased remove command
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs-extra';
import path from 'node:path';
import { removeCommand } from '../../src/commands/remove.js';
import os from 'node:os';
import inquirer from 'inquirer';

// Mock inquirer for automated testing
vi.mock('inquirer');

describe('biased remove (integration)', () => {
    let testDir: string;

    beforeEach(async () => {
        testDir = path.join(os.tmpdir(), `biased-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
        await fs.ensureDir(testDir);
        process.chdir(testDir);
    });

    afterEach(async () => {
        if (testDir && await fs.pathExists(testDir)) {
            await fs.remove(testDir);
        }
        vi.clearAllMocks();
    });

    it('should remove biased directory when confirmed', async () => {
        // Create biased directory with content
        const biasedDir = path.join(testDir, 'biased');
        await fs.ensureDir(biasedDir);
        await fs.writeFile(path.join(biasedDir, 'test.txt'), 'test content');

        // Mock user confirmation
        (inquirer.prompt as any).mockResolvedValue({ confirm: true });

        await removeCommand();

        const exists = await fs.pathExists(biasedDir);
        expect(exists, 'biased directory should be removed').toBe(false);
    });

    it('should not remove directory when user cancels', async () => {
        const biasedDir = path.join(testDir, 'biased');
        await fs.ensureDir(biasedDir);
        await fs.writeFile(path.join(biasedDir, 'test.txt'), 'test content');

        // Mock user cancellation
        (inquirer.prompt as any).mockResolvedValue({ confirm: false });

        await removeCommand();

        const exists = await fs.pathExists(biasedDir);
        expect(exists, 'biased directory should still exist').toBe(true);
    });

    it('should handle non-existent biased directory gracefully', async () => {
        // No biased directory exists
        await expect(removeCommand()).resolves.not.toThrow();
    });

    it('should remove all nested content', async () => {
        const biasedDir = path.join(testDir, 'biased');
        await fs.ensureDir(path.join(biasedDir, 'intent'));
        await fs.ensureDir(path.join(biasedDir, 'behavior'));
        await fs.writeFile(path.join(biasedDir, 'intent/intent.md'), 'content');
        await fs.writeFile(path.join(biasedDir, 'behavior/spec.md'), 'content');

        (inquirer.prompt as any).mockResolvedValue({ confirm: true });

        await removeCommand();

        const exists = await fs.pathExists(biasedDir);
        expect(exists).toBe(false);
    });
});
