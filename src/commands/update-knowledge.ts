import fs from "fs-extra";
import path from "node:path";
import { glob } from "glob";
import chalk from "chalk";
import ora from "ora";
import mammoth from "mammoth";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");
import * as XLSX from "xlsx";
import mime from "mime-types";

// Helper to ensure directory exists
async function ensureDir(dir: string) {
    await fs.ensureDir(dir);
}

// Helper to get file hash or mtime for change detection (simplified to mtime for now)
async function getFileStats(filePath: string) {
    const stats = await fs.stat(filePath);
    return stats.mtimeMs;
}

// Converter functions
async function convertDocx(filePath: string): Promise<string> {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
}

async function convertPdf(filePath: string): Promise<string> {
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
}

async function convertExcel(filePath: string): Promise<string> {
    const workbook = XLSX.readFile(filePath);
    let markdown = "";

    for (const sheetName of workbook.SheetNames) {
        markdown += `## Sheet: ${sheetName}\n\n`;
        const worksheet = workbook.Sheets[sheetName];
        const csv = XLSX.utils.sheet_to_csv(worksheet);

        // Simple CSV to Markdown table conversion
        const lines = csv.split('\n');
        if (lines.length > 0) {
            // Header
            const header = lines[0].split(',').map(c => c.trim());
            markdown += `| ${header.join(' | ')} |\n`;
            markdown += `| ${header.map(() => '---').join(' | ')} |\n`;

            // Rows
            for (let i = 1; i < lines.length; i++) {
                if (!lines[i].trim()) continue;
                const row = lines[i].split(',').map(c => c.trim());
                markdown += `| ${row.join(' | ')} |\n`;
            }
        }
        markdown += "\n";
    }
    return markdown;
}

async function createBinaryMetadata(filePath: string, fileName: string): Promise<string> {
    const stats = await fs.stat(filePath);
    const mimeType = mime.lookup(filePath) || "application/octet-stream";

    return `# Asset: ${fileName}

> [!NOTE]
> This is a binary asset and cannot be fully converted to Markdown.

- **File Name**: ${fileName}
- **Path**: ${filePath}
- **Size**: ${(stats.size / 1024).toFixed(2)} KB
- **Type**: ${mimeType}
- **Last Modified**: ${stats.mtime.toISOString()}

Please refer to the original file for content.
`;
}

export async function updateKnowledgeCommand() {
    const cwd = process.cwd();
    const docsDir = path.join(cwd, "biased", "docs");
    const knowledgeDir = path.join(cwd, "biased", "knowledge");

    if (!(await fs.pathExists(docsDir))) {
        console.log(chalk.yellow("\n⚠️  'biased/docs' directory not found. Nothing to update.\n"));
        return;
    }

    const spinner = ora("Updating knowledge base...").start();

    try {
        await ensureDir(knowledgeDir);

        // Get all files in docs
        const files = await glob("**/*", { cwd: docsDir, nodir: true });
        let updatedCount = 0;
        let createdCount = 0;
        let skippedCount = 0;
        const processedFiles: string[] = [];

        for (const file of files) {
            const srcPath = path.join(docsDir, file);
            const destRelPath = file + ".md"; // Append .md to everything for simplicity in knowledge base
            const destPath = path.join(knowledgeDir, destRelPath);

            await ensureDir(path.dirname(destPath));
            processedFiles.push(destRelPath);

            // Check if update is needed
            let needsUpdate = true;
            if (await fs.pathExists(destPath)) {
                const srcStats = await fs.stat(srcPath);
                const destStats = await fs.stat(destPath);
                if (srcStats.mtimeMs <= destStats.mtimeMs) {
                    needsUpdate = false;
                    skippedCount++;
                }
            }

            if (needsUpdate) {
                const ext = path.extname(file).toLowerCase();
                let content = "";
                let title = path.basename(file);

                try {
                    if (ext === ".docx") {
                        content = await convertDocx(srcPath);
                    } else if (ext === ".pdf") {
                        content = await convertPdf(srcPath);
                    } else if (ext === ".xlsx" || ext === ".xls") {
                        content = await convertExcel(srcPath);
                    } else if (ext === ".md" || ext === ".txt") {
                        content = await fs.readFile(srcPath, "utf8");
                    } else {
                        // Binary/Other
                        content = await createBinaryMetadata(srcPath, path.basename(file));
                    }

                    // Wrap in frontmatter/header
                    const finalContent = `---
source_file: ${file}
last_updated: ${new Date().toISOString()}
---

# ${title}

${content}
`;
                    await fs.writeFile(destPath, finalContent);

                    if (await fs.pathExists(destPath)) {
                        updatedCount++;
                    } else {
                        createdCount++;
                    }

                } catch (err: any) {
                    console.error(chalk.red(`\nError converting ${file}: ${err.message}`));
                }
            }
        }

        // Cleanup orphans
        const knowledgeFiles = await glob("**/*.md", { cwd: knowledgeDir, nodir: true });
        let deletedCount = 0;
        for (const kFile of knowledgeFiles) {
            if (kFile === "summary.md") continue;
            if (!processedFiles.includes(kFile)) {
                await fs.remove(path.join(knowledgeDir, kFile));
                deletedCount++;
            }
        }

        // Generate Summary
        const summaryContent = `# Knowledge Base Summary

**Last Updated**: ${new Date().toISOString()}

## Statistics
- **Total Documents**: ${processedFiles.length}
- **Created**: ${createdCount}
- **Updated**: ${updatedCount}
- **Deleted**: ${deletedCount}
- **Skipped (Unchanged)**: ${skippedCount}

## Files
${processedFiles.map(f => `- [${f}](${f})`).join('\n')}
`;
        await fs.writeFile(path.join(knowledgeDir, "summary.md"), summaryContent);

        spinner.succeed(chalk.green("Knowledge base updated successfully!"));
        console.log(chalk.blue(`\nStats:`));
        console.log(`  Created: ${createdCount}`);
        console.log(`  Updated: ${updatedCount}`);
        console.log(`  Deleted: ${deletedCount}`);
        console.log(`  Skipped: ${skippedCount}`);
        console.log(chalk.gray(`\nSummary available at: biased/knowledge/summary.md\n`));

    } catch (e: any) {
        spinner.fail(chalk.red(`Failed to update knowledge base: ${e.message}`));
        process.exit(1);
    }
}
