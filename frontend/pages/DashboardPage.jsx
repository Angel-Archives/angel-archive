import { useState, useEffect } from "react";
import { LeftBar } from "../components/LeftBar";
import { SonnyAngelMain } from "../components/SonnyAngelMain";
import { Box } from "@mui/material";

export function DashboardPage() {
  const [isLeftBarOpen, setIsLeftBarOpen] = useState(true); 

  const toggleLeftBar = () => {
    setIsLeftBarOpen((prev) => !prev);
  };

  useEffect(() => {
    console.log("isLeftBarOpen state:", isLeftBarOpen)
  }, [isLeftBarOpen]);

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Box
        sx={{
          width: { xs: isLeftBarOpen ? "250px" : "0px", sm: "250px" },
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 80,
          backgroundColor: "lightgray",
          overflowY: "auto",
          transition: "width 0.3s ease-in-out",
          zIndex: 100, 
        }}
      >
        {isLeftBarOpen && <LeftBar />}
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          marginLeft: { xs: isLeftBarOpen ? "250px" : "0px", sm: "250px" },
          height: "100vh",
          overflowY: "auto",
          padding: 2,
          // backgroundColor: "lightcoral",

          backgroundImage: "url('/src/assets/AngelArchiveBackground4.jpg')",
          backgroundSize: "100% auto",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
          padding: "20px", 
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        <SonnyAngelMain toggleLeftBar={toggleLeftBar} />
      </Box>
    </Box>
  );
}
