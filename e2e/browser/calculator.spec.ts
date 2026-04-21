import { expect, test } from '@playwright/test';

function key(page: any, label: string) {
  return page.getByRole('button', { name: label, exact: true });
}

test('calculates 2 enter 3 + => 5 in browser', async ({ page }) => {
  await page.goto('/');

  await key(page, '2').click();
  await key(page, 'Enter').click();
  await key(page, '3').click();
  await key(page, 'Add').click();

  await expect(page.locator('.DisplayLine').last()).toHaveText('5');
});

test('supports keyboard-only calculator input in browser', async ({ page }) => {
  await page.goto('/');

  await key(page, '2').press('Enter');
  await key(page, 'Enter').press('Enter');
  await key(page, '3').press('Enter');
  await key(page, 'Add').press('Enter');

  await expect(page.locator('.DisplayLine').last()).toHaveText('5');
});

test('opens and closes about modal in browser', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'About React Calculator' }).press('Enter');
  await expect(page.getByRole('dialog', { name: 'React Calculator' })).toBeVisible();
  await expect(
    page.locator('.AboutBoxComponent h1', { hasText: 'React Calculator' })
  ).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'React Calculator' })).toHaveCount(0);
});
