# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is mfyz.com, a personal blog built with Astro framework featuring bilingual content (English/Turkish), MDX blog posts, and modern web technologies.

## Common Development Commands

### Development & Building
- `npm run dev` or `npm start` - Start development server (includes smart server check)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run tunnel` - Expose dev server via ngrok

### Testing & Quality
- `npm test` - Run unit tests with coverage
- `npm run test:watch` - Run tests in watch mode
- `npm run test:e2e` - Run Playwright end-to-end tests
- `npm run test:e2e:ui` - Run E2E tests with UI
- `npm run check` - TypeScript check (errors only)
- `npm run check:full` - Full TypeScript check with warnings

### Code Quality
- Linting: Uses ESLint with Astro plugin
- Formatting: Prettier with Astro, Tailwind plugins
- Pre-commit: Husky + lint-staged for automated checks
- The project uses TypeScript for type safety

## Architecture & Structure

### Content Management System
- **Content Collections**: Astro's type-safe content system with Zod validation
- **Bilingual Support**: Posts in `src/content/blog/` (English) and `src/content/blog/tr/` (Turkish)
- **Post Metadata**: Title, description, date, tags, imageURL, hidden flag, language
- **Smart Post Filtering**: Advanced filtering by language, visibility, tags via `src/utils/getPosts.ts`

### Key Architectural Patterns
- **Static Site Generation**: Astro builds to static files for optimal performance
- **Component-Based**: Reusable Astro components for consistent UI
- **MDX Integration**: Rich content with React-like components in Markdown
- **Consistent Code Highlighting**: Both MD and MDX files use shared Shiki configuration with Dracula theme
- **RSS Feeds**: Separate feeds for English (`/rss.xml`) and Turkish (`/tr/rss.xml`)
- **OG Image Generation**: Dynamic social media images using Satori
- **Path Aliases**: Import shortcuts (@, @components, @layouts, @content, @utils, @styles)

### Core Utilities
- `src/utils/getPosts.ts` - Central post retrieval with filtering (language, hidden posts, related posts)
- `src/utils/generateOgImage.js` - Dynamic Open Graph image generation
- `src/consts.js` - Site constants and metadata
- `check-server-running.js` - Smart development server management

### Rich Content Components
Available for use in MDX posts:
- `ImageZoom` - Zoomable images for screenshots
- `YouTube` - Video embeds
- `CollapsibleText` - Expandable Q&A sections
- `Note` - Highlighted note boxes
- `Rating` - Star rating display
- `Message` - Chat-style message bubbles with avatars

### Styling & Design
- **Framework**: Tailwind CSS with typography plugin
- **Dark Mode**: Class-based dark mode implementation
- **Typography**: Georgia serif for headings (brand requirement), Rubik for body text
- **Animations**: Hover effects, transitions for hero areas
- **Responsive**: Mobile-first design approach

### Deployment & CI/CD
- **Hosting**: Vercel with custom domain configuration
- **Scheduled Posts**: GitHub Actions with PR merge scheduling via `/schedule YYYY-MM-DD HH:MM`
- **E2E Testing**: Playwright tests run on PR/push
- **Performance**: Bundle analysis with rollup-plugin-visualizer

### Development Workflow
- **Content Creation**: MDX files with comprehensive front matter
- **Preview System**: Hidden posts accessible via `?preview=1` query parameter
- **Hot Reloading**: Astro dev server with file watching (may need restart for content collection changes)
- **Type Safety**: TypeScript throughout with strict checking
- **Git Hooks**: Pre-commit linting and formatting
- **Content Collections**: Astro's type-safe content system with automatic language detection
- **Internal Links**: Always use absolute paths without host (e.g., `/post-slug/` not `https://mfyz.com/post-slug/`)

### Language & Internationalization
- **Dual Language**: English (default) and Turkish content
- **Content Structure**: Turkish posts stored in `src/content/blog/tr/` directory
- **URL Structure**: Direct slug URLs without `/tr/` prefix for article detail pages (language determined by file location)
- **Content Detection**: Automatic language detection via folder structure and frontmatter
- **Separate Indexes**: Independent listing pages for each language
- **Translation Style**: Mix English technical terms with Turkish explanations, conversational tone with emojis

### Performance Optimizations
- **Static Generation**: Pre-built pages for fast loading
- **Image Optimization**: Astro's built-in image processing
- **Code Splitting**: Automatic bundle optimization
- **CDN**: Vercel's global edge network
- **Bundle Analysis**: Visual bundle size tracking

## Important Notes

- Always follow the design guidelines in `.windsurfrules` for typography and visual elements
- Maintain Georgia font for headings as a core brand element
- Use the post filtering utilities rather than direct collection queries
- Test both English and Turkish content paths when making changes
- Preview hidden posts with `?preview=1` parameter during development
- The project uses custom remark plugins for emoticons and table of contents