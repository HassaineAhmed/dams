"use client"


import { useState } from "react"

import Image from "next/image"
import Link from "next/link"
import { Category } from "@prisma/client"
import { PuffSpinner } from "@/_components/ui/loader";
import Loading from "../loading"


type TProduct = {
  id: string,
  name: string,
  price: number,
  imagesNames: { imageName: string }[]
}

type TCategory = Category & {
  Product: { imagesNames: { imageName: string }[], id: string, name: string, price: number, isForMen: boolean, isForWomen: boolean }[],
  imageName: { imageName: string }[]
}

function Itemo({ src, descreption, price }: { src: string, descreption: string, price: number }) {
  return (
    <div className="pic-of-items">
      <div className="flex gap-[1px] justify-center flex-col min-h-full lg:justify-between">
        <div className="bg-sd relative w-[350px] flex justify-center items-center lg:w-[420px] lg:h-[420px] h-[350px] animate-pulse">
          <div className="absolute z-0">
            <PuffSpinner color={"#D8B4A0"} />
          </div>
          <Image className="w-[350px] z-10 lg:w-[420px] lg:h-[420px] border-0 h-[350]" alt="product image" height={800} width={800} src={src} />
        </div>
        <p className="ml-[2px] lg:text-[22px] text-[20px] font-bold pt-[1px] leading-normal uppercase">{descreption}</p>
        <p className="ml-[2px] lg:text-[22px] text-[20px] font-medium leading-7">{price} DZD </p>
      </div>

    </div>

  )
}

export function CategoryContent({ category }: { category: TCategory }) {
  const [gender, setGender] = useState("men");
  if (!category) {
    return <Loading />
  }

  const menProducts = category.Product.filter(p => { console.log(p.isForMen); return p.isForMen == true });
  const womenProducts = category.Product.filter(p => p.isForWomen == true);

  return <div className="min-h-[95vh]">
    <div className="w-full lg:pt-8 pt-4 flex justify-start">

      <div className="flex mx-[12px] lg:mx-14 px-0 relative gap-8 lg:gap-[60px] border-black">
        <div className={`relative z-10 cursor-pointer`} onClick={() => { setGender("men") }}>
          <p className="lg:text-[56px] text-[30px] font-bold  border-white text-sd">MEN</p>
          <div className={`${gender == "men" && "opacity-100"} absolute bottom-0 opacity-0 peer-hover:opacity-50 transition-all duration-500 left-0 w-full h-[3px] bg-sd`} />
        </div>

        <div className={`  relative z-10 cursor-pointer`} onClick={() => { setGender("women") }}>
          <p className="lg:text-[56px] text-[30px] font-bold peer pb-3 text-sd">WOMEN</p>
          <div className={`${gender == "women" ? "opacity-100" : "opacity-0"} absolute bottom-0 transition-opacity duration-500 ease-in-out left-0 w-full h-[3px] bg-sd`} />
        </div>

        <div className="absolute z-0 bottom-0 left-0 w-full h-[3px] bg-whitish opacity-60" />
      </div>
    </div>

    <div className="lg:py-4 py-2 pb-4 lg:pb-16 px-4 flex-1 h-[100%]">
      <div className="">
        {category.Product.length == 0 ?
          <p className="text-whitish lg:pl-20 text-center text-[30px] lg:text-[50px] font-bold uppercase" >There are no products yet in this category</p>
          :
          (menProducts.length == 0 && gender == "men") ?
            <p className="text-whitish lg:pl-20 text-start text-[17px] animate-fadeInOut lg:text-[30px] pt-3 lg:pt-10 font-bold uppercase" >No products for men in this category yet.</p>
            :
            (womenProducts.length == 0 && gender == "women") ?
              <p className="text-whitish lg:pl-20 text-start text-[17px] animate-fadeInOut lg:text-[30px] pt-3 lg:pt-10 font-bold uppercase" >No products for women in this category yet.</p>
              :
              <p className="text-whitish lg:pl-20 text-start text-[35px] lg:text-[60px] font-bold uppercase animate-fadeInOut" >{category?.name}:</p>
        }
      </div>
      <div className={`flex-wrap lg:gap-y-14 gap-y-6 lg:gap-x-1 justify-center lg:justify-start lg:p-10 lg:px-20 pt-5 flex animate-fadeInOut ${gender == "men" && menProducts.length != 0 ? 'flex' : "hidden"}`}>
        {menProducts.map((product: TProduct) => <Link key={product.name} href={`/shop/${category.name}/${product.id}`}>
          <Itemo src={`https://dams-images.s3.eu-central-1.amazonaws.com/${product.imagesNames[0].imageName}`} descreption={product.name} price={product.price} /> </Link>
        )}

      </div >
      <div className={`flex-wrap lg:gap-y-14 gap-y-6 lg:gap-x-1 justify-center lg:justify-start lg:p-10 lg:px-20 pt-5 flex animate-fadeInOut ${gender == "women" && womenProducts.length != 0 ? 'flex' : "hidden"}`}>
        {womenProducts.map((product: TProduct) => <Link key={product.name} href={`/shop/${category.name}/${product.id}`}>
          <Itemo src={`https://dams-images.s3.eu-central-1.amazonaws.com/${product.imagesNames[0].imageName}`} descreption={product.name} price={product.price} /> </Link>
        )}

      </div >
    </div >
  </div>
}
