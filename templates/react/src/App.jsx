import { useState } from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="App">
            <header className="App-header">
                <h1>{{ PROJECT_NAME }}</h1>
                <p className="problem">Problem: {{ PROJECT_PROBLEM }}</p>
                <p className="personas">User Personas: {{ USER_PERSONAS }}</p>

                <div className="card">
                    <button onClick={() => setCount((count) => count + 1)}>
                        count is {count}
                    </button>
                    <p>
                        Edit <code>src/App.jsx</code> and save to test HMR
                    </p>
                </div>

                <p className="read-the-docs">
                    This project follows the BIASED framework
                </p>
            </header>
        </div>
    )
}

export default App
