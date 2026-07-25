import type { LessonContent } from '@/engines/lesson-engine/types'

export const installingJava: LessonContent = {
  slug: 'installing-java',
  title: 'Installing Java',
  description:
    'Set up a working Java development environment: the JDK, a code editor or IDE, and how to verify everything is working.',
  difficulty: 'beginner',
  tags: ['java', 'setup', 'tools'],
  pathSlug: 'java-fundamentals',
  updatedAt: '2026-01-20',
  prerequisites: ['how-java-works'],
  estimatedMinutes: 15,
  blocks: [
    {
      type: 'prose',
      markdown:
        "You now know what Java is and how it runs. This lesson gets a working development environment onto your own machine, so lesson 4 is just writing and running code - no setup interruptions. By the end, you'll have a JDK installed, an editor ready, and a way to confirm both actually work.",
    },
    {
      type: 'prose',
      markdown:
        "## Choosing a JDK\n\n\"The JDK\" isn't a single product - several organizations publish their own free, production-ready builds of it, all implementing the same Java specification:\n\n- **Eclipse Temurin** (from the Adoptium project) - a widely used, vendor-neutral default.\n- **Oracle JDK** - Oracle's own build, free for personal and development use.\n- **Amazon Corretto** - Amazon's build, commonly used for AWS deployments.\n\nFor learning, any of these works identically for the exercises in this course. Eclipse Temurin is a solid default if you don't already have a preference.",
    },
    {
      type: 'callout',
      variant: 'best-practice',
      markdown:
        'Install a **Long-Term Support (LTS)** version (for example, the current LTS release) rather than the newest release. LTS versions get security updates for years and are what most real projects run in production.',
    },
    {
      type: 'steps',
      heading: 'Installing the JDK',
      steps: [
        {
          title: 'Download an LTS build',
          markdown:
            "Go to your chosen distribution's site (e.g. Eclipse Temurin) and download the installer for your operating system and the current LTS version.",
        },
        {
          title: 'Run the installer',
          markdown:
            "On Windows and macOS, use the graphical installer and accept the defaults. On Linux, install via your package manager (for example, `apt install temurin-21-jdk` on Debian/Ubuntu-based distributions) if it's available, or use the installer archive.",
        },
        {
          title: 'Confirm JAVA_HOME and PATH are set',
          markdown:
            'Most installers set these automatically. If not, see the "Environment variables" section below - you may need to set them yourself.',
        },
        {
          title: 'Open a new terminal window',
          markdown:
            'Environment variable changes only take effect in terminal windows opened after the change - close and reopen your terminal before verifying the install.',
        },
      ],
    },
    {
      type: 'code',
      language: 'bash',
      code: 'java -version\njavac -version',
    },
    {
      type: 'prose',
      markdown:
        "Both commands should print a version number. `java -version` confirms the JVM/JRE is installed and on your PATH; `javac -version` confirms the compiler (and therefore the full JDK, not just a JRE) is installed too. If either command isn't found, see the troubleshooting section below.",
    },
    {
      type: 'prose',
      markdown:
        "## Environment variables\n\nTwo environment variables matter for Java development:\n\n- **`JAVA_HOME`** points to the folder where the JDK is installed. Many build tools and IDEs read this variable to find the JDK.\n- **`PATH`** is the list of folders your operating system searches when you type a command. For `java` and `javac` to work from any terminal, the JDK's `bin` folder needs to be included in `PATH`.\n\nMost modern JDK installers configure both automatically. If a terminal can't find `java` after installing, these are almost always the first things to check.",
    },
    {
      type: 'expandable',
      title: 'Setting environment variables manually, by OS',
      markdown:
        '**Windows:** Open "Edit the system environment variables" from the Start menu, then "Environment Variables." Add or edit `JAVA_HOME` to point to your JDK install folder, and add `%JAVA_HOME%\\bin` to `PATH`.\n\n**macOS/Linux:** Add lines like `export JAVA_HOME=/path/to/jdk` and `export PATH="$JAVA_HOME/bin:$PATH"` to your shell profile (`~/.zshrc`, `~/.bashrc`, or similar), then restart your terminal or run `source ~/.zshrc`.',
    },
    {
      type: 'comparison-table',
      caption: 'VS Code vs IntelliJ IDEA for Java',
      headers: ['', 'VS Code', 'IntelliJ IDEA'],
      rows: [
        [
          'Setup',
          'Lightweight editor + Java extensions',
          'Full IDE, Java support built in',
        ],
        [
          'Best for',
          'Multi-language projects, lightweight editing',
          'Java-focused, larger projects',
        ],
        ['Resource usage', 'Lighter', 'Heavier'],
        ['Refactoring tools', 'Good, via extensions', 'Extensive, built in'],
        ['Cost', 'Free', 'Free Community Edition; paid Ultimate Edition'],
      ],
    },
    {
      type: 'prose',
      markdown:
        '**VS Code**: install the "Extension Pack for Java" from the Extensions view - this bundles language support, a debugger, and test runner integration. **IntelliJ IDEA**: download the free Community Edition, which has Java support built in with no extensions required. Either is a completely reasonable choice for this course; use whichever you find easier to navigate.',
    },
    {
      type: 'steps',
      heading: 'Creating your first project',
      steps: [
        {
          title: 'Create a project folder',
          markdown:
            'Make a new, empty folder for your project - both editors can open a plain folder as a project.',
        },
        {
          title: 'Create a src folder',
          markdown:
            'By convention, Java source files live in a folder named `src`. Create `src` inside your project folder.',
        },
        {
          title: 'Open the folder in your editor',
          markdown:
            'In VS Code: File > Open Folder. In IntelliJ IDEA: File > New > Project from Existing Sources, and select your folder.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'mistake',
      markdown:
        "A common mistake is installing only a JRE instead of a JDK. Running programs works fine, but `javac` won't exist, so nothing compiles. If `javac -version` fails but `java -version` works, this is almost always the cause - reinstall using a JDK package, not a JRE-only one.",
    },
    {
      type: 'expandable',
      title: 'Troubleshooting: "java is not recognized" or "command not found"',
      markdown:
        "This means your terminal's `PATH` doesn't include the JDK's `bin` folder. First, make sure you opened a **new** terminal window after installing (existing windows don't pick up environment changes). If it still fails, revisit the \"Setting environment variables manually\" section above and double-check the path you added actually points to a real `bin` folder containing a `java` executable.",
    },
    {
      type: 'flashcards',
      heading: 'Key terms from this lesson',
      cards: [
        {
          front: 'JAVA_HOME',
          back: "An environment variable pointing to the JDK's install location, read by many tools and IDEs.",
        },
        {
          front: 'PATH',
          back: 'The environment variable listing folders your OS searches for commands like java and javac.',
        },
        {
          front: 'LTS release',
          back: 'A Long-Term Support Java version, receiving security updates for years - the standard choice for real projects.',
        },
      ],
    },
    {
      type: 'quiz',
      quiz: {
        slug: 'installing-java-check',
        title: 'Quick check: Installing Java',
        description: 'A short knowledge check for the "Installing Java" lesson.',
        difficulty: 'beginner',
        tags: ['java', 'setup'],
        updatedAt: '2026-01-20',
        passThreshold: 0.7,
        questions: [
          {
            type: 'mcq',
            id: 'q1',
            prompt:
              'Which command confirms the Java compiler is installed, not just the runtime?',
            choices: ['java -version', 'javac -version', 'java -compile', 'jdk -check'],
            correctChoiceIndex: 1,
            explanation:
              '`javac -version` only succeeds if the compiler - and therefore the full JDK - is installed.',
          },
          {
            type: 'true-false',
            id: 'q2',
            prompt:
              'Environment variable changes take effect immediately in terminal windows that were already open.',
            correctAnswer: false,
            explanation:
              'You need to open a new terminal window (or reload your shell profile) for environment variable changes to take effect.',
          },
          {
            type: 'mcq',
            id: 'q3',
            prompt: 'What does JAVA_HOME point to?',
            choices: [
              'Your project folder',
              "The JDK's installation folder",
              'Your source code folder',
              "Your editor's install location",
            ],
            correctChoiceIndex: 1,
            explanation:
              'JAVA_HOME points to where the JDK itself is installed, which many tools and IDEs rely on to find it.',
          },
        ],
      },
    },
    {
      type: 'summary',
      takeaways: [
        'Install a JDK (not just a JRE) from a trusted distribution like Eclipse Temurin, preferring the current LTS version.',
        'JAVA_HOME points to your JDK install; PATH must include its bin folder for java and javac to work from any terminal.',
        '`java -version` verifies the runtime; `javac -version` verifies the compiler is present too.',
        'VS Code (with the Java extension pack) and IntelliJ IDEA Community Edition are both solid, free choices for writing Java.',
      ],
      furtherReading: [
        { label: 'Eclipse Temurin downloads', href: 'https://adoptium.net/' },
        {
          label: 'Visual Studio Code: Java in VS Code',
          href: 'https://code.visualstudio.com/docs/languages/java',
        },
      ],
    },
  ],
}
