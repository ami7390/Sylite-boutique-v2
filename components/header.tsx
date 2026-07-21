"use client";

import UserMenu from './usermenu'; // Importation de votre nouveau composant de compte
import { useState } from 'react';
import Image from 'next/image'; 
import Link from 'next/link'; // Importation de Link pour de meilleures performances de navigation
import { usePathname, useRouter } from 'next/navigation'; // Hook pour récupérer l'URL actuelle
import { Menu, Minus, Plus, Search, ShoppingBag, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { createWhatsAppUrl } from '@/lib/store-config';

// IMPORTATION : On écoute les données de notre panier global
import { useCart } from '../app/(boutique)/context/cartcontext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname(); // Contient le chemin actuel (ex: "/" ou "/nouveau-arrivage")
  const router = useRouter();

  // CONNEXION AU PANIER : On récupère la liste des produits choisis
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // On calcule automatiquement le nombre total d'articles (prend en compte les quantités)
  const totalArticles = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    setIsOpen(false);
    router.push(`/collection?search=${encodeURIComponent(query)}`);
  };

  // Fonction magique qui regroupe la commande et ouvre WhatsApp
  const handleSendWhatsAppOrder = () => {
    if (cartItems.length === 0) {
      alert("Votre panier est vide.");
      return;
    }

    // 1. On construit le texte de la commande ligne par ligne
    let textCommande = "Bonjour SYLITE ! Je souhaite passer commande pour les articles suivants :\n\n";
    
    let totalGlobal = 0;
    cartItems.forEach((item) => {
      const sousTotal = item.price * item.quantity;
      totalGlobal += sousTotal;
      textCommande += `• ${item.name} (Qté : ${item.quantity}) - ${sousTotal.toLocaleString()} FCFA\n`;
    });

    textCommande += `\n➡ *Montant Total : ${totalGlobal.toLocaleString()} FCFA*`;
    textCommande += "\n\nMerci de me confirmer la disponibilité et les modalités de livraison !";

    window.open(createWhatsAppUrl(textCommande), '_blank', 'noopener,noreferrer');
  };

  // Liste centralisée des onglets pour automatiser l'activation des styles
  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Nouvel Arrivage", href: "/nouvel-arrivage" },
    { name: "Collection", href: "/collection" },
    { name: "Soins", href: "/soins" },
    { name: "Électroménager", href: "/electromenager" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white border-b border-neutral-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="block relative w-32 h-10">
              <Image 
                src="/logo.png" 
                alt="SYLITE Logo"
                fill
                sizes="128px"
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Navigation - Liens Principaux (Desktop Dynamique) */}
          <div className="hidden h-full items-center gap-5 text-sm font-medium lg:flex xl:gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-1 pt-1 h-full flex items-center border-b-2 transition-colors ${
                    isActive
                      ? "text-purple-600 border-purple-600 font-semibold"
                      : "text-neutral-500 border-transparent hover:text-purple-600 hover:border-purple-200"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Barre de Recherche et Utilitaires (Desktop) */}
          <div className="hidden items-center space-x-3 lg:flex">
            <form className="relative hidden xl:block" role="search" onSubmit={handleSearch}>
              <Input
                type="text"
                placeholder="Rechercher une pièce..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                aria-label="Rechercher un produit"
                className="h-9 w-48 rounded-full pl-4 pr-10 text-xs"
              />
              <button type="submit" aria-label="Lancer la recherche" className="absolute right-2 top-1.5 rounded-full p-1 text-neutral-400 hover:text-purple-600">
                <Search aria-hidden="true" className="size-4" strokeWidth={1.8} />
              </button>
            </form>
            
            {/* COMPOSANT USER MENU INTÉGRÉ ICI (REMPLACE L'ANCIENNE ICÔNE STATIQUE) */}
            <UserMenu />
            
            {/* BOUTON PANIER MODIFIÉ */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative text-neutral-600"
              aria-label="Panier"
            >
              <ShoppingBag aria-hidden="true" className="size-5" strokeWidth={1.8} />
              {totalArticles > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white rounded-full text-[9px] w-4 h-4 flex items-center justify-center font-bold animate-pulse">
                  {totalArticles}
                </span>
              )}
            </Button>
          </div>

          {/* Barre d'utilitaires et Menu Mobile */}
          <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
            
            {/* ESPACE COMPTE ACCESSIBLE SUR MOBILE ÉGALEMENT */}
            <UserMenu />

            {/* PANIER RAPIDE VISIBLE SUR MOBILE À CÔTÉ DU CHEVRON */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative text-neutral-600"
              aria-label="Panier"
            >
              <ShoppingBag aria-hidden="true" className="size-5" strokeWidth={1.8} />
              {totalArticles > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white rounded-full text-[9px] w-4 h-4 flex items-center justify-center font-bold">
                  {totalArticles}
                </span>
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-600"
              aria-label="Toggle menu"
            >
              {isOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
            </Button>
          </div>

        </div>
      </div>

      {/* Menu Déroulant Onglets (Mobile Dynamique) */}
      {isOpen && (
        <div className="bg-white border-t border-neutral-100 px-4 pt-2 pb-4 space-y-2 shadow-inner lg:hidden">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)} // Ferme le menu mobile au clic
                className={`block px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                  isActive
                    ? "bg-purple-50 text-purple-600 font-semibold"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-purple-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          <form className="pt-4 px-3 relative" role="search" onSubmit={handleSearch}>
            <Input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              aria-label="Rechercher un produit"
              className="w-full rounded-full pl-4 pr-10 text-xs"
            />
            <button type="submit" aria-label="Lancer la recherche" className="absolute right-5 top-5 rounded-full p-1 text-neutral-400 hover:text-purple-600">
              <Search aria-hidden="true" className="size-4" strokeWidth={1.8} />
            </button>
          </form>
        </div>
      )}

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="flex w-full flex-col sm:max-w-md">
          <SheetHeader className="border-b border-neutral-100 pb-4 pr-8">
            <SheetTitle>Votre panier <span className="text-sm font-normal text-neutral-500">({totalArticles})</span></SheetTitle>
          </SheetHeader>

          {cartItems.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <div className="mb-4 rounded-full bg-purple-50 p-4 text-purple-600"><ShoppingBag className="size-7" /></div>
              <p className="font-semibold text-neutral-900">Votre panier est vide</p>
              <p className="mt-1 max-w-xs text-sm text-neutral-500">Ajoutez un article pour préparer votre commande WhatsApp.</p>
              <Button className="mt-6" variant="purple" onClick={() => { setIsCartOpen(false); router.push('/collection'); }}>Découvrir la collection</Button>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-4 overflow-y-auto py-5">
                {cartItems.map((item) => (
                  <article key={String(item.id)} className="rounded-2xl border border-neutral-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 gap-3">
                        {item.image && <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-neutral-100"><Image src={item.image} alt="" fill sizes="56px" className="object-cover" /></div>}
                        <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-neutral-900">{item.name}</h3>
                        <p className="mt-1 text-sm font-bold text-purple-700">{item.price.toLocaleString('fr-FR')} FCFA</p>
                        {(item.size || item.color) && <p className="mt-1 text-[11px] text-neutral-500">{[item.size, item.color].filter(Boolean).join(" • ")}</p>}
                        </div>
                      </div>
                      <button type="button" onClick={() => removeFromCart(item.id)} aria-label={`Supprimer ${item.name}`} className="rounded-lg p-2 text-neutral-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="size-4" /></button>
                    </div>
                    <div className="mt-4 inline-flex items-center rounded-full border border-neutral-200">
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Diminuer la quantité" className="p-2 hover:text-purple-600"><Minus className="size-3.5" /></button>
                      <span className="min-w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Augmenter la quantité" className="p-2 hover:text-purple-600"><Plus className="size-3.5" /></button>
                    </div>
                  </article>
                ))}
              </div>
              <div className="border-t border-neutral-200 pt-5">
                <div className="mb-4 flex items-center justify-between"><span className="text-sm text-neutral-500">Sous-total</span><strong className="text-lg text-neutral-950">{cartTotal.toLocaleString('fr-FR')} FCFA</strong></div>
                <Button className="w-full" size="lg" variant="purple" onClick={handleSendWhatsAppOrder}>Commander sur WhatsApp</Button>
                <p className="mt-3 text-center text-[11px] text-neutral-500">Disponibilité et livraison confirmées avec notre équipe.</p>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </nav>
  );
}
