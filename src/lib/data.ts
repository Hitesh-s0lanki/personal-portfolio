import { Project, Certificate } from "@/type";

export const projectData: Project[] = [
    {
        id: 1,
        name: "GadgetOS",
        description: "Browser-based operating system built to simulate a desktop-like experience entirely within your browser.",
        image: "/projects/gadgetOS.png",
        technologies: ["Nextjs", "Convex", "Real-time", "terminal", "openai", "ai"],
        github: "https://github.com/Hitesh-s0lanki/gadgetOS/tree/web_os",
        demo: "https://gadgetos.in/",
    },
    {
        id: 2,
        name: "Kya Banana Hai",
        description: "A smart kitchen assistant that helps you decide what food to cook based on ingredients, time, mood, or dietary needs — using the power of AI.",
        image: "/projects/kyabananahai.png",
        technologies: ["Nextjs", "Convex", "Real-time", "terminal", "openai", "ai"],
        github: "https://github.com/Hitesh-s0lanki/kya-banana-hai-app-fe",
        demo: "https://kyabananahai.com/",
    },
    {
        id: 3,
        name: "Shortify",
        description: "A modern, full-stack URL shortening application that enables users to convert lengthy URLs into concise, shareable links.",
        image: "/projects/url-shortener-home.png",
        technologies: ["Reactjs", "Spring", "Spring Framework", "Java", "MySQL", "Spring Security", "Typescript", "Docker", " ECS"],
        github: "https://github.com/Hitesh-s0lanki/url-shortener",
    },
    {
        id: 11,
        name: "Codetech",
        description: "An interactive platform designed for competitive programmers and developers to solve coding challenges in a LeetCode-style environment",
        image: "/projects/codetech.png",
        technologies: ["React", "Firebase", "file", "code compiler", "leetcode"],
        github: "https://github.com/Hitesh-s0lanki/codetech_new",
        demo: "https://codetech-new.vercel.app"
    },
    {
        id: 13,
        name: "Email Reply Generator",
        description: "An AI-powered tool that helps users craft professional and personalized email replies in seconds. It includes a web interface and extends functionality into a Chrome Extension, enabling real-time reply generation directly within your email inbox.",
        image: "/projects/email-writer-app.png",
        technologies: ["Nextjs", "Spring Boot", "Java", "Shadcn", "Gemini", "Chrome Extension"],
        github: "https://github.com/Hitesh-s0lanki/email-reply-generator",
    },
    {
        id: 4,
        name: "Inventory Management",
        description: "The application is deployed on AWS using a secure and scalable architecture.",
        image: "/projects/inventory.png",
        technologies: ["Nextjs", "Node.js", "Redux", "Shadcn", "AWS", "RDS", "NAT", "VPC", "EC2", "API Gateway"],
        github: "https://github.com/Hitesh-s0lanki/inventory-management",
        demo: "https://main.d1az7sps7yw18.amplifyapp.com/"
    },
    {
        id: 12,
        name: "AI-Saas",
        description: "An AI-powered SaaS dashboard that offers conversation, image, video, music, and code generation tools in a unified interface.",
        image: "/projects/ai-saas.png",
        technologies: ["Nextjs", "Shadcn", "OPENAI"],
        github: "https://github.com/Hitesh-s0lanki/ai-saas",
        demo: "https://ai-saas-ruby-theta.vercel.app/"
    },
    {
        id: 5,
        name: "StoreIt",
        description: "A cloud-based file storage application that emulates the core functionalities of Google Drive.",
        image: "/projects/storeit.png",
        technologies: ["Nextjs", "appwrite", "Vercel", "file Management"],
        github: "https://github.com/Hitesh-s0lanki/drive-clone",
        demo: "https://drive-clone-seven.vercel.app/"
    },
    {
        id: 6,
        name: "Miro",
        description: "A modern, full-stack Miro clone that enables real-time collaborative whiteboarding",
        image: "/projects/miro.png",
        technologies: ["Nextjs", "liveblocks", "Vercel", "Clerk"],
        github: "https://github.com/Hitesh-s0lanki/miro-app",
        demo: "https://miro-app-psi.vercel.app/"
    },
    {
        id: 7,
        name: "Todovex",
        description: "AI-Powered Task Management App",
        image: "/projects/todovex.png",
        technologies: ["Nextjs", "convex", "openai", "Vercel"],
        github: "https://github.com/Hitesh-s0lanki/todovex",
        demo: "https://todovex.vercel.app/"
    },

    {
        id: 8,
        name: "26ideas",
        description: "Company Oriented",
        image: "/projects/26ideas.png",
        technologies: ["Nextjs", "static", "26ideas"],
        demo: "https://www.26ideas.com/"
    },
    {
        id: 9,
        name: "Data Structure",
        description: "A curated collection of data structure implementations paired with LeetCode problem solutions to master algorithmic skills",
        image: "/projects/data-structure.png",
        technologies: ["Array", "Graph", "linked list", "Tree", "BST", "Sorting"],
        github: "https://github.com/Hitesh-s0lanki/DSALeetcode",
    },
    {
        id: 10,
        name: "Terraform IAAC",
        description: "A Terraform-based Infrastructure-as-Code framework for automated, version-controlled provisioning and management of AWS cloud resources",
        image: "/projects/terraform.png",
        technologies: ["Terraform", "AWS", "GitHub Actions"],
        github: "https://github.com/Hitesh-s0lanki/terraform-iaac-vprofile",
    },
]

export const certificates: Certificate[] = [
    {
        id: 1,
        name: "Java Spring Framework 6 with Spring Boot 3",
        issuer: "Udemy",
        date: "2025",
        image: "/certificates/java.png",
        category: "Spring Boot",
    },
    {
        id: 2,
        name: "DevOps Engineer",
        issuer: "Udemy",
        date: "2025",
        image: "/certificates/devops.jpeg",
        category: "DevOps",
    },
    {
        id: 3,
        name: "MEDDICC MEDDPICC Sales training",
        issuer: "Udemy",
        date: "2025",
        image: "/certificates/sales.png",
        category: "Sales ",
    }
];
