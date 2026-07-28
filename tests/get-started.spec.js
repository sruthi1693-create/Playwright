import { test , expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';



test('EventHub login page loads', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openLoginPage();
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.signButton).toBeVisible();
});

test('EventHub login page loads 2', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openLoginPage();
  await expect(loginPage.page.url()).toContain('login');
  await expect(loginPage.signInTitle).toBeVisible();
});