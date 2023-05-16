/* eslint-disable @next/next/no-img-element */
"use client";
import Card from "@/components/Card";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { backend_url } from "@/server";
import { motion, AnimatePresence } from "framer-motion";
import { HiPlus, HiOutlineMinus } from "react-icons/hi";
import { useAppDispatch } from "@/redux/hook";
import { addTocart } from "@/redux/actions/cart";
import { toast } from "react-toastify";
import Link from "next/link";

type Props = {
  params: {
    id: any;
  };
};

function ProductDetailPage({ params: { id } }: Props) {
  const { allProducts } = useSelector((state: any) => state.products);
  const { cart } = useSelector((state: any) => state.cart);
  const [showMode, setShowMode] = useState(false);
  const [showIngredient, setShowIngredient] = useState(false);
  const [data, setData] = useState<any>();
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(1);
  const incrementCount = () => {
    setCount(count + 1);
  };
  console.log(data);
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const product = allProducts && allProducts.find((i: any) => i._id === id);
  const addToCartHandler = (id: any) => {
    const isItemExists = cart && cart.find((i: any) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      const product = allProducts && allProducts.find((i: any) => i._id === id);
      const cartData = { ...product, qty: count };
      dispatch(addTocart(cartData));
    }
  };
  useEffect(() => {
    setData(product);
  });
  return (
    <div py-4>
      {data && data !== undefined && (
        <div className="h-screen space-y-6 p-4">
          <div className="grid grid-cols-2">
            <img
              src={`${backend_url}${data.image}`}
              alt=""
              className="mx-auto h-[25rem] w-[80%] object-cover"
            />

            <div className="mx-auto flex w-[80%] flex-col justify-between">
              <div className="flex basis-1/3 flex-col gap-1">
                <h1 className="text-lg font-bold md:text-xl lg:text-2xl">
                  {data.name}
                </h1>
                <h3 className="text-sm font-semibold">{data.shop.shopName}</h3>
                <p>${data.price}</p>
              </div>
              <div className="basis-1/3">
                <h1 className="flex flex-col gap-2 text-lg font-bold md:text-xl lg:text-2xl"> Category <span className="font-normal text-base"><Link href={`/category/${data.category}`}>
                    {data.category}
                  </Link></span>
                  
                </h1>
              </div>

              <div className="flex basis-1/3 flex-col justify-between bg-[#F0E4DB] p-3">
                <div className="">
                  <h1 className="text-lg font-bold md:text-xl lg:text-2xl">
                    DESCRIPTION
                  </h1>
                  <p>{data.description}</p>
                </div>
                <div className="flex select-none flex-col gap-4">
                  <div className="mx-auto flex  w-fit items-center gap-2 border border-[#BBA999] bg-white p-3 py-1 font-medium text-[#BBA999]">
                    <HiOutlineMinus
                      className="cursor-pointer"
                      onClick={decrementCount}
                    />
                    {count}
                    <HiPlus
                      onClick={incrementCount}
                      className="cursor-pointer"
                    />
                  </div>
                  <button
                    onClick={() => addToCartHandler(data._id)}
                    className="flex items-center justify-center bg-[#BBA999] p-4 py-2 text-sm "
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="mx-auto w-[80%] ">
              <div className="flex items-center justify-between bg-[#F0E4DB] px-3 py-2 text-sm font-medium text-[#BBA999]">
                MODE OF APPLICATION{" "}
                {showMode ? (
                  <HiOutlineMinus
                    className="cursor-pointer"
                    onClick={() => setShowMode(false)}
                  />
                ) : (
                  <HiPlus
                    onClick={() => setShowMode(true)}
                    className="cursor-pointer"
                  />
                )}
              </div>
              <AnimatePresence>
                {showMode ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: 1, scaleY: 1, opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="min-h-[4rem] w-full bg-[#F0E4DB80] px-3 py-2 "
                  >
                    {data.applicationMode}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
            <div className="mx-auto w-[80%] ">
              <div className="flex items-center justify-between bg-[#F0E4DB] px-3 py-2 text-sm font-medium text-[#BBA999]">
                INGREDIENTS{" "}
                {showIngredient ? (
                  <HiOutlineMinus
                    className="cursor-pointer"
                    onClick={() => setShowIngredient(false)}
                  />
                ) : (
                  <HiPlus
                    onClick={() => setShowIngredient(true)}
                    className="cursor-pointer"
                  />
                )}
              </div>
              <AnimatePresence>
                {showIngredient ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: 1, scaleY: 1, opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="min-h-[4rem] w-full bg-[#F0E4DB80] px-3 py-2 "
                  >
                    {data.ingredients}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;
