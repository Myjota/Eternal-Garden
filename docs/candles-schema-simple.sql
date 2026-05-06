-- Simple Candles table for memorial functionality
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.candles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  memorial_id uuid NOT NULL,
  user_id uuid NULL,
  user_name text NOT NULL,
  is_lit boolean NOT NULL DEFAULT true,
  lit_at timestamp with time zone NULL DEFAULT now(),
  created_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT candles_pkey PRIMARY KEY (id),
  CONSTRAINT candles_memorial_id_fkey FOREIGN KEY (memorial_id) REFERENCES public.memorials (id) ON DELETE CASCADE,
  CONSTRAINT candles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE SET NULL
) TABLESPACE pg_default;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_candles_memorial_id ON public.candles USING btree (memorial_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_candles_user_id ON public.candles USING btree (user_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_candles_is_lit ON public.candles USING btree (is_lit) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_candles_lit_at ON public.candles USING btree (lit_at) TABLESPACE pg_default;
