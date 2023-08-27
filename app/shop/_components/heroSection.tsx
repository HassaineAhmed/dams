"use client"
import Image from "next/image"
import { Navbar } from "./navbar"

export function HeroSection() {

  return (
    <div className="bg-[url('/light_bg.png')] mx-1 border-[2px] border-gold overflow-hidden animate-fadeInOut" >
      <Navbar />

      <div className="grid justify-center items-center pt-2 gap-1 pb-12 animate-fadeInFromUp">
        <p className="text-[40px] text-center font-semibold">Elevate Your Style</p>
        <p className="text-[20px] text-center font-semibold">Unleash <span className="bg-sd text-gold p-[2px]">Sophistication</span> With
          Our Exclusive Collection </p>
      </div>

      <div className="bg-[url('/dark_bg.png')] py-2 flex-col items-center px-4 gap-0 bg-[200px] border-t-[2px] border-gold">
        <div className="gap-1 flex justify-center items-center h-[120px]">
          <p className="animate-fadeInFromUp text-[15px] font-mr font-semibold  text-center ">From chic streetwear to sophisticated elegance, we have the perfect outfit for every cahpter of your life.</p>
          <Image src='/clothes.png' className="animate-fadeInFromRight h-[100px] w-auto" objectFit="contain" height={1586} width={1459} alt='bg' />
        </div>

        <div className="flex justify-center text-center animate-giggle animate-slowFadeIn">
          <Image src='/scroller.svg' className="h-[20px] w-auto" objectFit="contain" height={1586} width={1459} alt='bg' />
        </div>

      </div>
    </div>
  )
}

