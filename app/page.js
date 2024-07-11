"use client"
import Image from "next/image";
import Hero from "@/components/Header";
import SideProjects from "@/components/Projects"
import { useState } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Hero />
      </div>

      <div className="flex flex-col justify-center items-center text-3xl">
        <h1 className="font-bold">Side Projects</h1>
        <div className="flex justify-center items-center m-auto">
          <p className="text-xl italic">"Idle hands are the devil's tools"</p>
          {" "}<p className="text-xl font-thin">-They say.</p>
        </div>
        <br />
        <div className="text-xl block mb-2">Below are some of the projects keeping me busy</div>
        <SideProjects />
      </div>
    </main>
  );
}
