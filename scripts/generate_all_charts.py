import os
import json
import subprocess
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

# Ensure output directory exists
out_dir = os.path.abspath("scripts/chart_output")
os.makedirs(out_dir, exist_ok=True)

# Load data
with open("scripts/techbook_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Configure Matplotlib fonts for Chinese
plt.rcParams['font.sans-serif'] = ['Microsoft YaHei', 'SimHei', 'Arial']
plt.rcParams['axes.unicode_minus'] = False

# 1. Generate 36 Radar Charts
labels = ['技术成熟度', '战略匹配度', '价值贡献度', '引入可行度', '战略紧迫度', '生态开放度']
num_vars = len(labels)
angles = np.linspace(0, 2 * np.pi, num_vars, endpoint=False).tolist()
angles_closed = angles + angles[:1]

print(f"Generating radar charts for {len(data['technologies'])} technologies...")

for tech in data['technologies']:
    t_id = tech['id']
    vals = [
        tech.get('maturity', 3),
        tech.get('strategicFit', 3),
        tech.get('value', 3),
        tech.get('feasibility', 3),
        tech.get('urgency', 3),
        tech.get('openness', 3)
    ]
    vals_closed = vals + vals[:1]
    
    fig, ax = plt.subplots(figsize=(4.2, 4.2), subplot_kw=dict(polar=True), dpi=220)
    fig.patch.set_facecolor('#ffffff')
    ax.set_facecolor('#f8fafc')
    
    # Orientation
    ax.set_theta_offset(np.pi / 2)
    ax.set_theta_direction(-1)
    ax.set_rlabel_position(0)
    
    # Tick labels
    plt.xticks(angles, labels, color='#0A1950', size=9.5, weight='bold')
    plt.yticks([1, 2, 3, 4, 5], ["1", "2", "3", "4", "5"], color="#94A3B8", size=8)
    plt.ylim(0, 5.2)
    
    # Styling grid
    ax.grid(color='#CBD5E1', linestyle='--', linewidth=0.8)
    ax.spines['polar'].set_color('#94A3B8')
    ax.spines['polar'].set_linewidth(1.0)
    
    # Plot data
    ax.plot(angles_closed, vals_closed, color='#0F6EF0', linewidth=2.4, linestyle='solid')
    ax.fill(angles_closed, vals_closed, color='#78AAF5', alpha=0.35)
    ax.scatter(angles, vals, color='#AA051E', s=45, zorder=10, edgecolors='#ffffff', linewidths=1.2)
    
    plt.tight_layout()
    radar_path = os.path.join(out_dir, f"radar_{t_id}.png")
    plt.savefig(radar_path, dpi=220, bbox_inches='tight', transparent=False, facecolor='#ffffff')
    plt.close()

print("All 36 radar charts generated successfully!")

# 2. Render the 3 Chapter 2 SVGs using Headless Chrome with explicit Light Mode variables
chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
if not os.path.exists(chrome_path):
    chrome_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

svg_tasks = [
    {"page_idx": 14, "name": "hype_cycle.png", "width": 1400, "height": 770},
    {"page_idx": 15, "name": "impact_radar.png", "width": 1100, "height": 1100},
    {"page_idx": 16, "name": "ten_centers_blueprint.png", "width": 1400, "height": 1064}
]

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

rect[fill="var(--panel)"], rect[fill="var(--card)"] { fill: #ffffff !important; }
rect[fill="var(--panel2)"] { fill: #f8fafc !important; }
text[fill="var(--text)"] { fill: #0a1950 !important; font-family: "Microsoft YaHei", sans-serif !important; }
text[fill="var(--dim)"] { fill: #475569 !important; font-family: "Microsoft YaHei", sans-serif !important; }

/* Hype Cycle */
.hc-bg-layer rect { opacity: 0.7; }
.hc-label-bg { fill: #ffffff !important; stroke-width: 1.2px !important; }
.hc-label-text { fill: #0a1950 !important; font-family: "Microsoft YaHei", sans-serif !important; font-weight: bold !important; font-size: 8.5px !important; }
.hc-phase-header text { font-family: "Microsoft YaHei", sans-serif !important; }
.hc-phase-header text:first-child { fill: #0a1950 !important; font-weight: 900 !important; }
.hc-phase-header text:last-child { fill: #64748b !important; font-weight: 600 !important; }
.hc-axes line { stroke: #64748b !important; stroke-width: 1.5px !important; stroke-opacity: 0.8 !important; }
.hc-axes text { fill: #475569 !important; font-weight: bold !important; font-family: "Microsoft YaHei", sans-serif !important; }
.hc-legends text { fill: #475569 !important; font-family: "Microsoft YaHei", sans-serif !important; }

/* Blueprint */
.tc-box-rect { fill: #ffffff !important; stroke: #0a1950 !important; stroke-width: 1.5px !important; }
.tc-pill-bg { fill: #f8fafc !important; stroke-width: 1.2px !important; }
.tc-center-box text { font-family: "Microsoft YaHei", sans-serif !important; }
.tc-center-box text[fill="var(--text)"] { fill: #0a1950 !important; font-weight: bold !important; }
.tc-flow-text { fill: #0a1950 !important; font-family: "Microsoft YaHei", sans-serif !important; font-weight: bold !important; }
.tc-flow-line { stroke: #0a1950 !important; stroke-opacity: 0.85 !important; }
.tc-flow-arrow { fill: #0a1950 !important; opacity: 0.9 !important; }
"""

import re
for task in svg_tasks:
    p = data['pages'][task['page_idx']]
    html_content = p['html']
    svg_match = re.search(r'<svg[\s\S]*?<\/svg>', html_content)
    if svg_match:
        svg_code = svg_match.group(0)
        temp_html = os.path.join(out_dir, f"temp_{task['name']}.html")
        out_png = os.path.join(out_dir, task['name'])
        with open(temp_html, "w", encoding="utf-8") as tf:
            tf.write(f"<!DOCTYPE html><html><head><meta charset='utf-8'><style>{light_theme_css}</style></head><body>{svg_code}</body></html>")
        
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
        if os.path.exists(out_png):
            print(f"Generated {task['name']} (Size: {os.path.getsize(out_png)} bytes)")
        else:
            print(f"Failed to generate {task['name']}")

print("All charts generated!")
