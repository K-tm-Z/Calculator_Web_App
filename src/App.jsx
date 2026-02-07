import './App.css'
import { Calculator } from './components/calculator/ui/Calculator'

function App() {

  return (
    <div style={{ 
            maxWidth: '400px', 
            margin: '50px auto', 
            padding: '20px', 
            border: '1px solid #ccc',
            borderRadius: '8px'
        }}>
            <h2 style={{ textAlign: 'center' }}>Calculator Playground</h2>
            <Calculator />
            <div style={{ marginTop: '30px', fontSize: '0.9em', color: '#666' }}>
                <h3>Keyboard Shortcuts:</h3>
                <ul>
                    <li>Numbers & Operators: Type directly</li>
                    <li>Backspace: Delete character</li>
                    <li>Enter: Evaluate</li>
                    <li>Escape: Clear</li>
                    <li>Arrow keys: Move cursor</li>
                    <li>Home/End: Jump to start/end</li>
                </ul>
            </div>
        </div>
    );
}

export default App
