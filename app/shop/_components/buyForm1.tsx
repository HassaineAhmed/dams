"use client"
import { SizerPicker } from "./sizesPicker"
import { QuantityCounter } from "./quantityCounter"
import { useState } from "react"
import Link from "next/link"
export function BuyForm1({ categoryName, productId }: { categoryName: string, productId: string }) {
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  return <div>
    <div className="grid gap-3">
      <SizerPicker size={size} setSize={setSize} />
      <QuantityCounter quantity={quantity} setQuantity={setQuantity} />
    </div>
    <Link href={`/shop/${categoryName}/${productId}/buy`}
      className={"mt-2 flex justify-center items-center text-[2.75rem] pb-[1.3rem] pt-[1rem] font-bold leading-10 w-[350px] lg:w-[554px]  bg-teal-900 border-[2px] border-gold"}>BUY NOW</Link>
  </div>
}
