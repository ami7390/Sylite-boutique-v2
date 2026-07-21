"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Check, MessageCircle, Minus, PackageX, Plus, RefreshCw, ShieldCheck, Truck } from "lucide-react";
import { supabase } from "@/lib/supabaseclient";
import { createWhatsAppUrl } from "@/lib/store-config";
import { formatPrice, normalizeProduct, numericPrice, type ProductRow, type StoreProduct } from "@/lib/products";
import { useCart } from "../../context/cartcontext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<StoreProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  const loadProduct = async () => {
    setLoading(true);
    setError("");
    const { data, error: requestError } = await supabase.from("products").select("*").eq("id", id).single();
    if (requestError || !data) setError("Ce produit est introuvable ou momentanément indisponible.");
    else setProduct(normalizeProduct(data as ProductRow));
    setLoading(false);
  };

  useEffect(() => { void loadProduct(); }, [id]);

  if (loading) return <div className="mx-auto grid min-h-[70vh] max-w-6xl gap-8 px-4 py-10 md:grid-cols-2"><Skeleton className="min-h-[560px]" /><Skeleton className="min-h-[460px]" /></div>;
  if (error || !product) return <div className="flex min-h-[65vh] flex-col items-center justify-center px-4 text-center"><PackageX className="size-10 text-purple-600" /><h1 className="mt-4 text-xl font-bold">Produit indisponible</h1><p className="mt-2 text-sm text-neutral-500">{error}</p><div className="mt-6 flex gap-3"><Button onClick={() => void loadProduct()}><RefreshCw className="size-4" /> Réessayer</Button><Button asChild variant="outline"><Link href="/collection"><ArrowLeft className="size-4" /> Collection</Link></Button></div></div>;

  const message = `Bonjour SyLite, je souhaite commander :\n\n• Produit : ${product.name}\n• Prix : ${formatPrice(product.price)}\n• Quantité : ${quantity}\n• Référence : ${product.id}\n\nPouvez-vous confirmer le délai et le coût de livraison ?`;

  return (
    <div className="min-h-screen bg-neutral-50/70 pb-20">
      <nav className="mx-auto max-w-6xl px-4 py-5 text-xs text-neutral-500"><Link href="/collection" className="inline-flex items-center gap-2 hover:text-purple-600"><ArrowLeft className="size-4" /> Retour à la collection</Link></nav>
      <main className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm"><Image src={product.image} alt={product.name} fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />{product.badge && <Badge className="absolute left-4 top-4">{product.badge}</Badge>}</div>
        <section className="self-center rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-purple-600">{product.category}</p>
          <h1 className="mt-3 font-serif text-3xl leading-tight text-neutral-950 sm:text-4xl">{product.name}</h1>
          <p className="mt-4 text-2xl font-black text-neutral-950">{formatPrice(product.price)}</p>
          <p className="mt-6 leading-7 text-neutral-600">{product.description || "Une pièce sélectionnée avec soin par SyLite pour son style, son confort et sa qualité."}</p>
          <div className="mt-6 grid gap-3 border-y border-neutral-100 py-5 text-sm sm:grid-cols-3"><span className="flex items-center gap-2"><Truck className="size-4 text-purple-600" /> Livraison rapide</span><span className="flex items-center gap-2"><ShieldCheck className="size-4 text-purple-600" /> Achat accompagné</span><span className="flex items-center gap-2"><Check className="size-4 text-emerald-600" /> {product.inStock ? "En stock" : "Indisponible"}</span></div>
          <div className="mt-6 flex items-center justify-between"><span className="text-sm font-semibold">Quantité</span><div className="flex items-center rounded-full border"><button className="p-3" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Diminuer"><Minus className="size-4" /></button><span className="w-8 text-center font-bold">{quantity}</span><button className="p-3" onClick={() => setQuantity((value) => value + 1)} aria-label="Augmenter"><Plus className="size-4" /></button></div></div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2"><Button variant="outline" size="lg" disabled={!product.inStock} onClick={() => addToCart({ id: product.id, name: product.name, price: numericPrice(product.price), quantity, image: product.image })}>Ajouter au panier</Button><Button asChild variant="whatsapp" size="lg" disabled={!product.inStock}><a href={createWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer"><MessageCircle className="size-4" /> Commander</a></Button></div>
          <p className="mt-4 text-center text-xs text-neutral-500">La disponibilité, la livraison et les modalités d’échange sont confirmées par notre équipe avant validation.</p>
        </section>
      </main>
    </div>
  );
}
