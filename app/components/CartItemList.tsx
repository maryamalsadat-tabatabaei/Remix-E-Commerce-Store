import { useCartStore } from "~/lib/useCart";
import CartItem from "./CartItem";

const CartItemList = () => {
  const data = useCartStore((state) => state.cart);
  const toggleShowCart = useCartStore((state) => state.toggleShowCart);

  return (
    <>
      {data.length < 1 ? (
        <div className="flex w-full h-full flex-col items-center justify-center">
          <h1 className="text-5xl text-center">
            Please add items to your cart!
          </h1>
          <button
            onClick={toggleShowCart}
            className="bg-indigo-600 px-4 py-2 rounded-lg text-white mt-6 text-xl"
          >
            Add Books
          </button>
        </div>
      ) : (
        <div className="mt-8">
          <ul className="-my-6 divide-y divide-gray-200">
            {data.map((product, idx) => (
              <CartItem key={idx} product={product} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
export default CartItemList;
