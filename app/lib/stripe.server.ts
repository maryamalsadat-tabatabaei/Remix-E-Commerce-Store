import Stripe from "stripe";
import { ProductId } from "./interface";
import { urlFor } from "./sanityImageUrl";

export function getDomainUrl(request: Request) {
  const host =
    request.headers.get("X-Forward-Host") ?? request.headers.get("host");

  if (!host) {
    throw new Error("Could not find the url");
  }

  const protocol = host.includes("localhost") ? "http" : "https";

  return `${protocol}://${host}`;
}

export const getStripeSession = async (
  items: string,
  domainUrl: string
): Promise<string> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-08-16",
    typescript: true,
  });

  const dataObj = JSON.parse(items);

  const lineItems = dataObj.map((product: ProductId) => {
    const img = product.image[0].asset._ref;

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: [urlFor(img).url()],
        },
        unit_amount: product.price * 100,
      },
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
        maximum: 5,
      },
      quantity: product.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    submit_type: "pay",
    billing_address_collection: "auto",
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
    shipping_options: [
      {
        shipping_rate: "shr_1Nq4J2Eg12ZgjhENyGbZdIbN",
      },
      { shipping_rate: "shr_1Nq4E8Eg12ZgjhENJ6mdO400" },
    ],
    line_items: lineItems,
    success_url: `${domainUrl}/payment/success`,
    cancel_url: `${domainUrl}/payment/cancelled`,
  });

  return session.url as string;
};
