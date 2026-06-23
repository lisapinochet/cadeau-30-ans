type ProgressBarProps = {
    currentStep: number
    totalSteps: number
}

function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="progress">
            <p className="progress-label">
                Etape {currentStep} sur {totalSteps}
            </p>

            <div className="progress-track">
                <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                />
            </div>

        </div>
    )
}
export default ProgressBar