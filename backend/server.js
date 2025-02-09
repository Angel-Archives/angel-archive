// edit based on routes 

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import dataRoutes from "./routes/data.js"

dotenv.config();

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use('/api/data', dataRoutes);


app.get("/", (req, res) => {
  res.send("Welcome to the API");
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


