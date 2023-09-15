import { ProductId } from "~/lib/interface";
import { useCartStore } from "~/lib/useCart";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

interface iAppProps {
  product: ProductId;
}

export default function ProductDetail({ product }: iAppProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const qty = useCartStore((state) => state.qty);
  const incQty = useCartStore((state) => state.incrementQuantity);
  const decQty = useCartStore((state) => state.decrementQuantity);
  const toggleShowCart = useCartStore((state) => state.toggleShowCart);
  const handleBuyNow = () => {
    addToCart(product, qty);
    toggleShowCart();
  };
  return (
    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
        {product.name}
      </h1>
      <div className="text-red-600 mt-2 flex flex-row gap-1 items-center">
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiOutlineStar />
        <p className="text-[#324d67]">(20)</p>
      </div>

      <div className="mt-3">
        <p className="text-xl text-gray-700">{product.author}</p>
        <p className="text-xl text-gray-700">$ {product.price}</p>
        <p className="text-xl text-gray-700">{product.pages} Pages</p>
      </div>

      <div className="mt-6">
        <h4 className="font-bold">Details: </h4>
        <div
          className="text-base text-gray-700"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></div>
      </div>
      <div className="flex mt-3 items-center gap-5">
        <h3 className="font-bold">Quantity:</h3>
        <p className="flex flex-row p-1.5 border-gray-700 items-center">
          <span
            className="cursor-pointer text-base p-3 border border-r-gray-800 text-black"
            onClick={decQty}
          >
            <AiOutlineMinus />
          </span>
          <span className="cursor-pointer py-1.5 px-3.5 text-xl border border-r-gray-800">
            {qty}
          </span>
          <span
            className="cursor-pointer text-base p-3 border text-black"
            onClick={incQty}
          >
            <AiOutlinePlus />
          </span>
        </p>
      </div>

      <div className="mt-6">
        <div className="mt-10 flex sm:flex-col-1 gap-8">
          <button
            onClick={() => addToCart(product, qty)}
            className="hover:scale-110 capitalize w-40 py-2 px-5 mt-10 scale-100 mb-4 lg:mb-0 transform transition-transform text-red-600 border border-red-600 rounded-md shadow-md text-center text-base font-medium"
          >
            add to cart
          </button>
          <button
            type="button"
            className="hover:scale-110 capitalize w-40 py-2 px-5 mt-10 scale-100 mb-4 lg:mb-0 transform transition-transform text-white border bg-red-600 rounded-md shadow-md text-center text-base font-medium"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
