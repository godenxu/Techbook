import json
import re

with open("scripts/techbook_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for idx in [14, 15, 16]:
    p = data['pages'][idx]
    print(f"\n======================================")
    print(f"Page {p['index']}: {p['label']}")
    print(f"======================================")
    svg_match = re.search(r'<svg[\s\S]*?<\/svg>', p['html'])
    if svg_match:
        svg_code = svg_match.group(0)
        print("SVG length:", len(svg_code))
        # Find all style attributes or var(...) references
        vars_found = set(re.findall(r'var\(--[^)]+\)', svg_code))
        print("CSS variables in SVG:", vars_found)
        # Find fills and strokes
        fills = set(re.findall(r'fill="([^"]+)"', svg_code))
        print("Fills:", list(fills)[:15])
        # Find text elements
        texts = re.findall(r'<text[^>]*>([\s\S]*?)<\/text>', svg_code)
        print(f"Text elements count: {len(texts)}")
        for t in texts[:5]:
            print("  Sample text:", t.strip()[:60])
        # Find text tags with their attributes
        text_tags = re.findall(r'<text([^>]*)>', svg_code)
        print("Sample text tag attributes:")
        for tt in text_tags[:5]:
            print(" ", tt)
