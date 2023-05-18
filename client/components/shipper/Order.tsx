/* eslint-disable @next/next/no-img-element */
"use client";
import { useAppDispatch } from "@/redux/hook";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

type Props = {};

function Order({}: Props) {
  const list = ["Status", "Product Name", "Unit Price", "Amount", "Price"];
  useEffect(() => {});
  const { orders } = useSelector((state: any) => state.order);

  return (
    <div className="">
      <div className="my-4 flex flex-col gap-4 space-y-4 text-[#2C2C2CBF] min-h-screen">
        <div className="flex flex-col">
          {orders &&
            orders.map((data: any) => (
              <motion.div
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                whileInView={{ opacity: 1 }}
                key={data._id}
                className=" mb-5 bg-[#F0E4DB] p-5 text-[#2C2C2CBF]"
              >
                <div className="p-5">
                  <h1 className="mb-4 text-xl font-bold text-[#2C2C2C]">
                    MY ORDER
                  </h1>
                  <ul className="grid grid-cols-5 items-center justify-between text-[#2C2C2CBF]">
                    {list.map((list) => (
                      <li key={list} className="mx-auto text-lg font-bold">
                        {list}
                      </li>
                    ))}
                  </ul>
                </div>
                <hr className="border border-[#BBA999]" />
                <div
                  className="mx-auto px-5 grid grid-cols-5 items-center justify-between text-center"
                  key={data._id}
                >
                  <div
                    className={`"w-full  ${
                      data.status === "Active"
                        ? "text-green-500"
                        : data.status === "Canceled"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {data.status}
                  </div>
                  <div>
                    {data.cart.map((item: any) => (
                      <p key={item._id}>{item.name}</p>
                    ))}
                  </div>
                  <div>
                    {data.cart.map((item: any) => (
                      <p key={item._id}>${item.price}</p>
                    ))}
                  </div>

                  <div>
                    {data.cart.map((item: any) => (
                      <p key={item._id}>{item.qty}</p>
                    ))}
                  </div>
                  <div>
                    {data.cart.map((item: any) => (
                      <p key={item._id}>${item.qty * item.price}</p>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-end px-5">
                  <hr className="my-6 w-[60%] border border-black" />
                </div>
                <div className="flex items-center justify-end gap-4 px-5 font-bold text-black">
                  <div className="flex w-[60%] items-center text-center ">
                    <span className="basis-1/3">Total</span>
                    <div className="basis-1/3" />
                    <span className="basis-1/3">
                      <div>
                        <div>
                          $
                          {data.cart.reduce(
                            (total: number, item: any) => total + item.price*item.qty,
                            0
                          )}
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Order;
