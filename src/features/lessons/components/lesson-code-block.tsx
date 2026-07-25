import type { ThemedToken } from '@shikijs/types'
import * as React from 'react'

import { cn } from '@/lib/utils'

import { highlightLessonCode } from './lesson-code-highlighter'

export interface LessonCodeBlockProps {
  language: string
  code: string
  highlightLines?: number[]
}

type HighlightState =
  | { status: 'loading' }
  | { status: 'highlighted'; lines: ThemedToken[][] }
  | { status: 'unavailable' }

/**
 * Renders as plain, unstyled `<pre><code>` while Shiki loads (or if it fails,
 * e.g. an unrecognized `language`) - highlighting is a progressive enhancement,
 * never a requirement for the code to be readable.
 */
export function LessonCodeBlock({
  language,
  code,
  highlightLines = [],
}: LessonCodeBlockProps) {
  // Language/code are static for a given block's lifetime in practice (they come
  // from fixed lesson content), so this never needs to reset back to 'loading' -
  // it just resolves once from its initial state.
  const [state, setState] = React.useState<HighlightState>({ status: 'loading' })

  React.useEffect(() => {
    let cancelled = false

    // Lesson content authors an arbitrary language string; one this app's fine-grained
    // Shiki bundle doesn't register (see lesson-code-highlighter.ts) throws, which the
    // .catch below turns into the plain-text fallback.
    highlightLessonCode(code, language)
      .then(({ tokens }) => {
        if (!cancelled) setState({ status: 'highlighted', lines: tokens })
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'unavailable' })
      })

    return () => {
      cancelled = true
    }
  }, [language, code])

  if (state.status !== 'highlighted') {
    return (
      <pre className="bg-code text-code-foreground overflow-x-auto rounded-md p-4 text-sm">
        <code className="font-mono whitespace-pre">{code}</code>
      </pre>
    )
  }

  return (
    <pre className="lesson-code-block bg-code overflow-x-auto rounded-md p-4 text-sm">
      <code className="font-mono whitespace-pre">
        {state.lines.map((line, lineIndex) => (
          <div
            key={lineIndex}
            className={cn(
              '-mx-4 px-4',
              highlightLines.includes(lineIndex + 1) && 'bg-accent/40',
            )}
          >
            {line.length === 0
              ? ' '
              : line.map((token, tokenIndex) => (
                  <span
                    key={tokenIndex}
                    style={{
                      color: 'var(--shiki-light)',
                      ...(token.htmlStyle as React.CSSProperties),
                    }}
                  >
                    {token.content}
                  </span>
                ))}
          </div>
        ))}
      </code>
    </pre>
  )
}
