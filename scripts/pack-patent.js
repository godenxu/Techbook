const fs = require('fs');
const path = require('path');

/**
 * scripts/pack-patent.js
 * 
 * 专为专利申报与评审员审查生成的轻量单文件打包脚本。
 * 
 * 关键特性与安全保证：
 * 1. 【零侵入】：绝不修改任何正式文件（不修改 data.js、index.html、index-standalone.html、assets/ 等）；
 * 2. 【去敏瘦身】：在纯内存中剔除所有 36 项技术的专有研报文件（Word/PPT）、高清一张图与技术级成熟度曲线，杜绝内部业务涉密风险并大幅减轻体积；
 * 3. 【功能完备】：完整保留双模交互（书籍翻页 + Web工作台）、55页书页版式、动态六维SVG雷达图、宏观四大研判图谱、智能书签、卷角与术语联动；
 * 4. 【单文件自包含】：UI 必要图标与方法论体系图纯 Base64 内联，开箱即用，支持离线秒开。
 */

const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const dataPath = path.join(root, 'data.js');
const appPath = path.join(root, 'js', 'app.js');
const destPath = path.join(root, 'index-patent.html');

console.log('[pack-patent] Starting patent review edition build...');

// 1. 读取基础文件（严格只读）
const rawDataJs = fs.readFileSync(dataPath, 'utf8');
const rawIndexHtml = fs.readFileSync(indexPath, 'utf8');
const rawAppJs = fs.readFileSync(appPath, 'utf8');

// 2. 内存脱敏与字段剥离
let cleanDataJs = rawDataJs;
const fieldsToRemove = [
  'folder',
  'reportDocx', 'reportDocxName', 'reportDocxSize', 'reportDocxDate', 'reportPdf',
  'slidesPptx', 'slidesPptxName', 'slidesPptxSize', 'slidesPptxDate', 'slidesPdf',
  'image', 'imageName', 'imageSize',
  'hypeCycle'
];

fieldsToRemove.forEach(f => {
  const reg = new RegExp(`\\s*${f}:\\s*['"][^'"]*['"],?`, 'g');
  cleanDataJs = cleanDataJs.replace(reg, '');
});

// 版本标识设置
const patentVersion = '专利审查演示版';
cleanDataJs = cleanDataJs.replace(/(book:\s*\{[\s\S]*?version:\s*')[^']*/, `$1${patentVersion}`);

// 3. 处理 HTML 页面标题与版本徽标
let cleanIndexHtml = rawIndexHtml;
cleanIndexHtml = cleanIndexHtml.replace(
  /<title>.*?<\/title>/,
  '<title>科技发展部前沿技术研究成果集（专利审查演示版）</title>'
);
cleanIndexHtml = cleanIndexHtml.replace(
  /<div class="app-version-badge" id="appVersionBadge"[^>]*>.*?<\/div>/,
  `<div class="app-version-badge" id="appVersionBadge" title="${patentVersion}">v${patentVersion}</div>`
);

// 4. 验证脱敏后数据结构的合法性与完整性
try {
  const fn = new Function('window', cleanDataJs + '; return window.DATA;');
  const DATA = fn({});
  const remainingAssets = DATA.technologies.filter(t => (
    t.reportDocx || t.reportPdf || t.slidesPptx || t.slidesPdf || t.image || t.hypeCycle || t.folder
  ));
  if (remainingAssets.length > 0) {
    throw new Error(`Sanitization check failed: ${remainingAssets.length} technologies still have asset properties.`);
  }
  console.log(`[pack-patent] Sanitization verified: 36 technologies cleaned, version set to "${DATA.book.version}".`);
} catch (err) {
  console.error('[pack-patent] Error verifying cleanDataJs:', err.message);
  process.exit(1);
}

// 5. 提取并内联系统级图片（如方法论架构图与系统图标）
const imgRegex = /["']((?:assets|sources)\/[^"']+\.(png|jpg|jpeg|svg|webp))["']/gi;
let match;
const imagePaths = new Set();
while ((match = imgRegex.exec(cleanDataJs)) !== null) {
  imagePaths.add(match[1]);
}
while ((match = imgRegex.exec(cleanIndexHtml)) !== null) {
  imagePaths.add(match[1]);
}

let replacedDataJs = cleanDataJs;
let replacedIndexHtml = cleanIndexHtml;
let inlinedCount = 0;

imagePaths.forEach(relPath => {
  if (relPath.includes('technologies/')) {
    console.warn(`[pack-patent] Skipping unexpected tech image: ${relPath}`);
    return;
  }
  const diskPath = path.join(root, relPath.replace(/\//g, '\\'));
  if (fs.existsSync(diskPath)) {
    const ext = path.extname(diskPath).toLowerCase().replace('.', '');
    const mime = (ext === 'svg') ? 'image/svg+xml' : ((ext === 'jpg' || ext === 'jpeg') ? 'image/jpeg' : 'image/png');
    const b64 = fs.readFileSync(diskPath).toString('base64');
    const dataUri = `data:${mime};base64,${b64}`;
    
    replacedDataJs = replacedDataJs.split(relPath).join(dataUri);
    replacedIndexHtml = replacedIndexHtml.split(relPath).join(dataUri);
    inlinedCount++;
  } else {
    console.warn(`[pack-patent] Asset file not found: ${diskPath}`);
  }
});

// 5.1 处理 JS 中的编委会页面：清空中间职务与姓名，右下角标注版权信息：®徐捷
let cleanAppJs = rawAppJs;
const oldClosingPattern = /function closingHTML\(\) \{[\s\S]*?'<\/div>';\s*\}/;
const patentClosing = `function closingHTML() {
    return '<div class="page-pad page-pad-editorial">' +
      '<div class="page-head-row">' +
        '<div class="page-head-main">' +
          '<div class="page-title">编委会</div>' +
          '<div class="page-subtitle">科技发展部前沿技术研究成果集</div>' +
        '</div>' +
      '</div>' +
      '<div class="h-rule" style="margin-bottom:0"></div>' +
      '<div class="eb-center-stage"></div>' +
      '<div class="eb-copyright" style="margin-top:auto;display:flex;justify-content:flex-end;align-items:center;gap:4px;font-size:16px;font-weight:600;color:var(--text);letter-spacing:1.5px;padding-bottom:14px;padding-right:8px;">' +
        '<span style="font-size:18px;line-height:1;">&reg;</span>徐捷' +
      '</div>' +
    '</div>';
  }`;
cleanAppJs = cleanAppJs.replace(oldClosingPattern, patentClosing);

// 6. 整合生成单文件自包含 HTML
let out = replacedIndexHtml;
out = out.replace('<script src="data.js"></script>', () => '<script>\n' + replacedDataJs + '\n</script>');
out = out.replace('<script src="js/app.js"></script>', () => '<script>\n' + cleanAppJs + '\n</script>');

fs.writeFileSync(destPath, out, 'utf8');

const stat = fs.statSync(destPath);
const sizeMb = (stat.size / 1024 / 1024).toFixed(2);

console.log(`[pack-patent] Successfully created: ${path.basename(destPath)}`);
console.log(`[pack-patent] File Size: ${sizeMb} MB, Inlined Assets: ${inlinedCount}`);
console.log(`[pack-patent] Formal files check: data.js and index.html remained untouched.`);
