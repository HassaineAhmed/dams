"use client"

import { SizerPicker } from "./sizesPicker"
import { QuantityCounter } from "./quantityCounter"
import { useState } from "react"
import Link from "next/link"
export function BuyForm1({ categoryName, productId }: { categoryName: string, productId: string }) {
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showError, setShowError] = useState(false);
  return <div className="grid gap-5">
    <div className="grid gap-3">
      <SizerPicker size={size} setSize={setSize} />
      {(showError && size == "") && <p className="uppercase text-red-300 font-bold">please pick a size</p>}
      <QuantityCounter quantity={quantity} setQuantity={setQuantity} />
    </div>
    {size == "" ?
      <div onClick={() => setShowError(true)}
        className={"mt-2 cursor-pointer flex justify-center items-center text-[2.75rem] pb-[1.3rem] pt-[1rem] font-bold leading-10 w-[350px] lg:w-[554px]  bg-teal-900 border-[2px] border-gold"}>BUY NOW</div>
      :
      <Link href={{ pathname: `/shop/${categoryName}/${productId}/buy`, query: { size: size, quantity: quantity } }}
        className={"mt-2 flex justify-center items-center text-[2.75rem] pb-[1.3rem] pt-[1rem] font-bold leading-10 w-[350px] lg:w-[554px]  bg-teal-900 border-[2px] border-gold"}>BUY NOW</Link>
    }
  </div>
}
