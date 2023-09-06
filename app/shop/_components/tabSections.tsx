"use client"
import ProductComponent from "./product-component"
import { Link as ReactScrollLink, Element, scroller } from "react-scroll"
import { Product } from "@prisma/client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

type TProducts = Array<Product & { imagesNames: { imageName: string }[] }>

export function TabSection({ products }: { products: TProducts }) {
  const searchParams = useSearchParams()
  const section = searchParams.get('section')
  useEffect(() => {
    if (section == "tabSectionMen") {
      setGender("male")
    } else if (section == "tabSectionWomen") {
      setGender("female")
    }
  }, [section])

  const [activeTab, setActiveTab] = useState(1);
  const [tab1, setTab1] = useState("animate-slideIn origin-left w-full");
  const [tab2, setTab2] = useState("");
  const [tab3, setTab3] = useState("");
  const [gender, setGender] = useState("male")

  let womenProducts = {
    trendingProducts: products.filter(product => product.isTrending == true && product.isForWomen),
    comingSoonProudcts: products.filter(product => product.isComingSoon == true && product.isForWomen),
    newArrivalProducts: products.filter(product => product.isNewArrival == true && product.isForWomen),
  }

  let menProducts = {
    trendingProducts: products.filter(product => product.isTrending == true && product.isForMen),
    comingSoonProudcts: products.filter(product => product.isComingSoon == true && product.isForMen),
    newArrivalProducts: products.filter(product => product.isNewArrival == true && product.isForMen),
  }
  return (
    <div className="flex justify-center items-center lg:pt-20">
      <Element name={'tabSectionMen'}>
        <Element name={'tabSectionWomen'}>
          <div className={`${gender == "male" ? "bg-[#326967]" : "bg-[#519D99]"} lg:w-[1400px] lg:border-x-[2px] transition duration-500 outline-0  border-[2px] border-x-0  border-gold`}>

            <div className="flex gap-0 w-full border-b-[2px]  border-gold ">
              <button onClick={() => { setGender("male") }} className="border-r-[2px] border-gold outline-0 flex-1 lg:py-6 py-2 bg-[#326967]">
                <p className={`${ gender != "male" && "opacity-60"} transition-all duration-500 text-2xl text-center font-bold font-mr lg:text-6xl`}>Men</p>
              </button>

              <button onClick={() => { setGender("female") }} className={`outline-0  flex-1 py-2 bg-[#519D99]  border-gold ${ gender != "female" && "opacity-60"} transition-all duration-500 `}>
                <p className="text-2xl font-bold text-center font-mr lg:text-6xl">Women</p>
              </button>
            </div>

            <div className="flex flex-col lg:py-8 py-4 lg:gap-[23px]">
              <div className="">
                <div className={`flex ${gender == "male" ? "animate-fadeInOut" : "animate-fadeInOut"} justify-center gap-6 pb-4 lg:gap-[104px] items-center`}>
                  <button onClick={() => {
                    if (activeTab == 2) {
                      setTab2("w-full animate-slideOut origin-left");
                    } else {
                      setTab3("w-full animate-slideOut origin-left")
                    }
                    setTab1("animate-slideIn origin-right  w-full")
                    setActiveTab(1);
                  }} className="flex flex-col outline-0 gap-1 justify-stretch">

                    <p className="font-mr font-bold text-[19px] lg:text-[37px] py-1">Trending</p>
                    <div className={`h-[2px] bg-whitish ${tab1} `} />
                  </button>

                  <button onClick={() => {
                    if (activeTab == 1) {
                      setTab1("w-full animate-slideOut origin-right")
                      setTab2("animate-slideIn origin-left w-full");
                    }
                    if (activeTab == 3) {
                      setTab2("animate-slideIn origin-right w-full");
                      setTab3("w-full animate-slideOut origin-left")
                    }
                    setActiveTab(2);
                  }} className="flex flex-col gap-1 justify-stretch outline-0">
                    <p className="font-mr font-bold text-[19px]  lg:text-[37px] py-1">New Arrival</p>
                    <div className={`h-[2px]  bg-whitish ${tab2} `} />
                  </button>

                  <button onClick={() => {
                    setTab3("animate-slideIn origin-left w-full")
                    if (activeTab == 1) {
                      setTab1("w-full animate-slideOut origin-right")
                    }
                    if (activeTab == 2) {
                      setTab2("w-full animate-slideOut origin-right")
                    }
                    setActiveTab(3)
                  }} className="flex flex-col gap-1 justify-stretch outline-0">
                    <p className="font-mr font-bold text-[19px]  lg:text-[37px] py-1">Coming Soon</p>
                    <div className={`h-[2px]  bg-whitish ${tab3} `} />
                  </button>
                </div> </div>

              <div className="flex justify-center items-center">
                { gender == "male" ?
                <div className={`animate-fadeInOut flex  pb-1 ${ gender != "male" && "hidden"}`}>
                  <div className={`gap-2 px-1 py-2 items-center justify-evenly transition-all flex duration-500 animate-fadeInOut ${activeTab == 1 ? 'flex' : 'hidden'}`}>
                    {menProducts.trendingProducts[0] && <ProductComponent product={menProducts.trendingProducts[0]} />}
                    {menProducts.trendingProducts[1] && <ProductComponent product={menProducts.trendingProducts[1]} />}
                  </div>

                  <div className={`gap-2 px-1 py-2 items-center justify-center flex animate-fadeInOut ${activeTab == 2 ? 'flex' : "hidden"} `}>
                    {menProducts.newArrivalProducts[0] && <ProductComponent product={menProducts.newArrivalProducts[0]} />}
                    {menProducts.newArrivalProducts[1] && <ProductComponent product={menProducts.newArrivalProducts[1]} />}
                  </div>

                  <div className={`gap-2 px-1 py-2 items-center justify-center flex animate-fadeInOut ${activeTab == 3 ? "flex" : "hidden"} `}>
                    {menProducts.comingSoonProudcts[0] && <ProductComponent product={menProducts.comingSoonProudcts[0]} />}
                    {menProducts.comingSoonProudcts[1] && <ProductComponent product={menProducts.comingSoonProudcts[1]} />}
                  </div>
                </div>

:
                <div className={`animate-fadeInOut flex pb-4 ${ gender != "female" && "hidden"} `}>
                  <div className={`gap-2 px-1 py-2 items-center justify-evenly transition-all flex duration-500 animate-fadeInOut ${activeTab == 1 ? 'flex' : 'hidden'}`}>
                    {womenProducts.trendingProducts[0] && <ProductComponent product={womenProducts.trendingProducts[0]} />}
                    {womenProducts.trendingProducts[1] && <ProductComponent product={womenProducts.trendingProducts[1]} />}
                  </div>

                  <div className={`gap-2 px-1 py-2 items-center justify-center flex animate-fadeInOut ${activeTab == 2 ? 'flex' : "hidden"} `}>
                    {womenProducts.newArrivalProducts[0] && <ProductComponent product={womenProducts.newArrivalProducts[0]} />}
                    {womenProducts.newArrivalProducts[1] && <ProductComponent product={womenProducts.newArrivalProducts[1]} />}
                  </div>

                  <div className={`gap-2 px-1 py-2 items-center justify-center flex animate-fadeInOut ${activeTab == 3 ? "flex" : "hidden"} `}>
                    {womenProducts.comingSoonProudcts[0] && <ProductComponent product={womenProducts.comingSoonProudcts[0]} />}
                    {womenProducts.comingSoonProudcts[1] && <ProductComponent product={womenProducts.comingSoonProudcts[1]} />}
                  </div>
                </div>
                }
              </div>
            </div>
          </div>
        </Element>
      </Element>
    </div>
  )
}
