"use client"
import Image from "next/image"
import { Navbar } from "./navbar"


export function HeroSection() {

  return (
    <div className="bg-[url('/light_bg.png')] lg:max-h-[758px] relative jusify-center items-center mx-1 lg:mx-2 border-[2px] border-gold overflow-hidden animate-fadeInOut" >
      <div className="w-full lg:absolute lg:top-0 lg:flex lg:justify-center">
        <Navbar variation="" />
      </div>

      <div className="lg:flex lg:flex-row">
        <div className="grid  justify-center lg:flex lg:w-[65%]  lg:flex-col lg:flex-1 items-center lg:gap-[10px] pt-[28px] gap-1 pb-[72px] animate-fadeInFromUp lg:py-[200px]">
          <p className="text-[40px] text-center font-semibold lg:text-[88px]">Elevate Your Style</p>
          <div className="max-w-[754px] tex-wrap">
            <p className="text-[20px] text-center font-semibold lg:text-[49px] lg:font-medium">Unleash <span className="bg-sd text-gold p-[2px] px-[4px]">Sophistication</span> With
              Our Exclusive Collection </p>
          </div>
        </div>

        <div className="lg:flex lg:w-[40%] lg:h-[758px] bg-[url('/dark_bg.png')] py-2 flex-col items-center justify-center px-2 gap-0 bg-[200px] border-t-[2px] lg:border-t-0 lg:border-l-[2px]  border-gold">

          <div className="gap-1 flex justify-center items-center py-3 lg:h-[220px] lg:mt-[70px] lg:flex-col">
            <p className="animate-fadeInFromUp text-[16px] lg:hidden font-mr font-semibold  text-center">
              From chic streetwear to sophisticated elegance, we have the perfect outfit for every cahpter of your life.</p>
            <Image src='/clothes.png' className="animate-fadeInFromRight h-[100px] lg:h-[400px] w-auto" objectFit="contain" height={1586} width={1459} alt='bg' priority />
          </div>

          <div className="flex justify-center text-center animate-giggle animate-slowFadeIn pb-2 lg:hidden">
            <Image src='/scroller.svg' className="h-[19px] w-auto" objectFit="contain" height={1586} width={1459} alt='bg' />
          </div>

        </div>
      </div>

      <div className="absolute right-1/2 left-1/2  bottom-4 hidden lg:flex justify-center text-center animate-giggle animate-slowFadeIn pb-2 lg:w-[80px]">
        <Image src='/scroller.svg' className="h-[60px] w-auto" objectFit="contain" height={1586} width={1459} alt='bg' />
      </div>
    </div>
  )
}

