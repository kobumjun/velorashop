"use server";

import { redirect } from "next/navigation";
import { clearAdminGateCookie, setAdminGateCookie } from "@/lib/auth/admin-gate";

export type AdminGateState = { error?: string };

export async function unlockAdmin(_: AdminGateState, formData: FormData): Promise<AdminGateState> {
  const code = String(formData.get("code") ?? "").trim();
  const nextRaw = String(formData.get("next") ?? "").trim();

  const expected = process.env.ADMIN_ACCESS_CODE?.trim();
  if (!expected) {
    return { error: "서버에 ADMIN_ACCESS_CODE가 설정되지 않았습니다." };
  }
  if (code !== expected) {
    return { error: "코드가 올바르지 않습니다." };
  }

  try {
    await setAdminGateCookie();
  } catch {
    return { error: "세션 설정에 실패했습니다. SESSION_SECRET을 확인해 주세요." };
  }

  const dest =
    nextRaw.startsWith("/admin") && !nextRaw.startsWith("//") ? nextRaw : "/admin";
  redirect(dest);
}

export async function lockAdmin() {
  await clearAdminGateCookie();
  redirect("/admin");
}
