import supabase from "../../config/supabaseClient";

export async function fetchAngelsProfileImages() {
    const { data, error } = await supabase
        .from("angels") 
        .select("id, name, image_profile_pic");  

    if (error) {
        console.error("Error fetching angels data:", error);
        return [];
    }
    return data.sort((a, b) => a.name.localeCompare(b.name));
}

export async function fetchAngelsBWImages() {
  const { data, error } = await supabase
      .from("angels") 
      .select("id, name, image_bw");  
  if (error) {
      console.error("Error fetching angel images:", error);
      return [];
  }

  const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));

  return sortedData.map(angel => ({
      id: angel.id,
      name: angel.name,
      image_bw: angel.image_bw,
  }));
}

export const createUserInDatabase = async (userData) => {
  const { data, error } = await supabase.from("users").insert([userData]);
  if (error) {
    console.error("Error inserting user into database:", error);
    return null;
  }
  return data;
};
