type Answer = {
    label: string;
    isCorrect: boolean;
}

type Question = {
    question: string;
    answers: Answer[];
}

type QuizQuestionProps = {
    questionNumber: number;
    totalQuestions: number;
    question: Question;
    selectedAnswerIndex: number | null;
    feedback: string | null;
    onAnswerClick: (answerIndex: number) => void;
}

function QuizQuestion({
    questionNumber,
    totalQuestions,
    question,
    selectedAnswerIndex,
    feedback,
    onAnswerClick,
    }: QuizQuestionProps) {
    return(
        <>

            <p className="quiz-counter">
                Question {questionNumber} sur {totalQuestions}
            </p>

            <div className="question-card">
                <p>{question.question}</p>
            </div>

            <div className="answers-list">
                {question.answers.map((answer, index) => (
                    <button
                        key={answer.label}
                        className={selectedAnswerIndex === index ? 'answer-button answer-button-selected' : 'answer-button'}
                        onClick={() => onAnswerClick(index)}
                    >
                        {answer.label}
                    </button>
                ))}
            </div>

            {feedback && <p className="quiz-feedback">{feedback}</p>}

        </>
    )
}

export default QuizQuestion