"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createWhatsAppUrl } from "@/lib/store-config";
import { formatPrice, type StoreProduct } from "@/lib/products";

interface ProductCardProps {
  product: StoreProduct;
  liked?: boolean;
  onLike?: () => void;
  priority?: boolean;
}

export function ProductCard({ product, liked = false, onLike, priority = false }: ProductCardProps) {
  const message = `Bonjour SyLite, je souhaite commander :\n\n• Produit : ${product.name}\n• Prix : ${formatPrice(product.price)}\n• Référence : ${product.id}\n\nPouvez-vous confirmer la disponibilité et la livraison ?`;

  return (
    <Card className="group overflow-hidden rounded-2xl border-neutral-200/80 bg-white p-0 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl">
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        <Link href={`/produits/${product.id}`} aria-label={`Voir ${product.name}`}>
          <Image src={product.image} alt={product.name} fill priority={priority} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
        </Link>
        <Badge className="absolute left-3 top-3 border-white/20 bg-neutral-950/75 text-[10px] text-white backdrop-blur">{product.badge || product.tag || product.category}</Badge>
        {onLike && <button type="button" onClick={onLike} aria-label={liked ? "Retirer des favoris" : "Ajouter aux favoris"} className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-neutral-700 shadow-sm backdrop-blur hover:text-purple-600"><Heart className={`size-4 ${liked ? "fill-purple-600 text-purple-600" : ""}`} /></button>}
        {!product.inStock && <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/45"><span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-neutral-900">Rupture de stock</span></div>}
      </div>
      <div className="space-y-4 p-4 sm:p-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-purple-600">{product.category}</p>
          <Link href={`/produits/${product.id}`} className="mt-1 block min-h-10 text-sm font-semibold leading-5 text-neutral-900 hover:text-purple-700">{product.name}</Link>
          <p className="mt-2 text-base font-black text-neutral-950">{formatPrice(product.price)}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button asChild variant="outline" size="sm"><Link href={`/produits/${product.id}`}><ShoppingBag className="size-4" /> Détails</Link></Button>
          <Button asChild variant="whatsapp" size="sm" disabled={!product.inStock}><a href={createWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer"><MessageCircle className="size-4" /> WhatsApp</a></Button>
        </div>
      </div>
    </Card>
  );
}
