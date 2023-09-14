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
        <p className="text-xl text-gray-900">{product.author}</p>
        <p className="text-xl text-gray-900">$ {product.price}</p>
        <p className="text-xl text-gray-900">{product.pages} pages</p>
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
        <p className="flex flex-row p-1 border-gray-500">
          <span
            className="text-base py-1 px-2 border-r-gray-500 text-black"
            onClick={decQty}
          >
            <AiOutlineMinus />
          </span>
          <span className="py-2 px-3 text-xl border-r-gray-500">{qty}</span>
          <span className="text-base py-2 px-3 text-black" onClick={incQty}>
            <AiOutlinePlus />
          </span>
        </p>
      </div>

      <div className="mt-6">
        <div className="mt-10 flex sm:flex-col-1 gap-8">
          <button
            onClick={() => addToCart(product, qty)}
            className=" hover:scale-110 capitalize p-2 scale-100 mb-4 lg:mb-0 w-40 transform transition-transform text-red-600 border border-red-600 rounded-md text-center text-base font-medium hover:bg-red-600 hover:text-white"
          >
            add to cart
          </button>
          <button
            type="button"
            className="hover:scale-110 w-40 p-2 px-4 bg-red-600 text-white border-none mt-10 text-xl font-semibold cursor-pointer transform transition-transform scale-100"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
