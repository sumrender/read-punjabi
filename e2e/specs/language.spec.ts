import { test, expect } from '@playwright/test';
import { AppShellPage } from '../pages/app-shell.page';
import { HomePage } from '../pages/home.page';

const LANG_KEY = 'selected-language';

test.describe('Language switching (?lang=hi)', () => {
  let app: AppShellPage;
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    app = new AppShellPage(page);
    home = new HomePage(page);
  });

  test('lang=hi on home switches app name, subtitle and course content', async ({ page }) => {
    await page.goto('/?lang=hi');
    await home.expectLoaded();

    await expect(app.navLogo).toHaveText('Hindi Reading App');
    await expect(home.heading).toHaveText('Hindi Reading App');
    await expect(home.subtitle).toContainText('Devanagari');
    await expect(app.appContent).toHaveAttribute('lang', 'hi');
    await expect(app.localStorageItem(LANG_KEY)).resolves.toBe('hindi');
  });

  test('lang=hi works on any route (lesson page)', async ({ page }) => {
    await page.goto('/lesson/letter-1?lang=hi');
    await expect(app.navLogo).toHaveText('Hindi Reading App');
    await expect(app.appContent).toHaveAttribute('lang', 'hi');
  });

  test('lang=pa explicitly selects Punjabi', async ({ page }) => {
    await page.goto('/?lang=pa');
    await home.expectLoaded();
    await expect(app.navLogo).toHaveText('Punjabi Reading App');
    await expect(app.localStorageItem(LANG_KEY)).resolves.toBe('punjabi');
  });

  test('unknown lang alias is ignored (stays Punjabi)', async ({ page }) => {
    await page.goto('/?lang=fr');
    await home.expectLoaded();
    await expect(app.navLogo).toHaveText('Punjabi Reading App');
    await expect(app.localStorageItem(LANG_KEY)).resolves.toBeNull();
  });

  test('stored language is reused on subsequent visits without the param', async ({ page }) => {
    await page.goto('/?lang=hi');
    await home.expectLoaded();
    await expect(app.navLogo).toHaveText('Hindi Reading App');

    await page.goto('/settings');
    await expect(app.navLogo).toHaveText('Hindi Reading App');
  });
});
