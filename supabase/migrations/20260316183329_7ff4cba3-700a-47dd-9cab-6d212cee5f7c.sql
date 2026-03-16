
CREATE POLICY "Users can update own food logs" ON public.food_logs
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
