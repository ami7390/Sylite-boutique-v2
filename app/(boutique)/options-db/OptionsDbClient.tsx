"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Minus, PackageX, Plus } from 'lucide-react';
import { supabase } from '@/lib/supabaseclient';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface DbProduct {
  id: number | string;
  name?: string;
  category?: string;
  image_url?: string;
  image?: string;
  price?: number | string;
  description?: string; 
  tag?: string;
  badge?: string;
  inStock?: boolean;
}

export default function OptionsDbClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get('id');

  const [product, setProduct] = useState<DbProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const defaultSizes = ["S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .single();

        if (!error && data) {
          setProduct(data as DbProduct);
        } else {
          console.error("Produit introuvable ou erreur Supabase:", error?.message);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération du produit :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const displayPrice = product?.price
    ? typeof product.price === 'string' && product.price.includes("FCFA")
      ? product.price
      : `${Number(product.price).toLocaleString('fr-FR')} FCFA`
    : "Prix non disponible";

  // Fonction générant le lien WhatsApp lié au 94939380
  const getWhatsAppLink = () => {
    if (!product) return "#";
    
    const message = `Bonjour Sylite, je souhaite commander l'article suivant :
• *Nom* : ${product.name}
• *Catégorie* : ${product.category || 'Non spécifiée'}
• *Prix* : ${displayPrice}
• *Taille choisie* : ${selectedSize || 'Non spécifiée'}
• *Quantité* : ${quantity}
• *Lien* : ${window.location.href}`;

    return `https://wa.me/22394939380?text=${encodeURIComponent(message)}`;
  };

  if (loading) {
    return (
      <div className="mx-auto grid min-h-screen max-w-5xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-2"><Skeleton className="min-h-[520px]" /><Skeleton className="min-h-[420px]" /></div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50/60 flex flex-col items-center justify-center p-4 text-center space-y-4">
        <PackageX className="size-8 text-purple-600" />
        <h1 className="text-sm font-bold text-neutral-800">Produit introuvable</h1>
        <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
          Ce modèle n'existe pas ou a été retiré de notre catalogue en ligne.
        </p>
        <Button onClick={() => router.back()} size="sm"><ArrowLeft className="size-4" /> Retour au catalogue</Button>
      </div>
    );
  }

  const productImage = product.image_url || product.image || '';

  return (
    <div className="bg-neutral-50/60 min-h-screen pb-16 text-xs">
      
      <nav className="bg-white border-b border-neutral-200/80 px-4 py-3 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Button onClick={() => router.back()} variant="ghost" size="sm"><ArrowLeft className="size-4" /> Retour au catalogue</Button>
          <span className="text-neutral-400 font-mono tracking-wider uppercase text-[10px] hidden sm:inline">
            Fiche Produit Personnalisée
          </span>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-4 sm:p-8">
          
          {/* ZONE DE L'IMAGE */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] w-full bg-neutral-100 rounded-xl overflow-hidden group border border-neutral-100">
              {productImage ? (
                <Image 
                  src={productImage} 
                  alt={product.name || "Produit"} 
                  fill 
                  className="object-cover object-center"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-400">
                  Aucun visuel disponible
                </div>
              )}

              {(product.tag || product.badge) && (
                <Badge className="absolute left-3 top-3 z-10 rounded shadow-sm">
                  {product.tag || product.badge}
                </Badge>
              )}
            </div>
          </div>

          {/* ZONE DES OPTIONS ET DÉTAILS */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-purple-600 font-bold block uppercase tracking-wider mb-1">
                  {product.category || "Collection Sylite"}
                </span>
                <h1 className="text-xl sm:text-2xl font-serif text-neutral-900 tracking-wide font-medium">
                  {product.name}
                </h1>
              </div>

              <div className="text-lg sm:text-xl font-bold text-neutral-900 bg-neutral-50 px-3 py-2 rounded-xl inline-block">
                {displayPrice}
              </div>

              {/* DESCRIPTION UNIQUE DU PRODUIT */}
              <div className="space-y-1.5 pt-4 border-t border-neutral-100">
                <h3 className="font-bold text-neutral-800 uppercase tracking-wider text-[10px]">
                  Description du produit
                </h3>
                <p className="text-neutral-600 leading-relaxed font-light text-xs whitespace-pre-line">
                  {product.description && product.description.trim() !== "" 
                    ? product.description 
                    : "Ce modèle exclusif fait partie de notre nouvelle sélection. Conçu avec soin pour vous offrir un style unique et un confort optimal au quotidien."
                  }
                </p>
              </div>

              {/* Sélection des tailles */}
              <div className="space-y-2 pt-2">
                <h3 className="font-bold text-neutral-800 uppercase tracking-wider text-[10px]">Sélectionner une Taille</h3>
                <div className="flex flex-wrap gap-2">
                  {defaultSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-9 w-12 font-bold rounded-lg border transition-all flex items-center justify-center ${
                        selectedSize === size
                          ? "bg-purple-600 border-purple-600 text-white shadow-sm"
                          : "border-neutral-200 text-neutral-700 bg-white hover:border-neutral-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sélection de la quantité */}
              <div className="space-y-2 pt-2">
                <h3 className="font-bold text-neutral-800 uppercase tracking-wider text-[10px]">Quantité</h3>
                <div className="flex items-center gap-1 border border-neutral-200 rounded-lg w-28 bg-white overflow-hidden shadow-sm">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity(prev => prev - 1)}
                  >
                    <Minus className="size-4" />
                  </Button>
                  <span className="flex-grow text-center font-bold text-neutral-800">{quantity}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setQuantity(prev => prev + 1)}
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* LE BOUTON WHATSAPP INTEGRÉ AU NUMÉRO 94939380 */}
            <div className="space-y-3 pt-4 border-t border-neutral-100">
              <Button asChild className="h-11 w-full text-xs font-bold uppercase tracking-wider shadow-md">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer"><MessageCircle className="size-4" /> Confirmer l&apos;achat sur WhatsApp</a>
              </Button>
              <Link href="/collection" className="w-full py-3 border border-neutral-200 text-neutral-700 font-medium rounded-xl text-center hover:bg-neutral-50 transition-all block text-xs">
                Continuer mes achats
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
