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
  const router = useRouter();

  useEffect(() => {
    let timeoutId: any = null;
  
    const checkUser = () => {
      if (!isAuthenticated || user === undefined) {
        toast.error('Please login to access this page')
        router.push('/account');
      }
    };
   timeoutId = setTimeout(checkUser, 2000);
  
   
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isAuthenticated, user, router]);

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
