import * as React from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import type { QuizAttempt, QuizContent, QuizQuestion } from '../types'

export interface QuizRendererProps {
  quiz: QuizContent
  onComplete?: (attempt: QuizAttempt) => void
}

type Answer = string | number | boolean

function isCorrect(question: QuizQuestion, answer: Answer | undefined): boolean {
  if (answer === undefined) return false
  switch (question.type) {
    case 'mcq':
      return answer === question.correctChoiceIndex
    case 'true-false':
      return answer === question.correctAnswer
    case 'fill-in':
      return question.acceptedAnswers.some(
        (accepted) =>
          accepted.trim().toLowerCase() === String(answer).trim().toLowerCase(),
      )
  }
}

function QuestionInput({
  question,
  answer,
  onAnswer,
}: {
  question: QuizQuestion
  answer: Answer | undefined
  onAnswer: (answer: Answer) => void
}) {
  if (question.type === 'mcq') {
    return (
      <RadioGroup
        value={answer === undefined ? undefined : String(answer)}
        onValueChange={(value) => onAnswer(Number(value))}
      >
        {question.choices.map((choice, index) => (
          <div key={index} className="flex items-center gap-2">
            <RadioGroupItem value={String(index)} id={`${question.id}-${index}`} />
            <Label htmlFor={`${question.id}-${index}`}>{choice}</Label>
          </div>
        ))}
      </RadioGroup>
    )
  }

  if (question.type === 'true-false') {
    return (
      <RadioGroup
        value={answer === undefined ? undefined : String(answer)}
        onValueChange={(value) => onAnswer(value === 'true')}
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem value="true" id={`${question.id}-true`} />
          <Label htmlFor={`${question.id}-true`}>True</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="false" id={`${question.id}-false`} />
          <Label htmlFor={`${question.id}-false`}>False</Label>
        </div>
      </RadioGroup>
    )
  }

  return (
    <Input
      aria-label="Your answer"
      value={typeof answer === 'string' ? answer : ''}
      onChange={(event) => onAnswer(event.target.value)}
    />
  )
}

/** Renders one question at a time, scores against `passThreshold`, and calls onComplete once. */
export function QuizRenderer({ quiz, onComplete }: QuizRendererProps) {
  const [index, setIndex] = React.useState(0)
  const [answers, setAnswers] = React.useState<Record<string, Answer>>({})
  const [checked, setChecked] = React.useState(false)
  const [finished, setFinished] = React.useState(false)

  const question = quiz.questions[index]
  const isLast = index === quiz.questions.length - 1

  const handleNext = () => {
    if (isLast) {
      const correctCount = quiz.questions.filter((q) =>
        isCorrect(q, answers[q.id]),
      ).length
      const score = correctCount / quiz.questions.length
      setFinished(true)
      onComplete?.({
        quizSlug: quiz.slug,
        answers,
        score,
        completedAt: new Date().toISOString(),
      })
      return
    }
    setIndex((i) => i + 1)
    setChecked(false)
  }

  if (finished) {
    const correctCount = quiz.questions.filter((q) =>
      isCorrect(q, answers[q.id]),
    ).length
    const score = correctCount / quiz.questions.length
    const passed = score >= quiz.passThreshold

    return (
      <Alert variant={passed ? 'default' : 'destructive'}>
        <AlertTitle>{passed ? 'Quiz passed' : 'Quiz not passed'}</AlertTitle>
        <AlertDescription>
          {correctCount} of {quiz.questions.length} correct ({Math.round(score * 100)}
          %).
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <Progress
        value={((index + 1) / quiz.questions.length) * 100}
        aria-label="Quiz progress"
      />

      <p className="font-medium">{question.prompt}</p>

      <QuestionInput
        question={question}
        answer={answers[question.id]}
        onAnswer={(answer) =>
          setAnswers((prev) => ({ ...prev, [question.id]: answer }))
        }
      />

      {checked && (
        <Alert
          variant={
            isCorrect(question, answers[question.id]) ? 'default' : 'destructive'
          }
        >
          <AlertTitle>
            {isCorrect(question, answers[question.id]) ? 'Correct' : 'Not quite'}
          </AlertTitle>
          <AlertDescription>{question.explanation}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-3">
        {!checked ? (
          <Button
            onClick={() => setChecked(true)}
            disabled={answers[question.id] === undefined}
          >
            Check answer
          </Button>
        ) : (
          <Button onClick={handleNext}>{isLast ? 'Finish' : 'Next'}</Button>
        )}
      </div>
    </div>
  )
}
