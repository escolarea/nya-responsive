import { loadStripe } from '@stripe/stripe-js/pure';

const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);