import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-serif text-lg tracking-[0.22em] text-[var(--fg)]">MERIDIAN</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--muted)]">
              시계, 선글라스, 헤드웨어를 엄선한 프리미엄 액세서리 하우스.
            </p>
          </div>
          <div className="flex gap-12 text-sm text-[var(--muted)]">
            <div className="space-y-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--fg-soft)]">
                쇼핑
              </p>
              <ul className="space-y-2">
                <li>
                  <Link href="/products" className="transition-colors hover:text-[var(--fg)]">
                    전체 컬렉션
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=시계" className="transition-colors hover:text-[var(--fg)]">
                    시계
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=선글라스" className="transition-colors hover:text-[var(--fg)]">
                    선글라스
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=모자" className="transition-colors hover:text-[var(--fg)]">
                    모자
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--fg-soft)]">
                고객
              </p>
              <ul className="space-y-2">
                <li>
                  <Link href="/login" className="transition-colors hover:text-[var(--fg)]">
                    로그인
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="transition-colors hover:text-[var(--fg)]">
                    회원가입
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-14 text-center text-[11px] tracking-[0.12em] text-[var(--muted)]">
          © {new Date().getFullYear()} Meridian. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
