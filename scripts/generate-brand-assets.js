// Gera os assets de identidade visual (logos, favicons, manifest, OG image)
// a partir dos arquivos oficiais em C:\Users\PG\Desktop\IMAGENS SITE CPX-SITE\Logos.
// Rodar de novo só é necessário se os arquivos-fonte da pasta Logos mudarem.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const pngToIco = require('png-to-ico').default;

const SRC = 'C:\\Users\\PG\\Desktop\\IMAGENS SITE CPX-SITE\\Logos';
const LOGO_OUT = path.join(__dirname, '..', 'assets', 'images', 'logo');
const ICON_OUT = path.join(__dirname, '..', 'assets', 'icons');
const OG_OUT = path.join(__dirname, '..', 'assets', 'images');

fs.mkdirSync(LOGO_OUT, { recursive: true });
fs.mkdirSync(ICON_OUT, { recursive: true });

// Cores da identidade (ver assets/css/styles.css :root)
const BG = '#0a0a0a';
const BG_2 = '#111111';
const PURPLE = '#7C71F5';

async function whiteify(buffer) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255;
    data[i + 1] = 255;
    data[i + 2] = 255;
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
}

async function main() {
  // ── 1. Logo completo (ícone + wordmark), preto — recorta o excesso de canvas ──
  const blackLockup = await sharp(path.join(SRC, 'logo preto.png')).trim({ threshold: 5 }).toBuffer();
  const blackMeta = await sharp(blackLockup).metadata();
  fs.writeFileSync(path.join(LOGO_OUT, 'logo-black.png'), blackLockup);

  // ── 2. Versão branca do mesmo lockup (silhueta, alpha preservado) — p/ fundo escuro ──
  const whiteLockup = await whiteify(blackLockup);

  // ── 3. Ícone (as 3 camadas + funil) isolado, na cor dourada original ──
  const iconCropped = await sharp(path.join(SRC, 'logoG.png'))
    .extract({ left: 350, top: 0, width: 600, height: 320 })
    .toBuffer();
  const iconGold = await sharp(iconCropped).trim({ threshold: 5 }).toBuffer();
  const iconMeta = await sharp(iconGold).metadata();
  fs.writeFileSync(path.join(LOGO_OUT, 'logo-icon-gold.png'), iconGold);

  // ── 4. Composição final: ícone dourado sobre o wordmark (branco p/ fundo escuro,
  //      preto p/ fundo claro) — posição medida via scan de pixels do lockup preto:
  //      o ícone ocupa x:86-211, y:0-72 dentro do canvas de 531x268 do lockup. ──
  const ICON_BOX = { left: 86, top: 0, width: 125 };
  const iconResizedBuf = await sharp(iconGold)
    .resize({ width: ICON_BOX.width })
    .toBuffer();
  const iconResizedMeta = await sharp(iconResizedBuf).metadata();

  const composite = (base) =>
    sharp(base)
      .composite([{ input: iconResizedBuf, left: ICON_BOX.left, top: ICON_BOX.top }])
      .png()
      .toBuffer();

  const logoDark = await composite(whiteLockup); // p/ nav/footer/CMS (fundo escuro)
  const logoLight = await composite(blackLockup); // p/ eventuais fundos claros
  fs.writeFileSync(path.join(LOGO_OUT, 'logo-dark-bg.png'), logoDark);
  fs.writeFileSync(path.join(LOGO_OUT, 'logo-light-bg.png'), logoLight);

  console.log('Logos gerados:', {
    lockup: `${blackMeta.width}x${blackMeta.height}`,
    icon: `${iconMeta.width}x${iconMeta.height}`,
    iconResized: `${iconResizedMeta.width}x${iconResizedMeta.height}`,
  });

  // ── 5. Favicons — selo quadrado escuro com o ícone dourado centrado ──
  async function badge(size, iconPadRatio = 0.22) {
    const innerSize = Math.round(size * (1 - iconPadRatio * 2));
    const iconBuf = await sharp(iconGold)
      .resize({ width: innerSize, height: innerSize, fit: 'contain' })
      .toBuffer();
    const iconInfo = await sharp(iconBuf).metadata();
    const left = Math.round((size - iconInfo.width) / 2);
    const top = Math.round((size - iconInfo.height) / 2);
    return sharp({
      create: { width: size, height: size, channels: 4, background: BG },
    })
      .composite([{ input: iconBuf, left, top }])
      .png()
      .toBuffer();
  }

  const sizes = [16, 32, 48, 180, 192, 512];
  const buffers = {};
  for (const size of sizes) {
    buffers[size] = await badge(size);
  }

  fs.writeFileSync(path.join(ICON_OUT, 'favicon-16x16.png'), buffers[16]);
  fs.writeFileSync(path.join(ICON_OUT, 'favicon-32x32.png'), buffers[32]);
  fs.writeFileSync(path.join(ICON_OUT, 'apple-touch-icon.png'), buffers[180]);
  fs.writeFileSync(path.join(ICON_OUT, 'android-chrome-192x192.png'), buffers[192]);
  fs.writeFileSync(path.join(ICON_OUT, 'android-chrome-512x512.png'), buffers[512]);

  const icoSourcePaths = [16, 32, 48].map((size) => {
    const p = path.join(ICON_OUT, `_tmp-favicon-${size}.png`);
    fs.writeFileSync(p, buffers[size]);
    return p;
  });
  const icoBuffer = await pngToIco(icoSourcePaths);
  fs.writeFileSync(path.join(ICON_OUT, 'favicon.ico'), icoBuffer);
  icoSourcePaths.forEach((p) => fs.unlinkSync(p));

  // ── 6. site.webmanifest ──
  const manifest = {
    name: '3DCPX',
    short_name: '3DCPX',
    icons: [
      { src: '/assets/icons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/assets/icons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    theme_color: BG,
    background_color: BG,
    display: 'standalone',
  };
  fs.writeFileSync(path.join(ICON_OUT, 'site.webmanifest'), JSON.stringify(manifest, null, 2));

  console.log('Favicons e manifest gerados em', ICON_OUT);

  // ── 7. Imagem de Open Graph (1200x630) — fundo da identidade + logo branco centrado ──
  const OG_W = 1200;
  const OG_H = 630;
  const ogBg = Buffer.from(`
    <svg width="${OG_W}" height="${OG_H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${BG_2}"/>
          <stop offset="100%" stop-color="${BG}"/>
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="38%" r="55%">
          <stop offset="0%" stop-color="${PURPLE}" stop-opacity="0.22"/>
          <stop offset="100%" stop-color="${PURPLE}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${OG_W}" height="${OG_H}" fill="url(#bg)"/>
      <rect width="${OG_W}" height="${OG_H}" fill="url(#glow)"/>
    </svg>
  `);

  const ogLogo = await sharp(logoDark).resize({ width: 620 }).toBuffer();
  const ogLogoMeta = await sharp(ogLogo).metadata();

  await sharp(ogBg)
    .composite([
      {
        input: ogLogo,
        left: Math.round((OG_W - ogLogoMeta.width) / 2),
        top: Math.round((OG_H - ogLogoMeta.height) / 2),
      },
    ])
    .png()
    .toFile(path.join(OG_OUT, 'og-image.png'));

  console.log('OG image gerada em', path.join(OG_OUT, 'og-image.png'));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
