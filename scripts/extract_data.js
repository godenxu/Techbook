const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, '../前沿技术研究电子书-专利演示版.html');
const outPath = path.resolve(__dirname, 'techbook_data.json');

console.log('Reading HTML file from:', htmlPath);
const content = fs.readFileSync(htmlPath, 'utf-8');

// Extract script 1
const s1Start = content.indexOf('<script>');
const s1End = content.indexOf('</script>', s1Start);
const script1 = content.substring(s1Start + 8, s1End);

// Extract script 2
const s2Start = content.indexOf('<script>', s1End);
const s2End = content.indexOf('</script>', s2Start);
let script2 = content.substring(s2Start + 8, s2End);

const dummyEl = {
  addEventListener: () => {},
  removeEventListener: () => {},
  classList: { add: () => {}, remove: () => {}, contains: () => false, toggle: () => {} },
  style: {},
  innerHTML: '',
  innerText: '',
  textContent: '',
  querySelector: () => dummyEl,
  querySelectorAll: () => [dummyEl],
  appendChild: () => dummyEl,
  removeChild: () => dummyEl,
  setAttribute: () => {},
  getAttribute: () => '',
  getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 })
};

const window = {
  location: { protocol: 'file:', hostname: '', href: '', search: '', hash: '' },
  addEventListener: () => {},
  removeEventListener: () => {},
  document: {
    getElementById: () => dummyEl,
    querySelector: () => dummyEl,
    querySelectorAll: () => [dummyEl],
    createElement: () => dummyEl,
    addEventListener: () => {},
    removeEventListener: () => {},
    documentElement: { style: { setProperty: () => {}, getPropertyValue: () => '' } },
    body: dummyEl
  },
  innerWidth: 1920,
  innerHeight: 1080,
  getComputedStyle: () => ({ getPropertyValue: () => '58px' }),
  setTimeout: () => 1,
  clearTimeout: () => {},
  requestAnimationFrame: (cb) => cb(),
  localStorage: { getItem: () => null, setItem: () => {} }
};

script2 = script2.replace('var pages = [];', 'var pages = window.__pages = [];');
script2 = script2.replace('var pageLabels = [];', 'var pageLabels = window.__pageLabels = [];');
script2 = script2.replace('function getPageHTML(idx) {', 'window.__getPageHTML = getPageHTML; function getPageHTML(idx) {');
script2 = script2.replace(/init\(\);/g, 'try { init(); } catch(e) {}');

console.log('Executing script 1...');
new Function('window', script1)(window);

console.log('Executing script 2...');
new Function('window', 'document', script2)(window, window.document);

const extracted = {
  book: window.DATA.book,
  categories: window.DATA.categories,
  categoryColor: window.DATA.categoryColor,
  tiers: window.DATA.tiers,
  tierColor: window.DATA.tierColor,
  workplan: window.DATA.workplan,
  sources: window.DATA.sources,
  methodologyApplication: window.DATA.methodologyApplication,
  library: window.DATA.library,
  hypeCycle: window.DATA.hypeCycle,
  impactRadar: window.DATA.impactRadar,
  centerMappings: window.DATA.centerMappings,
  technologies: window.DATA.technologies,
  terms: window.DATA.terms,
  pages: []
};

for (let i = 0; i < window.__pages.length; i++) {
  const html = window.__getPageHTML(i) || '';
  extracted.pages.push({
    index: i + 1,
    label: window.__pageLabels[i] || '',
    html: html
  });
}

console.log(`Extracted DATA with ${extracted.technologies.length} technologies, ${extracted.terms.length} terms, and ${extracted.pages.length} pages.`);
fs.writeFileSync(outPath, JSON.stringify(extracted, null, 2), 'utf-8');
console.log('Successfully saved to:', outPath);
