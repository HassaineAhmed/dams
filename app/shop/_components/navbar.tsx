"use client"

import Image from "next/image"
import { Menu } from "./menu"

export function Navbar({ variation }: { variation: string }) {
  return (
    <div className={`${variation == "withBg" && "bg-sd border-b-[2px]"} border-gold w-full justify-center items-center flex`}>
      <div
        className={`animate-fadeInFromUp lg:w-[1800px] ${variation != "withBg" && "mt-1 lg:mt-2"}  lg:h-[110px] lg:px-[14px] relative px-4 h-[70px] font-lora flex justify-between items-center w-[100%]`}>
        <div className='flex items-center gap-2 lg:gap-3'>
          <div className="w-[30px] h-[30px] lg:w-[60px] lg:h-[60px] justify-center items-center flex">
            <Image src='/logo.svg' height={90} width={90} alt='logo' />
          </div>
          <p className='text-xl lg:text-[43px] text-gold font-semibold'>DAMS</p>
        </div>
        <div className='absolute right-2 lg:right-8'>
          <Menu />
        </div>

      </div>
    </div>
  )
}
//<Image src='/menu_bar.svg' height={25} width={25} alt='menu bar' />
//<Menu />
