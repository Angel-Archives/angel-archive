import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, useMediaQuery, Paper } from "@mui/material";
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

            
                const { data: collections, error: collectionsError } = await supabase
                    .from("user_collections")
                    .select("angels_id, count, is_favorite, in_search_of, willing_to_trade")
                    .eq("users_id", user.id);

                if (collectionsError) {
                    console.error("Error fetching collections:", collectionsError);
                } else {
                    const favoriteAngels = [];
                    const inSearchOfAngels = [];
                    const willingToTradeAngels = [];
                    const allAngels = [];

                    collections.forEach((angel) => {
                        const angelData = {
                            angels_id: angel.angels_id,
                            angels_count: angel.count,
                        };
                        if (angel.is_favorite) favoriteAngels.push(angelData);
                        if (angel.in_search_of) inSearchOfAngels.push(angelData);
                        if (angel.willing_to_trade) willingToTradeAngels.push(angelData);
                        allAngels.push(angelData);
                    });

                    const fetchAngelDetails = async (angels) => {
                        return Promise.all(
                            angels.map(async (angel) => {
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
                                    angel_count: angel.angels_count,
                                };
                            })
                        );
                    };

                    const allAngelsWithDetails = await fetchAngelDetails(allAngels);
                    const favoritesWithDetails = await fetchAngelDetails(favoriteAngels);
                    const inSearchOfWithDetails = await fetchAngelDetails(inSearchOfAngels);
                    const willingToTradeWithDetails = await fetchAngelDetails(willingToTradeAngels);

                    setAngels(allAngelsWithDetails);
                    setFavorites(favoritesWithDetails);
                    setInSearchOf(inSearchOfWithDetails);
                    setWillingToTrade(willingToTradeWithDetails);
                }
            }
            setLoading(false);
        };

        fetchUserAndCollections();
    }, []);  

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleBookmarkAdd = async (type, angelId, angelName) => {
        if (!userId) return;
    
        let updateFields = {
          angels_name: angelName,
        };
    
        switch (type) {
          case "FAV":
            updateFields.is_favorite = true;
            break;
          case "ISO":
            updateFields.in_search_of = true;
            break;
          case "WTT":
            updateFields.willing_to_trade = true;
            break;
          default:
            return;
        }
    
        const { data, error } = await supabase
          .from("user_collections")
          .upsert(
            [
              {
                users_id: userId,
                angels_id: angelId,
                angels_name: angelName,
                ...updateFields,
              },
            ],
            { onConflict: ["users_id", "angels_id"] }
          );
    
        if (error) {
          console.error("Error updating bookmark:", error);
        } else {
          console.log("Bookmark updated successfully:", data);
        }
      };

    return (
        <Box 
            p={2} 
            sx={{
                backgroundImage: "url('/src/assets/AngelArchiveBackground4.jpg')",
                backgroundSize: "100% auto",
                backgroundPosition: "center",
                backgroundRepeat: "repeat",
                padding: "20px", 
            }}
        >
            <Typography 
                variant="h4" 
                gutterBottom 
                sx={{
                    color: "white", 
                    textAlign: "left", 
                    fontWeight: "bold",
                    fontSize: "2.5rem", 
                    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
                    marginBottom: "16px", 
                }}
            >
                Welcome, {username ? username : "User"}!
            </Typography>

            <Paper 
                elevation={6} 
                sx={{
                    padding: { xs: 3, sm: 4 },
                    borderRadius: 4,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    textAlign: "center",
                    backdropFilter: "blur(10px)",
                    marginBottom: "20px", 
                }}
            >
                <Typography
                    variant="h5"  
                    gutterBottom
                    sx={{
                        color: "#111",  
                        textAlign: "left",
                        fontWeight: "600", 
                        lineHeight: 1.6,
                        letterSpacing: "0.5px",  
                        marginBottom: "16px",  
                        paddingBottom: "6px",  
                    }}
                >
                    Here are the angels you've collected:
                </Typography>

    
                <Grid container spacing={3} justifyContent="flex-start">
                    {angels.map((angel) => (
                        <Grid item key={angel.angels_id} xs={6} sm={4} md={3} lg={2}>
                            <SonnyAngelCard
                                id={angel.angels_id}
                                name={angel.angels_name}
                                imageUrl={angel.angels_image_url}
                                userId={userId}
                                onBookmarkAdd={handleBookmarkAdd}
                                initialCount={angel.angel_count} 
                            />
                        </Grid>
                    ))}
                </Grid>

            </Paper>

            <Paper 
                elevation={6} 
                sx={{
                    padding: { xs: 3, sm: 4 },
                    borderRadius: 4,
                    backgroundColor: "#rgba(255, 255, 255, 0.8)",
                    textAlign: "center",
                    backdropFilter: "blur(10px)",
                    marginBottom: "20px", 
                }}
            >
               <Typography
                    variant="h5"  
                    gutterBottom
                    sx={{
                        color: "#111",  
                        textAlign: "left",
                        fontWeight: "600", 
                        lineHeight: 1.6,
                        letterSpacing: "0.5px",  
                        marginBottom: "16px",  
                        paddingBottom: "6px",  
                    }}
                >
                    Your Favorite Angels:
                </Typography>
    
                <Grid container spacing={3} justifyContent="flex-start">
                    {favorites.map((angel) => (
                        <Grid item key={angel.angels_id} xs={6} sm={4} md={3} lg={2}>
                            <SonnyAngelCard
                                id={angel.angels_id}
                                name={angel.angels_name}
                                imageUrl={angel.angels_image_url}
                                userId={userId}
                                onBookmarkAdd={handleBookmarkAdd}
                                initialCount={angel.angel_count}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            
            <Paper 
                elevation={6} 
                sx={{
                    padding: { xs: 3, sm: 4 },
                    borderRadius: 4,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    textAlign: "center",
                    backdropFilter: "blur(10px)",
                    marginBottom: "20px", 
                }}
            >
               <Typography
                    variant="h5"  
                    gutterBottom
                    sx={{
                        color: "#111",  
                        textAlign: "left",
                        fontWeight: "600", 
                        lineHeight: 1.6,
                        letterSpacing: "0.5px",  
                        marginBottom: "16px",  
                        paddingBottom: "6px",  
                    }}
                >
                    Angels You're In Search Of:
                </Typography>
    
                <Grid container spacing={3} justifyContent="flex-start">
                    {inSearchOf.map((angel) => (
                        <Grid item key={angel.angels_id} xs={6} sm={4} md={3} lg={2}>
                            <SonnyAngelCard
                                id={angel.angels_id}
                                name={angel.angels_name}
                                imageUrl={angel.angels_image_url}
                                userId={userId}
                                onBookmarkAdd={handleBookmarkAdd}
                                initialCount={angel.angel_count}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            <Paper 
                elevation={6} 
                sx={{
                    padding: { xs: 3, sm: 4 },
                    borderRadius: 4,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    textAlign: "center",
                    backdropFilter: "blur(10px)",
                    marginBottom: "20px", 
                }}
            >
               <Typography
                    variant="h5"  
                    gutterBottom
                    sx={{
                        color: "#111",  
                        textAlign: "left",
                        fontWeight: "600", 
                        lineHeight: 1.6,
                        letterSpacing: "0.5px",  
                        marginBottom: "16px",  
                        paddingBottom: "6px",  
                    }}
                >
                    Angels You're Willing To Trade:
                </Typography>
                <Grid container spacing={3} justifyContent="flex-start">
                    {willingToTrade.map((angel) => (
                        <Grid item key={angel.angels_id} xs={6} sm={4} md={3} lg={2}>
                            <SonnyAngelCard
                                id={angel.angels_id}
                                name={angel.angels_name}
                                imageUrl={angel.angels_image_url}
                                userId={userId}
                                onBookmarkAdd={handleBookmarkAdd}
                                initialCount={angel.angel_count}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Box>
    );
};
