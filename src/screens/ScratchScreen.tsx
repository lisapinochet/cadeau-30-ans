type ScratchScreenProps = {
    onReveal: () => void
}

function ScratchScreen({ onReveal }: ScratchScreenProps) {
    return (
        <section className="screen">
            <p className="screen-step">Étape 3 sur 4</p>

            <h1>Bravo ❤️</h1>

            <p>
                Tu as réussi la mission. Ton ticket cadeau est débloqué.
            </p>

            <div className="placeholder-card">
                <p>Ticket à gratter à venir</p>
            </div>

            <button onClick={onReveal}>
                Révéler le cadeau
            </button>
        </section>
    )
}

export default ScratchScreen