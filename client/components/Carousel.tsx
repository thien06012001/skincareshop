import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import banner1 from "../app/assets/banner1.png";
import banner2 from "../app/assets/banner2.png";
import banner3 from "../app/assets/banner3.png";
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
      interval={3000}
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
