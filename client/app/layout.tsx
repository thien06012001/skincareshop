"use client";
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
      <body className="bg-[#FBF6F6]">
        <Providers>
          <Notify />
          {pathname !== "/account" && <Header />}

          {children}
          {pathname !== "/account" && <Footer />}
        </Providers>
      </body>
    </html>
  );
}
