import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ciCommand } from "./commands/ci.js";
import fs from "fs-extra";
import path from "node:path";
import ora from "ora";

// Mock dependencies
vi.mock("fs-extra");
vi.mock("ora");

describe("biased ci", () => {
    const mockExit = vi.spyOn(process, "exit").mockImplementation(() => undefined as never);
    const mockLog = vi.spyOn(console, "log").mockImplementation(() => { });
    const mockOra = {
        start: vi.fn().mockReturnThis(),
        succeed: vi.fn(),
        fail: vi.fn(),
        info: vi.fn(),
    };

    beforeEach(() => {
        vi.resetAllMocks();
        mockOra.start.mockReturnValue(mockOra);
        (ora as any).mockReturnValue(mockOra);
        (fs.ensureDir as any).mockResolvedValue(undefined);
        (fs.writeFile as any).mockResolvedValue(undefined);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should generate workflow file when it does not exist", async () => {
        (fs.pathExists as any).mockResolvedValue(false);

        await ciCommand();

        expect(fs.ensureDir).toHaveBeenCalledWith(expect.stringContaining(".github/workflows"));
        expect(fs.writeFile).toHaveBeenCalledWith(
            expect.stringContaining("biased-eval.yml"),
            expect.stringContaining("name: BIASED Evaluation")
        );
        expect(mockOra.succeed).toHaveBeenCalledWith(expect.stringContaining("Generated"));
    });

    it("should skip generation if workflow file already exists", async () => {
        (fs.pathExists as any).mockResolvedValue(true);

        await ciCommand();

        expect(fs.writeFile).not.toHaveBeenCalled();
        expect(mockOra.info).toHaveBeenCalledWith(expect.stringContaining("already exists"));
    });

    it("should fail gracefully on error", async () => {
        (fs.pathExists as any).mockResolvedValue(false);
        (fs.writeFile as any).mockRejectedValue(new Error("Write failed"));

        await ciCommand();

        expect(mockOra.fail).toHaveBeenCalledWith(expect.stringContaining("Failed to generate"));
        expect(mockExit).toHaveBeenCalledWith(1);
    });

    it("should run silently when requested", async () => {
        (fs.pathExists as any).mockResolvedValue(false);

        await ciCommand(true);

        expect(ora).not.toHaveBeenCalled();
        expect(fs.writeFile).toHaveBeenCalled();
    });
});
