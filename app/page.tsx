"use client";
import React, { useState } from "react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { ArrowDown } from "lucide-react";
import Horses from "@/components/horses";

export default function Page() {
  const handleScroll = useCallback(() => {
    const ele = document.getElementById("horses");
    if (ele) {
      ele.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <main className="flex flex-col w-full min-h-screen justify-center items-start align-middle">
      <div className="flex flex-col w-full items-center h-screen justify-center  px-20 gap-5 ">
        <div className="flex flex-col text-left  justify-start gap-5 w-full">
          <p className="text-white font-bold text-6xl">
            Book your freedom now!
          </p>
          <p className="text-lg font-semibold text-neutral-300">
            Ride into tranquility and leave your worries behind
          </p>
          <Button variant="outline" size="lg" className="w-1/12">
            <Link href="/booking">Book now</Link>
          </Button>
        </div>
        <ArrowDown onClick={handleScroll} />
      </div>

      <div className="text-3xl mx-10 font-semibold ">
        <h1>Book your Ride as per choice</h1>
      </div>

     <Horses />
    </main>
  );
}
