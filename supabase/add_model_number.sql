-- Add model_number column to products table
-- Run this in Supabase SQL Editor
ALTER TABLE products ADD COLUMN IF NOT EXISTS model_number TEXT;
