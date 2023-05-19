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
import React from "react";
import { useSelector } from "react-redux";
import { backend_url } from "@/server";
import Link from "next/link";

type Props = {};

function Product({}: Props) {
  const { allProducts } = useSelector((state: any) => state.products);
  const { user } = useSelector((state: any) => state.user);
  const shopProduct = allProducts.filter(
    (product: any) => product.shopId === user._id
  );
  const list = [" Image", " Name", "Price", "Category", "Review"];
  return (
    <main className="min-h-screen">
      <ul className="mb-2 grid grid-cols-5 items-center justify-between">
        {list.map((list: any) => (
          <li key={list} className="mx-auto font-bold text-[#2C2C2CBF] text-xs text-center sm:text-sm md:text-base lg:text-lg">
            {list}
          </li>
        ))}
      </ul>
      <hr className="my-3 w-full border border-[#BBA999]" />
      {shopProduct !== null ? (
        shopProduct.map((product: any) => (
          <>
            <div
              className="mb-2 grid grid-cols-5 items-center justify-between"
              key={product._id}
            >
              <div className="mx-auto ">
                <img
                  src={`${backend_url}${product.image}`}
                  alt={product.name}
                  className="h-20 w-20"
                />
              </div>
              <div className="mx-auto">{product.name}</div>
              <div className="mx-auto">${product.price}</div>
              <div className="mx-auto">{product.category}</div>
              <Link
                href={`/product/${product._id}`}
                className="flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
              </Link>
            </div>
            <hr className="my-3 w-full border border-[#BBA999]" />
          </>
        ))
      ) : (
        <div>You do not have any product.</div>
      )}
    </main>
  );
}

export default Product;
