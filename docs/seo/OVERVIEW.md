# SEO

## The CSR constraint

This is a client-side rendered SPA - no SSR, no server-generated HTML per route (see [../architecture](../architecture)). That means:

- `index.html` ships a static `<title>`/`<meta description>` fallback (crawlers that don't execute JS see this).
- The [`Seo`](../../src/components/seo/seo.tsx) component patches `document.head` on mount/route change for crawlers that do execute JS (this covers Googlebot; it does not cover every crawler).
- Anything that must be indexable independent of JS execution (long-term: individual lesson pages, if organic search matters for them) is a candidate for static prerendering at build time - evaluate `vite-plugin-ssg`-style prerendering before reaching for a server, per the backend rule in [../architecture](../architecture).

## Per-page checklist

Every routed page must set, via `<Seo />`:

- `title` - sentence case, no site name (the component appends `· ILoveJava`)
- `description` - one sentence, unique per page
- `canonical` - only when it differs from the current URL (e.g. paginated views canonicalizing to page 1)
- `image` - for pages worth sharing (triggers `summary_large_image` Twitter card)
- `noindex` - for error pages, drafts, or any page that shouldn't rank (see `NotFoundPage` for the pattern)

## Structured data, sitemap, robots

Not yet implemented - added once there are real routes to describe. When they land:

- JSON-LD (`Course`/`LearningResource` schema for lessons) injected the same way as other head metadata
- `sitemap.xml` generated at build time from the content index (`src/content`)
- `robots.txt` in `public/`, referencing the sitemap

## URLs

Structured and stable: `/learn/<path-slug>/<lesson-slug>`, `/exercises/<slug>`, etc. Slugs are permanent (see [../content](../content)) - a URL that's been indexed should not need to change.
