// WETI PLAY 브랜드 자산 생성 스크립트
// -----------------------------------------------------------------------
// 원본 웨티아빠 캐릭터(OGQ 스티커 제출본)에서 마스코트를 오려내고,
// 파비콘 / 앱 아이콘 / OG 이미지를 만들어 낸다.
// 이 스크립트는 "빌드 타임/로컬 1회성 생성기"이며, 결과물(PNG)만 저장소에
// 커밋되어 사용된다. 배포 서버가 폰트를 갖고 있는지 여부와 무관하게
// 항상 동일한 결과가 보장된다.
//
// 실행: npm run generate:brand
import sharp from "sharp";
import pngToIco from "png-to-ico";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SOURCE = path.join(
  ROOT,
  "wetipapa_ogq_submission_v10",
  "stickers",
  "04_approved.png"
);
const BRAND_ASSETS = path.join(ROOT, "brand", "assets");
const APP_DIR = path.join(ROOT, "app");

// 브랜드 컬러 (brand/tokens.css 와 동일한 값으로 유지할 것)
const COLOR_BG_CREAM = "#fff7ea";
const COLOR_PRIMARY_BRIGHT = "#f0900c";
const COLOR_INK = "#33241c";
const COLOR_INK_SOFT = "#6b5b52";
// 아이콘 배경은 흰색으로 둔다. 원본 스티커가 흰 매트(반투명 가장자리를 흰색과
// 미리 블렌딩한 상태) 위에서 제작되어, 다른 색 배경에 합성하면 경계에
// 흰색 헤일로(fringe)가 그대로 드러난다. 원본 디자이너가 대표 이미지
// (main_240x240.png)에도 흰 배경을 사용한 것과 동일한 처리다.
const COLOR_ICON_BG = "#ffffff";

// 원본 스티커(740x640) 안에서 "이건 인정" 캡션 텍스트를 제외한
// 캐릭터(엄지척 + 반짝임)만의 픽셀 영역. scripts/*(1회성 분석)로 확인함.
const CHAR_BBOX = { left: 166, top: 15, width: 406, height: 419 };

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

async function getCharacterCrop() {
  return sharp(SOURCE).extract(CHAR_BBOX).png().toBuffer();
}

function sparkle(cx, cy, size, fill, opacity = 1) {
  // 웨티아빠 원본 스티커의 반짝임(✦) 모티프를 본뜬 아주 단순한 4방향 별 도형.
  const s = size;
  return `<path opacity="${opacity}" fill="${fill}" d="
    M ${cx} ${cy - s}
    C ${cx + s * 0.12} ${cy - s * 0.12}, ${cx + s * 0.88} ${cy - s * 0.12}, ${cx + s} ${cy}
    C ${cx + s * 0.12} ${cy + s * 0.12}, ${cx + s * 0.12} ${cy + s * 0.88}, ${cx} ${cy + s}
    C ${cx - s * 0.12} ${cy + s * 0.12}, ${cx - s * 0.88} ${cy + s * 0.12}, ${cx - s} ${cy}
    C ${cx - s * 0.12} ${cy - s * 0.12}, ${cx - s * 0.12} ${cy - s * 0.88}, ${cx} ${cy - s}
    Z" />`;
}

async function buildMascotHero(charCrop) {
  // 웹에서 그대로 사용할 마스코트 히어로 이미지: 여백만 살짝 트리밍하고
  // 비율·구도는 원본과 동일하게 유지한다 (얼굴/제스처 잘림 없음).
  const out = path.join(BRAND_ASSETS, "mascot-hero.png");
  await sharp(charCrop)
    .png({ compressionLevel: 9, quality: 90 })
    .toFile(out);
  console.log("✓ brand/assets/mascot-hero.png");
}

async function buildIconMaster(charCrop) {
  const size = 1024;
  const meta = await sharp(charCrop).metadata();
  const scale = Math.min((size * 0.82) / meta.width, (size * 0.82) / meta.height);
  const charW = Math.round(meta.width * scale);
  const charH = Math.round(meta.height * scale);
  const resizedChar = await sharp(charCrop).resize(charW, charH).toBuffer();

  const bg = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: COLOR_ICON_BG,
    },
  })
    .png()
    .toBuffer();

  const left = Math.round((size - charW) / 2);
  const top = Math.round((size - charH) / 2 + size * 0.03);

  // 흰 배경만으로는 탭/즐겨찾기 목록에서 존재감이 약하므로, 캐릭터 가장자리와
  // 떨어진(=흰색 프린지가 보이지 않는) 안쪽에 브랜드 컬러 라운드 프레임을 두른다.
  const frameInset = 56;
  const frameRadius = 220;
  const frameStroke = 40;
  const frameSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <rect x="${frameInset}" y="${frameInset}" width="${size - frameInset * 2}" height="${size - frameInset * 2}"
      rx="${frameRadius}" fill="none" stroke="${COLOR_PRIMARY_BRIGHT}" stroke-width="${frameStroke}" />
  </svg>`;
  const frameBuf = await sharp(Buffer.from(frameSvg)).png().toBuffer();

  const composed = await sharp(bg)
    .composite([
      { input: frameBuf, left: 0, top: 0 },
      { input: resizedChar, left, top },
    ])
    .png()
    .toBuffer();

  await ensureDir(BRAND_ASSETS);
  await sharp(composed).toFile(path.join(BRAND_ASSETS, "mascot-icon-master.png"));
  console.log("✓ brand/assets/mascot-icon-master.png (1024x1024)");
  return composed;
}

async function buildFavicons(iconMasterBuffer) {
  await ensureDir(APP_DIR);

  // app/icon.png — 최신 브라우저 탭/PWA 아이콘 (Next.js 메타데이터 컨벤션)
  await sharp(iconMasterBuffer).resize(512, 512).png().toFile(path.join(APP_DIR, "icon.png"));
  console.log("✓ app/icon.png (512x512)");

  // public/icon-*.png — manifest.ts(웹 앱 매니페스트)가 안정적인 고정 경로로
  // 참조할 수 있도록 public 폴더에도 같은 아이콘을 별도로 둔다.
  const PUBLIC_DIR = path.join(ROOT, "public");
  await ensureDir(PUBLIC_DIR);
  await sharp(iconMasterBuffer).resize(192, 192).png().toFile(path.join(PUBLIC_DIR, "icon-192.png"));
  await sharp(iconMasterBuffer).resize(512, 512).png().toFile(path.join(PUBLIC_DIR, "icon-512.png"));
  console.log("✓ public/icon-192.png, public/icon-512.png");

  // app/apple-icon.png — iOS 홈 화면 아이콘 (불투명 정사각형)
  await sharp(iconMasterBuffer)
    .resize(180, 180)
    .flatten({ background: COLOR_ICON_BG })
    .png()
    .toFile(path.join(APP_DIR, "apple-icon.png"));
  console.log("✓ app/apple-icon.png (180x180)");

  // favicon.ico — 구형 브라우저/북마크용 멀티 사이즈 ICO
  const png16 = await sharp(iconMasterBuffer).resize(16, 16).png().toBuffer();
  const png32 = await sharp(iconMasterBuffer).resize(32, 32).png().toBuffer();
  const png48 = await sharp(iconMasterBuffer).resize(48, 48).png().toBuffer();
  const icoBuffer = await pngToIco([png16, png32, png48]);
  await writeFile(path.join(APP_DIR, "favicon.ico"), icoBuffer);
  console.log("✓ app/favicon.ico (16/32/48)");
}

async function buildOpenGraphImage(charCrop) {
  const width = 1200;
  const height = 630;
  const meta = await sharp(charCrop).metadata();
  const ogCharH = Math.round(height * 0.92);
  const ogCharW = Math.round(meta.width * (ogCharH / meta.height));
  const mascotBuf = await sharp(charCrop).resize(ogCharW, ogCharH).toBuffer();

  const svgBg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FFF7EA" />
        <stop offset="100%" stop-color="#FFE4C2" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)" />
    <circle cx="1030" cy="120" r="210" fill="#FFE4C2" opacity="0.6" />
    <circle cx="120" cy="560" r="160" fill="#DCEBFA" opacity="0.55" />
    ${sparkle(150, 110, 26, COLOR_PRIMARY_BRIGHT, 0.9)}
    ${sparkle(1000, 470, 20, "#7C4FE0", 0.55)}
    ${sparkle(210, 470, 16, "#C23C0C", 0.5)}
    <text x="72" y="230" font-family="Malgun Gothic, sans-serif" font-weight="700" font-size="82" fill="${COLOR_INK}">WETI PLAY</text>
    <text x="76" y="288" font-family="Malgun Gothic, sans-serif" font-weight="700" font-size="40" fill="${COLOR_PRIMARY_BRIGHT}">웨티플레이</text>
    <text x="76" y="352" font-family="Malgun Gothic, sans-serif" font-weight="400" font-size="30" fill="${COLOR_INK_SOFT}">아이와 함께 놀면서 배우는</text>
    <text x="76" y="392" font-family="Malgun Gothic, sans-serif" font-weight="400" font-size="30" fill="${COLOR_INK_SOFT}">웨티아빠 학습 놀이터</text>
    <text x="76" y="452" font-family="Malgun Gothic, sans-serif" font-weight="700" font-size="22" fill="${COLOR_INK}">WETI PLAY by 웨티아빠</text>
  </svg>`;

  const bgBuffer = await sharp(Buffer.from(svgBg)).png().toBuffer();

  const left = width - ogCharW - 40;
  const top = height - ogCharH;

  await ensureDir(APP_DIR);
  await sharp(bgBuffer)
    .composite([{ input: mascotBuf, left, top }])
    .png()
    .toFile(path.join(APP_DIR, "opengraph-image.png"));
  console.log("✓ app/opengraph-image.png (1200x630)");
}

async function main() {
  await ensureDir(BRAND_ASSETS);
  const charCrop = await getCharacterCrop();
  await buildMascotHero(charCrop);
  const iconMaster = await buildIconMaster(charCrop);
  await buildFavicons(iconMaster);
  await buildOpenGraphImage(charCrop);
  console.log("\n브랜드 자산 생성 완료.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
