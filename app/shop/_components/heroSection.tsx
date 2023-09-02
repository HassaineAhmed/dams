"use client"
import Image from "next/image"
import { Navbar } from "./navbar"
import { useSearchParams } from "next/navigation"
import { scroller } from "react-scroll"
import { useEffect, useState } from "react"
import { Loading } from "../_components/loading"


export function HeroSection() {
  const searchParams = useSearchParams();
  const section = searchParams.get('section');
  console.log(section)
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (section) {
      scroller.scrollTo(section, {
        duration: 1500,
        delay: 100,
        smooth: true,
        offset: -20,
      })
    }
    console.log(document)
  }, [section])
  useEffect(() => {
    if (!loading1 && !loading2 && !loading3) {
      setLoading(false)
    }
  }, [loading1, loading2, loading3])


  return (
    <>
      {loading && <Loading />}
      <div className={` ${loading && "hidden"} lg:max-h-[758px] relative justify-center lg:relative  items-center mx-1 lg:mx-2 overflow-hidden border-[2px] border-gold  animate-fadeInOut`} >

        <div className="w-full absolute z-10 lg:top-0 lg:flex lg:justify-center max-w-[97%]">
          <Navbar variation="" />
        </div>

        <div className="lg:flex lg:flex-row z-0 relative">

          <div className="grid relative justify-center  lg:flex lg:w-[65%]  lg:flex-col lg:flex-1 items-center lg:gap-[10px] pt-[20px] gap-1 pb-[62px] animate-fadeInFromUp lg:py-[200px]">

            <div className="absolute w-full z-0 h-full">
              <Image onLoadingComplete={() => setLoading1(false)} priority={true} layout="fill" className=" w-full h-full object-cover " objectPosition="center" src="/light-bg.jpg" alt="light background image" />
            </div>

            <div className=" mt-[70px] lg:mt-0 z-10">
              <p className="text-[40px] text-center font-semibold lg:text-[88px] md:text-[40px]">Elevate Your Style</p>
              <div className="max-w-[754px] tex-wrap">
                <p className="text-[20px] text-center font-semibold lg:text-[49px] lg:font-medium">Unleash <span className="bg-sd text-gold p-[2px] px-[4px]">Sophistication</span> With
                  Our Exclusive Collection </p>
              </div>
            </div>
          </div>





          <div className="lg:flex lg:w-[40%] relative z-0 lg:h-[758px]   flex-col items-center justify-center  gap-0 bg-[200px] border-t-[2px] lg:border-t-0 lg:border-l-[2px]  border-gold ">
            <div className="h-full z-0 w-full absolute">
              <Image onLoadingComplete={() => setLoading2(false)} priority={true} className="" layout="fill" objectFit="cover" src="/dark-bg.jpg" alt="light background image" />
            </div>

            <div className="z-10 relative">
              <div className="gap-1 flex justify-center items-center py-4 px-3 lg:h-[220px] lg:mt-[70px] lg:flex-col">
                <p className="animate-fadeInFromUp text-[15px] lg:hidden font-mr font-semibold text-center">
                  From chic streetwear to sophisticated elegance, we have the perfect outfit for every cahpter of your life.</p>
                <Image onLoadingComplete={() => setLoading3(false)} src='/clothes.png' className="animate-fadeInFromRight   h-[100px] lg:h-[400px] w-auto" objectFit="contain" height={1586} width={1459}
                  alt='bg' priority={true} />
              </div>
            </div>
            <div className="flex justify-center relative z-10 text-center animate-giggle animate-slowFadeIn pb-2 lg:hidden">
              <Image src='/scroller.svg' className="h-[19px] w-auto" objectFit="contain" height={1586} width={1459} alt='bg' />
            </div>
          </div>



        </div>

        <div className="absolute right-1/2 left-1/2 bottom-4 hidden lg:flex justify-center text-center animate-giggle animate-slowFadeIn pb-2 lg:w-[80px]">
          <Image src='/scroller.svg' className="h-[60px] w-auto" objectFit="contain" height={1586} width={1459} alt='bg' />
        </div>
      </div>
    </>
  )
}

