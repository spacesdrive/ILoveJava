import type { LessonContent } from '@/engines/lesson-engine/types'

export const operators: LessonContent = {
  slug: 'operators',
  title: 'Operators',
  description:
    'Arithmetic, assignment, comparison, logical, and increment/decrement operators, and how Java decides the order to evaluate them in.',
  difficulty: 'beginner',
  tags: ['java', 'operators', 'syntax'],
  pathSlug: 'java-fundamentals',
  updatedAt: '2026-01-20',
  prerequisites: ['data-types'],
  estimatedMinutes: 18,
  blocks: [
    {
      type: 'prose',
      markdown:
        "Operators combine values into new ones - add two numbers, compare two amounts, check whether two conditions are both true. This lesson covers the operators you'll use constantly, and one rule that determines what a line of code with several of them actually does: **precedence**.",
    },
    {
      type: 'comparison-table',
      caption: 'Arithmetic operators',
      headers: ['Operator', 'Meaning', 'Example', 'Result'],
      rows: [
        ['+', 'Addition', '5 + 2', '7'],
        ['-', 'Subtraction', '5 - 2', '3'],
        ['*', 'Multiplication', '5 * 2', '10'],
        ['/', 'Division', '5 / 2', '2 (integer division)'],
        ['%', 'Remainder (modulo)', '5 % 2', '1'],
      ],
    },
    {
      type: 'callout',
      variant: 'mistake',
      markdown:
        'Dividing two `int` values with `/` performs **integer division**: the decimal part is discarded, not rounded. `5 / 2` is `2`, not `2.5`. To get a decimal result, make at least one operand a `double` - `5.0 / 2` is `2.5`.',
    },
    {
      type: 'comparison-table',
      caption: 'Assignment operators',
      headers: ['Operator', 'Equivalent to', 'Meaning'],
      rows: [
        ['x += 5', 'x = x + 5', 'Add and assign'],
        ['x -= 5', 'x = x - 5', 'Subtract and assign'],
        ['x *= 5', 'x = x * 5', 'Multiply and assign'],
        ['x /= 5', 'x = x / 5', 'Divide and assign'],
      ],
    },
    {
      type: 'comparison-table',
      caption: 'Comparison operators - all produce a boolean',
      headers: ['Operator', 'Meaning', 'Example (age = 20)'],
      rows: [
        ['==', 'Equal to', 'age == 18 -> false'],
        ['!=', 'Not equal to', 'age != 18 -> true'],
        ['>', 'Greater than', 'age > 18 -> true'],
        ['<', 'Less than', 'age < 18 -> false'],
        ['>=', 'Greater than or equal to', 'age >= 20 -> true'],
        ['<=', 'Less than or equal to', 'age <= 19 -> false'],
      ],
    },
    {
      type: 'comparison-table',
      caption: 'Logical operators',
      headers: ['Operator', 'Meaning', 'True when'],
      rows: [
        ['&&', 'AND', 'Both sides are true'],
        ['||', 'OR', 'At least one side is true'],
        ['!', 'NOT', 'Flips true to false and false to true'],
      ],
    },
    {
      type: 'code',
      language: 'java',
      code: 'boolean isAdult = age >= 18;\nboolean hasTicket = true;\n\nboolean canEnter = isAdult && hasTicket;   // both must be true\nboolean needsReview = !isAdult || !hasTicket;',
    },
    {
      type: 'prose',
      markdown:
        '## Increment and decrement\n\n`++` adds 1 to a variable; `--` subtracts 1. Both come in two forms: **postfix** (`count++`) uses the current value first, then increments; **prefix** (`++count`) increments first, then uses the new value. When the operator sits alone on its own line, both forms behave identically - the difference only matters when you use the result of the expression in the same statement.',
    },
    {
      type: 'code',
      language: 'java',
      code: 'int count = 5;\ncount++;        // count is now 6\ncount--;        // count is now 5 again\n\nint a = 5;\nint b = a++;    // b is 5 (old value used first), a is now 6\n\nint c = 5;\nint d = ++c;    // c is incremented first, so d is 6, and c is 6',
      highlightLines: [6, 9],
    },
    {
      type: 'prose',
      markdown:
        '## Operator precedence\n\nWhen an expression mixes several operators, Java evaluates them in a fixed order - multiplication and division before addition and subtraction, similar to the order of operations from math class. `2 + 3 * 4` is `14`, not `20`, because `3 * 4` evaluates first.',
    },
    {
      type: 'steps',
      heading: 'Evaluating 2 + 3 * 4 step by step',
      steps: [
        {
          title: 'Identify the highest-precedence operator',
          markdown: '`*` binds tighter than `+`, so it evaluates first.',
        },
        { title: 'Evaluate 3 * 4', markdown: 'This produces 12.' },
        {
          title: 'Evaluate the remaining expression',
          markdown: '2 + 12 evaluates to 14 - the final result.',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'best-practice',
      markdown:
        "Don't rely on memorizing the full precedence table under pressure - add parentheses to make the intended order explicit, even when they're not strictly required. `(2 + 3) * 4` is unambiguous to any reader at a glance; `2 + 3 * 4` requires them to recall the rule.",
    },
    {
      type: 'prose',
      markdown:
        '## A real-world example\n\nCalculating a discounted price combines several of these operators in one realistic line of code:',
    },
    {
      type: 'code',
      language: 'java',
      code: 'double originalPrice = 80.0;\ndouble discountPercent = 25.0;\n\ndouble finalPrice = originalPrice - (originalPrice * discountPercent / 100.0);\nboolean qualifiesForFreeShipping = finalPrice >= 50.0 && discountPercent > 0;',
    },
    {
      type: 'exercise',
      exercise: {
        slug: 'operators-average-of-two',
        title: 'Calculate an average',
        description:
          'Practice arithmetic operators by computing an average of two numbers.',
        difficulty: 'beginner',
        tags: ['java', 'operators'],
        updatedAt: '2026-01-20',
        prompt:
          'Given two int variables, a = 7 and b = 9, compute their average as a double named average, and print it. It should print 8.0.',
        starterCode:
          'public class Main {\n    public static void main(String[] args) {\n        int a = 7;\n        int b = 9;\n        // Compute and print the average as a double\n    }\n}',
        solutionCode:
          'public class Main {\n    public static void main(String[] args) {\n        int a = 7;\n        int b = 9;\n        double average = (a + b) / 2.0;\n        System.out.println(average);\n    }\n}',
        testCases: [
          {
            id: 'tc-1',
            description: 'Prints the average as a decimal',
            input: '',
            expectedOutput: '8.0',
          },
        ],
        hints: [
          'Divide by 2.0, not 2, or integer division will discard the decimal part.',
          'Add parentheses around (a + b) so addition happens before division.',
        ],
      },
    },
    {
      type: 'flashcards',
      heading: 'Key terms from this lesson',
      cards: [
        {
          front: 'Integer division',
          back: 'Dividing two ints with / discards the remainder instead of rounding: 5 / 2 is 2.',
        },
        {
          front: 'Precedence',
          back: 'The fixed order Java evaluates operators in when an expression mixes several.',
        },
        {
          front: 'Postfix vs prefix',
          back: 'count++ uses the value then increments; ++count increments then uses the value.',
        },
      ],
    },
    {
      type: 'quiz',
      quiz: {
        slug: 'operators-check',
        title: 'Quick check: Operators',
        description: 'A short knowledge check for the "Operators" lesson.',
        difficulty: 'beginner',
        tags: ['java', 'operators'],
        updatedAt: '2026-01-20',
        passThreshold: 0.7,
        questions: [
          {
            type: 'mcq',
            id: 'q1',
            prompt: 'What is the value of 7 / 2 in Java, where both operands are int?',
            choices: ['3.5', '3', '4', '2'],
            correctChoiceIndex: 1,
            explanation: 'Integer division discards the remainder: 7 / 2 is 3.',
          },
          {
            type: 'mcq',
            id: 'q2',
            prompt: 'What does 2 + 3 * 4 evaluate to?',
            choices: ['20', '14', '24', '9'],
            correctChoiceIndex: 1,
            explanation:
              'Multiplication happens before addition: 3 * 4 = 12, then 2 + 12 = 14.',
          },
          {
            type: 'true-false',
            id: 'q3',
            prompt: 'The && operator is true only when both sides are true.',
            correctAnswer: true,
            explanation:
              '&& (logical AND) requires both operands to be true for the result to be true.',
          },
        ],
      },
    },
    {
      type: 'summary',
      takeaways: [
        'Arithmetic operators (+, -, *, /, %) work as expected, except integer division truncates rather than rounds.',
        'Comparison operators (==, !=, <, >, <=, >=) and logical operators (&&, ||, !) always produce a boolean.',
        'count++ uses the current value before incrementing; ++count increments first.',
        'Java evaluates higher-precedence operators (like * and /) before lower-precedence ones (like + and -) - use parentheses to make intent explicit.',
      ],
      furtherReading: [
        {
          label: 'Oracle: Operators (Java Tutorials)',
          href: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/operators.html',
        },
      ],
    },
  ],
}
