const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const root = path.resolve(__dirname, '..');
const sourcesDir = path.join(root, 'sources', 'technologies');
const assetsDir = path.join(root, 'assets', 'technologies');

let timer = null;
function triggerSync(eventType, filename) {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    console.log(`\n[watch] 检测到文件变更 (${eventType}: ${filename})，正在自动同步并打包...`);
    exec('node scripts/pack.js', { cwd: root }, (err, stdout, stderr) => {
      if (err) {
        console.error('[watch] 打包同步出错:', err.message);
      } else {
        console.log(stdout);
        console.log('[watch] 自动同步打包完成！浏览器刷新即可查看最新效果。\n');
      }
    });
  }, 600);
}

console.log('======================================================');
console.log('  前沿技术专属文件夹实时监听服务已启动...');
console.log('  监听目录: sources/technologies 与 assets/technologies');
console.log('  只要往技术文件夹添加/修改 Word、PPT、图片，即刻自动同步！');
console.log('======================================================\n');

if (fs.existsSync(sourcesDir)) {
  fs.watch(sourcesDir, { recursive: true }, (eventType, filename) => {
    if (filename && !filename.startsWith('~$') && !filename.includes('.git')) {
      triggerSync(eventType, filename);
    }
  });
}

if (fs.existsSync(assetsDir)) {
  fs.watch(assetsDir, { recursive: true }, (eventType, filename) => {
    if (filename && !filename.startsWith('~$') && !filename.includes('.git')) {
      triggerSync(eventType, filename);
    }
  });
}
