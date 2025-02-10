import './App.css'
import { Counter } from './Counter'
import { SignUpForm } from './SignUpForm'

function App() {
  return (
    <main>
      <SignUpForm />
      <h1>Counter App</h1>
      <Counter />
    </main>
  )
}

export default App