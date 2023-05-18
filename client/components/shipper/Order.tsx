/* eslint-disable @next/next/no-img-element */
"use client";
import { useAppDispatch } from "@/redux/hook";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

type Props = {};

function Order({}: Props) {
  const list = ["Status", " Name", "Unit Price", "Amount", "Price"];
  useEffect(() => {});
  const { orders } = useSelector((state: any) => state.order);

  return (
    <div className="">
      <div className="my-4 flex min-h-screen flex-col gap-4 space-y-4 text-[#2C2C2CBF]">
        <div className="flex flex-col">
          {orders &&
            orders.map((data: any) => (
              <motion.div
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                whileInView={{ opacity: 1 }}
                key={data._id}
                className=" mb-5 bg-[#F0E4DB] text-[#2C2C2CBF]"
              >
                <div className="">
                  <h1 className="mb-4 text-xl font-bold text-[#2C2C2C]">
                    MY ORDER
                  </h1>
                  <ul className="grid grid-cols-5 items-center justify-between text-[#2C2C2CBF]">
                    {list.map((list) => (
                      <li
                        key={list}
                        className="mx-auto text-center text-xs font-bold sm:text-sm md:text-base lg:text-lg"
                      >
                        {list}
                      </li>
                    ))}
                  </ul>
                </div>
                <hr className="my-3 border border-[#BBA999]" />
                <div
                  className="mx-auto flex items-center justify-between text-center"
                  key={data._id}
                >
                  <div
                    className={`"w-full basis-1/5  ${
                      data.status === "Active"
                        ? "text-green-500"
                        : data.status === "Canceled"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {data.status}
                  </div>
                  <div className="basis-4/5">
                    {data.cart.map((item: any) => (
                      <div
                        className="grid w-full grid-cols-4 items-center"
                        key={item._id}
                      >
                        <p>{item.name}</p>
                        <p>${item.price}</p>
                        <p>{item.qty}</p>
                        <p>${item.qty * item.price}</p>
                      </div>
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
                            (total: number, item: any) =>
                              total + item.price * item.qty,
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
