# Writing and Design Standards

These rules apply to all generated code, documentation, UI copy, commit messages, comments, and any user-facing text in this project. Follow them without exception.

## Typography

- Never use emojis.
- Never use Unicode emoji icons.
- Never use emoticons.
- Never use em dashes. Use a standard hyphen (`-`) or restructure the sentence.
- Never use en dashes where a hyphen is appropriate.
- Always use standard ASCII hyphens (`-`).

## Icons

- Never use emoji as icons in UI.
- Use SVG icons only.
- Use [Lucide React](https://lucide.dev) (`lucide-react`) for all icons.
- If Lucide does not have an appropriate icon, use another open-source SVG icon library (e.g. Radix Icons, Heroicons) rather than an emoji or a raster image.
- All icons in the same UI context must have consistent size, stroke width, spacing, and visual weight.

## Writing style

Write in clear, professional English.

Avoid:

- Unnecessary buzzwords
- Filler text or padding sentences
- Exaggerated marketing language ("powerful", "blazing fast", "revolutionary")
- Repetitive wording across adjacent sentences

Prefer:

- Concise, direct sentences
- Descriptive headings that name the content, not the type of content
- Readable formatting with appropriate whitespace
- Consistent terminology throughout the project (pick one name for a concept and use it everywhere - e.g. always "learning path", never also "track" or "curriculum")

## Markdown

Use clean Markdown in all documentation.

Prefer:

- Headings for structure
- Bullet lists for non-sequential items
- Numbered lists for steps or ordered items
- Tables when comparing or listing structured data

Avoid:

- Excessive bold formatting (bold is for the single most critical item in a block, not decoration)
- Nested bullet lists deeper than two levels
- HTML tags inside Markdown except when necessary

Documentation filenames: `SCREAMING_SNAKE_CASE.md` for files under `docs/` (e.g. `WRITING_STANDARDS.md`), and `OVERVIEW.md` for the single doc file inside a `docs/<topic>/` or `src/<folder>/` directory. The project root keeps conventional names (`README.md`, `CHANGELOG.md`, `CONTRIBUTING.md`) because those are read by GitHub and tooling. Do not default to `README.md` for a folder's documentation file - name it for what it actually is, following the pattern above.

## Code comments

Add a comment only when the WHY is non-obvious: a hidden constraint, a subtle invariant, a workaround for a specific external bug, or behavior that would surprise a future reader.

Do not add comments that:

- Describe what the code does (well-named identifiers already do that)
- Reference the current task, ticket, or PR ("added for issue #123")
- Explain callers or downstream effects ("used by X")
- Restate what is visible in the code

One short line per comment, maximum. No multi-paragraph comment blocks, no JSDoc unless the project adopts a documented reason to.

## UI copy

Write from the user's perspective, not the system's internals.

- Name things by what the user recognizes, not how the code is structured.
- Action labels describe exactly what happens: "Publish" not "Submit", "Delete account" not "Remove".
- Success feedback confirms what happened: "Lesson completed" not "Success".
- Error messages explain what went wrong and what to do: "Could not load this lesson - check your connection and try again" not "Something went wrong".
- No apologies in error messages.
- No vague messages.

## Commit messages

Follow Conventional Commits format - see [workflows/GIT.md](workflows/GIT.md) for full details.

- Subject line: `type(scope): short imperative sentence`
- No period at the end of the subject line
- Subject line under 72 characters
- No emojis or decorative characters
- Present tense: "add" not "added", "fix" not "fixed"
- Body is optional; include it when the why is non-obvious

## UI consistency

Every page must feel like it belongs to the same application.

Maintain:

- Consistent page padding and vertical rhythm (Tailwind spacing scale - see [design](design))
- Consistent card structure (shadcn `Card` with `CardHeader`/`CardContent`)
- Consistent loading states (shadcn `Skeleton`, not ad hoc spinners)
- Consistent error display (a single error-banner or toast pattern, not one-off implementations per page)
- Consistent icon usage (Lucide, same stroke width and size within a context)
- Consistent button variants (`default` for the primary action, `outline`/`ghost` for secondary - see [components](components))

The entire project should feel like one polished application, not independently built pages.
