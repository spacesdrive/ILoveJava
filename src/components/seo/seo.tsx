import * as React from 'react'

import { SITE_NAME, SITE_URL } from '@/constants/site'

export interface SeoProps {
  title: string
  description: string
  canonical?: string
  image?: string
  noindex?: boolean
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Applies page metadata directly to `document.head`.
 * The app is a client-rendered SPA, so this runs on mount/route change
 * rather than at request time — see docs/seo/README.md for crawlability notes.
 */
export function Seo({ title, description, canonical, image, noindex }: SeoProps) {
  React.useEffect(() => {
    const fullTitle = `${title} · ${SITE_NAME}`
    document.title = fullTitle

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')

    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:type', 'website')
    if (image) upsertMeta('property', 'og:image', image)

    upsertMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    if (image) upsertMeta('name', 'twitter:image', image)

    const url = canonical ?? `${SITE_URL}${window.location.pathname}`
    upsertLink('canonical', url)
    upsertMeta('property', 'og:url', url)
  }, [title, description, canonical, image, noindex])

  return null
}
