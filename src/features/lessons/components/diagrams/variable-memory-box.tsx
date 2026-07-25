const EXAMPLE_VARIABLES = [
  { name: 'age', type: 'int', value: '25' },
  { name: 'price', type: 'double', value: '19.99' },
  { name: 'isActive', type: 'boolean', value: 'true' },
]

export function VariableMemoryBoxDiagram() {
  return (
    <figure className="flex flex-col gap-3">
      <div
        className="bg-card flex flex-wrap justify-center gap-6 rounded-lg border p-6"
        aria-hidden="true"
      >
        {EXAMPLE_VARIABLES.map((variable) => (
          <div key={variable.name} className="flex flex-col items-center gap-1">
            <span className="text-muted-foreground font-mono text-xs">
              {variable.type} {variable.name}
            </span>
            <div className="border-primary/50 bg-background flex h-14 w-24 items-center justify-center rounded-md border-2 font-mono text-sm font-semibold">
              {variable.value}
            </div>
          </div>
        ))}
      </div>
      <figcaption className="text-muted-foreground text-center text-sm">
        Each variable reserves a labeled box in memory - its declared type fixes the
        box&rsquo;s size and what kind of value can go in it.
      </figcaption>
    </figure>
  )
}
