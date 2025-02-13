import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { SonnyAngelCard } from "./SonnyAngelCard";
import { SearchBar } from "./SearchBar";
import { fetchAngelsBWImages } from "../src/utils/queries";
import supabase from "../config/supabaseClient";

export function SonnyAngelMain({ toggleLeftBar }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const loadImages = async () => {
      const angels = await fetchAngelsBWImages();
      if (angels.length) {
        setImages(
          angels.map((angel) => ({
            id: angel.id,
            name: angel.name,
            imageUrl: `https://axvoarmndarkuqawtqss.supabase.co/storage/v1/object/public/sonny_angel_images/${angel.image_bw}`,
          }))
        );
      }
      setLoading(false);
    };

    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };

    loadImages();
    getUser();
  }, []);

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

  const filteredImages = images.filter((angel) =>
    angel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      bgcolor={"lightcoral"}
      flex={4}
      p={2}
      onClick={() => isMobile && toggleLeftBar()} 
      sx={{ cursor: isMobile ? "pointer" : "default" }} 
    >
      <Typography variant="h4" gutterBottom>
        Cards
      </Typography>
      <SearchBar options={images.map((angel) => angel.name)} onSearch={setSearchTerm} />
      <Grid container spacing={3} justifyContent="center">
        {loading ? (
          <Typography variant="body1">Loading images...</Typography>
        ) : (
          filteredImages.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
              <SonnyAngelCard
                id={item.id}
                name={item.name}
                imageUrl={item.imageUrl}
                userId={userId}
                onBookmarkAdd={handleBookmarkAdd}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
