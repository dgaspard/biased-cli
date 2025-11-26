/**
 * ⚠️ PROTECTED INTEGRATION TEST FILE ⚠️
 * DO NOT MODIFY WITHOUT EXPLICIT USER AUTHORIZATION
 * 
 * This file contains critical integration tests that verify actual command behavior.
 * These tests are the source of truth for what the updateKnowledge command should do.
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
 * Integration tests for biased updateKnowledge command
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'node:path';
import { updateKnowledgeCommand } from '../../src/commands/update-knowledge.js';
import os from 'node:os';

describe('biased updateKnowledge (integration)', () => {
    let testDir: string;

    beforeEach(async () => {
        testDir = path.join(os.tmpdir(), `biased-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
        await fs.ensureDir(testDir);
        await fs.ensureDir(path.join(testDir, 'biased/docs'));
        process.chdir(testDir);
    });

    afterEach(async () => {
        if (testDir && await fs.pathExists(testDir)) {
            await fs.remove(testDir);
        }
    });

    it('should create knowledge directory', async () => {
        await updateKnowledgeCommand();

        const knowledgeDir = path.join(testDir, 'biased/knowledge');
        const exists = await fs.pathExists(knowledgeDir);
        expect(exists, 'knowledge directory should be created').toBe(true);
    });

    it('should generate summary.md', async () => {
        await updateKnowledgeCommand();

        const summaryPath = path.join(testDir, 'biased/knowledge/summary.md');
        const exists = await fs.pathExists(summaryPath);
        expect(exists, 'summary.md should be created').toBe(true);

        const content = await fs.readFile(summaryPath, 'utf8');
        expect(content).toContain('Knowledge Base Summary');
        expect(content).toContain('Last Updated');
    });

    it('should convert .md files', async () => {
        const mdContent = '# Test Document\n\nThis is a test.';
        await fs.writeFile(path.join(testDir, 'biased/docs/test.md'), mdContent);

        await updateKnowledgeCommand();

        const convertedPath = path.join(testDir, 'biased/knowledge/test.md');
        const exists = await fs.pathExists(convertedPath);
        expect(exists, 'converted .md file should exist').toBe(true);

        const content = await fs.readFile(convertedPath, 'utf8');
        expect(content).toContain('Test Document');
        expect(content).toContain('source_file: test.md');
    });

    it('should convert .txt files to markdown', async () => {
        await fs.writeFile(path.join(testDir, 'biased/docs/notes.txt'), 'Plain text notes');

        await updateKnowledgeCommand();

        const convertedPath = path.join(testDir, 'biased/knowledge/notes.md');
        const exists = await fs.pathExists(convertedPath);
        expect(exists, 'converted .txt file should exist as .md').toBe(true);

        const content = await fs.readFile(convertedPath, 'utf8');
        expect(content).toContain('Plain text notes');
    });

    it('should handle binary files with metadata', async () => {
        await fs.writeFile(path.join(testDir, 'biased/docs/image.png'), Buffer.from('fake png'));

        await updateKnowledgeCommand();

        const metadataPath = path.join(testDir, 'biased/knowledge/image.png.md');
        const exists = await fs.pathExists(metadataPath);
        expect(exists, 'metadata file for binary should exist').toBe(true);

        const content = await fs.readFile(metadataPath, 'utf8');
        expect(content).toContain('Asset: image.png');
        expect(content).toContain('binary asset');
    });

    it('should preserve directory structure', async () => {
        await fs.ensureDir(path.join(testDir, 'biased/docs/subfolder'));
        await fs.writeFile(path.join(testDir, 'biased/docs/subfolder/doc.md'), '# Subfolder Doc');

        await updateKnowledgeCommand();

        const convertedPath = path.join(testDir, 'biased/knowledge/subfolder/doc.md');
        const exists = await fs.pathExists(convertedPath);
        expect(exists, 'directory structure should be preserved').toBe(true);
    });

    it('should skip unchanged files', async () => {
        await fs.writeFile(path.join(testDir, 'biased/docs/test.md'), '# Test');

        // First run
        await updateKnowledgeCommand();
        const firstStats = await fs.stat(path.join(testDir, 'biased/knowledge/test.md'));

        // Wait a bit
        await new Promise(resolve => setTimeout(resolve, 100));

        // Second run without changes
        await updateKnowledgeCommand();
        const secondStats = await fs.stat(path.join(testDir, 'biased/knowledge/test.md'));

        // File should not be updated (same mtime)
        expect(secondStats.mtimeMs).toBe(firstStats.mtimeMs);
    });

    it('should update changed files', async () => {
        await fs.writeFile(path.join(testDir, 'biased/docs/test.md'), '# Test v1');

        // First run
        await updateKnowledgeCommand();

        // Wait and modify source
        await new Promise(resolve => setTimeout(resolve, 100));
        await fs.writeFile(path.join(testDir, 'biased/docs/test.md'), '# Test v2');

        // Second run
        await updateKnowledgeCommand();

        const content = await fs.readFile(path.join(testDir, 'biased/knowledge/test.md'), 'utf8');
        expect(content).toContain('Test v2');
    });

    it('should clean up orphaned files', async () => {
        // Create a file in knowledge that doesn't exist in docs
        await fs.ensureDir(path.join(testDir, 'biased/knowledge'));
        await fs.writeFile(path.join(testDir, 'biased/knowledge/orphan.md'), '# Orphan');

        await updateKnowledgeCommand();

        const orphanExists = await fs.pathExists(path.join(testDir, 'biased/knowledge/orphan.md'));
        expect(orphanExists, 'orphaned files should be removed').toBe(false);
    });

    it('should handle missing docs directory gracefully', async () => {
        await fs.remove(path.join(testDir, 'biased/docs'));

        await expect(updateKnowledgeCommand()).resolves.not.toThrow();
    });
});
