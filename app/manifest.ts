import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "SyLite Boutique", short_name: "SyLite", description: "Mode, soins et maison à Bamako", start_url: "/", display: "standalone", background_color: "#ffffff", theme_color: "#9333ea", icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }] };
}
