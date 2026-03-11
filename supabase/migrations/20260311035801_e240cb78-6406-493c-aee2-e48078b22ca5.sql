
-- Fix: Revert to authenticated-only insert policy
-- Service role bypasses RLS anyway, so AI-generated inserts will work
DROP POLICY IF EXISTS "Anyone can insert papers" ON public.research_papers;
CREATE POLICY "Authenticated users can insert papers" ON public.research_papers
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
