"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { assertAdminGate } from "@/lib/auth/guard";
import { createAdminSupabase } from "@/lib/supabase/admin";
import type { ProductCategory } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function parseImageLines(raw: string) {
  return raw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function isCategory(v: string): v is ProductCategory {
  return (CATEGORIES as string[]).includes(v);
}

export type ProductFormState = { error?: string };

export async function createProduct(_: ProductFormState, formData: FormData): Promise<ProductFormState> {
  await assertAdminGate();
  const admin = createAdminSupabase();

  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const category = String(formData.get("category") ?? "");
  const priceRaw = String(formData.get("price") ?? "");
  const cover_image_url = String(formData.get("cover_image_url") ?? "").trim() || null;
  const description = String(formData.get("description") ?? "").trim() || null;
  const size_info = String(formData.get("size_info") ?? "").trim() || null;
  const is_published = formData.get("is_published") === "on";
  const extraImages = parseImageLines(String(formData.get("extra_images") ?? ""));

  if (!title) return { error: "상품명을 입력해 주세요." };
  if (!SLUG_RE.test(slug)) return { error: "슬러그는 소문자, 숫자, 하이픈만 사용할 수 있습니다." };
  if (!isCategory(category)) return { error: "카테고리를 선택해 주세요." };
  const price = Number(priceRaw);
  if (!Number.isFinite(price) || price < 0 || !Number.isInteger(price)) {
    return { error: "가격은 0 이상의 정수여야 합니다." };
  }

  const { data: product, error: pErr } = await admin
    .from("products")
    .insert({
      title,
      slug,
      category,
      price,
      cover_image_url,
      description,
      size_info,
      is_published,
    })
    .select("id")
    .single();

  if (pErr) {
    if (pErr.code === "23505") return { error: "이미 사용 중인 슬러그입니다." };
    return { error: "상품 저장에 실패했습니다." };
  }

  if (extraImages.length > 0) {
    const rows = extraImages.map((image_url, i) => ({
      product_id: product.id,
      image_url,
      sort_order: i,
    }));
    const { error: iErr } = await admin.from("product_images").insert(rows);
    if (iErr) {
      await admin.from("products").delete().eq("id", product.id);
      return { error: "추가 이미지 저장에 실패했습니다." };
    }
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath(`/products/${slug}`);
  redirect("/admin");
}

export async function updateProduct(_: ProductFormState, formData: FormData): Promise<ProductFormState> {
  await assertAdminGate();
  const admin = createAdminSupabase();

  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const category = String(formData.get("category") ?? "");
  const priceRaw = String(formData.get("price") ?? "");
  const cover_image_url = String(formData.get("cover_image_url") ?? "").trim() || null;
  const description = String(formData.get("description") ?? "").trim() || null;
  const size_info = String(formData.get("size_info") ?? "").trim() || null;
  const is_published = formData.get("is_published") === "on";
  const extraImages = parseImageLines(String(formData.get("extra_images") ?? ""));

  if (!id) return { error: "상품 정보가 올바르지 않습니다." };
  if (!title) return { error: "상품명을 입력해 주세요." };
  if (!SLUG_RE.test(slug)) return { error: "슬러그는 소문자, 숫자, 하이픈만 사용할 수 있습니다." };
  if (!isCategory(category)) return { error: "카테고리를 선택해 주세요." };
  const price = Number(priceRaw);
  if (!Number.isFinite(price) || price < 0 || !Number.isInteger(price)) {
    return { error: "가격은 0 이상의 정수여야 합니다." };
  }

  const { data: prev } = await admin.from("products").select("slug").eq("id", id).single();

  const { error: uErr } = await admin
    .from("products")
    .update({
      title,
      slug,
      category,
      price,
      cover_image_url,
      description,
      size_info,
      is_published,
    })
    .eq("id", id);

  if (uErr) {
    if (uErr.code === "23505") return { error: "이미 사용 중인 슬러그입니다." };
    return { error: "상품 수정에 실패했습니다." };
  }

  await admin.from("product_images").delete().eq("product_id", id);
  if (extraImages.length > 0) {
    const rows = extraImages.map((image_url, i) => ({
      product_id: id,
      image_url,
      sort_order: i,
    }));
    const { error: iErr } = await admin.from("product_images").insert(rows);
    if (iErr) return { error: "추가 이미지 저장에 실패했습니다." };
  }

  revalidatePath("/");
  revalidatePath("/products");
  if (prev?.slug) revalidatePath(`/products/${prev.slug}`);
  revalidatePath(`/products/${slug}`);
  redirect("/admin");
}

export async function deleteProduct(productId: string) {
  await assertAdminGate();
  const admin = createAdminSupabase();
  const { data: row } = await admin.from("products").select("slug").eq("id", productId).maybeSingle();
  await admin.from("products").delete().eq("id", productId);
  revalidatePath("/");
  revalidatePath("/products");
  if (row?.slug) revalidatePath(`/products/${row.slug}`);
}

export async function togglePublished(productId: string, next: boolean) {
  await assertAdminGate();
  const admin = createAdminSupabase();
  const { data: row } = await admin.from("products").select("slug").eq("id", productId).maybeSingle();
  const { error } = await admin.from("products").update({ is_published: next }).eq("id", productId);
  if (error) throw error;
  revalidatePath("/");
  revalidatePath("/products");
  if (row?.slug) revalidatePath(`/products/${row.slug}`);
}
