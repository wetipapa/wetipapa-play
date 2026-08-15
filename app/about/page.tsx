import type { Metadata } from "next";
import DocPage, { docStyles as s } from "@/components/DocPage";
import { getVisibleServices } from "@/config/services";
import { gameGuides } from "@/config/gameGuides";

export const metadata: Metadata = {
  title: "소개",
  description: "WTPP PLAY는 아빠가 일곱 살 아들과 쓰려고 만든 학습 놀이 모음입니다. 왜 만들었고 무엇을 지키며 만드는지 적었습니다.",
};

/**
 * 소개.
 *
 * "누가 왜 만들었나"를 사실대로 쓴다. 교육 회사 흉내를 내면 오히려 못 믿는다.
 * 아이 하나를 보고 만든 것이고, 그래서 정한 규칙이 있다는 것이 이 서비스의 성격이다.
 */
export default function About() {
  const games = getVisibleServices().filter((x) => x.url);

  return (
    <DocPage
      kicker="소개"
      title="WTPP PLAY는 어떤 곳인가"
      lead="아빠가 일곱 살 아들과 쓰려고 만든 학습 놀이 모음입니다."
    >
      <h2>왜 만들었나</h2>
      <p>
        구구단을 외우기 싫어하는 아들에게 노래도 통하지 않았습니다. 문제집을 더 사 오는 대신
        게임을 하나 만들어 봤고, 처음에는 시큰둥하더니 고치고 또 고치니까 어느 날 &ldquo;한 판만
        더&rdquo;라고 했습니다. 그 뒤로 시계·분수·길이·영어 단어로 하나씩 늘어났습니다.
      </p>
      <p>
        <strong>아이 한 명을 보고 만든 것</strong>이 이 서비스의 성격입니다. 아이가 어려워하면
        난이도를 고치고, 지루해하면 연출을 바꿉니다. 레이싱의 우주 맵처럼 아이가 낸 아이디어가
        그대로 들어간 것도 있습니다.
      </p>

      <h2>만들 때 지키는 것</h2>
      <div className={s.callout}>
        <p>
          <strong>회원가입도 결제도 없습니다.</strong> 기록은 기기 안에만 남고 서버로 보내지 않습니다.
        </p>
      </div>
      <ul>
        <li>
          <strong>설명을 읽기 전에 시작할 수 있어야 한다.</strong> 첫 화면에서 다음에 누를 것이
          눈에 바로 보여야 하고, 튜토리얼을 먼저 읽어야 시작되는 구조는 만들지 않습니다.
        </li>
        <li>
          <strong>틀려도 막다른 길을 만들지 않는다.</strong> 한 번 틀리면 끝나는 게임은 아이가
          다시 켜지 않습니다. 고칠 기회를 남겨 둡니다.
        </li>
        <li>
          <strong>못한 것을 크게 세지 않는다.</strong> 결과 화면에서 틀린 개수를 크게 띄우면
          한 판으로 끝납니다. 다시 하고 싶어지는 것이 먼저입니다.
        </li>
        <li>
          <strong>아이가 노는 화면에 광고와 바깥 링크를 넣지 않는다.</strong> 눈에 띄면 한 판을
          끝내기 전에 빠져나갑니다.
        </li>
        <li>
          <strong>모바일이 먼저.</strong> 아이는 부모 폰으로 접속합니다. 터치 영역과 글자를 크게 두고
          가로 스크롤을 만들지 않습니다.
        </li>
      </ul>

      <h2>지금 있는 게임</h2>
      <ul>
        {games.map((g) => (
          <li key={g.id}>
            {gameGuides[g.id] ? <a href={`/games/${g.id}`}>{g.name}</a> : g.name} — {g.tagline}
            {gameGuides[g.id] && ` (${gameGuides[g.id]!.ages})`}
          </li>
        ))}
      </ul>

      <h2>만드는 사람</h2>
      <p>
        웨티파파. 블로그에는 아들 웨티와 있었던 일을 소소하게 남기고, 스레드에는 새로 만든 것을
        먼저 올립니다. 두 곳 다 댓글이 열려 있습니다 — <a href="/contact">문의</a>에 창구를 모아 뒀습니다.
      </p>

      <h2>돈은 어떻게 버나</h2>
      <p>
        게임은 전부 무료입니다. 서버 비용과 도메인 비용을 감당하려고 이 허브와 안내 문서에
        광고를 실을 수 있습니다. <strong>아이가 노는 게임 화면에는 넣지 않습니다.</strong>
        자세한 내용은 <a href="/privacy">개인정보처리방침</a>에 적어 두었습니다.
      </p>
    </DocPage>
  );
}
