import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // On garde impérativement les styles Tailwind globaux ici

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sylite-boutique.vercel.app"),
  title: { default: "SyLite — Mode, soins et maison à Bamako", template: "%s | SyLite" },
  description: "Découvrez la sélection SyLite : mode féminine, soins, bien-être et électroménager. Commande accompagnée sur WhatsApp et livraison à Bamako.",
  openGraph: { title: "SyLite — Votre style, votre signature", description: "Mode, soins et maison sélectionnés avec soin à Bamako.", type: "website", locale: "fr_FR", siteName: "SyLite" },
  twitter: { card: "summary_large_image", title: "SyLite", description: "Mode, soins et maison à Bamako." },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      {/* 
        Le layout racine ne contient PLUS NI Header, NI Footer, NI CartProvider.
        Il se contente d'ouvrir les portes du site avec les balises de base.
      */}
      <body className={`${inter.className} min-h-full flex flex-col bg-neutral-950 antialiased`}>
        
        {children} {/* C'est ici que s'injectera soit la boutique, soit la maintenance */}
        
      </body>
    </html>
  );
}
