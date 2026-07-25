import { Seo } from '@/components/seo/seo'

export function HomePage() {
  return (
    <>
      <Seo
        title="Learn Java, Interactively"
        description="ILoveJava is a free, open source, interactive platform for learning Java - lessons, exercises, playgrounds, and more, all in your browser."
      />
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">ILoveJava</h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-xl">
          The engineering foundation is live. Lessons, exercises, and playgrounds are on
          the way.
        </p>
      </div>
    </>
  )
}
