import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { SonnyAngelCard } from "../components/SonnyAngelCard";
import supabase from "../config/supabaseClient";

export const ProfilePage = () => {
    const [angels, setAngels] = useState([]);
    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    const isMobile = useMediaQuery("(max-width:600px)");

    useEffect(() => {
        const fetchUserAndAngels = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserId(user.id);
                const { data, error } = await supabase
                    .from("users")
                    .select("username")
                    .eq("id", user.id)
                    .single();  

                if (error) {
                    console.error("Error fetching username:", error);
                } else {
                    setUsername(data?.username);  
                }

                const { data: userAngels, error: angelsError } = await supabase
                    .from("user_collections")
                    .select("angels_id, angels_name")
                    .eq("users_id", user.id);

                if (angelsError) {
                    console.error("Error fetching user collections:", angelsError);
                } else {
                    setAngels(userAngels); 
                }
            }
            setLoading(false);
        };

        fetchUserAndAngels();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box
            bgcolor={"lightcoral"}
            flex={4}
            p={2}
            onClick={() => isMobile && toggleLeftBar()}
            sx={{ cursor: isMobile ? "pointer" : "default" }}
        >
            <Typography variant="h4" gutterBottom>
                Welcome, {username ? username : "User"}!
            </Typography>
            <Typography variant="h6" gutterBottom>
                Here are the angels you've collected:
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {angels.length === 0 ? (
                    <Typography variant="body1">You haven't collected any angels yet.</Typography>
                ) : (
                    angels.map((angel) => (
                        <Grid item key={angel.angels_id} xs={12} sm={6} md={4} lg={3}>
                            <SonnyAngelCard
                                id={angel.angels_id}
                                name={angel.angels_name}
                                userId={userId}
                            />
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
};

export default ProfilePage;
