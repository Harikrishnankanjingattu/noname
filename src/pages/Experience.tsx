import PageWrapper from "@/components/PageWrapper";
import CardItem from "@/components/CardItem";
import DynamicCard from "@/components/DynamicCard";
import { usePortfolioItems } from "@/hooks/usePortfolioItems";

const staticExperiences = [
  { title: "TinkerHub JEC — Learning Coordinator", subtitle: "2025 – 2026", description: "Coordinating learning activities and technical workshops for student community." },
  { title: "Front End Developer Intern", subtitle: "Edunet Foundation × IBM SkillsBuild × AICTE · 2 months", description: "Built responsive front-end applications using modern web technologies." },
  { title: "AI Intern", subtitle: "Microsoft Elevate × AICTE · 2 months", description: "Worked on AI-driven solutions and explored machine learning pipelines." },
  { title: "Machine Learning Intern", subtitle: "Systemtron · 1 month", description: "Implemented ML models for predictive analysis and data processing." },
  { title: "AI Intern", subtitle: "Infosys Springboard Internship 6.0 · 2 months", description: "Developed AI applications and completed certification modules." },
  { title: "Core Team Member — E-Cell, JEC", subtitle: "2024 – Present", description: "Contributed to achieving All India Rank 6 in IIT Bombay's NEC 2025." },
  { title: "IITM EDD JEC Member", subtitle: "2024 – Present", description: "Member of IIT Madras Entrepreneurship & Design Development program." },
];

const Experience = () => {
  const { items: dbItems } = usePortfolioItems("experience");

  return (
    <PageWrapper title="Experience" subtitle="// internships & professional roles">
      <div className="space-y-4">
        {dbItems.map((item, i) => (
          <DynamicCard key={item.id} item={item} index={i} />
        ))}
        {staticExperiences.map((exp, i) => (
          <CardItem key={i} index={dbItems.length + i} {...exp} />
        ))}
      </div>
    </PageWrapper>
  );
};

export default Experience;
