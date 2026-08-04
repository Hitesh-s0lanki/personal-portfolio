export interface Project {
  /** URL slug — every project has its own page at /projects/{id}. */
  id: string;
  name: string;
  /** What the project is, in five words or fewer. Used as a card label. */
  tagline: string;
  description: string;
  image: string;
  /**
   * Wide image used by the 3D featured carousel. Falls back to `image`; set it
   * when `image` is an SVG or a portrait screenshot that reads badly on a card.
   */
  cover?: string;
  technologies: string[];
  featured?: boolean;
  github?: string;
  demo?: string;
  ribbon?: string;
}

export interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
  image: string;
  category: string[];
  link?: string;
}

export interface Blog {
  id: number;
  title: string;
  url: string;
  description?: string;
  image?: string;
  tags?: string[];
}

/** A product the studio spun up that I built on. */
export interface Venture {
  name: string;
  logo: string;
  period: string;
  description: string;
  url?: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  /** Company logo in /public/experience. */
  logo: string;
  /** One-line description of what the company actually does. */
  companyTagline: string;
  companyUrl?: string;
  /** Full range, e.g. "Jun 2025 — Present". */
  period: string;
  /** Compact range for the timeline rail, e.g. "Jun 2025 — Now". */
  periodShort: string;
  location: string;
  employmentType: string;
  current?: boolean;
  /** Context paragraph: the company and where I sat in it. */
  summary: string;
  /** What I actually shipped there. */
  highlights: string[];
  /** Sub-ventures of the company I worked on during this role. */
  ventures?: Venture[];
  tags: string[];
}
