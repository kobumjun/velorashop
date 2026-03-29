import Link from "next/link";
import { submitTogglePublished } from "@/app/actions/admin-toggle";
import { DeleteProductButton } from "@/components/admin/delete-product-button";
import { formatKRW } from "@/lib/format";
import { fetchAllProductsAdmin } from "@/lib/data/admin-products";

export default async function AdminHomePage() {
  const products = await fetchAllProductsAdmin();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl text-white">상품</h1>
          <p className="mt-2 text-sm text-white/50">등록·공개 여부·삭제를 이 화면에서 관리합니다.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center border border-white/30 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:border-white hover:bg-white/5"
        >
          새 상품
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="mt-14 rounded border border-white/10 bg-white/[0.03] px-8 py-16 text-center">
          <p className="text-white/70">등록된 상품이 없습니다.</p>
          <p className="mt-2 text-sm text-white/40">「새 상품」으로 첫 피스를 추가해 보세요.</p>
        </div>
      ) : (
        <div className="mt-12 overflow-x-auto rounded border border-white/10">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-white/10 text-[11px] uppercase tracking-[0.12em] text-white/45">
              <tr>
                <th className="px-4 py-3 font-medium">상품</th>
                <th className="px-4 py-3 font-medium">카테고리</th>
                <th className="px-4 py-3 font-medium">가격</th>
                <th className="px-4 py-3 font-medium">공개</th>
                <th className="px-4 py-3 font-medium">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {products.map((p) => (
                <tr key={p.id} className="text-white/85">
                  <td className="px-4 py-4">
                    <p className="font-medium text-white">{p.title}</p>
                    <p className="mt-1 text-xs text-white/40">/{p.slug}</p>
                  </td>
                  <td className="px-4 py-4 text-white/60">{p.category}</td>
                  <td className="px-4 py-4">{formatKRW(p.price)}</td>
                  <td className="px-4 py-4">
                    <form action={submitTogglePublished}>
                      <input type="hidden" name="product_id" value={p.id} />
                      <input type="hidden" name="next" value={p.is_published ? "0" : "1"} />
                      <button
                        type="submit"
                        className={`text-[11px] uppercase tracking-[0.12em] underline-offset-4 hover:underline ${
                          p.is_published ? "text-emerald-300/90" : "text-white/40"
                        }`}
                      >
                        {p.is_published ? "공개 중" : "비공개"}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="text-[11px] uppercase tracking-[0.12em] text-white/70 underline-offset-4 hover:text-white hover:underline"
                      >
                        수정
                      </Link>
                      <DeleteProductButton productId={p.id} label={p.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
