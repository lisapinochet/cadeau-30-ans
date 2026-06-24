import { useEffect, useRef, useState } from 'react'

type ProgressBarProps = {
    currentStep: number
    totalSteps: number
}

function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    const [isWalking, setIsWalking] = useState(false)
    const previousStepRef = useRef(currentStep)

    const progress =
        totalSteps <= 1
            ? 100
            : ((currentStep - 1) / (totalSteps - 1)) * 100

    const walkerPosition = 4 + progress * 0.92

    useEffect(() => {
        if (previousStepRef.current === currentStep) {
            return
        }

        setIsWalking(true)
        previousStepRef.current = currentStep

        const timeoutId = window.setTimeout(() => {
            setIsWalking(false)
        }, 700)

        return () => {
            window.clearTimeout(timeoutId)
        }
    }, [currentStep])

    return (
        <div className="progress">
            <p className="progress-label">
                Étape {currentStep} sur {totalSteps}
            </p>

            <div
                className="progress-wrapper"
                role="progressbar"
                aria-valuenow={currentStep}
                aria-valuemin={1}
                aria-valuemax={totalSteps}
            >
                <div className="progress-track">
                    <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div
                    className={
                        isWalking
                            ? 'progress-walker progress-walker-walking'
                            : 'progress-walker'
                    }
                    style={{ left: `${walkerPosition}%` }}
                    aria-hidden="true"
                >
                    <div className="walker">
                        <span className="walker-head" />
                        <span className="walker-body" />
                        <span className="walker-arm walker-arm-front" />
                        <span className="walker-arm walker-arm-back" />
                        <span className="walker-leg walker-leg-front" />
                        <span className="walker-leg walker-leg-back" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgressBar