import Link from "next/link";
import { requireAdmin } from "@/lib/auth/guard";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: "linear-gradient(160deg, #141414 0%, #0a0a0a 45%, #101010 100%)",
        ["--admin-accent" as string]: "#c4a574",
      }}
    >
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/90">
            Meridian
          </Link>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">상품 관리</p>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-6 py-10 lg:px-8">{children}</div>
    </div>
  );
}
