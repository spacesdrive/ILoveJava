import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

describe('Breadcrumb', () => {
  it('renders a navigable trail with the current page marked', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/learn/java-fundamentals">
              Java fundamentals
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>What is Java?</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    )

    expect(screen.getByRole('navigation', { name: 'breadcrumb' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Java fundamentals' })).toHaveAttribute(
      'href',
      '/learn/java-fundamentals',
    )
    expect(screen.getByText('What is Java?')).toHaveAttribute('aria-current', 'page')
  })
})
