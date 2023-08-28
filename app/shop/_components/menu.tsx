"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Link as ReactScrollLink, Element } from "react-scroll"

function Entry({ label, link }: { label: string, link: string }) {
  return <div className="bg-sd flex justify-center items-center border-[2px] border-gold h-[50px] w-[200px]">
    <ReactScrollLink to={link} smooth={true} >
      <p className="text-gold font-mr font-bold text-[22px]">{label}</p>
    </ReactScrollLink>
  </div>
}

export function Menu() {
  const [active, setActive] = useState(false)

  return <div className={`${!active ? "translate-x-[260px]" : "translate-x-0"} transform transition-all duration-700  flex  absolute top-0 right-0`}>

    <button
      onClick={() => setActive(prev => !prev)}
      className={`${active ? "bg-pr translate-y-[140%]" : "translate-y-[12.5px] lg:mr-2 mr-4"}
transition-all  border-gold border-r-0 duration-700 flex  justify-center items-center lg:w-[45px] w-[48px] h-[48px]`}
    >
      <Image src='/menu_bar.svg' height={30} width={30} alt='menu bar' />

    </button>

    <div className={`flex justify-center items-center pb-20 pt-12 gap-6 flex-col w-[260px] top-2 bg-pr transition-all duration-700 border-gold border-t-0 opacity-0 ${active ? "border-[2px] opacity-100" : ""}`}>

      <Entry label="Men" link="tabSectionMen" />
      <Entry label="Women" link="tabSectionMen" />
      <Entry label="Categories" link="categories" />
      <Entry label="FAQs" link="FAQs" />

      <Entry label="Contact Us" link="contact" />

    </div>


  </div>

}
