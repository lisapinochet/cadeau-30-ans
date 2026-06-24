type WelcomeScreenProps = {
    onStart: () => void
}

function WelcomeScreen({ onStart }: WelcomeScreenProps) {
    return (
        <section className="screen">

            <h1>Mission spéciale<br /> pour mon POUP </h1>

            <p>Une surprise t’attend...</p>

            <button className="primary-button" onClick={onStart}>
                Commencer
            </button>
        </section>
    )
}

export default WelcomeScreen