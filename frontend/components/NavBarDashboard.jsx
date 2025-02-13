import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import { LogoutButton } from "./LogOutButton";
import supabase from "../config/supabaseClient";

const sectionStyle = {
    display: "flex",
    alignItems: "center",
};

export function NavBarDashboard() {
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [profilePic, setProfilePic] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        const fetchProfilePic = async () => {
            if (!user?.id) return;

            try {
                console.log("Fetching profile pic for user ID:", user.id);

                const { data, error } = await supabase
                    .from("users") 
                    .select("profile_pic")
                    .eq("id", user.id)
                    .single(); 

                if (error) {
                    console.error("Error fetching profile pic:", error.message);
                } else {
                    console.log("Fetched profile pic:", data?.profile_pic);
                    setProfilePic(data?.profile_pic);
                }
            } catch (err) {
                console.error("Unexpected error:", err);
            }
        };

        fetchProfilePic();
    }, [user]);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleLogoClick = () => {
        navigate(user ? "/dashboard" : "/");
    };

    return (
        <AppBar position="sticky">
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: { xs: "auto", sm: "80px" },
                }}
            >
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
                
                <Box sx={{ ...sectionStyle }}>
                    <IconButton onClick={handleMenuOpen}>
                        <Avatar
                            src={profilePic || "/default-profile.png"} 
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
                        <MenuItem onClick={() => { 
                            handleClose(); 
                            navigate("/profile"); 
                        }}>
                            Profile
                        </MenuItem>                        
                        {/* <MenuItem onClick={handleClose}>Settings</MenuItem> */}
                        <MenuItem onClick={signOut}>
                            Log Out
                            {/* <LogoutButton /> */}
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

// import React from "react";
// import { useAuth } from "../context/AuthContext";

// export function LogoutButton() {
//     const { signOut } = useAuth();

//     return <button onClick={signOut}>Logout</button>;
// }
