import Link from "next/link";
import { AdminProductForm } from "@/components/admin/product-form";

export default function AdminNewProductPage() {
  return (
    <div>
      <Link
        href="/admin"
        className="text-[11px] uppercase tracking-[0.15em] text-white/45 transition-colors hover:text-white/80"
      >
        ← 목록
      </Link>
      <h1 className="mt-6 font-serif text-3xl text-white">새 상품</h1>
      <p className="mt-2 text-sm text-white/50">이미지는 공개 URL을 입력합니다. 한 줄에 하나씩 추가 이미지를 넣을 수 있습니다.</p>
      <div className="mt-10 max-w-3xl">
        <AdminProductForm />
      </div>
    </div>
  );
}
