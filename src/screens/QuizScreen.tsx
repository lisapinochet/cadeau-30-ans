type QuizScreenProps = {
    onComplete: () => void;
}

function QuizScreen({ onComplete }: QuizScreenProps) {
    return (
        <section className="screen">
            <p className="screen-step">Etape 2 sur 6</p>

            <h1>Quiz</h1>

            <p>Première question à venir.</p>

            <button onClick={onComplete}>Valider</button>

        </section>
    )
}

export default QuizScreen