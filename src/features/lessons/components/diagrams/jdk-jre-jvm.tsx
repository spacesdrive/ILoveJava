export function JdkJreJvmDiagram() {
  return (
    <figure className="flex flex-col gap-3">
      <div className="bg-card rounded-lg border p-6" aria-hidden="true">
        <div className="border-primary/40 rounded-lg border-2 border-dashed p-4">
          <p className="mb-3 text-center text-sm font-semibold">
            JDK - Java Development Kit
          </p>
          <div className="border-primary/60 rounded-lg border-2 border-dashed p-4">
            <p className="mb-3 text-center text-sm font-semibold">
              JRE - Java Runtime Environment
            </p>
            <div className="bg-background rounded-lg border p-4 text-center">
              <p className="text-sm font-semibold">JVM - Java Virtual Machine</p>
              <p className="text-muted-foreground text-xs">Runs bytecode</p>
            </div>
            <p className="text-muted-foreground mt-2 text-center text-xs">
              + core class libraries
            </p>
          </div>
          <p className="text-muted-foreground mt-2 text-center text-xs">
            + compiler (javac), debugger, and other developer tools
          </p>
        </div>
      </div>
      <figcaption className="text-muted-foreground text-center text-sm">
        The JVM runs bytecode. The JRE bundles the JVM with the standard libraries
        needed to run a program. The JDK bundles the JRE with the tools - like the
        compiler - needed to build one.
      </figcaption>
    </figure>
  )
}
