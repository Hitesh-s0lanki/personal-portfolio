import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import { demoCaseStudyData } from "@/lib/demo.data";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildMetadata,
  siteConfig,
  siteUrl,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `${demoCaseStudyData.projectName} — Case Study`,
  description: demoCaseStudyData.summary,
  path: "/projects/relivo",
  eyebrow: "Case Study",
  keywords: [
    "Relivo",
    "AI agent orchestration",
    "agent workflow platform",
    "case study",
    "FastAPI",
    "Next.js",
    "Hitesh Solanki",
  ],
});

const caseStudyJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `${demoCaseStudyData.projectName} — ${demoCaseStudyData.headline}`,
  description: demoCaseStudyData.summary,
  url: absoluteUrl("/projects/relivo"),
  image: absoluteUrl(demoCaseStudyData.heroImage.src),
  author: { "@type": "Person", name: siteConfig.name, url: siteUrl },
  publisher: { "@type": "Person", name: siteConfig.name, url: siteUrl },
  inLanguage: "en",
  about: demoCaseStudyData.category,
};

type Props = {
  children: React.ReactNode;
};

const RelivoLayout = ({ children }: Props) => (
  <>
    <JsonLd
      data={[
        caseStudyJsonLd,
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: demoCaseStudyData.projectName, path: "/projects/relivo" },
        ]),
      ]}
    />
    {children}
  </>
);

export default RelivoLayout;
