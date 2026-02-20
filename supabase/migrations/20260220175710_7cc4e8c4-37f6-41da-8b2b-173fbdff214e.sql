
-- Portfolio sections content table
CREATE TABLE public.portfolio_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL, -- 'projects', 'experience', 'certifications', 'achievements', 'events'
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  tags TEXT[],
  link TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

-- Public read access (visitors can see all items)
CREATE POLICY "Anyone can view portfolio items"
  ON public.portfolio_items FOR SELECT
  USING (true);

-- No insert/update/delete via RLS - we'll use an edge function with password auth

-- Create storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-images', 'portfolio-images', true);

CREATE POLICY "Anyone can view portfolio images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-images');

CREATE POLICY "Anyone can upload portfolio images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'portfolio-images');

CREATE POLICY "Anyone can update portfolio images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'portfolio-images');

CREATE POLICY "Anyone can delete portfolio images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'portfolio-images');

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_portfolio_items_updated_at
  BEFORE UPDATE ON public.portfolio_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
