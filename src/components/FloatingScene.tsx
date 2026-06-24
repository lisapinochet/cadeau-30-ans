import { useEffect, useState } from 'react'

type Motion = {
    x: number
    y: number
}

type FloatingItemProps = {
    className: string
    depth: number
    motion: Motion
    children: string
}

function FloatingItem({ className, depth, motion, children }: FloatingItemProps) {
    return (
        <div className={`floating-item-position ${className}`}>
            <div
                className="floating-item-parallax"
                style={{
                    transform: `translate3d(${motion.x * depth}px, ${motion.y * depth}px, 0)`,
                }}
            >
                <div className="floating-item-content">
                    {children}
                </div>
            </div>
        </div>
    )
}

function FloatingScene() {
    const [motion, setMotion] = useState<Motion>({ x: 0, y: 0 })

    useEffect(() => {
        const handlePointerMove = (event: PointerEvent) => {
            const normalizedX = event.clientX / window.innerWidth - 0.5
            const normalizedY = event.clientY / window.innerHeight - 0.5

            setMotion({
                x: normalizedX * 32,
                y: normalizedY * 32,
            })
        }

        const resetMotion = () => {
            setMotion({ x: 0, y: 0 })
        }

        window.addEventListener('pointermove', handlePointerMove)
        window.addEventListener('pointerup', resetMotion)
        window.addEventListener('pointerleave', resetMotion)

        return () => {
            window.removeEventListener('pointermove', handlePointerMove)
            window.removeEventListener('pointerup', resetMotion)
            window.removeEventListener('pointerleave', resetMotion)
        }
    }, [])

    return (
        <div className="floating-scene">
            <FloatingItem className="item-pool" depth={0.2} motion={motion}>
                🏊
            </FloatingItem>

            <FloatingItem className="item-surf" depth={0.8} motion={motion}>
                🏄
            </FloatingItem>

            <FloatingItem className="item-kite" depth={1} motion={motion}>
                🪁
            </FloatingItem>

            <FloatingItem className="item-bbq" depth={0.45} motion={motion}>
                🔥
            </FloatingItem>

            <FloatingItem className="item-cat" depth={0.6} motion={motion}>
                🐈
            </FloatingItem>
        </div>
    )
}

export default FloatingScene