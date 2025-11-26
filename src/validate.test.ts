import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { validateCommand } from "./commands/validate.js";
import fs from "fs-extra";
import path from "node:path";
import ora from "ora";

// Mock dependencies
vi.mock("fs-extra");
vi.mock("ora");

describe("biased validate", () => {
    const mockExit = vi.spyOn(process, "exit").mockImplementation(() => undefined as never);
    const mockLog = vi.spyOn(console, "log").mockImplementation(() => { });
    const mockOra = {
        start: vi.fn().mockReturnThis(),
        succeed: vi.fn(),
        fail: vi.fn(),
    };

    beforeEach(() => {
        vi.resetAllMocks();
        mockOra.start.mockReturnValue(mockOra);
        (ora as any).mockReturnValue(mockOra);
        // Default: everything exists
        (fs.pathExists as any).mockResolvedValue(true);
        // Default: valid JSON
        (fs.readFile as any).mockResolvedValue('{"valid": "json"}');
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should pass when project structure is valid", async () => {
        await validateCommand();

        expect(mockOra.succeed).toHaveBeenCalledWith(expect.stringContaining("Validation Passed"));
        expect(mockExit).not.toHaveBeenCalled();
    });

    it("should fail when biased directory is missing", async () => {
        // Mock biased dir missing
        (fs.pathExists as any).mockImplementation((p: string) => {
            return !p.endsWith("biased");
        });

        await validateCommand();

        expect(mockOra.fail).toHaveBeenCalledWith(expect.stringContaining("Validation Failed"));
        expect(mockLog).toHaveBeenCalledWith(expect.stringContaining("directory not found"));
        expect(mockExit).toHaveBeenCalledWith(1);
    });

    it("should fail when critical files are missing", async () => {
        // Mock intent.md missing
        (fs.pathExists as any).mockImplementation((p: string) => {
            return !p.endsWith("intent.md");
        });

        await validateCommand();

        expect(mockOra.fail).toHaveBeenCalledWith(expect.stringContaining("Validation Failed"));
        expect(mockLog).toHaveBeenCalledWith(expect.stringContaining("Missing file: biased/intent/intent.md"));
        expect(mockExit).toHaveBeenCalledWith(1);
    });

    it("should fail when JSON files are invalid", async () => {
        // Mock invalid JSON
        (fs.readFile as any).mockResolvedValue('{"invalid": json}');

        await validateCommand();

        expect(mockOra.fail).toHaveBeenCalledWith(expect.stringContaining("Validation Failed"));
        expect(mockLog).toHaveBeenCalledWith(expect.stringContaining("Invalid JSON"));
        expect(mockExit).toHaveBeenCalledWith(1);
    });

    it("should fail when JSONL files are invalid", async () => {
        // Mock invalid JSONL
        (fs.readFile as any).mockImplementation((p: string) => {
            if (p.endsWith("eval-set.jsonl")) {
                return '{"valid": "line"}\n{invalid line}';
            }
            return '{}';
        });

        await validateCommand();

        expect(mockOra.fail).toHaveBeenCalledWith(expect.stringContaining("Validation Failed"));
        expect(mockLog).toHaveBeenCalledWith(expect.stringContaining("Invalid JSON in biased/eval/eval-set.jsonl"));
        expect(mockExit).toHaveBeenCalledWith(1);
    });
});
