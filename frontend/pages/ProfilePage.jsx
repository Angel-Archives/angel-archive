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
                    .select("angels_id")  
                    .eq("users_id", user.id);

                if (angelsError) {
                    console.error("Error fetching user collections:", angelsError);
                } else {
                    const angelsWithImages = await Promise.all(
                        userAngels.map(async (angel) => {
                            const { data: angelDetails, error: angelDetailsError } = await supabase
                                .from("angels")
                                .select("name, image")  
                                .eq("id", angel.angels_id)  
                                .single();

                            if (angelDetailsError) {
                                console.error("Error fetching angel details:", angelDetailsError);
                            }

                            const imageUrl = `https://axvoarmndarkuqawtqss.supabase.co/storage/v1/object/public/sonny_angel_images/${angelDetails?.image}`;

                            return {
                                angels_id: angel.angels_id,
                                angels_name: angelDetails?.name,
                                angels_image_url: imageUrl  
                            };
                        })
                    );
                    setAngels(angelsWithImages);
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
                                imageUrl={angel.angels_image_url}  // Pass full image URL to the card
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
