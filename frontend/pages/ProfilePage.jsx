import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { SonnyAngelCard } from "../components/SonnyAngelCard";
import supabase from "../config/supabaseClient";

export const ProfilePage = () => {
    const [angels, setAngels] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [inSearchOf, setInSearchOf] = useState([]);
    const [willingToTrade, setWillingToTrade] = useState([]);
    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    const isMobile = useMediaQuery("(max-width:600px)");

    useEffect(() => {
        const fetchUserAndCollections = async () => {
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

                const { data: userFavorites, error: favoritesError } = await supabase
                    .from("user_collections")
                    .select("angels_id, count")
                    .eq("users_id", user.id)
                    .eq("is_favorite", true);

                const { data: userInSearchOf, error: inSearchOfError } = await supabase
                    .from("user_collections")
                    .select("angels_id, count")
                    .eq("users_id", user.id)
                    .eq("in_search_of", true);

                const { data: userWillingToTrade, error: willingToTradeError } = await supabase
                    .from("user_collections")
                    .select("angels_id, count")
                    .eq("users_id", user.id)
                    .eq("willing_to_trade", true);

                if (favoritesError || inSearchOfError || willingToTradeError) {
                    console.error("Error fetching collections:", favoritesError || inSearchOfError || willingToTradeError);
                } else {
                    const fetchDetails = async (userAngels) => {
                        return Promise.all(
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
                                    angels_image_url: imageUrl,
                                    angel_count: angel.count,
                                };
                            })
                        );
                    };

                    const favoritesWithDetails = await fetchDetails(userFavorites);
                    const inSearchOfWithDetails = await fetchDetails(userInSearchOf);
                    const willingToTradeWithDetails = await fetchDetails(userWillingToTrade);

                    setFavorites(favoritesWithDetails);
                    setInSearchOf(inSearchOfWithDetails);
                    setWillingToTrade(willingToTradeWithDetails);

                    const { data: userAngels, error: angelsError } = await supabase
                        .from("user_collections")
                        .select("angels_id, count")
                        .eq("users_id", user.id);

                    if (angelsError) {
                        console.error("Error fetching user collections:", angelsError);
                    } else {
                        const angelsWithDetails = await Promise.all(
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
                                    angels_image_url: imageUrl,
                                    angel_count: angel.count,
                                };
                            })
                        );
                        setAngels(angelsWithDetails); 
                    }
                }
            }
            setLoading(false);
        };

        fetchUserAndCollections();
    }, []);  

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box bgcolor={"lightcoral"} flex={4} p={2}>
            <Typography variant="h4" gutterBottom>
                Welcome, {username ? username : "User"}!
            </Typography>
            <Typography variant="h6" gutterBottom>
                Here are the angels you've collected:
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {angels.map((angel) => (
                    <Grid item key={angel.angels_id} xs={12} sm={6} md={4} lg={3}>
                        <SonnyAngelCard
                            id={angel.angels_id}
                            name={angel.angels_name}
                            imageUrl={angel.angels_image_url}
                            userId={userId}
                            initialCount={angel.angel_count} 
                        />
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h6" gutterBottom>
                Your Favorite Angels:
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {favorites.map((angel) => (
                    <Grid item key={angel.angels_id} xs={12} sm={6} md={4} lg={3}>
                        <SonnyAngelCard
                            id={angel.angels_id}
                            name={angel.angels_name}
                            imageUrl={angel.angels_image_url}
                            userId={userId}
                            initialCount={angel.angel_count}
                        />
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h6" gutterBottom>
                Angels You're In Search Of:
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {inSearchOf.map((angel) => (
                    <Grid item key={angel.angels_id} xs={12} sm={6} md={4} lg={3}>
                        <SonnyAngelCard
                            id={angel.angels_id}
                            name={angel.angels_name}
                            imageUrl={angel.angels_image_url}
                            userId={userId}
                            initialCount={angel.angel_count}
                        />
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h6" gutterBottom>
                Angels You're Willing to Trade:
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {willingToTrade.map((angel) => (
                    <Grid item key={angel.angels_id} xs={12} sm={6} md={4} lg={3}>
                        <SonnyAngelCard
                            id={angel.angels_id}
                            name={angel.angels_name}
                            imageUrl={angel.angels_image_url}
                            userId={userId}
                            initialCount={angel.angel_count}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProfilePage;
