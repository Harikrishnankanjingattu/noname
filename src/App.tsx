import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import AdminLogin from "@/components/AdminLogin";
import AdminPanel from "@/components/AdminPanel";
import { useAdmin } from "@/hooks/useAdmin";
import Index from "./pages/Index";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Certifications from "./pages/Certifications";
import Achievements from "./pages/Achievements";
import Events from "./pages/Events";
import Connect from "./pages/Connect";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const pageVariants = {
  initial: { opacity: 0, y: 16, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -10, filter: "blur(2px)" },
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/events" element={<Events />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const AppContent = () => {
  const { isAdmin, showLogin, adminPassword, handleLogoClick, handleAuth, handleLogout, setShowLogin } = useAdmin();

  return (
    <>
      <Navbar onLogoClick={handleLogoClick} />
      {showLogin && <AdminLogin onAuth={handleAuth} onClose={() => setShowLogin(false)} />}
      {isAdmin ? (
        <AdminPanel password={adminPassword} onLogout={handleLogout} />
      ) : (
        <AnimatedRoutes />
      )}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
