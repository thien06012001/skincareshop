'use client'
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
import HomePageCarousel from "@/components/Carousel";
import Product from "@/components/Product";
import Collection from "@/components/Collection";
type Props = {};

function HomePage({ }: Props) {
  return (
    
    <main>
        {/* Carousel section */}
        <HomePageCarousel />

        <Product />

        <hr className="my-12 w-full border" />
        <Collection />
      </main>

  );
}

export default HomePage;
