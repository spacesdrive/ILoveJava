import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function FinalCta() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight">
          Write your first Java program today.
        </h2>
        <p className="text-muted-foreground mx-auto mt-3 max-w-md">
          Free, no account needed. Start with What is Java? and work through the Java
          Fundamentals path at your own pace.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link to="/learn/java-fundamentals">Start Java Fundamentals</Link>
        </Button>
      </div>
    </section>
  )
}
