import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

// Not exported: `size`/`contentType` are only valid exports on image-generation
// file conventions, not on a route handler.
const size = { width: 1200, height: 630 };

const truncate = (value: string, max: number) =>
  value.length > max ? `${value.slice(0, max - 1).trimEnd()}…` : value;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = truncate(
    searchParams.get("title") || siteConfig.title,
    90,
  );
  const subtitle = truncate(
    searchParams.get("subtitle") || siteConfig.description,
    150,
  );
  const eyebrow = searchParams.get("eyebrow") || "Portfolio";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: siteConfig.backgroundColor,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 12,
            display: "flex",
            backgroundImage: "linear-gradient(90deg, #f97316, #9b4819)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-start",
              borderRadius: 999,
              border: "1px solid rgba(155, 72, 25, 0.35)",
              backgroundColor: "rgba(249, 115, 22, 0.10)",
              color: "#9b4819",
              padding: "10px 24px",
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: title.length > 45 ? 66 : 82,
              fontWeight: 700,
              color: "#1f1f1f",
              lineHeight: 1.15,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#5c5c5c",
              lineHeight: 1.45,
              maxWidth: 940,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(31, 31, 31, 0.12)",
            paddingTop: 32,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 68,
                height: 68,
                borderRadius: 20,
                backgroundImage: "linear-gradient(135deg, #f97316, #9b4819)",
                color: "#ffffff",
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              HS
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 32, fontWeight: 600, color: "#1f1f1f" }}>
                {siteConfig.name}
              </div>
              <div style={{ fontSize: 24, color: "#6b6b6b" }}>
                Software Engineer &amp; AI Builder
              </div>
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 24, color: "#9b4819" }}>
            {new URL(request.url).host}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
