import assert from "node:assert/strict";

// Run against `npm run start -- --port 3002` (or pass a deployed URL).
const base = new URL(process.argv[2] ?? "http://localhost:3002");
const decode = (text) => text.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const attributes = (tag) => Object.fromEntries(
  [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, name, value]) => [name, decode(value)]),
);
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "g"))].map(([tag]) => attributes(tag));
const request = (path, options = {}) => fetch(new URL(path, base), {
  signal: AbortSignal.timeout(30_000),
  redirect: "manual",
  ...options,
});
const sitemapResponse = await request("/sitemap.xml");
assert.equal(sitemapResponse.status, 200, "Sitemap must return 200");
const sitemap = await sitemapResponse.text();
assert.match(sitemapResponse.headers.get("content-type"), /xml/);
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => new URL(decode(url)));
assert.ok(urls.length > 0, "Sitemap cannot be empty");
assert.equal(new Set(urls.map(String)).size, urls.length, "Duplicate sitemap URLs");
const paths = urls.map((url) => url.pathname);
assert.ok(!paths.includes("/projects/gadgetos-web-os"), "Retired GadgetOS URL in sitemap");
for (const [, value] of sitemap.matchAll(/<lastmod>(.*?)<\/lastmod>/g)) {
  assert.ok(Number.isFinite(Date.parse(value)) && Date.parse(value) <= Date.now(), "Invalid sitemap modification date");
}

const pages = [];
for (const url of urls) {
  const response = await request(url.pathname);
  assert.equal(response.status, 200, `${url.pathname}: sitemap URL must be a final 200`);
  const html = await response.text();
  const title = [...html.matchAll(/<title>(.*?)<\/title>/gs)];
  assert.equal(title.length, 1, `${url.pathname}: expected one title`);
  const meta = tags(html, "meta");
  const descriptions = meta.filter((entry) => entry.name === "description");
  assert.equal(descriptions.length, 1, `${url.pathname}: expected one description`);
  assert.ok(descriptions[0].content.length >= 70 && descriptions[0].content.length <= 160, `${url.pathname}: description length ${descriptions[0].content.length}`);
  const canonical = tags(html, "link").filter((entry) => entry.rel === "canonical");
  assert.equal(canonical.length, 1, `${url.pathname}: expected one canonical`);
  assert.equal(canonical[0].href.replace(/\/$/, ""), url.href.replace(/\/$/, ""), `${url.pathname}: canonical mismatch`);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${url.pathname}: expected one H1 in server HTML`);
  for (const entry of meta.filter((entry) => ["robots", "googlebot"].includes(entry.name))) {
    assert.doesNotMatch(entry.content, /noindex/, `${url.pathname}: unexpectedly noindex`);
  }
  assert.doesNotMatch(response.headers.get("x-robots-tag") ?? "", /noindex/);
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].flatMap(([, json]) => {
    const data = JSON.parse(json);
    return data["@graph"] ?? [data];
  });
  assert.ok(schemas.length, `${url.pathname}: missing JSON-LD in server HTML`);
  pages.push({ path: url.pathname, title: decode(title[0][1]), html, meta, schemas, links: tags(html, "a").map((entry) => entry.href).filter(Boolean) });
}
assert.equal(new Set(pages.map((page) => page.title)).size, pages.length, "Duplicate page titles");
for (const url of urls.filter((url) => url.pathname !== "/")) {
  assert.ok(pages.some((page) => page.path !== url.pathname && page.links.some((href) => {
    const target = new URL(href, url.origin + page.path);
    return target.origin === url.origin && target.pathname === url.pathname;
  })), `${url.pathname}: no incoming link in audited HTML`);
}
const hub = pages.find((page) => page.path === "/projects");
const collection = hub.schemas.find((schema) => schema["@type"] === "CollectionPage").mainEntity;
assert.equal(collection.numberOfItems, collection.itemListElement.length, "Project schema count mismatch");
for (const item of collection.itemListElement) {
  assert.ok(hub.links.includes(new URL(item.url).pathname), `${item.url}: missing crawlable hub link`);
}
assert.ok(hub.links.includes("/projects/relivo"), "Missing Relivo case study link");
for (const id of ["system-arch", "research-assistant-chrome-extension", "chess-web", "26ideas", "data-structures"]) {
  const page = pages.find((page) => page.path === `/projects/${id}`);
  assert.match(page.html, /id="project-overview"/, `${id}: missing editorial overview`);
  assert.doesNotMatch(page.html, /isn&#x27;t published yet/, `${id}: empty documentation fallback`);
}
const redirect = await request("/projects/gadgetos-web-os?utm_source=seo-check");
assert.equal(redirect.status, 308, "Legacy GadgetOS URL must redirect permanently");
const target = new URL(redirect.headers.get("location"), base);
assert.equal(target.pathname, "/projects/gadgetos");
assert.equal(target.searchParams.get("utm_source"), "seo-check");
for (const path of ["/seo-check-missing-page", "/projects/seo-check-missing-project"]) {
  const response = await request(path);
  assert.equal(response.status, 404, `${path}: missing page must return 404`);
  const html = await response.text();
  assert.ok(tags(html, "meta").some((entry) => entry.name === "robots" && /noindex/.test(entry.content)), `${path}: missing noindex`);
}
const robotsResponse = await request("/robots.txt");
assert.equal(robotsResponse.status, 200);
const robots = await robotsResponse.text();
assert.match(robotsResponse.headers.get("content-type"), /text\/plain/);
assert.match(robots, /Allow: \/api\/og/);
assert.match(robots, /Disallow: \/api\//);
assert.ok(robots.includes(`Sitemap: ${new URL("/sitemap.xml", urls[0])}`));
for (const page of pages.filter((page) => ["/", "/projects"].includes(page.path))) {
  const imageUrl = new URL(page.meta.find((entry) => entry.property === "og:image").content);
  const imageResponse = await request(imageUrl.pathname + imageUrl.search);
  assert.equal(imageResponse.status, 200);
  assert.match(imageResponse.headers.get("content-type"), /image\/png/);
  const image = Buffer.from(await imageResponse.arrayBuffer());
  assert.equal(image.readUInt32BE(16), 1200);
  assert.equal(image.readUInt32BE(20), 630);
}
const home = pages.find((page) => page.path === "/");
const ogTitle = home.meta.find((entry) => entry.property === "og:title").content;
assert.equal(ogTitle, home.title, "Homepage OG title should not repeat the brand");
console.log(`SEO checks passed: ${pages.length} pages; ${collection.numberOfItems} crawlable projects; unique titles, descriptions, canonicals, JSON-LD syntax, incoming links, overviews, redirect, 404s, robots, and preview images.`);
