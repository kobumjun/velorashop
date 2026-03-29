"use client";

import { useActionState } from "react";
import { usePathname } from "next/navigation";
import { unlockAdmin, type AdminGateState } from "@/app/actions/admin-gate";

const initial: AdminGateState = {};

export function AdminUnlockForm() {
  const pathname = usePathname();
  const [state, formAction, pending] = useActionState(unlockAdmin, initial);

  return (
    <div className="mx-auto w-full max-w-sm px-6 py-16">
      <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">Restricted</p>
      <h1 className="mt-3 font-serif text-2xl text-white">관리자 코드</h1>
      <p className="mt-2 text-sm text-white/50">접근 코드를 입력하세요.</p>
      <form action={formAction} className="mt-10 space-y-6">
        <input type="hidden" name="next" value={pathname.startsWith("/admin") ? pathname : "/admin"} />
        {state?.error ? (
          <p className="text-sm text-amber-200/90" role="alert">
            {state.error}
          </p>
        ) : null}
        <div className="space-y-2">
          <label htmlFor="admin-code" className="text-[10px] uppercase tracking-[0.2em] text-white/45">
            Access code
          </label>
          <input
            id="admin-code"
            name="code"
            type="password"
            inputMode="numeric"
            autoComplete="off"
            required
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-center text-lg tracking-[0.3em] text-white outline-none focus:border-[#c4a574]"
            placeholder="••••"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="w-full border border-white bg-white py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-black transition-opacity disabled:opacity-50"
        >
          {pending ? "확인 중…" : "입장"}
        </button>
      </form>
      <p className="mt-10 text-center text-[11px] text-white/35">
        <a href="/" className="underline-offset-4 hover:text-white/60 hover:underline">
          스토어로 돌아가기
        </a>
      </p>
    </div>
  );
}
