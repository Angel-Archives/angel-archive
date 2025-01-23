from PIL import Image
import os

def convert_to_black_and_white(image_path, save_path):

    #grayscale (L mode)
    img = Image.open(image_path).convert("L")

    img.save(save_path)
    print(f"Saved black-and-white image: {save_path}")


def apply_black_and_white_to_all_series(base_input_dir, base_output_dir):

    for root, dirs, files in os.walk(base_input_dir):

        relative_path = os.path.relpath(root, base_input_dir)
        
        output_dir = os.path.join(base_output_dir, relative_path)
        os.makedirs(output_dir, exist_ok=True)
        
        for filename in files:
            if filename.endswith(".png"):
                input_path = os.path.join(root, filename)
                output_path = os.path.join(output_dir, filename)  
                convert_to_black_and_white(input_path, output_path)


base_input_directory = "images"
base_output_directory = "images_bw"

apply_black_and_white_to_all_series(base_input_directory, base_output_directory)