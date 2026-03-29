import { createAdminSupabase } from "@/lib/supabase/admin";
import type { ProductWithImages } from "@/lib/types";

export async function fetchAllProductsAdmin() {
  const admin = createAdminSupabase();
  const { data, error } = await admin
    .from("products")
    .select(
      `
      *,
      product_images (*)
    `
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as unknown as ProductWithImages[];
}

export async function fetchProductAdmin(id: string) {
  const admin = createAdminSupabase();
  const { data, error } = await admin
    .from("products")
    .select(
      `
      *,
      product_images (*)
    `
    )
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data as ProductWithImages | null;
}
