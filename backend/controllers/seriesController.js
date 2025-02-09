import { supabase } from "../config/supabaseClient.js";

export const getAllSeries = async (req, res) => {
    const { data, error } = await supabase.from("series").select("*");
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};

export const getSeriesById = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from("series").select("*").eq("id", id).single();
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};
