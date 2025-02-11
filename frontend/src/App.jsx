import "./App.css"
import { BrowserRouter } from "react-router-dom"
// import { Counter } from "../components/Counter"
import { SignUpForm } from "../components/SignUpForm"
import { LoginForm } from "../components/LogInForm"

function App() {
  return (
    <BrowserRouter>
      <main>
        {/* put in sign up page */}
        <SignUpForm /> 

        {/* put in log in page */}
        <LoginForm />

        {/* <h1>Counter App</h1>
        <Counter /> */}
      </main>
    </BrowserRouter>
  )
}

export default App