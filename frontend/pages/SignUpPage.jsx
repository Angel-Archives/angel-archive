import React from "react";
import { SignUpForm } from "../components/SignUpForm";
import { Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
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
                Create an Account
            </Typography>
            <SignUpForm />

            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Already have an account?{" "}
                <Link 
                component="button" 
                variant="body1" 
                onClick={() => navigate("/login")} 
                sx={{ color: "primary.main", fontWeight: "bold" }}
                >
                Log in!
                </Link>
            </Typography>
        </Box>
    );
}
