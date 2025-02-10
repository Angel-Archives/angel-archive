// edit based on routes

//editted

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import dataRoutes from "./routes/data.js";
import angelsRoutes from "./routes/angels.js";
import seriesRoutes from "./routes/series.js";
import userCollectionsRoutes from "./routes/userCollections.js";
import userProfileRoutes from "./routes/userProfile.js";

dotenv.config();

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/data", dataRoutes);
app.use("/angels", angelsRoutes);
// app.use("/series/", seriesRoutes);
// app.use("/userCollections", userCollectionsRoutes);
// app.use("/userProfiles", userProfileRoutes);

app.get("/", (req, res) => {
	res.send("Welcome to the API");
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
