import chalk from "chalk";
import fs from "fs-extra";
import path from "node:path";
import ora from "ora";

export async function validateCommand() {
    const cwd = process.cwd();
    const spinner = ora("Validating BIASED framework structure...").start();
    const errors: string[] = [];

    // 1. Check root directory
    const biasedDir = path.join(cwd, "biased");
    if (!(await fs.pathExists(biasedDir))) {
        spinner.fail(chalk.red("Validation Failed"));
        console.log(chalk.yellow("\n⚠️  'biased/' directory not found."));
        console.log(chalk.gray("   Run 'biased init' to create the framework structure.\n"));
        process.exit(1);
    }

    // 2. Check critical files
    const criticalFiles = [
        "biased/intent/intent.md",
        "biased/behavior/behavior-spec.md",
        "biased/eval/eval-set.jsonl",
        "biased/metrics/metrics-hook.json",
        "biased/governance/risk-register.md",
    ];

    for (const file of criticalFiles) {
        if (!(await fs.pathExists(path.join(cwd, file)))) {
            errors.push(`Missing file: ${file}`);
        }
    }

    // 3. Validate JSON files
    const jsonFiles = ["biased/metrics/metrics-hook.json", "biased/eval/eval-set.jsonl"];
    for (const file of jsonFiles) {
        const filePath = path.join(cwd, file);
        if (await fs.pathExists(filePath)) {
            try {
                const content = await fs.readFile(filePath, "utf8");
                // eval-set.jsonl is JSON Lines, so we parse line by line
                if (file.endsWith(".jsonl")) {
                    const lines = content.split("\n").filter(line => line.trim() !== "");
                    lines.forEach((line, index) => {
                        try {
                            JSON.parse(line);
                        } catch (e) {
                            errors.push(`Invalid JSON in ${file} at line ${index + 1}`);
                        }
                    });
                } else {
                    JSON.parse(content);
                }
            } catch (e) {
                errors.push(`Invalid JSON in ${file}`);
            }
        }
    }

    if (errors.length > 0) {
        spinner.fail(chalk.red("Validation Failed"));
        console.log(chalk.bold("\nIssues found:"));
        errors.forEach((err) => console.log(chalk.red(`✖ ${err}`)));
        console.log(""); // newline
        process.exit(1);
    } else {
        spinner.succeed(chalk.green("Validation Passed"));
        console.log(chalk.gray("\n✨ Project structure is valid and compliant.\n"));
    }
}
