/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { backend_url } from "@/server";
import { useAppDispatch } from "@/redux/hook";
import { addTocart, removeFromCart } from "@/redux/actions/cart";
import { RxCross1 } from "react-icons/rx";
import { HiPlus, HiOutlineMinus } from "react-icons/hi";
import Link from "next/link";
type Props = {};

function CheckoutPage({}: Props) {
  const { isAuthenticated, user, loading } = useSelector(
    (state: any) => state.user
  );
  console.log(isAuthenticated);
  console.log(user);

  const router = useRouter();
  useEffect(() => {
    let timeoutId: any = null;

    const checkUser = () => {
      if (!isAuthenticated || user === undefined) {
        toast.error("Please login to access this page");
        router.push("/account");
      }
    };

    timeoutId = setTimeout(checkUser, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isAuthenticated, user, router]);
  const { cart } = useSelector((state: any) => state.cart);
  const dispatch = useAppDispatch();
  const removeFromCartHandler = (data: any) => {
    dispatch(removeFromCart(data));
  };
  const totalPrice = cart?.reduce(
    (acc: any, item: any) => acc + item.qty * item.price,
    0
  );

  const increment = (data: any) => {
    // setValue(value + 1);
    const updateCartData = { ...data, qty: data.qty + 1 };
    quantityChangeHandler(updateCartData);
    console.log(data);
  };
  const quantityChangeHandler = (data: any) => {
    dispatch(addTocart(data));
  };
  const decrement = (data: any) => {
    const updateCartData = { ...data, qty: data.qty === 1 ? 1 : data.qty - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="flex h-screen flex-col">
      {cart !== undefined && cart && cart.length === 0 ? (
        <h5>Cart Items is empty!</h5>
      ) : (
        <div className="flex justify-center gap-2 px-3 py-4">
          <div className="basis-3/5 px-5">
            <h1 className="text-xl font-bold text-[#55564E] ">SHOPPING CART</h1>
            <div className="flex w-full items-center justify-end border-b border-[#F0E4DB] px-3 py-2">
              {cart?.length} Items
            </div>
            <div className="">
              {cart &&
                cart.map((i: any) => (
                  <>
                    <div
                      key={i._id}
                      className="flex items-center justify-between px-3 py-2"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <img
                          src={`${backend_url}${i.image}`}
                          alt={i.name}
                          className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32"
                        />
                        <p className="w-[10rem] text-sm">{i.name}</p>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <p className="mr-3">${i.price * i.qty}</p>
                        <div className="flex items-center justify-center gap-5 border-2 border-[#DDB7AC] px-3 py-1 text-[#DDB7AC]">
                          <div
                            className={`cursor-pointer`}
                            onClick={() => decrement(i)}
                          >
                            <HiOutlineMinus size={16} />
                          </div>
                          <span className="">{i.qty}</span>
                          <div
                            className="cursor-pointer"
                            onClick={() => increment(i)}
                          >
                            <HiPlus size={18} />
                          </div>
                        </div>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6 cursor-pointer text-[#949494]"
                            onClick={() => removeFromCartHandler(i)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <hr className="border-w my-2 border-[#F0E4DB]" />
                  </>
                ))}
            </div>
          </div>
          <div className="basis-1/6 text-[#55564E]">
            <h1 className="mb-4 text-center font-bold ">CART SUMMARY</h1>
            <p className="flex items-center justify-between px-4 py-2">
              Total Price <span>${totalPrice}</span>
            </p>
            <p className="flex items-center justify-between px-4 py-2">
              Discount(10%) <span>${totalPrice / 10}</span>
            </p>
            <hr className="my-5 border border-[#DDB7AC]" />
            <p className="flex items-center justify-between px-4 py-2 font-semibold">
              Total{" "}
              <span className="font-normal">
                ${totalPrice - totalPrice / 10}
              </span>
            </p>
            <div
              onClick={() => router.push("/checkout")}
              className="mt-4 flex w-full cursor-pointer items-center justify-center rounded bg-[#DDB7AC] px-6 py-3 font-bold text-white"
            >
              CHECK OUT
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
