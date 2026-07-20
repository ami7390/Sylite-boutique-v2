"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, Heart, LogOut, MapPin, Package, UserRound } from "lucide-react";
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
  const router = useRouter();
  const user = { name: "Aminata Diawara", email: "aminatadiawara7390@gmail.com" };

  const handleLogout = () => router.push("/");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost" size="icon" aria-label="Ouvrir le menu du compte">
          <UserRound className="size-5" strokeWidth={1.7} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-2">
        <DropdownMenuLabel className="rounded-xl bg-purple-50/60 p-3">
          <p className="text-[12px] font-bold text-neutral-900">{user.name}</p>
          <p className="mt-0.5 text-[10px] font-light text-neutral-400">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/orders"><Package className="size-4" /> Mes commandes & Suivi</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/wishlist"><Heart className="size-4" /> Ma Liste d&apos;envies</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/addresses"><MapPin className="size-4" /> Adresses de livraison</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/invoices"><FileText className="size-4" /> Factures & Reçus</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleLogout} className="text-neutral-500 focus:bg-red-50 focus:text-red-600">
          <LogOut className="size-4" /> Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
