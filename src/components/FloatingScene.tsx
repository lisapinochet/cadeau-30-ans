import { useEffect, useState } from 'react'

type Motion = {
    x: number
    y: number
}

type FloatingSceneProps = {
    onReady?: () => void
}

type FloatingItemData = {
    className: string
    depth: number
    src: string
    alt: string
}

type FloatingItemProps = FloatingItemData & {
    motion: Motion
}

const floatingItems: FloatingItemData[] = [
    {
        className: 'item-surf',
        depth: 0.8,
        src: '/images/surf.png',
        alt: 'Surf',
    },
    {
        className: 'item-kitesurf-2',
        depth: 0.9,
        src: '/images/kitesurf2.png',
        alt: 'Kitesurf',
    },
    {
        className: 'item-surf-2',
        depth: 0.75,
        src: '/images/surf2.png',
        alt: 'Surf',
    },
    {
        className: 'item-cocktail',
        depth: 0.7,
        src: '/images/cocktail.png',
        alt: 'Cocktail',
    },
    {
        className: 'item-bbq',
        depth: 0.45,
        src: '/images/bbq.png',
        alt: 'Barbecue',
    },
    {
        className: 'item-cat',
        depth: 0.6,
        src: '/images/cat.png',
        alt: 'Chat',
    },
]

function preloadImage(src: string) {
    return new Promise<void>((resolve) => {
        const image = new Image()

        image.src = src

        if (image.complete) {
            resolve()
            return
        }

        image.onload = () => resolve()
        image.onerror = () => resolve()
    })
}

function FloatingItem({
                          className,
                          depth,
                          motion,
                          src,
                          alt,
                      }: FloatingItemProps) {
    return (
        <div className={`floating-item-position ${className}`}>
            <div
                className="floating-item-parallax"
                style={{
                    transform: `translate3d(${motion.x * depth}px, ${motion.y * depth}px, 0)`,
                }}
            >
                <div className="floating-item-content">
                    <img
                        className="floating-image"
                        src={src}
                        alt={alt}
                        loading="eager"
                        decoding="async"
                    />
                </div>
            </div>
        </div>
    )
}

function FloatingScene({ onReady }: FloatingSceneProps) {
    const [motion, setMotion] = useState<Motion>({ x: 0, y: 0 })
    const [imagesLoaded, setImagesLoaded] = useState(false)

    useEffect(() => {
        let isMounted = true

        Promise.all(floatingItems.map((item) => preloadImage(item.src))).then(() => {
            if (!isMounted) {
                return
            }

            setImagesLoaded(true)
            onReady?.()
        })

        return () => {
            isMounted = false
        }
    }, [onReady])

    useEffect(() => {
        const clamp = (value: number, min: number, max: number) => {
            return Math.min(Math.max(value, min), max)
        }

        const handlePointerMove = (event: PointerEvent) => {
            const normalizedX = event.clientX / window.innerWidth - 0.5
            const normalizedY = event.clientY / window.innerHeight - 0.5

            setMotion({
                x: normalizedX * 32,
                y: normalizedY * 32,
            })
        }

        const handleDeviceOrientation = (event: DeviceOrientationEvent) => {

            if (event.gamma === null || event.beta === null) {
                return
            }

            const normalizedX = clamp(event.gamma / 25, -1, 1)
            const normalizedY = clamp(event.beta / 25, -1, 1)

            setMotion({
                x: normalizedX * 16,
                y: normalizedY * 16,
            })
        }

        const resetMotion = () => {
            setMotion({ x: 0, y: 0 })
        }

        window.addEventListener('pointermove', handlePointerMove)
        window.addEventListener('pointerup', resetMotion)
        window.addEventListener('pointerleave', resetMotion)
        window.addEventListener('deviceorientation', handleDeviceOrientation)

        return () => {
            window.removeEventListener('pointermove', handlePointerMove)
            window.removeEventListener('pointerup', resetMotion)
            window.removeEventListener('pointerleave', resetMotion)
            window.removeEventListener('deviceorientation', handleDeviceOrientation)
        }
    }, [])

    return (
        <div
            className={
                imagesLoaded
                    ? 'floating-scene floating-scene-ready'
                    : 'floating-scene floating-scene-loading'
            }
        >
            {imagesLoaded &&
                floatingItems.map((item) => (
                    <FloatingItem
                        key={item.src}
                        {...item}
                        motion={motion}
                    />
                ))}
        </div>
    )
}

export default FloatingScene