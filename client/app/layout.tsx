"use client";
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
import Notify from "@/components/Notify";
import "./globals.css";
import { usePathname } from "next/navigation";
import { Providers } from "@/redux/provider";
import Header from "@/components/Header/Header";
import { useEffect } from "react";
import Store from "@/redux/store";
import { loadUser } from "@/redux/actions/user";
import Footer from "@/components/Footer";
import { getAllProducts } from "@/redux/actions/product";
import { Inter, Montserrat } from "next/font/google";
import Head from "next/head";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(getAllProducts());
  });
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <title>Ivory</title>
      </head>
      <Head>
        <link rel="shortcut icon" href="./favicon.ico" />
      </Head>
      <body className={`bg-[#FBF6F6] ${montserrat.className}`}>
        <Providers>
          <Notify />
          {pathname !== "/account" && pathname !== "/loading" && <Header />}
          {children}
          {pathname !== "/account" && pathname !== "/loading" && <Footer />}
        </Providers>
      </body>
    </html>
  );
}
