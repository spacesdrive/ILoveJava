import type { SitemapEntry } from '@/lib/sitemap'

/**
 * Every publicly indexable static route in the app - the single source of truth
 * sitemap.xml is generated from (see vite-sitemap-plugin.ts). Adding a new
 * indexable static page means adding one entry here; a route with no entry here
 * (like the catch-all 404) is excluded automatically.
 *
 * src/app/__tests__/sitemap-routes.test.ts asserts every path here resolves to
 * a real route in src/app/router.tsx, so the two can't silently drift.
 *
 * Content-driven routes (lessons, exercises, quizzes, docs, blog posts, etc.)
 * don't belong in this static list - once a content index exists (see
 * docs/content/OVERVIEW.md), add a function that reads it and returns
 * SitemapEntry[], then merge its result into the `entries` array built in
 * vite-sitemap-plugin.ts. See docs/seo/OVERVIEW.md for the extension pattern.
 */
export const staticSitemapRoutes: SitemapEntry[] = [
  { path: '/', changefreq: 'weekly', priority: 1 },
  { path: '/learn/java-fundamentals', changefreq: 'weekly', priority: 0.9 },
]
