import { useCartStore } from "~/lib/useCart";
import { Form } from "@remix-run/react";

const CheckoutForm = () => {
  const data = useCartStore((state) => state.cart);
  const total = useCartStore((state) => state.totalPrice);

  return (
    <>
      {data.length < 1 ? null : (
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>$ {total}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and tax will be calcualted at checkout
          </p>

          <div className="mt-6">
            <Form method="POST" action="/buy">
              <input
                type="hidden"
                name="cartData"
                value={JSON.stringify(data)}
              />
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medum text-white"
              >
                Checkout
              </button>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};
export default CheckoutForm;
