"use client"
import { useState } from "react"
import Image from "next/image"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import styles from "../../style.module.css"

import "swiper/css";
import "swiper/swiper-bundle.css"

export function ImagesScroller({ images }: { images: { imageName: string }[] }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="overflow-hidden w-[350px] lg:w-[570px]">
        <Swiper pagination={{ clickable: true }} navigation={true} modules={[Navigation, Pagination]}>
          {
            images.map(({ imageName }, index) => (
              <SwiperSlide key={index}>
                <Image
                  className={`w-[100%] lg:w-[570px]`}
                  height={800} width={800} src={`https://dams-images.s3.eu-central-1.amazonaws.com/${imageName}`} alt="pic-product" />
              </SwiperSlide>
            )
            )}
        </Swiper>
      </div >
    </div >

  )
}
