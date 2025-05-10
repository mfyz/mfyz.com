import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import HeaderLink from './HeaderLink.astro';

test('Header link', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(HeaderLink, {
    slots: {
      default: 'This is test page link',
    },
    props: {
      href: "/test-page",
    }
  });
  // console.log("result string:", result);

  expect(result).toContain('This is test page link');
  expect(result).toContain('href="/test-page"');
});