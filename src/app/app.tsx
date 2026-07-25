import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from '@/app/providers/theme-provider'
import { router } from '@/app/router'
import { TooltipProvider } from '@/components/ui/tooltip'

export function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </ThemeProvider>
  )
}
