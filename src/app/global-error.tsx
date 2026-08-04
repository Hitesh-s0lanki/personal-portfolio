"use client";

import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Catches errors thrown in the root layout itself, so it has to render its own
 * <html> and <body> and cannot rely on any app-level providers or styles.
 */
const GlobalError = ({ error, reset }: Props) => {
  useEffect(() => {
    console.error("Fatal application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f4f1e8",
          color: "#1f1f1f",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          padding: "24px",
        }}
      >
        <main style={{ maxWidth: 560, textAlign: "center" }}>
          <p
            style={{
              display: "inline-block",
              margin: 0,
              padding: "4px 12px",
              borderRadius: 999,
              border: "1px solid rgba(155, 72, 25, 0.35)",
              backgroundColor: "rgba(249, 115, 22, 0.10)",
              color: "#9b4819",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Critical error
          </p>

          <h1
            style={{
              margin: "20px 0 12px",
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: "-0.5px",
            }}
          >
            The site failed to load
          </h1>

          <p style={{ margin: "0 0 8px", fontSize: 15, color: "#5c5c5c" }}>
            Something broke before the page could render. Reloading usually
            fixes it.
          </p>

          {error.digest && (
            <p style={{ margin: "0 0 24px", fontSize: 12, color: "#9a9a9a" }}>
              Reference: {error.digest}
            </p>
          )}

          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: 24,
            }}
          >
            <button
              onClick={reset}
              style={{
                cursor: "pointer",
                borderRadius: 999,
                border: "none",
                padding: "12px 28px",
                fontSize: 15,
                fontWeight: 600,
                color: "#ffffff",
                backgroundImage: "linear-gradient(90deg, #f97316, #9b4819)",
              }}
            >
              Try again
            </button>
            {/* Plain anchor on purpose: the root layout has crashed, so a full
                document load is the only reliable way back. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                borderRadius: 999,
                border: "1px solid #1f1f1f",
                padding: "12px 28px",
                fontSize: 15,
                fontWeight: 600,
                color: "#1f1f1f",
                textDecoration: "none",
              }}
            >
              Back to home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
};

export default GlobalError;
