'use client'
// import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {createContext, Dispatch, SetStateAction, useContext} from "react";
import React from "react";

type TGrid={alive: boolean}[][]
const MyContext = createContext<{
    size: {
        width: number;
        height: number;
    },
        setSize: Dispatch<SetStateAction<{     width: number;     height: number; }>>;
    grid: TGrid;
    setGrid: Dispatch<SetStateAction<TGrid>>
}>({
    size: {
        width: 190,
        height: 90
    },
    setSize: ()=>{},
    grid: [],
    setGrid: ()=>{}
})


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "Belousov Dmitriy",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [size, setSize] = React.useState({
        width: 190,
        height: 90
    });
    const [grid, setGrid] = React.useState([[{alive: false}]]);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <MyContext.Provider value={{size, setSize, grid, setGrid}}>
        {children}
      </MyContext.Provider>

      </body>
    </html>
  );
}

export function useCtx() {
    return useContext(MyContext)
}
