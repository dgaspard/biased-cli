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

async function copyTemplate(templateName: string, dest: string, vars: Record<string,string>) {
  const templateDir = path.join(__dirname, "..", "templates", templateName);
  if (!(await fs.pathExists(templateDir))) {
    throw new Error(`Template not found: ${templateName}`);
  }
  await fs.copy(templateDir, dest, {
    filter: (src) => !src.endsWith(".keep")
  });

  // simple token replacement in text files
  const textExt = [".md",".json",".yml",".yaml",".ts",".js",".cjs",".mjs",".txt",".feature"];
  const files = await glob("**/*", { cwd: dest, dot: true, nodir: true });
  for (const f of files) {
    const full = path.join(dest, f);
    if (textExt.includes(path.extname(f))) {
      let c = await fs.readFile(full, "utf8");
      for (const [k,v] of Object.entries(vars)) {
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
      if (!proceed) return;
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
    } catch (e:any) {
      spinner.fail(e.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
