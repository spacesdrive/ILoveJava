interface AnnotatedLine {
  code: string
  comment?: string
}

const LINES: AnnotatedLine[] = [
  { code: 'package com.example.app;', comment: 'package declaration' },
  { code: '' },
  { code: 'import java.util.Scanner;', comment: 'import' },
  { code: '' },
  { code: 'public class Main {', comment: 'class declaration' },
  { code: '    public static void main(String[] args) {', comment: 'entry point' },
  { code: '        // ...' },
  { code: '    }' },
  { code: '}' },
]

export function ProgramStructureAnatomyDiagram() {
  return (
    <figure className="flex flex-col gap-3">
      <pre
        className="bg-code text-code-foreground overflow-x-auto rounded-lg border p-4 font-mono text-sm"
        aria-hidden="true"
      >
        <code>
          {LINES.map((line, index) => (
            <div key={index} className="flex gap-4 whitespace-pre">
              <span className="flex-1">{line.code || ' '}</span>
              {line.comment && (
                <span className="text-muted-foreground shrink-0">
                  // {line.comment}
                </span>
              )}
            </div>
          ))}
        </code>
      </pre>
      <figcaption className="text-muted-foreground text-center text-sm">
        A minimal Java file: an optional package declaration, any imports, then a class
        containing the main method the JVM calls first.
      </figcaption>
    </figure>
  )
}
