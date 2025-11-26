#!/usr/bin/env node
import { Command } from "commander";
import { updateKnowledgeCommand } from "./commands/update-knowledge.js";
import { validateCommand } from "./commands/validate.js";
import { ciCommand } from "./commands/ci.js";
import { removeCommand } from "./commands/remove.js";
import { installBddCommand } from "./commands/install-bdd.js";
import { initCommand } from "./commands/init.js";

const program = new Command();
program
  .name("biased")
  .description("BIASED CLI: Add the BIASED framework to any project")
  .version("0.2.0");



program
  .command("init")
  .description("Add the BIASED framework to your existing project")
  .option("-n, --name <name>", "project name")
  .action(async (opts) => {
    await initCommand(opts);
  });




program
  .command("remove")
  .description("Remove the BIASED framework from your project")
  .action(async () => {
    await removeCommand();
  });



program
  .command("install-bdd")
  .description("Install BDD testing dependencies for your project")
  .action(async () => {
    await installBddCommand();
  });

program
  .command("updateKnowledge")
  .description("Convert business docs to AI-ready knowledge base")
  .action(async () => {
    await updateKnowledgeCommand();
  });

program
  .command("validate")
  .description("Validate project compliance with BIASED framework")
  .action(async () => {
    await validateCommand();
  });

program
  .command("ci")
  .description("Generate CI/CD workflow for BIASED evaluation")
  .action(async () => {
    await ciCommand();
  });

program.parse(process.argv);
