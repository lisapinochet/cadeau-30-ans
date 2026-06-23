import { useState } from 'react'
import ScratchCard from '../components/ScratchCard'

type ScratchScreenProps = {
    onReveal: () => void
}

function ScratchScreen({ onReveal }: ScratchScreenProps) {
    const [isScratched, setIsScratched] = useState(false)

    return (
        <section className="screen">
            <h1>Bravo ❤️</h1>

            <p>
                Tu as réussi la mission. Ton ticket secret est débloqué.
            </p>

            <ScratchCard onComplete={() => setIsScratched(true)}>
                <div className="scratch-reward">
                    <p>Surprise !</p>
                    <strong>Un week-end au bord de l’océan 🌊</strong>
                </div>
            </ScratchCard>

            <button
                disabled={!isScratched}
                onClick={onReveal}
            >
                {isScratched ? 'Continuer' : 'Gratte le ticket pour continuer'}
            </button>
        </section>
    )
}

export default ScratchScreen