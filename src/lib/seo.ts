import type { Metadata } from "next";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://master.d2p4p6tfmpfvri.amplifyapp.com"
).replace(/\/$/, "");

export const siteConfig = {
  name: "Hitesh Solanki",
  title: "Hitesh Solanki — Software Engineer & AI Builder",
  shortName: "Hitesh Solanki",
  description:
    "Portfolio of Hitesh Solanki, a software engineer building full-stack products and AI agent systems with Next.js, TypeScript, Go, and LangChain. Explore projects, experience, writing, and certifications.",
  role: "Software Engineer",
  location: "Mumbai, India",
  email: "hiteshsolanki@gmail.com",
  locale: "en_US",
  themeColor: "#9b4819",
  backgroundColor: "#f4f1e8",
  keywords: [
    "Hitesh Solanki",
    "software engineer portfolio",
    "full stack developer",
    "AI engineer",
    "Next.js developer",
    "TypeScript developer",
    "Golang developer",
    "LangChain",
    "AI agents",
    "React developer",
    "Mumbai software engineer",
  ],
  socials: {
    github: "https://github.com/Hitesh-s0lanki",
    linkedin: "https://www.linkedin.com/in/hitesh-s0lanki/",
    leetcode: "https://leetcode.com/u/hitesh4623/",
    medium: "https://medium.com/@hiteshsolanki4623",
  },
} as const;

/** Absolute URL for a site-relative path. */
export const absoluteUrl = (path = "/") =>
  `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

/** URL of the dynamically generated Open Graph card for a page. */
export const ogImageUrl = ({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) => {
  const params = new URLSearchParams({ title });
  if (subtitle) params.set("subtitle", subtitle);
  if (eyebrow) params.set("eyebrow", eyebrow);
  return `/api/og?${params.toString()}`;
};

type PageSeo = {
  /** Page title, without the "| Hitesh Solanki" suffix. */
  title: string;
  description: string;
  /** Site-relative path, used for the canonical URL. */
  path: string;
  /** Small label rendered above the title on the OG card. */
  eyebrow?: string;
  keywords?: string[];
  noIndex?: boolean;
};

/**
 * Builds per-page metadata: canonical URL, Open Graph and Twitter cards all
 * derive from the same source so they can never drift apart.
 */
export const buildMetadata = ({
  title,
  description,
  path,
  eyebrow,
  keywords,
  noIndex,
}: PageSeo): Metadata => {
  const url = absoluteUrl(path);
  const image = ogImageUrl({ title, subtitle: description, eyebrow });

  return {
    // `absolute` pins this segment's own title; `template` is re-declared so
    // nested segments (e.g. /projects/relivo) still inherit the name suffix.
    title: {
      absolute: `${title} | ${siteConfig.name}`,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: keywords ?? [...siteConfig.keywords],
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [image],
    },
  };
};

/** Person + WebSite structured data, rendered once in the root layout. */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteUrl,
  image: absoluteUrl("/profile.png"),
  jobTitle: siteConfig.role,
  email: `mailto:${siteConfig.email}`,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressCountry: "IN",
  },
  sameAs: Object.values(siteConfig.socials),
  knowsAbout: [
    "Software Engineering",
    "Full Stack Development",
    "Artificial Intelligence",
    "AI Agents",
    "Next.js",
    "TypeScript",
    "Go",
    "Cloud Architecture",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteUrl,
  description: siteConfig.description,
  inLanguage: "en",
  author: { "@type": "Person", name: siteConfig.name, url: siteUrl },
};

/** BreadcrumbList structured data for nested routes. */
export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});
