import { BeforeAll, AfterAll, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, type Browser, type BrowserContext, type Page } from '@playwright/test';

setDefaultTimeout(60 * 1000); // 60s per step, tweak as needed

let browser: Browser;
export let context: BrowserContext;
export let page: Page;

BeforeAll(async () => {
    browser = await chromium.launch({ headless: true });
});

AfterAll(async () => {
    await browser.close();
});

Before(async () => {
    context = await browser.newContext();
    page = await context.newPage();
});

After(async () => {
    await page.close();
    await context.close();
});
