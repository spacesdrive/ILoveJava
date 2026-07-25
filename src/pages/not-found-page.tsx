import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Seo } from '@/components/seo/seo'

export function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" description="This page does not exist." noindex />
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">404</h1>
        <p className="text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild>
          <Link to="/">Back home</Link>
        </Button>
      </div>
    </>
  )
}
