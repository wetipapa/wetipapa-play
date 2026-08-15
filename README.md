# WTPP PLAY

> 아이와 함께 놀면서 배우는 웨티파파 학습 놀이터

웨티파파가 만든 어린이 학습 서비스를 한곳에서 선택할 수 있는 통합 홈페이지다.
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
scripts/             브랜드 자산 생성 스크립트
```

## 광고를 붙일 때

애드센스를 받을 수 있는 상태로 맞춰 뒀다. 승인 전에 스크립트를 실어 두면
심사에서 어긋나 보이므로 **환경변수가 있을 때만 켜지게** 만들었다.

### 승인 뒤 할 일

1. Vercel 환경변수에 `NEXT_PUBLIC_ADSENSE_CLIENT`를 넣는다 (`ca-pub-...` 형식)
2. `public/ads.txt`의 `pub-0000000000000000`을 실제 게시자 ID로 바꾼다
3. **AdSense 콘솔에서 이 사이트를 아동 대상 콘텐츠로 표시한다**

### 3번을 빼먹으면 안 된다

이 사이트는 일곱 살 전후 아이를 위한 학습 게임 모음이다. 아동 대상 사이트는
이용자의 관심사를 따라다니는 **개인 맞춤 광고를 쓸 수 없다.**
코드에서는 `components/AdSense.tsx`가 `requestNonPersonalizedAds = 1`로 막아 두지만,
**콘솔에서도 표시해야** 정책을 지킨 것이 된다. 표시하지 않으면 계정이 정지될 수 있다.

### 광고를 넣는 자리와 넣지 않는 자리

| 자리 | 광고 | 왜 |
|---|---|---|
| 이 허브, 안내·정책 문서 | ○ | 부모가 보는 화면이다 |
| 각 게임(pop·clock·slice·length·racing·voca) | **✗** | 아이가 노는 화면이다. 정책도 위험하고, 게임 중에 눈에 띄는 것은 한 판을 끝내기 전에 빠져나가게 만든다 |

게임은 각자 다른 도메인이라 애드센스 심사도 사이트마다 따로 받는다.
**게임 쪽은 아예 신청하지 않는다.**

### 심사에서 걸리는 것

승인 거절의 가장 흔한 이유는 **읽을 내용이 없는 사이트**다. 그래서 카드 목록만
있던 한 장짜리 사이트에 다음을 만들었다.

- `/games/[id]` — 게임마다 무엇을 배우고 어떻게 노는지, 만들며 정한 것과 그 이유
- `/about` — 누가 왜 만들었나, 만들 때 지키는 것
- `/privacy` — 개인정보처리방침. **광고를 붙이려면 반드시 있어야 한다**
- `/terms` — 이용약관
- `/contact` — 문의 창구

게임 안내 글은 `config/gameGuides.ts`에 있다. 새 게임을 허브에 올릴 때
여기에도 한 항목을 쓰면 안내 페이지와 사이트맵에 자동으로 들어간다.

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

`config/channels.ts`에 채널 하나만 추가하면 "웨티파파 더 만나기" 섹션과
Footer 보조 링크에 함께 노출된다.

```ts
// config/channels.ts
export const channels: WetiChannel[] = [
  // ...기존 채널들
  {
    id: "youtube",
    name: "웨티파파 유튜브",
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
