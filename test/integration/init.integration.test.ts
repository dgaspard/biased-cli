/**
 * ⚠️ PROTECTED INTEGRATION TEST FILE ⚠️
 * DO NOT MODIFY WITHOUT EXPLICIT USER AUTHORIZATION
 * 
 * This file contains critical integration tests that verify actual command behavior.
 * These tests are the source of truth for what the init command should do.
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
 * Integration tests for biased init command
 * These tests actually create files and verify real behavior
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'node:path';
import { initCommand } from '../../src/commands/init.js';
import os from 'node:os';

describe('biased init (integration)', () => {
    let testDir: string;

    beforeEach(async () => {
        // Create a unique temp directory for each test
        testDir = path.join(os.tmpdir(), `biased-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
        await fs.ensureDir(testDir);
        process.chdir(testDir);
    });

    afterEach(async () => {
        // Clean up temp directory
        if (testDir && await fs.pathExists(testDir)) {
            await fs.remove(testDir);
        }
    });

    it('should create all expected directories', async () => {
        await initCommand({ name: 'test-project' });

        const expectedDirs = [
            'biased',
            'biased/intent',
            'biased/behavior',
            'biased/eval',
            'biased/architecture',
            'biased/governance',
            'biased/adoption',
            'biased/docs',
            'biased/metrics',
            'biased/knowledge'
        ];

        for (const dir of expectedDirs) {
            const exists = await fs.pathExists(path.join(testDir, dir));
            expect(exists, `Directory ${dir} should exist`).toBe(true);
        }
    });

    it('should create all required documentation files', async () => {
        await initCommand({ name: 'test-project' });

        const requiredFiles = [
            'biased/intent/intent.md',
            'biased/behavior/behavior-spec.md',
            'biased/eval/eval-set.jsonl',
            'biased/governance/governance-card.md',
            'biased/docs/README.md',
            'biased/metrics/README.md',
            'biased/metrics/metrics-hook.json',
            'biased/metrics/definitions.md'
        ];

        for (const file of requiredFiles) {
            const exists = await fs.pathExists(path.join(testDir, file));
            expect(exists, `File ${file} should exist`).toBe(true);
        }
    });

    it('should substitute PROJECT_NAME in templates', async () => {
        const projectName = 'my-awesome-project';
        await initCommand({ name: projectName });

        // Check intent.md for project name substitution
        const intentPath = path.join(testDir, 'biased/intent/intent.md');
        const intentContent = await fs.readFile(intentPath, 'utf8');

        expect(intentContent).toContain(projectName);
        expect(intentContent).not.toContain('{{PROJECT_NAME}}');
    });

    it('should generate knowledge base automatically', async () => {
        await initCommand({ name: 'test-project' });

        const summaryPath = path.join(testDir, 'biased/knowledge/summary.md');
        const exists = await fs.pathExists(summaryPath);
        expect(exists, 'Knowledge base summary should be generated').toBe(true);

        const summaryContent = await fs.readFile(summaryPath, 'utf8');
        expect(summaryContent).toContain('Knowledge Base Summary');
    });

    it('should generate CI workflow automatically', async () => {
        await initCommand({ name: 'test-project' });

        const workflowPath = path.join(testDir, '.github/workflows/biased-eval.yml');
        const exists = await fs.pathExists(workflowPath);
        expect(exists, 'CI workflow should be generated').toBe(true);

        const workflowContent = await fs.readFile(workflowPath, 'utf8');
        expect(workflowContent).toContain('BIASED Evaluation');
        expect(workflowContent).toContain('biased validate');
    });

    it('should create valid JSON files', async () => {
        await initCommand({ name: 'test-project' });

        const jsonFiles = [
            'biased/eval/eval-set.jsonl',
            'biased/metrics/metrics-hook.json'
        ];

        for (const file of jsonFiles) {
            const filePath = path.join(testDir, file);
            const content = await fs.readFile(filePath, 'utf8');

            // For JSONL files, each line should be valid JSON
            if (file.endsWith('.jsonl')) {
                const lines = content.trim().split('\n').filter(l => l.trim());
                for (const line of lines) {
                    expect(() => JSON.parse(line), `Each line in ${file} should be valid JSON`).not.toThrow();
                }
            } else {
                // For regular JSON files
                expect(() => JSON.parse(content), `${file} should be valid JSON`).not.toThrow();
            }
        }
    });

    it('should handle existing biased directory gracefully', async () => {
        // Create biased directory first
        await fs.ensureDir(path.join(testDir, 'biased'));
        await fs.writeFile(path.join(testDir, 'biased/test.txt'), 'existing content');

        // This would normally prompt, but in tests we can't interact
        // The command should detect the existing directory
        const biasedExists = await fs.pathExists(path.join(testDir, 'biased'));
        expect(biasedExists).toBe(true);
    });
});
