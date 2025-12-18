import chalk from "chalk";
import fs from "fs-extra";
import path from "node:path";
import ora from "ora";
import inquirer from "inquirer";
import { glob } from "glob";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function installBiasedCommand() {
    const cwd = process.cwd();
    const spinner = ora("Configuring Admin Portal...").start();

    try {
        // 1. Detect Next.js Structure
        // 1. Detect Next.js Structure
        let appDir: string | null = null;

        const possiblePaths = [
            path.join(cwd, "app"),
            path.join(cwd, "src", "app"),
            path.join(cwd, "frontend", "app"),
            path.join(cwd, "frontend", "src", "app")
        ];

        for (const p of possiblePaths) {
            if (await fs.pathExists(p)) {
                appDir = p;
                break;
            }
        }

        if (!appDir) {
            appDir = cwd;
        }

        spinner.stop();

        // 2. Prompt for Dashboard URL
        console.log(chalk.blue("\n🔒 BIASED Admin Portal Setup\n"));
        const { dashboardUrl } = await inquirer.prompt([{
            type: "input",
            name: "dashboardUrl",
            message: "Enter your BIASED Dashboard URL:",
            default: "https://dashboard.biased.ai",
            validate: (input) => input.startsWith("http") ? true : "Please enter a valid URL (starting with http/https)"
        }]);

        spinner.start("Scaffolding Admin Portal...");

        // 3. Copy Template
        const templateDir = path.join(__dirname, "..", "..", "templates", "portal");
        if (!await fs.pathExists(templateDir)) {
            throw new Error(`Template not found: ${templateDir}`);
        }

        // Determine destination
        // If appDir ends with 'app', we copy contents of 'app' from template to it.
        // Template structure: templates/portal/app/biasedAdmin
        const dest = appDir.endsWith("app") ? appDir : path.join(appDir, "biasedAdmin");

        // logic: if appDir is .../app, we want to copy templates/portal/app/* to .../app/
        // if fallback (root), we want to copy templates/portal/app/biasedAdmin to root/biasedAdmin

        if (appDir.endsWith("app")) {
            await fs.copy(path.join(templateDir, "app"), appDir, { overwrite: true });
        } else {
            await fs.copy(path.join(templateDir, "app", "biasedAdmin"), path.join(cwd, "biasedAdmin"), { overwrite: true });
            spinner.warn(chalk.yellow("Could not find 'app' directory. Created 'biasedAdmin' in root. You effectively need to move this to your router's root."));
        }

        // 4. Update Config
        const configPath = path.join(cwd, "biased", "configuration", "project-config.json");
        await fs.ensureFile(configPath);

        let config: any = {};
        try {
            config = await fs.readJson(configPath);
        } catch (e) {
            // ignore if empty/invalid
        }

        config.admin = {
            ...config.admin,
            dashboardUrl: dashboardUrl
        };

        await fs.writeJson(configPath, config, { spaces: 2 });

        // 5. Replace placeholders in the copied files
        // We only need to replace in the page.tsx file we just copied
        const targetFile = appDir.endsWith("app")
            ? path.join(appDir, "biasedAdmin", "page.tsx")
            : path.join(cwd, "biasedAdmin", "page.tsx");

        if (await fs.pathExists(targetFile)) {
            let content = await fs.readFile(targetFile, "utf8");
            content = content.replace("{{DASHBOARD_URL}}", dashboardUrl);
            await fs.writeFile(targetFile, content);
        }

        spinner.succeed(chalk.green("Admin Portal installed successfully!"));
        console.log(chalk.gray(`\n  Login Route:   ${chalk.white("/biasedAdmin/login")}`));
        console.log(chalk.gray(`  Portal Route:  ${chalk.white("/biasedAdmin")}`));
        console.log(chalk.gray(`  Config Saved:  ${chalk.white(path.relative(cwd, configPath))}\n`));

    } catch (e: any) {
        spinner.fail(chalk.red(`Installation failed: ${e.message}`));
        process.exit(1);
    }
}
