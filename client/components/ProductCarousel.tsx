import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { products } from "@/static/data";
import Image from "next/image";
type Props = {};
const handleDragStart = (e: any) => e.preventDefault();
function ProductCarousel({}: Props) {
  const items = products.map((product) => (
    <div
      key={product.price}
      className="flex w-full flex-col bg-[#BBA999] px-3 py-2"
    >
      <Image
        src={product.image}
        alt={product.name}
        width={100}
        height={50}
        className="mx-auto"
      />
      <div className="space-y-2 px-2 py-2 font-medium text-[#55564E]">
        <h1>{product.name}</h1>
        <p>{product.price}</p>
      </div>
    </div>
  ));
  return (
    <Carousel>
      {products.map((product) => (
        <div
          key={product.name}
          className="flex w-[80%] flex-col bg-[#BBA999] px-3 py-2 mx-auto"
        >
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={100}
            className="w-full"
          />
          <div className="space-y-2 px-2 py-2 font-medium text-[#55564E]">
            <h1>{product.name}</h1>
            <p>{product.price}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
