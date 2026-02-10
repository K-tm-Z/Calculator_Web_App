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
        </div>
    );
}

export default App
