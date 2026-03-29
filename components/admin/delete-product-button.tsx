"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteProduct } from "@/app/actions/admin-products";

export function DeleteProductButton({ productId, label }: { productId: string; label: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!window.confirm(`「${label}」을(를) 삭제할까요? 이 작업은 되돌릴 수 없습니다.`)) return;
        start(async () => {
          await deleteProduct(productId);
          router.refresh();
        });
      }}
      className="text-[11px] uppercase tracking-[0.12em] text-red-300/90 transition-opacity hover:opacity-80 disabled:opacity-50"
    >
      {pending ? "삭제 중…" : "삭제"}
    </button>
  );
}
