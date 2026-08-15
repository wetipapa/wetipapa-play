import type { Metadata } from "next";
import DocPage, { docStyles as s } from "@/components/DocPage";
import { channels } from "@/config/channels";

export const metadata: Metadata = {
  title: "문의",
  description: "WTPP PLAY에 대한 문의, 오류 제보, 만들었으면 하는 게임 제안을 받는 곳입니다.",
};

/**
 * 문의.
 *
 * 폼을 만들지 않는다. 받은 글이 쌓이는 곳을 따로 관리해야 하고,
 * 아이 서비스라 폼에 개인정보가 적혀 들어오는 것도 원치 않는다.
 * **이미 답이 도착하는 창구**(블로그 댓글·스레드 DM)로 보낸다.
 *
 * 이메일 주소는 일부러 적지 않았다. 개인 주소를 웹에 그대로 올리면 수집 로봇에
 * 그대로 긁힌다. 필요해지면 별도 주소를 만들어 여기에 넣는다.
 */
export default function Contact() {
  return (
    <DocPage
      kicker="연락"
      title="문의"
      lead="고장 난 곳, 틀린 문제, 있었으면 하는 게임 — 무엇이든 알려 주세요. 직접 읽고 고칩니다."
      updated="2026년 8월 15일"
    >
      <div className={s.callout}>
        <p>
          만드는 사람이 한 명이라 답이 하루이틀 걸릴 수 있습니다. 그래도 <strong>전부 읽습니다.</strong>
        </p>
      </div>

      <h2>어디로 보내면 되나</h2>
      <ul>
        {channels.map((c) => (
          <li key={c.id}>
            <a href={c.url} target="_blank" rel="noopener noreferrer">
              {c.name}
            </a>{" "}
            — {c.reason}
          </li>
        ))}
      </ul>

      <h2>이렇게 알려 주시면 빨리 고칩니다</h2>
      <ul>
        <li>어느 게임인지 (구구단 팡팡, 시계탐험대 …)</li>
        <li>무엇을 하다가 그랬는지 (예: 정답을 넣고 팡 버튼을 눌렀을 때)</li>
        <li>어떤 기기인지 (아이폰·안드로이드·컴퓨터, 크롬·사파리)</li>
        <li>화면 사진 한 장이 있으면 가장 빠릅니다</li>
      </ul>

      <h2>이런 것도 환영합니다</h2>
      <ul>
        <li>아이가 어려워한 부분 — 난이도를 고치는 근거가 됩니다</li>
        <li>있었으면 하는 학습 주제 — 실제로 그렇게 만들어진 게임이 있습니다</li>
        <li>문제나 설명 문구가 어색한 곳</li>
      </ul>

      <h2>개인정보는 보내지 말아 주세요</h2>
      <p>
        아이 이름, 학교, 연락처는 알려 주지 않으셔도 됩니다. 고치는 데 필요한 것은
        어느 화면에서 무엇이 안 됐는지뿐입니다.
      </p>
    </DocPage>
  );
}
