import { createHighlighterCore, type HighlighterCore } from '@shikijs/core'
import { createJavaScriptRegexEngine } from '@shikijs/engine-javascript'

let highlighterPromise: Promise<HighlighterCore> | null = null

/**
 * A single shared highlighter, lazy-created and reused by every code block on
 * the page. Fine-grained bundle (Java and Bash grammars only, JS regex engine
 * instead of the WASM oniguruma engine) - the full `shiki` package plus its
 * default WASM engine pulled every bundled language's grammar into the
 * production build (~3MB across many chunks); this keeps the async chunk this
 * loads down to what these lessons actually need. See ADR 0004.
 */
function getHighlighter() {
  highlighterPromise ??= createHighlighterCore({
    themes: [
      import('@shikijs/themes/github-light'),
      import('@shikijs/themes/github-dark'),
    ],
    langs: [import('@shikijs/langs/java'), import('@shikijs/langs/bash')],
    engine: createJavaScriptRegexEngine(),
  })
  return highlighterPromise
}

export async function highlightLessonCode(code: string, lang: string) {
  const highlighter = await getHighlighter()
  return highlighter.codeToTokens(code, {
    lang,
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
  })
}
