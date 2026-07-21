export const STORE_CONFIG = {
  name: "SyLite",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "22394939380",
  locale: "fr-FR",
  currency: "FCFA",
  location: "Bamako, Mali",
} as const;

export function createWhatsAppUrl(message: string) {
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
