import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const skills = [
  "Python", "C", "HTML/CSS", "React", "SQL", "Firebase", "Supabase",
  "Generative AI", "Arduino", "NodeMCU", "ESP8266", "Git", "GitHub",
  "VS Code", "UI/UX", "Cisco Packet Tracer", "Oracle VirtualBox", "VMware",
];

const roles = ["Full-Stack Developer", "AI Enthusiast", "IoT Builder", "CS Engineer"];

/** Animated typing text that cycles through roles */
const TypingText = () => {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = roles[idx % roles.length];
    let timer: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < full.length) {
      timer = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === full.length) {
      timer = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((i) => i + 1);
    }
    return () => clearTimeout(timer);
  }, [displayed, deleting, idx]);

  return (
    <span className="font-mono text-xs sm:text-sm text-muted-foreground">
      {displayed}
      <span className="inline-block w-[2px] h-[1em] bg-foreground ml-0.5 animate-pulse align-middle" />
    </span>
  );
};

/** Floating orb decorations */
const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {[
      { size: 280, x: "75%", y: "10%", delay: 0, dur: 7 },
      { size: 200, x: "10%", y: "60%", delay: 2, dur: 9 },
      { size: 150, x: "85%", y: "70%", delay: 1, dur: 11 },
    ].map((orb, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: orb.size,
          height: orb.size,
          left: orb.x,
          top: orb.y,
          background: `radial-gradient(circle, hsl(0 0% 100% / 0.04) 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
  </div>
);

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen pt-14 md:pt-20 dot-grid noise">

      {/* ── Hero ── */}
      <section className="relative container max-w-5xl py-8 md:py-28 px-4 overflow-hidden">
        <FloatingOrbs />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10">
          {/* Profile image + name row — stacked on mobile, side-by-side on md */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-12">

            {/* Left: text */}
            <div className="flex-1 order-2 md:order-1 mt-6 md:mt-0">
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-mono text-xs text-muted-foreground mb-2 tracking-wider"
              >
                // hello world
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight text-foreground leading-[0.9] glow-text"
              >
                HARIKRISHNAN
                <br />
                <span className="text-muted-foreground">K</span>
              </motion.h1>

              {/* Animated typing role */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-3 h-6 flex items-center"
              >
                <TypingText />
              </motion.div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
                style={{ originX: 0 }}
                className="mt-4 h-[1px] w-24 bg-foreground"
              />

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mt-4 text-muted-foreground max-w-xl text-sm md:text-base leading-relaxed"
              >
                Motivated Computer Science enthusiast with strong hands-on experience in
                full-stack web development, AI-driven applications, and IoT-based projects.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 }}
                className="mt-6 flex flex-col sm:flex-row gap-3"
              >
                <Link
                  to="/projects"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-mono text-sm font-medium hover-glow transition-all w-full sm:w-auto active:scale-95"
                >
                  <Sparkles size={15} className="animate-pulse" />
                  View Projects <ArrowRight size={15} />
                </Link>
                <Link
                  to="/connect"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border text-foreground font-mono text-sm font-medium hover:bg-accent transition-all w-full sm:w-auto active:scale-95"
                >
                  Connect
                </Link>
              </motion.div>

              {/* Social icons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-5 flex gap-4"
              >
                {[
                  { href: "https://github.com/Harikrishnankanjingattu", icon: Github, label: "GitHub" },
                  { href: "https://www.linkedin.com/in/harikrishnan-kanjingattu-48a172275/", icon: Linkedin, label: "LinkedIn" },
                  { href: "mailto:harikanjingattu@gmail.com", icon: Mail, label: "Email" },
                ].map(({ href, icon: Icon, label }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={label !== "Email" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/50 hover:bg-accent transition-all min-h-0"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Right: Profile picture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="order-1 md:order-2 flex justify-center md:block"
            >
              <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72">
                {/* Rotating ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "conic-gradient(from 0deg, transparent 60%, hsl(0 0% 100% / 0.4), transparent)",
                    padding: "2px",
                  }}
                />
                {/* Glow pulse ring */}
                <motion.div
                  animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-[-6px] rounded-full"
                  style={{ background: "radial-gradient(circle at center, hsl(0 0% 100% / 0.12), transparent 70%)" }}
                />
                {/* Profile image */}
                <div className="absolute inset-[3px] rounded-full overflow-hidden border border-border bg-card">
                  <img
                    src="/profilepic.png"
                    alt="Harikrishnan K"
                    className="w-full h-full object-cover object-top"
                    draggable={false}
                  />
                </div>
                {/* Floating badge */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-card border border-border rounded-full font-mono text-xs text-muted-foreground whitespace-nowrap shadow-lg"
                >
                  CGPA 9.18 ✦
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Skills ── */}
      <section className="container max-w-5xl pb-10 md:pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-4">
            // tech stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.7, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.035, type: "spring", stiffness: 200, damping: 15 }}
                whileHover={{ scale: 1.08, borderColor: "hsl(0 0% 50%)" }}
                className="px-3 py-2 text-xs font-mono border border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Education ── */}
      <section className="container max-w-5xl pb-10 md:pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-5">
            // education
          </h2>
          <div className="space-y-6">
            {[
              { degree: "B.Tech in Computer Science & Engineering", school: "Jyothi Engineering College, Cheruthuruthy, Kerala", detail: "S4 — CGPA: 9.18", period: "2024 – Present" },
              { degree: "Diploma in Computer Science Engineering", school: "GPTC Chelakkara, Thrissur, Kerala", detail: "90% CGPA — Completed 2024", period: "2022 – 2024" },
              { degree: "Plus Two — Computer Science", school: "GHSS Pattambi, Palakkad", detail: "97% Pass Mark", period: "2020 – 2022" },
            ].map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
                className="relative pl-5 border-l border-border group"
              >
                {/* Animated dot */}
                <motion.div
                  className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-foreground border-2 border-background"
                  whileInView={{ scale: [0, 1.3, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.2, duration: 0.4 }}
                />
                <h3 className="text-foreground font-semibold text-sm md:text-base group-hover:text-foreground/90 transition-colors">{edu.degree}</h3>
                <p className="text-muted-foreground text-xs md:text-sm mt-0.5">{edu.school}</p>
                <p className="text-muted-foreground font-mono text-xs mt-1">{edu.detail} · {edu.period}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Quick links ── */}
      <section className="container max-w-5xl pb-10 md:pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
        >
          {[
            { label: "Experience", path: "/experience" },
            { label: "Projects", path: "/projects" },
            { label: "Certifications", path: "/certifications" },
            { label: "Achievements", path: "/achievements" },
            { label: "Events", path: "/events" },
            { label: "Connect", path: "/connect" },
          ].map((item, i) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to={item.path}
                className="group flex p-4 border border-border rounded-xl hover:border-muted-foreground/50 hover-glow transition-all"
              >
                <span className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-2">
                  {item.label}
                  <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-6">
        <div className="container max-w-5xl px-4 flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-start sm:items-center">
          <p className="text-muted-foreground font-mono text-xs">© 2025 Harikrishnan K</p>
          <p className="text-muted-foreground font-mono text-xs">Arangottukara, Kerala</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
