import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminProductForm } from "@/components/admin/product-form";
import { fetchProductAdmin } from "@/lib/data/admin-products";

type Props = { params: Promise<{ id: string }> };

export default async function AdminEditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await fetchProductAdmin(id);
  if (!product) notFound();

  return (
    <div>
      <Link
        href="/admin"
        className="text-[11px] uppercase tracking-[0.15em] text-white/45 transition-colors hover:text-white/80"
      >
        ← 목록
      </Link>
      <h1 className="mt-6 font-serif text-3xl text-white">상품 수정</h1>
      <p className="mt-2 text-sm text-white/50">{product.title}</p>
      <div className="mt-10 max-w-3xl">
        <AdminProductForm product={product} />
      </div>
    </div>
  );
}
