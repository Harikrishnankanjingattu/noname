import { motion } from "framer-motion";
import { PortfolioItem } from "@/hooks/usePortfolioItems";

interface DynamicCardProps {
  item: PortfolioItem;
  index: number;
}

const DynamicCard = ({ item, index }: DynamicCardProps) => {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="group relative rounded-lg border border-border bg-card hover-glow transition-all duration-300 hover:border-muted-foreground/30 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-foreground font-semibold text-lg group-hover:text-foreground transition-colors">
                {item.title}
              </h3>
              {item.subtitle && (
                <p className="text-muted-foreground font-mono text-xs mt-1">{item.subtitle}</p>
              )}
              {item.description && (
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{item.description}</p>
              )}
            </div>
            {item.link && (
              <span className="text-muted-foreground group-hover:text-foreground transition-colors text-sm font-mono shrink-0">↗</span>
            )}
          </div>
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {item.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 text-xs font-mono rounded bg-secondary text-secondary-foreground">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {item.image_url && (
          <div className="md:w-48 shrink-0">
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-40 md:h-full object-cover"
            />
          </div>
        )}
      </div>
    </motion.div>
  );

  if (item.link) {
    return (
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }
  return content;
};

export default DynamicCard;
