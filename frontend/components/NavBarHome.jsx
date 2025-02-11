import React, { useState } from "react";
import { AppBar, Toolbar, Typography, InputBase, Avatar, Box, Menu, MenuItem, IconButton, Button } from "@mui/material";
import ApiIcon from '@mui/icons-material/Api';

const sectionStyle = {
    display: "flex",
    alignItems: "center",
};

const buttonStyle = {
    fontSize: "1rem",
    height: "48px",
    padding: "10px 20px",
    marginLeft: "16px",
};

export function NavBarHome() {
    const [anchorEl, setAnchorEl] = useState(null);
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
                {/* Left Section: Icon + Title */}
                <Box sx={{ ...sectionStyle, display: "flex" }}>
                    <ApiIcon sx={{ marginRight: "12px", fontSize: "3rem" }} />
                    <Typography variant="h6" sx={{ fontSize: "1.875rem", fontWeight: "bold" }}>
                        NavBarHome
                    </Typography>
                </Box>

                {/* Center Section: Search Bar */}
                <Box sx={{ ...sectionStyle }}>
                    <InputBase
                        placeholder="Search..."
                        aria-label="search"
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "4px",
                            padding: "0 15px",
                            width: "40%",
                            fontSize: "1rem",
                        }}
                    />
                </Box>

                {/* Right Section: Avatar with Menu */}
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
