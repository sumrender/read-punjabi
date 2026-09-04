import { test, expect } from '@playwright/test';
import { AppShellPage } from '../pages/app-shell.page';
import { HomePage } from '../pages/home.page';
import { screenshot } from '../utils/screenshot';

test.describe('Navigation & shell', () => {
  let app: AppShellPage;
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    app = new AppShellPage(page);
    home = new HomePage(page);
  });

  test('nav logo returns home from a deep route', async ({ page }) => {
    await page.goto('/lesson/letter-1');
    await expect(page).toHaveURL(/\/lesson\/letter-1$/);
    await app.navLogo.click();
    await expect(page).toHaveURL(/\/$/);
    await home.expectLoaded();
  });

  test('unknown routes redirect home', async ({ page }) => {
    await page.goto('/this/path/does/not/exist');
    await expect(page).toHaveURL(/\/$/);
    await home.expectLoaded();
  });

  test('settings link opens the settings page', async ({ page }) => {
    await home.goto();
    await home.expectLoaded();
    await app.settingsLink.click();
    await expect(page).toHaveURL(/\/settings$/);
  });

  test('service worker registers (PWA)', async ({ page }) => {
    await home.goto();
    await home.expectLoaded();
    await expect
      .poll(async () => {
        return page.evaluate(async () => {
          if (!('serviceWorker' in navigator)) return false;
          const reg = await navigator.serviceWorker.getRegistration();
          return Boolean(reg);
        });
      }, { timeout: 10_000 })
      .toBe(true);
  });

  test('document title and meta description on home', async ({ page }) => {
    await home.goto();
    await home.expectLoaded();
    await expect(page).toHaveTitle(/Punjabi/);
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute('content');
    expect(description).toBeTruthy();
  });

  test('dark theme is applied by default across pages', async ({ page }, testInfo) => {
    await home.goto();
    await home.expectLoaded();
    await expect(app.documentElement).toHaveAttribute('data-theme', 'dark');
    await screenshot(page, testInfo, 'shell-home-dark');
  });
});
