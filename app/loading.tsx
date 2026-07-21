import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return <main className="mx-auto min-h-screen max-w-7xl space-y-8 px-4 py-10"><Skeleton className="h-52 w-full rounded-3xl" /><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} className="h-80 rounded-2xl" />)}</div></main>;
}
