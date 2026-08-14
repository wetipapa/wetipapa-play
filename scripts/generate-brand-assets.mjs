// WTPP PLAY 브랜드 자산 생성 스크립트
// -----------------------------------------------------------------------
// brand/source/ 의 확정 원본에서 마스코트 히어로 / 파비콘 / 앱 아이콘 /
// OG 이미지를 만들어 낸다.
// 이 스크립트는 "빌드 타임/로컬 1회성 생성기"이며, 결과물(PNG)만 저장소에
// 커밋되어 사용된다. 배포 서버가 폰트를 갖고 있는지 여부와 무관하게
// 항상 동일한 결과가 보장된다.
//
// 실행: npm run generate:brand
//
// 원본의 출처
// -----------------------------------------------------------------------
// brand/source/ 의 두 파일은 Wetipapa/brand-assets/confirmed/ 에서 복사해 온
// 사본이다. 원본을 고칠 일이 있으면 brand-assets 쪽을 고치고 다시 복사한다.
// (각 프로젝트는 독립 배포되므로 brand-assets를 코드에서 직접 참조할 수 없다.)
//
//   wtpp_symbol_color.png            confirmed/ci/                WTPP 대표 심벌
//   wetipapa_weti_together_01.png    confirmed/character-fullbody/ 아빠+웨티 합본 컷
//
// 2026-08-14 변경: 파비콘·앱 아이콘의 원본을 OGQ 리액션 스티커(04_approved)에서
// 공식 컬러 심벌로 교체했다. 상위 문서(brand-assets/BRAND_GUIDE.md §4.3·§6.1)가
// 공식 표식 자리에 리액션 캐릭터를 단독으로 쓰지 않기로 정했기 때문이다.
// 히어로도 같은 이유로 "아빠와 아이가 함께"가 보이는 합본 컷으로 바꿨다.
import sharp from "sharp";
import pngToIco from "png-to-ico";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SOURCE_DIR = path.join(ROOT, "brand", "source");
// 대표 CI가 WTPP로 바뀌면서 파비콘·앱 아이콘·OG가 모두 WTPP 마스터 심벌을 쓴다.
const SOURCE_SYMBOL = path.join(SOURCE_DIR, "wtpp_symbol_color.png");
const SOURCE_TOGETHER = path.join(SOURCE_DIR, "wetipapa_weti_together_01.png");
const BRAND_ASSETS = path.join(ROOT, "brand", "assets");
const APP_DIR = path.join(ROOT, "app");

// 브랜드 컬러 (brand/tokens.css 와 동일한 값으로 유지할 것)
const COLOR_BG_CREAM = "#fff7ea";
const COLOR_PRIMARY_BRIGHT = "#f0900c";
const COLOR_NAVY = "#013075";
const COLOR_INK = "#33241c";
const COLOR_INK_SOFT = "#6b5b52";
// 아이콘 배경은 흰색으로 둔다. 심벌 자체가 네이비 라운드 타일을 갖고 있어서
// 배경까지 색을 넣으면 타일 경계가 뭉개진다.
const COLOR_ICON_BG = "#ffffff";

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

// 투명 여백을 걷어내고 알파가 있는 픽셀 영역만 남긴다.
// 원본마다 여백이 제각각이라, 크기 계산 전에 항상 이 기준으로 맞춘다.
async function trimToContent(file) {
  return sharp(file).trim({ threshold: 1 }).png().toBuffer();
}

function sparkle(cx, cy, size, fill, opacity = 1) {
  // 웨티아빠 공식 심벌의 반짝임(✦) 모티프를 본뜬 아주 단순한 4방향 별 도형.
  const s = size;
  return `<path opacity="${opacity}" fill="${fill}" d="
    M ${cx} ${cy - s}
    C ${cx + s * 0.12} ${cy - s * 0.12}, ${cx + s * 0.88} ${cy - s * 0.12}, ${cx + s} ${cy}
    C ${cx + s * 0.12} ${cy + s * 0.12}, ${cx + s * 0.12} ${cy + s * 0.88}, ${cx} ${cy + s}
    C ${cx - s * 0.12} ${cy + s * 0.12}, ${cx - s * 0.88} ${cy + s * 0.12}, ${cx - s} ${cy}
    C ${cx - s * 0.12} ${cy - s * 0.12}, ${cx - s * 0.12} ${cy - s * 0.88}, ${cx} ${cy - s}
    Z" />`;
}

async function buildMascotHero() {
  // 웹에서 그대로 사용할 히어로 이미지: 투명 여백만 걷어내고 비율·구도는
  // 원본과 동일하게 유지한다 (얼굴/포즈 잘림 없음).
  // 투명 배경을 유지하는 이유: 히어로가 얹히는 자리가 크림 그라데이션이라
  // 흰 사각형이 보이면 안 된다. 캐릭터 안쪽은 흰색으로 채워져 있어서
  // 브라우저 강제 다크모드에서도 흰 실루엣으로 남아 그림이 묻히지 않는다.
  const trimmed = await trimToContent(SOURCE_TOGETHER);
  const out = path.join(BRAND_ASSETS, "mascot-hero.png");
  await ensureDir(BRAND_ASSETS);
  await sharp(trimmed).png({ compressionLevel: 9 }).toFile(out);
  const meta = await sharp(trimmed).metadata();
  console.log(`✓ brand/assets/mascot-hero.png (${meta.width}x${meta.height})`);
  return trimmed;
}

async function buildIconMaster() {
  const size = 1024;
  const symbol = await trimToContent(SOURCE_SYMBOL);
  const meta = await sharp(symbol).metadata();

  // 심벌이 이미 라운드 타일 형태라 별도 프레임을 두르지 않는다.
  // 캔버스의 96%까지 키운다. 여백을 더 두면 16~32px 파비콘에서 두 얼굴이 뭉개지고,
  // iOS 홈 화면에서도 다른 앱 아이콘보다 작아 보인다.
  const scale = Math.min((size * 0.96) / meta.width, (size * 0.96) / meta.height);
  const symW = Math.round(meta.width * scale);
  const symH = Math.round(meta.height * scale);
  const resized = await sharp(symbol).resize(symW, symH).toBuffer();

  const bg = await sharp({
    create: { width: size, height: size, channels: 4, background: COLOR_ICON_BG },
  })
    .png()
    .toBuffer();

  const composed = await sharp(bg)
    .composite([
      {
        input: resized,
        left: Math.round((size - symW) / 2),
        top: Math.round((size - symH) / 2),
      },
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

async function buildOpenGraphImage(heroBuffer) {
  const width = 1200;
  const height = 630;
  const meta = await sharp(heroBuffer).metadata();
  const ogCharH = Math.round(height * 0.9);
  const ogCharW = Math.round(meta.width * (ogCharH / meta.height));
  const mascotBuf = await sharp(heroBuffer).resize(ogCharW, ogCharH).toBuffer();

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
    <text x="72" y="238" font-family="Malgun Gothic, sans-serif" font-weight="700" font-size="86" fill="${COLOR_NAVY}">WTPP</text>
    <text x="76" y="300" font-family="Malgun Gothic, sans-serif" font-weight="700" font-size="44" fill="${COLOR_PRIMARY_BRIGHT}">PLAY</text>
    <text x="76" y="368" font-family="Malgun Gothic, sans-serif" font-weight="400" font-size="30" fill="${COLOR_INK_SOFT}">아이와 함께 놀면서 배우는</text>
    <text x="76" y="408" font-family="Malgun Gothic, sans-serif" font-weight="400" font-size="30" fill="${COLOR_INK_SOFT}">학습 놀이터</text>
  </svg>`;

  const bgBuffer = await sharp(Buffer.from(svgBg)).png().toBuffer();

  const left = width - ogCharW - 56;
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
  const hero = await buildMascotHero();
  const iconMaster = await buildIconMaster();
  await buildFavicons(iconMaster);
  await buildOpenGraphImage(hero);
  console.log("\n브랜드 자산 생성 완료.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
