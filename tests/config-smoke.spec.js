import { test , expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';



test('smoke test 1', async ({ page }) => {
  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await expect(page).toHaveTitle(/EventHub/i);
  await expect(page.locator("#email")).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
});

test('test on fixtures and browsercontext', async ({ page,browser }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openLoginPage();
  const email = "beginner@sample.com";
  const emaillocator = page.locator("#email");
  await emaillocator.fill(email);
  await expect(emaillocator).toContainText(email);

  const isolatedContext = await browser.newContext();
  const isolatedPage = await isolatedContext.newPage();
  await isolatedPage.goto('https://eventhub.rahulshettyacademy.com/login');
  await expect(isolatedPage.locator('//h1[text()="Sign in to EventHub"]')).toBeVisible();
  await expect(isolatedPage.locator("#email")).toBeEmpty();
  await isolatedContext.close();
});