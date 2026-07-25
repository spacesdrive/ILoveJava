import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Seo } from '@/components/seo/seo'

export function HomePage() {
  return (
    <>
      <Seo
        title="Learn Java, Interactively"
        description="ILoveJava is a free, open source, interactive platform for learning Java - lessons, exercises, playgrounds, and more, all in your browser."
      />
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">ILoveJava</h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-xl">
          A free, open source, interactive platform for learning Java - lessons,
          exercises, and playgrounds, all in your browser.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link to="/learn/java-fundamentals">Start Java Fundamentals</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
