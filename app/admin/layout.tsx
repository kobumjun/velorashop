import Link from "next/link";
import { lockAdmin } from "@/app/actions/admin-gate";
import { AdminUnlockForm } from "@/components/admin/admin-unlock-form";
import { verifyAdminGate } from "@/lib/auth/admin-gate";

const shellClass =
  "min-h-screen text-white [background:linear-gradient(160deg,#141414_0%,#0a0a0a_45%,#101010_100%)] [--admin-accent:#c4a574]";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const ok = await verifyAdminGate();

  if (!ok) {
    return (
      <div className={shellClass}>
        <header className="border-b border-white/10">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 lg:px-8">
            <Link href="/" className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/90">
              Meridian
            </Link>
          </div>
        </header>
        <AdminUnlockForm />
      </div>
    );
  }

  return (
    <div className={shellClass}>
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <Link href="/" className="shrink-0 text-[11px] font-medium uppercase tracking-[0.28em] text-white/90">
            Meridian
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <p className="hidden text-[10px] uppercase tracking-[0.2em] text-white/40 sm:block">상품 관리</p>
            <form action={lockAdmin}>
              <button
                type="submit"
                className="text-[10px] uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-white"
              >
                코드 잠금
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-6 py-10 lg:px-8">{children}</div>
    </div>
  );
}
