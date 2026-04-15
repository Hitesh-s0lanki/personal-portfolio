export interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
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

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}
