/**
 * ⚠️ PROTECTED TEST FILE - DO NOT MODIFY WITHOUT EXPLICIT AUTHORIZATION ⚠️
 * 
 * This file contains critical unit tests for the biased-cli commands.
 * These tests ensure the core functionality remains intact across changes.
 * 
 * IMPORTANT FOR AI AGENTS:
 * - DO NOT modify, delete, or refactor these tests without explicit user instruction
 * - DO NOT change test assertions or expected behaviors
 * - DO NOT "improve" or "optimize" these tests unless asked
 * - If adding new features, create ADDITIONAL tests in a separate file
 * 
 * User Authorization Required: Any changes to this file must be explicitly 
 * requested by the user. Do not make assumptions or "helpful" modifications.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import ora from 'ora';
import { execSync } from 'node:child_process';
import { glob } from 'glob';

// Mock all dependencies before importing commands
vi.mock('fs-extra');
vi.mock('inquirer');
vi.mock('ora');
vi.mock('node:child_process');
vi.mock('glob');

// Mock the command dependencies
vi.mock('../src/commands/update-knowledge.js', () => ({
    updateKnowledgeCommand: vi.fn().mockResolvedValue(undefined)
}));
vi.mock('../src/commands/ci.js', () => ({
    ciCommand: vi.fn().mockResolvedValue(undefined)
}));

// Import commands after mocks are set up
import { initCommand } from '../src/commands/init.js';
import { removeCommand } from '../src/commands/remove.js';
import { updateKnowledgeCommand } from '../src/commands/update-knowledge.js';
import { installBddCommand } from '../src/commands/install-bdd.js';
import { ciCommand } from '../src/commands/ci.js';

/**
 * TEST SUITE: biased init command
 * Tests the initialization of BIASED framework in a project
 */
describe('biased init', () => {
    const mockLog = vi.spyOn(console, 'log').mockImplementation(() => { });
    const mockOra = {
        start: vi.fn().mockReturnThis(),
        succeed: vi.fn(),
        fail: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockOra.start.mockReturnValue(mockOra);
        (ora as any).mockReturnValue(mockOra);
        (fs.readdir as any).mockResolvedValue([]);
        (fs.pathExists as any).mockResolvedValue(true);
        (fs.copy as any).mockResolvedValue(undefined);
        (fs.readFile as any).mockResolvedValue('content');
        (fs.writeFile as any).mockResolvedValue(undefined);
        (fs.ensureDir as any).mockResolvedValue(undefined);
        (inquirer.prompt as any).mockResolvedValue({ proceed: true });
        (glob as any).mockResolvedValue([]);
    });

    it('should create biased directory structure', async () => {
        await initCommand({ name: 'test-project' });

        expect(fs.copy).toHaveBeenCalled();
        expect(mockOra.succeed).toHaveBeenCalled();
    });

    it('should create required documentation files', async () => {
        await initCommand({ name: 'test-project' });

        expect(fs.copy).toHaveBeenCalled();
        expect(mockOra.succeed).toHaveBeenCalled();
    });

    it('should auto-generate knowledge base during init', async () => {
        await initCommand({ name: 'test-project' });

        expect(mockOra.succeed).toHaveBeenCalled();
        expect(updateKnowledgeCommand).toHaveBeenCalled();
    });

    it('should prompt when biased directory already exists', async () => {
        (fs.readdir as any).mockResolvedValue(['biased']);

        await initCommand({ name: 'test-project' });

        expect(inquirer.prompt).toHaveBeenCalled();
    });

    it('should auto-generate CI workflow during init', async () => {
        await initCommand({ name: 'test-project' });

        expect(ciCommand).toHaveBeenCalled();
    });
});

/**
 * TEST SUITE: biased remove command  
 * Tests the removal of BIASED framework from a project
 */
describe('biased remove', () => {
    const mockLog = vi.spyOn(console, 'log').mockImplementation(() => { });
    const mockOra = {
        start: vi.fn().mockReturnThis(),
        succeed: vi.fn(),
        fail: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockOra.start.mockReturnValue(mockOra);
        (ora as any).mockReturnValue(mockOra);
        (fs.pathExists as any).mockResolvedValue(true);
        (fs.remove as any).mockResolvedValue(undefined);
        (inquirer.prompt as any).mockResolvedValue({ confirm: true });
    });

    it('should detect when biased directory does not exist', async () => {
        (fs.pathExists as any).mockResolvedValue(false);

        await removeCommand();

        // When directory doesn't exist, command returns early without removing
        expect(fs.remove).not.toHaveBeenCalled();
    });

    it('should require confirmation before removing', async () => {
        await removeCommand();

        expect(inquirer.prompt).toHaveBeenCalled();
        expect(fs.remove).toHaveBeenCalled();
    });
});

/**
 * TEST SUITE: biased install-bdd command
 * Tests the BDD dependency installation for different project types
 */
describe('biased install-bdd', () => {
    const mockLog = vi.spyOn(console, 'log').mockImplementation(() => { });
    const mockOra = {
        start: vi.fn().mockReturnThis(),
        succeed: vi.fn(),
        fail: vi.fn(),
        info: vi.fn(),
        text: '',
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockOra.start.mockReturnValue(mockOra);
        (ora as any).mockReturnValue(mockOra);
        (fs.pathExists as any).mockResolvedValue(false);
        (execSync as any).mockReturnValue('');
        (glob as any).mockResolvedValue([]);
    });

    it('should detect Node.js projects', async () => {
        (fs.pathExists as any).mockImplementation((p: string) => {
            return Promise.resolve(p.endsWith('package.json'));
        });

        await installBddCommand();

        expect(execSync).toHaveBeenCalledWith(
            expect.stringContaining('cucumber'),
            expect.any(Object)
        );
        expect(mockOra.succeed).toHaveBeenCalled();
    });

    it('should detect Python projects', async () => {
        (fs.pathExists as any).mockImplementation((p: string) => {
            return Promise.resolve(p.endsWith('requirements.txt'));
        });

        await installBddCommand();

        expect(execSync).toHaveBeenCalledWith(
            expect.stringContaining('behave'),
            expect.any(Object)
        );
    });

    it('should detect .NET projects', async () => {
        (glob as any).mockResolvedValue(['test.csproj']);

        await installBddCommand();

        expect(execSync).toHaveBeenCalledWith(
            expect.stringContaining('SpecFlow'),
            expect.any(Object)
        );
    });

    it('should detect Java projects', async () => {
        (fs.pathExists as any).mockImplementation((p: string) => {
            return Promise.resolve(p.endsWith('pom.xml'));
        });

        await installBddCommand();

        expect(mockOra.info).toHaveBeenCalledWith(expect.stringContaining('Java'));
        expect(mockLog).toHaveBeenCalledWith(expect.stringContaining('Maven'));
    });
});
