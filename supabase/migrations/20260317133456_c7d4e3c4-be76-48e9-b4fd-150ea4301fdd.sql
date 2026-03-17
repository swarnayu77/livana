CREATE POLICY "Users can update own food photos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'food-photos' AND (storage.foldername(name))[1] = auth.uid()::text)
WITH CHECK (bucket_id = 'food-photos' AND (storage.foldername(name))[1] = auth.uid()::text);