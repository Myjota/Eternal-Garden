-- Candles table for memorial functionality
-- Run this in your Supabase SQL Editor
-- This integrates with your existing memorials and condolences structure

CREATE TABLE IF NOT EXISTS candles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  memorial_id UUID NOT NULL REFERENCES memorials(id) ON DELETE CASCADE,
  user_id UUID,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  is_lit BOOLEAN DEFAULT true NOT NULL,
  lit_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_candles_memorial_id ON candles(memorial_id);
CREATE INDEX idx_candles_user_id ON candles(user_id);
CREATE INDEX idx_candles_is_lit ON candles(is_lit);
CREATE INDEX idx_candles_expires_at ON candles(expires_at);
CREATE INDEX idx_candles_lit_at ON candles(lit_at);

-- RLS (Row Level Security) policies
ALTER TABLE candles ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view candles for memorials (like condolences)
CREATE POLICY "Anyone can view candles" ON candles
  FOR SELECT USING (true);

-- Policy: Anyone can insert candles (authenticated or anonymous - like condolences)
CREATE POLICY "Anyone can insert candles" ON candles
  FOR INSERT WITH CHECK (true);

-- Policy: Users can update their own candles (if authenticated)
CREATE POLICY "Users can update own candles" ON candles
  FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);

-- Policy: Users can delete their own candles (if authenticated)
CREATE POLICY "Users can delete own candles" ON candles
  FOR DELETE USING (auth.uid() = user_id OR user_id IS NULL);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_candles_updated_at
    BEFORE UPDATE ON candles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to clean up expired candles (optional)
CREATE OR REPLACE FUNCTION cleanup_expired_candles()
RETURNS void AS $$
BEGIN
    UPDATE candles 
    SET is_lit = false 
    WHERE is_lit = true 
    AND expires_at IS NOT NULL 
    AND expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- You can run this function periodically to clean up expired candles
-- SELECT cleanup_expired_candles();
