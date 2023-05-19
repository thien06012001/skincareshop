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
