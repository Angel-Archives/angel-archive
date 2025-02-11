import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import ApiIcon from '@mui/icons-material/Api';

export function NavBarLanding() {
    return (
        <AppBar position="sticky">
            <Toolbar 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    padding: { sm: '0 40px' }, 
                    height: '80px' 
                }}
            >

                {/* Left Section: Icon + Title */}
                <Box 
                    display="flex" 
                    alignItems="center"
                >
                    <ApiIcon sx={{ marginRight: "12px", fontSize: "3rem" }} />
                    <Typography 
                        variant="h6" 
                        sx={{ fontSize: "1.875rem", fontWeight: "bold" }}
                    >
                        NavBarLanding
                    </Typography>
                </Box>

                {/* Right Section: Log In and Sign Up Buttons */}
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
                            width: 'auto'
                        }}
                    >
                        Log In
                    </Button>
                    <Button 
                        color="inherit" 
                        variant="outlined" 
                        sx={{ 
                            fontSize: '1.25rem',
                            height: '48px',
                            padding: '10px 20px',
                            marginLeft: '16px',
                            width: 'auto'
                        }}
                    >
                        Sign Up
                    </Button>
                </Box>

            </Toolbar>
        </AppBar>
    );
}
