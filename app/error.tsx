"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-4 text-center"><div className="rounded-full bg-purple-50 p-4 text-purple-600"><AlertTriangle className="size-8" /></div><h1 className="mt-5 font-serif text-3xl text-neutral-950">Un imprévu est survenu</h1><p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">La boutique n’a pas pu charger cette page. Vous pouvez réessayer sans perdre votre panier.</p><div className="mt-6 flex gap-3"><Button onClick={reset}><RefreshCw className="size-4" /> Réessayer</Button><Button asChild variant="outline"><Link href="/">Retour à l’accueil</Link></Button></div></main>;
}
