import { test, expect } from '@playwright/test';
import { AppShellPage } from '../pages/app-shell.page';
import { HomePage } from '../pages/home.page';
import { screenshot } from '../utils/screenshot';

test.describe('Home page', () => {
  let app: AppShellPage;
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    app = new AppShellPage(page);
    home = new HomePage(page);
  });

  test('renders app title, contents and level links', async ({ page }, testInfo) => {
    await home.goto();
    await home.expectLoaded();

    await expect(app.navLogo).toHaveText('Punjabi Reading App');
    await expect(app.settingsLink).toBeVisible();
    await expect(app.appContent).toHaveAttribute('lang', 'pa');
    await expect(home.subtitle).toContainText('Gurmukhi');
    await expect(home.beginButton).toHaveText('Begin Level 1');
    await expect(home.pageBadge).toHaveText('Level 1 · Letters');
    await expect(home.specimen).toBeVisible();
    await expect(home.specimenDots.first()).toBeVisible();

    await screenshot(page, testInfo, 'home');
  });

  test('Begin Level 1 navigates to the level page', async () => {
    await home.goto();
    await home.expectLoaded();
    await home.beginButton.click();
    await expect(app.page).toHaveURL(/\/level\/1$/);
  });

  test('chapter links navigate to each level', async ({ page }) => {
    await home.goto();
    await home.expectLoaded();

    for (let level = 1; level <= 5; level++) {
      await home.chapterLink(level).click();
      await expect(page).toHaveURL(new RegExp(`/level/${level}$`));
      await page.goBack();
    }
    await expect(page).toHaveURL(/\/$/);
  });

  test('specimen dots switch the previewed letters', async () => {
    await home.goto();
    await home.expectLoaded();

    const firstDot = home.specimenDots.first();
    const initiallyActive = await firstDot.getAttribute('aria-pressed');
    const otherDot = home.specimenDots.nth(1);
    await otherDot.click();
    await expect(otherDot).toHaveAttribute('aria-pressed', 'true');
    if (initiallyActive === 'true') {
      await expect(firstDot).toHaveAttribute('aria-pressed', 'false');
    }
  });
});
