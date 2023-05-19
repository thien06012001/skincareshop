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
import Checkout from "@/components/Checkout/Checkout";
import CheckoutSteps from "@/components/Checkout/CheckoutSteps";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
type Props = {};

function CheckoutPage({}: Props) {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state: any) => state.user);

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
  return (
    <div>
      <CheckoutSteps active={1} />
      <Checkout />
    </div>
  );
}

export default CheckoutPage;
