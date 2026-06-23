type QuizScreenProps = {
    onComplete: () => void;
}

function QuizScreen({ onComplete }: QuizScreenProps) {
    return (
        <section className="screen">

            <h1>Quiz</h1>

            <p>Première question à venir.</p>

            <button onClick={onComplete}>Valider</button>

        </section>
    )
}

export default QuizScreen