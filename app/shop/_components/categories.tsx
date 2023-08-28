"use client"
import Link from "next/link";
import Image from "next/image"
import { Category } from "@prisma/client";
import { useInView } from "react-intersection-observer"
import { clsx } from 'clsx';
import { Element } from "react-scroll"


type PropsType = {
  categories: Array<Category & { imageName: Array<{ imageName: string }> }>
}

function CategoryEntry({ cate }: { cate: Category & { imageName: Array<{ imageName: string }> } }) {
  const { inView, ref } = useInView();

  return (
    <div ref={ref} className={clsx({ "opacity-100 translate-x-[0px]": inView }, "translate-x-[-50px]  transition-all duration-700 ease-in-out")}>
      <Link href={"/shop"}>
        <div className={`p-4 relative rounded-xl flex flex-col bg-pr items-center w-[240px] h-[190px]`}>
          <div className="flex max-w-[70%] justify-self-center items-center justify-center ">
            <Image
              src={`/images/${cate.name}/${cate.imageName[0].imageName}`}
              height={200}
              width={200}
              style={{ height: '110px', width: 'auto', objectFit: "contain" }}
              alt='category image' />
          </div>
          <p className="capitalize font-mr  absolute  bottom-2 font-bold text-[33px]">{cate.name}</p>
        </div>
      </Link>
    </div>
  )

}
export function Categories({ categories }: PropsType) {
  return (
    <div>
        <div className="bg-td flex flex-col justify-center items-center gap-6 py-[40px] pb-[60px] ">
        <Element name={'categories'}>
          <p className="text-black font-mr font-bold text-4xl pb-2">Our Categories</p>
          <div style={{ WebkitOverflowScrolling: "touch" }} className="flex flex-col lg:flex-row flex-wrap justify-center items-center gap-4">
            {categories.map((cate) => {
              return <CategoryEntry cate={cate} />
            }
            )}
          </div>
        </Element>
        </div>
    </div>
  )
}
