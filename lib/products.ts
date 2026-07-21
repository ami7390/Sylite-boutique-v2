export interface StoreProduct {
  id: string | number;
  name: string;
  price: number | string;
  category: string;
  image: string;
  description?: string;
  badge?: string;
  tag?: string;
  inStock: boolean;
  createdAt?: string;
  sizes?: string[];
  colors?: string[];
}

export interface ProductRow {
  id: string | number;
  name: string | null;
  price: number | string | null;
  category: string | null;
  image_url: string | null;
  image?: string | null;
  description: string | null;
  badge: string | null;
  tag?: string | null;
  in_stock: boolean | null;
  created_at: string | null;
  source_id?: string | null;
}

export function normalizeCategory(value = "") {
  const category = value.trim().toLocaleLowerCase("fr");
  if (category.includes("electromenager") || category.includes("électroménager")) return "Électroménager";
  if (category.includes("soin") || category.includes("meditation") || category.includes("méditation")) return "Soin et méditation";
  if (category.startsWith("gaine")) return "Gaines";
  return category ? category.charAt(0).toLocaleUpperCase("fr") + category.slice(1) : "Collection";
}

export function normalizeProduct(row: ProductRow): StoreProduct {
  return {
    id: row.id,
    name: row.name || "Article SyLite",
    price: row.price ?? 0,
    category: normalizeCategory(row.category || ""),
    image: row.image_url || row.image || "/logo.png",
    description: row.description || undefined,
    badge: row.badge || undefined,
    tag: row.tag || undefined,
    inStock: row.in_stock !== false,
    createdAt: row.created_at || undefined,
  };
}

export function numericPrice(price: number | string) {
  return typeof price === "number" ? price : Number.parseInt(price.replace(/[^0-9]/g, ""), 10) || 0;
}

export function formatPrice(price: number | string) {
  if (typeof price === "string" && /fcfa/i.test(price)) return price;
  return `${numericPrice(price).toLocaleString("fr-FR")} FCFA`;
}

export function normalizeSearch(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr").trim();
}
