import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { signOut } from "@/app/actions/auth";

export async function SiteHeader() {
  const session = await getSession();

  return (
    <header className="border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 font-serif text-base tracking-[0.18em] text-[var(--fg)] sm:text-lg md:text-xl md:tracking-[0.2em]"
        >
          MERIDIAN
        </Link>
        <nav className="flex min-w-0 flex-1 items-center justify-end gap-2.5 sm:gap-5 md:gap-8">
          <Link
            href="/products"
            className="shrink-0 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--muted)] transition-colors hover:text-[var(--fg)] sm:text-[11px] sm:tracking-[0.16em] md:text-[13px] md:tracking-[0.18em]"
          >
            컬렉션
          </Link>
          {session ? (
            <form action={signOut} className="shrink-0">
              <button
                type="submit"
                className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--muted)] transition-colors hover:text-[var(--fg)] sm:text-[11px] sm:tracking-[0.16em] md:text-[13px] md:tracking-[0.18em]"
              >
                로그아웃
              </button>
            </form>
          ) : (
            <>
              <Link
                href="/login"
                className="shrink-0 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--muted)] transition-colors hover:text-[var(--fg)] sm:text-[11px] sm:tracking-[0.16em] md:text-[13px] md:tracking-[0.18em]"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="shrink-0 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--muted)] transition-colors hover:text-[var(--fg)] sm:text-[11px] sm:tracking-[0.16em] md:text-[13px] md:tracking-[0.18em]"
              >
                회원가입
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
