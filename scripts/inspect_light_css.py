import re

html_path = r"C:\Users\Administrator\Documents\Antigravity\Techbook\前沿技术研究电子书-专利演示版.html"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Look for theme or body[data-theme='light'] or similar
theme_blocks = re.findall(r'(\[[^\]]*theme[^\]]*\][^{]*\{[^}]+\}|body[^{]*\{[^}]+\})', content)
print(f"Theme blocks found: {len(theme_blocks)}")
for tb in theme_blocks[:10]:
    print("\n", tb[:200])

# Look for .hc-svg and .blueprint-svg and .tc-
svg_css_blocks = re.findall(r'(\.[a-zA-Z0-9_-]*(?:hc|blueprint|tc-|radar)[^{]*\{[^}]+\})', content)
print(f"\nSVG CSS blocks found: {len(svg_css_blocks)}")
for sb in svg_css_blocks[:15]:
    print(" ", sb[:120])
