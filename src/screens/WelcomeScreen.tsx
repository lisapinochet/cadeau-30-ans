type WelcomeScreenProps = {
    onStart: () => void
}

function WelcomeScreen({ onStart }: WelcomeScreenProps) {
    return (
        <section className="screen">
            <p className="screen-step">Étape 1 sur 6</p>

            <h1>Mission 30 ans</h1>

            <p>Une surprise t’attend...</p>

            <button onClick={onStart}>
                Commencer
            </button>
        </section>
    )
}

export default WelcomeScreen