import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  Compass,
  FolderOpen,
  Home,
  Mail,
} from "lucide-react";
import SectionEyebrow from "@/components/section-eyebrow";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you are looking for does not exist. Head back to the homepage or explore projects, blogs, and experience.",
  // Without this the root layout's `index, follow` cascades down and contradicts
  // the `noindex` Next.js emits for not-found responses.
  robots: { index: false, follow: true },
};

const suggestions = [
  {
    href: "/projects",
    label: "Projects",
    description: "Full-stack, AI, and cloud builds",
    icon: FolderOpen,
  },
  {
    href: "/blogs",
    label: "Blogs",
    description: "Writing on agentic AI and engineering",
    icon: Compass,
  },
  {
    href: "/#experience",
    label: "Experience",
    description: "Roles, ventures, and what I shipped",
    icon: Briefcase,
  },
  {
    href: "/contact",
    label: "Contact",
    description: "Start a conversation",
    icon: Mail,
  },
];

const NotFound = () => {
  return (
    <main className="flex min-h-[80vh] w-full flex-col items-center justify-center px-5 py-20 md:px-10">
      <div className="w-full max-w-3xl space-y-10 text-center">
        <div className="space-y-5">
          <SectionEyebrow>Error 404</SectionEyebrow>

          <p className="bg-gradient-to-r from-[#f97316] to-[#9b4819] bg-clip-text text-7xl font-semibold leading-none text-transparent md:text-8xl">
            404
          </p>

          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            This page took a{" "}
            <span className="bg-gradient-to-r from-[#f97316] to-[#9b4819] bg-clip-text text-transparent">
              wrong turn
            </span>
          </h1>

          <p className="mx-auto max-w-xl text-sm text-gray-600 md:text-base">
            The link may be broken, or the page may have been moved or renamed.
            Here are a few places worth checking instead.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="w-full rounded-full border-0 bg-gradient-to-r from-[#f97316] to-[#9b4819] text-white shadow-md hover:from-[#ea580c] hover:to-[#7c3a14] sm:w-auto"
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full rounded-full border-black text-black sm:w-auto"
          >
            <Link href="/projects">
              Browse Projects
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-3 pt-2 text-left sm:grid-cols-2">
          {suggestions.map(({ href, label, description, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-4 rounded-xl border border-orange-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9b4819]/40 hover:shadow-lg hover:shadow-orange-100/70"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 transition-colors group-hover:bg-orange-100">
                <Icon className="h-5 w-5 text-[#9b4819]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-[#9b4819]">
                  {label}
                </p>
                <p className="truncate text-xs text-gray-500">{description}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-[#9b4819]" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default NotFound;
