import { describe, expect, it } from 'vitest'

import {
  buildSitemapXml,
  escapeXml,
  validateSitemapEntries,
  type SitemapEntry,
} from '../sitemap'

describe('validateSitemapEntries', () => {
  it('accepts a valid entry list', () => {
    const entries: SitemapEntry[] = [{ path: '/', changefreq: 'weekly', priority: 1 }]
    expect(validateSitemapEntries(entries)).toEqual([])
  })

  it('flags duplicate paths', () => {
    const entries: SitemapEntry[] = [
      { path: '/about', changefreq: 'monthly', priority: 0.5 },
      { path: '/about', changefreq: 'monthly', priority: 0.5 },
    ]
    expect(validateSitemapEntries(entries)).toEqual(['/about: duplicate URL'])
  })

  it('flags a path that is not site-root-relative', () => {
    const entries: SitemapEntry[] = [
      { path: 'https://example.com/about', changefreq: 'monthly', priority: 0.5 },
    ]
    expect(validateSitemapEntries(entries)[0]).toMatch(/site-root-relative/)
  })

  it('flags query strings and hash fragments', () => {
    const entries: SitemapEntry[] = [
      { path: '/search?q=loops', changefreq: 'monthly', priority: 0.5 },
      { path: '/about#team', changefreq: 'monthly', priority: 0.5 },
    ]
    const errors = validateSitemapEntries(entries)
    expect(errors.some((e) => e.includes('query string'))).toBe(true)
    expect(errors.some((e) => e.includes('hash fragment'))).toBe(true)
  })

  it('flags an out-of-range priority', () => {
    const entries: SitemapEntry[] = [
      { path: '/about', changefreq: 'monthly', priority: 1.5 },
    ]
    expect(validateSitemapEntries(entries)[0]).toMatch(/priority must be between/)
  })

  it('flags an invalid changefreq', () => {
    const entries = [
      { path: '/about', changefreq: 'sometimes', priority: 0.5 },
    ] as unknown as SitemapEntry[]
    expect(validateSitemapEntries(entries)[0]).toMatch(/invalid changefreq/)
  })

  it('flags an unparsable lastmod', () => {
    const entries: SitemapEntry[] = [
      { path: '/about', changefreq: 'monthly', priority: 0.5, lastmod: 'not-a-date' },
    ]
    expect(validateSitemapEntries(entries)[0]).toMatch(/not a valid date/)
  })
})

describe('escapeXml', () => {
  it('escapes reserved XML characters', () => {
    expect(escapeXml(`<a href="x">M&M's</a>`)).toBe(
      '&lt;a href=&quot;x&quot;&gt;M&amp;M&apos;s&lt;/a&gt;',
    )
  })
})

describe('buildSitemapXml', () => {
  it('produces a valid, well-formed sitemap document', () => {
    const xml = buildSitemapXml(
      [{ path: '/', changefreq: 'weekly', priority: 1 }],
      'https://ilovejava.spacesdrive.cc',
      '2026-01-01',
    )

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(xml).toContain(
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    )
    expect(xml).toContain('<loc>https://ilovejava.spacesdrive.cc/</loc>')
    expect(xml).toContain('<lastmod>2026-01-01</lastmod>')
    expect(xml).toContain('<changefreq>weekly</changefreq>')
    expect(xml).toContain('<priority>1.0</priority>')
  })

  it('uses an absolute URL built from siteUrl, never a bare path', () => {
    const xml = buildSitemapXml(
      [{ path: '/about', changefreq: 'monthly', priority: 0.5 }],
      'https://ilovejava.spacesdrive.cc/',
      '2026-01-01',
    )
    expect(xml).toContain('<loc>https://ilovejava.spacesdrive.cc/about</loc>')
  })

  it('falls back to the run date when an entry has no lastmod', () => {
    const xml = buildSitemapXml(
      [{ path: '/', changefreq: 'weekly', priority: 1 }],
      'https://ilovejava.spacesdrive.cc',
      '2026-03-14',
    )
    expect(xml).toContain('<lastmod>2026-03-14</lastmod>')
  })

  it('prefers an entry-specific lastmod over the run date', () => {
    const xml = buildSitemapXml(
      [{ path: '/', changefreq: 'weekly', priority: 1, lastmod: '2025-06-01' }],
      'https://ilovejava.spacesdrive.cc',
      '2026-03-14',
    )
    expect(xml).toContain('<lastmod>2025-06-01</lastmod>')
    expect(xml).not.toContain('<lastmod>2026-03-14</lastmod>')
  })
})
