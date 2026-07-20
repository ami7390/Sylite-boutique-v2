import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn("flex h-10 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/15 disabled:cursor-not-allowed disabled:opacity-50", className)}
      {...props}
    />
  )
}

export { Input }
