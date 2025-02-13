
import { SonnyAngelMain } from "../components/SonnyAngelMain";
import { Box } from "@mui/material";

export function DashboardPage() {

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Box
        sx={{
          flexGrow: 1,
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
        <SonnyAngelMain />
      </Box>
    </Box>
  );
}
