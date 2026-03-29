import { redirect } from "next/navigation";
import { verifyAdminGate } from "@/lib/auth/admin-gate";

/**
 * Server Action 등 변이 전용. 통과하지 못하면 /admin 으로 보냅니다.
 * RSC 페이지 최상단에서는 verifyAdminGate() 직접 쓰고, 실패 시 null 반환 등으로 처리하세요.
 */
export async function assertAdminGate() {
  if (!(await verifyAdminGate())) {
    redirect("/admin");
  }
}
