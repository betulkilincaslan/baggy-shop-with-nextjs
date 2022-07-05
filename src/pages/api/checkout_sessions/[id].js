import nc from "next-connect";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handler = nc();

handler.all(async (req, res) => {
  const id = req.query.id;

  try {
    if (!id.startsWith("cs_")) {
      throw Error("Incorrect CheckoutSession ID!");
    }
    const checkout_session = await stripe.checkout.sessions.retrieve(id);
    res.status(200).json(checkout_session);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
});

export default handler;
