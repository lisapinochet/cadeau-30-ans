import { useState } from 'react'
import QuizQuestion from '../components/QuizQuestion'

type QuizScreenProps = {
    onComplete: () => void
}

type Answer = {
    label: string
    isCorrect: boolean
}

type Question = {
    question: string
    answers: Answer[]
}

const questions: Question[] = [
    {
        question: 'Quel est la date de mon anniversaire ?',
        answers: [
            { label: '6 septembre', isCorrect: false },
            { label: '7 septembre', isCorrect: false },
            { label: '8 septembre', isCorrect: true },
        ],
    },

    {
        question: 'Pourquoi cette surprise est spéciale ?',
        answers: [
            { label: 'Parce que c’est samedi', isCorrect: false },
            { label: 'Parce que tu as 30 ans ️', isCorrect: true },
            { label: 'Parce que tu as encore pété', isCorrect: false },
        ],
    },

    {
        question: 'Quelle activité pourrait bien être au programme ?',
        answers: [
            { label: 'Tricot intensif', isCorrect: false },
            { label: 'Cours de comptabilité', isCorrect: false },
            { label: 'Surf ou kitesurf', isCorrect: true },
        ],
    },
]

function QuizScreen({ onComplete }: QuizScreenProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null)
    const [feedback, setFeedback] = useState<string | null>(null)

    const currentQuestion = questions[currentQuestionIndex]
    const isLastQuestion = currentQuestionIndex === questions.length - 1

    const handleAnswerClick = (answerIndex: number) => {
        const selectedAnswer = currentQuestion.answers[answerIndex]

        setSelectedAnswerIndex(answerIndex)

        if (!selectedAnswer.isCorrect) {
            setFeedback('Presque... essaie encore 😏')
            return
        }

        setFeedback('Bonne réponse ❤️')

        setTimeout(() => {
            if (isLastQuestion) {
                onComplete()
                return
            }

            setCurrentQuestionIndex(currentQuestionIndex + 1)
            setSelectedAnswerIndex(null)
            setFeedback(null)
        }, 700)
    }

    return (
        <section className="screen">
            <h1>Quiz</h1>

            <QuizQuestion
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={questions.length}
                question={currentQuestion}
                selectedAnswerIndex={selectedAnswerIndex}
                feedback={feedback}
                onAnswerClick={handleAnswerClick}
            />
        </section>
    )
}

export default QuizScreen