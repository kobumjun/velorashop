import { createPublicSupabase } from "@/lib/supabase/server";
import type { ProductCategory, ProductWithImages } from "@/lib/types";

type CategoryFilter = "all" | ProductCategory;

export async function fetchPublishedProducts(category: CategoryFilter = "all") {
  const supabase = createPublicSupabase();
  let q = supabase
    .from("products")
    .select(
      `
      *,
      product_images (*)
    `
    )
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (category !== "all") {
    q = q.eq("category", category);
  }

  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as unknown as ProductWithImages[];
}

export async function fetchPublishedProductBySlug(slug: string) {
  const supabase = createPublicSupabase();
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_images (*)
    `
    )
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) throw error;
  return data as ProductWithImages | null;
}

export async function fetchPreviewProducts(limit = 12) {
  const supabase = createPublicSupabase();
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_images (*)
    `
    )
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as unknown as ProductWithImages[];
}
