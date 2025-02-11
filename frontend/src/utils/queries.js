import supabase from "../../config/supabaseClient";

export async function fetchAngelsImages() {
    const { data, error } = await supabase
        .from("angels") 
        .select("id, name, image_profile_pic");  

    if (error) {
        console.error("Error fetching angels data:", error);
        return [];
    }
    return data;  
}

export const createUserInDatabase = async (userData) => {
  const { data, error } = await supabase.from("users").insert([userData]);
  if (error) {
    console.error("Error inserting user into database:", error);
    return null;
  }
  return data;
};
