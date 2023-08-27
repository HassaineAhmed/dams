"use client"
import ProductComponent from "./product-component"
import { Product } from "@prisma/client"
import { useState } from "react"


export function TabSection({ products }: { products: Product[] }) {
  const [activeTab, setActiveTab] = useState(1);
  const [tab1, setTab1] = useState("animate-slideIn origin-left w-full");
  const [tab2, setTab2] = useState("");
  const [tab3, setTab3] = useState("");
  const [gender, setGender] = useState("male")

  console.log(gender)
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
    <div className="bg-[#519D99] outline-0 mx-1 border-[2px] border-gold">

      <div className="flex gap-0 w-full border-b-[2px] border-gold">

        <button onClick={() => { setGender("male") }} className="outline-0 flex-1 py-2 bg-[#326967]">
          <p className="text-2xl text-center font-bold font-mr">Men</p>
        </button>

        <button onClick={() => { setGender("female") }} className="outline-0 flex-1 py-2 bg-[#519D99]  border-gold">
          <p className="text-2xl font-bold text-center font-mr">Women</p>
        </button>
      </div>

      <div className="py-4">
        <div className={`flex ${gender == "male" ? "animate-fadeInOut" : "animate-fadeInOut"} justify-center gap-6 items-center`}>
          <button onClick={() => {
            if (activeTab == 2) {
              setTab2("w-full animate-slideOut origin-left");
            } else {
              setTab3("w-full animate-slideOut origin-left")
            }
            setTab1("animate-slideIn origin-right  w-full")
            setActiveTab(1);
          }} className="flex flex-col outline-0 gap-1 justify-stretch">

            <p className="font-mr font-bold text-[17px] py-1">Trending</p>
            <div className={`h-[2px] bg-white ${tab1} `} />
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
            <p className="font-mr font-bold text-[17px]  py-1">New Arrival</p>
            <div className={`h-[2px]  bg-white ${tab2} `} />
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
            <p className="font-mr font-bold text-[17px] py-1">Coming Soon</p>
            <div className={`h-[2px]  bg-white ${tab3} `} />
          </button>

        </div>
      </div>

      <div>

        <div className={`animate-fadeInOut flex ${gender == 'male' ? "flex" : "hidden"} pb-4 `}>
          <div className={`gap-1 px-1 py-2 items-center justify-evenly transition-all flex duration-500 animate-fadeInOut ${activeTab == 1 ? 'flex' : 'hidden'}`}>
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


        <div className={`animate-fadeInOut flex pb-4 ${gender == 'female' ? "flex" : "hidden"} `}>
          <div className={`gap-1 px-1 py-2 items-center justify-evenly transition-all flex duration-500 animate-fadeInOut ${activeTab == 1 ? 'flex' : 'hidden'}`}>
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
      </div>
    </div>
  )
}