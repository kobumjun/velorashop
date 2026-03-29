import { redirect } from "next/navigation";
import { getSession, type SessionPayload } from "@/lib/auth/session";

export async function requireAdmin(): Promise<SessionPayload> {
  const s = await getSession();
  if (!s || s.role !== "admin") {
    redirect("/login?redirect=%2Fadmin");
  }
  return s;
}
