import os 
import requests
from bs4 import BeautifulSoup

def download_series_images(series_url, series_name, section_id):
    save_directory = f"images/{series_name}_Series/"
    os.makedirs(save_directory, exist_ok=True) 

    response = requests.get(series_url)
    soup = BeautifulSoup(response.text, "html.parser")

    series_section = soup.find("div", id=section_id)

    if not series_section:
        print(f"Could not find section with id {section_id} for {series_name}.")
        return

    gallery_items = series_section.find_all("a", class_="fg-thumb")

    for item in gallery_items:
        image_url = item.get("href")

        caption_title = item.get("data-caption-title")

        safe_title = caption_title.replace(" ", "_").replace("/", "_")

        image_response = requests.get(image_url)

        image_filename = f"{safe_title}.png"
        image_path = os.path.join(save_directory, image_filename)

        # save the image -> wb -> write/binary mode 
        with open(image_path, "wb") as f: # 
            f.write(image_response.content)

        print(f"Saved: {image_path}")

series_url = "https://www.sonnyangel.com/en/products/"

vegetable_section_id = "foogallery-gallery-4008"
flower_section_id = "foogallery-gallery-3994"
marine_section_id = "foogallery-gallery-3703"
fruit_section_id = "foogallery-gallery-3702"
animal_1_section_id = "foogallery-gallery-166"
animal_2_section_id = "foogallery-gallery-529"
animal_3_section_id = "foogallery-gallery-531"
animal_4_section_id = "foogallery-gallery-557"
sweets_section_id = "foogallery-gallery-739"
animal_1_2018_section_id = "foogallery-gallery-1764"
animal_2_2018_section_id = "foogallery-gallery-1780"
animal_3_2018_section_id = "foogallery-gallery-1796"
animal_4_2018_section_id = "foogallery-gallery-1812"
sweets_2018_section_id = "foogallery-gallery-1917"
marine_2019_section_id = "foogallery-gallery-1853"
vegetable_2019_section_id = "foogallery-gallery-1869"
fruit_2019_section_id = "foogallery-gallery-1885"
flower_2019_section_id = "foogallery-gallery-1901"

download_series_images(series_url, "Vegetable", vegetable_section_id)
download_series_images(series_url, "Flower", flower_section_id)
download_series_images(series_url, "Marine", marine_section_id)
download_series_images(series_url, "Fruit", fruit_section_id)
download_series_images(series_url, "Animal_1", animal_1_section_id)
download_series_images(series_url, "Animal_2", animal_2_section_id)
download_series_images(series_url, "Animal_3", animal_3_section_id)
download_series_images(series_url, "Animal_4", animal_4_section_id)
download_series_images(series_url, "Sweets", sweets_section_id)
download_series_images(series_url, "Animal_1_2018", animal_1_2018_section_id)
download_series_images(series_url, "Animal_2_2018", animal_2_2018_section_id)
download_series_images(series_url, "Animal_3_2018", animal_3_2018_section_id)
download_series_images(series_url, "Animal_4_2018", animal_4_2018_section_id)
download_series_images(series_url, "Sweets_2018", sweets_2018_section_id)
download_series_images(series_url, "Marine_2019", marine_2019_section_id)
download_series_images(series_url, "Vegetable_2019", vegetable_2019_section_id)
download_series_images(series_url, "Fruit_2019", fruit_2019_section_id)
download_series_images(series_url, "Flower_2019", flower_2019_section_id)
