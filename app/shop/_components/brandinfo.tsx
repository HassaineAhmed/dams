"use client"
import Image from "next/image"


export function BrandInfo() {
  function Card({ content }: { content: string }) {
    return <div className={` lg:w-[350px]  animate-slideInFromLeft bg-td py-3 lg:py-[16px] text-center w-[90%]`}>
      <p className="text-black font-bold text-xl lg:text-[30px] lg:font-semibold ">{content}</p>
    </div>
  }

  const cards = ["1- World Class Quality",
    "2- Very Fast Delivery",
    "3- Artistic Design"
  ]

  return <div className="mx-1 bg-sd border-[2px] grid gap-8 border-gold py-[40px] px-2 animate-fadeInOut">
    <div className="grid gap-3">

      <div className="flex gap-4 justify-center items-center">
        <div className="lg:w-[82px]">
          <Image src='/logo.svg' height={100} width={100} alt="logo" />
        </div>
        <p className="text-3xl font-bold lg:text-[47px] text-gold">DAMS</p>
      </div>

      <div className="flex justify-center">
        <p className="text-gold px-4 text-[14px] lg:text-[25px] max-w-[1050px] text-center font-semibold">
          We are an Algerian clothing brand with the goal to provide youngsters with world class clothings, blending our rich cultural heritage with global fashion influences.
        </p>
      </div>

    </div>

    <div className="grid gap-3 lg:gap-[32px] pb-4">
      <p className="text-lg font-bold text-center lg:text-[34px]">
        What should you expect from us:
      </p>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-[50px] w-full items-center justify-center">
        {cards.map((content) => <Card content={content} />)}
      </div>
    </div>

  </div>
}

