"use client";
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
