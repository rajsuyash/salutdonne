/*
  # Fix RLS Performance and Security Issues

  ## Changes
  1. Drop and recreate RLS policies with optimized auth function calls
     - Wrap auth.jwt() in SELECT to prevent per-row re-evaluation
     - Improves query performance at scale
  
  2. Remove unused indexes
     - Drop indexes that are not being used by queries
     - Reduces storage overhead and maintenance cost
  
  3. Fix function search_path security
     - Add SECURITY DEFINER and explicit search_path to update_updated_at_column
     - Prevents potential security vulnerabilities

  ## Security
  - RLS policies remain restrictive and secure
  - Function search_path is now immutable
  - Authentication checks are optimized but still enforced
*/

-- Drop existing policies to recreate them with optimized queries
DROP POLICY IF EXISTS "Users can view their own customer data" ON customers;
DROP POLICY IF EXISTS "Users can view their own subscriptions" ON subscriptions;

-- Recreate customers policy with optimized auth function call
CREATE POLICY "Users can view their own customer data"
  ON customers
  FOR SELECT
  TO authenticated
  USING (email = (SELECT auth.jwt()->>'email'));

-- Recreate subscriptions policy with optimized auth function call
CREATE POLICY "Users can view their own subscriptions"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (
    customer_id IN (
      SELECT id FROM customers WHERE email = (SELECT auth.jwt()->>'email')
    )
  );

-- Drop unused indexes
DROP INDEX IF EXISTS idx_customers_email;
DROP INDEX IF EXISTS idx_customers_stripe_id;
DROP INDEX IF EXISTS idx_subscriptions_customer_id;
DROP INDEX IF EXISTS idx_subscriptions_stripe_id;
DROP INDEX IF EXISTS idx_subscriptions_status;

-- Fix function security by adding SECURITY DEFINER and explicit search_path
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;