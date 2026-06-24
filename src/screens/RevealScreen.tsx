import { useState } from 'react'
import FloatingScene from '../components/FloatingScene'

type RevealScreenProps = {
    onRestart: () => void
}

function RevealScreen({ onRestart }: RevealScreenProps) {
    const [isReady, setIsReady] = useState(false)
    const [isRevealed, setIsRevealed] = useState(false)

    const handleSceneReady = () => {
        setIsReady(true)

        window.setTimeout(() => {
            setIsRevealed(true)
        }, 900)
    }

    return (
        <section
            className={[
                'screen',
                'reveal-screen',
                isReady ? 'reveal-screen-ready' : 'reveal-screen-loading',
                isRevealed ? 'reveal-screen-revealed' : '',
            ].join(' ')}
        >
            <FloatingScene onReady={handleSceneReady} />

            <div className="reveal-intro">
                <span>La surprise est prête</span>
                <strong>Casa de Paraventa</strong>
            </div>

            <div className="reveal-content">
                <div className="stay-recap">
                    <h1>Séjour à Casa de Paraventa</h1>

                    <img
                        className="stay-image"
                        src="/images/booking.PNG"
                        alt="Casa de Paraventa"
                    />

                    <div className="stay-details-grid">
                        <div className="stay-detail-card">
                            <span className="stay-detail-label">Durée</span>
                            <strong>2 nuits</strong>
                        </div>

                        <div className="stay-detail-card">
                            <span className="stay-detail-label">Dates</span>
                            <strong>17 au 19 juillet</strong>
                        </div>

                        <div className="stay-detail-card">
                            <span className="stay-detail-label">Lagoa de Óbidos</span>
                            <strong>17 min</strong>
                        </div>

                        <div className="stay-detail-card">
                            <span className="stay-detail-label">Supertubos</span>
                            <strong>20 min</strong>
                        </div>
                    </div>
                </div>

                <button className="primary-button" onClick={onRestart}>
                    Recommencer
                </button>
            </div>
        </section>
    )
}

export default RevealScreen