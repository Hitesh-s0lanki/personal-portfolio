import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { buildMetadata, siteConfig } from "@/lib/seo";
import experienceData from "@/lib/experience-data.json";
import { skillCategories } from "@/lib/skills-data";
import { certificates } from "@/lib/data";
import styles from "./resume.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Resume",
  description:
    "Resume of Hitesh Solanki — software engineer building AI agents, backend systems, and full-stack products.",
  path: "/resume",
  eyebrow: "Resume",
});

const featuredProjects = [
  {
    name: "Klyro",
    description:
      "A Redis-compatible in-memory database written in Rust, with transactions, pub/sub, persistence, eviction, and hybrid vector retrieval.",
    stack: ["Rust", "RESP", "Vector Search", "Docker"],
    href: "https://github.com/Hitesh-s0lanki/klyro",
  },
  {
    name: "Relivo MCP Server",
    description:
      "A multi-namespace MCP server in Go for memory, skills, events, Search Console, and Product Hunt, with scoped authentication.",
    stack: ["Go", "MCP", "PostgreSQL", "Kafka"],
    href: "https://github.com/Hitesh-s0lanki/go-mcp-server",
  },
  {
    name: "Vec Voice AI",
    description:
      "A multilingual voice assistant with low-latency speech, pluggable vector stores, and tool-connected answers across 22 languages.",
    stack: ["Python", "FastAPI", "OpenAI", "RAG"],
    href: "https://github.com/Hitesh-s0lanki/voice-vec",
  },
  {
    name: "SprintPlanner",
    description:
      "An AI execution system that turns raw startup ideas into structured four week plans with validation steps, weekly deliverables, and measurable progress.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "AI"],
    href: "/projects/sprintplanner",
  },
  {
    name: "Ticksy",
    description:
      "A full stack ticket booking platform with event discovery, secure payments, modular services, AI assistance, and data ingestion workflows.",
    stack: ["Next.js", "Spring Boot", "Python", "Razorpay"],
    href: "/projects/ticksy-booking-app",
  },
];

const navItems = [
  "About",
  "Education",
  "Research",
  "Experience",
  "Projects",
  "Skills",
  "Certificates",
  "Contact",
];

export default function ResumePage() {
  return (
    <main className={styles.page}>
      <nav className={styles.resumeNav} aria-label="Resume sections">
        <div className={styles.navInner}>
          <a className={styles.brand} href="#about">Hitesh Solanki</a>
          <div className={styles.navLinks}>
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>
            ))}
          </div>
        </div>
      </nav>

      <div className={styles.container}>
        <section className={styles.hero} id="about">
          <div className={styles.heroTop}>
            <div className={styles.portraitWrap}>
              <Image
                src="/profile.jpg"
                alt="Hitesh Solanki"
                fill
                priority
                sizes="176px"
                className={styles.portrait}
              />
            </div>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Hello, I&apos;m</p>
              <h1>Hitesh Solanki</h1>
              <p className={styles.role}>Product Engineer · AI &amp; Product</p>
              <div className={styles.contactRow}>
                <a href={`mailto:${siteConfig.email}`}>
                  <Mail size={15} /> {siteConfig.email}
                </a>
                <span><MapPin size={15} /> {siteConfig.location}</span>
                <a href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin size={15} /> LinkedIn
                </a>
                <a href={siteConfig.socials.github} target="_blank" rel="noreferrer">
                  <Github size={15} /> GitHub
                </a>
              </div>
            </div>
          </div>
          <div className={styles.highlight}>
            <strong>About me</strong>
            <p>
              I am a Product Engineer focused on taking products from idea to
              adoption. At a venture studio, I built businesses from 0 to 1
              through rapid build, measure, and learn cycles. At Strique, I work
              alongside marketers to build an Agentic Marketing OS that
              transforms real performance marketing workflows across paid
              advertising, analytics, and SEO into intelligent products and
              production ready AI agents.
            </p>
          </div>
        </section>

        <ResumeSection id="education" title="Education">
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h3>Ghanshyamdas Saraf College</h3>
                <p className={styles.meta}>B.Sc. Information Technology · University of Mumbai · Mumbai, India</p>
              </div>
              <span className={styles.date}>Jul 2022 — Apr 2025</span>
            </div>
            <div className={styles.educationDetails}>
              <p><strong>CGPA: 9.37/10</strong></p>
              <p>
                <strong>Relevant Courses:</strong> Data Structures, Algorithms,
                Machine Learning, AI, Database Systems, Operating Systems,
                Network Security, Image Processing, Big Data Analytics
              </p>
            </div>
          </article>
        </ResumeSection>

        <ResumeSection id="research" title="Research Experience">
          <article className={`${styles.card} ${styles.researchCard}`}>
            <div className={styles.cardHeader}>
              <div>
                <h3>Intelligent Traffic Management System Using IoV</h3>
                <p className={styles.meta}>
                  Ghanshyamdas Saraf College · First Year Research Project
                </p>
              </div>
              <span className={styles.date}>December 2022</span>
            </div>

            <div className={styles.researchLayout}>
              <div>
                <p className={styles.summary}>
                  Studied how the Internet of Vehicles and Social Internet of
                  Vehicles could support safer and more efficient traffic
                  management in growing cities.
                </p>
                <ul>
                  <li>Combined a literature review with primary and secondary data collected through a structured questionnaire.</li>
                  <li>Examined traffic congestion, vehicle collisions, travel time, fuel consumption, and real time information exchange.</li>
                  <li>Found that 65% of surveyed participants supported implementing the proposed approach.</li>
                  <li>Proposed using existing IoV and VANET infrastructure to improve congestion alerts and road safety.</li>
                </ul>
                <TagList tags={["IoV", "VANET", "Smart Cities", "Data Analysis", "Research"]} />
              </div>
            </div>
          </article>
        </ResumeSection>

        <ResumeSection id="experience" title="Professional Experience">
          {experienceData.slice().reverse().map((job) => (
            <article className={styles.card} key={job.id}>
              <div className={styles.cardHeader}>
                <div>
                  <h3>{job.role}</h3>
                  <p className={styles.meta}>{job.company} · {job.location} · {job.employmentType}</p>
                </div>
                <span className={styles.date}>{job.period}</span>
              </div>
              <p className={styles.summary}>{job.summary}</p>
              <ul>
                {job.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
              <TagList tags={job.tags} />
            </article>
          ))}
        </ResumeSection>

        <ResumeSection id="projects" title="Notable Projects">
          <div className={styles.projectGrid}>
            {featuredProjects.map((project) => (
              <a className={`${styles.card} ${styles.projectCard}`} href={project.href} target="_blank" rel="noreferrer" key={project.name}>
                <div className={styles.projectTitle}>
                  <h3>{project.name}</h3><ArrowUpRight size={18} />
                </div>
                <p>{project.description}</p>
                <TagList tags={project.stack} />
              </a>
            ))}
          </div>
          <Link className={styles.allProjects} href="/projects">
            Explore all projects <ArrowUpRight size={16} />
          </Link>
        </ResumeSection>

        <ResumeSection id="skills" title="Technical Skills">
          <div className={styles.skillsGrid}>
            {skillCategories.slice(0, 8).map((category) => (
              <article className={styles.skillCard} key={category.title}>
                <h3>{category.title}</h3>
                <p>{category.skills.join(" · ")}</p>
              </article>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection id="certificates" title="Certificates">
          <div className={styles.certificateGrid}>
            {certificates.map((certificate) => {
              const content = (
                <>
                  <div className={styles.cardHeader}>
                    <div>
                      <h3>{certificate.name}</h3>
                      <p className={styles.meta}>{certificate.issuer}</p>
                    </div>
                    <span className={styles.date}>{certificate.date}</span>
                  </div>
                  <TagList tags={certificate.category.slice(0, 5)} />
                </>
              );

              return certificate.link ? (
                <a className={`${styles.card} ${styles.certificateCard}`} href={certificate.link} target="_blank" rel="noreferrer" key={certificate.id}>
                  {content}
                </a>
              ) : (
                <article className={`${styles.card} ${styles.certificateCard}`} key={certificate.id}>{content}</article>
              );
            })}
          </div>
        </ResumeSection>

        <section className={styles.contact} id="contact">
          <p className={styles.eyebrow}>Let&apos;s build something useful</p>
          <h2>Open to interesting engineering work and collaborations.</h2>
          <p>Backend-heavy products, AI systems, and ambitious product builds are especially welcome.</p>
          <a href={`mailto:${siteConfig.email}`}><Mail size={17} /> Get in touch</a>
        </section>
      </div>
    </main>
  );
}

function ResumeSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return <section className={styles.section} id={id}><h2>{title}</h2>{children}</section>;
}

function TagList({ tags }: { tags: readonly string[] }) {
  return <div className={styles.tags}>{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>;
}
