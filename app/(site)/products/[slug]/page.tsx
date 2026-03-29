import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product-gallery";
import { formatKRW } from "@/lib/format";
import { fetchPublishedProductBySlug } from "@/lib/data/products";

type Props = { params: Promise<{ slug: string }> };

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  let product: Awaited<ReturnType<typeof fetchPublishedProductBySlug>> = null;
  try {
    product = await fetchPublishedProductBySlug(slug);
  } catch {
    notFound();
  }
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      <nav className="mb-10 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
        <Link href="/products" className="transition-colors hover:text-[var(--fg)]">
          컬렉션
        </Link>
        <span className="mx-2 text-[var(--border)]">/</span>
        <span className="text-[var(--fg-soft)]">{product.title}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <ProductGallery product={product} />
        <div className="flex flex-col">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--muted)]">
            {product.category}
          </p>
          <h1 className="mt-4 font-serif text-4xl text-[var(--fg)] lg:text-5xl">{product.title}</h1>
          <p className="mt-6 text-lg text-[var(--fg-soft)]">{formatKRW(product.price)}</p>

          <div className="mt-10 space-y-8 border-t border-[var(--border)] pt-10">
            {product.description ? (
              <div>
                <h2 className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--fg-soft)]">
                  상세 설명
                </h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[var(--muted)]">
                  {product.description}
                </p>
              </div>
            ) : null}
            {product.size_info ? (
              <div>
                <h2 className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--fg-soft)]">
                  사이즈
                </h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[var(--muted)]">
                  {product.size_info}
                </p>
              </div>
            ) : null}
          </div>

        </div>
      </div>
    </div>
  );
}
