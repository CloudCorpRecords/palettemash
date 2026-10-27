'use strict';
/* PaletteMash web UI. All processing is local, in this browser tab. */
(function () {
  const PM = window.PM;
  const SW = 480, SH = 360;

  function toCanvas(img) {
    const c = document.createElement('canvas');
    c.width = img.w; c.height = img.h;
    c.getContext('2d').putImageData(new ImageData(new Uint8ClampedArray(img.data), img.w, img.h), 0, 0);
    return c;
  }
  function fromCanvas(c) {
    const d = c.getContext('2d').getImageData(0, 0, c.width, c.height);
    return { w: c.width, h: c.height, data: new Uint8ClampedArray(d.data) };
  }

  // Source registry: the 3 built-in procedural studies + optional user photo.
  const entries = PM.SOURCES.map(s => {
    const img = s.paint(SW, SH, s.seed);
    return { meta: s, img, palette: PM.extractPalette(img, 6), selected: true };
  });

  const srcBox = document.getElementById('sources');
  const err = document.getElementById('pickErr');

  function renderSources() {
    srcBox.innerHTML = '';
    entries.forEach((e, idx) => {
      const row = document.createElement('label');
      row.className = 'src';
      const cb = document.createElement('input');
      cb.type = 'checkbox'; cb.checked = e.selected;
      cb.addEventListener('change', () => { e.selected = cb.checked; validate(); });
      const thumb = toCanvas(e.img);
      const txt = document.createElement('div');
      txt.innerHTML = `<div class="t">${e.meta.title}</div><div class="c">${e.meta.inspiration}</div>` +
        `<div class="swatches">${e.palette.map(p => `<i style="background:${p.hex}" title="${p.hex}"></i>`).join('')}</div>`;
      row.append(cb, thumb, txt);
      srcBox.appendChild(row);
      void idx;
    });
  }
  function selected() { return entries.filter(e => e.selected); }
  function validate() {
    const n = selected().length;
    err.textContent = n < 2 ? 'Pick at least 2 sources.' : (n > 3 ? 'Pick at most 3 sources.' : '');
    document.getElementById('generate').disabled = n < 2 || n > 3;
    return n >= 2 && n <= 3;
  }

  document.getElementById('ownFile').addEventListener('change', (ev) => {
    const file = ev.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const im = new Image();
    im.onload = () => {
      const c = document.createElement('canvas'); c.width = SW; c.height = SH;
      const ctx = c.getContext('2d');
      const scale = Math.max(SW / im.width, SH / im.height);
      ctx.drawImage(im, (SW - im.width * scale) / 2, (SH - im.height * scale) / 2, im.width * scale, im.height * scale);
      const img = fromCanvas(c);
      entries.push({
        meta: {
          id: 'own-photo', title: `Your photo: ${file.name}`,
          inspiration: 'A photo from your own device, used locally as a palette source only',
          credit: 'User-supplied on this device; processed locally, never uploaded.',
        },
        img, palette: PM.extractPalette(img, 6), selected: true,
      });
      URL.revokeObjectURL(url);
      renderSources(); validate();
    };
    im.src = url;
  });

  const turb = document.getElementById('turb'), seed = document.getElementById('seed');
  turb.addEventListener('input', () => document.getElementById('turbVal').textContent = turb.value);
  seed.addEventListener('input', () => document.getElementById('seedVal').textContent = seed.value);
  document.getElementById('randomSeed').addEventListener('click', () => {
    seed.value = 1 + Math.floor(Math.random() * 9998);
    document.getElementById('seedVal').textContent = seed.value;
  });

  const out = document.getElementById('out');
  function generate() {
    if (!validate()) return;
    const sel = selected().map(e => ({
      meta: e.meta,
      img: e.meta.paint ? e.meta.paint(960, 720, e.meta.seed) : e.img,
    }));
    // user-photo entries have no paint(): upscale via canvas instead
    selected().forEach((e, i) => {
      if (!e.meta.paint) {
        const c = document.createElement('canvas'); c.width = 960; c.height = 720;
        c.getContext('2d').drawImage(toCanvas(e.img), 0, 0, 960, 720);
        sel[i].img = fromCanvas(c);
      }
    });
    const opts = { seed: Number(seed.value), turbulence: Number(turb.value), width: 960, height: 720 };
    const res = PM.renderMashup(sel, opts);
    out.getContext('2d').putImageData(new ImageData(new Uint8ClampedArray(res.img.data), 960, 720), 0, 0);
    document.getElementById('statement').textContent =
      PM.curationStatement(sel.map(s => s.meta), res.palettes, opts);
    document.getElementById('exportBtn').disabled = false;
  }
  document.getElementById('generate').addEventListener('click', generate);
  document.getElementById('exportBtn').addEventListener('click', () => {
    out.toBlob((blob) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `palettemash-seed-${seed.value}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    }, 'image/png');
  });

  renderSources(); validate(); generate();
})();
