import subprocess
import os

html_test = """<!DOCTYPE html>
<html>
<head><meta charset="utf-8">
<style>
body { margin:0; padding:0; background:white; font-family:"Microsoft YaHei", sans-serif; }
</style>
</head>
<body>
<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="200" fill="#0A1950"/>
  <text x="200" y="100" fill="white" font-size="20" text-anchor="middle" font-family="Microsoft YaHei">浦发银行测试 SVG</text>
</svg>
</body>
</html>"""

html_file = os.path.abspath("scripts/test_svg.html")
png_file = os.path.abspath("scripts/test_svg.png")

with open(html_file, "w", encoding="utf-8") as f:
    f.write(html_test)

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
if not os.path.exists(chrome_path):
    chrome_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

cmd = [
    chrome_path,
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    f"--screenshot={png_file}",
    "--window-size=400,200",
    f"file:///{html_file.replace(os.sep, '/')}"
]

print("Running command:", " ".join(cmd))
res = subprocess.run(cmd, capture_output=True, text=True)
print("Return code:", res.returncode)
print("Stdout:", res.stdout)
print("Stderr:", res.stderr)
print("PNG exists:", os.path.exists(png_file), "Size:", os.path.getsize(png_file) if os.path.exists(png_file) else 0)
