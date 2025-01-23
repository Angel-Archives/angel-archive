from PIL import Image
import os

def reduce_opacity(image_path, save_path, opacity):
   
    img = Image.open(image_path).convert("RGBA")
    
    # extract alpha channel
    r, g, b, a = img.split()
    
    # reduce alpha channel by multiplying with opacity level
    a = a.point(lambda p: int(p * opacity))
    
    # merge modified alpha channel back with image
    img_with_opacity = Image.merge("RGBA", (r, g, b, a))
    
    img_with_opacity.save(save_path)
    print(f"Saved opacity-adjusted image: {save_path}")


def apply_opacity_to_all_series(base_input_dir, base_output_dir, opacity):

    for root, dirs, files in os.walk(base_input_dir):

        relative_path = os.path.relpath(root, base_input_dir)
        
        output_dir = os.path.join(base_output_dir, relative_path)
        os.makedirs(output_dir, exist_ok=True)
        
        for filename in files:
            if filename.endswith(".png"):
                input_path = os.path.join(root, filename)
                output_path = os.path.join(output_dir, filename)  
                reduce_opacity(input_path, output_path, opacity)


base_input_directory = "images"
base_output_directory = "images_opacity"
desired_opacity = 0.5

apply_opacity_to_all_series(base_input_directory, base_output_directory, desired_opacity)
