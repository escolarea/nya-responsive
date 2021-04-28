import { Stripe, loadStripe } from '@stripe/stripe-js'


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
const getStripe = () => {
  
}

export default getStripe;