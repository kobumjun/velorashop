import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-6 py-20 lg:px-8">
      <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--muted)]">Account</p>
      <h1 className="mt-3 font-serif text-3xl text-[var(--fg)]">회원가입</h1>
      <p className="mt-3 text-sm text-[var(--muted)]">
        아이디와 비밀번호만으로 Meridian 계정을 만듭니다.
      </p>
      <div className="mt-12">
        <SignupForm />
      </div>
      <p className="mt-10 text-center text-sm text-[var(--muted)]">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="text-[var(--fg)] underline-offset-4 hover:underline">
          로그인
        </Link>
      </p>
    </div>
  );
}
