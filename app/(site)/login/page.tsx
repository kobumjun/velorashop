import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

type Props = { searchParams: Promise<{ redirect?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const sp = await searchParams;
  const redirectTo = sp.redirect?.startsWith("/") && !sp.redirect.startsWith("//") ? sp.redirect : undefined;

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-6 py-20 lg:px-8">
      <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--muted)]">Account</p>
      <h1 className="mt-3 font-serif text-3xl text-[var(--fg)]">로그인</h1>
      <p className="mt-3 text-sm text-[var(--muted)]">등록하신 아이디로 로그인해 주세요.</p>
      <div className="mt-12">
        <LoginForm redirectTo={redirectTo} />
      </div>
      <p className="mt-10 text-center text-sm text-[var(--muted)]">
        계정이 없으신가요?{" "}
        <Link href="/signup" className="text-[var(--fg)] underline-offset-4 hover:underline">
          회원가입
        </Link>
      </p>
    </div>
  );
}
