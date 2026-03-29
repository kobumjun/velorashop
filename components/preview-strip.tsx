import Link from "next/link";
import type { ProductWithImages } from "@/lib/types";
import { pickCardImage } from "@/components/product-card";

export function PreviewStrip({ products }: { products: ProductWithImages[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-sm border border-[var(--border)] bg-[var(--surface)] px-10 py-20 text-center">
        <p className="font-serif text-2xl text-[var(--fg)] md:text-3xl">Curated arrivals</p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[var(--muted)]">
          엄선된 피스가 곧 이 자리를 채웁니다. 새로운 컬렉션을 기다려 주세요.
        </p>
        <Link
          href="/products"
          className="mt-10 inline-block border border-[var(--fg)] px-8 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]"
        >
          컬렉션 보기
        </Link>
      </div>
    );
  }

  return (
    <div className="relative -mx-6 lg:-mx-8">
      <div className="flex gap-4 overflow-x-auto pb-2 pl-6 pr-6 lg:pl-8 lg:pr-8">
        {products.map((p) => {
          const src = pickCardImage(p);
          return (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className="group w-[min(72vw,280px)] flex-shrink-0"
            >
              <div className="overflow-hidden bg-[var(--surface-2)]">
                <div className="relative aspect-[3/4]">
                  {src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                      이미지 준비 중
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                  {p.category}
                </p>
                <p className="font-serif text-base text-[var(--fg)]">{p.title}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
