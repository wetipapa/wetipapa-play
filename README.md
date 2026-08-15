# WTPP PLAY

> 아이와 함께 놀면서 배우는 웨티아빠 학습 놀이터

웨티아빠가 만든 어린이 학습 서비스를 한곳에서 선택할 수 있는 통합 홈페이지다.
로그인·백엔드·데이터베이스 없이, 정적으로 빌드되는 Next.js 앱으로
[Vercel](https://vercel.com)에 배포한다.

- 공식 도메인: https://play.wetipapa.com
- 브랜드 가이드: [`BRAND_GUIDE.md`](./BRAND_GUIDE.md)

## 연결된 학습 서비스

| 서비스 | 설명 | 주소 |
| --- | --- | --- |
| 단어 뚝딱 | 사진으로 만드는 나만의 영어단어장 | https://voca.wetipapa.com |
| 구구단 레이싱 | 구구단을 풀고 부스터로 달려요 | https://racing.wetipapa.com |
| 시계탐험대 | 시곗바늘을 움직이며 시간을 배워요 | https://clock.wetipapa.com |

## 기술 스택

- **Next.js 16 (App Router) + TypeScript** — Vercel과 가장 궁합이 좋고,
  파일 기반 라우팅/메타데이터 API(SEO, OG, 파비콘, sitemap, 404)를
  그대로 활용할 수 있어 별도 설정 없이도 "빠르고 배포하기 쉬운" 목표에 부합한다.
- **일반 CSS + CSS Modules** — 별도 UI 프레임워크 없이 `brand/tokens.css`의
  디자인 토큰(CSS 커스텀 프로퍼티)만으로 전체 톤앤매너를 관리한다.
  빌드 설정이 단순하고, 상태 관리 라이브러리도 필요 없다(전부 서버
  컴포넌트 + 정적 데이터).
- **`@vercel/analytics`** — Vercel Web Analytics.

## 시작하기

```bash
npm install
npm run dev       # http://localhost:3000
```

## 빌드 / 배포

```bash
npm run build      # 프로덕션 빌드
npm run start       # 빌드 결과 로컬 실행 (선택)
```

Vercel에 이 저장소를 연결하면 `next build`가 자동으로 실행된다. 별도의
환경변수나 백엔드 설정이 필요 없다.

### 브랜드 자산 재생성

파비콘/앱 아이콘/OG 이미지는 원본 마스코트 이미지로부터 생성된
산출물이다. 원본을 교체하거나 다시 만들고 싶다면:

```bash
npm run generate:brand
```

자세한 내용은 `scripts/generate-brand-assets.mjs`와 `BRAND_GUIDE.md` 참고.

## 프로젝트 구조

```
app/                Next.js App Router (페이지, 레이아웃, 메타데이터, 404)
components/          재사용 UI 컴포넌트 (ServiceCard, Header, Footer 등)
config/              중앙 데이터 — 서비스 목록 / SNS 채널 목록
brand/               브랜드 원본 자산 (토큰, 마스코트, 가이드가 참조하는 이미지)
wetipapa_ogq_submission_v10/   웨티아빠 원본 캐릭터 소스 (수정 금지, 보존용)
scripts/             브랜드 자산 생성 스크립트
```

## 새 서비스 추가하기

페이지 코드를 건드릴 필요 없이 **`config/services.ts` 배열에 객체 하나만
추가**하면 홈 화면 카드 그리드에 자동으로 나타난다.

```ts
// config/services.ts
import { ClockIcon, RacingIcon, VocaIcon } from "@/components/icons";
// 1. 새 서비스용 아이콘을 components/icons.tsx에 추가하고 여기서 import

export const services: WetiService[] = [
  // ...기존 서비스들
  {
    id: "math",                       // 내부 식별자 (고유값)
    name: "웨티 매쓰",                  // 한글 서비스명
    nameEn: "WETI MATH",
    tagline: "숫자 친구들과 노는 수학 놀이",   // 카드에 크게 보이는 한 줄
    description: "덧셈과 뺄셈을 게임처럼 익혀요.", // 부모용 상세 설명
    url: "https://math.wetipapa.com",   // 실제 서비스 주소
    ctaLabel: "수학 놀이 시작",           // 카드 버튼 문구
    status: "live",                    // "live" | "coming-soon"
    badge: "NEW",                       // "NEW" | "추천" | "준비중" | 생략 가능
    category: "수학",
    accent: "math",                     // brand/tokens.css에 같은 이름 색상 세트 추가
    icon: MathIcon,
    order: 4,                           // 노출 순서 (숫자가 작을수록 먼저)
  },
];
```

포인트 컬러가 새로 필요하면 `brand/tokens.css`에 `--wp-color-math` /
`-math-tint` / `-math-ink` 세 변수를 추가한다(대비 기준은
`BRAND_GUIDE.md` §3 참고).

**"준비 중" 서비스**는 `status: "coming-soon"`으로 두고 `url`을
생략하면, 링크 없는 비활성 카드로 자동 표시된다(배지도 자동으로
"준비중"이 붙는다).

그리드는 `repeat(auto-fit, minmax(...))` 기반이라 서비스가 3개든
6개든 자연스럽게 줄바꿈되며 늘어난다. 별도 레이아웃 수정이 필요 없다.

## 새 SNS/콘텐츠 채널 추가하기

`config/channels.ts`에 채널 하나만 추가하면 "웨티아빠 더 만나기" 섹션과
Footer 보조 링크에 함께 노출된다.

```ts
// config/channels.ts
export const channels: WetiChannel[] = [
  // ...기존 채널들
  {
    id: "youtube",
    name: "웨티아빠 유튜브",
    reason: "아이와 함께한 순간을 영상으로 만나보세요",
    url: "https://youtube.com/@wetipapa",   // 확인된 주소만 입력할 것
    ctaLabel: "채널 구경하기",
    icon: YoutubeIcon,                       // components/icons.tsx에 추가
    order: 3,
  },
];
```

`url`이 비어 있는(`undefined`) 채널은 자동으로 화면에서 숨겨진다 —
주소가 확정되지 않은 채널을 실수로 노출하는 것을 막기 위한 안전장치다.

## 검증 체크리스트

- [x] `npm run dev` 정상 실행
- [x] `npm run build` 프로덕션 빌드 성공
- [x] 서비스 3개 링크 정확성 확인 (voca / racing / clock)
- [x] 블로그 / Threads 링크 정확성 확인
- [x] 모바일(375~430px) / 태블릿(820px) / 데스크톱(1440px) 레이아웃 확인
- [x] 서비스 4개 이상일 때 그리드 확장 확인 (임시 카드로 검증 후 제거)
- [x] 브라우저 콘솔 에러 없음
- [x] Analytics는 `app/layout.tsx`에 1회만 삽입
