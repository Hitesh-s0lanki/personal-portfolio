import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import { absoluteUrl, breadcrumbJsonLd, buildMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Hitesh Solanki about roles, freelance work, or collaboration on full-stack and AI engineering projects.",
  path: "/contact",
  eyebrow: "Get in touch",
  keywords: [
    "contact Hitesh Solanki",
    "hire software engineer",
    "AI engineer contact",
    "freelance developer Mumbai",
  ],
});

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact | Hitesh Solanki",
  url: absoluteUrl("/contact"),
  description:
    "Contact Hitesh Solanki about roles, freelance work, or collaboration.",
  mainEntity: {
    "@type": "Person",
    name: siteConfig.name,
    email: `mailto:${siteConfig.email}`,
    jobTitle: siteConfig.role,
    sameAs: Object.values(siteConfig.socials),
  },
};

type Props = {
  children: React.ReactNode;
};

const ContactLayout = ({ children }: Props) => (
  <>
    <JsonLd
      data={[
        contactJsonLd,
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]),
      ]}
    />
    {children}
  </>
);

export default ContactLayout;
