"use client";

import React from "react";
import HomePageCarousel from "@/components/Carousel";
import Product from "@/components/Product";

import Collection from "@/components/Collection";
type Props = {};

function HomePage({}: Props) {
  
  return (
    <main>
      <HomePageCarousel />
      <Product />
      <hr  className="border w-full my-12"/>
      <Collection />
    </main>
  );
}

export default HomePage;
