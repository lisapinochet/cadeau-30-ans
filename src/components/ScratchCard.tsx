import { useEffect, useRef, useState, type ReactNode } from 'react'

type ScratchCardProps = {
    children: ReactNode
    onComplete?: () => void
}

function ScratchCard({ children, onComplete }: ScratchCardProps) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const isDrawingRef = useRef(false)
    const hasCompletedRef = useRef(false)

    const [isCompleted, setIsCompleted] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current

        if (!canvas || !container) {
            return
        }

        const drawOverlay = () => {
            const { width, height } = container.getBoundingClientRect()
            const pixelRatio = window.devicePixelRatio || 1

            canvas.width = width * pixelRatio
            canvas.height = height * pixelRatio
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`

            const context = canvas.getContext('2d')

            if (!context) {
                return
            }

            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

            context.globalCompositeOperation = 'source-over'
            context.fillStyle = '#c9b8aa'
            context.fillRect(0, 0, width, height)

            context.fillStyle = '#2b1d1a'
            context.font = '600 20px system-ui'
            context.textAlign = 'center'
            context.textBaseline = 'middle'
            context.fillText('Gratte ici ✨', width / 2, height / 2)
        }

        drawOverlay()

        const resizeObserver = new ResizeObserver(drawOverlay)
        resizeObserver.observe(container)

        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    const scratch = (clientX: number, clientY: number) => {
        const canvas = canvasRef.current

        if (!canvas) {
            return
        }

        const context = canvas.getContext('2d')

        if (!context) {
            return
        }

        const rect = canvas.getBoundingClientRect()
        const x = clientX - rect.left
        const y = clientY - rect.top

        context.globalCompositeOperation = 'destination-out'
        context.beginPath()
        context.arc(x, y, 28, 0, Math.PI * 2)
        context.fill()
    }

    const checkCompletion = () => {
        const canvas = canvasRef.current

        if (!canvas || hasCompletedRef.current) {
            return
        }

        const context = canvas.getContext('2d')

        if (!context) {
            return
        }

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
        const pixels = imageData.data

        let transparentPixels = 0

        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] === 0) {
                transparentPixels += 1
            }
        }

        const totalPixels = pixels.length / 4
        const scratchedRatio = transparentPixels / totalPixels

        if (scratchedRatio > 0.5) {
            hasCompletedRef.current = true
            setIsCompleted(true)
            onComplete?.()
        }
    }

    const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
        isDrawingRef.current = true
        event.currentTarget.setPointerCapture(event.pointerId)
        scratch(event.clientX, event.clientY)
    }

    const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
        if (!isDrawingRef.current) {
            return
        }

        scratch(event.clientX, event.clientY)
    }

    const handlePointerUp = () => {
        isDrawingRef.current = false
        checkCompletion()
    }

    return (
        <div
            ref={containerRef}
            className={isCompleted ? 'scratch-card scratch-card-completed' : 'scratch-card'}
        >
            <div className="scratch-content">
                {children}
            </div>

            <canvas
                ref={canvasRef}
                className="scratch-canvas"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
            />
        </div>
    )
}

export default ScratchCard