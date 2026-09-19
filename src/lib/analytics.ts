export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type GtagParams = Record<string, unknown>;

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.(...args);
}

export function trackEvent(name: string, params?: GtagParams) {
  gtag("event", name, params);
}

// Fires a GA4 "purchase" event at most once per transaction id, so remounts,
// reloads, and the back button after a completed checkout can't double-count revenue.
export function trackPurchaseOnce(transactionId: string, params: GtagParams) {
  if (typeof window === "undefined" || !transactionId) return;
  const key = `ga_purchase_${transactionId}`;
  if (sessionStorage.getItem(key)) return;
  sessionStorage.setItem(key, "1");
  trackEvent("purchase", { transaction_id: transactionId, currency: "ZAR", ...params });
}
