"use client"

import Image from "next/image"

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"

export function Navbar() {
  useEffect(() => {
    AOS.init();
  }, [])

  return <div className="animate-fadeInFromUp  px-4 border-sd h-[70px] font-lora flex justify-between items-center w-[100%]">
    <div className='flex items-center gap-1'>
      <Image src='/logo.svg' height={30} width={30} alt='logo' />
      <p className='text-xl text-gold font-semibold'>DAMS</p>
    </div>
    <div className='flex gap-1'>
      <p className='text-md hidden text-gold font-[400]'>Men</p>
      <p className='text-md hidden text-gold font-[400]'>Women</p>
      <p className='text-md hidden text-gold font-[400]'>FAQ</p>
      <Image src='/menu_bar.svg' height={25} width={25} alt='menu bar' />
    </div>
  </div>
}
