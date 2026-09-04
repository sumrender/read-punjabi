import { type Page, type Locator } from '@playwright/test';

/** Shared nav bar + document-level chrome present on every route. */
export class AppShellPage {
  readonly page: Page;
  readonly nav: Locator;
  readonly navLogo: Locator;
  readonly settingsLink: Locator;
  readonly appContent: Locator;
  /**
   * The <html> element. Use with toHaveAttribute() so document-level state
   * (data-theme, data-font-size) is asserted with auto-retrying assertions —
   * Angular applies these via effect(), which flushes asynchronously after
   * the signal changes, so a one-shot page.evaluate() read can race.
   */
  readonly documentElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nav = page.locator('nav.main-nav');
    this.navLogo = page.locator('a.nav-logo');
    this.settingsLink = page.locator('a.nav-link[aria-label="Settings"]');
    this.appContent = page.locator('.app-content');
    this.documentElement = page.locator('html');
  }

  async goto(path: string): Promise<void> {
    await this.page.goto(path);
  }

  localStorageItem(key: string): Promise<string | null> {
    return this.page.evaluate((k) => localStorage.getItem(k), key);
  }
}
