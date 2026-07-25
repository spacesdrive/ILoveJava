import type { LessonContent } from '@/engines/lesson-engine/types'

export const whatIsJava: LessonContent = {
  slug: 'what-is-java',
  title: 'What is Java?',
  description:
    'An introduction to what Java is, why it was created, and where it shows up in the software industry today.',
  difficulty: 'beginner',
  tags: ['java', 'history', 'overview'],
  pathSlug: 'java-fundamentals',
  updatedAt: '2026-01-20',
  prerequisites: [],
  estimatedMinutes: 12,
  blocks: [
    {
      type: 'prose',
      markdown:
        "Before writing a single line of code, it helps to know what you're actually learning and why it's worth your time. This lesson is entirely conceptual - no syntax, no code to type. By the end, you'll be able to explain what Java is, why it was created, and where it's used, in your own words.",
    },
    {
      type: 'prose',
      markdown:
        '## What is Java\n\nJava is a general-purpose programming language: a tool for writing instructions a computer can follow to do useful work, from a mobile app to a bank\'s transaction system. Three ideas define it:\n\n- **Object-oriented.** Programs are organized around "objects" that bundle data and behavior together, modeling real-world things (a `BankAccount`, a `User`, an `Order`) rather than one long list of instructions.\n- **Platform-independent.** A Java program written on Windows runs unmodified on Linux, macOS, or a server halfway across the world, without being rewritten for each one. Lesson 2 explains exactly how.\n- **General-purpose.** Java isn\'t built for one narrow job. It runs mobile apps, web backends, desktop tools, and embedded devices.',
    },
    {
      type: 'callout',
      variant: 'history',
      markdown:
        'Java was created by **James Gosling** and a team at **Sun Microsystems**, originally under the project name **"Oak"** - named, according to Gosling, after a tree outside his office. It was renamed and publicly released in 1995.',
    },
    {
      type: 'steps',
      heading: 'A brief history',
      variant: 'timeline',
      steps: [
        {
          title: '1991 - The Green Project begins',
          markdown:
            'Sun Microsystems starts a project to build software for interactive television and consumer devices. The team needed a language that would run reliably across many different, incompatible hardware platforms.',
        },
        {
          title: '1995 - Java 1.0 is released',
          markdown:
            'Java launches publicly with the slogan **"Write Once, Run Anywhere"** - a direct answer to the cross-platform problem the Green Project ran into.',
        },
        {
          title: '2006 - Java goes open source',
          markdown:
            'Sun releases most of Java under the GNU General Public License, letting anyone inspect, modify, and contribute to its source.',
        },
        {
          title: '2010 - Oracle acquires Sun Microsystems',
          markdown:
            'Oracle becomes the steward of Java and continues its development to this day.',
        },
        {
          title: '2017 onward - A predictable release cadence',
          markdown:
            'Starting with Java 9, a new version ships every six months, with a Long-Term Support (LTS) release roughly every two years - the version most companies actually run in production.',
        },
      ],
    },
    {
      type: 'prose',
      markdown:
        "## Why Java exists\n\nBefore Java, a program compiled for one operating system generally couldn't run on another without significant rework - and languages like C and C++ put the full burden of memory management on the developer, where a single mistake could crash a program or open a security hole. Java's designers set out to fix both problems: portability (one program, many platforms) and safety (the language itself manages memory, rather than trusting every line of application code to do it correctly).",
    },
    {
      type: 'comparison-table',
      caption: 'Java compared to two other widely used languages, at a glance',
      headers: ['Language', 'Typing', 'Memory management', 'Common use cases'],
      rows: [
        [
          'Java',
          'Statically typed',
          'Automatic (garbage collected)',
          'Enterprise backends, Android, large systems',
        ],
        [
          'Python',
          'Dynamically typed',
          'Automatic (garbage collected)',
          'Scripting, data science, prototyping',
        ],
        [
          'C++',
          'Statically typed',
          'Manual',
          'Operating systems, game engines, embedded systems',
        ],
      ],
    },
    {
      type: 'prose',
      markdown:
        '## Where Java is used today\n\nThree decades after its release, Java remains one of the most widely deployed languages in the industry:\n\n- **Android apps.** For years, Java (alongside Kotlin) has been a primary language for native Android development.\n- **Enterprise backend systems.** Banks, insurers, airlines, and e-commerce platforms run huge amounts of Java in the systems that process transactions, orders, and accounts.\n- **Big data.** Foundational big data tools - Hadoop, Kafka, and much of the Spark ecosystem - are written in or built on Java and the JVM.\n- **Cloud services and APIs.** Frameworks like Spring power a large share of backend web services in production today.\n- **Embedded and enterprise devices.** From point-of-sale terminals to industrial equipment, Java still shows up in devices that need to run reliably for years.',
    },
    {
      type: 'callout',
      variant: 'insight',
      markdown:
        "Java has ranked among the top programming languages in the TIOBE Index and Stack Overflow Developer Survey every year for over two decades - not because it's the newest language, but because so much of the world's critical infrastructure already runs on it and continues to be actively maintained and extended.",
    },
    {
      type: 'flashcards',
      heading: 'Key terms from this lesson',
      cards: [
        {
          front: 'Object-oriented',
          back: 'Organizing a program around objects that bundle data and behavior together.',
        },
        {
          front: 'Platform-independent',
          back: 'The same compiled program runs unmodified on different operating systems.',
        },
        {
          front: 'Sun Microsystems',
          back: 'The company that created Java, later acquired by Oracle in 2010.',
        },
        {
          front: 'Write Once, Run Anywhere',
          back: "Java's founding promise: one program runs on any platform with a JVM, without being rewritten.",
        },
      ],
    },
    {
      type: 'comparison-table',
      caption: 'A few of the many roles and companies built on Java',
      headers: ['Career path', 'Example companies known for Java use'],
      rows: [
        [
          'Backend / enterprise software engineer',
          'Banks, insurers, airlines, government systems',
        ],
        ['Android developer', 'Any company shipping a native Android app'],
        ['Big data engineer', 'Companies running Hadoop, Kafka, or Spark pipelines'],
        ['Cloud / platform engineer', 'Amazon, Google, LinkedIn, Netflix, Uber'],
      ],
    },
    {
      type: 'expandable',
      title: 'Is Java still worth learning in 2026?',
      markdown:
        "It's a fair question for any language that's been around this long. The short answer: yes, for two concrete reasons. First, demand follows deployed code, and there is an enormous amount of Java already running in production that needs to be maintained, extended, and eventually replaced - all of which requires people who know the language. Second, Java itself hasn't stood still: modern versions have added features like records, pattern matching, and virtual threads that make it more concise and better suited to today's workloads than the Java of ten years ago.",
    },
    {
      type: 'prose',
      markdown:
        '## Where this roadmap goes next\n\nThis is lesson 1 of the **Java Fundamentals** path. Lesson 2 opens up *how* Java actually achieves "write once, run anywhere" - source code, the compiler, bytecode, and the JVM. From there, lessons 3 and 4 get your development environment installed and your first program running, and lessons 5 through 10 build up the core syntax: program structure, variables, data types, operators, input/output, and control flow.',
    },
    {
      type: 'quiz',
      quiz: {
        slug: 'what-is-java-check',
        title: 'Quick check: What is Java?',
        description: 'A short knowledge check for the "What is Java?" lesson.',
        difficulty: 'beginner',
        tags: ['java', 'overview'],
        updatedAt: '2026-01-20',
        passThreshold: 0.7,
        questions: [
          {
            type: 'mcq',
            id: 'q1',
            prompt: 'Which company originally created Java?',
            choices: ['Microsoft', 'Sun Microsystems', 'Oracle', 'IBM'],
            correctChoiceIndex: 1,
            explanation:
              'Java was created at Sun Microsystems; Oracle acquired Sun (and with it, Java) in 2010.',
          },
          {
            type: 'true-false',
            id: 'q2',
            prompt:
              'Java programs must be rewritten for each operating system they run on.',
            correctAnswer: false,
            explanation:
              "Platform independence is one of Java's defining features - a compiled Java program runs unmodified across different operating systems.",
          },
          {
            type: 'mcq',
            id: 'q3',
            prompt: "What was Java's original project name at Sun Microsystems?",
            choices: ['Coffee', 'Oak', 'Maple', 'Green'],
            correctChoiceIndex: 1,
            explanation:
              'The project was originally called "Oak" before being renamed to Java.',
          },
          {
            type: 'mcq',
            id: 'q4',
            prompt: 'Which of these is NOT a common use of Java today?',
            choices: [
              'Android app development',
              'Enterprise backend systems',
              'Big data tools like Hadoop and Kafka',
              'Styling web pages with CSS',
            ],
            correctChoiceIndex: 3,
            explanation:
              "Styling web pages is CSS's job, not a use case for Java as a language.",
          },
        ],
      },
    },
    {
      type: 'summary',
      takeaways: [
        'Java is a general-purpose, object-oriented, platform-independent programming language created at Sun Microsystems and released in 1995.',
        'It was designed to solve two problems: running the same program across many platforms, and reducing the memory-safety bugs common in languages like C and C++.',
        'Java remains widely used in Android development, enterprise backend systems, big data tooling, and cloud services.',
        'The next lesson explains exactly how Java achieves "write once, run anywhere" - the compiler, bytecode, and the JVM.',
      ],
      furtherReading: [
        {
          label: 'Oracle: The History of Java Technology',
          href: 'https://www.oracle.com/java/technologies/java-timeline.html',
        },
        {
          label: 'TIOBE Index (language popularity rankings)',
          href: 'https://www.tiobe.com/tiobe-index/',
        },
      ],
    },
  ],
}
