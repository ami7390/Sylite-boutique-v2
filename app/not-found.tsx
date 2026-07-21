import Link from "next/link";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-4 text-center"><SearchX className="size-10 text-purple-600" /><p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-purple-600">Erreur 404</p><h1 className="mt-3 font-serif text-4xl text-neutral-950">Cette page n’existe plus</h1><p className="mt-3 max-w-md text-sm text-neutral-500">Retrouvez toutes les pièces disponibles dans notre collection actuelle.</p><Button asChild className="mt-7"><Link href="/collection">Voir la collection</Link></Button></main>;
}
