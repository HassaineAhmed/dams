"use client"

import Image from "next/image"
import { Menu } from "./menu"
import { Link as ReactScrollLink, Element } from "react-scroll"



export function Navbar() {

  return <div className="bg-blue animate-fadeInFromUp lg:w-[1100px] lg:h-[126px] lg:px-[14px] relative px-4 border-sd h-[70px] font-lora flex justify-between items-center w-[100%]">
    <div className='flex items-center gap-1 lg:gap-2'>
      <div className="w-[30px] h-[30px] lg:w-[60px] lg:h-[60px] justify-center items-center flex">
      <Image src='/logo.svg' height={90} width={90} alt='logo' />
      </div>
	<p> testing? </p>
      <p className='text-xl lg:text-[43px] text-gold font-semibold'>DAMS</p>
    </div>
    <div className='flex relative'>
      <Menu />
    </div>
  </div>
}
//<Image src='/menu_bar.svg' height={25} width={25} alt='menu bar' />
