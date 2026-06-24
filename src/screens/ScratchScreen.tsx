import { useState } from 'react'
import ScratchCard from '../components/ScratchCard'
import ConfettiBurst from "../components/ConfettiBurst.tsx";

type ScratchScreenProps = {
    onReveal: () => void
}

function ScratchScreen({ onReveal }: ScratchScreenProps) {
    const [isScratched, setIsScratched] = useState(false)

    return (
        <section className="screen">
            <ConfettiBurst />

            <h1>Bravo ❤️</h1>

            <p>
                Tu as réussi la mission. Ton ticket secret est débloqué.
            </p>

            <ScratchCard onComplete={() => setIsScratched(true)}>
                <img
                    className="scratch-photo"
                    src={`${import.meta.env.BASE_URL}images/booking.PNG`}
                    alt="Photo du cadeau surprise"
                />
            </ScratchCard>

            <button
                className="primary-button"
                disabled={!isScratched}
                onClick={onReveal}
            >
                {isScratched ? 'Continuer' : 'Gratte le ticket pour continuer'}
            </button>
        </section>
    )
}

export default ScratchScreen