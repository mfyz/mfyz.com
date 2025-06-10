import { test, expect } from '@playwright/test';

// Test for the About page
test('About page has correct headings and content', async ({ page }) => {
  // Go to the about page
  await page.goto('/about');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Check the current page title
  const title = await page.title();
  console.log(`Current page title: "${title}"`);  
  
  // Verify expected title format
  await expect(page).toHaveTitle('About this website');
  
  // Test the h1 heading
  const h1 = page.locator('h1:has-text("About this website")');
  await expect(h1).toBeVisible();
  
  // Test the h2 heading
  const h2 = page.locator('h2:has-text("About Fatih Yıldız")');
  await expect(h2).toBeVisible();
  
  // Test that the link to mfyz.net exists
  const link = page.locator('a[href="https://mfyz.net"]');
  await expect(link).toBeVisible();
  await expect(link).toHaveText('mfyz.net');
  
  // Test there are some paragraphs
  const paragraphs = page.locator('p');
  
  // Get the count of paragraphs and assert there are at least 3
  const paragraphCount = await paragraphs.count();
  expect(paragraphCount).toBeGreaterThanOrEqual(3);
  
  // Check for specific content to ensure we're on the right page
  await expect(page.locator('body')).toContainText('mfyz is a personal blog');
  
  // Focus on core content rather than specific structural elements
  // These tests ensure the page is properly loaded without being overly specific about implementation
  await expect(page.locator('body')).toBeVisible();
  await expect(page.locator('main')).toBeVisible();
});
