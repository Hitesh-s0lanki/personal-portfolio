export interface Project {
    id: number;
    name: string;
    description: string;
    image: string;
    technologies: string[];
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
    category: string;
    link?: string;
}
