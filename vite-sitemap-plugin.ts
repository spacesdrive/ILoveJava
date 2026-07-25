import fs from 'node:fs'
import path from 'node:path'
import type { Plugin, ResolvedConfig } from 'vite'

import { staticSitemapRoutes } from './src/app/sitemap-routes.ts'
import { SITE_URL } from './src/constants/site.ts'
import { getLessonSitemapEntries } from './src/features/lessons/content/java-fundamentals/index.ts'
import { buildRobotsTxt } from './src/lib/robots-txt.ts'
import { buildSitemapXml, validateSitemapEntries } from './src/lib/sitemap.ts'

/**
 * Writes dist/sitemap.xml and dist/robots.txt on every production build
 * (never during `pnpm dev` - see `apply: 'build'` below), both derived from
 * SITE_URL and src/app/sitemap-routes.ts so there's one source of truth for
 * the site's canonical origin and its indexable pages. Fails the build if the
 * resulting sitemap entries don't pass validateSitemapEntries. See
 * docs/seo/OVERVIEW.md for the full architecture and how to add a
 * content-driven source once one exists.
 */
export function sitemapPlugin(): Plugin {
  let resolvedConfig: ResolvedConfig

  return {
    name: 'ilovejava-sitemap',
    apply: 'build',
    configResolved(config) {
      resolvedConfig = config
    },
    closeBundle() {
      const entries = [...staticSitemapRoutes, ...getLessonSitemapEntries()]
      const errors = validateSitemapEntries(entries)
      if (errors.length > 0) {
        throw new Error(
          `Invalid sitemap entries:\n${errors.map((e: string) => `  - ${e}`).join('\n')}`,
        )
      }

      const runDate = new Date().toISOString().slice(0, 10)
      const outDir = path.resolve(resolvedConfig.root, resolvedConfig.build.outDir)
      fs.mkdirSync(outDir, { recursive: true })
      fs.writeFileSync(
        path.join(outDir, 'sitemap.xml'),
        buildSitemapXml(entries, SITE_URL, runDate),
        'utf-8',
      )
      fs.writeFileSync(
        path.join(outDir, 'robots.txt'),
        buildRobotsTxt(SITE_URL),
        'utf-8',
      )
    },
  }
}
