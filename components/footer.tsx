import Image from 'next/image';
import Link from 'next/link';
import { Camera, MapPin, ThumbsUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Bloc Logo & Description */}
          <div className="space-y-4">
            <div className="relative w-32 h-10">
              <Image 
                src="/logo.png" // Votre logo dans le dossier /public
                alt="SYLITE Logo"
                fill
                sizes="128px"
                className="object-contain"
                priority
              />
            </div>
            <p className="text-xs leading-relaxed max-w-sm">
              L'élégance moderne à votre portée. Découvrez nos collections exclusives pensées pour sublimer votre quotidien.
            </p>
          </div>

          {/* Liens de Navigation */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-purple-400 transition-colors">Accueil</Link></li>
              <li><Link href="/nouvel-arrivage" className="hover:text-purple-400 transition-colors">Nouvel Arrivage</Link></li>
              <li><Link href="/collection" className="hover:text-purple-400 transition-colors">Collection</Link></li>
              <li><Link href="/soins" className="hover:text-purple-400 transition-colors">Soins</Link></li>
              <li><Link href="/electromenager" className="hover:text-purple-400 transition-colors">Électroménager</Link></li>
              <li><Link href="/contact" className="hover:text-purple-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Informations Légales */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Informations</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/mentions-legales" className="hover:text-purple-400 transition-colors">Mentions Légales</Link></li>
              <li><Link href="/cgv" className="hover:text-purple-400 transition-colors">Conditions Générales de Vente</Link></li>
              <li><Link href="/politique-confidentialite" className="hover:text-purple-400 transition-colors">Politique de Confidentialité</Link></li>
            </ul>
          </div>

          {/* Newsletter / Contact Rapide */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Contact</h3>
            <p className="text-xs mb-3">Besoin d'aide ? Écrivez-nous à :</p>
            <p className="text-sm font-medium text-purple-400">contact@sylite.com</p>
            <div className="flex space-x-4 mt-4 text-lg">
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram"><Camera className="size-5" /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Facebook"><ThumbsUp className="size-5" /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Localisation"><MapPin className="size-5" /></a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-800 mt-12 pt-6 text-center text-[11px] text-neutral-500">
          <p>&copy; {new Date().getFullYear()} SYLITE. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
