import { test, expect } from '@playwright/test';

test.describe('Service Request Form', () => {
  test('should submit a service request successfully', async ({ page }) => {
    await page.goto('/request');

    // Fill out the form
    await page.getByLabel('Full Name').fill('John Doe');
    await page.getByLabel('Email Address').fill('john@example.com');
    await page.getByLabel('Phone Number').fill('+1234567890');
    await page.getByLabel('Company Name').fill('Test Company');

    // Select a service
    await page.getByLabel('Service Needed').selectOption('Web Development');

    // Select budget range
    await page.getByLabel('Budget Range').selectOption('$10,000 - $25,000');

    // Set deadline
    await page.getByLabel('Project Deadline').fill('2024-12-31');

    // Fill description
    await page
      .getByLabel('Project Description')
      .fill(
        'I need a modern website for my business with e-commerce functionality.'
      );

    // Submit the form
    await page.getByRole('button', { name: /Submit Request/i }).click();

    // Should show success message
    await expect(
      page.getByText(/Request submitted successfully/i)
    ).toBeVisible();
  });

  test('should show validation errors for required fields', async ({
    page,
  }) => {
    await page.goto('/request');

    // Try to submit without filling required fields
    await page.getByRole('button', { name: /Submit Request/i }).click();

    // Should show validation errors
    await expect(page.getByText(/Name is required/i)).toBeVisible();
    await expect(page.getByText(/Invalid email address/i)).toBeVisible();
    await expect(page.getByText(/Phone number is required/i)).toBeVisible();
  });
});
