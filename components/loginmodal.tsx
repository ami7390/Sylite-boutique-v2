"use client";

import { useState } from "react";
import { AlertCircle, LoaderCircle, LogIn } from "lucide-react";
import { supabase } from "@/lib/supabaseclient";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface LoginModalProps {
  onLoginSuccess: () => void;
  onClose: () => void;
}

export default function LoginModal({ onLoginSuccess, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
      if (loginError) throw loginError;
      onLoginSuccess();
      onClose();
    } catch (caughtError: unknown) {
      setError(caughtError instanceof Error ? caughtError.message : "Identifiants incorrects");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center sm:text-center">
          <DialogTitle className="font-serif text-xl font-bold text-neutral-950">Connexion Admin</DialogTitle>
          <DialogDescription className="text-xs">Réservé à l&apos;équipe de gestion SYLITE</DialogDescription>
        </DialogHeader>

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-600" role="alert">
            <AlertCircle className="mt-0.5 size-4 shrink-0" /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="admin-email" className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-neutral-700">Email</label>
            <Input id="admin-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="exemple@sylite.com" />
          </div>
          <div>
            <label htmlFor="admin-password" className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-neutral-700">Mot de passe</label>
            <Input id="admin-password" type="password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" />
          </div>
          <Button type="submit" disabled={loading} className="mt-2 w-full text-xs font-bold uppercase tracking-widest">
            {loading ? <LoaderCircle className="size-4 animate-spin" /> : <LogIn className="size-4" />}
            {loading ? "Vérification..." : "Se connecter"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
