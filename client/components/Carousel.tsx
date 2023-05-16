import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
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
    <Carousel>
      {banners.map((banner) => (
        <div key={banner.id}>
          <Image alt={banner.title} src={banner.image} />
        </div>
      ))}
    </Carousel>


  );
}

export default HomePageCarousel;
