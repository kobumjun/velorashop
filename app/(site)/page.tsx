import Link from "next/link";
import { PreviewStrip } from "@/components/preview-strip";
import { fetchPreviewProducts } from "@/lib/data/products";

export default async function HomePage() {
  let preview: Awaited<ReturnType<typeof fetchPreviewProducts>> = [];
  try {
    preview = await fetchPreviewProducts(12);
  } catch {
    preview = [];
  }

  return (
    <div>
      <section className="relative min-h-[78vh] border-b border-[var(--border)]">
        <div className="mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-6 pb-20 pt-32 lg:px-8 lg:pb-28">
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[var(--accent)]">
            Accessories atelier
          </p>
          <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight text-[var(--fg)] md:text-5xl lg:text-6xl">
            시간과 빛, 실루엣을 완성하는 디테일
          </h1>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
            시계, 선글라스, 모자 — 일상의 리듬을 세련되게 고정하는 오브제를 소개합니다.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="inline-flex border border-[var(--fg)] bg-[var(--fg)] px-10 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--bg)] transition-opacity hover:opacity-90"
            >
              컬렉션 둘러보기
            </Link>
            <Link
              href="/products?category=시계"
              className="inline-flex border border-[var(--border)] px-10 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--fg)]"
            >
              시계
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--muted)]">
              House philosophy
            </p>
            <h2 className="mt-4 font-serif text-3xl text-[var(--fg)] md:text-4xl">차분한 절제</h2>
            <p className="mt-6 text-sm leading-relaxed text-[var(--muted)] md:text-base">
              과장 없는 실루엣과 오래 머무는 마감. Meridian은 트렌드보다 지속 가능한 우아함을 택합니다.
              소재의 질감, 착용감, 빛의 반사까지 균형 있게 다듬었습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--muted)]">
                Categories
              </p>
              <h2 className="mt-3 font-serif text-3xl text-[var(--fg)]">세 가지 라인</h2>
            </div>
            <Link
              href="/products"
              className="self-start text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--accent)] md:self-auto"
            >
              전체 보기
            </Link>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                title: "시계",
                copy: "움직임과 침묵의 균형. 데일리와 포멀을 아우르는 타임피스.",
                href: "/products?category=시계",
              },
              {
                title: "선글라스",
                copy: "빛을 다루는 렌즈와 실루엣. 얼굴의 구조를 살리는 프레임.",
                href: "/products?category=선글라스",
              },
              {
                title: "모자",
                copy: "실루엣의 마침표. 계절과 무드에 맞춘 헤드웨어.",
                href: "/products?category=모자",
              },
            ].map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group border border-[var(--border)] bg-[var(--surface)] p-8 transition-colors hover:border-[var(--fg-soft)]"
              >
                <h3 className="font-serif text-2xl text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                  {c.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{c.copy}</p>
                <span className="mt-6 inline-block text-[11px] uppercase tracking-[0.2em] text-[var(--fg-soft)]">
                  둘러보기 →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--muted)]">
                Selection
              </p>
              <h2 className="mt-3 font-serif text-3xl text-[var(--fg)]">엄선된 피스</h2>
            </div>
            <p className="max-w-md text-sm text-[var(--muted)]">
              가로로 스크롤하여 미리 보기. 전체 컬렉션은 목록에서 확인하세요.
            </p>
          </div>
          <PreviewStrip products={preview} />
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--surface)] py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--muted)]">
                Craft & care
              </p>
              <h2 className="mt-4 font-serif text-3xl text-[var(--fg)]">디테일에 머무는 가치</h2>
              <p className="mt-6 text-sm leading-relaxed text-[var(--muted)]">
                마감, 무게, 착용선. 보이지 않는 부분까지 정돈해야 브랜드의 톤이 유지됩니다.
                Meridian은 그 기준을 흔들지 않습니다.
              </p>
            </div>
            <ul className="space-y-6 text-sm text-[var(--fg-soft)]">
              <li className="flex gap-4 border-b border-[var(--border)] pb-6">
                <span className="font-serif text-xl text-[var(--accent)]">01</span>
                <span>엄선된 라인업과 명확한 카테고리 구조</span>
              </li>
              <li className="flex gap-4 border-b border-[var(--border)] pb-6">
                <span className="font-serif text-xl text-[var(--accent)]">02</span>
                <span>상품 설명·사이즈 정보를 투명하게 제공</span>
              </li>
              <li className="flex gap-4">
                <span className="font-serif text-xl text-[var(--accent)]">03</span>
                <span>과장 없는 비주얼과 여백 중심의 쇼핑 경험</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] py-20">
        <div className="mx-auto max-w-6xl px-6 text-center lg:px-8">
          <h2 className="font-serif text-3xl text-[var(--fg)] md:text-4xl">컬렉션을 만나 보세요</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-[var(--muted)]">
            지금 공개된 피스를 둘러보고, 마음에 드는 라인을 저장해 두세요.
          </p>
          <Link
            href="/products"
            className="mt-10 inline-block border border-[var(--fg)] px-12 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--fg)] transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]"
          >
            쇼핑하기
          </Link>
        </div>
      </section>
    </div>
  );
}
