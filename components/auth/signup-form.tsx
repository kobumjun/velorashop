"use client";

import { useActionState } from "react";
import { signUp, type AuthFormState } from "@/app/actions/auth";

const initial: AuthFormState = {};

export function SignupForm() {
  const [state, formAction, pending] = useActionState(signUp, initial);

  return (
    <form action={formAction} className="space-y-8">
      {state?.error ? (
        <p className="text-sm text-red-400/90" role="alert">
          {state.error}
        </p>
      ) : null}
      <div className="space-y-2">
        <label htmlFor="su-username" className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
          아이디
        </label>
        <input
          id="su-username"
          name="username"
          autoComplete="username"
          required
          className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--fg)] outline-none transition-colors focus:border-[var(--accent)]"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="su-password" className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
          비밀번호
        </label>
        <input
          id="su-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--fg)] outline-none transition-colors focus:border-[var(--accent)]"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="su-confirm" className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
          비밀번호 확인
        </label>
        <input
          id="su-confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--fg)] outline-none transition-colors focus:border-[var(--accent)]"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full border border-[var(--fg)] bg-[var(--fg)] py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--bg)] transition-opacity disabled:opacity-50"
      >
        {pending ? "처리 중…" : "가입하기"}
      </button>
    </form>
  );
}
