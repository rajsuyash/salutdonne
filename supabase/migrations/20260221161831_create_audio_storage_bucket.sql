/*
  # Create Audio Storage Bucket

  1. New Storage Bucket
    - `audio-files` bucket for storing audio demonstrations
    - Public access for playback
  
  2. Security
    - Public read access for all files
    - Authenticated users can upload files
*/

-- Create the audio files bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('audio-files', 'audio-files', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to audio files
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Public read access for audio files'
  ) THEN
    CREATE POLICY "Public read access for audio files"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'audio-files');
  END IF;
END $$;

-- Allow authenticated users to upload audio files
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can upload audio files'
  ) THEN
    CREATE POLICY "Authenticated users can upload audio files"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'audio-files');
  END IF;
END $$;

-- Allow authenticated users to update their uploads
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can update audio files'
  ) THEN
    CREATE POLICY "Authenticated users can update audio files"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'audio-files')
    WITH CHECK (bucket_id = 'audio-files');
  END IF;
END $$;

-- Allow authenticated users to delete their uploads
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can delete audio files'
  ) THEN
    CREATE POLICY "Authenticated users can delete audio files"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'audio-files');
  END IF;
END $$;
