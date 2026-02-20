import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, password, item } = await req.json();
    const adminPassword = Deno.env.get("ADMIN_PASSWORD");

    if (password !== adminPassword) {
      return new Response(JSON.stringify({ error: "Invalid password" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    let result;

    if (action === "create") {
      const { data, error } = await supabase
        .from("portfolio_items")
        .insert(item)
        .select()
        .single();
      if (error) throw error;
      result = data;
    } else if (action === "update") {
      const { id, ...updates } = item;
      const { data, error } = await supabase
        .from("portfolio_items")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      result = data;
    } else if (action === "delete") {
      const { error } = await supabase
        .from("portfolio_items")
        .delete()
        .eq("id", item.id);
      if (error) throw error;
      result = { success: true };
    } else {
      throw new Error("Invalid action");
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
