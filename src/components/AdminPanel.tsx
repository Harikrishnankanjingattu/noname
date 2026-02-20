import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, X, Upload, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AdminPanelProps {
  password: string;
  onLogout: () => void;
}

interface PortfolioItem {
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

const sections = ["projects", "experience", "certifications", "achievements", "events"];

const AdminPanel = ({ password, onLogout }: AdminPanelProps) => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [activeSection, setActiveSection] = useState("projects");
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    tags: "",
    link: "",
    image_url: "",
  });

  const fetchItems = async () => {
    const { data } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("sort_order", { ascending: true });
    if (data) setItems(data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("portfolio-images")
      .upload(fileName, file);

    if (error) {
      toast.error("Upload failed");
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("portfolio-images")
      .getPublicUrl(fileName);

    setForm((f) => ({ ...f, image_url: urlData.publicUrl }));
    setUploading(false);
    toast.success("Image uploaded");
  };

  const callAdmin = async (action: string, item: Record<string, unknown>) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-portfolio", {
        body: { action, password, item },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      await fetchItems();
      toast.success(action === "create" ? "Created!" : action === "update" ? "Updated!" : "Deleted!");
      return data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Action failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const item: Record<string, unknown> = {
      section: activeSection,
      title: form.title,
      subtitle: form.subtitle || null,
      description: form.description || null,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : null,
      link: form.link || null,
      image_url: form.image_url || null,
    };

    if (editingItem) {
      item.id = editingItem.id;
      await callAdmin("update", item);
    } else {
      await callAdmin("create", item);
    }

    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this item?")) {
      await callAdmin("delete", { id });
    }
  };

  const startEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      subtitle: item.subtitle || "",
      description: item.description || "",
      tags: item.tags?.join(", ") || "",
      link: item.link || "",
      image_url: item.image_url || "",
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setForm({ title: "", subtitle: "", description: "", tags: "", link: "", image_url: "" });
    setEditingItem(null);
    setShowForm(false);
  };

  const sectionItems = items.filter((i) => i.section === activeSection);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground glow-text">Admin Panel</h1>
              <p className="text-muted-foreground font-mono text-xs mt-1">// manage portfolio content</p>
            </div>
            <button onClick={onLogout} className="px-4 py-2 rounded-md border border-border text-muted-foreground font-mono text-xs hover:text-foreground hover:border-muted-foreground/50 transition-all">
              Logout
            </button>
          </div>
        </motion.div>

        {/* Section tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => { setActiveSection(s); resetForm(); }}
              className={`px-4 py-2 rounded-md font-mono text-xs transition-all ${
                activeSection === s
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Add button */}
        {!showForm && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowForm(true)}
            className="mb-6 flex items-center gap-2 px-4 py-3 rounded-md border border-dashed border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/50 font-mono text-sm transition-all w-full justify-center"
          >
            <Plus size={16} /> Add {activeSection.slice(0, -1)}
          </motion.button>
        )}

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSubmit}
              className="mb-8 p-6 rounded-lg border border-border bg-card space-y-4 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-foreground font-semibold">{editingItem ? "Edit" : "Add"} {activeSection.slice(0, -1)}</h3>
                <button type="button" onClick={resetForm} className="text-muted-foreground hover:text-foreground">
                  <X size={18} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Title *"
                    required
                    className="w-full px-4 py-3 rounded-md bg-secondary border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
                  />
                  <input
                    value={form.subtitle}
                    onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                    placeholder="Subtitle (date, role, etc.)"
                    className="w-full px-4 py-3 rounded-md bg-secondary border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
                  />
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Description"
                    rows={3}
                    className="w-full px-4 py-3 rounded-md bg-secondary border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground resize-none"
                  />
                  <input
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    placeholder="Tags (comma separated)"
                    className="w-full px-4 py-3 rounded-md bg-secondary border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
                  />
                  <input
                    value={form.link}
                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                    placeholder="Link (GitHub, etc.)"
                    className="w-full px-4 py-3 rounded-md bg-secondary border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
                  />
                </div>

                {/* Image upload - right side */}
                <div className="flex flex-col items-center justify-center p-4 rounded-md border border-dashed border-border bg-secondary/50 min-h-[200px]">
                  {form.image_url ? (
                    <div className="relative w-full">
                      <img src={form.image_url} alt="Preview" className="w-full h-48 object-cover rounded-md" />
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, image_url: "" })}
                        className="absolute top-2 right-2 p-1 rounded bg-background/80 text-foreground hover:bg-background"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center gap-3 cursor-pointer text-muted-foreground hover:text-foreground transition-colors w-full h-full justify-center">
                      {uploading ? (
                        <div className="animate-spin w-8 h-8 border-2 border-foreground border-t-transparent rounded-full" />
                      ) : (
                        <>
                          <ImageIcon size={32} />
                          <span className="font-mono text-xs">Upload Image</span>
                          <span className="font-mono text-[10px] text-muted-foreground">Click to browse</span>
                        </>
                      )}
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 rounded-md bg-primary text-primary-foreground font-mono text-sm font-medium hover-glow transition-all disabled:opacity-50"
              >
                {loading ? "Saving..." : editingItem ? "Update" : "Create"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Items list */}
        <div className="space-y-3">
          {sectionItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group flex items-start gap-4 p-4 rounded-lg border border-border bg-card hover:border-muted-foreground/30 transition-all"
            >
              {item.image_url && (
                <img src={item.image_url} alt="" className="w-16 h-16 rounded-md object-cover shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-foreground font-semibold text-sm truncate">{item.title}</h3>
                {item.subtitle && <p className="text-muted-foreground font-mono text-xs">{item.subtitle}</p>}
                {item.description && <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{item.description}</p>}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.map((t) => (
                      <span key={t} className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-secondary text-secondary-foreground">{t}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => startEdit(item)} className="p-2 text-muted-foreground hover:text-foreground">
                  <Edit2 size={14} />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-2 text-muted-foreground hover:text-destructive">
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
          {sectionItems.length === 0 && (
            <p className="text-center text-muted-foreground font-mono text-sm py-12">No {activeSection} yet. Add one above!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
