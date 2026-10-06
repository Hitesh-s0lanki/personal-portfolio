import JsonLd from "@/components/json-ld";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildMetadata,
  siteConfig,
} from "@/lib/seo";
import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PartnerForm from "./partner-form";

const title =
  "Chalzi is a video challenge marketplace where brands gain content from real customers, and customers earn fixed rewards for videos that meet the brief.";

export const metadata: Metadata = buildMetadata({
  title: "Chalzi — Video Challenge Marketplace",
  description: title,
  path: "/idea/chalzi",
  eyebrow: "Idea in development",
  keywords: [
    "Chalzi",
    "video challenges",
    "customer generated content",
    "creator rewards",
  ],
});

const steps = [
  [
    "01",
    "Publish a clear brief",
    "A brand sets the product requirement, fixed reward, available slots, deadline, objective review criteria, and content rights before the challenge opens.",
  ],
  [
    "02",
    "Make and submit a video",
    "A participant reserves a slot, creates an original short video, and includes purchase proof if that challenge requires a purchase.",
  ],
  [
    "03",
    "Review, reward, and use",
    "A reviewer checks the published rules. Qualifying creators receive the advertised reward, and the brand receives only the rights agreed in advance.",
  ],
];

const pilotMeasures = [
  "Interest and relevant submissions",
  "Purchase-to-submission conversion where relevant",
  "Approval reasons and cost per usable video",
  "Review time and payout success",
  "Whether the brand wants to run another campaign",
];

const sectionLabel =
  "pt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ba4537]";
const sectionTitle =
  "text-3xl font-medium leading-tight tracking-tight md:text-4xl";
const lead = "mt-6 text-lg leading-9 text-[#575968]";
const body = "mt-5 text-base leading-8 text-[#686a78]";

export default function ChalziPage() {
  return (
    <main className="min-h-screen bg-[#fcfbf8] text-[#202132]">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Chalzi",
            headline: title,
            description: title,
            url: absoluteUrl("/idea/chalzi"),
            image: absoluteUrl("/chalzi.png"),
            author: { "@type": "Person", name: siteConfig.name },
            inLanguage: "en",
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Chalzi", path: "/idea/chalzi" },
          ]),
        ]}
      />

      <div className="mx-auto max-w-6xl px-5 pb-24 pt-8 md:px-8 md:pt-12 lg:px-10">
        <header className="max-w-4xl pb-12 pt-16 md:pb-16 md:pt-24">
          <p className={sectionLabel}>
            Independent product concept <span className="mx-2">·</span> India
            pilot hypothesis
          </p>
          <p className="mt-7 text-xl font-medium text-[#46495e] md:text-2xl">
            What if your next creator is already your customer?
          </p>
          <h1 className="mt-5 text-4xl font-medium leading-[1.13] tracking-tight sm:text-5xl lg:text-[3.5rem]">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-[#686a78] md:text-lg">
            Brands get real content. People get rewarded. This is the working
            model for a mobile-first marketplace built around clear briefs,
            original videos, and predictable rewards.
          </p>
        </header>

        <figure className="overflow-hidden rounded-[1.5rem] bg-[#30355b] text-white">
          <div className="grid min-h-[400px] md:grid-cols-[0.8fr_1.2fr]">
            <div className="flex flex-col justify-between p-8 md:p-10 lg:p-14">
              <div className="flex items-center gap-4">
                <Image
                  src="/chalzi.png"
                  alt="Chalzi logo"
                  width={72}
                  height={72}
                  priority
                  className="size-14 rounded-xl md:size-[72px]"
                />
                <span className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Chalzi
                </span>
              </div>
              <div className="mt-16">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffab9d]">
                  The idea in one line
                </p>
                <p className="mt-4 max-w-sm text-3xl font-medium leading-tight md:text-4xl">
                  Shop. Create. Earn.
                </p>
              </div>
            </div>
            <div className="flex items-center bg-[#3b416d] p-6 md:p-10 lg:p-14">
              <div className="w-full space-y-3">
                {[
                  ["01", "Brand brief", "A clear ask and a fixed reward"],
                  [
                    "02",
                    "Customer video",
                    "A real product story, made their way",
                  ],
                  ["03", "Approval & payout", "Published checks, then payment"],
                ].map(([number, label, detail]) => (
                  <div
                    key={number}
                    className="grid grid-cols-[2.5rem_1fr] items-start gap-4 rounded-xl border border-white/20 bg-white/5 p-4 md:p-5"
                  >
                    <span className="pt-1 text-sm font-semibold text-[#ffab9d]">
                      {number}
                    </span>
                    <div>
                      <p className="font-semibold">{label}</p>
                      <p className="mt-1 text-sm leading-6 text-white/65">
                        {detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <figcaption className="border-t border-white/15 px-8 py-3 text-xs text-white/65 md:px-10">
            Concept illustration. Chalzi is not a live campaign marketplace yet.
          </figcaption>
        </figure>

        <article className="mx-auto max-w-4xl">
          <section className="grid gap-8 border-b border-[#202132]/10 py-20 md:grid-cols-[170px_1fr] md:gap-12 md:py-28">
            <p className={sectionLabel}>01 / Overview</p>
            <div>
              <h2 className={sectionTitle}>The idea</h2>
              <p className={lead}>
                Chalzi proposes a marketplace where a brand publishes a video
                challenge and everyday customers or emerging creators respond
                with original content. Each approved submission earns a fixed
                cash reward. The brand gains content under the usage rights
                agreed for that challenge.
              </p>
              <p className={body}>
                The first model to validate is a purchase-based challenge: buy
                the featured product from the brand or retailer, create a video,
                and receive cash back after approval. Challenges without a
                purchase requirement are possible too.
              </p>
            </div>
          </section>

          <section className="grid gap-8 border-b border-[#202132]/10 py-20 md:grid-cols-[170px_1fr] md:gap-12 md:py-28">
            <p className={sectionLabel}>02 / Hypothesis</p>
            <div>
              <h2 className={sectionTitle}>
                The customer may already be the right creator
              </h2>
              <p className={lead}>
                A person who uses a product can show it in a way that feels
                natural to them. Chalzi tests whether a clear brief and a
                predictable reward can make that exchange worthwhile for both
                the customer and the brand.
              </p>
              <div className="mt-9 grid gap-8 border-l-2 border-[#ed624f] pl-6 sm:grid-cols-2 sm:gap-10">
                <div>
                  <h3 className="text-lg font-semibold">For brands</h3>
                  <p className="mt-2 text-sm leading-7 text-[#686a78]">
                    Original customer videos, product trials where relevant, and
                    content rights agreed before launch.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">For customers</h3>
                  <p className="mt-2 text-sm leading-7 text-[#686a78]">
                    An accessible brief and a stated reward for work that meets
                    the rules, with a clear review outcome.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-[#202132]/10 py-20 md:py-28">
            <div className="grid gap-8 md:grid-cols-[170px_1fr] md:gap-12">
              <p className={sectionLabel}>03 / Experience</p>
              <div>
                <h2 className={sectionTitle}>How a challenge would work</h2>
                <p className={lead}>
                  The campaign needs to be understandable before anyone buys a
                  product or records a video. Reward slots, deadlines, review
                  rules, payout timing, and rights should all be visible up
                  front.
                </p>
              </div>
            </div>
            <div className="mt-12 divide-y divide-[#202132]/10 border-y border-[#202132]/10">
              {steps.map(([number, label, detail]) => (
                <div
                  key={number}
                  className="grid gap-3 py-7 sm:grid-cols-[56px_190px_1fr] sm:gap-6"
                >
                  <span className="text-sm font-semibold text-[#ba4537]">
                    {number}
                  </span>
                  <h3 className="text-lg font-semibold">{label}</h3>
                  <p className="text-sm leading-7 text-[#686a78]">{detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-[#686a78]">
              Reserving a slot does not guarantee payment. Submission alone does
              not earn cash. Approval follows the published rules rather than a
              subjective winner selection.
            </p>
          </section>

          <section className="grid gap-8 border-b border-[#202132]/10 py-20 md:grid-cols-[170px_1fr] md:gap-12 md:py-28">
            <p className={sectionLabel}>04 / Example</p>
            <div>
              <h2 className={sectionTitle}>Create your new beard style</h2>
              <p className={lead}>
                Imagine a challenge featuring Bombay Shaving Company&apos;s All
                Rounder 2-in-1 Trimmer. Make a 20–30 second vertical video:
                show your beard before, include 2–3 trimming shots, and finish
                with your new look. Choose your own editing style.
              </p>
              <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
                <a
                  href="https://www.bombayshavingcompany.com/products/all-rounder-trimmer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-[#ba4537] underline underline-offset-4 hover:text-[#902f24] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ba4537]"
                >
                  View the sample product <ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href="https://drive.google.com/file/d/1ed-_ErTbR1sjtWww8Sgup23E_WGo0zDo/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-[#ba4537] underline underline-offset-4 hover:text-[#902f24] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ba4537]"
                >
                  Watch the sample video <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
              <div className="mt-9 grid gap-6 bg-[#f4f1ed] p-7 sm:grid-cols-3 sm:p-9">
                {[
                  ["~₹850", "Example product price"],
                  ["~₹400", "Reward for an approved video"],
                  ["~₹450", "Customer's effective cost after reward"],
                ].map(([value, label]) => (
                  <div key={value}>
                    <p className="text-3xl font-semibold">{value}</p>
                    <p className="mt-2 text-sm leading-6 text-[#686a78]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-[#202132]/10 p-6">
                  <h3 className="text-lg font-semibold">What the customer gets</h3>
                  <p className="mt-2 text-sm leading-7 text-[#686a78]">
                    A product they want at a lower effective cost after an
                    approved video, plus a chance to have their work featured
                    with their permission.
                  </p>
                </div>
                <div className="rounded-xl border border-[#202132]/10 p-6">
                  <h3 className="text-lg font-semibold">What the brand gets</h3>
                  <p className="mt-2 text-sm leading-7 text-[#686a78]">
                    A sale from a customer interested in the product and an
                    original customer video, with usage rights agreed in
                    advance. The video could also help reach potential buyers.
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-[#686a78]">
                This is an illustrative challenge, not a live offer or an
                announced partnership with Bombay Shaving Company. The product
                price and reward are approximate; the customer pays for the
                product first and receives the reward only if their video meets
                the published rules. The working pilot fee is 15% of creator
                rewards paid, with a ₹3,000 minimum per launched campaign.
                Pricing and tax treatment need validation before launch.
              </p>
            </div>
          </section>

          <section className="grid gap-8 py-20 md:grid-cols-[170px_1fr] md:gap-12 md:py-28">
            <p className={sectionLabel}>05 / Next step</p>
            <div>
              <h2 className={sectionTitle}>Prove it with one focused pilot</h2>
              <p className={lead}>
                Chalzi is in concept validation and early build. The first test
                would run with one willing brand, a clearly priced product or a
                no-purchase brief, funded reward slots, objective reviews, and
                completed payouts.
              </p>
              <p className={body}>
                The goal is to learn whether the campaign creates usable content
                at a sensible cost and a fair experience for participants.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {pilotMeasures.map((measure) => (
                  <li
                    key={measure}
                    className="flex gap-3 text-sm leading-6 text-[#575968]"
                  >
                    <Check
                      className="mt-1 size-4 shrink-0 text-[#ba4537]"
                      aria-hidden="true"
                    />
                    {measure}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </article>

        <section
          id="partner"
          className="scroll-mt-8 border-t border-[#202132]/10 pt-16 md:pt-20"
        >
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className={sectionLabel}>Partner with Chalzi</p>
              <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight md:text-4xl">
                Want to partner on the first challenge?
              </h2>
              <p className={body}>
                If you represent a brand or want to explore a pilot, tell me a
                little about what you have in mind. I&apos;ll follow up
                directly.
              </p>
            </div>
            <PartnerForm />
          </div>
          <Link
            href="/"
            className="mt-20 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#505368] hover:text-[#ba4537] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ba4537]"
          >
            More from Hitesh{" "}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </main>
  );
}
