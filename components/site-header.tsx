import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { signOut } from "@/app/actions/auth";

export async function SiteHeader() {
  const session = await getSession();

  return (
    <header className="border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="font-serif text-xl tracking-[0.2em] text-[var(--fg)]">
          MERIDIAN
        </Link>
        <nav className="flex items-center gap-8 text-[13px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
          <Link href="/products" className="transition-colors hover:text-[var(--fg)]">
            컬렉션
          </Link>
          {session ? (
            <form action={signOut}>
              <button
                type="submit"
                className="uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
              >
                로그아웃
              </button>
            </form>
          ) : (
            <>
              <Link href="/login" className="transition-colors hover:text-[var(--fg)]">
                로그인
              </Link>
              <Link href="/signup" className="transition-colors hover:text-[var(--fg)]">
                회원가입
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
