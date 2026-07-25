export function ControlFlowIfElseDiagram() {
  return (
    <figure className="flex flex-col gap-3">
      <div
        className="bg-card flex flex-col items-center gap-2 rounded-lg border p-6"
        aria-hidden="true"
      >
        <div className="bg-background rounded-md border px-4 py-2 font-mono text-sm font-medium">
          temperature &gt; 30
        </div>
        <div className="bg-border h-6 w-px" />
        <div className="flex w-full justify-center gap-12">
          <div className="flex flex-col items-center gap-2">
            <span className="text-primary text-xs font-semibold">true</span>
            <div className="bg-background rounded-md border px-4 py-2 text-sm">
              &quot;It&rsquo;s hot&quot;
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-muted-foreground text-xs font-semibold">false</span>
            <div className="bg-background rounded-md border px-4 py-2 text-sm">
              &quot;It&rsquo;s not hot&quot;
            </div>
          </div>
        </div>
      </div>
      <figcaption className="text-muted-foreground text-center text-sm">
        An if/else branches execution: exactly one path runs, chosen by whether the
        condition is true or false.
      </figcaption>
    </figure>
  )
}
