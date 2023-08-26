"use client"
import { FeedbackForm } from "./feedback-form"
import Image from "next/image"
import { Facebook, Instagram } from "lucide-react"
export function Footer() {
  return (
    <div>
      <div className="flex flex-col gap-0">

        <div className="flex-1 bg-[#A9A395] border-[2px] border-formGreen">
          <div className="m-2 p-4 border-[2px] bg-[#A9A395]  text-[#384D49] border-[#384D49]">
            <p className="font-bold text-[20px]">CONTACT US:</p>
            <FeedbackForm />
          </div>
        </div>

        <div className="flex-1 bg-formGreen border-[2px] border-t-[2px] border-black">
          <div className="m-2 p-4 border-[2px] bg-formGreen text-gold flex flex-col border-black">
            <div className="flex gap-3 justify-center justify-self-center items-center my-12">
              <Image src='/logo.svg' height={60} width={60} alt="logo" />
              <p className="font-semibold text-[60px]">DAMS</p>
            </div>
            <div className="flex items-end justify-between justify-self-end px-4 ">
              <p className="text-gold font-bold text-[17px]">Call US: <span className=" font-ds text-[20px]">0557102363</span></p>
              <div className="flex gap-4">
                <Image src='/icons/facebook.svg' height={19} width={19} alt="facebook logo" />
                <Image src='/icons/instagram.svg' height={30} width={30} alt="instagram logo" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-td px-3 gap-2 border-x-[1px] border-b-[1px] border-black justify-between py-3 items-center flex flex-col">
          <p className="text-black font-bold text-[15px] font-ds">Copyright © 2023. DAMES. All rights’re reserved.</p>
        </div>

      </div>


    </div>
  )
}
