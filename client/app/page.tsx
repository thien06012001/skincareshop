'use client'
import React from "react";
import HomePageCarousel from "@/components/Carousel";
import Product from "@/components/Product";
import Collection from "@/components/Collection";
type Props = {};

function HomePage({ }: Props) {
  return (
    
    <main>
      
        <HomePageCarousel />

        <Product />

        <hr className="my-12 w-full border" />
        <Collection />
      </main>

  );
}

export default HomePage;
