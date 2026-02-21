/*
  # Create Stripe Customers and Subscriptions Schema

  ## Overview
  This migration creates tables to store Stripe customer and subscription data,
  enabling the Donna AI Voice Assistant platform to manage payments and subscriptions.

  ## New Tables
  
  ### `customers`
  - `id` (uuid, primary key) - Internal customer ID
  - `email` (text, unique, not null) - Customer email address
  - `stripe_customer_id` (text, unique) - Stripe customer ID
  - `name` (text) - Customer name
  - `company` (text) - Company name
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `subscriptions`
  - `id` (uuid, primary key) - Internal subscription ID
  - `customer_id` (uuid, foreign key) - References customers table
  - `stripe_subscription_id` (text, unique) - Stripe subscription ID
  - `stripe_price_id` (text) - Stripe price ID
  - `status` (text) - Subscription status (active, canceled, past_due, etc.)
  - `plan_name` (text) - Plan name (Starter, Growth, Enterprise)
  - `plan_price` (numeric) - Monthly price
  - `current_period_start` (timestamptz) - Current billing period start
  - `current_period_end` (timestamptz) - Current billing period end
  - `cancel_at_period_end` (boolean) - Whether subscription cancels at period end
  - `created_at` (timestamptz) - Subscription creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on both tables
  - Add policies for authenticated users to read their own data
  - Service role can manage all records

  ## Notes
  - All timestamps default to current time
  - Stripe IDs are unique to prevent duplicates
  - Foreign key ensures data integrity between tables
*/

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  stripe_customer_id text UNIQUE,
  name text,
  company text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  stripe_subscription_id text UNIQUE,
  stripe_price_id text,
  status text DEFAULT 'incomplete',
  plan_name text,
  plan_price numeric,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_stripe_id ON customers(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_customer_id ON subscriptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- Enable Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Customers policies
CREATE POLICY "Users can view their own customer data"
  ON customers
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt()->>'email');

CREATE POLICY "Service role can manage all customers"
  ON customers
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Subscriptions policies
CREATE POLICY "Users can view their own subscriptions"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (
    customer_id IN (
      SELECT id FROM customers WHERE email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "Service role can manage all subscriptions"
  ON subscriptions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to automatically update updated_at
CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
