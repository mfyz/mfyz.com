import { expect, test } from '@playwright/test';

test('LinkedIn share button opens LinkedIn directly', async ({ page }) => {
  await page.addInitScript(() => {
    (window as any).__linkedinOpenCalls = [];
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async () => {},
      },
    });

    window.open = ((url?: string | URL, target?: string) => {
      (window as any).__linkedinOpenCalls.push({
        target,
        url: url?.toString(),
      });

      return { opener: window } as Window;
    }) as typeof window.open;
  });

  await page.goto('/social-preview');

  const linkedInButton = page.locator('.linkedin-btn').first();
  await expect(linkedInButton).toHaveAttribute(
    'href',
    /linkedin\.com\/sharing\/share-offsite/
  );

  await linkedInButton.click();

  const openCalls = await page.evaluate(
    () => (window as any).__linkedinOpenCalls
  );

  expect(openCalls).toHaveLength(1);
  expect(openCalls[0].target).toBe('_blank');
  expect(openCalls[0].url).toContain(
    'https://www.linkedin.com/sharing/share-offsite/'
  );
  expect(openCalls[0].url).not.toBe('about:blank');
});
