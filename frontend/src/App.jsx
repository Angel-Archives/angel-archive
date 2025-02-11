import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { LandingPage } from "../pages/LandingPage";  
import SignUpPage from "../pages/SignUpPage";  
import LoginPage from "../pages/LogInPage"; 
import { DashboardPage } from "../pages/DashboardPage";  
import { NavBarDashboard } from "../components/NavBarDashboard";  
import { NavBarLanding } from "../components/NavBarLanding";  

function ProtectedRoute({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/" />;
}

function App() {
    return (
        <Router>
            <AuthProvider>  
                <AuthNav />  
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

function AuthNav() {
    const { user } = useAuth();
    return user ? <NavBarDashboard /> : <NavBarLanding />;
}

export default App;
