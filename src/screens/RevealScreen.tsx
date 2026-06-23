type RevealScreenProps = {
    onRestart: () => void
}

function RevealScreen({ onRestart }: RevealScreenProps) {
    return (
        <section className="screen">
            <p className="screen-step">Étape 4 sur 4</p>

            <h1>Surprise !</h1>

            <p>
                Pour tes 30 ans, une escapade spéciale t’attend.
            </p>

            <div className="placeholder-card">
                <p>Map design à venir</p>

                <ul>
                    <li>📍 Hébergement</li>
                    <li>🌊 Spot de surf</li>
                    <li>🪁 Spot de kitesurf</li>
                    <li>🍽️ Restaurant</li>
                    <li>📸 Point de vue</li>
                </ul>
            </div>

            <button onClick={onRestart}>
                Recommencer
            </button>
        </section>
    )
}

export default RevealScreen