const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const dataJsPath = path.join(root, 'data.js');

function formatBytes(bytes) {
  if (!bytes || bytes <= 0) return '0 B';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function formatDate(d) {
  if (!d) return '';
  const YYYY = d.getFullYear();
  const MM = String(d.getMonth() + 1).padStart(2, '0');
  const DD = String(d.getDate()).padStart(2, '0');
  return `${YYYY}-${MM}-${DD}`;
}

function scanFolderForAssets(folderAbs, folderRel) {
  if (!fs.existsSync(folderAbs)) return null;
  const files = fs.readdirSync(folderAbs).filter(f => !f.startsWith('~$') && f !== '_archive');

  let docx = null, pptx = null, img = null, pdf = null;

  // 1. Docx / Doc（按修改时间倒序，最新的优先）
  const docxFiles = files.filter(f => /\.(docx|doc)$/i.test(f));
  if (docxFiles.length > 0) {
    docxFiles.sort((a, b) => {
      const sA = fs.statSync(path.join(folderAbs, a));
      const sB = fs.statSync(path.join(folderAbs, b));
      return sB.mtimeMs - sA.mtimeMs;
    });
    const f = docxFiles[0];
    const stat = fs.statSync(path.join(folderAbs, f));
    docx = {
      path: `${folderRel}/${f}`,
      name: f,
      size: formatBytes(stat.size),
      date: formatDate(stat.mtime),
      mtimeMs: stat.mtimeMs
    };
  }

  // 2. Pptx / Ppt（按修改时间倒序，最新的优先）
  const pptFiles = files.filter(f => /\.(pptx|ppt)$/i.test(f));
  if (pptFiles.length > 0) {
    pptFiles.sort((a, b) => {
      const sA = fs.statSync(path.join(folderAbs, a));
      const sB = fs.statSync(path.join(folderAbs, b));
      return sB.mtimeMs - sA.mtimeMs;
    });
    const f = pptFiles[0];
    const stat = fs.statSync(path.join(folderAbs, f));
    pptx = {
      path: `${folderRel}/${f}`,
      name: f,
      size: formatBytes(stat.size),
      date: formatDate(stat.mtime),
      mtimeMs: stat.mtimeMs
    };
  }

  // 3. Image (png, jpg, jpeg, svg, webp) 排除成熟度曲线（按修改时间倒序，最新优先）
  const imgFiles = files.filter(f => /\.(png|jpg|jpeg|svg|webp)$/i.test(f) && !f.includes('成熟度') && !f.includes('HypeCycle'));
  if (imgFiles.length > 0) {
    imgFiles.sort((a, b) => {
      const sA = fs.statSync(path.join(folderAbs, a));
      const sB = fs.statSync(path.join(folderAbs, b));
      return sB.mtimeMs - sA.mtimeMs;
    });
    const f = imgFiles[0];
    const stat = fs.statSync(path.join(folderAbs, f));
    img = {
      path: `${folderRel}/${f}`,
      name: f,
      size: formatBytes(stat.size),
      date: formatDate(stat.mtime),
      mtimeMs: stat.mtimeMs
    };
  }

  return { docx, pptx, img };
}

function sync() {
  const sourcesTechDir = path.join(root, 'sources', 'technologies');
  const assetsTechDir = path.join(root, 'assets', 'technologies');
  let dataContent = fs.readFileSync(dataJsPath, 'utf8');

  let sourceFolders = [];
  if (fs.existsSync(sourcesTechDir)) {
    sourceFolders = fs.readdirSync(sourcesTechDir).filter(name => {
      return fs.statSync(path.join(sourcesTechDir, name)).isDirectory() && name !== '_archive';
    });
  }

  let assetFolders = [];
  if (fs.existsSync(assetsTechDir)) {
    assetFolders = fs.readdirSync(assetsTechDir).filter(name => {
      return fs.statSync(path.join(assetsTechDir, name)).isDirectory() && name !== '_archive';
    });
  }

  console.log(`[sync-sources] Found ${sourceFolders.length} folders in sources, ${assetFolders.length} folders in assets.`);

  // Parse technologies array
  const fn = new Function('window', dataContent + '; return window.DATA;');
  const DATA = fn({});

  let updatedMap = {};

  DATA.technologies.forEach(tech => {
    const no = tech.no;
    const shortName = tech.short || '';
    const prefixRegex = new RegExp('^T0*' + no + '(_|$)', 'i');

    // 优先匹配 sources/technologies
    let matchedSourceFolder = sourceFolders.find(f => prefixRegex.test(f) || (shortName && f.includes(shortName)));
    // 同时也匹配 assets/technologies
    let matchedAssetFolder = assetFolders.find(f => prefixRegex.test(f) || (shortName && f.includes(shortName)));

    const folderName = matchedSourceFolder || matchedAssetFolder;
    if (!folderName) return;

    let sourceAssets = null;
    if (matchedSourceFolder) {
      sourceAssets = scanFolderForAssets(
        path.join(sourcesTechDir, matchedSourceFolder),
        `sources/technologies/${matchedSourceFolder}`
      );
    }

    let assetAssets = null;
    if (matchedAssetFolder) {
      assetAssets = scanFolderForAssets(
        path.join(assetsTechDir, matchedAssetFolder),
        `assets/technologies/${matchedAssetFolder}`
      );
    }

    // 最终决议该技术的资产映射
    // 1. Docx: 优先来自 sources
    const docx = (sourceAssets && sourceAssets.docx) ? sourceAssets.docx : (assetAssets && assetAssets.docx ? assetAssets.docx : null);
    // 2. PPT: 优先来自 sources
    const pptx = (sourceAssets && sourceAssets.pptx) ? sourceAssets.pptx : (assetAssets && assetAssets.pptx ? assetAssets.pptx : null);

    // 3. Image: 如果 sources 中有新图片，优先使用 sources 并自动同步到 assets 目录！
    let img = null;
    if (sourceAssets && sourceAssets.img) {
      img = sourceAssets.img;
      // 自动同步/复制到 assets/technologies 对应目录，保持 assets 作为完整 Web 发布库
      const targetDir = path.join(assetsTechDir, folderName);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      const srcDisk = path.join(root, img.path);
      const dstDisk = path.join(targetDir, img.name);
      try {
        if (srcDisk !== dstDisk) {
          fs.copyFileSync(srcDisk, dstDisk);
        }
      } catch (e) {
        console.warn(`[sync-sources] Warning copying ${img.name}:`, e.message);
      }
      // 将前端引用指向 assets（确保离线打包和常规引用 100% 畅通）
      img.webPath = `assets/technologies/${folderName}/${img.name}`;
    } else if (assetAssets && assetAssets.img) {
      img = assetAssets.img;
      img.webPath = img.path;
    }

    // 4. PDF: 检查 assets 中是否存在对应的报告 PDF / 演示 PDF
    let reportPdf = null;
    let slidesPdf = null;

    const assetsFolderAbs = path.join(assetsTechDir, folderName);
    if (fs.existsSync(assetsFolderAbs)) {
      const pdfFiles = fs.readdirSync(assetsFolderAbs).filter(f => /\.pdf$/i.test(f));
      
      let rPdf = pdfFiles.find(f => f === `${folderName}_专题研究报告.pdf`) ||
                 pdfFiles.find(f => f.includes('专题研究报告') || f.includes('报告'));
      if (rPdf) {
        reportPdf = `assets/technologies/${folderName}/${rPdf}`;
      }

      let sPdf = pdfFiles.find(f => f === `${folderName}_演示汇报.pdf`) ||
                 pdfFiles.find(f => f.includes('演示汇报') || f.includes('汇报') || f.includes('演示'));
      if (sPdf) {
        slidesPdf = `assets/technologies/${folderName}/${sPdf}`;
      }
    }

    // 如果有 docx 但还没有 reportPdf，且在 Windows 环境，尝试自动通过 Word COM 转码
    if (docx && !reportPdf && process.platform === 'win32') {
      const docxAbs = path.join(root, docx.path);
      const targetPdfRel = `assets/technologies/${folderName}/${folderName}_专题研究报告.pdf`;
      const targetPdfAbs = path.join(root, targetPdfRel);
      const convScript = path.join(root, 'scripts', 'convert-doc.ps1');
      if (fs.existsSync(convScript)) {
        try {
          console.log(`[sync-sources] Auto-converting Word to PDF for ${tech.id}: ${docx.name}...`);
          execSync(`powershell -ExecutionPolicy Bypass -File "${convScript}" -src "${docxAbs}" -dst "${targetPdfAbs}"`, { stdio: 'pipe' });
          if (fs.existsSync(targetPdfAbs)) {
            reportPdf = targetPdfRel;
            console.log(`[sync-sources] Successfully generated ${targetPdfRel}`);
          }
        } catch (err) {
          console.warn(`[sync-sources] Auto-convert failed:`, err.message);
        }
      }
    }

    updatedMap[tech.id] = {
      folder: matchedSourceFolder ? `sources/technologies/${matchedSourceFolder}` : `assets/technologies/${matchedAssetFolder}`,
      folderName: folderName,
      docx: docx,
      pptx: pptx,
      img: img,
      reportPdf: reportPdf,
      slidesPdf: slidesPdf
    };

    console.log(`[sync-sources] Matched ${tech.id} (${tech.short}) -> ${folderName}`);
    if (docx) console.log(`   Word: ${docx.name} (${docx.size})`);
    if (pptx) console.log(`   PPT:  ${pptx.name} (${pptx.size})`);
    if (img)  console.log(`   Img:  ${img.name} (${img.size})`);
    if (reportPdf) console.log(`   PDF:  ${reportPdf}`);
  });

  // 更新 data.js 内容
  Object.keys(updatedMap).forEach(techId => {
    const info = updatedMap[techId];
    const techRegex = new RegExp(`(\\{[\\s\\n]*id:\\s*['"]${techId}['"][\\s\\S]*?center:\\s*['"][^'"]+['"][\\s\\S]*?\\})`);
    const match = techRegex.exec(dataContent);
    if (!match) return;

    let block = match[1];

    // 清理旧字段
    block = block.replace(/\s*folder:\s*['"][^'"]*['"],?/g, '');
    block = block.replace(/\s*reportDocx:\s*['"][^'"]*['"],?/g, '');
    block = block.replace(/\s*reportDocxName:\s*['"][^'"]*['"],?/g, '');
    block = block.replace(/\s*reportDocxSize:\s*['"][^'"]*['"],?/g, '');
    block = block.replace(/\s*reportDocxDate:\s*['"][^'"]*['"],?/g, '');
    block = block.replace(/\s*reportPdf:\s*['"][^'"]*['"],?/g, '');
    block = block.replace(/\s*slidesPptx:\s*['"][^'"]*['"],?/g, '');
    block = block.replace(/\s*slidesPptxName:\s*['"][^'"]*['"],?/g, '');
    block = block.replace(/\s*slidesPptxSize:\s*['"][^'"]*['"],?/g, '');
    block = block.replace(/\s*slidesPptxDate:\s*['"][^'"]*['"],?/g, '');
    block = block.replace(/\s*slidesPdf:\s*['"][^'"]*['"],?/g, '');
    block = block.replace(/\s*image:\s*['"][^'"]*['"],?/g, '');
    block = block.replace(/\s*imageName:\s*['"][^'"]*['"],?/g, '');
    block = block.replace(/\s*imageSize:\s*['"][^'"]*['"],?/g, '');

    // 构建新字段
    let newFields = `\n    folder: '${info.folder}',`;
    if (info.docx) {
      newFields += `\n    reportDocx: '${info.docx.path}', reportDocxName: '${info.docx.name}', reportDocxSize: '${info.docx.size}', reportDocxDate: '${info.docx.date}',`;
      if (info.reportPdf) {
        newFields += ` reportPdf: '${info.reportPdf}',`;
      }
    }
    if (info.pptx) {
      newFields += `\n    slidesPptx: '${info.pptx.path}', slidesPptxName: '${info.pptx.name}', slidesPptxSize: '${info.pptx.size}', slidesPptxDate: '${info.pptx.date}',`;
      if (info.slidesPdf) {
        newFields += ` slidesPdf: '${info.slidesPdf}',`;
      }
    }
    if (info.img) {
      newFields += `\n    image: '${info.img.webPath || info.img.path}', imageName: '${info.img.name}', imageSize: '${info.img.size}',`;
    }

    // 插入到 center: 之前
    block = block.replace(/(\n\s*center:\s*)/, `${newFields}$1`);
    dataContent = dataContent.replace(match[1], block);
  });

  fs.writeFileSync(dataJsPath, dataContent, 'utf8');
  console.log('[sync-sources] data.js updated successfully!');
}

if (require.main === module) {
  sync();
}

module.exports = { sync, scanFolderForAssets };
