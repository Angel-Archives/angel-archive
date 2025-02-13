import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, useMediaQuery, Paper } from "@mui/material";
import { SonnyAngelCard } from "../components/SonnyAngelCard";
import { SearchBar } from "../components/SearchBar";  // Import SearchBar
import supabase from "../config/supabaseClient";

export const ProfilePage = () => {
    const [angels, setAngels] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [inSearchOf, setInSearchOf] = useState([]);
    const [willingToTrade, setWillingToTrade] = useState([]);
    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");  // Add state for search input

    const isMobile = useMediaQuery("(max-width:600px)");

    const angelCategoryStyles = {
        padding: { xs: 3, sm: 4 },
        borderRadius: 4,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        textAlign: "center",
        backdropFilter: "blur(10px)",
        marginBottom: "20px",
    };

    const angelTypographyStyles = {
        color: "#111",
        textAlign: "left",
        fontWeight: "600",
        lineHeight: 1.6,
        letterSpacing: "0.5px",
        marginBottom: "16px",
        paddingBottom: "6px",
    };

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
                    const categories = {
                        favorites: [],
                        inSearchOf: [],
                        willingToTrade: [],
                        allAngels: [],
                    };

                    collections.forEach((angel) => {
                        const angelData = { angels_id: angel.angels_id, angels_count: angel.count };
                        if (angel.is_favorite) categories.favorites.push(angelData);
                        if (angel.in_search_of) categories.inSearchOf.push(angelData);
                        if (angel.willing_to_trade) categories.willingToTrade.push(angelData);
                        categories.allAngels.push(angelData);
                    });

                    setAngels(await fetchAngelDetails(categories.allAngels));
                    setFavorites(await fetchAngelDetails(categories.favorites));
                    setInSearchOf(await fetchAngelDetails(categories.inSearchOf));
                    setWillingToTrade(await fetchAngelDetails(categories.willingToTrade));
                }
            }
            setLoading(false);
        };

        fetchUserAndCollections();
    }, []);

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm.toLowerCase());
    };

    const filterAngels = (angels) => {
        return angels.filter((angel) =>
            angel.angels_name.toLowerCase().includes(searchTerm)
        );
    };

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

    const renderCategory = (title, category) => {
        if (category.length === 0) return null;

        const filteredAngels = filterAngels(category); // Filter angels for the category

        if (filteredAngels.length === 0) return null; // If no angels match the search, don't render the section

        return (
            <Paper elevation={6} sx={angelCategoryStyles}>
                <Typography variant="h5" gutterBottom sx={angelTypographyStyles}>
                    {title}
                </Typography>
                <Grid container spacing={3} justifyContent="flex-start">
                    {filteredAngels.map((angel) => (
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
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box p={2} sx={{ backgroundImage: "url('/src/assets/AngelArchiveBackground4.jpg')", 
            backgroundSize: "100% auto", 
            backgroundPosition: "center", 
            backgroundRepeat: "repeat",
            padding: "20px",
            minHeight: "100vh" }}>
            <Typography variant="h4" gutterBottom sx={{ color: "white", textAlign: "left", fontWeight: "bold", fontSize: "2.5rem", textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)", marginBottom: "16px" }}>
                Welcome, {username ? username : "User"}!
            </Typography>

            <SearchBar options={[]} onSearch={handleSearch} />  {/* Search Bar here */}

            {renderCategory("Here are the angels you've collected:", angels)}
            {renderCategory("Your Favorite Angels:", favorites)}
            {renderCategory("Angels You're In Search Of:", inSearchOf)}
            {renderCategory("Angels You're Willing To Trade:", willingToTrade)}
        </Box>
    );
};
