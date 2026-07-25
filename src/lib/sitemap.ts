export type ChangeFreq =
  'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export interface SitemapEntry {
  /** Site-root-relative path, e.g. '/' or '/learn/loops'. Never an absolute URL. */
  path: string
  changefreq: ChangeFreq
  /** 0.0-1.0, per the Sitemap Protocol. */
  priority: number
  /** ISO 8601 date. Defaults to the generator's run date when omitted. */
  lastmod?: string
}

const VALID_CHANGEFREQ: ReadonlySet<ChangeFreq> = new Set([
  'always',
  'hourly',
  'daily',
  'weekly',
  'monthly',
  'yearly',
  'never',
])

/**
 * Checks entries against the Sitemap Protocol and this project's URL rules
 * (docs/seo/OVERVIEW.md) - duplicates, invalid priority/changefreq, query
 * strings, hash fragments, and non-root-relative paths. Returns one message
 * per problem found; an empty array means the entries are valid.
 */
export function validateSitemapEntries(entries: SitemapEntry[]): string[] {
  const errors: string[] = []
  const seenPaths = new Set<string>()

  for (const entry of entries) {
    const label = entry.path || '(empty path)'

    if (!entry.path.startsWith('/')) {
      errors.push(`${label}: path must be site-root-relative (start with "/")`)
    }
    if (entry.path.includes('?')) {
      errors.push(`${label}: path must not contain a query string`)
    }
    if (entry.path.includes('#')) {
      errors.push(`${label}: path must not contain a hash fragment`)
    }
    if (seenPaths.has(entry.path)) {
      errors.push(`${label}: duplicate URL`)
    }
    seenPaths.add(entry.path)

    if (!VALID_CHANGEFREQ.has(entry.changefreq)) {
      errors.push(`${label}: invalid changefreq "${entry.changefreq}"`)
    }
    if (!(entry.priority >= 0 && entry.priority <= 1)) {
      errors.push(
        `${label}: priority must be between 0.0 and 1.0, got ${entry.priority}`,
      )
    }
    if (entry.lastmod !== undefined && Number.isNaN(Date.parse(entry.lastmod))) {
      errors.push(`${label}: lastmod "${entry.lastmod}" is not a valid date`)
    }
  }

  return errors
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Builds a valid sitemap.xml document per Google's Sitemap Protocol. Callers
 * must validate entries first (see validateSitemapEntries) - this function
 * assumes it's given a valid, deduplicated list and does not re-check.
 */
export function buildSitemapXml(
  entries: SitemapEntry[],
  siteUrl: string,
  runDate: string,
): string {
  const baseUrl = siteUrl.replace(/\/$/, '')

  const urls = entries
    .map((entry) => {
      const loc = escapeXml(`${baseUrl}${entry.path}`)
      const lastmod = entry.lastmod ?? runDate
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${entry.changefreq}</changefreq>`,
        `    <priority>${entry.priority.toFixed(1)}</priority>`,
        '  </url>',
      ].join('\n')
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}
