import { useState } from 'react'

import WelcomeScreen from './screens/WelcomeScreen'
import QuizScreen from './screens/QuizScreen'
import ScratchScreen from './screens/ScratchScreen'
import RevealScreen from './screens/RevealScreen'

type Screen = 'welcome' | 'quiz' | 'scratch' | 'revealMap'

function App() {
    const [currentScreen, setCurrentScreen] = useState<Screen>('welcome')

    return (
        <main className="app">
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
        </main>
    )
}

export default App