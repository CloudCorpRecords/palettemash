'use strict';
/* Headless smoke test: paints all three procedural sources, blends a
   3-source mashup and a 2-source mashup, exports real PNG files, and
   prints palettes + the curation statement. Run: node smoke-test.js */
const fs = require('fs');
const path = require('path');
const { SOURCES, renderMashup, extractPalette, curationStatement, encodePNG } = require('./src/blend');

const OUT = path.join(__dirname, 'output');
fs.mkdirSync(OUT, { recursive: true });

const W = 480, H = 360;
const sources = SOURCES.map(s => ({ meta: s, img: s.paint(W, H, s.seed) }));

let ok = true;
for (const s of sources) {
  const file = path.join(OUT, `source-${s.meta.id}.png`);
  fs.writeFileSync(file, encodePNG(s.img));
  const pal = extractPalette(s.img, 6).map(p => p.hex).join(' ');
  console.log(`SOURCE ${s.meta.id}: ${fs.statSync(file).size} bytes → ${file}`);
  console.log(`  palette: ${pal}`);
}

// 3-source mashup (the headline piece)
const opts = { seed: 2027, turbulence: 0.65, width: 960, height: 720 };
const big = sources.map(s => ({ meta: s.meta, img: s.meta.paint(960, 720, s.meta.seed) }));
const r3 = renderMashup(big, opts);
const f3 = path.join(OUT, 'mashup-3-sources.png');
fs.writeFileSync(f3, encodePNG(r3.img));
console.log(`MASHUP 3-source: ${fs.statSync(f3).size} bytes → ${f3}`);

// 2-source mashup (proves the 2-pick path)
const r2 = renderMashup(big.slice(0, 2), { seed: 7, turbulence: 0.4, width: 960, height: 720 });
const f2 = path.join(OUT, 'mashup-2-sources.png');
fs.writeFileSync(f2, encodePNG(r2.img));
console.log(`MASHUP 2-source: ${fs.statSync(f2).size} bytes → ${f2}`);

// sanity: outputs must be real, non-blank PNGs
for (const f of [f3, f2]) {
  const buf = fs.readFileSync(f);
  const isPNG = buf[0] === 137 && buf[1] === 80 && buf[2] === 78 && buf[3] === 71;
  const distinct = new Set();
  for (let i = 0; i < buf.length; i += 997) distinct.add(buf[i]);
  console.log(`CHECK ${path.basename(f)}: pngHeader=${isPNG} size=${buf.length} sampledByteVariety=${distinct.size}`);
  if (!isPNG || buf.length < 20000 || distinct.size < 20) ok = false;
}

console.log('\n' + curationStatement(SOURCES, r3.palettes, opts));
console.log('\nSMOKE TEST: ' + (ok ? 'PASS' : 'FAIL'));
process.exit(ok ? 0 : 1);
