import { GitBranch, Moon, Sun } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/app/providers/theme-provider'
import { GITHUB_URL, SITE_NAME } from '@/constants/site'
import { cn } from '@/lib/utils'

export function Header() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <header className="bg-background/80 sticky top-0 z-40 border-b backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-base font-semibold tracking-tight">
          {SITE_NAME}
        </Link>

        <nav aria-label="Primary" className="hidden sm:block">
          <NavLink
            to="/learn/java-fundamentals"
            className={({ isActive }) =>
              cn(
                'text-sm font-medium transition-colors',
                isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )
            }
          >
            Java Fundamentals
          </NavLink>
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="View source on GitHub"
            >
              <GitBranch />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="hidden dark:block" />
            <Moon className="block dark:hidden" />
          </Button>
        </div>
      </div>
    </header>
  )
}
