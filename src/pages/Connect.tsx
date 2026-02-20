import PageWrapper from "@/components/PageWrapper";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

const links = [
  { icon: Github, label: "GitHub", href: "https://github.com/Harikrishnankanjingattu", username: "Harikrishnankanjingattu" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/harikrishnan-kanjingattu-48a172275/", username: "harikrishnan-kanjingattu" },
  { icon: Mail, label: "Email", href: "mailto:harikanjingattu@gmail.com", username: "harikanjingattu@gmail.com" },

];

const Connect = () => (
  <PageWrapper title="Connect" subtitle="// let's build something together">
    <div className="space-y-3 w-full max-w-lg">
      {links.map((link, i) => (
        <motion.a
          key={link.label}
          href={link.href}
          target={link.label !== "Phone" ? "_blank" : undefined}
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="group flex items-center gap-4 p-4 md:p-5 rounded-xl border border-border bg-card hover-glow hover:border-muted-foreground/30 transition-all active:scale-[0.98] touch-active"
        >
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
            <link.icon size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-foreground font-semibold text-sm">{link.label}</p>
            <p className="text-muted-foreground font-mono text-xs truncate">{link.username}</p>
          </div>
          <span className="text-muted-foreground group-hover:text-foreground transition-colors font-mono text-sm shrink-0">↗</span>
        </motion.a>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-2 mt-6 text-muted-foreground font-mono text-xs"
      >
        <MapPin size={13} />
        Arangottukara, Kerala, India
      </motion.div>
    </div>
  </PageWrapper>
);

export default Connect;
