import Script from "next/script";

/**
 * AdSense 스크립트.
 *
 * **환경변수 `NEXT_PUBLIC_ADSENSE_CLIENT`가 있을 때만 켜진다.** 승인 전에 스크립트가
 * 먼저 실려 있으면 심사에서 "광고가 이미 붙었는데 게시자 ID가 안 맞는" 상태로 보이고,
 * 개발할 때도 매번 외부 요청이 나간다. 승인 뒤 Vercel에 값 하나만 넣으면 켜진다.
 * (값 형식: `ca-pub-0000000000000000`)
 *
 * ## 아이가 쓰는 서비스라는 것
 *
 * 이 사이트는 일곱 살 전후 아이를 위한 학습 게임 모음이다. 그래서
 * **관심사를 따라다니며 맞추는 개인 맞춤 광고를 쓰지 않는다.**
 * `requestNonPersonalizedAds = 1`이 그 설정이고, 광고는 페이지 내용에 맞춰서만 나온다.
 *
 * 코드만으로는 부족하다. **AdSense 콘솔에서도 이 사이트를 아동 대상 콘텐츠로
 * 표시해야 한다.** 표시하지 않으면 정책 위반으로 계정이 정지될 수 있다.
 * 자세한 배경은 `README.md`의 「광고를 붙일 때」를 볼 것.
 */
export default function AdSense() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  if (!client) return null;

  return (
    <>
      <Script id="adsense-config" strategy="beforeInteractive">
        {`window.adsbygoogle = window.adsbygoogle || []; window.adsbygoogle.requestNonPersonalizedAds = 1;`}
      </Script>
      <Script
        id="adsense"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      />
    </>
  );
}
