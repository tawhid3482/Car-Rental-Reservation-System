import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil",
});

export const createStripePaymentIntent = async (amount: number) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // convert to cents
    currency: "usd",
    payment_method_types: ["card"],
  });
  return paymentIntent;
};
