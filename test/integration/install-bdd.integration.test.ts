/**
 * ⚠️ PROTECTED INTEGRATION TEST FILE ⚠️
 * DO NOT MODIFY WITHOUT EXPLICIT USER AUTHORIZATION
 * 
 * This file contains critical integration tests that verify actual command behavior.
 * These tests are the source of truth for what the install-bdd command should do.
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
 * Integration tests for biased install-bdd command
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs-extra';
import path from 'node:path';
import { installBddCommand } from '../../src/commands/install-bdd.js';
import os from 'node:os';
import { execSync } from 'node:child_process';

// Mock execSync to avoid actual package installations
vi.mock('node:child_process');

describe('biased install-bdd (integration)', () => {
    let testDir: string;

    beforeEach(async () => {
        testDir = path.join(os.tmpdir(), `biased-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
        await fs.ensureDir(testDir);
        process.chdir(testDir);
        vi.clearAllMocks();
        (execSync as any).mockReturnValue('');
    });

    afterEach(async () => {
        if (testDir && await fs.pathExists(testDir)) {
            await fs.remove(testDir);
        }
    });

    it('should detect Node.js project from package.json', async () => {
        await fs.writeJson(path.join(testDir, 'package.json'), { name: 'test' });

        await installBddCommand();

        expect(execSync).toHaveBeenCalledWith(
            expect.stringContaining('cucumber'),
            expect.any(Object)
        );
    });

    it('should detect Python project from requirements.txt', async () => {
        await fs.writeFile(path.join(testDir, 'requirements.txt'), 'pytest');

        await installBddCommand();

        expect(execSync).toHaveBeenCalledWith(
            expect.stringContaining('behave'),
            expect.any(Object)
        );
    });

    it('should detect Python project from setup.py', async () => {
        await fs.writeFile(path.join(testDir, 'setup.py'), 'from setuptools import setup');

        await installBddCommand();

        expect(execSync).toHaveBeenCalledWith(
            expect.stringContaining('behave'),
            expect.any(Object)
        );
    });

    it('should detect Python project from pyproject.toml', async () => {
        await fs.writeFile(path.join(testDir, 'pyproject.toml'), '[tool.poetry]');

        await installBddCommand();

        expect(execSync).toHaveBeenCalledWith(
            expect.stringContaining('behave'),
            expect.any(Object)
        );
    });

    it('should detect .NET project from .csproj file', async () => {
        await fs.writeFile(path.join(testDir, 'test.csproj'), '<Project></Project>');

        await installBddCommand();

        expect(execSync).toHaveBeenCalledWith(
            expect.stringContaining('SpecFlow'),
            expect.any(Object)
        );
    });

    it('should detect Java project from pom.xml', async () => {
        await fs.writeFile(path.join(testDir, 'pom.xml'), '<project></project>');

        await installBddCommand();

        // Java projects get instructions, not automatic installation
        expect(execSync).not.toHaveBeenCalled();
    });

    it('should detect Java project from build.gradle', async () => {
        await fs.writeFile(path.join(testDir, 'build.gradle'), 'plugins {}');

        await installBddCommand();

        expect(execSync).not.toHaveBeenCalled();
    });

    it('should detect Java project from build.gradle.kts', async () => {
        await fs.writeFile(path.join(testDir, 'build.gradle.kts'), 'plugins {}');

        await installBddCommand();

        expect(execSync).not.toHaveBeenCalled();
    });

    it('should handle unknown project types gracefully', async () => {
        // No project files
        await expect(installBddCommand()).resolves.not.toThrow();
    });
});
