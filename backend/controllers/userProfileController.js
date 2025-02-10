import { supabase } from "../config/supabaseClient.js";

// editted

export const getUserStats = async (req, res) => {
	const { user_id } = req.params;

	const { data, error } = await supabase
		.from("user_collections")
		.select("count")
		.eq("user_id", user_id);

	if (error) return res.status(400).json({ error: error.message });

	const totalCollected = data.reduce((sum, item) => sum + item.count, 0);

	res.json({ totalCollected });
};

export const getUserOwnedAngels = async (req, res) => {
	const { user_id } = req.params;

	const { data, error } = await supabase
		.from("user_collections")
		.select("*, angels(name, series, image_url)")
		.eq("user_id", user_id)
		.gt("count", 0);

	if (error) return res.status(400).json({ error: error.message });

	res.json(data);
};

// // mock geolocation for now
// export const getUsersNearYou = async (req, res) => {
//     const { data, error } = await supabase
//         .from("users")
//         .select("id, username, profile_pic");

//     if (error) return res.status(400).json({ error: error.message });

//     res.json(data);
// };

export const updateProfilePicture = async (req, res) => {
	const { imageId } = req.body;
	const { user_id } = req.user; // Ensure user_id is extracted correctly

	try {
		const { data, error } = await supabase
			.from("users")
			.update({ image_profile_pic: imageId })
			.eq("id", user_id)
			.select(); // Return updated user data

		if (error) {
			throw error;
		}

		res.json({ success: true, user: data });
	} catch (error) {
		console.error("Error updating profile pictures:", error);
		res.status(400).json({ error: error.message });
	}
};
