import { Link } from "@remix-run/react";
import { Product } from "~/lib/interface";

type iAppProps = {
  product: Product;
};

const ProductItem = ({ product }: iAppProps) => {
  return (
    <Link to={`/product/${product.slug.current}`} className="group relative">
      <div className="hover:scale-110 cursor-pointer transform scale-100 transition-transform duration-500 ease-in text-blue-700">
        <div className="w-full h-56 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
          <img
            src={product.imageUrl}
            width={250}
            height={250}
            className="rounded-lg bg-gray-300 transform scale-100 transition-transform duration-500 ease-in"
          />
        </div>
        <h3 className="mt-4 text-sm font-extrabold text-black">
          {product.name}
        </h3>
        <p className="font-medium mt-2 text-black">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
