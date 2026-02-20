import PageWrapper from "@/components/PageWrapper";
import CardItem from "@/components/CardItem";
import DynamicCard from "@/components/DynamicCard";
import { usePortfolioItems } from "@/hooks/usePortfolioItems";

const staticAchievements = [
  { title: "NEC 2025 Advanced Track — E-Cell IIT Bombay", subtitle: "All India Rank 6", description: "Competed in India's premier national entrepreneurship challenge." },
  { title: "National Entrepreneurship Challenge 2025", subtitle: "All India AIR 9 — Advanced Track, IIT Bombay", description: "Advanced track finalist in NEC organized by IIT Bombay." },
  { title: "APJ Abdul Kalam Idea Pitching Competition", subtitle: "1st Prize — 2025", description: "Won first place in idea pitching competition." },
  { title: "NASA Space Challenge Hackathon", subtitle: "2 years participation", description: "Participated in NASA's international space apps challenge." },
];

const Achievements = () => {
  const { items: dbItems } = usePortfolioItems("achievements");

  return (
    <PageWrapper title="Achievements" subtitle="// milestones & recognitions">
      <div className="space-y-4">
        {dbItems.map((item, i) => (
          <DynamicCard key={item.id} item={item} index={i} />
        ))}
        {staticAchievements.map((a, i) => (
          <CardItem key={i} index={dbItems.length + i} {...a} />
        ))}
      </div>
    </PageWrapper>
  );
};

export default Achievements;
