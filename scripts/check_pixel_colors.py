from PIL import Image
import numpy as np

for fname in ["hype_cycle.png", "ten_centers_blueprint.png"]:
    img_path = f"scripts/chart_output/{fname}"
    img = Image.open(img_path).convert("RGB")
    arr = np.array(img)
    # Check mean color:
    print(f"\n{fname}: Dimensions={img.size}")
    print(f"Mean RGB: {arr.mean(axis=(0,1))}")
    # Count nearly black pixels (R<30, G<30, B<30) vs white/light pixels (R>230, G>230, B>230)
    black_pixels = np.sum((arr[:,:,0] < 30) & (arr[:,:,1] < 30) & (arr[:,:,2] < 30))
    white_pixels = np.sum((arr[:,:,0] > 230) & (arr[:,:,1] > 230) & (arr[:,:,2] > 230))
    total_pixels = arr.shape[0] * arr.shape[1]
    print(f"Black pixels: {black_pixels} ({black_pixels/total_pixels*100:.2f}%)")
    print(f"White/Light pixels: {white_pixels} ({white_pixels/total_pixels*100:.2f}%)")
