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
import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import { banners } from "@/static/data";
import Image from "next/image";
type Props = {};

function HomePageCarousel({}: Props) {
  const imageList = [];
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
      interval={2000}
    >
 
      {banners.map((banner) => (
        <div key={banner.id}> 
          <Image
            alt={banner.title}
            src={banner.image}
            className="w-full h-[40vh] lg:h-[90vh] object-fill"
          />
        </div>
      ))}
    </Carousel>
  );
}

export default HomePageCarousel;
