import re

html_path = r"C:\Users\Administrator\Documents\Antigravity\Techbook\前沿技术研究电子书-专利演示版.html"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Search for CSS root variables
root_matches = re.findall(r':root\s*\{([^}]+)\}', content)
print(f"Found {len(root_matches)} :root blocks")
for rm in root_matches:
    print("\n--- :root block ---")
    for line in rm.strip().split(';'):
        if '--' in line:
            print(" ", line.strip())
