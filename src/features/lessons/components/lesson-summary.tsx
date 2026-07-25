import { ArrowUpRight, CheckCircle2 } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export interface LessonSummaryLink {
  label: string
  href: string
}

export interface LessonSummaryProps {
  takeaways: string[]
  furtherReading?: LessonSummaryLink[]
}

export function LessonSummary({ takeaways, furtherReading }: LessonSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key takeaways</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ul className="flex flex-col gap-2">
          {takeaways.map((takeaway, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <CheckCircle2
                className="text-primary mt-0.5 size-4 shrink-0"
                aria-hidden="true"
              />
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
        {furtherReading && furtherReading.length > 0 && (
          <div className="flex flex-col gap-2 border-t pt-4">
            <h4 className="text-sm font-medium">Further reading</h4>
            <ul className="flex flex-col gap-1">
              {furtherReading.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary inline-flex items-center gap-1 text-sm underline underline-offset-4"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
