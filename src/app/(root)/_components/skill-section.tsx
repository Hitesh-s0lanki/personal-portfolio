import React from "react";
import { Code, Server, Cloud, Github } from "lucide-react";

interface SkillCategoryProps {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const SkillCategory: React.FC<SkillCategoryProps> = ({
  title,
  icon,
  skills,
}) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-md bg-primary/10 text-primary">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="flex flex-col gap-3 px-4">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span>{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillSection: React.FC = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Code className="h-5 w-5" />,
      skills: [
        "React",
        "Next.js",
        "Javascript",
        "TypeScript",
        "Tailwind CSS",
        "Responsive Design",
        "Chartjs",
      ],
    },
    {
      title: "Backend",
      icon: <Server className="h-5 w-5" />,
      skills: [
        "Spring Boot",
        "Node.js",
        "Nest.js",
        "FastApi",
        "Redis",
        "Kafka",
        "PostgreSQL",
        "MySQL",
        "GraphQL",
        "Flask",
        "Microservices",
      ],
    },
    {
      title: "DevOps & Tools",
      icon: <Github className="h-5 w-5" />,
      skills: [
        "GitHub",
        "Docker",
        "Kubernetes",
        "CI/CD",
        "GitHub Actions",
        "Terraform",
        "Jenkins",
        "Ansible",
      ],
    },
    {
      title: "Cloud",
      icon: <Cloud className="h-5 w-5" />,
      skills: [
        "AWS EC2",
        "AWS S3",
        "AWS Lambda",
        "AWS EKS",
        "AWS ECS",
        "CloudWatch",
        "Load Balancing",
        "Cloud Security",
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="py-10 p-6 px-4 md:px-10 lg:px-40 flex flex-col justify-center items-center">
      <h2 className="section-heading text-3xl md:text-5xl lg:text-5xl font-bold mb-4">
        Technical Skills
      </h2>
      <p className="text-muted-foreground mb-12 max-w-2xl text-center">
        My technical expertise spans across various domains, enabling me to
        design and implement end-to-end solutions.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category, index) => (
          <SkillCategory
            key={index}
            title={category.title}
            icon={category.icon}
            skills={category.skills}
          />
        ))}
      </div>
    </section>
  );
};

export default SkillSection;
