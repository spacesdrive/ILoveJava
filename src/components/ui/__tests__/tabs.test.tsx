import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

describe('Tabs', () => {
  it('switches panels when a trigger is activated', async () => {
    render(
      <Tabs defaultValue="prompt">
        <TabsList>
          <TabsTrigger value="prompt">Prompt</TabsTrigger>
          <TabsTrigger value="hints">Hints</TabsTrigger>
        </TabsList>
        <TabsContent value="prompt">Prompt content</TabsContent>
        <TabsContent value="hints">Hints content</TabsContent>
      </Tabs>,
    )

    expect(screen.getByText('Prompt content')).toBeVisible()

    await userEvent.click(screen.getByRole('tab', { name: 'Hints' }))

    expect(screen.getByText('Hints content')).toBeVisible()
  })
})
