import experienceData from "@/lib/experience-data.json";
import { Experience } from "@/type";

export const experiences = experienceData as Experience[];

export const companyCount = new Set(experiences.map((exp) => exp.company)).size;

/** Ties every timeline control to the panel it swaps, for screen readers. */
export const EXPERIENCE_DETAIL_ID = "experience-detail";

export const hostnameOf = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};
