"use client"

import { useState } from "react"
import Image from "next/image"

export function ImagesScroller({ images }: { images: { imageName: string }[] }) {
  const sliderDiv = "slider w-[100%] pt-[1.12rem] justify-between flex flex-row gap-2 justify-center"
  const picCircles = `w-3.5 h-3.5 bg-sky-200 bg-opacity-50 rounded-full`
  const [currentImage, setCurrentImage] = useState();

  return (

    <div className="picslider flex flex-col items-center lg:h-[100vh] ">
      {
        images.map(({ imageName }, index) => <Image className="border border-gold w-[350px] lg:w-[554px]" height={800} width={800} src={`https://dams-images.s3.eu-central-1.amazonaws.com/${imageName}`} key={index} alt="pic-product" />)
      }
      <div className={sliderDiv}>

        <button className="w-[5%]">
          <svg width="16" height="26" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 24L3 13L14 2" stroke="#D8B4A0" strokeWidth="3" /></svg>
        </button>

        <div className="flex gap-2 justify-center items-center max-w-[90%]">
          <div className={picCircles} />
          <div className={picCircles} />
          <div className={picCircles} />
          <div className={picCircles} />
          <div className={picCircles} />
          <div className={picCircles} />
          <div className={picCircles} />
        </div>

        <button className="w-[5%] flex justify-end"> <svg width="16" height="26" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2 2L13 13L2 24" stroke="#D8B4A0" strokeWidth="3" /> </svg> </button>
      </div>
    </div>

  )
}
