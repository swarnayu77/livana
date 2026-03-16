
-- Add image_url column to food_logs
ALTER TABLE public.food_logs ADD COLUMN IF NOT EXISTS image_url text;

-- Create storage bucket for food photos
INSERT INTO storage.buckets (id, name, public) VALUES ('food-photos', 'food-photos', true) ON CONFLICT DO NOTHING;

-- Allow authenticated users to upload to food-photos bucket
CREATE POLICY "Users can upload food photos" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'food-photos' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow public read access
CREATE POLICY "Public can view food photos" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'food-photos');

-- Allow users to delete their own photos
CREATE POLICY "Users can delete own food photos" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'food-photos' AND (storage.foldername(name))[1] = auth.uid()::text);
