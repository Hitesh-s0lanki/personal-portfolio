# Experience Section — Dynamic Data Design

**Date:** 2026-04-15  
**Status:** Approved

## Overview

Refactor the experience section from hardcoded JSX to a data-driven component. Experience entries are extracted into `src/lib/experience-data.json` and the component maps over them, preserving the existing zigzag desktop layout and stacked mobile layout exactly.

## Files Changed

| File | Action |
|------|--------|
| `src/lib/experience-data.json` | Create — array of experience objects |
| `src/type.ts` | Add `Experience` interface |
| `src/app/(root)/_components/experience-card.tsx` | Refactor — import JSON, map over data |

## Data Structure

`src/lib/experience-data.json` — a flat JSON array:

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
  ...
]
```

## Type Definition

Added to `src/type.ts`:

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

## Component Logic

### Display number
Derived at render time: `String(index + 1).padStart(2, "0")` → `"01"`, `"02"`, etc.

### Desktop zigzag grid (lg only, `grid-cols-2`)

The grid alternates items between columns based on array index:

- **Even index (0, 2)**: `[empty div] [item — left dot, left-aligned content]`
- **Odd index (1, 3)**: `[item — right dot, right-aligned content] [empty div]`

Each item is rendered as two grid cells (one content, one spacer). The component maps each experience to a pair of grid cells using `index % 2 === 0` to determine side.

### Timeline lines

Derived from index within the array:

| Position | Top line | Bottom line |
|----------|----------|-------------|
| First (index === 0) | No | Yes |
| Middle | Yes | Yes |
| Last (index === length - 1) | Yes | No |

The same line-height classes from the existing static code are preserved.

### Mobile stacked view (`lg:hidden`)

All items render as a single column stack. Timeline lines follow the same first/middle/last rule. No left/right alternation.

## Constraints

- No visual changes — the refactor is purely structural
- No new abstractions — no hooks, no helper files
- `tsconfig.json` already has `"resolveJsonModule": true` (standard Next.js config), so JSON import works natively
