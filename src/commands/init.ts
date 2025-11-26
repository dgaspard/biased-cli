import chalk from "chalk";
import fs from "fs-extra";
import path from "node:path";
import ora from "ora";
import inquirer from "inquirer";
import { glob } from "glob";
import { fileURLToPath } from "node:url";
import { updateKnowledgeCommand } from "./update-knowledge.js";
import { ciCommand } from "./ci.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function copyTemplate(templateName: string, dest: string, vars: Record<string, string>) {
    // Navigate up from src/commands/init.ts to templates/
    const templateDir = path.join(__dirname, "..", "..", "templates", templateName);
    if (!(await fs.pathExists(templateDir))) {
        throw new Error(`Template not found: ${templateName}`);
    }
    await fs.copy(templateDir, dest, {
        filter: (src) => !src.endsWith(".keep")
    });

    // Copy shared common files (e.g., biased framework)
    const commonDir = path.join(__dirname, "..", "..", "templates", "_common");
    if (await fs.pathExists(commonDir)) {
        await fs.copy(commonDir, dest, {
            filter: (src) => !src.endsWith(".keep")
        });
    }

    // simple token replacement in text files
    const textExt = [".md", ".json", ".yml", ".yaml", ".ts", ".js", ".cjs", ".mjs", ".txt", ".feature", ".java", ".cs", ".py", ".xml", ".csproj", ".properties", ".jsx"];
    const files = await glob("**/*", { cwd: dest, dot: true, nodir: true });
    for (const f of files) {
        const full = path.join(dest, f);
        if (textExt.includes(path.extname(f))) {
            let c = await fs.readFile(full, "utf8");
            for (const [k, v] of Object.entries(vars)) {
                c = c.replaceAll(`{{${k}}}`, v);
            }
            await fs.writeFile(full, c);
        }
    }
}

export async function initCommand(opts: { name?: string }) {
    const cwd = process.cwd();
    const existing = await fs.readdir(cwd);

    // Check if biased folder already exists
    if (existing.includes("biased")) {
        console.log(chalk.yellow("\n⚠️  BIASED framework already exists in this directory.\n"));
        const { proceed } = await inquirer.prompt([{
            type: "confirm",
            name: "proceed",
            message: "Overwrite existing BIASED framework?",
            default: false,
        }]);
        if (!proceed) return;
    }

    const name = opts.name ?? path.basename(cwd);
    const spinner = ora(`Adding BIASED framework to '${name}'`).start();
    try {
        await copyTemplate("_common", cwd, { PROJECT_NAME: name });
        spinner.succeed(chalk.green("BIASED framework added successfully!"));

        // Auto-update knowledge base
        console.log(chalk.blue("\nGenerating initial knowledge base..."));
        await updateKnowledgeCommand();

        // Auto-generate CI workflow
        console.log(chalk.blue("\nSetting up CI/CD..."));
        await ciCommand(true);

        console.log(chalk.bold.blue("\n📚 BIASED Framework Structure:\n"));
        console.log(chalk.cyan("  biased/intent/         - Define project intent and goals"));
        console.log(chalk.cyan("  biased/behavior/       - Specify expected behaviors"));
        console.log(chalk.cyan("  biased/eval/           - Evaluation sets and metrics"));
        console.log(chalk.cyan("  biased/architecture/   - Architecture decisions"));
        console.log(chalk.cyan("  biased/governance/     - Governance and risk management"));
        console.log(chalk.cyan("  biased/adoption/       - Adoption metrics and workflows"));
        console.log(chalk.cyan("  biased/docs/           - Business documentation"));
        console.log(chalk.cyan("  biased/metrics/        - Metrics tracking"));
        console.log(chalk.cyan("  biased/knowledge/      - AI-ready knowledge base (Auto-generated)\n"));
        console.log(chalk.gray("💡 Start by editing biased/intent/intent.md"));
        console.log(chalk.gray("💡 Run 'biased install-bdd' to add BDD testing support\n"));
    } catch (e: any) {
        spinner.fail(e.message);
        process.exit(1);
    }
}
