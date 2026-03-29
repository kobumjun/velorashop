"use client";

import { useActionState } from "react";
import {
  createProduct,
  updateProduct,
  type ProductFormState,
} from "@/app/actions/admin-products";
import type { ProductWithImages } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";

const initial: ProductFormState = {};

function sortedExtra(p: ProductWithImages) {
  return [...(p.product_images ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((r) => r.image_url)
    .join("\n");
}

export function AdminProductForm({ product }: { product?: ProductWithImages | null }) {
  const isEdit = Boolean(product);
  const action = isEdit ? updateProduct : createProduct;
  const [state, formAction, pending] = useActionState(action, initial);

  return (
    <form action={formAction} className="space-y-8">
      {state?.error ? (
        <p className="text-sm text-amber-200/90" role="alert">
          {state.error}
        </p>
      ) : null}
      {product ? <input type="hidden" name="id" value={product.id} /> : null}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <label className="text-[11px] uppercase tracking-[0.15em] text-white/50">상품명</label>
          <input
            name="title"
            required
            defaultValue={product?.title ?? ""}
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[var(--admin-accent)]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[11px] uppercase tracking-[0.15em] text-white/50">slug (URL)</label>
          <input
            name="slug"
            required
            defaultValue={product?.slug ?? ""}
            placeholder="예: leather-strap-watch"
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[var(--admin-accent)]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[11px] uppercase tracking-[0.15em] text-white/50">카테고리</label>
          <select
            name="category"
            required
            defaultValue={product?.category ?? "시계"}
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[var(--admin-accent)]"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[11px] uppercase tracking-[0.15em] text-white/50">가격 (원, 정수)</label>
          <input
            name="price"
            type="number"
            min={0}
            step={1}
            required
            defaultValue={product?.price ?? ""}
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[var(--admin-accent)]"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-[11px] uppercase tracking-[0.15em] text-white/50">대표 이미지 URL</label>
          <input
            name="cover_image_url"
            type="text"
            defaultValue={product?.cover_image_url ?? ""}
            placeholder="https://"
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[var(--admin-accent)]"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-[11px] uppercase tracking-[0.15em] text-white/50">
            추가 이미지 URL (한 줄에 하나)
          </label>
          <textarea
            name="extra_images"
            rows={5}
            defaultValue={product ? sortedExtra(product) : ""}
            placeholder="https://&#10;https://"
            className="w-full resize-y border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[var(--admin-accent)]"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-[11px] uppercase tracking-[0.15em] text-white/50">상세 설명</label>
          <textarea
            name="description"
            rows={6}
            defaultValue={product?.description ?? ""}
            className="w-full resize-y border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[var(--admin-accent)]"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-[11px] uppercase tracking-[0.15em] text-white/50">사이즈 정보</label>
          <textarea
            name="size_info"
            rows={4}
            defaultValue={product?.size_info ?? ""}
            className="w-full resize-y border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[var(--admin-accent)]"
          />
        </div>
        <label className="flex cursor-pointer items-center gap-3 md:col-span-2">
          <input
            type="checkbox"
            name="is_published"
            defaultChecked={product?.is_published ?? false}
            className="h-4 w-4 rounded border-white/30 bg-white/5"
          />
          <span className="text-sm text-white/80">공개 (스토어에 노출)</span>
        </label>
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          type="submit"
          disabled={pending}
          className="border border-white bg-white px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition-opacity disabled:opacity-50"
        >
          {pending ? "저장 중…" : isEdit ? "수정 저장" : "상품 등록"}
        </button>
      </div>
    </form>
  );
}
