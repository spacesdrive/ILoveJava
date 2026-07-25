import type { LessonContent } from '@/engines/lesson-engine/types'

export const inputAndOutput: LessonContent = {
  slug: 'input-and-output',
  title: 'Input and Output',
  description:
    'Printing formatted output with System.out, and reading user input with Scanner - plus what happens when input goes wrong.',
  difficulty: 'beginner',
  tags: ['java', 'io', 'scanner'],
  pathSlug: 'java-fundamentals',
  updatedAt: '2026-01-20',
  prerequisites: ['operators'],
  estimatedMinutes: 17,
  blocks: [
    {
      type: 'prose',
      markdown:
        "Every program you've written so far has produced fixed output and taken no input. Real programs respond to what a user provides. This lesson covers both directions: printing output clearly, and reading input safely.",
    },
    {
      type: 'comparison-table',
      caption: 'Three ways to print',
      headers: ['Method', 'Behavior'],
      rows: [
        ['System.out.print(...)', 'Prints text with no line break after it'],
        ['System.out.println(...)', 'Prints text followed by a new line'],
        [
          'System.out.printf(...)',
          'Prints formatted text using placeholders, no automatic new line',
        ],
      ],
    },
    {
      type: 'code',
      language: 'java',
      code: 'System.out.print("Score: ");\nSystem.out.println(95);\n// Output: Score: 95\n\nSystem.out.printf("Score: %d%%%n", 95);\n// Output: Score: 95%',
    },
    {
      type: 'prose',
      markdown:
        '## Formatting output\n\n`printf` and `String.format` use **format specifiers** - placeholders starting with `%` - to control exactly how a value is displayed.',
    },
    {
      type: 'comparison-table',
      caption: 'Common format specifiers',
      headers: ['Specifier', 'Formats', 'Example'],
      rows: [
        ['%d', 'An integer', 'printf("%d", 42) -> 42'],
        ['%s', 'A string', 'printf("%s", "hi") -> hi'],
        ['%.2f', 'A decimal, rounded to 2 places', 'printf("%.2f", 3.14159) -> 3.14'],
        ['%n', 'A platform-appropriate new line', 'Prefer this over \\n in printf'],
      ],
    },
    {
      type: 'code',
      language: 'java',
      code: 'double price = 19.999;\nSystem.out.printf("Total: $%.2f%n", price);\n// Output: Total: $20.00',
    },
    {
      type: 'prose',
      markdown:
        '## Reading input with Scanner\n\n`Scanner` reads input from the keyboard (`System.in`). Create one instance, wired to `System.in`, and reuse it for every read in your program.',
    },
    {
      type: 'code',
      language: 'java',
      code: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n\n        System.out.print("What is your name? ");\n        String name = scanner.nextLine();\n\n        System.out.println("Hello, " + name + "!");\n    }\n}',
      highlightLines: [1, 5],
    },
    {
      type: 'comparison-table',
      caption: 'Common Scanner methods',
      headers: ['Method', 'Reads'],
      rows: [
        ['nextLine()', 'An entire line of text, as a String'],
        ['nextInt()', 'A single int'],
        ['nextDouble()', 'A single double'],
        ['next()', 'A single word (up to the next whitespace)'],
      ],
    },
    {
      type: 'callout',
      variant: 'mistake',
      markdown:
        'A classic gotcha: calling `nextInt()` and then `nextLine()` back to back. `nextInt()` reads the number but leaves the trailing newline character in the input buffer, so the very next `nextLine()` reads an empty string instead of the line you expected. The fix is an extra `scanner.nextLine();` immediately after `nextInt()`, to consume that leftover newline before reading the next real line.',
    },
    {
      type: 'prose',
      markdown:
        "## Basic error handling\n\nWhat happens if a program calls `scanner.nextInt()` but the user types text instead of a number? Java throws an **exception** - `InputMismatchException` - which crashes the program immediately unless it's handled. A `try`/`catch` block lets you catch that exception and respond gracefully instead of crashing.",
    },
    {
      type: 'code',
      language: 'java',
      code: 'try {\n    System.out.print("Enter your age: ");\n    int age = scanner.nextInt();\n    System.out.println("You are " + age + " years old.");\n} catch (Exception e) {\n    System.out.println("That wasn\'t a valid number.");\n}',
    },
    {
      type: 'callout',
      variant: 'note',
      markdown:
        'This is a first look at exception handling, not the full picture - a dedicated lesson on exceptions belongs in a later course. For now, just recognize the shape: risky code goes in `try`, and what happens if it fails goes in `catch`.',
    },
    {
      type: 'exercise',
      exercise: {
        slug: 'input-output-greeting',
        title: 'Format a greeting',
        description: 'Practice printf-style formatting.',
        difficulty: 'beginner',
        tags: ['java', 'io'],
        updatedAt: '2026-01-20',
        prompt:
          'Given a String name = "Ada" and an int age = 30, use printf to print exactly: Ada is 30 years old.',
        starterCode:
          'public class Main {\n    public static void main(String[] args) {\n        String name = "Ada";\n        int age = 30;\n        // Print using printf here\n    }\n}',
        solutionCode:
          'public class Main {\n    public static void main(String[] args) {\n        String name = "Ada";\n        int age = 30;\n        System.out.printf("%s is %d years old.%n", name, age);\n    }\n}',
        testCases: [
          {
            id: 'tc-1',
            description: 'Prints the formatted sentence',
            input: '',
            expectedOutput: 'Ada is 30 years old.',
          },
        ],
        hints: [
          'Use %s for the name and %d for the age.',
          'End with a period, matching the expected output exactly.',
        ],
      },
    },
    {
      type: 'flashcards',
      heading: 'Key terms from this lesson',
      cards: [
        {
          front: 'Scanner',
          back: 'A class for reading input, typically wired to System.in for keyboard input.',
        },
        {
          front: 'Format specifier',
          back: 'A %-prefixed placeholder (like %d or %.2f) controlling how printf displays a value.',
        },
        {
          front: 'Exception',
          back: 'An error condition Java throws at runtime; try/catch lets a program handle it instead of crashing.',
        },
      ],
    },
    {
      type: 'quiz',
      quiz: {
        slug: 'input-and-output-check',
        title: 'Quick check: Input and Output',
        description: 'A short knowledge check for the "Input and Output" lesson.',
        difficulty: 'beginner',
        tags: ['java', 'io'],
        updatedAt: '2026-01-20',
        passThreshold: 0.7,
        questions: [
          {
            type: 'mcq',
            id: 'q1',
            prompt: 'Which Scanner method reads a single int?',
            choices: ['nextLine()', 'nextInt()', 'next()', 'readInt()'],
            correctChoiceIndex: 1,
            explanation: 'nextInt() reads a single integer from the input.',
          },
          {
            type: 'mcq',
            id: 'q2',
            prompt: 'Which format specifier formats a decimal to 2 places?',
            choices: ['%d', '%s', '%.2f', '%2f'],
            correctChoiceIndex: 2,
            explanation:
              '%.2f formats a floating-point value rounded to 2 decimal places.',
          },
          {
            type: 'true-false',
            id: 'q3',
            prompt:
              'Calling nextInt() followed immediately by nextLine() can produce an unexpected empty string.',
            correctAnswer: true,
            explanation:
              "nextInt() leaves a trailing newline in the buffer, which the next nextLine() call reads as an empty line unless it's consumed first.",
          },
        ],
      },
    },
    {
      type: 'summary',
      takeaways: [
        'print, println, and printf each control output differently - printf uses format specifiers like %d, %s, and %.2f.',
        'Scanner reads user input from System.in - nextLine(), nextInt(), and nextDouble() read different types.',
        'Mixing nextInt() and nextLine() can leave a stray newline in the buffer - consume it with an extra nextLine() call.',
        'try/catch lets a program handle an exception (like invalid input) instead of crashing outright.',
      ],
      furtherReading: [
        {
          label: 'Oracle: Scanner (Java Platform SE API)',
          href: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Scanner.html',
        },
      ],
    },
  ],
}
