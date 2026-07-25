/**
 * Shared metadata contract every content type (lesson, exercise, quiz,
 * challenge, project) is built on top of. Individual engines extend this
 * with their own fields - see the types.ts file in each src/engines subfolder.
 */

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface ContentMeta {
  /** Stable, URL-safe identifier. Never reused, never renumbered. */
  slug: string
  title: string
  description: string
  difficulty: Difficulty
  /** Topic tags used for search, filtering, and related-content linking. */
  tags: string[]
  /** Slug of the learning path this content belongs to, if any. */
  pathSlug?: string
  /** ISO 8601 date string. */
  updatedAt: string
}
