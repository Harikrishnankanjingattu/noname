import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock } from "lucide-react";

interface AdminLoginProps {
  onAuth: (password: string) => void;
  onClose: () => void;
}

const AdminLogin = ({ onAuth, onClose }: AdminLoginProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      onAuth(password);
    } else {
      setError(true);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-sm mx-4 p-8 rounded-lg border border-border bg-card"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
            <X size={18} />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-md bg-secondary">
              <Lock size={18} className="text-foreground" />
            </div>
            <div>
              <h2 className="text-foreground font-semibold">Admin Access</h2>
              <p className="text-muted-foreground text-xs font-mono">enter password</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="••••••••"
              className={`w-full px-4 py-3 rounded-md bg-secondary border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground transition-all ${
                error ? "border-destructive" : "border-border"
              }`}
              autoFocus
            />
            {error && <p className="text-destructive text-xs mt-2 font-mono">Password required</p>}
            <button
              type="submit"
              className="w-full mt-4 px-4 py-3 rounded-md bg-primary text-primary-foreground font-mono text-sm font-medium hover-glow transition-all"
            >
              Unlock
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminLogin;
