import chalk from "chalk";
import fs from "fs-extra";
import path from "node:path";
import ora from "ora";
import { execSync } from "node:child_process";
import { glob } from "glob";

export async function installBddCommand() {
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
            } catch (e) {
                spinner.fail(chalk.yellow("Failed to install behave. Try: pip install behave"));
            }
            return;
        }

        // .NET/C# detection
        if (await fs.pathExists(path.join(cwd, "*.csproj")) ||
            await fs.pathExists(path.join(cwd, "*.sln")) ||
            (await glob("*.csproj", { cwd })).length > 0 ||
            (await glob("*.sln", { cwd })).length > 0) {
            spinner.text = ".NET project detected. Installing SpecFlow...";
            try {
                execSync("dotnet add package SpecFlow", { stdio: "inherit", cwd });
                spinner.succeed(chalk.green("SpecFlow installed for .NET!"));
                console.log(chalk.gray("\n💡 Create .feature files in biased/eval/ to get started\n"));
            } catch (e) {
                spinner.fail(chalk.yellow("Failed to install SpecFlow. Try: dotnet add package SpecFlow"));
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
    } catch (e: any) {
        spinner.fail(chalk.red(`Installation failed: ${e.message}`));
        process.exit(1);
    }
}
