import Link from "next/link";
import type { ProductWithImages } from "@/lib/types";
import { formatKRW } from "@/lib/format";

function sortedImages(p: ProductWithImages) {
  return [...(p.product_images ?? [])].sort((a, b) => a.sort_order - b.sort_order);
}

export function pickCardImage(p: ProductWithImages) {
  if (p.cover_image_url) return p.cover_image_url;
  const first = sortedImages(p)[0];
  return first?.image_url ?? null;
}

export function ProductCard({ product }: { product: ProductWithImages }) {
  const src = pickCardImage(product);
  const href = `/products/${product.slug}`;

  return (
    <Link href={href} className="group block">
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
            <div className="flex h-full w-full items-center justify-center bg-[var(--surface-2)] text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
              이미지 준비 중
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
          {product.category}
        </p>
        <h3 className="font-serif text-lg text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
          {product.title}
        </h3>
        <p className="text-sm text-[var(--fg-soft)]">{formatKRW(product.price)}</p>
      </div>
    </Link>
  );
}
