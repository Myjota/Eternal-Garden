-- Candles table for memorial functionality
-- This integrates with your existing memorials and condolences structure
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.candles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  memorial_id uuid NOT NULL,
  user_id uuid NULL,
  user_name text NOT NULL,
  user_avatar text NULL,
  is_lit boolean NOT NULL DEFAULT true,
  lit_at timestamp with time zone NULL DEFAULT now(),
  expires_at timestamp with time zone NULL,
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT candles_pkey PRIMARY KEY (id),
  CONSTRAINT candles_memorial_id_fkey FOREIGN KEY (memorial_id) REFERENCES public.memorials (id) ON DELETE CASCADE,
  CONSTRAINT candles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE SET NULL
) TABLESPACE pg_default;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_candles_memorial_id ON public.candles USING btree (memorial_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_candles_user_id ON public.candles USING btree (user_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_candles_is_lit ON public.candles USING btree (is_lit) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_candles_expires_at ON public.candles USING btree (expires_at) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_candles_lit_at ON public.candles USING btree (lit_at) TABLESPACE pg_default;

-- RLS (Row Level Security) policies
ALTER TABLE public.candles ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view candles for memorials (like condolences)
CREATE POLICY "Anyone can view candles" ON public.candles
  FOR SELECT USING (true);

-- Policy: Anyone can insert candles (authenticated or anonymous - like condolences)
CREATE POLICY "Anyone can insert candles" ON public.candles
  FOR INSERT WITH CHECK (true);

-- Policy: Users can update their own candles (if authenticated)
CREATE POLICY "Users can update own candles" ON public.candles
  FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);

-- Policy: Users can delete their own candles (if authenticated)
CREATE POLICY "Users can delete own candles" ON public.candles
  FOR DELETE USING (auth.uid() = user_id OR user_id IS NULL);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_candles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_candles_updated_at
    BEFORE UPDATE ON public.candles
    FOR EACH ROW
    EXECUTE FUNCTION update_candles_updated_at();

-- Function to increment memorial candle_count when candle is lit
CREATE OR REPLACE FUNCTION increment_memorial_candle_count()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_lit = true AND (OLD.is_lit IS NULL OR OLD.is_lit = false) THEN
        UPDATE public.memorials 
        SET candle_count = candle_count + 1 
        WHERE id = NEW.memorial_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically increment candle_count
CREATE TRIGGER increment_memorial_candle_count_trigger
    AFTER INSERT ON public.candles
    FOR EACH ROW
    EXECUTE FUNCTION increment_memorial_candle_count();

-- Function to clean up expired candles and update counts
CREATE OR REPLACE FUNCTION cleanup_expired_candles()
RETURNS void AS $$
BEGIN
    -- Update expired candles
    UPDATE public.candles 
    SET is_lit = false 
    WHERE is_lit = true 
    AND expires_at IS NOT NULL 
    AND expires_at < NOW();
    
    -- Optionally, you could also decrement memorial.candle_count here
    -- if you want to track only currently burning candles
END;
$$ LANGUAGE plpgsql;

-- You can run this function periodically to clean up expired candles
-- SELECT cleanup_expired_candles();
