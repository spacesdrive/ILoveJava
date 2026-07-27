import { GitBranch } from 'lucide-react'
import { Link } from 'react-router-dom'

import { GITHUB_URL, SITE_DESCRIPTION, SITE_NAME } from '@/constants/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex max-w-sm flex-col gap-2">
            <span className="text-base font-semibold tracking-tight">{SITE_NAME}</span>
            <p className="text-muted-foreground text-sm">{SITE_DESCRIPTION}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3 text-sm sm:items-end">
            <Link
              to="/learn/java-fundamentals"
              className="text-muted-foreground hover:text-foreground"
            >
              Java Fundamentals
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"
            >
              <GitBranch className="size-4" aria-hidden="true" />
              Source code
            </a>
            <a
              href={`${GITHUB_URL}/issues`}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              Report an issue
            </a>
          </nav>
        </div>

        <p className="text-muted-foreground mt-10 border-t pt-6 text-sm">
          &copy; {year} {SITE_NAME}. Free and open source under the MIT license.
        </p>
      </div>
    </footer>
  )
}
