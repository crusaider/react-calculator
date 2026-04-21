import { expect, test } from '@playwright/test';

function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function key(page: any, label: string) {
  const exactLabel = new RegExp(`^${escapeRegex(label)}$`);
  return page
    .locator('.Key')
    .filter({ has: page.locator('div', { hasText: exactLabel }) })
    .first();
}

test('calculates 2 enter 3 + => 5 in browser', async ({ page }) => {
  await page.goto('/');

  await key(page, '2').click();
  await key(page, 'enter').click();
  await key(page, '3').click();
  await key(page, '+').click();

  await expect(page.locator('.DisplayLine').last()).toHaveText('5');
});

test('opens and closes about modal in browser', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: '?' }).click();
  await expect(page.locator('.AboutBoxComponent')).toBeVisible();
  await expect(
    page.locator('.AboutBoxComponent h1', { hasText: 'React Calculator' })
  ).toBeVisible();

  await page.locator('.AboutBoxComponent').click();
  await expect(page.locator('.AboutBoxComponent')).toHaveCount(0);
});
