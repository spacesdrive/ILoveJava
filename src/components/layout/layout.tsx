import { Outlet } from 'react-router-dom'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export function Layout() {
  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main-content"
        className="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
