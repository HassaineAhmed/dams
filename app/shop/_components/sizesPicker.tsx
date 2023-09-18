"use client"

import { useState } from "react"

export function SizerPicker({disabled, size, setSize, variation }: any) {
  const SMLXL = `w-[3.75rem] h-[3.5rem] flex justify-center  items-center ${variation != 2 ? "bg-sd" : "bg-pr"} border-[2px] border-gold`
  const sizebutton = "text-3xl font-bold leading-10 w-full h-full flex justify-center items-center cursor-pointer"
  return (
    <div className={`flex flex-col gap-1 ${disabled && "disabled:pointer-events-none disabled:opacity-50"} `}>
      <p className="tracking-wide text-[20px] uppercase font-bold leading-10">SIZES: </p>
      <div className="sizes flex gap-2 justify-start items-center">
        <div className={`${SMLXL} ${size == "S" && "border-[3px] w-[4rem] h-[3.9rem]"}`}> <div className={sizebutton} onClick={() => { setSize("S") }}> S </div></div>
        <div className={`${SMLXL} ${size == "M" && "border-[3px] w-[4rem] h-[3.9rem]"}`} ><div className={sizebutton} onClick={() => { setSize("M") }}> M </div></div>
        <div className={`${SMLXL} ${size == "L" && "border-[3px] w-[4rem] h-[3.9rem]"}`}> <div className={sizebutton} onClick={() => { setSize("L") }}> L </div></div>
        <div className={`${SMLXL} ${size == "XL" && "border-[3px] w-[4rem] h-[3.9rem]"}`}><div className={sizebutton} onClick={() => { setSize("XL") }}> XL </div></div>
        {/*<div  className={sizechart} > <p className={sizeP}  >SIZE CHART</p></div>*/}
      </div>
    </div>
  )
}
