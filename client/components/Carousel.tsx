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
      // className="h-[80vh]" 
    >
 
      {banners.map((banner) => (
        <div key={banner.id}> 
          <Image
            alt={banner.title}
            src={banner.image}
            className="w-full object-contain"
          />
        </div>
      ))}
    </Carousel>
  );
}

export default HomePageCarousel;
