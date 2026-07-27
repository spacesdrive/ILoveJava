import { CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GITHUB_URL } from '@/constants/site'

const SNIPPET = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, ILoveJava!");
    }
}`

export function HeroSection() {
  return (
    <section className="border-b">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-32">
        <div className="flex flex-col items-start gap-6 text-left">
          <Badge variant="secondary">Runs entirely in your browser</Badge>

          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Learn Java, one real program at a time.
          </h1>

          <p className="text-muted-foreground max-w-lg text-lg text-pretty">
            ILoveJava is a free, open source platform for learning Java: structured
            lessons, real code, and exercises that actually compile and run, no
            installation required.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/learn/java-fundamentals">Start Java Fundamentals</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                View on GitHub
              </a>
            </Button>
          </div>
        </div>

        <div className="w-full">
          <p className="text-muted-foreground mb-3 text-sm">
            From Lesson 4: Your First Java Program
          </p>
          <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
            <div className="text-muted-foreground border-b px-4 py-2 font-mono text-xs">
              Main.java
            </div>
            <pre className="bg-code text-code-foreground overflow-x-auto px-4 py-4 font-mono text-sm leading-relaxed">
              {SNIPPET}
            </pre>
            <div className="border-t px-4 py-3">
              <div className="text-muted-foreground flex items-center gap-2 font-mono text-sm">
                <CheckCircle2
                  className="text-primary size-4 shrink-0"
                  aria-hidden="true"
                />
                Hello, ILoveJava!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
