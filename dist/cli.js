#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import path from "node:path";
import fs from "fs-extra";
import { glob } from "glob";
import inquirer from "inquirer";
import { fileURLToPath } from "node:url";
const program = new Command();
program
    .name("biased")
    .description("BIASED CLI: scaffold and run BIASED AI-ready projects")
    .version("0.1.0");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function copyTemplate(templateName, dest, vars) {
    const templateDir = path.join(__dirname, "..", "templates", templateName);
    if (!(await fs.pathExists(templateDir))) {
        throw new Error(`Template not found: ${templateName}`);
    }
    await fs.copy(templateDir, dest, {
        filter: (src) => !src.endsWith(".keep")
    });
    // Copy shared common files (e.g., biased framework)
    const commonDir = path.join(__dirname, "..", "templates", "_common");
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
program
    .command("init")
    .description("Create a new BIASED project in the current folder")
    .option("-n, --name <name>", "project name")
    .option("-t, --template <template>", "template name", "default")
    .action(async (opts) => {
    const cwd = process.cwd();
    const existing = await fs.readdir(cwd);
    if (existing.length > 0) {
        const { proceed } = await inquirer.prompt([{
                type: "confirm",
                name: "proceed",
                message: "This folder is not empty. Continue and add BIASED scaffold?",
                default: false,
            }]);
        if (!proceed)
            return;
    }
    const name = opts.name ?? path.basename(cwd);
    const spinner = ora(`Creating BIASED project '${name}'`).start();
    try {
        await copyTemplate(opts.template, cwd, { PROJECT_NAME: name });
        spinner.succeed("BIASED project created.");
        console.log(chalk.green("\nNext steps:"));
        console.log("  npm install");
        console.log("  npm run biased:validate   # validate intents/behaviors");
        console.log("  npm run biased:eval       # run evaluation set");
        console.log("  npm run biased:metrics    # show metrics snapshot\n");
    }
    catch (e) {
        spinner.fail(e.message);
        process.exit(1);
    }
});
program
    .command("new")
    .description("Create a new BIASED project with Docker support")
    .action(async () => {
    console.log(chalk.bold.blue("\n🚀 Create a new BIASED project\n"));
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "projectName",
            message: "Project name:",
            validate: (input) => input.trim().length > 0 || "Project name is required",
        },
        {
            type: "input",
            name: "projectProblem",
            message: "What problem is this project trying to solve?",
            validate: (input) => input.trim().length > 0 || "Problem description is required",
        },
        {
            type: "input",
            name: "userPersonas",
            message: "Who are the user personas? (comma-separated)",
            validate: (input) => input.trim().length > 0 || "User personas are required",
        },
        {
            type: "list",
            name: "language",
            message: "Select a language/framework:",
            choices: [
                { name: "JavaScript (Node.js + Express)", value: "javascript" },
                { name: "React (Vite + React)", value: "react" },
                { name: "Python (Flask)", value: "python" },
                { name: "Java (Spring Boot)", value: "java" },
                { name: "C# (ASP.NET Core)", value: "csharp" },
            ],
        },
    ]);
    const { projectName, projectProblem, userPersonas, language } = answers;
    const projectDir = path.join(process.cwd(), projectName);
    // Check if directory already exists
    if (await fs.pathExists(projectDir)) {
        console.log(chalk.red(`\n❌ Directory '${projectName}' already exists.\n`));
        process.exit(1);
    }
    const spinner = ora(`Creating ${language} project '${projectName}'`).start();
    try {
        // Create project directory
        await fs.ensureDir(projectDir);
        // Copy template with variable substitution
        await copyTemplate(language, projectDir, {
            PROJECT_NAME: projectName,
            PROJECT_PROBLEM: projectProblem,
            USER_PERSONAS: userPersonas,
        });
        spinner.succeed(chalk.green(`Project '${projectName}' created successfully!`));
        // Display next steps based on language
        console.log(chalk.bold.blue("\n📦 Next steps:\n"));
        console.log(chalk.cyan(`  cd ${projectName}`));
        console.log(chalk.cyan("  docker-compose up --build"));
        console.log();
        // Language-specific URLs
        const portMap = {
            javascript: "3000",
            react: "3000",
            python: "5000",
            java: "8080",
            csharp: "5000",
        };
        const port = portMap[language] || "3000";
        console.log(chalk.green(`🌐 Your application will be available at: http://localhost:${port}`));
        console.log();
        console.log(chalk.gray("📚 BIASED workflow:"));
        console.log(chalk.gray("  1. Complete biased/intent/intent.md"));
        console.log(chalk.gray("  2. Define biased/behavior/behavior-spec.md"));
        console.log(chalk.gray("  3. Add evaluations to biased/eval/eval-set.jsonl"));
        console.log();
    }
    catch (e) {
        spinner.fail(chalk.red(e.message));
        // Clean up on failure
        if (await fs.pathExists(projectDir)) {
            await fs.remove(projectDir);
        }
        process.exit(1);
    }
});
program.parse(process.argv);
