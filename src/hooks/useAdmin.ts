import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  const handleLogoClick = useCallback(() => {
    if (!isAdmin) {
      setShowLogin(true);
    }
  }, [isAdmin]);

  const handleAuth = useCallback(async (password: string) => {
    // Verify password by making a test call
    try {
      const { data, error } = await supabase.functions.invoke("admin-portfolio", {
        body: { action: "create", password, item: { section: "__test__", title: "__test__" } },
      });

      if (error || data?.error) {
        toast.error("Invalid password");
        return;
      }

      // Delete the test item
      if (data?.id) {
        await supabase.functions.invoke("admin-portfolio", {
          body: { action: "delete", password, item: { id: data.id } },
        });
      }

      setAdminPassword(password);
      setIsAdmin(true);
      setShowLogin(false);
      toast.success("Admin mode activated");
    } catch {
      toast.error("Invalid password");
    }
  }, []);

  const handleLogout = useCallback(() => {
    setIsAdmin(false);
    setAdminPassword("");
  }, []);

  return {
    isAdmin,
    showLogin,
    adminPassword,
    handleLogoClick,
    handleAuth,
    handleLogout,
    setShowLogin,
  };
};
