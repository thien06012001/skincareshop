/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { types } from "@/static/data";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { backend_url } from "@/server";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/hook";
import { addTocart } from "@/redux/actions/cart";
import { AiFillCaretDown } from "react-icons/ai";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
type Props = {
  params: {
    category: string;
  };
};

function CategoryPage({ params: { category } }: Props) {
  const { allProducts } = useSelector((state: any) => state.products);
  const [show, setShow] = useState(false);
  const { cart } = useSelector((state: any) => state.cart);
  const [isSort, setIsSort] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const dispatch = useAppDispatch();
  console.log(parseInt("3"));
  const sort = () => {
    if (min < 0) {
      toast.error("Min value can not be smaller than zero!");
      return;
    }
    if (min >= max) {
      toast.error("Min value must be smaller than Max value!");
      return;
    }
    setIsSort(true);
  };
  console.log(allProducts);
  const addToCartHandler = (id: any) => {
    const isItemExists = cart && cart.find((i: any) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      const product = allProducts && allProducts.find((i: any) => i._id === id);
      const cartData = { ...product, qty: 1 };
      dispatch(addTocart(cartData));
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col justify-center gap-4 py-5 lg:flex-row">
        <div className="mx-auto flex basis-1/6 flex-col items-center">
          <div className="flex items-center gap-2 p-3 text-xl font-bold text-[#55564E]">
            <p>Price Range</p>{" "}
          </div>

          <div className="mt-6 flex flex-col space-y-3">
            <div className="flex w-full h-fit items-center justify-center gap-2">
              <div className="flex h-full w-[30%] lg:w-[40%] flex-col items-center justify-between text-sm text-[#55564E]">
                <label className="w-fit text-center" htmlFor="min">
                  Min
                </label>
                <input
                  className="w-full rounded border border-[#55564E] bg-transparent pl-1 outline-none"
                  type="number"
                  value={min}
                  id="min"
                  onChange={(e) => setMin(parseInt(e.target.value))}
                />
              </div>
              <div className="h-[50px] flex flex-col w-[5%] justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-fit lg:h-1/2 w-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15"
                  />
                </svg>
              </div>

              <div className="flex h-full w-[30%] lg:w-[40%] flex-col items-center justify-between text-sm text-[#55564E]">
                <label className="w-fit" htmlFor="max">
                  Max
                </label>
                <input
                  className="w-full rounded border border-[#55564E] bg-transparent pl-1 outline-none"
                  type="number"
                  placeholder="Max Value"
                  value={max}
                  id="max"
                  onChange={(e) => setMax(parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="mb-0 flex items-center justify-around gap-0 lg:mb-3 lg:flex-col lg:justify-center lg:gap-5">
              <button
                onClick={sort}
                className="flex w-fit items-center justify-center rounded-md bg-[#55564E] px-4 py-1 text-sm font-light text-[#FAF7F6] lg:w-[70%]"
              >
                Apply
              </button>
              <button
                onClick={() => setIsSort(false)}
                className="flex w-fit items-center justify-center rounded-md bg-[#55564E] px-4 py-1 text-sm font-light text-[#FAF7F6] lg:w-[70%]"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        <div className="basis-5/6 ">
          <h1 className="my-3 flex items-center justify-center text-xl font-bold">
            {category} Products
          </h1>

          {allProducts !== undefined &&
            allProducts.filter((product: any) => product.category === category)
              .length === 0 && <div>Do not have any product</div>}
          {isSort ? (
            <div className="mx-auto grid items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
              {allProducts !== undefined &&
                allProducts
                  .filter(
                    (product: any) =>
                      product.category === category &&
                      product.price >= min &&
                      product.price <= max
                  )
                  .map((product: any) => (
                    <div
                      key={product._id}
                      className="mx-auto flex h-fit w-fit flex-col gap-1 text-lg font-semibold text-[#55564E]"
                    >
                      <Link
                        className="h-[200px] w-[200px]"
                        href={`/product/${product._id}`}
                      >
                        <img
                          src={`${backend_url}${product.image}`}
                          alt={product.name}
                          className="h-full w-full object-fill"
                        />
                      </Link>

                      <p className=" "> {product.name}</p>

                      <p>${product.price}</p>
                    </div>
                  ))}
            </div>
          ) : (
            <div className="mx-auto grid items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
              {allProducts !== undefined &&
                allProducts
                  .filter((product: any) => product.category === category)
                  .map((product: any) => (
                    <div
                      key={product._id}
                      className="mx-auto flex h-fit w-fit flex-col gap-1 text-lg font-semibold text-[#55564E]"
                    >
                      <Link
                        className="h-[200px] w-[200px]"
                        href={`/product/${product._id}`}
                      >
                        <img
                          src={`${backend_url}${product.image}`}
                          alt={product.name}
                          className="h-full w-full "
                        />
                      </Link>
                      <p className=" "> {product.name}</p>

                      <p>${product.price}</p>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
