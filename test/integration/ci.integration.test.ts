/**
 * ⚠️ PROTECTED INTEGRATION TEST FILE ⚠️
 * DO NOT MODIFY WITHOUT EXPLICIT USER AUTHORIZATION
 * 
 * This file contains critical integration tests that verify actual command behavior.
 * These tests are the source of truth for what the ci command should do.
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
 * Integration tests for biased ci command
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'node:path';
import { ciCommand } from '../../src/commands/ci.js';
import os from 'node:os';

describe('biased ci (integration)', () => {
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
    });

    it('should create .github/workflows directory', async () => {
        await ciCommand();

        const workflowsDir = path.join(testDir, '.github/workflows');
        const exists = await fs.pathExists(workflowsDir);
        expect(exists, '.github/workflows directory should be created').toBe(true);
    });

    it('should create biased-eval.yml workflow file', async () => {
        await ciCommand();

        const workflowFile = path.join(testDir, '.github/workflows/biased-eval.yml');
        const exists = await fs.pathExists(workflowFile);
        expect(exists, 'biased-eval.yml should be created').toBe(true);
    });

    it('should generate valid YAML workflow', async () => {
        await ciCommand();

        const workflowFile = path.join(testDir, '.github/workflows/biased-eval.yml');
        const content = await fs.readFile(workflowFile, 'utf8');

        // Check for essential workflow components
        expect(content).toContain('name: BIASED Evaluation');
        expect(content).toContain('on:');
        expect(content).toContain('jobs:');
        expect(content).toContain('steps:');
    });

    it('should include biased validate step', async () => {
        await ciCommand();

        const workflowFile = path.join(testDir, '.github/workflows/biased-eval.yml');
        const content = await fs.readFile(workflowFile, 'utf8');

        expect(content).toContain('biased validate');
    });

    it('should include checkout step', async () => {
        await ciCommand();

        const workflowFile = path.join(testDir, '.github/workflows/biased-eval.yml');
        const content = await fs.readFile(workflowFile, 'utf8');

        expect(content).toContain('actions/checkout');
    });

    it('should not overwrite existing workflow file', async () => {
        const workflowFile = path.join(testDir, '.github/workflows/biased-eval.yml');
        await fs.ensureDir(path.join(testDir, '.github/workflows'));
        await fs.writeFile(workflowFile, 'existing content');

        await ciCommand();

        const content = await fs.readFile(workflowFile, 'utf8');
        expect(content).toBe('existing content');
    });

    it('should work in silent mode', async () => {
        await ciCommand(true);

        const workflowFile = path.join(testDir, '.github/workflows/biased-eval.yml');
        const exists = await fs.pathExists(workflowFile);
        expect(exists).toBe(true);
    });
});
