import type { LessonContent } from '@/engines/lesson-engine/types'

export const controlFlow: LessonContent = {
  slug: 'control-flow',
  title: 'Control Flow (if, else, switch)',
  description:
    'How a Java program makes decisions: if/else chains, nested conditions, and both classic and modern switch statements.',
  difficulty: 'beginner',
  tags: ['java', 'control-flow', 'syntax'],
  pathSlug: 'java-fundamentals',
  updatedAt: '2026-01-20',
  prerequisites: ['input-and-output'],
  estimatedMinutes: 18,
  blocks: [
    {
      type: 'prose',
      markdown:
        "Every program you've written in this path has run the same statements in the same order, every time. Real programs branch: do one thing if a condition holds, something else if it doesn't. This lesson - the last in Java Fundamentals - covers exactly how Java expresses that.",
    },
    { type: 'visualization', component: 'control-flow-if-else' },
    {
      type: 'code',
      language: 'java',
      code: 'int temperature = 35;\n\nif (temperature > 30) {\n    System.out.println("It\'s hot.");\n} else {\n    System.out.println("It\'s not hot.");\n}',
      highlightLines: [3, 5],
    },
    {
      type: 'prose',
      markdown:
        "An `if` block runs only when its condition (in parentheses) evaluates to `true`. The optional `else` block runs when it doesn't. Exactly one of the two branches runs - never both, never neither.",
    },
    {
      type: 'prose',
      markdown:
        "## else if chains\n\nWhen there are more than two possibilities, chain `else if` between the first `if` and a final `else`. Java checks each condition in order and runs the first one that's true, skipping the rest.",
    },
    {
      type: 'code',
      language: 'java',
      code: 'int score = 82;\n\nif (score >= 90) {\n    System.out.println("A");\n} else if (score >= 80) {\n    System.out.println("B");\n} else if (score >= 70) {\n    System.out.println("C");\n} else {\n    System.out.println("F");\n}\n// Output: B',
      highlightLines: [5],
    },
    {
      type: 'prose',
      markdown:
        '## Nested conditions\n\nAn `if` block can contain another `if` inside it - useful when a second decision only makes sense after the first condition holds.',
    },
    {
      type: 'code',
      language: 'java',
      code: 'boolean isMember = true;\ndouble cartTotal = 120.0;\n\nif (isMember) {\n    if (cartTotal >= 100.0) {\n        System.out.println("Free shipping - member discount applied.");\n    } else {\n        System.out.println("Standard shipping - member.");\n    }\n} else {\n    System.out.println("Standard shipping.");\n}',
    },
    {
      type: 'callout',
      variant: 'best-practice',
      markdown:
        'Deeply nested `if` statements get hard to follow fast. When a nested condition can be expressed as a single combined condition, prefer that: `if (isMember && cartTotal >= 100.0)` reads more clearly than two nested `if` blocks for this specific case - reach for nesting only when the branches genuinely need different follow-up logic, as in the example above.',
    },
    {
      type: 'prose',
      markdown:
        "## switch statements\n\nWhen you're checking one variable against many possible exact values, a `switch` is often clearer than a long `else if` chain.",
    },
    {
      type: 'code',
      language: 'java',
      code: 'int dayNumber = 3;\nString dayName;\n\nswitch (dayNumber) {\n    case 1:\n        dayName = "Monday";\n        break;\n    case 2:\n        dayName = "Tuesday";\n        break;\n    case 3:\n        dayName = "Wednesday";\n        break;\n    default:\n        dayName = "Unknown";\n        break;\n}\nSystem.out.println(dayName);\n// Output: Wednesday',
      highlightLines: [4, 6],
    },
    {
      type: 'callout',
      variant: 'mistake',
      markdown:
        'Forgetting `break` in a classic `switch` causes **fall-through**: execution continues into the next case instead of stopping. Omitting `break` after `case 2` above would run both the `case 2` and `case 3` code. This tripped up enough developers that Java eventually added an alternative - see below.',
    },
    {
      type: 'prose',
      markdown:
        '## Modern switch expressions\n\nJava 14 introduced **switch expressions**: arrow syntax (`->`) that produces a value directly, with no fall-through and no `break` needed.',
    },
    {
      type: 'code',
      language: 'java',
      code: 'int dayNumber = 3;\n\nString dayName = switch (dayNumber) {\n    case 1 -> "Monday";\n    case 2 -> "Tuesday";\n    case 3 -> "Wednesday";\n    default -> "Unknown";\n};\nSystem.out.println(dayName);\n// Output: Wednesday',
      highlightLines: [3],
    },
    {
      type: 'comparison-table',
      caption: 'Classic switch statement vs modern switch expression',
      headers: ['', 'Classic switch', 'Switch expression (Java 14+)'],
      rows: [
        ['Fall-through', 'Yes, unless break is used', 'Never'],
        [
          'Produces a value directly',
          'No - assign inside each case',
          'Yes - the whole switch is an expression',
        ],
        ['Syntax', 'case X: ... break;', 'case X -> ...'],
      ],
    },
    {
      type: 'exercise',
      exercise: {
        slug: 'control-flow-grade',
        title: 'Grade calculator',
        description: 'Practice an if/else if chain.',
        difficulty: 'beginner',
        tags: ['java', 'control-flow'],
        updatedAt: '2026-01-20',
        prompt:
          'Given int score = 75, print "Pass" if score is 60 or above, otherwise print "Fail".',
        starterCode:
          'public class Main {\n    public static void main(String[] args) {\n        int score = 75;\n        // Print "Pass" or "Fail"\n    }\n}',
        solutionCode:
          'public class Main {\n    public static void main(String[] args) {\n        int score = 75;\n        if (score >= 60) {\n            System.out.println("Pass");\n        } else {\n            System.out.println("Fail");\n        }\n    }\n}',
        testCases: [
          {
            id: 'tc-1',
            description: 'Prints Pass for a passing score',
            input: '',
            expectedOutput: 'Pass',
          },
        ],
        hints: [
          'Use >= 60 as the condition.',
          'Exactly one of the two branches should print.',
        ],
      },
    },
    {
      type: 'flashcards',
      heading: 'Key terms from this lesson',
      cards: [
        {
          front: 'if / else',
          back: 'Runs one of two branches depending on whether a condition is true.',
        },
        {
          front: 'Fall-through',
          back: 'In a classic switch, execution continuing into the next case because a break was omitted.',
        },
        {
          front: 'Switch expression',
          back: 'Modern (Java 14+) switch syntax using ->, producing a value directly with no fall-through.',
        },
      ],
    },
    {
      type: 'quiz',
      quiz: {
        slug: 'control-flow-check',
        title: 'Quick check: Control Flow',
        description: 'A short knowledge check for the "Control Flow" lesson.',
        difficulty: 'beginner',
        tags: ['java', 'control-flow'],
        updatedAt: '2026-01-20',
        passThreshold: 0.7,
        questions: [
          {
            type: 'true-false',
            id: 'q1',
            prompt:
              'In an if/else statement, both branches can run in the same execution.',
            correctAnswer: false,
            explanation:
              'Exactly one branch runs - either the if block or the else block, never both.',
          },
          {
            type: 'mcq',
            id: 'q2',
            prompt: 'What causes fall-through in a classic switch statement?',
            choices: ['Using default', 'Omitting break', 'Using ->', 'Using else if'],
            correctChoiceIndex: 1,
            explanation:
              'Without break, execution continues into the next case instead of exiting the switch.',
          },
          {
            type: 'mcq',
            id: 'q3',
            prompt:
              'What is a key advantage of a modern switch expression over a classic switch statement?',
            choices: [
              'It runs faster',
              'It can produce a value directly with no fall-through risk',
              'It supports more data types',
              'It requires fewer case labels',
            ],
            correctChoiceIndex: 1,
            explanation:
              'Switch expressions (Java 14+) produce a value directly and never fall through, removing an entire class of bugs.',
          },
        ],
      },
    },
    {
      type: 'summary',
      takeaways: [
        'if/else runs exactly one of two branches based on a condition; else if chains handle more than two possibilities.',
        "Nested conditions are sometimes necessary, but a combined condition (&&) is often clearer when the branches don't diverge.",
        'A classic switch falls through to the next case unless break is used; modern switch expressions (Java 14+) never fall through and produce a value directly.',
        "That's every lesson in Java Fundamentals - you can now explain what Java is, how it runs, and read or write programs using variables, data types, operators, input/output, and control flow.",
      ],
      furtherReading: [
        {
          label: 'Oracle: The if-then and if-then-else Statements',
          href: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html',
        },
        {
          label: 'Oracle: The switch Statement',
          href: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html',
        },
      ],
    },
  ],
}
