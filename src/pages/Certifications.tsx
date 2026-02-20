import PageWrapper from "@/components/PageWrapper";
import CardItem from "@/components/CardItem";
import DynamicCard from "@/components/DynamicCard";
import { usePortfolioItems } from "@/hooks/usePortfolioItems";

const staticCerts = [
  "TATA IIIC Internship — Basics of Python, Embedded Systems (2023)",
  "Reliance Digital Skill Academy — IoT Specialist Program",
  "Cisco — AI, Cybersecurity, Network Basics Program",
  "NDSC Web Development Certification — Government Skill Academy",
  "Accenture Software Engineer Job Simulation Program",
  "ZOOPLE UI/UX Bootcamp (Feb 2024)",
  "Intel & Govt of India — AI Introductory Course",
  "Google Cloud & Simplilearn — SkillUp AI Course",
  "Python for Data Science — Reliance Digital Skill Academy",
  "YIP 8.0 Certification",
  "Infosys — 20+ AI Certifications",
];

const Certifications = () => {
  const { items: dbItems } = usePortfolioItems("certifications");

  return (
    <PageWrapper title="Certifications" subtitle="// continuous learning & upskilling">
      <div className="space-y-3">
        {dbItems.map((item, i) => (
          <DynamicCard key={item.id} item={item} index={i} />
        ))}
        {staticCerts.map((cert, i) => (
          <CardItem key={i} index={dbItems.length + i} title={cert} />
        ))}
      </div>
    </PageWrapper>
  );
};

export default Certifications;
