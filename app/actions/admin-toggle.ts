"use server";

import { togglePublished } from "@/app/actions/admin-products";

export async function submitTogglePublished(formData: FormData) {
  const id = String(formData.get("product_id") ?? "");
  const next = String(formData.get("next") ?? "") === "1";
  if (!id) return;
  await togglePublished(id, next);
}
