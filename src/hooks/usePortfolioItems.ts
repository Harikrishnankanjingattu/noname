import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface PortfolioItem {
  id: string;
  section: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  tags: string[] | null;
  link: string | null;
  image_url: string | null;
  sort_order: number;
}

export const usePortfolioItems = (section: string) => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("portfolio_items")
        .select("*")
        .eq("section", section)
        .order("sort_order", { ascending: true });
      if (data) setItems(data);
      setLoading(false);
    };
    fetch();
  }, [section]);

  return { items, loading };
};
