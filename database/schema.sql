-- Shoe Cleaning Store Order Tracker Database Schema
-- Run this SQL in your Supabase SQL Editor to set up the database

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  service_availed TEXT NOT NULL CHECK (service_availed IN ('deep-clean', 'sole-whitening', 'repaint', 'leather-conditioning')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'ready-for-pickup', 'claimed')),
  image_before_url TEXT,
  image_after_url TEXT,
  date_availed TIMESTAMP WITH TIME ZONE NOT NULL,
  date_claimed TIMESTAMP WITH TIME ZONE,
  payment_mode TEXT NOT NULL CHECK (payment_mode IN ('cash', 'bank-transfer', 'e-wallet')),
  payment_receipt_url TEXT,
  total_price NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on customer_name and phone for faster searches
CREATE INDEX IF NOT EXISTS idx_orders_customer_name ON orders(customer_name);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_date_availed ON orders(date_availed DESC);

-- Create updated_at trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS orders_update_updated_at ON orders;
CREATE TRIGGER orders_update_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Enable Row Level Security (optional but recommended)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow authenticated users to read all orders
CREATE POLICY "Allow authenticated users to read orders" ON orders
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create a policy to allow authenticated users to insert orders
CREATE POLICY "Allow authenticated users to insert orders" ON orders
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Create a policy to allow authenticated users to update orders
CREATE POLICY "Allow authenticated users to update orders" ON orders
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Create a policy to allow authenticated users to delete orders
CREATE POLICY "Allow authenticated users to delete orders" ON orders
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO orders (customer_name, customer_phone, service_availed, status, image_before_url, image_after_url, date_availed, date_claimed, payment_mode, total_price)
VALUES
  (
    'Juan Santos',
    '+63 917 123 4567',
    'deep-clean',
    'claimed',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&brightness=1.2',
    NOW() - INTERVAL '3 days',
    NOW() - INTERVAL '2 days',
    'cash',
    1200
  ),
  (
    'Maria Angeles',
    '+63 922 456 7890',
    'sole-whitening',
    'ready-for-pickup',
    'https://images.unsplash.com/photo-1605348532760-6753d2c4c3c9?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1605348532760-6753d2c4c3c9?w=300&h=300&fit=crop&brightness=1.3',
    NOW() - INTERVAL '1 day',
    NULL,
    'e-wallet',
    800
  ),
  (
    'Roberto Cruz',
    '+63 908 789 0123',
    'leather-conditioning',
    'in-progress',
    'https://images.unsplash.com/photo-1559589689180-0be8morrison?w=300&h=300&fit=crop',
    NULL,
    NOW() - INTERVAL '6 hours',
    NULL,
    'bank-transfer',
    950
  ),
  (
    'Carmen Lopez',
    '+63 915 234 5678',
    'repaint',
    'pending',
    'https://images.unsplash.com/photo-1595946590594-8155a7f1ecb6?w=300&h=300&fit=crop',
    NULL,
    NOW(),
    NULL,
    'cash',
    1500
  );

-- Grant necessary permissions (adjust as needed for your Supabase project)
GRANT USAGE ON SCHEMA public TO authenticated, anon;
GRANT ALL PRIVILEGES ON TABLE orders TO authenticated, anon;

-- Storage bucket RLS policies for anonymous access
CREATE POLICY "Allow anon to upload files" ON storage.objects
  FOR INSERT TO anon
  WITH CHECK (bucket_id = 'shoe-images');

CREATE POLICY "Allow anon to read files" ON storage.objects
  FOR SELECT TO anon
  USING (bucket_id = 'shoe-images');

CREATE POLICY "Allow anon to delete files" ON storage.objects
  FOR DELETE TO anon
  USING (bucket_id = 'shoe-images');
