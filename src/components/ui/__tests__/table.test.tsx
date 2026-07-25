import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

describe('Table', () => {
  it('renders headers, rows, and a caption with the correct semantics', () => {
    render(
      <Table>
        <TableCaption>Primitive type ranges</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>int</TableCell>
            <TableCell>4 bytes</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Type' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: '4 bytes' })).toBeInTheDocument()
    expect(screen.getByText('Primitive type ranges')).toBeInTheDocument()
  })
})
