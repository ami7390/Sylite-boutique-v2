"use client";

import Link from "next/link";
import { Heart, MessageCircle, Package, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost" size="icon" aria-label="Ouvrir le menu du compte">
          <UserRound className="size-5" strokeWidth={1.7} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-2">
        <DropdownMenuLabel className="rounded-xl bg-purple-50/60 p-3">
          <p className="text-[12px] font-bold text-neutral-900">Espace client SyLite</p>
          <p className="mt-0.5 text-[10px] font-light text-neutral-500">Vos services et demandes</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/orders"><Package className="size-4" /> Suivre une commande</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/wishlist"><Heart className="size-4" /> Ma Liste d&apos;envies</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild><Link href="/contact"><MessageCircle className="size-4" /> Contacter la conciergerie</Link></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
