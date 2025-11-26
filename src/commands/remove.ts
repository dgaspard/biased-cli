import chalk from "chalk";
import fs from "fs-extra";
import path from "node:path";
import ora from "ora";
import inquirer from "inquirer";

export async function removeCommand() {
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
    } catch (e: any) {
        spinner.fail(chalk.red(`Failed to remove BIASED framework: ${e.message}`));
        process.exit(1);
    }
}
