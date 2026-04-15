# Experience Section — Dynamic Data Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract hardcoded experience entries into `src/lib/experience-data.json` and refactor `experience-card.tsx` to render them dynamically, preserving the existing zigzag desktop and stacked mobile layouts exactly.

**Architecture:** A flat JSON array in `src/lib/experience-data.json` is imported directly into the component. An `Experience` interface in `src/type.ts` types the data. The component maps over the array, deriving display number, grid column side, and timeline line visibility from each item's index.

**Tech Stack:** Next.js 14, TypeScript (`resolveJsonModule: true` already set), React Fragments for grid cell pairs, Tailwind CSS.

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/lib/experience-data.json` | Create | Single source of truth for all experience entries |
| `src/type.ts` | Modify | Add `Experience` interface |
| `src/app/(root)/_components/experience-card.tsx` | Modify | Import JSON, map over data, derive layout from index |

---

## Task 1: Create `experience-data.json`

**Files:**
- Create: `src/lib/experience-data.json`

- [ ] **Step 1: Create the file with all 4 entries**

Create `src/lib/experience-data.json`:

```json
[
  {
    "id": 1,
    "role": "Software Engineer Intern",
    "company": "26ideas",
    "period": "Apr 2024 - Aug 2024",
    "description": "26ideas is a full-stack venture studio that builds, incubates, and invests in early-stage startups. Built foundational components of CRM tools, including roles management, product categories, subcategories, users, projects, and task management.",
    "tags": ["Market Research", "Concept Validation", "ChatGPT", "Automation", "CRM", "Python", "Typescript", "Nextjs"]
  },
  {
    "id": 2,
    "role": "Engineering Lead",
    "company": "26ideas",
    "period": "Aug 2024 - Apr 2025",
    "description": "Developed an internal business CRM (crm.26ideas.com) from scratch using Next.js, NestJS, Prisma, PostgreSQL, and OpenAI for AI utilities.",
    "tags": ["Product", "Engineering", "Developement"]
  },
  {
    "id": 3,
    "role": "Builder",
    "company": "JustWalkIndia",
    "period": "Nov 2024 - Apr 2025",
    "description": "JustWalkIndia is a venture by 26ideas. Led external integrations, including WhatsApp and SMS services partners, and Zerobounce for email validation.",
    "tags": ["Tech", "Sports", "External", "Operations"]
  },
  {
    "id": 4,
    "role": "Software Engineer",
    "company": "Strique AI",
    "period": "June 2025 - Present",
    "description": "Monitor campaigns, manage catalog, and automate reporting—all from one dashboard developed exclusively for e-commerce brands and agencies focused on ROAS.",
    "tags": ["Product", "Java", "Spring Boot", "Protobuf", "Nextjs"]
  }
]
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/experience-data.json
git commit -m "feat: add experience-data.json"
```

---

## Task 2: Add `Experience` type to `src/type.ts`

**Files:**
- Modify: `src/type.ts`

- [ ] **Step 1: Add the interface**

Open `src/type.ts` and append after the existing `Blog` interface:

```typescript
export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}
```

- [ ] **Step 2: Verify TypeScript is happy**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/type.ts
git commit -m "feat: add Experience type"
```

---

## Task 3: Refactor `experience-card.tsx` to use dynamic data

**Files:**
- Modify: `src/app/(root)/_components/experience-card.tsx`

**Key logic:**
- `index % 2 === 0` → even item → right column (left-aligned content, left-side dot)
- `index % 2 !== 0` → odd item → left column (right-aligned content, right-side dot)
- Each item renders as a React Fragment containing 2 grid cells: `[empty, item]` for even, `[item, empty]` for odd
- Display number: `String(index + 1).padStart(2, "0")` → `"01"`, `"02"`, etc.
- Timeline lines: `isFirst = index === 0`, `isLast = index === data.length - 1`

- [ ] **Step 1: Replace the entire file content**

```tsx
import Tags from "@/components/tags";
import { Briefcase } from "lucide-react";
import { Fragment } from "react";
import { Experience } from "@/type";
import experienceData from "@/lib/experience-data.json";

const ExperienceSection = () => {
  const experiences = experienceData as Experience[];

  return (
    <section
      id="experience"
      className=" w-full px-10 md:px-10 lg:px-40 py-5 md:py-20 lg:py-20 gap-4 md:gap-20 lg:gap-20 flex flex-col fadeInDown-animation"
    >
      <div className=" flex flex-col justify-center items-center gap-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50 px-3 py-1 text-xs font-medium text-[#9b4819]">
          <Briefcase className="h-3 w-3" />
          <span>Experience</span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-4xl font-semibold">
          My{" "}
          <span className="bg-gradient-to-r from-[#f97316] to-[#9b4819] bg-clip-text text-transparent">
            Experience
          </span>
        </h1>
        <p className="text-muted-foreground mb-12 max-w-2xl text-center">
          A concise overview of my professional journey, showcasing key roles,
          projects, and growth in software engineering
        </p>
      </div>

      {/* Desktop zigzag layout */}
      <div className="hidden w-full lg:grid grid-cols-2 justify-start">
        {experiences.map((exp, index) => {
          const isFirst = index === 0;
          const isLast = index === experiences.length - 1;
          const isEven = index % 2 === 0;
          const num = String(index + 1).padStart(2, "0");

          if (isEven) {
            return (
              <Fragment key={exp.id}>
                <div />
                <div className="w-full flex items-center gap-8">
                  <div className="h-full flex flex-col items-start justify-end relative">
                    {!isFirst && (
                      <div className="mb-[0.25px] h-40 md:h-64 w-[2px] bg-[#707070] absolute -left-[3px] bottom-1/2" />
                    )}
                    {!isLast && (
                      <div className="mt-3 h-48 md:h-64 w-[2px] bg-[#707070] absolute -left-[3px] top-1/2" />
                    )}
                    <div className="rounded-full h-3 w-3 bg-[#707070] absolute -left-2 top-1/2" />
                  </div>
                  <div className="flex flex-col gap-3 py-4">
                    <h1 className="text-2xl font-medium text-[#828282]">
                      {num} - {exp.role}
                    </h1>
                    <p className="text-3xl font-semibold">{exp.company}</p>
                    <p className="text-xl text-muted-foreground">{exp.period}</p>
                    <p className="text-2xl">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <Tags key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          }

          return (
            <Fragment key={exp.id}>
              <div className="w-full flex items-center gap-8 justify-end">
                <div className="w-full flex flex-col gap-3 justify-end text-right py-2">
                  <h1 className="text-2xl font-medium text-[#828282]">
                    {num} - {exp.role}
                  </h1>
                  <p className="text-3xl font-semibold">{exp.company}</p>
                  <p className="text-xl text-muted-foreground">{exp.period}</p>
                  <p className="text-2xl">{exp.description}</p>
                  <div className="flex flex-wrap gap-4 justify-end">
                    {exp.tags.map((tag) => (
                      <Tags key={tag} text={tag} />
                    ))}
                  </div>
                </div>
                <div className="h-full flex flex-col items-start justify-end relative">
                  {!isFirst && (
                    <div className="mb-[0.25px] h-40 md:h-64 w-[2px] bg-[#707070] absolute right-[1px] bottom-1/2" />
                  )}
                  {!isLast && (
                    <div className="mt-3 h-40 md:h-56 w-[2px] bg-[#707070] absolute right-[1px] top-1/2" />
                  )}
                  <div className="rounded-full h-3 w-3 bg-[#707070] absolute -right-1 top-1/2" />
                </div>
              </div>
              <div />
            </Fragment>
          );
        })}
      </div>

      {/* Mobile stacked layout */}
      <div className="lg:hidden md:px-10 w-full flex flex-col gap-3">
        {experiences.map((exp, index) => {
          const isFirst = index === 0;
          const isLast = index === experiences.length - 1;
          const num = String(index + 1).padStart(2, "0");

          return (
            <div key={exp.id} className="w-full flex items-center gap-4">
              <div className="h-full flex flex-col items-start justify-end relative">
                {!isFirst && (
                  <div className="mt-3 h-40 w-[2px] bg-[#707070] absolute right-[1px] -top-40" />
                )}
                {!isLast && (
                  <div className="mt-3 h-64 w-[2px] bg-[#707070] absolute right-[1px] top-1/2" />
                )}
                <div className="rounded-full h-3 w-3 bg-[#707070] absolute -right-1 top-1/2" />
              </div>
              <div className="flex flex-col gap-1 py-4">
                <h1 className="text-lg font-medium text-[#828282]">
                  {num} - {exp.role}
                </h1>
                <p className="text-xl font-semibold">{exp.company}</p>
                <p className="text-sm text-muted-foreground">{exp.period}</p>
                <p className="text-md">{exp.description}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {exp.tags.map((tag) => (
                    <Tags key={tag} text={tag} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full pt-10 lg:pt-28 md:pt-28">
        <div className="h-[0.5px] bg-[#BDBDBD] w-full" />
      </div>
    </section>
  );
};

export default ExperienceSection;
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Start dev server and verify visually**

```bash
npm run dev
```

Open `http://localhost:3000` and scroll to the Experience section. Verify:
- Desktop (≥1024px): zigzag layout with 4 entries, timeline dots and lines intact
- Mobile (<1024px): stacked single-column layout with all 4 entries
- Entry numbers are "01", "02", "03", "04"
- All roles, companies, periods, descriptions, and tags match the original

- [ ] **Step 4: Commit**

```bash
git add src/app/(root)/_components/experience-card.tsx
git commit -m "refactor: make experience section dynamic from JSON"
```
