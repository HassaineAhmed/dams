"use client"
import Image from "next/image"
import { Navbar } from "./navbar"

export function HeroSection() {

  return (
    <div className="bg-[url('/light_bg.png')] jusify-center items-center mx-1 border-[2px] border-gold overflow-hidden animate-fadeInOut" >
      <div className="w-full lg:absolute lg:top-0 lg:flex lg:justify-center">
        <Navbar />
      </div>
      <div className="lg:flex lg:flex-row">

        <div className="grid justify-center lg:flex lg:w-[60%]  lg:flex-col lg:flex-1 items-center pt-[28px] gap-1 pb-[72px] animate-fadeInFromUp lg:py-[200px]">
          <p className="text-[40px] text-center font-semibold lg:text-[78px]">Elevate Your Style</p>
          <p className="text-[20px] text-center font-semibold lg:text-[42px] lg:font-medium">Unleash <span className="bg-sd text-gold p-[2px] px-[4px]">Sophistication</span> With
            Our Exclusive Collection </p>
        </div>

        <div className="hidden lg:flex lg:w-[40%] bg-[url('/dark_bg.png')] py-2 flex-col items-center px-2 gap-0 bg-[200px] border-t-[2px] lg:border-t-0 lg:border-l-[2px]  border-gold">
          <div className="gap-1 hidden flex justify-center items-center h-[120px] lg:mt-[70px] lg:flex-col">
            <p className="animate-fadeInFromUp text-[16px] font-mr font-semibold  text-center ">From chic streetwear to sophisticated elegance, we have the perfect outfit for every cahpter of your life.</p>
            <Image src='/clothes.png' className="animate-fadeInFromRight h-[100px] lg:h-[400px] w-auto" objectFit="contain" height={1586} width={1459} alt='bg' />
          </div>

          <div className="flex justify-center text-center animate-giggle animate-slowFadeIn pb-2">
            <Image src='/scroller.svg' className="h-[20px] w-auto" objectFit="contain" height={1586} width={1459} alt='bg' />
          </div>

        </div>
      </div>
    </div>
  )
}

