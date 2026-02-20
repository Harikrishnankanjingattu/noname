import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const PageWrapper = ({ children, title, subtitle }: PageWrapperProps) => (
  <div className="min-h-screen pt-14 md:pt-20 pb-6 md:pb-16">
    <div className="container max-w-5xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 md:mb-12 pt-6 md:pt-10"
      >
        <h1 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-foreground glow-text">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-muted-foreground font-mono text-xs md:text-sm max-w-2xl">{subtitle}</p>
        )}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          style={{ originX: 0 }}
          className="mt-3 h-[1px] w-16 md:w-24 bg-foreground"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  </div>
);

export default PageWrapper;
