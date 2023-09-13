import Stripe from "stripe";
import { ProductId } from "./interface";

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
    return {
      price: product.stripeProductId,
      quantity: product.quantity,
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
        maximum: 10,
      },
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
    line_items: lineItems,
    success_url: `${domainUrl}/payment/success`,
    cancel_url: `${domainUrl}/payment/cancelled`,
    // shipping_options: [{ shipping_rate: "shr_1M9N6vSEi48qcQQWQVHnuumn" }],
    // line_items: req.body.items.map((item) => {
    //   const img = item.image;
    //   return {
    //     price_data: {
    //       currency: "usd",
    //       product_data: {
    //         name: item.name,
    //         images: [img],
    //       },
    //       unit_amount: item.price * 100,
    //     },
    //     adjustable_quantity: {
    //       enabled: true,
    //       minimum: 1,
    //       maximum: 5,
    //     },
    //     quantity: item.quantity,
    //   };
    // }),
  });

  return session.url as string;
};
