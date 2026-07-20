import { Suspense } from "react";
import OptionsClient from "./OptionsClient";
import { Skeleton } from "@/components/ui/skeleton";

export default function OptionsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto grid min-h-screen max-w-5xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-2">
          <Skeleton className="min-h-[520px]" />
          <div className="space-y-4"><Skeleton className="h-8 w-3/4" /><Skeleton className="h-12 w-1/3" /><Skeleton className="h-48" /></div>
        </div>
      }
    >
      <OptionsClient />
    </Suspense>
  );
}
