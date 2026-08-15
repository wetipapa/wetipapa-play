import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DocPage, { docStyles as s } from "@/components/DocPage";
import { getVisibleServices, services } from "@/config/services";
import { gameGuides } from "@/config/gameGuides";

/** 안내 글이 있는 게임만 페이지를 만든다 */
export function generateStaticParams() {
  return Object.keys(gameGuides).map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const svc = services.find((x) => x.id === id);
  const guide = gameGuides[id];
  if (!svc || !guide) return {};
  return {
    title: `${svc.name} — ${svc.tagline}`,
    description: `${svc.name}은 ${guide.ages}를 위한 학습 게임입니다. ${(guide.learn[0] ?? "").slice(0, 90)}`,
    alternates: { canonical: `https://play.wetipapa.com/games/${id}` },
  };
}

/**
 * 게임 안내 페이지.
 *
 * 허브 카드의 한 줄로는 부모가 "우리 아이한테 맞나"를 판단할 수 없다.
 * 무엇을 배우는지, 어떻게 노는지, 미리 알아 둘 것이 무엇인지를 한 페이지로 보여준다.
 *
 * 시작 버튼은 글 위와 아래에 둔다. 읽고 결정한 사람은 아래에서 바로 누르고,
 * 이미 아는 사람은 위에서 바로 들어간다.
 */
export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const svc = services.find((x) => x.id === id);
  const guide = gameGuides[id];
  if (!svc || !guide || !svc.url) notFound();

  const others = getVisibleServices().filter((x) => x.id !== id && x.url);

  return (
    <DocPage kicker={svc.category} title={svc.name} lead={svc.tagline}>
      <div className={s.callout}>
        <p>
          <strong>{guide.ages}</strong> · {guide.duration} · 무료, 회원가입 없음
        </p>
        <p>
          <a href={svc.url} target="_blank" rel="noopener noreferrer">
            {svc.ctaLabel} →
          </a>
        </p>
      </div>

      <h2>무엇을 배우나</h2>
      {guide.learn.map((p) => (
        <p key={p}>{p}</p>
      ))}

      <h2>어떻게 노나</h2>
      <ul>
        {guide.how.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>

      <h2>만들면서 정한 것</h2>
      {guide.choices.map((c) => (
        <div key={c.title}>
          <h3>{c.title}</h3>
          <p>{c.body}</p>
        </div>
      ))}

      <h2>부모가 알아 둘 것</h2>
      <ul>
        {guide.notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
        <li>점수와 설정은 이 기기의 브라우저에만 남습니다. 서버로 보내지 않습니다.</li>
      </ul>

      <div className={s.callout}>
        <p>
          <a href={svc.url} target="_blank" rel="noopener noreferrer">
            <strong>{svc.name} 시작하기 →</strong>
          </a>
        </p>
      </div>

      <h2>다른 게임</h2>
      <ul>
        {others.map((o) => (
          <li key={o.id}>
            {gameGuides[o.id] ? <a href={`/games/${o.id}`}>{o.name}</a> : o.name} — {o.tagline}
          </li>
        ))}
      </ul>
    </DocPage>
  );
}
