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
import React from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

type Props = {
  params: { role: string };
};

function RoleDashboardPage({ params: { role } }: Props) {
  const { isAuthenticated, user } = useSelector((state: any) => state.user);
  if (!isAuthenticated) {
    redirect("/account");
  }
  return <div>{role}</div>;
}

export default RoleDashboardPage;
