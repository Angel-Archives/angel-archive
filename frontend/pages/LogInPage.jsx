import React from "react";
import { LoginForm } from "../components/LogInForm";
import { Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            flexDirection="column"
        >
            <Typography variant="h3" gutterBottom>
                Log In to Your Account
            </Typography>

            <LoginForm />

            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Don't have an account?{" "}
                <Link 
                component="button" 
                variant="body1" 
                onClick={() => navigate("/signup")} 
                sx={{ color: "primary.main", fontWeight: "bold" }}
        >
                Sign up!
                </Link>
            </Typography>
        </Box>
  );
}
