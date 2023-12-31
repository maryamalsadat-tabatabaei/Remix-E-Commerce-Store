import { json, type LoaderArgs, type V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Tab } from "@headlessui/react";
import { client } from "~/lib/sanity";
import { Product, ProductId } from "~/lib/interface";
import { urlFor } from "~/lib/sanityImageUrl";
import ProductItem from "~/components/ProductItem";
import ProductDetail from "~/components/ProductDetail";
import ProductSlider from "~/components/ProductSlider";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

interface iAppProps {
  product: ProductId;
  products: Product[];
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export async function loader({ params }: LoaderArgs) {
  const query = `*[_type == 'product' &&  slug.current == '${params.slug}'][0]`;
  const productsQuery = `*[_type == 'product']{
    price,
    slug,
    name,
    author,
    pages,
    "imageUrl":image[0].asset->url
}`;

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);
  return json({ product, products });
}

export default function ProductDetailPage() {
  const { product, products } = useLoaderData<typeof loader>() as iAppProps;

  return (
    <main className="my-5">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-10 lg:items-start">
        <Tab.Group as="div" className="flex flex-col-reverse">
          <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
            <Tab.List className="grid grid-cols-4 gap-6">
              {product.image.map((image) => (
                <Tab
                  key={image._key}
                  className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                >
                  {({ selected }) => (
                    <>
                      <span className="absolute inset-0 rounded-md overflow-hidden">
                        <img
                          src={urlFor(image).url()}
                          alt="Product Image"
                          className="w-full h-full object-center object-cover"
                        />
                      </span>
                      <span
                        className={classNames(
                          selected ? "ring-indigo-500" : "ring-transparent",
                          "absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
                        )}
                      ></span>
                    </>
                  )}
                </Tab>
              ))}
            </Tab.List>
          </div>

          <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
            {product.image.map((image) => (
              <Tab.Panel key={image._key}>
                <img
                  src={urlFor(image).url()}
                  alt="Product Image"
                  className="w-full h-full object-center object-cover sm:rounded-lg"
                />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
        <ProductDetail product={product} />
      </div>
      <div className="mt-32">
        <h2 className="text-center m-14 text-[#324d67] text-2xl">
          You may also like
        </h2>
        <div className="relative w-full overflow-x-hidden h-[500px]">
          <div className="animate-transfer-slide-right hover:animate-none flex justify-center gap-4 mt-5 absolute whitespace-nowrap will-change-transform w-[180%]">
            {products.map((item) => (
              <ProductItem key={item.slug.current} product={item} />
            ))}
          </div>
          {/* <ProductSlider /> */}
        </div>
      </div>
    </main>
  );
}
