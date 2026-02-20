import PageWrapper from "@/components/PageWrapper";
import CardItem from "@/components/CardItem";
import DynamicCard from "@/components/DynamicCard";
import { usePortfolioItems } from "@/hooks/usePortfolioItems";

const staticProjects = [
  { title: "Enterprise AI Ingestion & Knowledge Graph Platform", subtitle: "Jan 2026", tags: ["AI", "Knowledge Graph"] },
  { title: "PayBee — Python Billing Software", subtitle: "Sept 2025", tags: ["Python"] },
  { title: "NetPulse — Network Analyzer", subtitle: "Nov 2025", tags: ["Python", "Networking"] },
  { title: "ML based Weather Prediction System", subtitle: "Sept 2025", tags: ["ML", "Python"] },
  { title: "AgroSmart — IoT Auto Irrigation System", subtitle: "Aug 2025", tags: ["IoT", "Arduino"] },
  { title: "SlotBook WebApp", subtitle: "Oct – Dec 2025", tags: ["React", "Web"] },
  { title: "Secure Billing Machine IoT Project", subtitle: "Oct 2025", tags: ["IoT", "Security"] },
  { title: "N8N Auto Email Responder", subtitle: "Oct 2025", tags: ["Automation", "N8N"] },
  { title: "Automatic Breaking System", subtitle: "Jan – Apr 2024", tags: ["IoT", "Safety"] },
  { title: "BinBuddy — Intelligent Waste Management", subtitle: "Sep – Dec 2024", tags: ["IoT", "AI"] },
  { title: "Gemini Spam Mail Detection", subtitle: "Nov 2025", tags: ["AI", "Python"] },
];

const Projects = () => {
  const { items: dbItems } = usePortfolioItems("projects");

  return (
    <PageWrapper title="Projects" subtitle="// building things that matter">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {dbItems.map((item, i) => (
          <DynamicCard key={item.id} item={item} index={i} />
        ))}
        {staticProjects.map((p, i) => (
          <CardItem key={i} index={dbItems.length + i} title={p.title} subtitle={p.subtitle} tags={p.tags} link="https://github.com/Harikrishnankanjingattu" />
        ))}
      </div>
    </PageWrapper>
  );
};

export default Projects;
