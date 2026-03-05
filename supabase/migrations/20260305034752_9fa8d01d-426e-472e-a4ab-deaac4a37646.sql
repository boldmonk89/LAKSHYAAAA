
-- Create storage bucket for research papers
INSERT INTO storage.buckets (id, name, public) VALUES ('research-papers', 'research-papers', true);

-- Allow anyone to read research papers
CREATE POLICY "Anyone can read research papers"
ON storage.objects FOR SELECT
USING (bucket_id = 'research-papers');

-- Allow authenticated users to upload research papers
CREATE POLICY "Authenticated users can upload research papers"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'research-papers');

-- Create table for community research papers
CREATE TABLE public.research_papers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  author_name TEXT NOT NULL,
  year INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM now()),
  summary TEXT,
  file_path TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.research_papers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view research papers"
ON public.research_papers FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert papers"
ON public.research_papers FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own papers"
ON public.research_papers FOR DELETE
USING (auth.uid() = user_id);
