import { test, expect } from '@playwright/test';

test.describe('Code Block Rendering Consistency', () => {
  test('MD files should render code blocks with Shiki highlighting', async ({ page }) => {
    // Navigate to an MD blog post
    await page.goto('/turso-drizzle-perfect-sqlite-combo-in-production');
    
    // Wait for content to load
    const content = page.locator('.main-content-wrapper');
    await expect(content).toBeVisible();
    
    // Get all code blocks
    const codeBlocks = page.locator('pre');
    const codeBlockCount = await codeBlocks.count();
    
    // Verify we have code blocks
    expect(codeBlockCount).toBeGreaterThan(0);
    
    // Check each code block has Shiki classes
    for (let i = 0; i < codeBlockCount; i++) {
      const block = codeBlocks.nth(i);
      await expect(block).toHaveClass(/astro-code/);
      await expect(block).toHaveClass(/dracula/);
      
      // Verify the class attribute contains the expected pattern
      const className = await block.getAttribute('class');
      expect(className).toContain('astro-code');
      expect(className).toContain('astro-code-themes');
      expect(className).toContain('dracula');
    }
  });

  test('MDX files should render code blocks with Shiki highlighting', async ({ page }) => {
    // Navigate to an MDX blog post
    await page.goto('/wordpress-to-mdx-astro-migration-script');
    
    // Wait for content to load
    const content = page.locator('.main-content-wrapper');
    await expect(content).toBeVisible();
    
    // Get all code blocks
    const codeBlocks = page.locator('pre');
    const codeBlockCount = await codeBlocks.count();
    
    // Verify we have code blocks
    expect(codeBlockCount).toBeGreaterThan(0);
    
    // Check each code block has Shiki classes
    for (let i = 0; i < codeBlockCount; i++) {
      const block = codeBlocks.nth(i);
      await expect(block).toHaveClass(/astro-code/);
      await expect(block).toHaveClass(/dracula/);
      
      // Verify the class attribute contains the expected pattern
      const className = await block.getAttribute('class');
      expect(className).toContain('astro-code');
      expect(className).toContain('astro-code-themes');
      expect(className).toContain('dracula');
    }
  });

  test('MD and MDX files should have identical code block HTML structure', async ({ page }) => {
    // Get code block structure from MD file
    await page.goto('/turso-drizzle-perfect-sqlite-combo-in-production');
    const mdContent = page.locator('.main-content-wrapper');
    await expect(mdContent).toBeVisible();
    
    const mdCodeBlock = page.locator('pre').first();
    const mdClassName = await mdCodeBlock.getAttribute('class');
    
    // Get code block structure from MDX file
    await page.goto('/wordpress-to-mdx-astro-migration-script');
    const mdxContent = page.locator('.main-content-wrapper');
    await expect(mdxContent).toBeVisible();
    
    const mdxCodeBlock = page.locator('pre').first();
    const mdxClassName = await mdxCodeBlock.getAttribute('class');
    
    // Compare class structures
    expect(mdClassName).toBe(mdxClassName);
  });

  test('Code blocks should have proper syntax highlighting styles', async ({ page }) => {
    // Test on MDX page
    await page.goto('/wordpress-to-mdx-astro-migration-script');
    
    const codeBlock = page.locator('pre.astro-code').first();
    await expect(codeBlock).toBeVisible();
    
    // Check that it has the Dracula theme background color
    const styles = await codeBlock.getAttribute('style');
    expect(styles).toContain('background-color:#282A36');
    expect(styles).toContain('--shiki-dark-bg:#282A36');
    
    // Check that code elements inside have proper coloring
    const codeSpans = codeBlock.locator('span[style*="color"]');
    const spanCount = await codeSpans.count();
    
    // Should have syntax-highlighted spans
    expect(spanCount).toBeGreaterThan(0);
  });

  test('Different programming languages should be highlighted correctly', async ({ page }) => {
    // Test JavaScript highlighting
    await page.goto('/wordpress-to-mdx-astro-migration-script');
    
    // Find a JavaScript code block by looking for one with JavaScript content
    const jsCodeBlock = page.locator('pre.astro-code').nth(1); // The second code block is JavaScript
    
    // Verify it exists and has highlighting
    await expect(jsCodeBlock).toBeVisible();
    
    // Check that the code block has syntax-highlighted spans
    const coloredSpans = jsCodeBlock.locator('span[style*="color"]');
    const spanCount = await coloredSpans.count();
    
    // Should have multiple syntax-highlighted spans
    expect(spanCount).toBeGreaterThan(5);
    
    // Verify at least one span has color styling
    const firstColoredSpan = coloredSpans.first();
    const style = await firstColoredSpan.getAttribute('style');
    expect(style).toContain('color:');
  });
});