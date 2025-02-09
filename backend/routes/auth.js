// old, refactor -> also need to include profile pic for users (maybe location for nearby users?)

import express from "express";
import supabase from "../supabaseClient.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Auth routes are working");
});

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
});

router.post("/logout", async (req, res) => {
    const { error } = await supabase.auth.signOut();

    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ message: "Logged out successfully" });
});

export default router;