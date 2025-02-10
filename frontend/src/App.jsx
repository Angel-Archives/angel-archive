import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Counter } from './Counter'
import { SignUpForm } from '../components/SignUpForm'

function App() {
  return (
    <BrowserRouter>
      <main>
        <SignUpForm />
        <h1>Counter App</h1>
        <Counter />
      </main>
    </BrowserRouter>
  )
}

export default App