import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider", {
  variants: {
    variant: {
      default: "border-transparent bg-purple-600 text-white",
      secondary: "border-neutral-200 bg-neutral-100 text-neutral-700",
      outline: "border-purple-200 bg-purple-50 text-purple-700",
      success: "border-transparent bg-emerald-500 text-white",
      destructive: "border-transparent bg-red-600 text-white",
    },
  },
  defaultVariants: { variant: "default" },
})

function Badge({ className, variant, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
