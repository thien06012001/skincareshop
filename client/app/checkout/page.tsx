"use client";
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
