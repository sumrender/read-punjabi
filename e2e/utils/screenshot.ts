import { join } from 'node:path';
import type { Page, TestInfo } from '@playwright/test';

const ROOT = 'e2e-screenshots';

function slug(value: string): string {
  return value
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

/**
 * Saves a full-page screenshot under e2e-screenshots/<project>/<spec>/<test>/<name>.png
 * and attaches it to the HTML report. Folder is gitignored — meant for humans/agents
 * to review after a run, not for visual regression.
 */
export async function screenshot(
  page: Page,
  testInfo: TestInfo,
  name: string,
  options: { fullPage?: boolean } = {},
): Promise<void> {
  const spec = testInfo.file.split(/[\\/]/).pop()!.replace(/\.spec\.ts$/, '');
  const relative = join(
    ROOT,
    testInfo.project.name,
    spec,
    slug(testInfo.title),
    `${slug(name)}.png`,
  );
  await page.screenshot({ path: relative, fullPage: options.fullPage ?? true });
  await testInfo.attach(name, {
    path: relative,
    contentType: 'image/png',
  });
}
