const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'techbook_data.json'), 'utf-8'));

[14, 15, 16].forEach(idx => {
  const p = data.pages[idx];
  console.log(`Page ${p.index}: ${p.label}`);
  const svgs = p.html.match(/<svg[\s\S]*?<\/svg>/gi) || [];
  console.log(`  Found ${svgs.length} SVGs`);
  svgs.forEach((s, sIdx) => {
    console.log(`    SVG ${sIdx + 1} length: ${s.length} chars, viewbox/width: ${s.substring(0, 100)}`);
  });
});
