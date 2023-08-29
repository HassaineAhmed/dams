"use client"
import { FeedbackForm } from "./feedback-form"
import Image from "next/image"
import { Facebook, Instagram } from "lucide-react"
import { Element } from "react-scroll"

export function Footer() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-0">

        <div className="flex-1 bg-[#A9A395] border-[2px] border-formGreen">
          <Element name={'contact'}>
            <div className="m-2 p-4 border-[2px] bg-[#A9A395]  text-[#384D49] border-[#384D49]">
              <p className="font-bold text-[20px]">CONTACT US:</p>
              <FeedbackForm />
            </div>
          </Element>
        </div>

        <div className="flex-1 bg-formGreen text-gold min-h-[288px] border-[2px] flex content-stretch justify-center border-black">
          <div className="border-black border-[2px] flex-1 flex m-2 gap-2  justify-center items-center">
            <Image src='/logo.svg' height={50} width={50} alt="logo" />
            <p className="font-semibold text-[40px]">DAMS</p>
          </div>
        </div>
        {/*
        <div className="flex-1 bg-formGreen border-[2px] justify-center items-center relative border-t-[2px] border-black">
          <div className="m-2 p-4 border-[2px] bg-formGreen text-gold flex  flex-col border-black">
            <div className="flex items-end justify-between justify-self-end px-4 ">
              <p className="text-gold font-bold text-[17px]">Call US: <span className=" font-mr tracking-widest text-[20px]">0557102363</span></p>
              <div className="flex gap-4">
                <Image src='/icons/facebook.svg' height={19} width={19} alt="facebook logo" />
                <Image src='/icons/instagram.svg' height={30} width={30} alt="instagram logo" />
              </div>
            </div>
          </div>
        </div>
        */}



      </div >
      <div className="bg-td px-4 gap-2 border-x-[1px]  border-black justify-between py-4 items-center flex">
        <p className="text-black font-bold text-[15px] font-ds lg:text-[20px]">Copyright © 2023. DAMES. All rights’re reserved.</p>
        <div className="flex gap-4">
        <p className="text-black font-bold text-[15px] font-ds lg:text-[20px] hidden lg:block">CALL US: 0575102363</p>
        <p className="text-black font-bold text-[15px] font-ds lg:text-[20px] hidden lg:block"><span className="italic font-mw font-[400]">Algiers</span>, Algeria.</p>
        </div>
      </div>


    </div >
  )
}
