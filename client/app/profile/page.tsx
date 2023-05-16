"use client";
import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import CustomerProfile from "@/components/customer/CustomerProfile";
import { toast } from "react-toastify";
import VendorProfile from "@/components/vendor/VendorProfile";
import ShipperProfile from "@/components/shipper/ShipperProfile";

type Props = {};

function ProfilePage({}: Props) {
  const { isAuthenticated, user } = useSelector((state: any) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  console.log(user);
  useEffect(() => {
    setTimeout(() => {
      if (!isAuthenticated) {
        toast.error("You need to login to access this page")
        redirect("/account");
      }
    }, 1000);
  }, [isAuthenticated]);

  return (
    <div>
      {user !== undefined && isAuthenticated && (
        <div>
          {user?.role === "customer" ? (
            <CustomerProfile />
          ) : user?.role === "shipper" ? (
            <ShipperProfile />
          ) : (
            <VendorProfile />
          )}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
