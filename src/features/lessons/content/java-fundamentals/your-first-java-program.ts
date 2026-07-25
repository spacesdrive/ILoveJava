import type { LessonContent } from '@/engines/lesson-engine/types'

export const yourFirstJavaProgram: LessonContent = {
  slug: 'your-first-java-program',
  title: 'Your First Java Program',
  description:
    'Write, compile, and run a real Java program for the first time, and understand exactly what happens when you do.',
  difficulty: 'beginner',
  tags: ['java', 'hello-world', 'basics'],
  pathSlug: 'java-fundamentals',
  updatedAt: '2026-01-20',
  prerequisites: ['installing-java'],
  estimatedMinutes: 15,
  blocks: [
    {
      type: 'prose',
      markdown:
        "Everything so far has been conceptual. This is where that changes: you're about to write, compile, and run a real Java program. It won't do much - just print a line of text - but every Java program you'll ever write, no matter how large, starts from this same shape.",
    },
    {
      type: 'code',
      language: 'java',
      code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, world!");\n    }\n}',
      highlightLines: [3],
    },
    {
      type: 'prose',
      markdown:
        'Save this exactly as `Main.java` inside your `src` folder from lesson 3. The filename has to match the class name (`Main`) exactly, including capitalization - more on why in lesson 5, but for now, just match it.',
    },
    {
      type: 'steps',
      heading: 'What each line does',
      steps: [
        {
          title: 'public class Main',
          markdown:
            'Declares a class named `Main` - the container your code lives in. Lesson 5 explains classes in full.',
        },
        {
          title: 'public static void main(String[] args)',
          markdown:
            'The **main method** - the exact spot the JVM looks for and starts running first. Every runnable Java program needs exactly one of these.',
        },
        {
          title: 'System.out.println("Hello, world!");',
          markdown:
            'Prints the text between the quotes to the console, followed by a new line. This is the one line actually doing something here - lesson 9 covers output in depth.',
        },
      ],
    },
    {
      type: 'prose',
      markdown: '## Compiling and running',
    },
    {
      type: 'code',
      language: 'bash',
      code: 'javac Main.java\njava Main',
    },
    {
      type: 'steps',
      steps: [
        {
          title: 'javac Main.java',
          markdown:
            'Compiles your source file, producing `Main.class` - the bytecode from lesson 2 - in the same folder.',
        },
        {
          title: 'java Main',
          markdown:
            "Runs it: the JVM loads `Main.class`, finds `main`, and executes it. Notice there's no `.java` or `.class` extension here - just the class name.",
        },
      ],
    },
    {
      type: 'prose',
      markdown:
        '## Understanding the output\n\nIf everything worked, your terminal shows exactly one line:\n\n```\nHello, world!\n```\n\nNo extra output, no confirmation message - `javac` only prints something if compilation fails, and `java` only prints what your program tells it to. Seeing precisely the text from your `println` call, and nothing else, is exactly what success looks like.',
    },
    {
      type: 'callout',
      variant: 'mistake',
      markdown:
        "A very common early mistake: the filename must match the `public` class name exactly, including capitalization - `main.java` or `Main1.java` won't compile against `public class Main`. If you see an error mentioning the class name and the filename, this is almost always why.",
    },
    {
      type: 'callout',
      variant: 'tip',
      markdown:
        "Modern Java (11 and later) lets you skip the separate compile step for quick experiments: `java Main.java` compiles and runs in one step, without producing a `.class` file. It's convenient for small scripts, but real projects still compile explicitly - you'll use the two-step process for the rest of this course.",
    },
    {
      type: 'expandable',
      title: 'Common compiler errors for a first program',
      markdown:
        "- **`error: ';' expected`** - a statement is missing its semicolon.\n- **`error: reached end of file while parsing`** - a brace `{` was opened but never closed.\n- **`error: class Main is public, should be declared in a file named Main.java`** - the filename doesn't match the public class name.\n\nThe Java compiler's errors include a line number - start there, and check the line immediately above it too, since a missing brace or semicolon often only becomes visible to the compiler on the following line.",
    },
    {
      type: 'exercise',
      exercise: {
        slug: 'first-program-greeting',
        title: 'Print your own greeting',
        description: 'Modify the Hello World program to print a different message.',
        difficulty: 'beginner',
        tags: ['java', 'hello-world'],
        updatedAt: '2026-01-20',
        prompt:
          'Starting from the Hello World program, change the message so it prints exactly: Hello, ILoveJava!',
        starterCode:
          'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, world!");\n    }\n}',
        solutionCode:
          'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, ILoveJava!");\n    }\n}',
        testCases: [
          {
            id: 'tc-1',
            description: 'Prints the exact greeting',
            input: '',
            expectedOutput: 'Hello, ILoveJava!',
          },
        ],
        hints: [
          'Only the text inside the double quotes needs to change.',
          'Keep the semicolon at the end of the line.',
          'Capitalization and punctuation in the output need to match exactly.',
        ],
      },
    },
    {
      type: 'flashcards',
      heading: 'Key terms from this lesson',
      cards: [
        {
          front: 'main method',
          back: 'The exact method the JVM looks for and runs first when a program starts.',
        },
        {
          front: 'javac',
          back: "Java's compiler command - translates a .java file into a .class bytecode file.",
        },
        {
          front: 'System.out.println',
          back: 'Prints text to the console, followed by a new line.',
        },
      ],
    },
    {
      type: 'quiz',
      quiz: {
        slug: 'your-first-java-program-check',
        title: 'Quick check: Your First Java Program',
        description:
          'A short knowledge check for the "Your First Java Program" lesson.',
        difficulty: 'beginner',
        tags: ['java', 'hello-world'],
        updatedAt: '2026-01-20',
        passThreshold: 0.7,
        questions: [
          {
            type: 'mcq',
            id: 'q1',
            prompt:
              'What must the filename match for `public class Main { ... }` to compile?',
            choices: [
              'Nothing in particular',
              'The word "main" in lowercase',
              'The public class name exactly, including capitalization',
              'The package name',
            ],
            correctChoiceIndex: 2,
            explanation:
              'A file containing a public class must be named exactly after that class, including capitalization.',
          },
          {
            type: 'true-false',
            id: 'q2',
            prompt: 'Running `java Main` requires including the .class extension.',
            correctAnswer: false,
            explanation:
              'You run a compiled class by its name only - `java Main`, not `java Main.class`.',
          },
          {
            type: 'mcq',
            id: 'q3',
            prompt: 'Which command compiles Main.java into bytecode?',
            choices: [
              'java Main.java',
              'javac Main.java',
              'compile Main.java',
              'run Main.java',
            ],
            correctChoiceIndex: 1,
            explanation:
              '`javac` is the compiler command; it produces Main.class from Main.java.',
          },
        ],
      },
    },
    {
      type: 'summary',
      takeaways: [
        'Every runnable Java program needs a class containing a main method - the exact place the JVM starts running.',
        'javac Main.java compiles source into bytecode; java Main runs the compiled class.',
        'The output you see is only what your program explicitly prints - nothing more.',
        'The filename must exactly match the public class name, including capitalization - this is the most common early compile error.',
      ],
      furtherReading: [
        {
          label:
            'Oracle: "Hello World!" for the NetBeans Platform (general Hello World background)',
          href: 'https://docs.oracle.com/javase/tutorial/getStarted/application/index.html',
        },
      ],
    },
  ],
}
