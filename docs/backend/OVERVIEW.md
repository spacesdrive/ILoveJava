# Backend

There is no backend today. This document exists so that the _next_ time a feature seems to need one, the decision is made deliberately instead of by default.

## The rule

Assume every feature works without a backend. Before introducing one, evaluate in this order (see [../architecture](../architecture) for the full list of browser-native alternatives):

1. Can this run entirely in the browser (localStorage/IndexedDB/Cache API/Web Workers/WASM)?
2. If not, can the feature degrade gracefully without the capability a backend would add, keeping it optional?
3. If a backend is genuinely required, write an ADR (see [../decisions/template.md](../decisions/template.md)) before implementing anything.

## Known future candidate

**Java code execution** (`src/engines/playground-engine`) is the one subsystem already flagged as possibly needing a backend - there is no mainstream in-browser JVM. See that engine's `OVERVIEW.md` for the two candidate strategies (in-browser WASM JVM vs. a small server sandbox) and why neither has been chosen yet.

If and when a backend is introduced, see [../cloudflare](../cloudflare) for the deployment target.
