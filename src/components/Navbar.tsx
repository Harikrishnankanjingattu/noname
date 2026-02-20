import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Briefcase, Code2, Award, Trophy, CalendarDays, MessageCircle } from "lucide-react";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/experience", label: "Experience", icon: Briefcase },
  { path: "/projects", label: "Projects", icon: Code2 },
  { path: "/certifications", label: "Certs", icon: Award },
  { path: "/achievements", label: "Awards", icon: Trophy },
  { path: "/events", label: "Events", icon: CalendarDays },
  { path: "/connect", label: "Connect", icon: MessageCircle },
];

interface NavbarProps {
  onLogoClick?: () => void;
}

const Navbar = ({ onLogoClick }: NavbarProps) => {
  const location = useLocation();

  return (
    <>
      {/* ── Desktop top nav (hidden on mobile) ── */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <button
            onClick={onLogoClick}
            className="font-mono text-lg font-bold tracking-tight text-foreground hover:opacity-70 transition-opacity min-h-0"
          >
            HK<span className="text-muted-foreground">.</span>
          </button>

          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-3 py-2 text-sm font-mono transition-colors text-muted-foreground hover:text-foreground min-h-0"
              >
                {location.pathname === item.path && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-md bg-accent"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Mobile top bar (just logo/brand) ── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl flex items-center px-4 h-14">
        <button
          onClick={onLogoClick}
          className="font-mono text-base font-bold tracking-tight text-foreground min-h-0"
        >
          HK<span className="text-muted-foreground">.</span>
        </button>
        <span className="ml-3 font-mono text-xs text-muted-foreground truncate">
          {navItems.find(n => n.path === location.pathname)?.label ?? "Home"}
        </span>
      </header>

      {/* ── Mobile bottom nav bar ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl mobile-nav flex items-start justify-around px-1 pt-2">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-0.5 flex-1 py-1 touch-active min-h-0"
            >
              <div className={`relative flex items-center justify-center w-10 h-7 rounded-full transition-all duration-300 ${active ? "bg-accent" : ""}`}>
                {active && (
                  <motion.div
                    layoutId="bottom-nav-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                  />
                )}
                <Icon
                  size={18}
                  className={`relative z-10 transition-colors duration-300 ${active ? "text-foreground" : "text-muted-foreground"}`}
                />
              </div>
              <span className={`text-[10px] font-mono transition-colors duration-300 ${active ? "text-foreground" : "text-muted-foreground"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Navbar;
