"use server";

import { createAdminSupabase } from "@/lib/supabase/admin";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { clearSessionCookie, setSessionCookie, signSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

const USER_RE = /^[a-zA-Z0-9._가-힣]{3,32}$/;

function validateUsername(u: string) {
  return USER_RE.test(u);
}

export type AuthFormState = { error?: string };

export async function signUp(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (!validateUsername(username)) {
    return { error: "아이디는 3~32자이며 문자, 숫자, 밑줄, 마침표만 사용할 수 있습니다." };
  }
  if (password.length < 8) {
    return { error: "비밀번호는 8자 이상이어야 합니다." };
  }
  if (password !== confirm) {
    return { error: "비밀번호 확인이 일치하지 않습니다." };
  }

  const admin = createAdminSupabase();
  const password_hash = await hashPassword(password);

  const { data: row, error } = await admin
    .from("profiles")
    .insert({
      username,
      password_hash,
      role: "user",
    })
    .select("id, role, username")
    .single();

  if (error) {
    if (error.code === "23505") {
      return { error: "이미 사용 중인 아이디입니다." };
    }
    return { error: "가입에 실패했습니다. 잠시 후 다시 시도해 주세요." };
  }

  if (!row) return { error: "가입에 실패했습니다." };

  const token = await signSession({
    sub: row.id,
    role: row.role as "user" | "admin",
    username: row.username,
  });
  await setSessionCookie(token);
  redirect("/");
}

export async function signIn(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "아이디와 비밀번호를 입력해 주세요." };
  }

  const admin = createAdminSupabase();
  const { data: row, error } = await admin
    .from("profiles")
    .select("id, password_hash, role, username")
    .eq("username", username)
    .maybeSingle();

  if (error || !row) {
    return { error: "아이디 또는 비밀번호가 올바르지 않습니다." };
  }

  const ok = await verifyPassword(password, row.password_hash);
  if (!ok) {
    return { error: "아이디 또는 비밀번호가 올바르지 않습니다." };
  }

  const token = await signSession({
    sub: row.id,
    role: row.role as "user" | "admin",
    username: row.username,
  });
  await setSessionCookie(token);

  const next = String(formData.get("redirect") ?? "").trim();
  if (next.startsWith("/") && !next.startsWith("//")) {
    redirect(next);
  }
  redirect("/");
}

export async function signOut() {
  await clearSessionCookie();
  redirect("/");
}
