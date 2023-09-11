import { Link } from "@remix-run/react";
import { urlFor } from "~/lib/sanityImageUrl";
import { useCartStore } from "~/lib/useCart";
import { ProductId } from "~/lib/interface";

interface iAppProps {
  product: ProductId;
}

const CartItemList = ({ product }: iAppProps) => {
  const removeItem = useCartStore((state) => state.removeFromCart);

  return (
    <li className="flex py-6">
      <div className="h-24 w-24 object-cover object-center">
        <img
          src={urlFor(product.image[0]).url()}
          alt="Product img"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-800">
            <h3>
              <Link to={`/product/${product.slug.current}`}>
                {product.name}
              </Link>
            </h3>
            <p className="ml-4">$ {product.price}</p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Quantity: {product.quantity}</p>
          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => removeItem(product)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
export default CartItemList;
