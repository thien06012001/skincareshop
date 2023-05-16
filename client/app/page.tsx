"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { backend_url } from "@/server";
import { CgProfile } from "react-icons/cg";
import Header from "@/components/Header/Header";
import List from "@/components/List";
import HomePageCarousel from "@/components/Carousel";
import Product from "@/components/Product";
import pic from "./assets/banner1.png";

import Collection from "@/components/Collection";
type Props = {};

function HomePage({}: Props) {
  
  return (
    <div>
      <HomePageCarousel />
      <Product />
      <hr  className="border w-full my-12"/>
      <Collection />
    </div>
  );
}

export default HomePage;
