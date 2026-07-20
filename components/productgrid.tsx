"use client";

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabaseclient';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Utilisation de l'alias absolu pour cibler directement ton vrai fichier
// @ts-ignore
// @ts-ignore
// @ts-ignore
import { allProducts as productsData } from '@/app/data/products';

interface Product {
  id: string | number;
  name: string;
  price: number | string;
  category: string;
  image_url: string;
}

interface ProductGridProps {
  filterCategory?: string;
}

export default function ProductGrid({ filterCategory }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const WHATSAPP_NUMBER = "22394939380";

  useEffect(() => {
    const loadAllProducts = async () => {
      setLoading(true);
      try {
        // 1. Récupération des produits en ligne (Supabase)
        const { data: supabaseProducts, error } = await (supabase as any)
          .from('products')
          .select('*');

        // 2. Récupération de TOUS tes vrais produits depuis app/data/products.js
        const localItems = Array.isArray(productsData) 
          ? productsData 
          : (productsData as any).products || [];

        let combinedList = [...localItems];

        // Si Supabase contient des produits, on les fusionne au début
        if (!error && supabaseProducts && supabaseProducts.length > 0) {
          combinedList = [...supabaseProducts, ...combinedList];
        }

        // 3. Application du filtrage par catégorie
        if (filterCategory) {
          combinedList = combinedList.filter(
            (p) => p.category?.toLowerCase() === filterCategory.toLowerCase()
          );
        }

        setProducts(combinedList);
      } catch (err) {
        console.error("Erreur lors du chargement combiné :", err);
        const fallback = Array.isArray(productsData) ? productsData : (productsData as any).products || [];
        setProducts(filterCategory ? fallback.filter((p: any) => p.category === fallback) : fallback);
      } finally {
        setLoading(false);
      }
    };

    loadAllProducts();
  }, [filterCategory]);

  if (loading) {
    return <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-[430px] bg-neutral-800/60" />)}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        /* ICI : Modification de la key pour s'assurer qu'elle soit unique au monde, combinant ID, nom et index */
        <Card key={`product-${product.id}-${product.name}-${index}`} className="group flex flex-col justify-between overflow-hidden border-neutral-800/80 bg-neutral-900/40 transition-all duration-300 hover:border-purple-500/30">
          <div className="aspect-square relative overflow-hidden bg-neutral-950">
            <img 
              src={product.image_url || (product as any).image} 
              alt={product.name} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
            />
            <Badge className="absolute left-3 top-3 border border-purple-500/30 bg-purple-900/80 text-purple-300 backdrop-blur-sm">
              {product.category}
            </Badge>
          </div>
          
          <div className="p-5 flex flex-col flex-grow justify-between">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-white tracking-wide">{product.name}</h4>
              <p className="text-purple-400 font-serif font-semibold text-sm mt-1">{product.price} FCFA</p>
            </div>

            <Button asChild variant="purple" className="w-full text-xs font-bold uppercase tracking-wider shadow-md shadow-purple-700/20">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Bonjour%20SyLite,%20je%20souhaite%20commander%20l'article%20%22${encodeURIComponent(product.name)}%22%20au%20prix%20de%20${product.price}%20FCFA.`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" /> Commander via WhatsApp
              </a>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
