"use client";

import { server } from "@/server";
import axios from "axios";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch } from "@/redux/hook";
import { useSelector } from "react-redux";
import { getAllOrdersOfShipper, getAllOrdersOfShop, getAllOrdersOfUser } from "@/redux/actions/order";

export default function PaymentLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllOrdersOfUser(user && user._id));
    dispatch(getAllOrdersOfShop(user && user._id));
    dispatch(getAllOrdersOfShipper())
  });
  return <section>{children}</section>;
}
