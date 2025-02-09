// retrieves the correct URLs (for images, but not for the rest)
// fruit series and animal 1 series 

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

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4dm9hcm1uZGFya3VxYXd0cXNzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODQ3OTMwNSwiZXhwIjoyMDU0MDU1MzA1fQ.BE0BkVwMO2qovKBMONqPnCf-5KNbMEmtFARQ8Z-zu0Q";

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or key is missing!");
}

const supabase = createClient(supabaseUrl, supabaseKey);
const imageFolders = ["images", "images_bw", "images_opacity", "images_profile_pic"];

async function getSeriesNames() {
  const imageSeriesNames = fs.readdirSync(path.join(baseDir, "images"));
  return imageSeriesNames.filter((folder) => fs.statSync(path.join(baseDir, "images", folder)).isDirectory());
}

async function insertSeries(seriesName) {
  try {
    const { data: existingSeries, error: existingSeriesError } = await supabase
      .from("series")
      .select("id")
      .eq("name", seriesName);

    if (existingSeriesError) {
      console.log("Error checking existing series:", existingSeriesError.message);
      return null;
    }

    if (existingSeries.length === 0) {
      const { data: newSeries, error: insertSeriesError } = await supabase
        .from("series")
        .insert([{ name: seriesName }])
        .select();

      if (insertSeriesError) {
        console.log("Error inserting series:", insertSeriesError.message);
        return null;
      }

      return newSeries[0].id;
    }

    return existingSeries[0].id;
  } catch (err) {
    console.error("Error in insertSeries:", err.message);
    return null;
  }
}

async function insertAngels() {
  try {
    const seriesNames = await getSeriesNames();

    for (const seriesName of seriesNames) {
      const seriesId = await insertSeries(seriesName);
      if (!seriesId) {
        console.log(`Skipping series: ${seriesName} due to error`);
        continue;
      }

      const angels = [];
      const images = {};

      imageFolders.forEach((folder) => {
        const folderPath = path.join(baseDir, folder, seriesName);
        if (fs.existsSync(folderPath)) {
          const imageFiles = fs.readdirSync(folderPath).filter(file => fs.statSync(path.join(folderPath, file)).isFile());
          images[folder] = imageFiles.map(file => path.join(folder, seriesName, file));
        }
      });

      const imageFiles = images["images"] || [];
      const maxAngelsPerSeries = 12;

      for (let i = 0; i < Math.min(imageFiles.length, maxAngelsPerSeries); i++) {
        const baseName = path.basename(imageFiles[i], ".png");  

        const angelData = {
          name: `${seriesName} - ${baseName}`, 
          series_id: seriesId,
          image: images.images ? images.images[i] : null,
          image_bw: images.images_bw ? images.images_bw[i] : null,
          image_opacity: images.images_opacity ? images.images_opacity[i] : null,
          image_profile_pic: images.images_profile_pic ? images.images_profile_pic[i] : null,
        };

        const { data: angel, error: angelError } = await supabase
          .from("angels")
          .insert([angelData]);

        if (angelError) {
          console.log("Error inserting angel:", angelError.message);
        } else {
          console.log(`Inserted angel: ${angelData.name}`);
        }

        angels.push(angelData);
      }

      console.log(`Processed angels for series: ${seriesName}, Total: ${angels.length}`);
    }
  } catch (err) {
    console.error("Error processing angels:", err.message);
  }
}

// Call the function to insert angels
insertAngels();