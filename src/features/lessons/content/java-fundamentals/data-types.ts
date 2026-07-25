import type { LessonContent } from '@/engines/lesson-engine/types'

export const dataTypes: LessonContent = {
  slug: 'data-types',
  title: 'Data Types',
  description:
    "Java's primitive types, a first look at reference types, and how to convert between types safely.",
  difficulty: 'beginner',
  tags: ['java', 'data-types', 'syntax'],
  pathSlug: 'java-fundamentals',
  updatedAt: '2026-01-20',
  prerequisites: ['variables'],
  estimatedMinutes: 17,
  blocks: [
    {
      type: 'prose',
      markdown:
        'Every variable in Java has a type, decided when it\'s declared and fixed for its lifetime - this is what "statically typed" from lesson 1 actually means in practice. The type determines what kind of value a variable can hold, how much memory it uses, and what operations are valid on it.',
    },
    {
      type: 'prose',
      markdown:
        '## Primitive types\n\nJava has eight **primitive types** - the basic building blocks, holding a value directly rather than referring to something else. They fall into four groups: whole numbers, decimal numbers, a single character, and true/false.',
    },
    {
      type: 'comparison-table',
      caption: "Java's eight primitive types",
      headers: ['Type', 'Category', 'Size', 'Example'],
      rows: [
        ['byte', 'Whole number', '8-bit', '(byte) 100'],
        ['short', 'Whole number', '16-bit', '(short) 30000'],
        ['int', 'Whole number', '32-bit', '2_000_000'],
        ['long', 'Whole number', '64-bit', '9000000000L'],
        ['float', 'Decimal', '32-bit', '3.14f'],
        ['double', 'Decimal', '64-bit', '3.14159'],
        ['char', 'Single character', '16-bit', "'A'"],
        ['boolean', 'True/false', '1 bit (conceptually)', 'true'],
      ],
    },
    {
      type: 'code',
      language: 'java',
      code: "int quantity = 42;\ndouble price = 19.99;\nchar grade = 'A';\nboolean isAvailable = true;",
    },
    {
      type: 'callout',
      variant: 'tip',
      markdown:
        "In practice, most whole numbers you write should be `int` (it's large enough for almost everything and is the default whole-number type), most decimals should be `double`, and `byte`/`short`/`float` are reserved for specific cases - large arrays where memory matters, or working with an API that requires them.",
    },
    {
      type: 'prose',
      markdown:
        "## Reference types, briefly\n\nNot every type is primitive. `String` (text), arrays, and any type you define yourself with a class are **reference types**: instead of holding a value directly, a reference-type variable holds a reference to an object living elsewhere in memory. You'll work with `String` from lesson 9 onward and build your own types in a later course - for now, just recognize the distinction exists.",
    },
    {
      type: 'comparison-table',
      caption: 'Primitive types vs reference types, conceptually',
      headers: ['', 'Primitive (e.g. int)', 'Reference (e.g. String)'],
      rows: [
        ['Holds', 'The value directly', 'A reference to an object elsewhere in memory'],
        [
          'Default value',
          'A fixed value like 0 or false',
          'null - "refers to nothing"',
        ],
        [
          'Examples',
          'int, double, boolean, char',
          'String, arrays, any class you define',
        ],
      ],
    },
    {
      type: 'prose',
      markdown:
        "## Choosing the correct type\n\nPick the narrowest type that comfortably fits your data and won't need to grow. Counting people in a room: `int`. A bank balance needing exact cents: `double` (or, for real financial software, a dedicated decimal type - `double` has subtle precision quirks worth knowing about later). A single true/false flag: `boolean`. When in doubt between `int` and `long`, or `float` and `double`, default to the more common, larger option (`int`, `double`) unless you have a specific reason not to.",
    },
    {
      type: 'prose',
      markdown:
        '## Type conversion basics\n\nJava sometimes needs to convert a value from one type to another. **Widening** conversions (small type to a larger one, like `int` to `double`) happen automatically, because no information can be lost. **Narrowing** conversions (large type to a smaller one, like `double` to `int`) require an explicit **cast**, because they can lose information - Java makes you opt in deliberately.',
    },
    {
      type: 'code',
      language: 'java',
      code: 'int wholeNumber = 10;\ndouble widened = wholeNumber;    // automatic - int fits safely into double\n\ndouble price = 19.99;\nint narrowed = (int) price;      // explicit cast required - narrowed is 19, the decimal is discarded',
      highlightLines: [2, 5],
    },
    {
      type: 'callout',
      variant: 'mistake',
      markdown:
        'Casting `double` to `int` **truncates** (chops off the decimal part) - it does not round. `(int) 19.99` is `19`, not `20`. If you need rounding, use `Math.round(...)` instead of a bare cast.',
    },
    {
      type: 'flashcards',
      heading: 'Key terms from this lesson',
      cards: [
        {
          front: 'Primitive type',
          back: 'A basic type (int, double, boolean, etc.) that holds a value directly.',
        },
        {
          front: 'Reference type',
          back: 'A type (String, arrays, classes) whose variable holds a reference to an object elsewhere in memory.',
        },
        {
          front: 'Widening conversion',
          back: 'An automatic conversion from a smaller type to a larger one, e.g. int to double.',
        },
        {
          front: 'Narrowing conversion',
          back: 'A conversion from a larger type to a smaller one, requiring an explicit cast because it can lose data.',
        },
      ],
    },
    {
      type: 'quiz',
      quiz: {
        slug: 'data-types-check',
        title: 'Quick check: Data Types',
        description: 'A short knowledge check for the "Data Types" lesson.',
        difficulty: 'beginner',
        tags: ['java', 'data-types'],
        updatedAt: '2026-01-20',
        passThreshold: 0.7,
        questions: [
          {
            type: 'mcq',
            id: 'q1',
            prompt: 'Which type would you use for a single true/false flag?',
            choices: ['int', 'char', 'boolean', 'String'],
            correctChoiceIndex: 2,
            explanation: 'boolean is exactly for true/false values.',
          },
          {
            type: 'true-false',
            id: 'q2',
            prompt: 'Casting a double to an int rounds to the nearest whole number.',
            correctAnswer: false,
            explanation:
              'Casting truncates - it discards the decimal part rather than rounding. Use Math.round() if you want rounding.',
          },
          {
            type: 'mcq',
            id: 'q3',
            prompt: 'Which conversion requires an explicit cast?',
            choices: [
              'int to double',
              'Narrowing (e.g. double to int)',
              'Widening (e.g. int to long)',
              'None - Java converts everything automatically',
            ],
            correctChoiceIndex: 1,
            explanation:
              'Narrowing conversions can lose data, so Java requires an explicit cast to make that risk visible in the code.',
          },
          {
            type: 'mcq',
            id: 'q4',
            prompt: 'Which of these is a reference type, not a primitive?',
            choices: ['int', 'double', 'String', 'boolean'],
            correctChoiceIndex: 2,
            explanation:
              'String is a reference type - its variable holds a reference to a String object, not the text directly.',
          },
        ],
      },
    },
    {
      type: 'summary',
      takeaways: [
        'Java has eight primitive types, grouped into whole numbers, decimals, a single character, and true/false.',
        'Reference types (String, arrays, classes) hold a reference to an object rather than a value directly.',
        'Widening conversions (small to large type) happen automatically; narrowing conversions require an explicit cast.',
        'A cast from double to int truncates the decimal part - it does not round.',
      ],
      furtherReading: [
        {
          label: 'Oracle: Primitive Data Types (Java Tutorials)',
          href: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html',
        },
      ],
    },
  ],
}
