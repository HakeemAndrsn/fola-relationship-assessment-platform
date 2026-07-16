"use client";

import { useEffect, useRef } from "react";

type ReporterProps = {
  /*  ⎯⎯ props are only provided on the global-error page ⎯⎯ */
  error?: Error & { digest?: string };
  reset?: () => void;
};

const ALERTS_SENT_KEY = "lb_error_alerts_sent";
const MAX_ALERTS_PER_SESSION = 3;

function reportErrorToOwner(payload: {
  message: string;
  stack?: string;
  digest?: string;
}) {
  try {
    // Cap and dedupe so a render loop can't flood the owner's inbox
    const raw = sessionStorage.getItem(ALERTS_SENT_KEY);
    const sent: string[] = raw ? JSON.parse(raw) : [];
    if (sent.length >= MAX_ALERTS_PER_SESSION || sent.includes(payload.message)) return;
    sessionStorage.setItem(ALERTS_SENT_KEY, JSON.stringify([...sent, payload.message]));

    fetch("/.netlify/functions/report-client-error", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
      keepalive: true,
    }).catch(() => {
      /* best-effort alerting — never block or throw on failure */
    });
  } catch {
    /* sessionStorage can throw in some privacy modes — ignore */
  }
}

export default function ErrorReporter({ error, reset }: ReporterProps) {
  /* ─ instrumentation shared by every route ─ */
  const lastOverlayMsg = useRef("");
  const pollRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const inIframe = window.parent !== window;

    const onError = (e: ErrorEvent) => {
      reportErrorToOwner({ message: e.message, stack: e.error?.stack });
      if (inIframe) {
        window.parent.postMessage(
          {
            type: "ERROR_CAPTURED",
            error: {
              message: e.message,
              stack: e.error?.stack,
              filename: e.filename,
              lineno: e.lineno,
              colno: e.colno,
              source: "window.onerror",
            },
            timestamp: Date.now(),
          },
          "*"
        );
      }
    };

    const onReject = (e: PromiseRejectionEvent) => {
      const message = e.reason?.message ?? String(e.reason);
      reportErrorToOwner({ message, stack: e.reason?.stack });
      if (inIframe) {
        window.parent.postMessage(
          {
            type: "ERROR_CAPTURED",
            error: { message, stack: e.reason?.stack, source: "unhandledrejection" },
            timestamp: Date.now(),
          },
          "*"
        );
      }
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onReject);

    if (!inIframe) {
      return () => {
        window.removeEventListener("error", onError);
        window.removeEventListener("unhandledrejection", onReject);
      };
    }

    const pollOverlay = () => {
      const overlay = document.querySelector("[data-nextjs-dialog-overlay]");
      const node =
        overlay?.querySelector(
          "h1, h2, .error-message, [data-nextjs-dialog-body]"
        ) ?? null;
      const txt = node?.textContent ?? node?.innerHTML ?? "";
      if (txt && txt !== lastOverlayMsg.current) {
        lastOverlayMsg.current = txt;
        window.parent.postMessage(
          {
            type: "ERROR_CAPTURED",
            error: { message: txt, source: "nextjs-dev-overlay" },
            timestamp: Date.now(),
          },
          "*"
        );
      }
    };

    pollRef.current = setInterval(pollOverlay, 1000);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onReject);
      pollRef.current && clearInterval(pollRef.current);
    };
  }, []);

  /* ─ report + notify the dev preview parent when the global-error boundary fires ─ */
  useEffect(() => {
    if (!error) return;
    reportErrorToOwner({ message: error.message, stack: error.stack, digest: error.digest });

    const inIframe = window.parent !== window;
    if (inIframe) {
      window.parent.postMessage(
        {
          type: "global-error-reset",
          error: {
            message: error.message,
            stack: error.stack,
            digest: error.digest,
            name: error.name,
          },
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
        },
        "*"
      );
    }
  }, [error]);

  /* ─ ordinary pages render nothing ─ */
  if (!error) return null;

  /* ─ global-error UI ─ */
  return (
    <html>
      <body className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-destructive">
              Something went wrong
            </h1>
            <p className="text-muted-foreground">
              We hit an unexpected snag loading this page. Please try again — if it keeps happening, reach out to us and we'll sort it out.
            </p>
          </div>
          <button
            onClick={() => reset?.()}
            className="inline-flex items-center justify-center rounded-xl bg-[#121212] text-white px-6 py-3 text-sm font-bold hover:bg-[#232323] transition-colors"
          >
            Try again
          </button>
          <div className="space-y-2">
            {process.env.NODE_ENV === "development" && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                  Error details
                </summary>
                <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto">
                  {error.message}
                  {error.stack && (
                    <div className="mt-2 text-muted-foreground">
                      {error.stack}
                    </div>
                  )}
                  {error.digest && (
                    <div className="mt-2 text-muted-foreground">
                      Digest: {error.digest}
                    </div>
                  )}
                </pre>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
