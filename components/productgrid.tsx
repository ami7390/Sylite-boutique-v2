"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw, SearchX } from "lucide-react";
import { supabase } from "@/lib/supabaseclient";
import { subscribeToProductChanges } from "@/lib/product-sync";
import { normalizeCategory, normalizeProduct, type ProductRow, type StoreProduct } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductGridProps { filterCategory?: string }

export default function ProductGrid({ filterCategory }: ProductGridProps) {
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    const { data, error: requestError } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (requestError) setError("Impossible de charger les produits pour le moment.");
    else {
      const catalog = (data as ProductRow[]).map(normalizeProduct);
      setProducts(filterCategory ? catalog.filter((item) => normalizeCategory(item.category) === normalizeCategory(filterCategory)) : catalog);
    }
    setLoading(false);
  }, [filterCategory]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadProducts(), 0);
    const unsubscribe = subscribeToProductChanges(() => void loadProducts());

    return () => {
      window.clearTimeout(timer);
      unsubscribe();
    };
  }, [loadProducts]);

  if (loading) return <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-[430px]" />)}</div>;
  if (error) return <div className="rounded-3xl border bg-white p-12 text-center"><RefreshCw className="mx-auto size-8 text-purple-600" /><p className="mt-4 text-sm text-neutral-600">{error}</p><Button className="mt-5" onClick={() => void loadProducts()}>Réessayer</Button></div>;
  if (!products.length) return <div className="rounded-3xl border bg-white p-12 text-center"><SearchX className="mx-auto size-8 text-purple-600" /><p className="mt-4 text-sm text-neutral-600">Aucun produit dans cette catégorie.</p></div>;

  return <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">{products.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 2} />)}</div>;
}
