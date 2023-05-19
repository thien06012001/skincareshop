/* eslint-disable @next/next/no-img-element */
"use client";
// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: 
//   Chau Chan Bang(s3975015)
//   Chau Chan Thien(s3975010)
//   Ophelie Manon Tran(s3968993)
//   Nguyen Dang Thanh Trung(s3978674)
//   Han Yeeun(s3912055)
// Acknowledgement: Acknowledge the resources that you use here.;
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
import { Montserrat,Quicksand } from 'next/font/google';
type Props = {
  params: {
    id: any;
  };
};
const quicksand = Quicksand({subsets:['latin']})
function ProductDetailPage({ params: { id } }: Props) {
  const { allProducts } = useSelector((state: any) => state.products);
  const { cart } = useSelector((state: any) => state.cart);
  const [showMode, setShowMode] = useState(false);
  const [showIngredient, setShowIngredient] = useState(false);
  const [data, setData] = useState<any>();
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(1);
  // const montserrat =  Montserrat({ subsets: ['latin'] });
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
    <div className='py-4 font-mono'>
      {data && data !== undefined && (
        <>
          <div className="flex items-center gap-2 p-5 text-sm">
            <Link href="/" className="flex items-center gap-1 text-base">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>{" "}
              Home
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>

            <span className="text-base font-normal">
              <Link href={`/category/${data.category}`}>{data.category}</Link>
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                clipRule="evenodd"
              />
            </svg>
            <span>{data.name}</span>
          </div>
          <div className="min-h-screen space-y-6 p-4 flex flex-col">
            <div className="lg:grid lg:grid-cols-2">
              <img
                src={`${backend_url}${data.image}`}
                alt={data.name}
                className="mx-auto h-[10rem] w-[80%] object-fill  sm:h-[15rem] md:h-[25rem]"
              />

              <div className="mx-auto flex w-[80%] flex-col justify-between">
                <div className="flex basis-1/3 flex-col gap-1">
                  <h1 className="text-lg font-bold md:text-xl lg:text-2xl break-words overflow-auto">
                    {data.name}
                  </h1>
                  <h3 className="text-sm font-semibold">
                    {data.shop.shopName}
                  </h3>
                  <p>${data.price}</p>
                </div>


                <div className="flex flex-col justify-between bg-[#F0E4DB] p-3 h-fit flex-1">
                  <div className="">
                    <h1 className="text-lg font-bold md:text-xl lg:text-2xl">
                      DESCRIPTION
                    </h1>
                    <span className={`${quicksand.className} w-full text-sm break-words overflow-auto`}>{data.description}</span>
                  </div>
                  <div className="hidden select-none flex-col gap-4 lg:flex">
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
                      className="flex text-[#FAF7F6] items-center justify-center bg-[#BBA999] p-4 py-2 text-sm "
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:grid lg:grid-cols-2">
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
                      className={`${quicksand.className} min-h-[8rem] overflow-auto  break-words h-auto w-full bg-[#F0E4DB80] px-3 py-2 `}
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
                      className={`min-h-[8rem] overflow-auto w-full break-words h-auto bg-[#F0E4DB80] px-3 py-2 ${quicksand.className} `}
                    >
                      {data.ingredients}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
              <div className="mx-auto flex w-[80%] select-none flex-col gap-4 pt-3 lg:hidden">
                <div className="mx-auto flex  w-fit items-center gap-2 border border-[#BBA999] bg-white p-3 py-1 font-medium text-[#BBA999]">
                  <HiOutlineMinus
                    className="cursor-pointer"
                    onClick={decrementCount}
                  />
                  {count}
                  <HiPlus onClick={incrementCount} className="cursor-pointer" />
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
        </>
      )}
    </div>
  );
}

export default ProductDetailPage;
