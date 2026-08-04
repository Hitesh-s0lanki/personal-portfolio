import SectionEyebrow from "@/components/section-eyebrow";
import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import { featuredProjects } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * Featured work as an Apple-style cards carousel. Cards are built straight from
 * the project data and link to their own page, so this section and /projects
 * can never drift apart.
 */
const FeaturedProjectsSection = () => {
  const cards = featuredProjects.map((project, index) => (
    <Card
      key={project.id}
      priority={index < 2}
      card={{
        category: `${String(index + 1).padStart(2, "0")} · ${project.tagline}`,
        title: project.name,
        src: project.cover ?? project.image,
        href: `/projects/${project.id}`,
        badge: project.ribbon,
      }}
    />
  ));

  return (
    <section id="projects" className="relative w-full overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-6 pt-14 sm:px-10 lg:pt-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-4">
            <SectionEyebrow>Featured work</SectionEyebrow>
            <h2 className="max-w-xl text-3xl leading-[1.08] font-medium tracking-tight text-balance text-[#1c1c1c] sm:text-4xl md:text-5xl">
              Things I&apos;ve designed &amp; built.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-gray-600 md:text-base">
              A curated selection of products spanning scalable systems,
              cloud-native architecture, and AI-driven interfaces.
            </p>
          </div>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#3f3c38] transition-colors hover:text-[#9b4819]"
          >
            All projects
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="mt-6 mb-8 lg:mt-4">
        <Carousel items={cards} />
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
