import { json, type LoaderArgs, type V2_MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { client } from "~/lib/sanity";
import { Product } from "~/lib/interface";
export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

interface iAppProps {
  products: Product[];
}
export async function loader({}: LoaderArgs) {
  const query = `*[_type == 'product']{
    price,
    slug,
    name,
    author,
    pages,
    "imageUrl":image[0].asset->url
}`;
  const products = await client.fetch(query);
  return json({ products });
}

export default function IndexPage() {
  const { products } = useLoaderData<typeof loader>() as iAppProps;
  return (
    <>
      <section className="flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row mt-12">
        <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24">
          <p className="mb-4 font-semibold text-indigo-600 md:mb-6 md:text-lg xl:text-xl">
            Welcome to my shop!
          </p>
          <h1 className="text-black mb-8 text-4xl font-bold sm:text-5xl md:mb-12 md:text-6xl">
            Focus on book lovers
          </h1>
          <p className="mb-8 leading-relaxed text-gray-500 md:mb-12 lg:w-4/5 xl:text-lg">
            Welcome to BookConnect, a vast and diverse collection of books
            spanning various genres and topics, BookConnect provides a seamless
            platform for book lovers to discover, purchase, and connect over
            their shared passion for literature.
          </p>
          <div>
            <Link
              to="#products"
              className="rounded-lg bg-indigo-600 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 md:text-base"
            >
              Shop Now
            </Link>
          </div>
        </div>

        <div className="h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:h-auto xl:w-5/12">
          <img
            src="https://images.pexels.com/photos/4855552/pexels-photo-4855552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Prouct Image"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </section>

      <section id="products">
        <div className="py-24 sm:py-32 lg:pt-32">
          <div className="mt-6 grid grid-col-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
            {products.map((product) => (
              <div key={product.slug.current}>
                <Link
                  className="group relative"
                  to={`/product/${product.slug.current}`}
                >
                  <div className="w-full h-56 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
                    <img
                      src={product.imageUrl}
                      alt="Image of Product"
                      className="w-full h-full object-center object-contain"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    $ {product.price}
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {product.author}
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {product.pages} pages
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
