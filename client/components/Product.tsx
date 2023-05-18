/* eslint-disable @next/next/no-img-element */
import React from "react";
import { types } from "@/static/data";
import Image from "next/image";
import ProductCarousel from "./ProductCarousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
import { useSelector } from "react-redux";
import { backend_url } from "@/server";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/hook";
import { addTocart } from "@/redux/actions/cart";
import { addToBasket, selectItems } from "@/redux/slices/basketSlice";
type Props = {};

  function Product({}: Props) {
  const { allProducts } = useSelector((state: any) => state.products);
  const items = useSelector(selectItems);
  const { cart } = useSelector((state: any) => state.cart);
  const dispatch = useAppDispatch();
  const addToCartHandler = (id: any) => {
    const isItemExists = cart && cart.find((i: any) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      const product = allProducts && allProducts.find((i: any) => i._id === id);
      const cartData = { ...product, qty: 1 };
      dispatch(addTocart(cartData));
    }
  };

  return (
    <div className="flex flex-col divide-y-2 items-center justify-center space-y-5 m-0 text-lg font-semibold text-[#55564E] md:text-xl lg:text-2xl">
      {types.map((type) => (
        <div
          className="flex h-fit w-full flex-col items-center justify-around md:justify-around p-10 m-0"
          key={type}
        >
          <Link href={`/Products/${type}`} className="pb-10">{type}</Link>
          <div className="hidden h-2/3 w-full items-center justify-around md:flex">
            {allProducts !== undefined &&
              allProducts.length !== 0 &&
              allProducts &&
              allProducts
                .filter((product: any) => product.category === type)
                .slice(0, 3)
                .map((product: any) => (
                  <div
                    key={product._id}
                    className="mx-auto hidden h-full basis-1/3 flex-col md:flex m-0"
                  >
                    <div className="relative mx-auto flex h-fit w-fit items-center justify-center  ">
                      <Image
                        width={200}
                        height={200}
                        src={`${backend_url}${product.image}`}
                        alt={product.name}
                        className="mx-auto h-[200px] w-[200px] object-fill"
                      />
                      <div className="product absolute inset-0 z-20 flex h-full w-full flex-col opacity-0 transition-all duration-300 hover:opacity-100 ">
                        <div className="flex basis-4/5 items-center justify-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            onClick={() => addToCartHandler(product._id)}
                            className="h-6 w-6 cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6 cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            />
                          </svg>
                        </div>
                        <Link
                          href={`product/${product._id}`}
                          className="flex basis-1/5 items-center justify-center bg-[#BBA99975] text-center text-sm text-[#2C2C2C]"
                        >
                          View the product
                        </Link>
                      </div>
                    </div>
                    <div className="mx-auto h-fit w-[200px] space-y-2 py-2 font-medium text-[#55564E]">
                      <h1 className="line-clamp-1">{product.name}</h1>
                      <p>${product.price}</p>
                    </div>
                  </div>
                ))}
          </div>
          <div className="mx-auto flex h-fit w-full items-center justify-center overflow-hidden md:hidden">
            <Carousel
              showStatus={false}
              showIndicators={false}
              // dynamicHeight
              // showThumbs={false}
            >
              {allProducts !== undefined &&
                allProducts.length !== 0 &&
                allProducts &&
                allProducts
                  .filter((product: any) => product.category === type)
                  .slice(0, 3)
                  .map((product: any) => (
                    <div
                      key={product._id}
                      className="mx-auto flex h-full flex-col items-center justify-center overflow-x-hidden px-3 py-2"
                    >
                      <div className="relative mx-auto flex h-[200px] w-[200px] items-center justify-center  ">
                        <Image
                          quality={100}
                          width="200"
                          height="200"
                          objectFit="fill"
                          src={`${backend_url}${product.image}`}
                          alt={product.name}
                          className="mx-auto w-full h-full object-fill"
                        />
                        <div className="product absolute inset-0 z-20 flex h-full w-full flex-col opacity-0 transition-all duration-300 hover:opacity-100 ">
                          <div className="flex basis-4/5 items-center justify-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              onClick={() => addToCartHandler(product._id)}
                              className="h-6 w-6 cursor-pointer"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                              />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-6 w-6 cursor-pointer"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                              />
                            </svg>
                          </div>
                          <Link
                            href={`product/${product._id}`}
                            className="flex basis-1/5 items-center justify-center bg-[#BBA99975] text-center text-sm text-[#2C2C2C]"
                          >
                            View the product
                          </Link>
                        </div>
                      </div>
                      <div className="mx-auto flex w-[15rem] items-center justify-center gap-2 py-2 font-medium text-[#55564E]">
                        <h1 className="text-center line-clamp-1 max-w-[7rem] text-sm sm:text-base">
                          {product.name}
                        </h1>
                        |
                        <p className="flex items-center justify-center text-center text-sm sm:text-base">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  ))}
            </Carousel>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Product;
