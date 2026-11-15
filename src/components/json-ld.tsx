type Props = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

const normalizeJsonLd = (data: Props["data"]) => {
  if (!Array.isArray(data)) return data;

  return {
    "@context": "https://schema.org",
    "@graph": data.map((entry) =>
      Object.fromEntries(
        Object.entries(entry).filter(([key]) => key !== "@context"),
      ),
    ),
  };
};

/** Renders schema.org structured data so crawlers can parse the page. */
const JsonLd = ({ data }: Props) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(normalizeJsonLd(data)).replace(/</g, "\\u003c"),
    }}
  />
);

export default JsonLd;
