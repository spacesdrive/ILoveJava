# lesson-engine

Renders `LessonContent` (see `types.ts`): an ordered list of typed blocks (prose, code, callout, visualization, inline check) rather than a single markdown blob, so lessons can mix explanation, runnable code, and interactive visualizations without ad hoc per-lesson components.

Not yet implemented: block renderer components, progress persistence (IndexedDB), prerequisite gating. This engine is a contract today; rendering components land with the first real feature — see [ROADMAP.md](../../../ROADMAP.md).
