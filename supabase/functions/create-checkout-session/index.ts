import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.4.0';
import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2024-11-20.acacia',
    });

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );

    const { plan, email, name, company } = await req.json();

    if (!plan || !email) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const priceIds: Record<string, { priceId: string; amount: number }> = {
      Starter: { priceId: 'price_starter', amount: 20000 },
      Growth: { priceId: 'price_growth', amount: 50000 },
      Enterprise: { priceId: 'price_enterprise', amount: 100000 },
    };

    const planConfig = priceIds[plan.title];
    if (!planConfig) {
      return new Response(
        JSON.stringify({ error: 'Invalid plan' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    let stripeCustomerId: string;
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('stripe_customer_id')
      .eq('email', email)
      .maybeSingle();

    if (existingCustomer?.stripe_customer_id) {
      stripeCustomerId = existingCustomer.stripe_customer_id;
    } else {
      const customer = await stripe.customers.create({
        email,
        name,
        metadata: {
          company: company || '',
        },
      });
      stripeCustomerId = customer.id;

      await supabase.from('customers').insert({
        email,
        stripe_customer_id: stripeCustomerId,
        name,
        company,
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Donna AI - ${plan.title} Plan`,
              description: plan.desc,
            },
            unit_amount: planConfig.amount,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get('origin')}?success=true`,
      cancel_url: `${req.headers.get('origin')}?canceled=true`,
      metadata: {
        plan_name: plan.title,
        plan_price: plan.price,
      },
    });

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});