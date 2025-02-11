import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LandingPage } from '../pages/LandingPage'
import SignUpPage from '../pages/SignUpPage';
import LoginPage from '../pages/LogInPage';
import { DashboardPage } from '../pages/DashboardPage';

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} /> 
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
    </Router>
  );
}


export default App