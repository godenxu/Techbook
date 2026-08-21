const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const dataPath = path.join(root, 'data.js');
const appPath = path.join(root, 'js', 'app.js');
const destPath = path.join(root, 'index-standalone.html');

const indexHtml = fs.readFileSync(indexPath, 'utf8');
const dataJs = fs.readFileSync(dataPath, 'utf8');
const appJs = fs.readFileSync(appPath, 'utf8');

let out = indexHtml;
out = out.replace('<script src="data.js"></script>', '<script>\n' + dataJs + '\n</script>');
out = out.replace('<script src="js/app.js"></script>', '<script>\n' + appJs + '\n</script>');

fs.writeFileSync(destPath, out, 'utf8');
console.log('Successfully packed index-standalone.html! Length:', out.length);
