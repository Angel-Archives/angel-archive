import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { SonnyAngelCard } from "./SonnyAngelCard";
import { fetchAngelsBWImages } from "../src/utils/queries";

export function SonnyAngelMain() {
  const [images, setImages] = useState([]);  
  const [loading, setLoading] = useState(true); 
  const [favList, setFavList] = useState(new Set());
  const [isoList, setIsoList] = useState(new Set());
  const [wttList, setWttList] = useState(new Set());

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
    loadImages();
  }, []);
  

  const handleBookmarkAdd = (type, id, name) => {
    const updateList = (prevList) => {
      const updatedList = new Set(prevList);
      updatedList.has(id) ? updatedList.delete(id) : updatedList.add(id);
      return updatedList;
    };

    if (type === "FAV") setFavList(updateList);
    if (type === "ISO") setIsoList(updateList);
    if (type === "WTT") setWttList(updateList);
  };

  return (
    <Box bgcolor={"lightcoral"} flex={4} p={2}>
      <Typography variant="h4" gutterBottom>
        Cards
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {loading ? (
          <Typography variant="body1">Loading images...</Typography>
        ) : (
          images.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
              <SonnyAngelCard
                id={item.id}
                name={item.name}
                imageUrl={item.imageUrl}
                onBookmarkAdd={handleBookmarkAdd}
                favList={favList}
                isoList={isoList}
                wttList={wttList}
              />
            </Grid>
          ))
        )}
      </Grid>

      <Typography variant="h4" gutterBottom style={{ marginTop: "20px" }}>
        Bookmark Lists
      </Typography>

      {[
        { title: "Favorites", list: favList },
        { title: "ISO", list: isoList },
        { title: "WTT", list: wttList },
      ].map(({ title, list }) => (
        <div key={title}>
          <Typography variant="h6">{title}</Typography>
          <ul>
            {Array.from(list).map((id) => (
              <li key={id}>{images.find((item) => item.id === id)?.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </Box>
  );
}
