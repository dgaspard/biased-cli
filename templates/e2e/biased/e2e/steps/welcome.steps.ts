import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from './hooks.js'; // Explicit extension for ESM resolution in ts-node

Given('I am on the welcome page', async () => {
    // Assuming the app is running on localhost:3000 based on previous context
    // Adjust the URL if strictly necessary, but this is a reasonable default for dev
    await page.goto('http://localhost:3000');
});

Then('I should see the welcome message', async () => {
    await expect(page.locator('text=Agile breaks with AI. BIASED is the governance-first framework that aligns business intent with AI behavior, ensuring your models are trustworthy, compliant, and actually adopted.')).toBeVisible();
});

Then('I should see the Get Started button', async () => {
    await expect(page.getByRole('link', { name: 'Get Started', exact: true })).toBeVisible();
});

Then('I should see the Install the CLI button', async () => {
    await expect(page.getByRole('link', { name: /Install the CLI/i })).toBeVisible();
});

Then('I should see the Read the Strategy button', async () => {
    await expect(page.getByRole('link', { name: /Read the Strategy/i })).toBeVisible();
});
