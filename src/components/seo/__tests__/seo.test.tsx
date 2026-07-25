import { render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { Seo } from '../seo'

function getJsonLd() {
  const el = document.getElementById('seo-structured-data')
  return el ? JSON.parse(el.textContent ?? '{}') : null
}

describe('Seo', () => {
  afterEach(() => {
    document.getElementById('seo-structured-data')?.remove()
  })

  it('sets the document title with the site name suffix', () => {
    render(<Seo title="What is Java?" description="An introduction to Java." />)
    expect(document.title).toBe('What is Java? · ILoveJava')
  })

  it('injects structured data as JSON-LD when provided', () => {
    render(
      <Seo
        title="What is Java?"
        description="An introduction to Java."
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
        }}
      />,
    )

    expect(getJsonLd()).toEqual({
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
    })
  })

  it('removes structured data when a later render omits it', () => {
    const { rerender } = render(
      <Seo
        title="What is Java?"
        description="An introduction to Java."
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
        }}
      />,
    )
    expect(getJsonLd()).not.toBeNull()

    rerender(<Seo title="What is Java?" description="An introduction to Java." />)
    expect(getJsonLd()).toBeNull()
  })
})
