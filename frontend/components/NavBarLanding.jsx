import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export function NavBarLanding() {
    const navigate = useNavigate();
    const theme = useTheme();
    const { user } = useAuth();

    const handleSignUp = () => {
        navigate("/signup");
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogoClick = () => {
        if (user) {
            navigate("/dashboard");
        } else {
            navigate("/");
        }
    };

    return (
        <AppBar position="sticky">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', height: '80px' }}>
                <Box display="flex" alignItems="center" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
                    <img
                        src="../src/assets/AngelArchiveLogo.png"
                        alt="Angel Archive Logo"
                        style={{ width: "73px", height: "80px", marginRight: "12px", objectFit: "contain" }}
                    />
                    <Typography
                        variant="h6"
                        sx={{ fontSize: "1.875rem", fontWeight: "bold", display: "flex", alignItems: "center" }}
                    >
                        Angel Archive
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center">
                    {user ? (
                        <Button
                            color="inherit"
                            variant="outlined"
                            sx={{
                                fontSize: '1.25rem',
                                height: '48px',
                                padding: '10px 20px',
                                marginLeft: '16px',
                                width: '125px',
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.light,
                                    borderColor: theme.palette.primary.dark,
                                },
                            }}
                            onClick={() => navigate("/dashboard")} 
                        >
                            Go to Dashboard
                        </Button>
                    ) : (
                        <>
                            <Button
                                color="inherit"
                                variant="outlined"
                                sx={{
                                    fontSize: '1.25rem',
                                    height: '48px',
                                    padding: '10px 20px',
                                    marginLeft: '16px',
                                    width: '125px',
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.light,
                                        borderColor: theme.palette.primary.dark,
                                    },
                                }}
                                onClick={handleSignUp}
                            >
                                Sign Up
                            </Button>
                            <Button
                                color="inherit"
                                variant="outlined"
                                sx={{
                                    fontSize: '1.25rem',
                                    height: '48px',
                                    padding: '10px 20px',
                                    marginLeft: '16px',
                                    width: '125px',
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.light,
                                        borderColor: theme.palette.primary.dark,
                                    },
                                }}
                                onClick={handleLogin}
                            >
                                Log In
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
