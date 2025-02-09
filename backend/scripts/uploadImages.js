import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseDir = path.join(__dirname, "..", "scraper");

// figure out why SUPABASE_SERVICE_ROLE_KEY is undefined
// hard-coded so can upload to supabase storage 
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4dm9hcm1uZGFya3VxYXd0cXNzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODQ3OTMwNSwiZXhwIjoyMDU0MDU1MzA1fQ.BE0BkVwMO2qovKBMONqPnCf-5KNbMEmtFARQ8Z-zu0Q";

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or key is missing!");
}

const supabase = createClient(supabaseUrl, supabaseKey);

const uploadImage = async (imagePath, imageName, bucket) => {
  try {
    const file = fs.readFileSync(imagePath);
    const { data, error } = await supabase.storage.from(bucket).upload(imageName, file);

    if (error) {
      console.error("Error uploading image:", error.message);
      return null;
    }

    console.log(`Successfully uploaded: ${imageName}`);
    return data;
  } catch (err) {
    console.error("Error in uploadImage:", err.message);
    return null;
  }
};

const uploadImages = async () => {
  try {
    const imageDirectories = ["images", "images_bw", "images_opacity", "images_profile_pic"];
    const bucket = "sonny_angel_images"; 

    for (const dir of imageDirectories) {
      const dirPath = path.join(baseDir, dir); 

      const seriesFolders = fs.readdirSync(dirPath);

      for (const seriesFolder of seriesFolders) {
        const seriesPath = path.join(dirPath, seriesFolder);

        if (fs.statSync(seriesPath).isDirectory()) {
          const files = fs.readdirSync(seriesPath);

          for (const file of files) {
            const filePath = path.join(seriesPath, file);
            const fileName = `${dir}/${seriesFolder}/${file}`; 

            await uploadImage(filePath, fileName, bucket);
          }
        }
      }
    }
  } catch (err) {
    console.error("Error in uploadImages:", err.message);
  }
};

uploadImages().then(() => {
  console.log("Image upload process completed.");
});

