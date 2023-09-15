import { Link } from "@remix-run/react";
import { Product } from "~/lib/interface";
import { useCartStore } from "~/lib/useCart";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiTwotoneHeart,
  AiOutlineHeart,
} from "react-icons/ai";

type iAppProps = {
  product: Product;
};

const ProductItem = ({ product }: iAppProps) => {
  const wishListHandler = useCartStore((state) => state.wishListHandler);
  const changeCartItemQuanitity = useCartStore((state) => state.changeQuantity);
  const qty = useCartStore((state) => state.qty);
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="hover:scale-110 cursor-pointer transform scale-100 transition-transform duration-500 ease-in text-black">
      <Link to={`/product/${product.slug.current}`} className="group relative">
        <div className="w-full h-56 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
          <img
            src={product.imageUrl}
            width={250}
            height={250}
            className="rounded-lg bg-gray-300 transform scale-100 transition-transform duration-500 ease-in"
          />
        </div>
        <div className="flex justify-between items-center p-1 my-1 text-center">
          <h3 className=" text-sm font-bold text-black">{product.name}</h3>
          <p className="font-medium text-gray-600">${product.price}</p>
        </div>
      </Link>
      <p className="flex flex-row p-1.5 border-gray-700 items-center gap-2 justify-center text-center">
        <span
          className="cursor-pointer text-base p-1 border rounded-full  text-black"
          onClick={() => changeCartItemQuanitity(product, "dec")}
        >
          <AiOutlineMinus />
        </span>
        <span className="cursor-pointer px-3 text-base border ">
          {/* {product.quantity} */}1
        </span>
        <span
          className="cursor-pointer text-base p-1 border text-black rounded-full"
          onClick={() => changeCartItemQuanitity(product, "inc")}
        >
          <AiOutlinePlus />
        </span>
      </p>
      <div className="flex relative mt-1">
        <button
          // disabled={cartLoading}
          onClick={() => addToCart(product, qty)}
          className="capitalize rounded-sm font-semibold  flex-grow justify-stretch text-base text-red-800  border border-red-800"
        >
          {/* {!isProductInCart(product) ? "Add To Cart" : "Go to Cart"} */}
          Add to Cart
        </button>
        <button onClick={() => wishListHandler(product)}>
          {/* {!isProductInWishlist(product) ? ( */}
          <AiOutlineHeart
            size={30}
            className="text-red-700 shadow-md ml-3 rounded-md p-1"
          />
          {/* ) : (
              <AiTwotoneHeart size={30} />
            )} */}
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
