import type { LessonContent } from '@/engines/lesson-engine/types'

export const variables: LessonContent = {
  slug: 'variables',
  title: 'Variables',
  description:
    'How Java stores and names values while a program runs: declaring, initializing, scoping, and naming variables well.',
  difficulty: 'beginner',
  tags: ['java', 'variables', 'syntax'],
  pathSlug: 'java-fundamentals',
  updatedAt: '2026-01-20',
  prerequisites: ['java-program-structure'],
  estimatedMinutes: 16,
  blocks: [
    {
      type: 'prose',
      markdown:
        "Every useful program needs to remember values while it runs - a user's name, a running total, whether a task finished. A **variable** is a named location in memory that holds one of these values, so your code can refer back to it by name instead of the raw value itself.",
    },
    { type: 'visualization', component: 'variable-memory-box' },
    {
      type: 'code',
      language: 'java',
      code: 'int age;       // declaration - reserves a labeled box, empty for now\nage = 25;      // assignment - puts a value in that box\n\nint score = 0; // declaration + initialization in one statement',
      highlightLines: [1, 2, 4],
    },
    {
      type: 'steps',
      heading: 'Three related but distinct steps',
      steps: [
        {
          title: 'Declaration',
          markdown:
            '`int age;` reserves a labeled box in memory of the right size and type, with no value yet.',
        },
        {
          title: 'Assignment',
          markdown: '`age = 25;` puts a value into a box that already exists.',
        },
        {
          title: 'Initialization',
          markdown:
            '`int score = 0;` declares and assigns in a single statement - the most common way to write it.',
        },
      ],
    },
    {
      type: 'prose',
      markdown:
        "## Naming conventions\n\nJava variable names use **camelCase**: the first word lowercase, each following word capitalized - `firstName`, `totalScore`, `isComplete`. Names must start with a letter, `$`, or `_` (letters in practice), can't be a reserved word like `class` or `int`, and are case-sensitive (`age` and `Age` are different variables).",
    },
    {
      type: 'comparison-table',
      caption: 'Clear names vs unclear names',
      headers: ['Unclear', 'Clear', 'Why'],
      rows: [
        ['x', 'itemCount', 'Says what the value represents'],
        ['d', 'daysRemaining', 'No ambiguity about units or meaning'],
        [
          'flag',
          'isPaymentComplete',
          'A boolean name should read like a yes/no question',
        ],
      ],
    },
    {
      type: 'callout',
      variant: 'best-practice',
      markdown:
        "Name a variable for what it holds, not its type - `count`, not `intCount`. A good name makes the variable's purpose obvious to someone reading the code six months from now, including future you.",
    },
    {
      type: 'prose',
      markdown:
        '## Scope basics\n\nA variable only exists within the block of code - the `{ }` pair - where it was declared, plus any nested blocks inside that one. Once execution leaves that block, the variable is gone. This is called its **scope**.',
    },
    {
      type: 'code',
      language: 'java',
      code: 'public static void main(String[] args) {\n    int total = 0;   // total is in scope for the rest of main\n\n    {\n        int temp = 5; // temp only exists inside this inner block\n    }\n    // temp no longer exists here - this would not compile: System.out.println(temp);\n}',
      highlightLines: [2, 5],
    },
    {
      type: 'prose',
      markdown:
        "## Constants\n\nSome values shouldn't change once set - a tax rate, a maximum allowed value, the number of days in a week. Mark these with the `final` keyword, and name them in `SCREAMING_SNAKE_CASE` by convention, to signal at a glance that they're constant.",
    },
    {
      type: 'code',
      language: 'java',
      code: 'final double TAX_RATE = 0.08;\nfinal int MAX_ATTEMPTS = 3;',
    },
    {
      type: 'callout',
      variant: 'best-practice',
      markdown:
        'Prefer a named constant over a bare number scattered through your code (a "magic number"). `MAX_ATTEMPTS` explains itself; a lone `3` reappearing in five places doesn\'t, and is easy to update inconsistently.',
    },
    {
      type: 'callout',
      variant: 'mistake',
      markdown:
        'Using a local variable before giving it a value is a compile error in Java, not a runtime surprise - `int x; System.out.println(x);` won\'t compile. This is a deliberate safety feature: unlike some languages, Java won\'t let you accidentally read a "garbage" value.',
    },
    {
      type: 'expandable',
      title: 'Reassigning a variable vs re-declaring it',
      markdown:
        '`age = 30;` (no type) reassigns an existing variable\'s value. `int age = 30;` (with a type) declares a *new* variable - if `age` already exists in the same scope, this is a compile error ("variable already defined"), not a way to reset it. Once declared, a non-final variable is updated by assignment alone, with no type keyword.',
    },
    {
      type: 'exercise',
      exercise: {
        slug: 'variables-declare-and-print',
        title: 'Declare and print a variable',
        description: 'Practice declaring, initializing, and printing a variable.',
        difficulty: 'beginner',
        tags: ['java', 'variables'],
        updatedAt: '2026-01-20',
        prompt:
          'Declare an int variable named age, initialize it to 30, and print its value using System.out.println.',
        starterCode:
          'public class Main {\n    public static void main(String[] args) {\n        // Declare and print "age" here\n    }\n}',
        solutionCode:
          'public class Main {\n    public static void main(String[] args) {\n        int age = 30;\n        System.out.println(age);\n    }\n}',
        testCases: [
          {
            id: 'tc-1',
            description: 'Prints the value of age',
            input: '',
            expectedOutput: '30',
          },
        ],
        hints: [
          'Declare with: int age = 30;',
          'You can pass a variable directly to System.out.println - no quotes needed for a number.',
        ],
      },
    },
    {
      type: 'flashcards',
      heading: 'Key terms from this lesson',
      cards: [
        { front: 'Variable', back: 'A named location in memory that holds a value.' },
        {
          front: 'Declaration',
          back: 'Reserving a labeled box in memory for a variable, with no value assigned yet.',
        },
        {
          front: 'Scope',
          back: 'The block of code where a variable exists and can be referenced.',
        },
        {
          front: 'Constant (final)',
          back: "A variable whose value can't change after it's set, marked with the final keyword.",
        },
      ],
    },
    {
      type: 'quiz',
      quiz: {
        slug: 'variables-check',
        title: 'Quick check: Variables',
        description: 'A short knowledge check for the "Variables" lesson.',
        difficulty: 'beginner',
        tags: ['java', 'variables'],
        updatedAt: '2026-01-20',
        passThreshold: 0.7,
        questions: [
          {
            type: 'mcq',
            id: 'q1',
            prompt: 'Which naming style does Java convention use for variables?',
            choices: ['snake_case', 'PascalCase', 'camelCase', 'SCREAMING_SNAKE_CASE'],
            correctChoiceIndex: 2,
            explanation:
              'Java variables conventionally use camelCase - firstName, totalScore, and so on.',
          },
          {
            type: 'true-false',
            id: 'q2',
            prompt:
              'A variable declared inside a block { } is accessible outside that block.',
            correctAnswer: false,
            explanation:
              "A variable's scope is limited to the block it's declared in (and any nested blocks) - it doesn't exist once that block ends.",
          },
          {
            type: 'mcq',
            id: 'q3',
            prompt: 'What keyword marks a variable as a constant in Java?',
            choices: ['const', 'static', 'final', 'readonly'],
            correctChoiceIndex: 2,
            explanation:
              "Java uses `final` to mark a variable whose value cannot be reassigned after it's set.",
          },
        ],
      },
    },
    {
      type: 'summary',
      takeaways: [
        'A variable is a named location in memory; declaration reserves it, initialization gives it a starting value.',
        'Java variable names use camelCase and should describe what the value represents.',
        "A variable's scope is the block { } it's declared in - it doesn't exist outside that block.",
        'Mark values that should never change with final, named in SCREAMING_SNAKE_CASE, to avoid magic numbers.',
      ],
      furtherReading: [
        {
          label: 'Oracle: Variables (Java Tutorials)',
          href: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/variables.html',
        },
      ],
    },
  ],
}
