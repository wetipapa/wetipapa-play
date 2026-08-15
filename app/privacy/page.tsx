import type { Metadata } from "next";
import DocPage from "@/components/DocPage";
import { docStyles as s } from "@/components/DocPage";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description:
    "WTPP PLAY와 학습 게임들이 어떤 정보를 다루는지 정리했습니다. 게임 기록은 기기에만 남고 회원가입이 없습니다.",
};

/**
 * 개인정보처리방침.
 *
 * 광고를 붙이려면 반드시 있어야 하는 문서다. 광고 제공자가 쿠키와 기기 식별자를
 * 쓴다는 사실, 그리고 이용자가 그걸 끌 수 있다는 것을 알려야 한다.
 *
 * **사실만 적는다.** 실제로 안 하는 수집을 "할 수도 있다"고 넓게 써 두면
 * 부모가 읽고 불안해할 이유만 만든다. 지금 이 서비스들은 회원가입이 없고
 * 게임 기록은 브라우저 안에만 남는다. 그게 강점이라 그대로 쓴다.
 */
export default function Privacy() {
  return (
    <DocPage
      kicker="정책"
      title="개인정보처리방침"
      lead="아이가 쓰는 서비스라 무엇을 다루고 무엇을 안 다루는지 분명히 적었습니다."
      updated="2026년 8월 15일"
    >
      <div className={s.callout}>
        <p>
          <strong>회원가입이 없습니다.</strong> 이름·나이·연락처 같은 정보를 묻지 않고,
          게임 점수와 설정은 아이가 쓰는 기기의 브라우저 안에만 남습니다. 저희 서버로 보내지 않습니다.
        </p>
      </div>

      <h2>1. 무엇을 다루나</h2>
      <table>
        <thead>
          <tr>
            <th>구분</th>
            <th>무엇을</th>
            <th>어디에 남나</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>게임 기록</td>
            <td>최고 점수, 난이도·소리 설정, 틀린 문제 기록</td>
            <td>기기의 브라우저 저장소(localStorage). 서버로 보내지 않습니다</td>
          </tr>
          <tr>
            <td>방문 통계</td>
            <td>페이지 조회수, 대략적인 국가·기기 종류·유입 경로</td>
            <td>Vercel Web Analytics. 쿠키를 쓰지 않고 개인을 식별하지 않습니다</td>
          </tr>
          <tr>
            <td>단어 뚝딱의 사진</td>
            <td>단어 시험지 사진에서 글자를 읽어 문제를 만듭니다</td>
            <td>처리에만 쓰고 따로 저장하지 않습니다. 자세한 내용은 아래 4번</td>
          </tr>
          <tr>
            <td>광고</td>
            <td>광고를 보여주기 위한 쿠키·기기 식별자</td>
            <td>광고 제공자. 자세한 내용은 아래 3번</td>
          </tr>
        </tbody>
      </table>

      <h2>2. 기기에 남는 기록을 지우려면</h2>
      <p>
        브라우저 설정에서 해당 사이트의 데이터를 지우면 점수와 설정이 함께 사라집니다.
        게임 안의 <strong>기록 지우기</strong>를 눌러도 됩니다. 지운 기록은 되돌릴 수 없습니다.
      </p>

      <h2>3. 광고에 관하여</h2>
      <p>
        이 사이트는 Google이 제공하는 광고를 실을 수 있습니다. Google을 비롯한 제3자 광고 제공자는
        쿠키나 기기 식별자를 사용해 광고를 보여주고, 광고가 몇 번 보였는지를 셉니다.
      </p>
      <p>
        <strong>이 사이트는 아이를 위한 서비스입니다.</strong> 그래서 아동 대상 사이트로 표시해 두고,
        이용자의 관심사를 따라다니며 맞추는 <strong>개인 맞춤 광고를 쓰지 않습니다.</strong>
        광고는 페이지 내용에 맞춰서만 보여줍니다.
      </p>
      <p>
        <strong>아이가 노는 게임 화면에는 광고를 넣지 않습니다.</strong> 광고는 부모가 보는
        이 허브와 안내 문서에만 둡니다.
      </p>
      <p>
        Google이 광고에 데이터를 쓰는 방식은{" "}
        <a href="https://policies.google.com/technologies/ads?hl=ko" target="_blank" rel="noopener noreferrer">
          Google 광고 정책
        </a>
        에서 볼 수 있고,{" "}
        <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">
          Google 광고 설정
        </a>
        에서 직접 끌 수 있습니다.
      </p>

      <h2>4. 단어 뚝딱의 사진 처리</h2>
      <p>
        <a href="https://voca.wetipapa.com" target="_blank" rel="noopener noreferrer">
          단어 뚝딱
        </a>
        은 올린 사진에서 단어를 읽어 시험 문제를 만듭니다. 이때 사진은 문제를 만드는 동안에만
        외부 인공지능 서비스(Anthropic)로 전달되며, 저희 쪽에 따로 저장하지 않습니다.
        만들어진 문제는 이용자의 기기에 남습니다.
      </p>
      <p>
        <strong>사진에 아이 이름이나 학교 이름이 보이면 가려서 찍어 주세요.</strong>
        문제를 만드는 데는 단어만 있으면 됩니다.
      </p>

      <h2>5. 아동의 개인정보</h2>
      <p>
        만 14세 미만 아동에게서 개인정보를 수집하지 않습니다. 회원가입도, 이름·연락처를 묻는 곳도 없습니다.
        아이가 쓰는 화면에서 개인정보를 입력받는 기능은 만들지 않습니다.
      </p>

      <h2>6. 문의</h2>
      <p>
        이 방침에 대해 궁금한 점이나 고쳐야 할 곳이 있으면 <a href="/contact">문의</a> 페이지의
        창구로 알려 주세요. 확인하고 바로 고치겠습니다.
      </p>

      <h2>7. 방침이 바뀌면</h2>
      <p>
        내용이 바뀌면 이 페이지에 새로 적고 맨 아래 날짜를 고칩니다. 중요한 변경은 블로그로도 알립니다.
      </p>
    </DocPage>
  );
}
