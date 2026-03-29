import { Suspense } from "react";
import { CategoryTabs } from "@/components/category-tabs";
import { ProductCard } from "@/components/product-card";
import type { ProductCategory } from "@/lib/types";
import { fetchPublishedProducts } from "@/lib/data/products";

type Props = { searchParams: Promise<{ category?: string }> };

export default async function ProductsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const raw = sp.category ?? "all";
  const category: "all" | ProductCategory =
    raw === "시계" || raw === "선글라스" || raw === "모자" ? raw : "all";

  let products: Awaited<ReturnType<typeof fetchPublishedProducts>> = [];
  try {
    products = await fetchPublishedProducts(category);
  } catch {
    products = [];
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      <header className="mb-12">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--muted)]">
          Collection
        </p>
        <h1 className="mt-3 font-serif text-4xl text-[var(--fg)]">전체 컬렉션</h1>
        <p className="mt-4 max-w-xl text-sm text-[var(--muted)]">
          카테고리별로 정리된 피스를 천천히 살펴보세요.
        </p>
      </header>

      <Suspense fallback={<div className="h-14 border-b border-[var(--border)]" aria-hidden />}>
        <CategoryTabs />
      </Suspense>

      {products.length === 0 ? (
        <div className="mt-16 rounded-sm border border-[var(--border)] bg-[var(--surface)] px-8 py-24 text-center">
          <p className="font-serif text-2xl text-[var(--fg)]">준비 중인 컬렉션</p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[var(--muted)]">
            현재 이 카테고리에 공개된 상품이 없습니다. 새로운 피스가 준비되는 대로 이 자리에 채워집니다.
          </p>
        </div>
      ) : (
        <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
