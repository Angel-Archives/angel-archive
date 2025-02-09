import { supabase } from "../config/supabaseClient.js";

export const getAllAngels = async (req, res) => {
    const { data, error } = await supabase.from("angels").select("*");
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};

export const getAngelById = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from("angels").select("*").eq("id", id).single();
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};

export const getAngelsBySeries = async (req, res) => {
    const { series_id } = req.params;
    const { data, error } = await supabase.from("angels").select("*").eq("series", series_id);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};
