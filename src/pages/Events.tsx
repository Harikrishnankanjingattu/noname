import PageWrapper from "@/components/PageWrapper";
import CardItem from "@/components/CardItem";
import DynamicCard from "@/components/DynamicCard";
import { usePortfolioItems } from "@/hooks/usePortfolioItems";

const staticEvents = [
  { title: "NEC 2025 — IIT Bombay", subtitle: "National Entrepreneurship Challenge", description: "Represented E-Cell JEC and achieved All India Rank 6." },
  { title: "NASA Space Challenge Hackathon", subtitle: "International Hackathon", description: "Participated in NASA's global space apps challenge for 2 consecutive years." },
  { title: "ILLUMINATE Workshop", subtitle: "Technical Workshop", description: "Attended technical workshop on emerging technologies." },
  { title: "ZOOPLE UI/UX Bootcamp", subtitle: "Feb 2024", description: "Intensive bootcamp on UI/UX design principles and tools." },
  { title: "APJ Abdul Kalam Idea Pitching", subtitle: "2025", description: "Pitched innovative technology ideas and won first prize." },
];

const Events = () => {
  const { items: dbItems } = usePortfolioItems("events");

  return (
    <PageWrapper title="Events" subtitle="// hackathons, workshops & competitions">
      <div className="space-y-4">
        {dbItems.map((item, i) => (
          <DynamicCard key={item.id} item={item} index={i} />
        ))}
        {staticEvents.map((e, i) => (
          <CardItem key={i} index={dbItems.length + i} {...e} />
        ))}
      </div>
    </PageWrapper>
  );
};

export default Events;
