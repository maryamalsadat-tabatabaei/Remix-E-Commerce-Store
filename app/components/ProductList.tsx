import { Product } from "~/lib/interface";
import ProductItem from "./ProductItem";

type iAppProps = {
  products: Product[];
};
const ProductList = ({ products }: iAppProps) => {
  return (
    <section id="products">
      <div className="py-24 sm:py-32 lg:pt-32">
        <div className="mt-6 grid grid-col-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {products.map((product) => (
            <ProductItem key={product.slug.current} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default ProductList;
