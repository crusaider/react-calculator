import { expect, test } from '@playwright/test';

test('registers service worker in production preview', async ({ page }) => {
  await page.goto('/');

  await page.waitForFunction(async () => {
    if (!('serviceWorker' in navigator)) {
      return false;
    }

    const registrations = await navigator.serviceWorker.getRegistrations();
    return registrations.length > 0;
  });

  const registrationsCount = await page.evaluate(async () => {
    const registrations = await navigator.serviceWorker.getRegistrations();
    return registrations.length;
  });

  expect(registrationsCount).toBeGreaterThan(0);
});
