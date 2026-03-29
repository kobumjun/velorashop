export type ProductCategory = "시계" | "선글라스" | "모자";

export type ProductRow = {
  id: string;
  title: string;
  slug: string;
  category: ProductCategory;
  price: number;
  description: string | null;
  size_info: string | null;
  cover_image_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductImageRow = {
  id: string;
  product_id: string;
  image_url: string;
  sort_order: number;
  created_at: string;
};

export type ProductWithImages = ProductRow & {
  product_images: ProductImageRow[];
};

export const CATEGORIES: ProductCategory[] = ["시계", "선글라스", "모자"];

export const CATEGORY_FILTER_LABEL: Record<string, string> = {
  all: "전체",
  시계: "시계",
  선글라스: "선글라스",
  모자: "모자",
};
