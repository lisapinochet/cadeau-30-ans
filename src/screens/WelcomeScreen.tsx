type WelcomeScreenProps = {
    onStart: () => void
}

function WelcomeScreen({ onStart }: WelcomeScreenProps) {
    return (
        <section className="screen">

            <h1>Mission 30 ans</h1>

            <p>Une surprise t’attend...</p>

            <button onClick={onStart}>
                Commencer
            </button>
        </section>
    )
}

export default WelcomeScreen