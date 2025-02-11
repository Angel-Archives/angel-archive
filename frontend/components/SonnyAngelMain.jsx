import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { SonnyAngelCard } from "./SonnyAngelCard";

export function SonnyAngelMain() {
  const [favList, setFavList] = useState(new Set());
  const [isoList, setIsoList] = useState(new Set());
  const [wttList, setWttList] = useState(new Set());

  const handleBookmarkAdd = (type, id, name) => {
    switch (type) {
      case "FAV":
        setFavList((prevList) => {
          const updatedList = new Set(prevList);
          if (updatedList.has(id)) {
            updatedList.delete(id);
          } else {
            updatedList.add(id);
          }
          return updatedList;
        });
        break;
      case "ISO":
        setIsoList((prevList) => {
          const updatedList = new Set(prevList);
          if (updatedList.has(id)) {
            updatedList.delete(id);
          } else {
            updatedList.add(id);
          }
          return updatedList;
        });
        break;
      case "WTT":
        setWttList((prevList) => {
          const updatedList = new Set(prevList);
          if (updatedList.has(id)) {
            updatedList.delete(id);
          } else {
            updatedList.add(id);
          }
          return updatedList;
        });
        break;
      default:
        break;
    }
  };

  // test
  const items = [
    {
      id: 1,
      name: "Tomato",
      imageUrl: "https://www.sonnyangel.com/renewal/wp-content/uploads/2019/10/Tomato.png",
    },
    {
      id: 2,
      name: "Garlic",
      imageUrl: "https://www.sonnyangel.com/renewal/wp-content/uploads/2019/10/Garlic.png",
    },
  ];

  return (
    <Box bgcolor={"lightcoral"} flex={4} p={2}>
      <Typography variant="h4" gutterBottom>
        Cards
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {items.length > 0 ? (
          items.map((item) => (
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
        ) : (
          <Typography variant="body1">Loading images...</Typography>
        )}
      </Grid>

      <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
        Bookmark Lists
      </Typography>

      <div>
        <Typography variant="h6">Favorites</Typography>
        <ul>
          {Array.from(favList).map((id) => (
            <li key={id}>{items.find((item) => item.id === id)?.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <Typography variant="h6">ISO</Typography>
        <ul>
          {Array.from(isoList).map((id) => (
            <li key={id}>{items.find((item) => item.id === id)?.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <Typography variant="h6">WTT</Typography>
        <ul>
          {Array.from(wttList).map((id) => (
            <li key={id}>{items.find((item) => item.id === id)?.name}</li>
          ))}
        </ul>
      </div>
    </Box>
  );
}
