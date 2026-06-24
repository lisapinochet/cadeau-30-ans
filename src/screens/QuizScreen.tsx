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
        question: 'Pourquoi est-ce que tu as le droit à cette surprise ?',
        answers: [
            {
                label: 'Parce que tu n’as pas mis une ambiance de merde en pétant aujourd’hui',
                isCorrect: false,
            },
            {
                label: 'Parce que tu fêtes tes 30 ans',
                isCorrect: true,
            },
            {
                label: 'Parce que tu as gagné un concours secret',
                isCorrect: false,
            },
        ],
    },
    {
        question: 'Quelle est la date de mon anniversaire ?',
        answers: [
            {
                label: '09/08/1996',
                isCorrect: false,
            },
            {
                label: '08/09/1996',
                isCorrect: true,
            },
            {
                label: '07/08/1996',
                isCorrect: false,
            },
        ],
    },
    {
        question: 'Quelle est la plus belle femme du monde ?',
        answers: [
            {
                label: 'Miss Monde',
                isCorrect: false,
            },
            {
                label: 'Natalie Portman',
                isCorrect: false,
            },
            {
                label: 'Lisa',
                isCorrect: true,
            },
        ],
    },
    {
        question: 'D’après toi, qu’est-ce qu’il pourrait y avoir dans cette surprise ?',
        answers: [

            {
                label: 'Du tricot intensif et une tisane',
                isCorrect: false,
            },
            {
                label: 'Un stage de comptabilité sur Excel',
                isCorrect: false,
            },

            {
                label: 'Un peu de sport nautique',
                isCorrect: true,
            },
        ],
    },
]

function QuizScreen({ onComplete }: QuizScreenProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null)
    const [feedback, setFeedback] = useState<string | null>(null)
    const [showTransition, setShowTransition] = useState(false)

    const currentQuestion = questions[currentQuestionIndex]
    const isLastQuestion = currentQuestionIndex === questions.length - 1

    const goToNextQuestion = () => {
        if (isLastQuestion) {
            onComplete()
            return
        }

        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswerIndex(null)
        setFeedback(null)
    }

    const handleAnswerClick = (answerIndex: number) => {
        const selectedAnswer = currentQuestion.answers[answerIndex]

        setSelectedAnswerIndex(answerIndex)

        if (!selectedAnswer.isCorrect) {
            setFeedback('Presque... essaie encore 😏')
            return
        }

        setFeedback('Bonne réponse ❤️')

        window.setTimeout(() => {
            if (currentQuestionIndex === 0) {
                setShowTransition(true)
                setSelectedAnswerIndex(null)
                setFeedback(null)
                return
            }

            goToNextQuestion()
        }, 700)
    }

    if (showTransition) {
        return (
            <section className="screen">
                <h1>Attends, attends...</h1>

                <p>
                    Ça ne va pas être si simple. Avant de découvrir ton cadeau, petite
                    vérification d’usage : il faut d’abord prouver que tu mérites vraiment
                    cette surprise 😏
                </p>

                <button
                    className="primary-button"
                    onClick={() => {
                        setShowTransition(false)
                        setCurrentQuestionIndex(1)
                    }}
                >
                    Ok, je suis prêt
                </button>
            </section>
        )
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