# constants/

App-wide constants that don't belong to a single feature (site metadata, shared route paths, storage keys).

Rules:

- Feature-specific constants live inside that feature's own folder, not here.
- Values here should be primitives or frozen literals — no derived logic.
