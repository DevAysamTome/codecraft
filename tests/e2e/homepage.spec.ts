import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display the homepage correctly', async ({ page }) => {
    await page.goto('/');

    // Check if the main heading is visible
    await expect(
      page.getByRole('heading', { name: /Code Craft Technology/i })
    ).toBeVisible();

    // Check if navigation is present
    await expect(page.getByRole('link', { name: /Home/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Services/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Projects/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /About/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Contact/i })).toBeVisible();

    // Check if CTA buttons are present
    await expect(
      page.getByRole('button', { name: /Get Started/i })
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: /Learn More/i })
    ).toBeVisible();
  });

  test('should navigate to request page', async ({ page }) => {
    await page.goto('/');

    // Click on the request service button
    await page.getByRole('link', { name: /Request Service/i }).click();

    // Should navigate to request page
    await expect(page).toHaveURL('/request');
    await expect(
      page.getByRole('heading', { name: /Request a Service/i })
    ).toBeVisible();
  });

  test('should switch language to Arabic', async ({ page }) => {
    await page.goto('/');

    // Click on language switcher
    await page.getByRole('button', { name: /EN/i }).click();
    await page.getByRole('button', { name: /AR/i }).click();

    // Check if the page content changes to Arabic
    await expect(
      page.getByRole('heading', { name: /كود كرافت تكنولوجي/i })
    ).toBeVisible();
  });
});
