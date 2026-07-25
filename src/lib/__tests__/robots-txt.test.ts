import { describe, expect, it } from 'vitest'

import { buildRobotsTxt } from '../robots-txt'

describe('buildRobotsTxt', () => {
  it('allows all crawlers and references the sitemap', () => {
    const robots = buildRobotsTxt('https://ilovejava.spacesdrive.cc')

    expect(robots).toContain('User-agent: *')
    expect(robots).toContain('Allow: /')
    expect(robots).toContain('Sitemap: https://ilovejava.spacesdrive.cc/sitemap.xml')
  })

  it('normalizes a trailing slash on siteUrl', () => {
    const robots = buildRobotsTxt('https://ilovejava.spacesdrive.cc/')
    expect(robots).toContain('Sitemap: https://ilovejava.spacesdrive.cc/sitemap.xml')
    expect(robots).not.toContain('//sitemap.xml')
  })
})
