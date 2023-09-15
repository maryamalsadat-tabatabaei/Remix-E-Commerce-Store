import { Link } from "@remix-run/react";
import { urlFor } from "~/lib/sanityImageUrl";
import { useCartStore } from "~/lib/useCart";
import { ProductId } from "~/lib/interface";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface iAppProps {
  product: ProductId;
}

const CartItemList = ({ product }: iAppProps) => {
  const removeItem = useCartStore((state) => state.removeFromCart);
  const changeCartItemQuanitity = useCartStore((state) => state.changeQuantity);

  return (
    <li className="flex py-6">
      <div className="h-24 w-24 object-cover object-center">
        <img
          src={urlFor(product.image[0]).url()}
          alt="Product img"
          className="h-full w-full object-cover object-center rounded-sm"
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
        <div className="flex mt-3 items-center justify-between">
          <h3 className="font-medium text-gray-600">Quantity:</h3>
          <div>
            <p className="flex flex-row p-1.5 border-gray-700 items-center">
              <span
                className="cursor-pointer text-base p-1 border border-r-gray-800 text-black"
                onClick={() => changeCartItemQuanitity(product, "dec")}
              >
                <AiOutlineMinus />
              </span>
              <span className="cursor-pointer px-1 text-base border border-r-gray-800">
                {product.quantity}
              </span>
              <span
                className="cursor-pointer text-base p-1 border text-black"
                onClick={() => changeCartItemQuanitity(product, "inc")}
              >
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <button
            type="button"
            className="font-medium text-indigo-600 hover:text-indigo-500"
            onClick={() => removeItem(product)}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
};
export default CartItemList;
