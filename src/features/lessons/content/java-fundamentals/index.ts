import type { LessonContent } from '@/engines/lesson-engine/types'
import type { SitemapEntry } from '@/lib/sitemap'

import { controlFlow } from './control-flow'
import { dataTypes } from './data-types'
import { howJavaWorks } from './how-java-works'
import { inputAndOutput } from './input-and-output'
import { installingJava } from './installing-java'
import { javaProgramStructure } from './java-program-structure'
import { operators } from './operators'
import { variables } from './variables'
import { whatIsJava } from './what-is-java'
import { yourFirstJavaProgram } from './your-first-java-program'

export const JAVA_FUNDAMENTALS_PATH_SLUG = 'java-fundamentals'
export const JAVA_FUNDAMENTALS_PATH_TITLE = 'Java Fundamentals'

/**
 * Ordered lesson list for the Java Fundamentals path - array order defines the
 * prerequisite chain, previous/next navigation, and roadmap position. Pure data,
 * no React imports, so it's safe to import from build tooling (vite-sitemap-plugin.ts)
 * as well as app code.
 */
export const javaFundamentalsLessons: LessonContent[] = [
  whatIsJava,
  howJavaWorks,
  installingJava,
  yourFirstJavaProgram,
  javaProgramStructure,
  variables,
  dataTypes,
  operators,
  inputAndOutput,
  controlFlow,
]

/** The docs/seo/OVERVIEW.md "Future extension points" pattern, now in use: one function per content type, merged into vite-sitemap-plugin.ts's entries. */
export function getLessonSitemapEntries(): SitemapEntry[] {
  return javaFundamentalsLessons.map((lesson) => ({
    path: `/learn/${JAVA_FUNDAMENTALS_PATH_SLUG}/${lesson.slug}`,
    changefreq: 'monthly',
    priority: 0.8,
  }))
}
