import supabase from "../config/supabaseClient.js";

export const getUserCollection = async (req, res) => {
    const { user_id } = req.params;

    const { data: allAngels, error: angelError } = await supabase
        .from("angels")
        .select("*");

    if (angelError) return res.status(400).json({ error: angelError.message });

    const { data: userCollection, error: collectionError } = await supabase
        .from("user_collections")
        .select("*")
        .eq("user_id", user_id);

    if (collectionError) return res.status(400).json({ error: collectionError.message });

    const fullInventory = allAngels.map(angel => {
        const userAngel = userCollection.find(item => item.sonny_angel_id === angel.id);
        return {
            ...angel,
            count: userAngel ? userAngel.count : 0,
            is_favorite: userAngel ? userAngel.is_favorite : false,
            in_search_of: userAngel ? userAngel.in_search_of : false,
            willing_to_trade: userAngel ? userAngel.willing_to_trade : false
        };
    });

    res.json(fullInventory);
};

export const updateUserCollection = async (req, res) => {
    const { user_id, angel_id } = req.params;
    const { count, is_favorite, in_search_of, willing_to_trade } = req.body;

    const { data, error } = await supabase
        .from("user_collections")
        .update({ count, is_favorite, in_search_of, willing_to_trade })
        .match({ user_id, sonny_angel_id: angel_id });

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};

export const filterUserCollection = async (req, res) => {
    const { user_id } = req.params;
    const { is_favorite, in_search_of, willing_to_trade } = req.query;

    const { data, error } = await getUserCollection(req, res);
    if (error) return res.status(400).json({ error: error.message });

    let filteredData = data;

    if (is_favorite) {
        filteredData = filteredData.filter(angel => angel.is_favorite === true);
    }
    if (in_search_of) {
        filteredData = filteredData.filter(angel => angel.in_search_of === true);
    }
    if (willing_to_trade) {
        filteredData = filteredData.filter(angel => angel.willing_to_trade === true);
    }

    if (!is_favorite && !in_search_of && !willing_to_trade) {
        filteredData = filteredData.filter(angel => angel.count > 0); 
    }

    res.json(filteredData);
};


export const searchUserCollection = async (req, res) => {
    const { user_id } = req.params;
    const { query } = req.query;

    const { data, error } = await supabase
        .from("user_collections")
        .select("*, angels(name, series, image_url)")
        .ilike("angels.name", `%${query}%`)
        .eq("user_id", user_id);

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};
