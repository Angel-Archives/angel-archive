import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";

export function NavBarLanding() {
    const navigate = useNavigate();
    const theme = useTheme(); 

    const handleSignUp = () => {
        navigate("/signup");
    };

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <AppBar position="sticky">
            <Toolbar 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    height: '80px' 
                }}
            >
                <Box display="flex" alignItems="center">
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

                <Box 
                    display="flex" 
                    alignItems="center"
                >
                    <Button 
                        color="inherit" 
                        variant="outlined" 
                        sx={{ 
                            fontSize: '1.25rem',
                            height: '48px',
                            padding: '10px 20px',
                            marginLeft: '16px',
                            width: 'auto',
                            // change colors for hover if want to -> prob should, not aesthetically pleasing right now 
                            '&:hover': {
                                backgroundColor: theme.palette.primary.light, 
                                borderColor: theme.palette.primary.dark, 
                            },
                            width: '125px', 
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
                            width: 'auto',
                            // change colors for hover if want to -> prob should, not aesthetically pleasing right now 
                            '&:hover': {
                                backgroundColor: theme.palette.primary.light, 
                                borderColor: theme.palette.primary.dark, 
                            },
                            width: '125px', 
                        }}
                        onClick={handleLogin}
                    >
                        Log In
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
