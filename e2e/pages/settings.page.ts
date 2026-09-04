import { type Page, type Locator, expect } from '@playwright/test';

export class SettingsPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly languageRadios: Locator;
  readonly hindiRadio: Locator;
  readonly punjabiRadio: Locator;
  readonly fontSizeRadios: Locator;
  readonly themeRadios: Locator;
  readonly lightThemeRadio: Locator;
  readonly darkThemeRadio: Locator;
  readonly backLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('.belongs-masthead h1');
    this.languageRadios = page.locator('input[name="language"]');
    this.punjabiRadio = page.locator('input[name="language"][value="punjabi"]');
    this.hindiRadio = page.locator('input[name="language"][value="hindi"]');
    this.fontSizeRadios = page.locator('input[name="fontSize"]');
    this.themeRadios = page.locator('input[name="theme"]');
    this.lightThemeRadio = page.locator('input[name="theme"][value="light"]');
    this.darkThemeRadio = page.locator('input[name="theme"][value="dark"]');
    this.backLink = page.locator('.settings-navigation .back-link');
  }

  async goto(): Promise<void> {
    await this.page.goto('/settings');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.heading).toHaveText('Settings');
    await expect(this.languageRadios).toHaveCount(2);
    await expect(this.fontSizeRadios).toHaveCount(4);
    await expect(this.themeRadios).toHaveCount(2);
  }

  async selectFontSize(value: 'small' | 'medium' | 'large' | 'xlarge'): Promise<void> {
    await this.page.locator(`input[name="fontSize"][value="${value}"]`).check();
  }

  async assertRadioChecked(locator: Locator): Promise<void> {
    await expect(locator).toBeChecked();
  }
}
