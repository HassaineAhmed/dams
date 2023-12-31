"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { scroller } from "react-scroll"
import { useInView } from "react-intersection-observer"
import { clsx } from "clsx"

export function BrandInfo() {

  function Card({ content }: { content: string }) {
    const { inView, ref } = useInView();
    return (
      <div ref={ref} className={clsx({ "  animate-fadeInFromRight": inView }, "lg:w-[390px] lg:h-[70px] flex justify-center items-center bg-td py-3 lg:py-[16px] text-center w-[90%]  transition-all duration-700 ease-in-out")}>
        <p className="text-black font-bold  text-xl text-center lg:text-[30px] lg:font-semibold ">{content}</p>
      </div>)
  }

  const [scrolled, setScrolled] = useState(false)


  const searchParams = useSearchParams();
  const section = searchParams.get('section');

  useEffect(() => {
    if (section && !scrolled) {
      setScrolled(true)
      scroller.scrollTo(section, {
        duration: 1500,
        delay: 100,
        smooth: true,
        offset: -230,
      })
    }
  }, [section])

  const cards = ["1- World Class Quality",

    "2- Very Fast Delivery",
    "3- Artistic Design"
  ]

  return <div className="mx-1 lg:mx-2 bg-sd border-[2px] grid gap-4 lg:gap-8 border-gold py-[40px] px-2 delay-300 ">
    <div className="grid gap-3">

      <div className="flex gap-2 lg:gap-4 justify-center items-center animate-fadeInOut">
        <div className="lg:w-[82px] w-[50px]">
          <Image src='/logo.svg' height={100} width={100} alt="logo" />
        </div>
        <p className="text-3xl font-bold lg:text-[47px] text-gold">DAMS</p>
      </div>

      <div className="flex justify-center">
        <p className="text-gold px-4 text-[15px] lg:text-[25px] max-w-[1050px] text-center font-semibold">
          We are an Algerian clothing brand with the goal to provide youngsters with world class clothings, blending our rich cultural heritage with global fashion influences.
        </p>
      </div>

    </div>

    <div className="grid gap-3 lg:gap-[32px] pb-4">
      <p className="text-xl font-bold text-center lg:text-[34px]">
        What should you expect from us:
      </p>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-[50px] w-full items-center justify-center">
        {cards.map((content, index) => <Card key={index} content={content} />)}
      </div>
      <p className='font-semibold text-center pt-4 text-[15px] lg:text-[24px]'>Take your time explore our website and discover the perfect fit that complements your style.</p>
    </div>

  </div>
}

