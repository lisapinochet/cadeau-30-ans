import { useEffect } from 'react'
import confetti from 'canvas-confetti'

function ConfettiBurst() {
    useEffect(() => {
        const colors = [
            '#FFB085',
            '#FF7A6B',
            '#FFD6A5',
            '#FFF3E6',
            '#F6C1C7',
        ]

        confetti({
            particleCount: 90,
            spread: 80,
            startVelocity: 35,
            origin: {
                x: 0.5,
                y: 0.65,
            },
            colors,
            zIndex: 9999,
        })

        setTimeout(() => {
            confetti({
                particleCount: 45,
                angle: 60,
                spread: 55,
                origin: {
                    x: 0,
                    y: 0.75,
                },
                colors,
                zIndex: 9999,
            })
        }, 200)

        setTimeout(() => {
            confetti({
                particleCount: 45,
                angle: 120,
                spread: 55,
                origin: {
                    x: 1,
                    y: 0.75,
                },
                colors,
                zIndex: 9999,
            })
        }, 350)
    }, [])

    return null
}

export default ConfettiBurst