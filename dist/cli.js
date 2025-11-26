#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import path from "node:path";
import fs from "fs-extra";
import { glob } from "glob";
import inquirer from "inquirer";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { updateKnowledgeCommand } from "./commands/update-knowledge.js";
const program = new Command();
program
    .name("biased")
    .description("BIASED CLI: Add the BIASED framework to any project")
    .version("0.2.0");
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
    .description("Add the BIASED framework to your existing project")
    .option("-n, --name <name>", "project name")
    .action(async (opts) => {
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
        if (!proceed)
            return;
    }
    const name = opts.name ?? path.basename(cwd);
    const spinner = ora(`Adding BIASED framework to '${name}'`).start();
    try {
        await copyTemplate("_common", cwd, { PROJECT_NAME: name });
        spinner.succeed(chalk.green("BIASED framework added successfully!"));
        // Auto-update knowledge base
        console.log(chalk.blue("\nGenerating initial knowledge base..."));
        await updateKnowledgeCommand();
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
    }
    catch (e) {
        spinner.fail(e.message);
        process.exit(1);
    }
});
program
    .command("remove")
    .description("Remove the BIASED framework from your project")
    .action(async () => {
    const cwd = process.cwd();
    const biasedDir = path.join(cwd, "biased");
    if (!(await fs.pathExists(biasedDir))) {
        console.log(chalk.yellow("\n⚠️  BIASED framework not found in this directory.\n"));
        return;
    }
    console.log(chalk.red.bold("\n⚠️  WARNING: This will permanently delete the 'biased' folder and all its contents."));
    console.log(chalk.red("   This includes all business documentation, intent, behavior, and evaluation files.\n"));
    const { confirm } = await inquirer.prompt([{
            type: "confirm",
            name: "confirm",
            message: "Are you sure you want to remove the BIASED framework?",
            default: false,
        }]);
    if (!confirm) {
        console.log(chalk.yellow("\nOperation cancelled.\n"));
        return;
    }
    const spinner = ora("Removing BIASED framework...").start();
    try {
        await fs.remove(biasedDir);
        spinner.succeed(chalk.green("BIASED framework removed successfully."));
    }
    catch (e) {
        spinner.fail(chalk.red(`Failed to remove BIASED framework: ${e.message}`));
        process.exit(1);
    }
});
program
    .command("install-bdd")
    .description("Install BDD testing dependencies for your project")
    .action(async () => {
    const cwd = process.cwd();
    const spinner = ora("Detecting project type...").start();
    try {
        // Node.js detection
        if (await fs.pathExists(path.join(cwd, "package.json"))) {
            spinner.text = "Node.js project detected. Installing Cucumber...";
            execSync("npm install --save-dev @cucumber/cucumber", { stdio: "inherit", cwd });
            spinner.succeed(chalk.green("Cucumber installed for Node.js!"));
            console.log(chalk.gray("\n💡 Create .feature files in biased/eval/ to get started\n"));
            return;
        }
        // Python detection
        if (await fs.pathExists(path.join(cwd, "requirements.txt")) ||
            await fs.pathExists(path.join(cwd, "setup.py")) ||
            await fs.pathExists(path.join(cwd, "pyproject.toml"))) {
            spinner.text = "Python project detected. Installing behave...";
            try {
                execSync("pip install behave", { stdio: "inherit", cwd });
                spinner.succeed(chalk.green("Behave installed for Python!"));
                console.log(chalk.gray("\n💡 Create .feature files in biased/eval/ to get started\n"));
            }
            catch (e) {
                spinner.fail(chalk.yellow("Failed to install behave. Try: pip install behave"));
            }
            return;
        }
        // Java detection
        if (await fs.pathExists(path.join(cwd, "pom.xml")) ||
            await fs.pathExists(path.join(cwd, "build.gradle")) ||
            await fs.pathExists(path.join(cwd, "build.gradle.kts"))) {
            spinner.info(chalk.blue("Java project detected."));
            console.log(chalk.bold("\n📘 Add Cucumber to your project:\n"));
            console.log(chalk.cyan("Maven:"));
            console.log(chalk.gray(`  <dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-java</artifactId>
    <version>7.14.0</version>
    <scope>test</scope>
  </dependency>\n`));
            console.log(chalk.cyan("Gradle:"));
            console.log(chalk.gray(`  testImplementation 'io.cucumber:cucumber-java:7.14.0'\n`));
            return;
        }
        // Unsupported
        spinner.fail(chalk.yellow("Could not detect project type."));
        console.log(chalk.bold("\n📘 Manual BDD Installation:\n"));
        console.log(chalk.cyan("  Node.js:  npm install --save-dev @cucumber/cucumber"));
        console.log(chalk.cyan("  Python:   pip install behave"));
        console.log(chalk.cyan("  Java:     See https://cucumber.io/docs/installation/java/"));
        console.log(chalk.cyan("  C#:       dotnet add package SpecFlow\n"));
    }
    catch (e) {
        spinner.fail(chalk.red(`Installation failed: ${e.message}`));
        process.exit(1);
    }
});
program
    .command("updateKnowledge")
    .description("Convert business docs to AI-ready knowledge base")
    .action(async () => {
    await updateKnowledgeCommand();
});
program.parse(process.argv);
