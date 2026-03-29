"use client";

import { useMemo, useState } from "react";
import type { ProductWithImages } from "@/lib/types";

function galleryUrls(p: ProductWithImages) {
  const extra = [...(p.product_images ?? [])].sort((a, b) => a.sort_order - b.sort_order);
  const urls: string[] = [];
  if (p.cover_image_url) urls.push(p.cover_image_url);
  for (const row of extra) {
    if (row.image_url && !urls.includes(row.image_url)) urls.push(row.image_url);
  }
  return urls;
}

export function ProductGallery({ product }: { product: ProductWithImages }) {
  const urls = useMemo(() => galleryUrls(product), [product]);
  const [idx, setIdx] = useState(0);

  if (urls.length === 0) {
    return (
      <div className="flex aspect-[3/4] w-full items-center justify-center bg-[var(--surface-2)] text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
        이미지 준비 중
      </div>
    );
  }

  const main = urls[idx] ?? urls[0];

  return (
    <div className="space-y-4">
      <div className="overflow-hidden bg-[var(--surface-2)]">
        <div className="relative aspect-[3/4]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={main} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
      {urls.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {urls.map((u, i) => (
            <button
              key={`${u}-${i}`}
              type="button"
              onClick={() => setIdx(i)}
              className={`relative h-20 w-16 flex-shrink-0 overflow-hidden border transition-colors ${
                i === idx ? "border-[var(--fg)]" : "border-transparent opacity-70 hover:opacity-100"
              }`}
              aria-label={`이미지 ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={u} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
