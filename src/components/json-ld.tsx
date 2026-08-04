type Props = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Renders schema.org structured data so crawlers can parse the page. */
const JsonLd = ({ data }: Props) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export default JsonLd;
