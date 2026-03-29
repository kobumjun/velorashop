"use client";

import { useActionState } from "react";
import { signIn, type AuthFormState } from "@/app/actions/auth";

const initial: AuthFormState = {};

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [state, formAction, pending] = useActionState(signIn, initial);

  return (
    <form action={formAction} className="space-y-8">
      {redirectTo ? <input type="hidden" name="redirect" value={redirectTo} /> : null}
      {state?.error ? (
        <p className="text-sm text-red-400/90" role="alert">
          {state.error}
        </p>
      ) : null}
      <div className="space-y-2">
        <label htmlFor="username" className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
          아이디
        </label>
        <input
          id="username"
          name="username"
          autoComplete="username"
          required
          className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--fg)] outline-none transition-colors focus:border-[var(--accent)]"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--fg)] outline-none transition-colors focus:border-[var(--accent)]"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full border border-[var(--fg)] bg-[var(--fg)] py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--bg)] transition-opacity disabled:opacity-50"
      >
        {pending ? "확인 중…" : "로그인"}
      </button>
    </form>
  );
}
