"use client"
import { FeedbackForm } from "./feedback-form"
import Image from "next/image"
import { Facebook, Instagram } from "lucide-react"
import { Element } from "react-scroll"

export function ContactFooter() {
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

        <div className="flex-1 bg-formGreen text-gold min-h-[288px] border-[2px] flex content-stretch justify-center border-formGrey">
          <div className="border-formGrey border-[2px] flex-1 flex m-2 gap-2  justify-center items-center">
            <Image src='/logo.svg' height={50} width={50} alt="logo" />
            <p className="font-semibold text-[40px]">DAMS</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export function DownFooter() {
  return (
    <div className="bg-td px-4 max-h-[62px] w-full lg:px-10  gap-2 border-black justify-between py-4 items-center flex">
      <p className="text-black font-bold text-[15px] font-ds lg:text-[20px]">Copyright © 2023. DAMES. All rights’re reserved.</p>
      <div className="flex gap-4">
        <p className="text-black font-bold text-[15px] font-ds lg:text-[20px] hidden lg:block">CALL US: 0575102363</p>
        <p className="text-black font-bold text-[15px] font-ds lg:text-[20px] hidden lg:block"><span className="italic font-mw font-[400]">Algiers</span>, Algeria.</p>
      </div>
    </div>
  )
}
