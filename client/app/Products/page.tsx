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

};
type category = "All" | "Face" | "Body" | "Hair" | "Makeup";
function AllCategoryPage({ }: Props) {
  const { allProducts } = useSelector((state: any) => state.products);
  const [show, setShow] = useState(false);
  const { cart } = useSelector((state: any) => state.cart);
  const [isSort, setIsSort] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const dispatch = useAppDispatch();
  const [type, setType] = useState<category>("All");
  const listCategory = ["All", "Face", "Body", "Hair", "Makeup"];
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
            <div className="flex h-fit w-full items-center justify-center gap-2">
              <div className="flex h-full w-[30%] flex-col items-center justify-between text-sm text-[#55564E] lg:w-[40%]">
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
              <div className="flex h-[50px] w-[5%] flex-col justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-fit w-full lg:h-1/2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15"
                  />
                </svg>
              </div>

              <div className="flex h-full w-[30%] flex-col items-center justify-between text-sm text-[#55564E] lg:w-[40%]">
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
            {type} Products
          </h1>

          {allProducts !== undefined && allProducts.length === 0 && (
            <div>Do not have any product</div>
          )}
          {isSort ? (
            <>
              <div className="mx-auto my-12 flex items-center justify-evenly">
                {listCategory.map((list: any) => (
                  <div
                    onClick={() => setType(list)}
                    className="group flex cursor-pointer flex-col items-center justify-center md:w-fit"
                    key={list}
                  >
                    {list}
                    <div
                      className={`h-[2px]  bg-black transition-all duration-300 ${
                        type === list ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </div>
                ))}
              </div>
              <div className="mx-auto grid items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
                {allProducts !== undefined &&
                  allProducts
                    .filter((product: any) => {
                      if (type === "All") {
                        return product.price >= min && product.price <= max;
                      } else {
                        return (
                          product.category === type &&
                          product.price >= min &&
                          product.price <= max
                        );
                      }
                    })
                    .map((product: any) => (
                      <div
                        key={product._id}
                        className="mx-auto items-center flex h-fit w-full flex-col gap-1 text-lg font-semibold text-[#55564E]"
                      >
                        <div className="relative h-[200px] w-[200px]">
                          <img
                            src={`${backend_url}${product.image}`}
                            alt={product.name}
                            className="h-full w-full object-fill"
                          />
                          <div className="product absolute inset-0 z-20 flex h-full w-full flex-col opacity-0 transition-all duration-300 hover:opacity-100 ">
                            <div className="flex basis-4/5 items-center justify-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                onClick={() => addToCartHandler(product._id)}
                                className="h-6 w-6 cursor-pointer"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6 cursor-pointer"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                />
                              </svg>
                            </div>
                            <Link
                              href={`product/${product._id}`}
                              className="flex basis-1/5 items-center justify-center bg-[#BBA99975] text-center text-sm text-[#2C2C2C]"
                            >
                              View the product
                            </Link>
                          </div>
                        </div>

                        <p className="text-center text-base md:text-sm line-clamp-1 w-full"> {product.name}</p>

                        <p>${product.price}</p>
                      </div>
                    ))}
              </div>
            </>
          ) : (
            <>
              <div className="mx-auto my-12 flex items-center justify-evenly gap-3">
                {listCategory.map((list: any) => (
                  <div
                    onClick={() => setType(list)}
                    className="group flex cursor-pointer flex-col items-center justify-center md:w-fit"
                    key={list}
                  >
                    {list}
                    <div
                      className={`h-[2px]  bg-black transition-all duration-300 ${
                        type === list ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </div>
                ))}
              </div>
              <div className="mx-auto grid items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
                {allProducts !== undefined &&
                  allProducts
                    .filter(
                      (product: any) =>
                        type === "All" || product.category === type
                    )
                    .map((product: any) => (
                      <div
                        key={product._id}
                        className="mx-auto flex h-fit w-full items-center flex-col gap-1 text-lg font-semibold text-[#55564E]"
                      >
                        <div className="relative h-[200px] w-[200px]">
                          <img
                            src={`${backend_url}${product.image}`}
                            alt={product.name}
                            className="h-full w-full object-fill mx-auto"
                          />
                          <div className="product absolute inset-0 z-20 flex h-full w-full flex-col opacity-0 transition-all duration-300 hover:opacity-100 ">
                            <div className="flex basis-4/5 items-center justify-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                onClick={() => addToCartHandler(product._id)}
                                className="h-6 w-6 cursor-pointer"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6 cursor-pointer"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                />
                              </svg>
                            </div>
                            <Link
                              href={`product/${product._id}`}
                              className="flex basis-1/5 items-center justify-center bg-[#BBA99975] text-center text-sm text-[#2C2C2C]"
                            >
                              View the product
                            </Link>
                          </div>
                        </div>
                        <p className="text-center text-base md:text-sm line-clamp-1 w-full"> {product.name}</p>

                        <p>${product.price}</p>
                      </div>
                    ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AllCategoryPage;
