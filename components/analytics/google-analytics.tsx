"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!measurementId || !isReady || typeof window.gtag !== "function") return;

    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${pathname}${window.location.search}`,
    });
  }, [isReady, pathname]);

  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        onLoad={() => {
          window.dataLayer = window.dataLayer || [];
          window.gtag = (...args: unknown[]) => window.dataLayer.push(args);
          window.gtag("js", new Date());
          window.gtag("config", measurementId, {
            send_page_view: false,
            anonymize_ip: true,
          });
          setIsReady(true);
        }}
      />
    </>
  );
}

export function trackAnalyticsEvent(
  eventName: string,
  parameters: Record<string, string | number | boolean | undefined> = {},
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, parameters);
}
