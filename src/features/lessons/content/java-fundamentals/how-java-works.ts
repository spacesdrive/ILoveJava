import type { LessonContent } from '@/engines/lesson-engine/types'

export const howJavaWorks: LessonContent = {
  slug: 'how-java-works',
  title: 'How Java Works',
  description:
    'How Java actually delivers on "write once, run anywhere" - source code, the compiler, bytecode, and the JVM.',
  difficulty: 'beginner',
  tags: ['java', 'jvm', 'overview'],
  pathSlug: 'java-fundamentals',
  updatedAt: '2026-01-20',
  prerequisites: ['what-is-java'],
  estimatedMinutes: 14,
  blocks: [
    {
      type: 'prose',
      markdown:
        'Lesson 1 introduced Java\'s "write once, run anywhere" promise. This lesson explains exactly how that works - still no code to write, just the pipeline your program travels through from the moment you save a file to the moment it runs. Understanding this now will make everything from lesson 3 onward click faster, because you\'ll know *why* each tool exists, not just that it does.',
    },
    {
      type: 'prose',
      markdown:
        "## Source code\n\n**Source code** is the human-readable text a developer writes - the `.java` files containing the instructions a program follows. On its own, source code means nothing to a computer's processor; it has to be translated into something the machine can actually execute. That translation is the compiler's job.",
    },
    { type: 'visualization', component: 'java-execution-flow' },
    {
      type: 'steps',
      heading: 'From source code to running program',
      steps: [
        {
          title: 'You write source code',
          markdown:
            "A plain text file with a `.java` extension, containing your program's instructions.",
        },
        {
          title: 'The compiler (javac) translates it',
          markdown:
            "Java's compiler, `javac`, reads your `.java` file and translates it - not into machine code for one specific processor, but into an intermediate format called **bytecode**.",
        },
        {
          title: 'Bytecode is produced (.class files)',
          markdown:
            'The output is a `.class` file containing bytecode: compact instructions that no real processor understands directly, but that any **Java Virtual Machine** does.',
        },
        {
          title: 'The JVM runs the bytecode',
          markdown:
            "When you run the program, the Java Virtual Machine (JVM) reads the bytecode and executes it - translating it, on the fly, into instructions the actual machine it's running on can carry out.",
        },
        {
          title: 'The program produces output',
          markdown:
            'Whatever your program does - print text, respond to a request, update a database - happens here, as the JVM executes the bytecode.',
        },
      ],
    },
    {
      type: 'prose',
      markdown:
        "## Why compile to bytecode instead of machine code?\n\nA C++ compiler typically produces machine code for one specific combination of operating system and processor - compile on Windows, and that output generally won't run on macOS or Linux without recompiling from source. Java's compiler deliberately stops one level short of that: it produces bytecode, a format that isn't tied to any particular machine. Any device with a JVM installed - Windows, macOS, Linux, or otherwise - can run the exact same `.class` file. That's the mechanism behind \"write once, run anywhere\": you compile once, and every platform's own JVM handles the last step of translating bytecode into instructions its specific hardware understands.",
    },
    { type: 'visualization', component: 'jdk-jre-jvm' },
    {
      type: 'comparison-table',
      caption: 'JVM vs JRE vs JDK',
      headers: ['Term', 'What it is', 'Who needs it'],
      rows: [
        [
          'JVM (Java Virtual Machine)',
          'The engine that runs bytecode',
          'Built into every install below - never installed alone',
        ],
        [
          'JRE (Java Runtime Environment)',
          'The JVM plus the standard class libraries needed to run a program',
          'Someone who only needs to run existing Java programs',
        ],
        [
          'JDK (Java Development Kit)',
          'The JRE plus the compiler and other developer tools',
          'Anyone writing and compiling Java code',
        ],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      markdown:
        "As a learner, always install the **JDK**, not just the JRE - you'll be compiling code, not only running it. Lesson 3 walks through exactly how.",
    },
    {
      type: 'expandable',
      title: 'What is JIT compilation?',
      markdown:
        'The JVM has two ways to execute bytecode: **interpreting** it line by line (simple, but slower), or using a **Just-In-Time (JIT) compiler** to translate frequently run sections of bytecode directly into fast machine code the first time they run, then reusing that machine code on subsequent calls. Modern JVMs (like HotSpot, the default in most Java distributions) do both - interpreting at first, then JIT-compiling the "hot" parts of a program as it identifies them. This is why long-running Java programs (like a server that stays up for hours) tend to get faster the longer they run.',
    },
    {
      type: 'callout',
      variant: 'performance',
      markdown:
        "Because of JIT compilation, a Java program's performance right after startup is not representative of its steady-state performance - benchmarks that only measure the first few seconds of execution can be misleading. This is a real, practical gotcha when comparing Java's speed to other languages.",
    },
    {
      type: 'flashcards',
      heading: 'Key terms from this lesson',
      cards: [
        {
          front: 'Source code',
          back: 'The human-readable .java file a developer writes.',
        },
        {
          front: 'Bytecode',
          back: 'The compiled, platform-independent instructions in a .class file, understood by any JVM.',
        },
        {
          front: 'JVM',
          back: 'Java Virtual Machine - runs bytecode, translating it into instructions the host machine understands.',
        },
        {
          front: 'JRE',
          back: 'Java Runtime Environment - the JVM plus the standard libraries needed to run a program.',
        },
        {
          front: 'JDK',
          back: 'Java Development Kit - the JRE plus the compiler and tools needed to build a program.',
        },
      ],
    },
    {
      type: 'quiz',
      quiz: {
        slug: 'how-java-works-check',
        title: 'Quick check: How Java Works',
        description: 'A short knowledge check for the "How Java Works" lesson.',
        difficulty: 'beginner',
        tags: ['java', 'jvm'],
        updatedAt: '2026-01-20',
        passThreshold: 0.7,
        questions: [
          {
            type: 'mcq',
            id: 'q1',
            prompt: 'What does the Java compiler (javac) produce?',
            choices: [
              'Machine code for one specific processor',
              'Bytecode',
              'An executable .exe file',
              'Assembly code',
            ],
            correctChoiceIndex: 1,
            explanation:
              'javac compiles source code into platform-independent bytecode, not machine code for a specific processor.',
          },
          {
            type: 'true-false',
            id: 'q2',
            prompt: 'The JRE includes the compiler needed to build Java programs.',
            correctAnswer: false,
            explanation:
              'The compiler is part of the JDK. The JRE only includes what you need to run already-compiled programs.',
          },
          {
            type: 'mcq',
            id: 'q3',
            prompt: 'What actually executes bytecode?',
            choices: [
              'The operating system directly',
              'The JVM',
              'The compiler',
              'The source code file',
            ],
            correctChoiceIndex: 1,
            explanation:
              'The Java Virtual Machine (JVM) reads and executes bytecode, translating it for the host machine as it runs.',
          },
          {
            type: 'fill-in',
            id: 'q4',
            prompt:
              'Fill in the blank: The JDK contains the JRE plus the compiler and other _____ tools.',
            acceptedAnswers: ['developer', 'development'],
            explanation:
              'The JDK bundles developer tools - like the compiler - on top of everything the JRE already provides.',
          },
        ],
      },
    },
    {
      type: 'summary',
      takeaways: [
        'Source code (.java files) is compiled by javac into platform-independent bytecode (.class files), not machine code for a specific processor.',
        'The JVM executes bytecode, translating it into instructions the host machine understands - this is what makes "write once, run anywhere" possible.',
        'The JDK (compiler + tools + JRE) is for developers; the JRE (JVM + libraries) is for running already-built programs.',
        'Modern JVMs use JIT compilation to speed up long-running programs by compiling frequently executed bytecode into machine code as they run.',
      ],
      furtherReading: [
        {
          label: 'Oracle: The Java Virtual Machine Specification',
          href: 'https://docs.oracle.com/javase/specs/jvms/se21/html/index.html',
        },
      ],
    },
  ],
}
