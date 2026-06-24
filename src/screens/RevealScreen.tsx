import { useState } from 'react'
import FloatingScene from '../components/FloatingScene'

type RevealScreenProps = {
    onRestart: () => void
}

function RevealScreen({ onRestart }: RevealScreenProps) {
    const [isReady, setIsReady] = useState(false)

    return (
        <section
            className={
                isReady
                    ? 'screen reveal-screen reveal-screen-ready'
                    : 'screen reveal-screen reveal-screen-loading'
            }
        >
            <FloatingScene onReady={() => setIsReady(true)} />

            <div className="reveal-content">
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

                <button className="primary-button" onClick={onRestart}>
                    Recommencer
                </button>
            </div>
        </section>
    )
}

export default RevealScreen