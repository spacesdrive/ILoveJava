import { describe, expect, it } from 'vitest'

import { router } from '../router'
import { staticSitemapRoutes } from '../sitemap-routes'
import { matchRoutes } from 'react-router-dom'

describe('staticSitemapRoutes', () => {
  it('has no duplicate paths', () => {
    const paths = staticSitemapRoutes.map((entry) => entry.path)
    expect(new Set(paths).size).toBe(paths.length)
  })

  it('every path resolves to a real route, not the catch-all 404', () => {
    for (const entry of staticSitemapRoutes) {
      const matches = matchRoutes(router.routes, entry.path)
      expect(matches, `${entry.path} did not match any route`).not.toBeNull()

      const lastMatch = matches![matches!.length - 1]
      expect(
        lastMatch.route.path,
        `${entry.path} fell through to the catch-all route`,
      ).not.toBe('*')
    }
  })
})
