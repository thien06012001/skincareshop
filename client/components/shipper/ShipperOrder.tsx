"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { VscTriangleRight } from "react-icons/vsc";
import { BsChevronRight } from "react-icons/bs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { server } from "@/server";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { statusStatic } from "@/static/data";
type status = "Active" | "Delivered" | "Canceled";
function ShipperOrder() {
  const { shipperOrders, shipperOrderLoading } = useSelector(
    (state: any) => state.order
  );
  const router = useRouter();

  const { user } = useSelector((state: any) => state.user);
  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [status, setStatus] = useState<status>("Active");
  const [id, setId] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const data =
    shipperOrders && shipperOrders.find((item: any) => item._id === id);
  const [orderStatus, setOrderStatus] = useState("");
  const orderUpdateHandler = async (e: any) => {
    await axios
      .put(
        `${server}/order/update-order-status`,
        {
          orderStatus,
          id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order updated!");
        router.push("/profile");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const statusList = [
    {
      id: "active",
      value: "Active",
    },
    {
      id: "delivered",
      value: "Delivered",
    },
    {
      id: "canceled",
      value: "Canceled",
    },
  ];
  return (
    <div>
      {!show ? (
        <>
          <h1 className="text-xl font-bold">ACTIVE</h1>
          <h1 className="px-3 font-light"> Distribution hub: {user.hub}</h1>
          <div className="flex flex-col gap-5">
            {shipperOrders &&
              shipperOrders
                .filter(
                  (order: any) =>
                    order.hub === user.hub && order.status === "Active"
                )
                .map((order: any) => (
                  <div
                    className="flex items-center justify-between border-2 bg-white p-5"
                    key={order._id}
                  >
                    <div className="flex basis-4/5 flex-col gap-5">
                      <p className="flex w-fit items-center rounded-lg bg-[#DDB7AC] px-3 py-1 text-center text-lg uppercase text-white">
                        {order.status}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col gap-1">
                          <p className="flex">
                            <span className="w-[6rem] text-sm font-medium text-[#949494]">
                              Customer
                            </span>
                            <span className="font-bold">{order.user.name}</span>
                          </p>
                          <p className="flex">
                            <span className="w-[6rem] text-sm font-medium text-[#949494]">
                              Address
                            </span>
                            <span className="font-light text-[#949494]">
                              {order.shippingAddress.address}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex basis-1/5 items-center justify-end px-5">
                      <BsChevronRight
                        onClick={() => {
                          setShow(true);
                          setId(order._id);
                        }}
                        size={30}
                      />
                    </div>
                  </div>
                ))}
          </div>
        </>
      ) : (
        <div>
          <h1 className="mb-6 text-xl font-bold text-[#33363F] md:text-2xl lg:text-3xl">
            Oder details
          </h1>

          {shipperOrders &&
            shipperOrders
              .filter((item: any) => item._id === id)
              .map((item: any) => (
                <div key={item._id}>
                  <div
                    className="mb-3 flex cursor-pointer items-center gap-2 font-light text-[#949494]"
                    onClick={() => setShow(false)}
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
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                    Go Back Active
                  </div>
                  <div key={item._id} className="bg-white p-4 text-[#2C2C2CBF]">
                    <div>
                      <div>
                        <h1 className="flex items-center justify-between px-5 font-bold">
                          Order ID:{" "}
                          <span className="font-normal">{item._id}</span>
                        </h1>
                        <h1 className="flex items-center justify-between px-5 font-bold">
                          Status:{" "}
                          <select
                            onChange={(e) => {
                              setOrderStatus(e.target.value);
                              setDisabled(false);
                            }}
                            value={orderStatus}
                            required
                            className="flex gap-2 outline-none"
                          >
                            <option value="">Active</option>
                            {statusStatic.map((status) => (
                              <option
                                key={status.id}
                                value={status.value}
                                className="bg-transparent text-[#55564E]"
                              >
                                {status.value}
                              </option>
                            ))}
                          </select>
                        </h1>
                        <h1 className="flex items-center justify-between px-5 font-bold">
                          Dist.Hub:{" "}
                          <span className=" font-normal">{item.hub}</span>
                        </h1>
                        <hr className="my-2 border border-[#BBA999BF]" />
                        <h1 className="px-3 font-bold">
                          [ Customer Information ]
                        </h1>
                        <h1 className="flex items-center justify-between px-5 font-bold">
                          Name:{" "}
                          <span className=" font-normal">{item.fullName}</span>
                        </h1>
                        <h1 className="flex items-center justify-between px-5 font-bold">
                          Address:{" "}
                          <span className=" font-normal">
                            {item.shippingAddress.address}
                          </span>
                        </h1>
                        <h1 className="flex items-center justify-between px-5 font-bold">
                          Paid Date:{" "}
                          <span className=" font-normal">
                            {format(new Date(item.paidAt), "dd/MM/yyyy")}
                          </span>
                        </h1>
                        <hr className="my-2 border border-[#BBA999BF]" />
                        <h1 className="px-3 font-bold">[ Product(s) ]</h1>
                        <div>
                          {item.cart.map((i: any) => (
                            <div key={i._id}>
                              <p className="flex items-center justify-between px-5  font-bold">
                                Product:{" "}
                                <span className="font-normal">{i._id}</span>
                              </p>
                              <p className="flex items-center justify-between px-5  font-bold">
                                Quantity:{" "}
                                <span className="font-normal">{i.qty}</span>
                              </p>
                              <p className="flex items-center justify-between px-5  font-bold">
                                Name:{" "}
                                <span className="font-normal">{i.name}</span>
                              </p>
                              <p className="flex items-center justify-between px-5  font-bold">
                                Price:{" "}
                                <span className="font-normal">${i.price}</span>
                              </p>
                            </div>
                          ))}
                        </div>
                        <hr className="my-2 border border-[#BBA999BF]" />
                        <h1 className="flex items-center justify-between px-5 font-bold">
                          Total Price :{" "}
                          <span className=" font-normal">
                            $
                            {item.cart.reduce(
                              (total: number, item: any) => total + item.price,
                              0
                            )}
                          </span>
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end p-4">
                    <button
                      disabled={disabled}
                      onClick={orderUpdateHandler}
                      className="rounded bg-[#DDB7AC] px-3 py-1 font-light text-white disabled:grayscale"
                    >
                      SAVE
                    </button>
                  </div>
                </div>
              ))}
        </div>
      )}
    </div>
  );
}

export default ShipperOrder;
