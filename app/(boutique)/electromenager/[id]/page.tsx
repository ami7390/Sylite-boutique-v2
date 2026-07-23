"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image'; 
import { AlertTriangle, Heart, Minus, Plus, ShieldCheck, ShoppingCart, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { trackAnalyticsEvent } from '@/components/analytics/google-analytics';

// IMPORTATION : On se connecte à notre boîte à outils panier
import { useCart } from '../../context/cartcontext';

interface DetailedApplianceProduct {
  id: number;
  name: string;
  price: number;
  formattedPrice: string;
  category: string;
  tag?: string;
  badge?: string;
  image: string;
  inStock: boolean;
  shortDescription: string;
  longDescription: string;
  specs: {
    power?: string;
    capacity?: string;
    warranty: string;
    dimensions?: string;
    energyClass?: string;
    features: string[];
  };
}

export default function FicheProduitPage() {
  const params = useParams();
  const router = useRouter();
  
  // CONNEXION AU PANIER : On récupère la fonction pour ajouter
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState<number>(1);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specs'>('description');

  const productId = Number(params.id);

  const applianceCatalog: DetailedApplianceProduct[] = [
    { 
      id: 101, 
      name: "Robot Culinaire Chauffant Connecté Intelligent", 
      price: 245000, 
      formattedPrice: "245.000 FCFA", 
      category: "Cuisine", 
      tag: "Best-Seller", 
      image: "/robot-cuisine.png", 
      inStock: true,
      shortDescription: "Le compagnon ultime pour automatiser vos repas quotidiens avec plus de 200 recettes guidées pas-à-pas.",
      longDescription: "Redéfinissez votre façon de cuisiner avec ce robot culinaire connecté de haute technologie. Équipé d'un écran tactile intuitif et d'une balance intégrée ultra-précise, il coupe, mixe, pétrit et cuit vos aliments de manière autonome. Sa connectivité Wi-Fi vous permet de synchroniser de nouvelles recettes chaque semaine et de contrôler la cuisson directement depuis votre smartphone.",
      specs: { 
        power: "1500W", 
        capacity: "4.5L", 
        warranty: "2 ans",
        dimensions: "42 x 35 x 38 cm",
        energyClass: "A++",
        features: ["Écran tactile 7 pouces", "Balance intégrée", "Moteur induction garanti 5 ans", "Mise à jour Wi-Fi automatique"]
      }
    },
    { 
      id: 102, 
      name: "Friteuse sans Huile Air Fryer XXL Digitale", 
      price: 85000, 
      formattedPrice: "85.000 FCFA", 
      category: "Cuisine", 
      badge: "Healthy", 
      image: "/air-fryer.png", 
      inStock: true,
      shortDescription: "Savourez des fritures croustillantes et saines avec jusqu'à 90% de matières grasses en moins.",
      longDescription: "Grâce à sa technologie de circulation d'air chaud pulsé à 360°, cet Air Fryer XXL assure une cuisson rapide et uniforme de toutes vos préparations. Son interface numérique propose 8 programmes prédéfinis (frites, poulet, poissons, gâteaux) pour vous simplifier la vie. Sa cuve XL est idéale pour régaler toute la famille en un seul passage.",
      specs: { 
        power: "1800W", 
        capacity: "6.2L (jusqu'à 1.5kg)", 
        warranty: "1 an",
        dimensions: "32 x 32 x 35 cm",
        energyClass: "A+",
        features: ["Écran tactile LED", "Technologie Twin TurboStar", "Cuve anti-adhésive lavable au lave-vaisselle", "Minuteur 60 min"]
      }
    },
    { 
      id: 103, 
      name: "Aspirateur Balai Robot Autonome Haute Performance", 
      price: 180000, 
      formattedPrice: "180.000 FCFA", 
      category: "Entretien", 
      tag: "Nouveau", 
      image: "/aspirateur.jpg", 
      inStock: true,
      shortDescription: "Aspiration puissante et lavage intelligent des sols en totale autonomie.",
      longDescription: "Équipé d'un système de navigation laser LiDAR de dernière génération, cet aspirateur robot cartographie votre maison au millimètre près pour un nettoyage méthodique sans aucun oubli. Il détecte automatiquement les tapis pour augmenter sa puissance d'aspiration et combine un balayage mécanique à une serpillère vibrante pour éliminer les taches les plus tenaces.",
      specs: { 
        power: "Automatique (Aspiration 4000Pa)", 
        capacity: "0.6L (Poussière) + 0.3L (Eau)", 
        warranty: "2 ans",
        dimensions: "35 x 35 x 9.7 cm",
        energyClass: "A+++",
        features: ["Navigation Laser LiDAR", "Cartographie multi-étages", "Autonomie 150 min", "Contrôle via application mobile & Alexa"]
      }
    },
    { 
      id: 104, 
      name: "Centrifugeuse Extracteur de Jus Lente Premium", 
      price: 42000, 
      formattedPrice: "42.000 FCFA", 
      category: "Cuisine", 
      image: "/extracteur-jus.jpg", 
      inStock: true,
      shortDescription: "Préservez 100% des vitamines et nutriments de vos fruits et légumes préférés.",
      longDescription: "Contrairement aux centrifugeuses classiques, cet extracteur utilise une technologie de pression à froid lente (45 tours/minute) pour extraire un maximum de jus tout en évitant l'oxydation des nutriments. Son large goulot d'introduction accueille des fruits entiers pour vous éviter une corvée de découpe fastidieuse.",
      specs: { 
        power: "250W", 
        capacity: "1.0L", 
        warranty: "1 an",
        dimensions: "20 x 15 x 45 cm",
        energyClass: "A",
        features: ["Extraction lente à froid", "Goulot extra-large 85mm", "Système anti-goutte", "Silencieux (<40 dB)"]
      }
    },
    { 
      id: 105, 
      name: "Machine à Café Expresso Broyeur de Grain Connectée", 
      price: 320000, 
      formattedPrice: "320.000 FCFA", 
      category: "Cuisine", 
      badge: "Luxe", 
      image: "/machine-cafe.png", 
      inStock: false,
      shortDescription: "L'arôme authentique d'un café fraîchement moulu par un barista, à la maison.",
      longDescription: "Destinée aux véritables amateurs de café, cette machine intègre un broyeur en acier conique avec 13 réglages de mouture. Son système de moussage automatique prépare des cappuccinos onctueux d'une simple touche. Via l'application, configurez et enregistrez vos profils de boissons personnalisés (intensité, température, volume de lait).",
      specs: { 
        power: "1450W / Pression 19 bars", 
        capacity: "1.8L (Réservoir)", 
        warranty: "2 ans",
        dimensions: "24 x 43 x 35 cm",
        energyClass: "A",
        features: ["Broyeur grains intégré", "Carafe à lait thermique LatteCrema", "Écran couleur tactile", "Nettoyage automatique"]
      }
    },
    { 
      id: 106, 
      name: "Fer à Repasser Centrale Vapeur Haute Pression", 
      price: 65000, 
      formattedPrice: "65.000 FCFA", 
      category: "Entretien", 
      image: "/fer-repasser.png", 
      inStock: true,
      shortDescription: "Un repassage professionnel ultra-rapide grâce à la puissance de la vapeur haute pression.",
      longDescription: "Gagnez un temps précieux sur vos séances de repassage. Cette centrale vapeur délivre un débit continu surpuissant capable de traverser les tissus les plus épais pour éliminer les faux plis en un seul geste. Sa semelle technologique glisse sans aucun effort et s'ajuste automatiquement à la température idéale pour chaque textile.",
      specs: { 
        power: "2400W / 7.5 bars", 
        capacity: "1.5L (Réservoir amovible)", 
        warranty: "1 an",
        dimensions: "40 x 28 x 31 cm",
        energyClass: "A+",
        features: ["Effet pressing puissant", "Semelle anti-rayures", "Système de verrouillage sécurisé", "Collecteur de tartre express"]
      }
    },
  ];

  const product = applianceCatalog.find(p => p.id === productId);

  useEffect(() => {
    if (!product) return;
    trackAnalyticsEvent("view_item", {
      currency: "XOF",
      value: product.price,
      items: [{ item_id: String(product.id), item_name: product.name, item_category: product.category, price: product.price, quantity: 1 }],
    });
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 p-4 text-center">
        <AlertTriangle className="h-10 w-10 mb-2 text-amber-500" />
        <h1 className="text-lg font-bold text-neutral-800">Appareil introuvable</h1>
        <p className="text-neutral-500 max-w-xs mt-1 mb-6">La référence demandée n'existe pas ou a été déplacée.</p>
        <Button variant="purple" onClick={() => router.push('/electromenager')}>Retour au catalogue</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      category: product.category,
    });
  };

  return (
    <div className="bg-neutral-50/60 min-h-screen text-xs text-neutral-800 pb-24 lg:pb-12 selection:bg-purple-500 selection:text-white">
      
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 text-[11px] text-neutral-400 font-medium flex items-center gap-2">
        <span className="cursor-pointer hover:text-purple-600" onClick={() => router.push('/electromenager')}>Catalogue</span>
        <span>/</span>
        <span className="text-neutral-500">{product.category}</span>
        <span>/</span>
        <span className="text-neutral-900 font-semibold truncate max-w-[180px] sm:max-w-none">{product.name}</span>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Card className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-4 sm:p-8 rounded-3xl border-neutral-200/60 shadow-sm">
          
          <div className="space-y-4">
            <div className="relative aspect-square bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="p-6 object-contain"
                priority
              />
              {product.tag && (
                <Badge className="absolute top-4 left-4 bg-purple-600 text-white text-[9px] uppercase tracking-wider">
                  {product.tag}
                </Badge>
              )}
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-amber-500 text-neutral-950 text-[9px] uppercase tracking-wider">
                  {product.badge}
                </Badge>
              )}
              
              <button 
                onClick={() => setIsLiked(!isLiked)} 
                className="absolute top-4 right-4 bg-white shadow-sm hover:shadow-md border p-2.5 rounded-full text-base transition-transform active:scale-95"
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-rose-500 text-rose-500" : "text-neutral-500"}`} />
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-purple-600 font-bold uppercase tracking-widest">{product.category}</span>
                <div className="flex items-center gap-1.5 font-bold">
                  <span className={`h-2 w-2 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  <span className={product.inStock ? 'text-emerald-600' : 'text-rose-600'}>
                    {product.inStock ? 'Disponible Immédiatement' : 'Rupture de stock temporaire'}
                  </span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold font-serif text-neutral-900 tracking-wide leading-tight">
                {product.name}
              </h1>
              <p className="text-neutral-500 font-light leading-relaxed text-[13px]">
                {product.shortDescription}
              </p>

              <div className="py-2 border-y border-neutral-100 flex items-baseline gap-3">
                <span className="text-2xl font-black text-neutral-900">{product.formattedPrice}</span>
                <span className="text-[10px] text-neutral-400 font-medium">TVA incluse / Retrait direct ou Livraison</span>
              </div>

              {product.inStock && (
                <div className="space-y-2">
                  <span className="text-neutral-400 font-medium block">Quantité :</span>
                  <div className="flex items-center gap-1 bg-neutral-100 w-fit p-1 rounded-xl border">
                    <Button variant="ghost" size="icon"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-8 h-8 font-bold text-neutral-600 hover:bg-white rounded-lg transition-colors text-sm"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center font-bold text-sm text-neutral-900">{quantity}</span>
                    <Button variant="ghost" size="icon"
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-8 h-8 font-bold text-neutral-600 hover:bg-white rounded-lg transition-colors text-sm"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* ACTION DU BOUTON (ORDINATEUR) */}
            <div className="hidden sm:flex items-center gap-3 pt-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-grow py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-center transition-all ${
                  product.inStock 
                    ? 'bg-neutral-950 text-white hover:bg-purple-600 shadow-sm' 
                    : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                }`}
              >
                {product.inStock && <ShoppingCart className="h-4 w-4" />}{product.inStock ? 'Ajouter au panier' : 'Épuisé'}
              </Button>
            </div>

            <div className="bg-neutral-50 border rounded-2xl p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-purple-600" />
                <div>
                  <h4 className="font-bold text-neutral-800">Livraison Domestique Sécurisée</h4>
                  <p className="text-neutral-500 font-light mt-0.5">Livraison rapide sur Bamako avec vérification physique obligatoire lors de la réception.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t pt-3">
                <ShieldCheck className="h-5 w-5 text-purple-600" />
                <div>
                  <h4 className="font-bold text-neutral-800">Garantie & Support Direct</h4>
                  <p className="text-neutral-500 font-light mt-0.5">Équipement couvert pendant <span className="font-semibold text-neutral-700">{product.specs.warranty}</span> avec assistance prioritaire.</p>
                </div>
              </div>
            </div>

          </div>
        </Card>

        <section className="mt-8 bg-white border border-neutral-200/60 rounded-3xl p-4 sm:p-8 shadow-sm space-y-6">
          <div className="flex border-b gap-6 text-sm font-medium">
            <button 
              onClick={() => setActiveTab('description')}
              className={`pb-3 font-serif font-bold tracking-wide transition-all ${activeTab === 'description' ? 'border-b-2 border-purple-600 text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'}`}
            >
              Description Complète
            </button>
            <button 
              onClick={() => setActiveTab('specs')}
              className={`pb-3 font-serif font-bold tracking-wide transition-all ${activeTab === 'specs' ? 'border-b-2 border-purple-600 text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'}`}
            >
              Spécifications Techniques
            </button>
          </div>

          {activeTab === 'description' && (
            <div className="max-w-4xl text-[13px] font-light leading-relaxed text-neutral-600 space-y-4">
              <p>{product.longDescription}</p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl border rounded-xl overflow-hidden bg-neutral-50/50">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {product.specs.power && (
                    <tr className="border-b"><td className="p-3 font-bold text-neutral-500 bg-neutral-100/60 w-1/3">Puissance brute</td><td className="p-3 text-neutral-800 font-medium">{product.specs.power}</td></tr>
                  )}
                  {product.specs.capacity && (
                    <tr className="border-b"><td className="p-3 font-bold text-neutral-500 bg-neutral-100/60">Capacité de charge</td><td className="p-3 text-neutral-800 font-medium">{product.specs.capacity}</td></tr>
                  )}
                  {product.specs.dimensions && (
                    <tr className="border-b"><td className="p-3 font-bold text-neutral-500 bg-neutral-100/60">Dimensions physiques</td><td className="p-3 text-neutral-800 font-medium">{product.specs.dimensions}</td></tr>
                  )}
                  {product.specs.energyClass && (
                    <tr className="border-b"><td className="p-3 font-bold text-neutral-500 bg-neutral-100/60">Classe Énergétique</td><td className="p-3 text-neutral-800 font-medium">{product.specs.energyClass}</td></tr>
                  )}
                  <tr>
                    <td className="p-3 font-bold text-neutral-500 bg-neutral-100/60 items-start align-top">Fonctionnalités Clés</td>
                    <td className="p-3 text-neutral-800 font-medium">
                      <ul className="list-disc list-inside space-y-1 font-light text-neutral-600">
                        {product.specs.features.map((feature, i) => <li key={i}>{feature}</li>)}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* ACTION DU BOUTON (STICKY MOBILE CLIQUE EN BAS) */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 bg-white border-t border-neutral-200 p-4 z-50 flex items-center justify-between gap-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <div>
          <span className="text-[10px] text-neutral-400 block font-medium">Montant Global</span>
          <span className="text-base font-black text-neutral-900">{product.formattedPrice}</span>
        </div>
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`py-3 px-6 rounded-xl font-bold uppercase tracking-wider text-center text-[11px] flex-grow shadow-md transition-all ${
            product.inStock 
              ? 'bg-neutral-950 text-white active:bg-purple-600' 
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none'
          }`}
        >
          {product.inStock && <ShoppingCart className="h-4 w-4" />}{product.inStock ? 'Ajouter' : 'Épuisé'}
        </Button>
      </div>

    </div>
  );
}
