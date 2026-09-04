const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 implementation
function makeCrcTable() {
  let c;
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[n] = c;
  }
  return crcTable;
}
const crcTable = makeCrcTable();
function crc32(buf) {
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

function writePngChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(len + 12);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = chunk.subarray(4, len + 8);
  const crcVal = crc32(typeAndData);
  chunk.writeUInt32BE(crcVal, len + 8);
  return chunk;
}

function createPng(width, height, getPixelRGBA) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR: 13 bytes
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8 bits per channel
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  const ihdrChunk = writePngChunk('IHDR', ihdr);

  // Raw uncompressed scanlines: each line has 1 filter byte (0) + width * 4 bytes
  const scanlineWidth = 1 + width * 4;
  const rawData = Buffer.alloc(height * scanlineWidth);

  for (let y = 0; y < height; y++) {
    const lineOffset = y * scanlineWidth;
    rawData[lineOffset] = 0; // filter None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixelRGBA(x, y, width, height);
      const pxOffset = lineOffset + 1 + x * 4;
      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = writePngChunk('IDAT', compressed);
  const iendChunk = writePngChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

// Draw the '研' character icon with smooth gradient and rounded shape
function renderIconPixel(x, y, size, maskable) {
  const cx = size / 2;
  const cy = size / 2;
  const pad = maskable ? size * 0.14 : size * 0.05;
  const innerSize = size - 2 * pad;
  const radius = innerSize * 0.22;

  // Background deep space
  const bgR = 11, bgG = 19, bgB = 43;

  // Relative coords in card
  const rx = x - pad;
  const ry = y - pad;

  if (rx < 0 || rx > innerSize || ry < 0 || ry > innerSize) {
    return [bgR, bgG, bgB, 255];
  }

  // Rounded rect distance
  const qx = Math.abs(rx - innerSize / 2) - (innerSize / 2 - radius);
  const qy = Math.abs(ry - innerSize / 2) - (innerSize / 2 - radius);
  const outsideDist = Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - radius;

  if (outsideDist > 1.5) {
    return [bgR, bgG, bgB, 255];
  }

  // Gradient: from cyan/blue #2f6bff (47, 107, 255) to #0ea5e9 (14, 165, 233)
  const t = (rx + ry) / (innerSize * 2);
  let cardR = Math.round(47 * (1 - t) + 14 * t);
  let cardG = Math.round(107 * (1 - t) + 165 * t);
  let cardB = Math.round(255 * (1 - t) + 233 * t);

  // Border highlight
  if (outsideDist > -2.5 && outsideDist <= 0.5) {
    cardR = Math.min(255, cardR + 80);
    cardG = Math.min(255, cardG + 80);
    cardB = Math.min(255, cardB + 60);
  }

  // Draw '研' pattern simplified geometric strokes in center
  // Center is (innerSize/2, innerSize/2)
  const nx = (rx - innerSize / 2) / (innerSize * 0.5); // -1 to +1
  const ny = (ry - innerSize / 2) / (innerSize * 0.5); // -1 to +1

  // Left part: '石' (stone radical: horizontal top, slanting falling stroke, mouth box)
  let isStroke = false;

  // Top horizontal across '石' left: nx from -0.7 to -0.15, ny around -0.45
  if (nx >= -0.72 && nx <= -0.15 && Math.abs(ny - (-0.45)) < 0.055) isStroke = true;
  // Slanting left stroke: from (-0.42, -0.45) down to (-0.68, 0.45)
  const slantDist = Math.abs((nx - (-0.42)) * 0.9 + (ny - (-0.45)) * 0.26);
  if (ny >= -0.45 && ny <= 0.45 && nx <= -0.25 && Math.abs(nx - (-0.42 - (ny + 0.45) * 0.32)) < 0.055) isStroke = true;
  // '口' box of '石': nx from -0.52 to -0.18, ny from -0.05 to 0.42
  if (nx >= -0.52 && nx <= -0.18 && ny >= -0.05 && ny <= 0.42) {
    if (Math.abs(nx - (-0.52)) < 0.055 || Math.abs(nx - (-0.18)) < 0.055 || Math.abs(ny - (-0.05)) < 0.055 || Math.abs(ny - 0.42) < 0.055) {
      isStroke = true;
    }
  }

  // Right part: '开' (two horizontals, two verticals)
  // First horizontal: nx from 0.02 to 0.72, ny around -0.36
  if (nx >= 0.02 && nx <= 0.72 && Math.abs(ny - (-0.36)) < 0.055) isStroke = true;
  // Second horizontal (longer): nx from -0.05 to 0.78, ny around -0.02
  if (nx >= -0.05 && nx <= 0.78 && Math.abs(ny - (-0.02)) < 0.055) isStroke = true;
  // Left vertical falling stroke: nx around 0.22, ny from -0.42 to 0.55
  if (Math.abs(nx - (0.22 - Math.max(0, ny - 0.1) * 0.2)) < 0.055 && ny >= -0.42 && ny <= 0.55) isStroke = true;
  // Right vertical straight stroke: nx around 0.54, ny from -0.42 to 0.58
  if (Math.abs(nx - 0.54) < 0.055 && ny >= -0.42 && ny <= 0.58) isStroke = true;

  if (isStroke) {
    return [255, 255, 255, 255];
  }

  return [cardR, cardG, cardB, 255];
}

// Generate PNGs
const assetsDir = path.resolve(__dirname, '..', 'assets');
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

[
  { size: 192, name: 'icon-192.png', maskable: false },
  { size: 512, name: 'icon-512.png', maskable: false },
  { size: 512, name: 'icon-maskable.png', maskable: true }
].forEach(({ size, name, maskable }) => {
  const outPath = path.join(assetsDir, name);
  const buf = createPng(size, size, (x, y, w, h) => renderIconPixel(x, y, size, maskable));
  fs.writeFileSync(outPath, buf);
  console.log(`Generated PNG: ${name} (${size}x${size}, ${buf.length} bytes)`);
});

// Also create crisp vector SVG icon
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="pwaGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2f6bff"/>
      <stop offset="100%" stop-color="#0ea5e9"/>
    </linearGradient>
    <filter id="pwaGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="rgba(47,107,255,0.45)"/>
    </filter>
  </defs>
  <rect width="512" height="512" fill="#0b132b"/>
  <rect x="36" y="36" width="440" height="440" rx="96" fill="url(#pwaGrad)" stroke="rgba(255,255,255,0.7)" stroke-width="6" filter="url(#pwaGlow)"/>
  <text x="256" y="338" font-family="'Microsoft YaHei', 'PingFang SC', sans-serif" font-size="246" font-weight="900" fill="#ffffff" text-anchor="middle">研</text>
</svg>`;
fs.writeFileSync(path.join(assetsDir, 'icon.svg'), svgContent, 'utf8');
console.log('Generated SVG: assets/icon.svg');
