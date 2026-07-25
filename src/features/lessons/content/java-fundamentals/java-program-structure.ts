import type { LessonContent } from '@/engines/lesson-engine/types'

export const javaProgramStructure: LessonContent = {
  slug: 'java-program-structure',
  title: 'Java Program Structure',
  description:
    'The anatomy of a Java file: classes, the main method, packages, imports, comments, and the conventions that keep code readable.',
  difficulty: 'beginner',
  tags: ['java', 'syntax', 'style'],
  pathSlug: 'java-fundamentals',
  updatedAt: '2026-01-20',
  prerequisites: ['your-first-java-program'],
  estimatedMinutes: 16,
  blocks: [
    {
      type: 'prose',
      markdown:
        "You've now compiled and run a Java program without necessarily understanding every piece of it. This lesson slows down and names each part properly, so the rest of this path builds on a solid mental model instead of a memorized template.",
    },
    { type: 'visualization', component: 'program-structure-anatomy' },
    {
      type: 'prose',
      markdown:
        "## Classes\n\nA **class** is a container - a blueprint that groups related code together. Every piece of Java code lives inside some class; there's no such thing as a loose statement floating outside one. When a `.java` file contains a `public` class, the filename must match that class's name exactly, which is why `Main.java` has to contain `public class Main`.",
    },
    {
      type: 'prose',
      markdown:
        "## The main method, piece by piece\n\n```\npublic static void main(String[] args)\n```\n\n- **`public`** - this method can be called from outside the class (the JVM itself needs to call it).\n- **`static`** - it belongs to the class itself, not to any particular object created from it. This lets the JVM call it without creating an object first.\n- **`void`** - it doesn't return a value back to whoever called it.\n- **`main`** - the specific name the JVM looks for as the starting point.\n- **`(String[] args)`** - a list of text arguments passed in from the command line, covered more in a later course.\n\nYou don't need to fully understand `static` or object creation yet - later lessons build up to that. For now, recognize the shape: it's the fixed entry point every runnable Java program declares exactly once.",
    },
    {
      type: 'code',
      language: 'java',
      code: 'package com.example.app;\n\nimport java.util.Scanner;\n\n// Entry point for the application\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Ready.");\n    }\n}',
      highlightLines: [1, 3, 5],
    },
    {
      type: 'prose',
      markdown:
        "## Packages\n\nA **package** groups related classes together and prevents naming collisions - two classes named `Main` can coexist in a large project as long as they're in different packages. By convention, package names use reversed domain names in lowercase, like `com.example.app`. The `package` declaration, if present, must be the very first line in the file (comments aside).",
    },
    {
      type: 'prose',
      markdown:
        "## Imports\n\nJava's standard library ships thousands of ready-made classes, organized into packages. An **import** statement brings a specific class from another package into scope so you can refer to it by its short name. `import java.util.Scanner;` makes the `Scanner` class (covered in lesson 9, for reading user input) available as just `Scanner` instead of its full name, `java.util.Scanner`.",
    },
    {
      type: 'comparison-table',
      caption: 'Comment styles',
      headers: ['Syntax', 'Purpose'],
      rows: [
        [
          '// comment',
          'A single-line comment - everything after // on that line is ignored by the compiler',
        ],
        [
          '/* comment */',
          'A multi-line comment, useful for temporarily disabling a block of code',
        ],
        [
          '/** comment */',
          'A Javadoc comment, placed above a class or method to generate documentation',
        ],
      ],
    },
    {
      type: 'prose',
      markdown:
        'Comments exist purely for humans - the compiler ignores them entirely. Use them to explain *why* code does something non-obvious, not to restate what the code already says clearly.',
    },
    {
      type: 'prose',
      markdown:
        "## Braces and indentation\n\nCurly braces `{ }` mark the start and end of a block of code - a class body, a method body, and (starting in lesson 10) conditional and loop bodies are all delimited this way. The compiler only cares about the braces; it doesn't care about indentation or spacing at all. Indentation is a **convention**, not a requirement - but a strict one, because unindented Java is nearly unreadable once a program grows past a few lines.",
    },
    {
      type: 'callout',
      variant: 'best-practice',
      markdown:
        "Use a consistent indent (commonly 4 spaces) for every nested block, and let your editor auto-indent for you - both VS Code and IntelliJ IDEA do this by default. Consistent formatting isn't about taste; it's what lets you (and anyone else) spot a misplaced brace at a glance.",
    },
    {
      type: 'expandable',
      title: 'Where do these conventions come from?',
      markdown:
        "Most teams don't invent their own style rules - they adopt a published guide, most commonly the **Google Java Style Guide** or Oracle's own code conventions. If you ever join a team project, check for a style guide (or an auto-formatter configuration) before writing code, and match it rather than your personal preference.",
    },
    {
      type: 'steps',
      heading: 'Organizing a small project',
      steps: [
        {
          title: 'One public class per file',
          markdown:
            'A file can contain multiple classes, but at most one can be `public`, and it must match the filename.',
        },
        {
          title: 'Source files live under src',
          markdown:
            'By convention, all `.java` source files live inside a `src` folder at the project root.',
        },
        {
          title: 'Folders mirror package names',
          markdown:
            'A class in package `com.example.app` lives at `src/com/example/app/ClassName.java` - the folder structure mirrors the package structure exactly.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'mistake',
      markdown:
        'A missing closing brace `}` often doesn\'t show an error on the line that\'s actually wrong - the compiler frequently reports "reached end of file while parsing" at the very end of the file instead. If you see that error, count your opening and closing braces from the top.',
    },
    {
      type: 'flashcards',
      heading: 'Key terms from this lesson',
      cards: [
        {
          front: 'Class',
          back: 'A container/blueprint that all Java code lives inside.',
        },
        {
          front: 'Package',
          back: 'A namespace grouping related classes and preventing naming collisions.',
        },
        {
          front: 'Import',
          back: "A statement that brings another package's class into scope by its short name.",
        },
        {
          front: 'Comment',
          back: 'Text ignored by the compiler, written for human readers.',
        },
      ],
    },
    {
      type: 'quiz',
      quiz: {
        slug: 'java-program-structure-check',
        title: 'Quick check: Java Program Structure',
        description: 'A short knowledge check for the "Java Program Structure" lesson.',
        difficulty: 'beginner',
        tags: ['java', 'syntax'],
        updatedAt: '2026-01-20',
        passThreshold: 0.7,
        questions: [
          {
            type: 'true-false',
            id: 'q1',
            prompt: 'The Java compiler requires code to be indented in a specific way.',
            correctAnswer: false,
            explanation:
              'Indentation is a human readability convention, not something the compiler checks - braces alone define code blocks.',
          },
          {
            type: 'mcq',
            id: 'q2',
            prompt: 'What does an import statement do?',
            choices: [
              'Compiles a file',
              "Brings another package's class into scope by its short name",
              'Declares a new package',
              'Prints text to the console',
            ],
            correctChoiceIndex: 1,
            explanation:
              'import lets you refer to a class from another package by its short name instead of its fully qualified name.',
          },
          {
            type: 'mcq',
            id: 'q3',
            prompt: 'If present, where must the package declaration appear in a file?',
            choices: [
              'Anywhere',
              'The last line',
              'The first line (comments aside)',
              'Inside the main method',
            ],
            correctChoiceIndex: 2,
            explanation:
              'The package declaration, when present, must be the first line of code in the file.',
          },
        ],
      },
    },
    {
      type: 'summary',
      takeaways: [
        'All Java code lives inside a class; a public class must be named exactly like its file.',
        "main's signature (public static void main(String[] args)) is a fixed shape the JVM looks for as the entry point.",
        "Packages namespace classes and prevent naming collisions; imports bring another package's class into scope.",
        'Braces define code blocks to the compiler; indentation is a readability convention that editors handle automatically.',
      ],
      furtherReading: [
        {
          label: 'Google Java Style Guide',
          href: 'https://google.github.io/styleguide/javaguide.html',
        },
      ],
    },
  ],
}
