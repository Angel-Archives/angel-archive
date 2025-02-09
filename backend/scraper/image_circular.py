from PIL import Image, ImageDraw
import os

def convert_to_circular(image_path, save_path, crop_width=1000, crop_height=2000, zoom_factor=0.5, y_shift=-200):
    img = Image.open(image_path)
    img_width, img_height = img.size

    x_center = img_width // 2
    y_center = img_height // 2 + y_shift 

    left = x_center - crop_width // 2
    top = y_center - crop_height // 2
    right = x_center + crop_width // 2
    bottom = y_center + crop_height // 2

    top = max(0, top)  
    bottom = min(img_height, bottom)

    cropped_img = img.crop((left, top, right, bottom))

    zoomed_width = int(crop_width * zoom_factor)
    zoomed_height = int(crop_height * zoom_factor)
    cropped_img = cropped_img.resize((zoomed_width, zoomed_height), Image.LANCZOS)

    final_img = cropped_img

    mask = Image.new("L", (zoomed_width, zoomed_height), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, zoomed_width, zoomed_height), fill=255)

    circular_img = Image.new("RGBA", (zoomed_width, zoomed_height), (0, 0, 0, 0))
    circular_img.paste(final_img, (0, 0), mask)

    circular_img = circular_img.resize((crop_width, crop_height), Image.LANCZOS)

    circular_img.save(save_path)
    print(f"Saved circular image: {save_path}")

def apply_circular_crop_to_all_series(base_input_dir, base_output_dir, crop_width=1000, crop_height=1000, zoom_factor=0.5, y_shift=-300):
    for root, dirs, files in os.walk(base_input_dir):
        relative_path = os.path.relpath(root, base_input_dir)
        output_dir = os.path.join(base_output_dir, relative_path)
        os.makedirs(output_dir, exist_ok=True)

        for filename in files:
            if filename.endswith(".png"):
                input_path = os.path.join(root, filename)
                output_path = os.path.join(output_dir, f"circular_{filename}")
                convert_to_circular(input_path, output_path, crop_width, crop_height, zoom_factor, y_shift)

base_input_directory = "images"
base_output_directory = "images_profile_pic"

apply_circular_crop_to_all_series(base_input_directory, base_output_directory)