/**
 * Crawl rules for all user agents. No route in this app is private/admin/auth
 * today (see docs/seo/OVERVIEW.md) - if one is added later, add its Disallow
 * rule here rather than hand-editing a static public/robots.txt.
 */
const CRAWL_RULES = ['User-agent: *', 'Allow: /']

export function buildRobotsTxt(siteUrl: string): string {
  const baseUrl = siteUrl.replace(/\/$/, '')
  return `${CRAWL_RULES.join('\n')}\n\nSitemap: ${baseUrl}/sitemap.xml\n`
}
