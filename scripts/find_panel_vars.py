import re

for filepath in [r"C:\Users\Administrator\Documents\Antigravity\Techbook\前沿技术研究电子书-专利演示版.html", r"C:\Users\Administrator\Documents\Antigravity\Techbook\_css.txt"]:
    with open(filepath, "r", encoding="utf-8") as f:
        c = f.read()
    matches = re.findall(r'(--panel[a-zA-Z0-9_-]*\s*:\s*[^;}\n]+)', c)
    print(f"\nMatches in {filepath}:")
    for m in set(matches):
        print(" ", m)
    matches_all = re.findall(r'(--[a-zA-Z0-9_-]+\s*:\s*#[0-9a-fA-F]{3,8}|--[a-zA-Z0-9_-]+\s*:\s*rgb[a-z0-9_(),.\s]+)', c)
    print(f"Color vars in {filepath}:")
    for m in set(matches_all[:25]):
        print(" ", m)
