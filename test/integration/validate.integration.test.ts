/**
 * ⚠️ PROTECTED INTEGRATION TEST FILE ⚠️
 * DO NOT MODIFY WITHOUT EXPLICIT USER AUTHORIZATION
 * 
 * This file contains critical integration tests that verify actual command behavior.
 * These tests are the source of truth for what the validate command should do.
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
 * Integration tests for biased validate command
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs-extra';
import path from 'node:path';
import { validateCommand } from '../../src/commands/validate.js';
import os from 'node:os';

describe('biased validate (integration)', () => {
    let testDir: string;
    const mockExit = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);

    beforeEach(async () => {
        testDir = path.join(os.tmpdir(), `biased-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
        await fs.ensureDir(testDir);
        process.chdir(testDir);
        mockExit.mockClear();
    });

    afterEach(async () => {
        if (testDir && await fs.pathExists(testDir)) {
            await fs.remove(testDir);
        }
    });

    it('should pass validation for complete project structure', async () => {
        // Create complete biased structure
        await fs.ensureDir(path.join(testDir, 'biased/intent'));
        await fs.ensureDir(path.join(testDir, 'biased/behavior'));
        await fs.ensureDir(path.join(testDir, 'biased/eval'));
        await fs.ensureDir(path.join(testDir, 'biased/governance'));
        await fs.ensureDir(path.join(testDir, 'biased/metrics'));

        await fs.writeFile(path.join(testDir, 'biased/intent/intent.md'), '# Intent');
        await fs.writeFile(path.join(testDir, 'biased/behavior/behavior-spec.md'), '# Behavior');
        await fs.writeFile(path.join(testDir, 'biased/eval/eval-set.jsonl'), '{"test": true}');
        await fs.writeFile(path.join(testDir, 'biased/governance/risk-register.md'), '# Risk Register');
        await fs.writeFile(path.join(testDir, 'biased/metrics/metrics-hook.json'), '{}');

        await validateCommand();

        expect(mockExit).not.toHaveBeenCalledWith(1);
    });

    it('should fail when biased directory is missing', async () => {
        await validateCommand();

        expect(mockExit).toHaveBeenCalledWith(1);
    });

    it('should fail when intent file is missing', async () => {
        await fs.ensureDir(path.join(testDir, 'biased/behavior'));
        await fs.ensureDir(path.join(testDir, 'biased/eval'));
        await fs.ensureDir(path.join(testDir, 'biased/governance'));

        await fs.writeFile(path.join(testDir, 'biased/behavior/behavior-spec.md'), '# Behavior');
        await fs.writeFile(path.join(testDir, 'biased/eval/eval-set.jsonl'), '{"test": true}');
        await fs.writeFile(path.join(testDir, 'biased/governance/governance-card.md'), '# Governance');

        await validateCommand();

        expect(mockExit).toHaveBeenCalledWith(1);
    });

    it('should fail when behavior file is missing', async () => {
        await fs.ensureDir(path.join(testDir, 'biased/intent'));
        await fs.ensureDir(path.join(testDir, 'biased/eval'));
        await fs.ensureDir(path.join(testDir, 'biased/governance'));

        await fs.writeFile(path.join(testDir, 'biased/intent/intent.md'), '# Intent');
        await fs.writeFile(path.join(testDir, 'biased/eval/eval-set.jsonl'), '{"test": true}');
        await fs.writeFile(path.join(testDir, 'biased/governance/governance-card.md'), '# Governance');

        await validateCommand();

        expect(mockExit).toHaveBeenCalledWith(1);
    });

    it('should fail when eval file is missing', async () => {
        await fs.ensureDir(path.join(testDir, 'biased/intent'));
        await fs.ensureDir(path.join(testDir, 'biased/behavior'));
        await fs.ensureDir(path.join(testDir, 'biased/governance'));

        await fs.writeFile(path.join(testDir, 'biased/intent/intent.md'), '# Intent');
        await fs.writeFile(path.join(testDir, 'biased/behavior/behavior-spec.md'), '# Behavior');
        await fs.writeFile(path.join(testDir, 'biased/governance/governance-card.md'), '# Governance');

        await validateCommand();

        expect(mockExit).toHaveBeenCalledWith(1);
    });

    it('should fail when governance file is missing', async () => {
        await fs.ensureDir(path.join(testDir, 'biased/intent'));
        await fs.ensureDir(path.join(testDir, 'biased/behavior'));
        await fs.ensureDir(path.join(testDir, 'biased/eval'));

        await fs.writeFile(path.join(testDir, 'biased/intent/intent.md'), '# Intent');
        await fs.writeFile(path.join(testDir, 'biased/behavior/behavior-spec.md'), '# Behavior');
        await fs.writeFile(path.join(testDir, 'biased/eval/eval-set.jsonl'), '{"test": true}');

        await validateCommand();

        expect(mockExit).toHaveBeenCalledWith(1);
    });

    it('should fail when eval-set.jsonl has invalid JSON', async () => {
        await fs.ensureDir(path.join(testDir, 'biased/intent'));
        await fs.ensureDir(path.join(testDir, 'biased/behavior'));
        await fs.ensureDir(path.join(testDir, 'biased/eval'));
        await fs.ensureDir(path.join(testDir, 'biased/governance'));

        await fs.writeFile(path.join(testDir, 'biased/intent/intent.md'), '# Intent');
        await fs.writeFile(path.join(testDir, 'biased/behavior/behavior-spec.md'), '# Behavior');
        await fs.writeFile(path.join(testDir, 'biased/eval/eval-set.jsonl'), 'invalid json');
        await fs.writeFile(path.join(testDir, 'biased/governance/governance-card.md'), '# Governance');

        await validateCommand();

        expect(mockExit).toHaveBeenCalledWith(1);
    });

    it('should fail when metrics-hook.json has invalid JSON', async () => {
        await fs.ensureDir(path.join(testDir, 'biased/intent'));
        await fs.ensureDir(path.join(testDir, 'biased/behavior'));
        await fs.ensureDir(path.join(testDir, 'biased/eval'));
        await fs.ensureDir(path.join(testDir, 'biased/governance'));
        await fs.ensureDir(path.join(testDir, 'biased/metrics'));

        await fs.writeFile(path.join(testDir, 'biased/intent/intent.md'), '# Intent');
        await fs.writeFile(path.join(testDir, 'biased/behavior/behavior-spec.md'), '# Behavior');
        await fs.writeFile(path.join(testDir, 'biased/eval/eval-set.jsonl'), '{"test": true}');
        await fs.writeFile(path.join(testDir, 'biased/governance/governance-card.md'), '# Governance');
        await fs.writeFile(path.join(testDir, 'biased/metrics/metrics-hook.json'), '{invalid}');

        await validateCommand();

        expect(mockExit).toHaveBeenCalledWith(1);
    });
});
