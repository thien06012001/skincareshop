"use client";
import React, { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import CustomerProfile from "@/components/customer/CustomerProfile";
import { toast } from "react-toastify";
import VendorProfile from "@/components/vendor/VendorProfile";
import ShipperProfile from "@/components/shipper/ShipperProfile";

type Props = {};

function ProfilePage({}: Props) {
  const { isAuthenticated, user } = useSelector((state: any) => state.user);
  const router = useRouter()
  return (
    <div>
      {user?.role === "customer" ? (
        <CustomerProfile />
      ) : user?.role === "shipper" ? (
        <ShipperProfile />
      ) : (
        <VendorProfile />
      )}
    </div>
  );
}

export default ProfilePage;
