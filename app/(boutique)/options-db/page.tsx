import { redirect } from "next/navigation";

export default async function LegacyDatabaseOptionsPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  redirect(id ? `/produits/${id}` : "/collection");
}
