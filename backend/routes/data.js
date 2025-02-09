// old, refactor to fit need -> match RESTful convention 

import express from "express";
import supabase from "../supabaseClient.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Data routes are working");
});

router.get("/angels", async (req, res) => {
    const { data, error } = await supabase.from("angels").select("*");
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
});

router.post("/user/:userId/collection", async (req, res) => {
    const { userId } = req.params;
    const { angelId, count, status } = req.body;

    const { data, error } = await supabase.from("user_collection")
        .upsert([{ user_id: userId, angel_id: angelId, count, status }]);

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
});

router.delete("/user/:userId/collection/:angelId", async (req, res) => {
    const { userId, angelId } = req.params;

    const { data, error } = await supabase.from("user_collection")
        .delete()
        .match({ user_id: userId, angel_id: angelId });

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
});

router.post("/user/:userId/in-search", async (req, res) => {
    const { userId } = req.params;
    const { angelId } = req.body;

    const { data, error } = await supabase.from("in_search")
        .upsert([{ user_id: userId, angel_id: angelId }]);

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
});

router.post("/user/:userId/willing-to-trade", async (req, res) => {
    const { userId } = req.params;
    const { angelId } = req.body;

    const { data, error } = await supabase.from("willing_to_trade")
        .upsert([{ user_id: userId, angel_id: angelId }]);

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
});

router.delete("/user/:userId/in-search/:angelId", async (req, res) => {
    const { userId, angelId } = req.params;

    const { data, error } = await supabase.from("in_search")
        .delete()
        .match({ user_id: userId, angel_id: angelId });

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
});

router.delete("/user/:userId/willing-to-trade/:angelId", async (req, res) => {
    const { userId, angelId } = req.params;

    const { data, error } = await supabase.from("willing_to_trade")
        .delete()
        .match({ user_id: userId, angel_id: angelId });

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
});

export default router;