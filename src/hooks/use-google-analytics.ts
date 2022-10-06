import { useEffect } from "react";

import { useRouter } from "next/router";

interface UseGoogleAnalyticsReturn {
  trackEvent(
    action: string,
    params?: Gtag.CustomParams | Gtag.ControlParams | Gtag.EventParams,
  ): void;
  trackPage(path: string): void;
  trackModal(path: string): void;
}

function shouldCallEffect(effect: unknown): effect is CallableFunction {
  return (
    typeof window !== "undefined" &&
    typeof process.env.NEXT_PUBLIC_GANALYTICS === "string" &&
    typeof effect === "function"
  );
}

function useAnalytics(effect: (p: string) => void): void;
function useAnalytics(
  effect: (
    action: string,
    params?: Gtag.CustomParams | Gtag.ControlParams | Gtag.EventParams,
  ) => void,
): void;
function useAnalytics(effect: unknown): void {
  if (shouldCallEffect(effect)) {
    effect();
  }
}

function trackEvent(
  action: string,
  params?: Gtag.CustomParams | Gtag.ControlParams | Gtag.EventParams,
) {
  useAnalytics(() => {
    if (
      process.env.NODE_ENV === "production" &&
      typeof process.env.NEXT_PUBLIC_GANALYTICS === "string"
    ) {
      window.gtag("event", action, params);
    } else {
      console.log(
        `%cEvent %c${JSON.stringify({ action, params })}`,
        "background: green; color: black; padding: 0.5rem; font-size: 0.75rem;",
        "background: black; color: green; padding: 0.5rem; font-size: 0.75rem; font-weight: bold;",
      );
    }
  });
}

function trackPage(path: string) {
  useAnalytics(() => {
    if (
      process.env.NODE_ENV === "production" &&
      typeof process.env.NEXT_PUBLIC_GANALYTICS === "string"
    ) {
      window.gtag("config", process.env.NEXT_PUBLIC_GANALYTICS, {
        path_page: path,
      });
    } else {
      console.log(
        `%cPage View %c${path}`,
        "background: blue; color: white; padding: 0.5rem; font-size: 0.75rem;",
        "background: white; color: blue; padding: 0.5rem; font-size: 0.75rem; font-weight: bold;",
      );
    }
  });
}

function trackModal(path: string) {
  useAnalytics(() => {
    if (
      process.env.NODE_ENV === "production" &&
      typeof process.env.NEXT_PUBLIC_GANALYTICS === "string"
    ) {
      window.gtag("config", process.env.NEXT_PUBLIC_GANALYTICS, {
        path_page: path,
      });
    } else {
      console.log(
        `%cModal View %c${path}`,
        "background: red; color: white; padding: 0.5rem; font-size: 0.75rem;",
        "background: white; color: red; padding: 0.5rem; font-size: 0.75rem; font-weight: bold;",
      );
    }
  });
}

export function useGoogleAnalytics(): UseGoogleAnalyticsReturn {
  return { trackEvent, trackModal, trackPage };
}

export function usePageTracking(): void {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", trackPage);
    return () => {
      router.events.off("routeChangeComplete", trackPage);
    };
  }, [router.events]);
}
