import os
import re
import subprocess

out_dir = os.path.abspath("scripts/chart_output")

with open("scripts/techbook_data.json", "r", encoding="utf-8") as f:
    import json
    data = json.load(f)

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
if not os.path.exists(chrome_path):
    chrome_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

light_theme_css = """
:root, html, body, svg {
  --bg: #ffffff;
  --bg2: #f8fafc;
  --panel: #ffffff !important;
  --panel2: #f8fafc !important;
  --card: #ffffff !important;
  --border: #cbd5e1 !important;
  --border2: #94a3b8 !important;
  --text: #0a1950 !important;
  --dim: #475569 !important;
  --faint: #64748b !important;
  --accent: #0f6ef0 !important;
  --accent2: #0284c7 !important;
  --good: #10b981 !important;
  --warn: #f59e0b !important;
  --bad: #f43f5e !important;
  --sans: "Microsoft YaHei", "Segoe UI", sans-serif !important;
  --font: "Microsoft YaHei", "Segoe UI", sans-serif !important;
}

body {
  margin: 0;
  padding: 12px;
  background: #ffffff;
  font-family: "Microsoft YaHei", "Segoe UI", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

svg {
  display: block;
  width: 100%;
  height: 100%;
  background: #ffffff;
}

/* Explicit overrides to guarantee perfect contrast and no black boxes */
rect[fill="var(--panel)"], rect[fill="var(--card)"] { fill: #ffffff !important; }
rect[fill="var(--panel2)"] { fill: #f8fafc !important; }
text[fill="var(--text)"] { fill: #0a1950 !important; font-family: "Microsoft YaHei", sans-serif !important; }
text[fill="var(--dim)"] { fill: #475569 !important; font-family: "Microsoft YaHei", sans-serif !important; }

/* Hype Cycle specific styling */
.hc-bg-layer rect { opacity: 0.7; }
.hc-label-bg { fill: #ffffff !important; stroke-width: 1.2px !important; }
.hc-label-text { fill: #0a1950 !important; font-family: "Microsoft YaHei", sans-serif !important; font-weight: bold !important; font-size: 8.5px !important; }
.hc-phase-header text { font-family: "Microsoft YaHei", sans-serif !important; }
.hc-phase-header text:first-child { fill: #0a1950 !important; font-weight: 900 !important; }
.hc-phase-header text:last-child { fill: #64748b !important; font-weight: 600 !important; }
.hc-axes line { stroke: #64748b !important; stroke-width: 1.5px !important; stroke-opacity: 0.8 !important; }
.hc-axes text { fill: #475569 !important; font-weight: bold !important; font-family: "Microsoft YaHei", sans-serif !important; }
.hc-legends text { fill: #475569 !important; font-family: "Microsoft YaHei", sans-serif !important; }

/* Blueprint specific styling */
.tc-box-rect { fill: #ffffff !important; stroke: #0a1950 !important; stroke-width: 1.5px !important; }
.tc-pill-bg { fill: #f8fafc !important; stroke-width: 1.2px !important; }
.tc-pill-bg:hover { fill: #ffffff !important; }
.tc-center-box text { font-family: "Microsoft YaHei", sans-serif !important; }
.tc-center-box text[fill="var(--text)"] { fill: #0a1950 !important; font-weight: bold !important; }
.tc-flow-text { fill: #0a1950 !important; font-family: "Microsoft YaHei", sans-serif !important; font-weight: bold !important; }
.tc-flow-line { stroke: #0a1950 !important; stroke-opacity: 0.85 !important; }
.tc-flow-arrow { fill: #0a1950 !important; opacity: 0.9 !important; }
"""

tasks = [
    {"page_idx": 14, "name": "hype_cycle.png", "width": 1400, "height": 770},
    {"page_idx": 15, "name": "impact_radar.png", "width": 1100, "height": 1100},
    {"page_idx": 16, "name": "ten_centers_blueprint.png", "width": 1400, "height": 1064}
]

for task in tasks:
    p = data['pages'][task['page_idx']]
    html_content = p['html']
    svg_match = re.search(r'<svg[\s\S]*?<\/svg>', html_content)
    if svg_match:
        svg_code = svg_match.group(0)
        temp_html = os.path.join(out_dir, f"temp_{task['name']}.html")
        out_png = os.path.join(out_dir, task['name'])
        
        full_html = f"<!DOCTYPE html><html><head><meta charset='utf-8'><style>{light_theme_css}</style></head><body>{svg_code}</body></html>"
        with open(temp_html, "w", encoding="utf-8") as tf:
            tf.write(full_html)
        
        cmd = [
            chrome_path,
            "--headless=new",
            "--disable-gpu",
            "--no-sandbox",
            f"--screenshot={out_png}",
            f"--window-size={task['width']},{task['height']}",
            f"file:///{temp_html.replace(os.sep, '/')}"
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        print(f"Generated {task['name']}: exists={os.path.exists(out_png)}, size={os.path.getsize(out_png)} bytes")

print("Regeneration complete!")
