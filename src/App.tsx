import { useState } from 'react'

import ProgressBar from './components/ProgressBar'
import WelcomeScreen from './screens/WelcomeScreen'
import QuizScreen from './screens/QuizScreen'
import ScratchScreen from './screens/ScratchScreen'
import RevealScreen from './screens/RevealScreen'

type Screen = 'welcome' | 'quiz' | 'scratch' | 'revealMap'

const TOTAL_STEPS = 4

function App() {
    const [currentScreen, setCurrentScreen] = useState<Screen>('welcome')

    const getCurrentStep = () => {
        if (currentScreen === 'welcome') return 1
        if (currentScreen === 'quiz') return 2
        if (currentScreen === 'scratch') return 3
        return 4
    }

    return (
        <main className="app">
            <div className="app-container">
                {currentScreen === 'welcome' && (
                    <WelcomeScreen onStart={() => setCurrentScreen('quiz')} />
                )}

                {currentScreen === 'quiz' && (
                    <QuizScreen onComplete={() => setCurrentScreen('scratch')} />
                )}

                {currentScreen === 'scratch' && (
                    <ScratchScreen onReveal={() => setCurrentScreen('revealMap')} />
                )}

                {currentScreen === 'revealMap' && (
                    <RevealScreen onRestart={() => setCurrentScreen('welcome')} />
                )}

                <ProgressBar
                    currentStep={getCurrentStep()}
                    totalSteps={TOTAL_STEPS} />
            </div>
        </main>
    )
}

export default App