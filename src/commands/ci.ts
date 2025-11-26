import chalk from "chalk";
import fs from "fs-extra";
import path from "node:path";
import ora from "ora";

export async function ciCommand(silent = false) {
    const cwd = process.cwd();
    const spinner = silent ? null : ora("Generating CI/CD workflow...").start();

    try {
        const workflowsDir = path.join(cwd, ".github", "workflows");
        await fs.ensureDir(workflowsDir);

        const workflowFile = path.join(workflowsDir, "biased-eval.yml");

        if (await fs.pathExists(workflowFile)) {
            if (spinner) spinner.info(chalk.yellow("CI workflow already exists. Skipping generation."));
            return;
        }

        const workflowContent = `# BIASED Framework Evaluation Workflow
name: BIASED Evaluation

on:
  push:
    branches: [ "main", "master" ]
  pull_request:
    branches: [ "main", "master" ]

jobs:
  evaluate:
    name: Validate & Evaluate
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      # Install dependencies
      # Modify this step based on your project type (npm, pip, maven, etc.)
      - name: Install Dependencies
        run: |
          if [ -f "package.json" ]; then
            npm ci
          elif [ -f "requirements.txt" ]; then
            pip install -r requirements.txt
          fi
          # Ensure biased-cli is available if not in package.json
          npm install -g biased-cli

      # 1. Validate Framework Structure
      - name: Validate BIASED Structure
        run: biased validate

      # 2. Run Tests (Behavior & Eval)
      # This assumes you have a 'test' script configured.
      # For BDD, ensure 'biased install-bdd' has been run locally and deps are committed.
      - name: Run Evaluation Tests
        run: |
          if [ -f "package.json" ] && grep -q '"test":' package.json; then
            npm test
          else
            echo "⚠️ No test script detected. Please configure your test command in .github/workflows/biased-eval.yml"
          fi

      # 3. Update Metrics (Optional - requires write permissions or external dashboard push)
      # - name: Push Metrics
      #   run: node scripts/update-metrics.js
`;

        await fs.writeFile(workflowFile, workflowContent);

        if (spinner) {
            spinner.succeed(chalk.green("Generated .github/workflows/biased-eval.yml"));
            console.log(chalk.gray("   💡 Customize this workflow to match your project's build process.\n"));
        }
    } catch (e: any) {
        if (spinner) spinner.fail(chalk.red(`Failed to generate CI workflow: ${e.message}`));
        if (!silent) process.exit(1);
    }
}
