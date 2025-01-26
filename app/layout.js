// "use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Sepp from "./SessionWrapper";
import SessionWrapper from "./SessionWrapper";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/page";
// import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  max-w-6xl p-4 mx-auto`}
      >
        <SessionWrapper>
        <AuthProvider>
        <Navbar></Navbar>
        <Toaster/>
          {children}
        </AuthProvider>
        </SessionWrapper>
       
        <footer  className='border-t p-8 text-center mt-16 text-dark'>
  &copy; 2023 All rights reserved
</footer>
      </body>
    </html>
  );
}
