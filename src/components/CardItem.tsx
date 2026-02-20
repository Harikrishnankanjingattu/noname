import { motion } from "framer-motion";

interface CardItemProps {
  title: string;
  subtitle?: string;
  description?: string;
  tags?: string[];
  index?: number;
  link?: string;
}

const CardItem = ({ title, subtitle, description, tags, index = 0, link }: CardItemProps) => {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="group relative p-4 md:p-6 rounded-xl border border-border bg-card hover-glow transition-all duration-300 hover:border-muted-foreground/30 active:scale-[0.98] touch-active"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-foreground font-semibold text-base md:text-lg leading-snug group-hover:text-foreground transition-colors">
            {title}
          </h3>
          {subtitle && (
            <p className="text-muted-foreground font-mono text-xs mt-1">{subtitle}</p>
          )}
          {description && (
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{description}</p>
          )}
        </div>
        {link && (
          <span className="text-muted-foreground group-hover:text-foreground transition-colors text-base font-mono shrink-0 mt-0.5">
            ↗
          </span>
        )}
      </div>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-mono rounded-md bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
};

export default CardItem;
