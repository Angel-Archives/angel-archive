import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LandingPage } from '../pages/LandingPage'
import SignUpPage from '../pages/SignUpPage';
import LoginPage from '../pages/LogInPage';

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} /> 
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </Router>
  );
}


export default App