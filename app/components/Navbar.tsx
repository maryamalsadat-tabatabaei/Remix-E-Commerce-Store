import type { V2_MetaFunction } from "@remix-run/node";
import { Link, NavLink } from "@remix-run/react";
import { useCartStore } from "~/lib/useCart";
import { CgHeart } from "react-icons/cg";
export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Navbar() {
  const [toggleCart, totalItems] = useCartStore((state) => [
    state.toggleShowCart,
    state.totalItems,
  ]);
  return (
    <header className="relative z-10">
      <div className="bg-white">
        <div className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-16 flex items-center justify-between">
              <div className="flex items-center">
                <Link to="/">
                  <h1 className="text-2xl font-semibold">
                    Book<span className="text-indigo-600">Connect</span>
                  </h1>
                </Link>
              </div>
              <div className="flex gap-8 justify-center items-center ">
                <NavLink to={"/login"} className="text-xl font-semibold">
                  {"Login"}
                </NavLink>
                <NavLink to="wishlist" className="">
                  <CgHeart size={30} className="text-gray-900" />{" "}
                  {/* <span className="absolute -right-0  top-1 text-sm font-medium text-white bg-red-500 w-5 h-5  rounded-full">
                    {totalItems}
                  </span> */}
                </NavLink>
                <button
                  onClick={toggleCart}
                  className="group -m-2 p-2 flex items-center transition-transform transform duration-400 border-none bg-transparent hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="flex-shrink-0 h-8 w-8 text-gray-400 group-hover:text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <span className="absolute -right-0  top-1 text-sm font-medium text-white bg-red-500 w-5 h-5   rounded-full">
                    {totalItems}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
