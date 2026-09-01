const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const dataPath = path.join(root, 'data.js');
const appPath = path.join(root, 'js', 'app.js');
const destPath = path.join(root, 'index-standalone.html');

// 自动生成精确到分的 UTC+8（北京时间）连续数字版本号（无分隔符，如 202609011012）
const now = new Date();
const utc8 = new Date(now.getTime() + (8 * 60 + now.getTimezoneOffset()) * 60000);
const YYYY = utc8.getFullYear();
const MM = String(utc8.getMonth() + 1).padStart(2, '0');
const DD = String(utc8.getDate()).padStart(2, '0');
const HH = String(utc8.getHours()).padStart(2, '0');
const mm = String(utc8.getMinutes()).padStart(2, '0');
const versionStr = `${YYYY}${MM}${DD}${HH}${mm}`;

// 同步写入 data.js
let dataJs = fs.readFileSync(dataPath, 'utf8');
dataJs = dataJs.replace(/version:\s*'[^']*'/, `version: '${versionStr}'`);
fs.writeFileSync(dataPath, dataJs, 'utf8');

// 同步更新 index.html 中的版本号标签
let indexHtml = fs.readFileSync(indexPath, 'utf8');
indexHtml = indexHtml.replace(/<div class="app-version-badge" id="appVersionBadge"[^>]*>.*?<\/div>/, `<div class="app-version-badge" id="appVersionBadge" title="发布版本号（UTC+8）：${versionStr}">v${versionStr}</div>`);
fs.writeFileSync(indexPath, indexHtml, 'utf8');

const appJs = fs.readFileSync(appPath, 'utf8');

let out = indexHtml;
out = out.replace('<script src="data.js"></script>', '<script>\n' + dataJs + '\n</script>');
out = out.replace('<script src="js/app.js"></script>', '<script>\n' + appJs + '\n</script>');

fs.writeFileSync(destPath, out, 'utf8');
console.log(`Successfully packed index-standalone.html! Version: ${versionStr}, Length: ${out.length}`);

