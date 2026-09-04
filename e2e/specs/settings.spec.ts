import { test, expect } from '@playwright/test';
import { AppShellPage } from '../pages/app-shell.page';
import { SettingsPage } from '../pages/settings.page';
import { screenshot } from '../utils/screenshot';

const THEME_KEY = 'read-punjabi-theme';
const FONT_KEY = 'read-punjabi-font-size';
const LANG_KEY = 'selected-language';

test.describe('Settings', () => {
  let app: AppShellPage;
  let settings: SettingsPage;

  test.beforeEach(async ({ page }) => {
    app = new AppShellPage(page);
    settings = new SettingsPage(page);
  });

  test('renders all option groups with defaults', async ({ page }, testInfo) => {
    await settings.goto();
    await settings.expectLoaded();

    // Defaults: dark theme, medium font, Punjabi course.
    await expect(settings.darkThemeRadio).toBeChecked();
    await expect(
      page.locator('input[name="fontSize"][value="medium"]'),
    ).toBeChecked();
    await expect(settings.punjabiRadio).toBeChecked();
    await expect(app.documentElement).toHaveAttribute('data-theme', 'dark');
    await expect(app.documentElement).toHaveAttribute('data-font-size', 'medium');

    await screenshot(page, testInfo, 'settings-defaults');
  });

  test('switching theme updates data-theme and persists across reload', async ({ page }, testInfo) => {
    await settings.goto();
    await settings.expectLoaded();

    await settings.lightThemeRadio.check();
    await expect(app.documentElement).toHaveAttribute('data-theme', 'light');
    await expect(app.localStorageItem(THEME_KEY)).resolves.toBe('light');

    await screenshot(page, testInfo, 'settings-light-theme');

    await page.reload();
    await settings.expectLoaded();
    await expect(app.documentElement).toHaveAttribute('data-theme', 'light');
    await expect(settings.lightThemeRadio).toBeChecked();
  });

  test('font size updates data-font-size and persists', async ({ page }) => {
    await settings.goto();
    await settings.expectLoaded();

    await settings.selectFontSize('xlarge');
    await expect(app.documentElement).toHaveAttribute('data-font-size', 'xlarge');
    await expect(app.localStorageItem(FONT_KEY)).resolves.toBe('xlarge');

    await page.reload();
    await expect(app.documentElement).toHaveAttribute('data-font-size', 'xlarge');
  });

  test('switching course to Hindi updates chrome and persists', async ({ page }) => {
    await settings.goto();
    await settings.expectLoaded();

    await settings.hindiRadio.check();

    await expect(app.navLogo).toHaveText('Hindi Reading App');
    await expect(app.appContent).toHaveAttribute('lang', 'hi');
    await expect(app.localStorageItem(LANG_KEY)).resolves.toBe('hindi');
  });
});
