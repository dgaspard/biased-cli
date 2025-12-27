import chalk from "chalk";
import fs from "fs-extra";
import path from "node:path";
import ora from "ora";
import inquirer from "inquirer";
import { glob } from "glob";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface InstallOptions {
    force?: boolean;
    allowedDomain?: string[];
    allowedEmail?: string[];
    accessMode?: string;
}

export async function installBiasedCommand(opts: InstallOptions = {}) {
    const cwd = process.cwd();
    const spinner = ora("Configuring Admin Portal...").start();

    try {
        // --- 1. Detect Next.js Structure ---
        let appDir: string | null = null;
        let isNextJs = false;

        const possiblePaths = [
            path.join(cwd, "app"),
            path.join(cwd, "src", "app"),
            path.join(cwd, "frontend", "app"),
            path.join(cwd, "frontend", "src", "app")
        ];

        for (const p of possiblePaths) {
            if (await fs.pathExists(p)) {
                appDir = p;
                isNextJs = true;
                break;
            }
        }

        // If not Next.js, we assume generic root install
        if (!appDir) {
            appDir = cwd;
        }

        spinner.stop();

        // --- 2. Prompt for Dashboard URL ---
        console.log(chalk.blue("\n🔒 BIASED Admin Portal Setup\n"));
        const { dashboardUrl } = await inquirer.prompt([{
            type: "input",
            name: "dashboardUrl",
            message: "Enter your BIASED Dashboard URL:",
            default: "https://dashboard.biased.ai",
            validate: (input) => input.startsWith("http") ? true : "Please enter a valid URL (starting with http/https)"
        }]);

        spinner.start("Scaffolding Admin Portal...");

        const templatesRoot = path.join(__dirname, "..", "..", "templates");
        const portalTemplateDir = path.join(templatesRoot, "portal");
        const authTemplateDir = path.join(templatesRoot, "auth");

        if (!await fs.pathExists(portalTemplateDir)) {
            throw new Error(`Template not found: ${portalTemplateDir}`);
        }

        // --- 3. Scaffold Auth Config (portal.auth.json) ---
        // We do this for BOTH Next.js and Generic, as future Next.js templates will use it too.

        // Define destination for auth file
        let authConfigDest = "";
        if (isNextJs && appDir) {
            // For Next.js, usually we put it in biasedAdmin folder which is inside appDir
            // appDir is e.g. .../app
            // So dest is .../app/biasedAdmin/portal.auth.json
            authConfigDest = path.join(appDir, "biasedAdmin", "portal.auth.json");
        } else {
            // Generic
            authConfigDest = path.join(cwd, "biasedAdmin", "portal.auth.json");
        }

        // Prepare config content
        const authConfig = {
            accessMode: opts.accessMode || "domainAllowlist",
            allowedDomains: opts.allowedDomain && opts.allowedDomain.length > 0
                ? opts.allowedDomain
                : ["company.com"],
            allowedEmails: opts.allowedEmail || []
        };

        // Create directory if needed (it might happen before template copy for Generic)
        await fs.ensureDir(path.dirname(authConfigDest));

        // Write Config if not exists or force
        if (opts.force || !await fs.pathExists(authConfigDest)) {
            await fs.writeJson(authConfigDest, authConfig, { spaces: 2 });
            if (opts.force) spinner.info(`Overwrote ${path.relative(cwd, authConfigDest)}`);
        } else {
            spinner.info(`Skipped existing ${path.relative(cwd, authConfigDest)} (use --force to overwrite)`);
        }


        // --- 4. Copy Application Code ---

        if (isNextJs && appDir) {
            // Existing Next.js Logic
            if (appDir.endsWith("app")) {
                await fs.copy(path.join(portalTemplateDir, "app"), appDir, { overwrite: true });
            } else {
                // unlikely fallback path if appDir logic logic changes
                await fs.copy(path.join(portalTemplateDir, "app", "biasedAdmin"), path.join(cwd, "biasedAdmin"), { overwrite: true });
            }

            // Replace placeholder in page.tsx
            const targetFile = appDir.endsWith("app")
                ? path.join(appDir, "biasedAdmin", "page.tsx")
                : path.join(cwd, "biasedAdmin", "page.tsx");

            if (await fs.pathExists(targetFile)) {
                let content = await fs.readFile(targetFile, "utf8");
                content = content.replace("{{DASHBOARD_URL}}", dashboardUrl);
                await fs.writeFile(targetFile, content);
            }

        } else {
            // Generic JS Logic
            // Copy server and ui templates
            const targetAdminDir = path.join(cwd, "biasedAdmin");
            await fs.ensureDir(targetAdminDir);

            // Copy server
            await fs.copy(path.join(authTemplateDir, "server"), path.join(targetAdminDir, "server"), { overwrite: opts.force });

            // Copy ui
            await fs.copy(path.join(authTemplateDir, "ui"), path.join(targetAdminDir, "ui"), { overwrite: opts.force });

            // Install Dependencies
            // Check for package.json
            const packageJsonPath = path.join(cwd, "package.json");
            if (await fs.pathExists(packageJsonPath)) {
                spinner.text = "Installing dependencies...";

                // Detect package manager
                let pm = 'npm';
                if (await fs.pathExists(path.join(cwd, 'yarn.lock'))) pm = 'yarn';
                if (await fs.pathExists(path.join(cwd, 'pnpm-lock.yaml'))) pm = 'pnpm';

                const cmd = pm === 'npm' ? 'npm install' : (pm === 'yarn' ? 'yarn add' : 'pnpm add');
                const deps = "express-session openid-client";

                try {
                    execSync(`${cmd} ${deps}`, { stdio: 'ignore', cwd });
                    spinner.succeed(`Installed dependencies: ${deps}`);
                } catch (e) {
                    spinner.warn("Failed to install dependencies automatically. Please run:");
                    console.log(chalk.yellow(`${cmd} ${deps}`));
                }
            } else {
                spinner.warn("No package.json found. Skipping dependency installation.");
            }
        }

        // --- 5. Update Project Config ---
        const configPath = path.join(cwd, "biased", "configuration", "project-config.json");
        await fs.ensureFile(configPath);
        let config: any = {};
        try { config = await fs.readJson(configPath); } catch (e) { }

        config.admin = {
            ...config.admin,
            dashboardUrl: dashboardUrl
        };
        await fs.writeJson(configPath, config, { spaces: 2 });


        // --- 6. Success Message ---
        spinner.succeed(chalk.green("Admin Portal installed successfully!"));

        if (isNextJs) {
            console.log(chalk.gray(`\n  Login Route:   ${chalk.white("/biasedAdmin/login")}`));
            console.log(chalk.gray(`  Portal Route:  ${chalk.white("/biasedAdmin")}`));
        } else {
            console.log(chalk.yellow("\nGeneric JS Setup Detected. Next Steps:"));
            console.log(chalk.gray(`1. Set Environment Variables: OIDC_ISSUER_URL, OIDC_CLIENT_ID, OIDC_CLIENT_SECRET, OIDC_REDIRECT_URI`));
            console.log(chalk.gray(`2. Mount the auth module in your Express app:`));
            console.log(chalk.white(`   // app.js`));
            console.log(chalk.white(`   const setupBiasedAuth = require('./biasedAdmin/server/biasedAdminAuth');`));
            console.log(chalk.white(`   setupBiasedAuth(app);`));
            console.log(chalk.gray(`3. Serve the UI:`));
            console.log(chalk.white(`   app.use('/biasedAdmin', express.static(path.join(__dirname, 'biasedAdmin/ui')));`));
            console.log(chalk.gray(`   // Ensure /biasedAdmin maps to index.html`));
        }

        console.log(chalk.gray(`  Auth Config:   ${chalk.white(path.relative(cwd, authConfigDest))}`));
        console.log(chalk.gray(`  Config Saved:  ${chalk.white(path.relative(cwd, configPath))}\n`));

    } catch (e: any) {
        spinner.fail(chalk.red(`Installation failed: ${e.message}`));
        process.exit(1);
    }
}
