
-- Enable extensions for scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Allow AI-generated papers (bypass RLS for service role)
-- Make insert policy more permissive to allow service role
DROP POLICY IF EXISTS "Authenticated users can insert papers" ON public.research_papers;
CREATE POLICY "Anyone can insert papers" ON public.research_papers
  FOR INSERT TO public
  WITH CHECK (true);
