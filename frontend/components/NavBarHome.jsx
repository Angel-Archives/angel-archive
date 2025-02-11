import React, { useState } from "react";
import { AppBar, Toolbar, Typography, InputBase, Avatar, Box, Menu, MenuItem, IconButton } from "@mui/material";
import ApiIcon from '@mui/icons-material/Api';

const sectionStyle = {
    display: "flex",
    alignItems: "center",
};

export function NavBarHome() {
    const [anchorEl, setAnchorEl] = useState(null); // used for dropdown menu
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <AppBar position="sticky">
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: { xs: "0 20px", sm: "0 40px" },  
                    height: { xs: "auto", sm: "80px" },       
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
                
                <Box sx={{ ...sectionStyle }}>
                    <IconButton onClick={handleMenuOpen}>
                        <Avatar
                            src="/images_profile_pic/Animal_1_2018_Series/circular_Cheetah.png"
                            alt="Profile"
                            loading="lazy"
                            sx={{ width: "60px", height: "60px" }}
                        />
                    </IconButton>

                    <Menu
                        id="profile-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Settings</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
