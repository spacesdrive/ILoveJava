import { GITHUB_URL, SITE_NAME } from '@/constants/site'

export function Footer() {
  return (
    <footer className="border-t">
      <div className="text-muted-foreground mx-auto max-w-5xl px-4 py-6 text-sm">
        <p>
          {SITE_NAME} is free and open source.{' '}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground underline underline-offset-4"
          >
            View on GitHub
          </a>
        </p>
      </div>
    </footer>
  )
}
