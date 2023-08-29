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
    <div ref={ref} className={clsx({ "opacity-100 translate-x-[0px]": inView }, "hover:p-2 translate-x-[-50px]  transition-all duration-700 ease-in-out")}>
      <Link href={"/shop"}>
        <div className={`p-4 relative hover:w-[270px] transition-all duration-700 hover:h-[220px] rounded-xl flex flex-col bg-pr items-center lg:w-[300px] lg:h-[250px] w-[260px] h-[210px]`}>
          <div className="flex flex-1 h-full w-[70%] justify-self-center items-center justify-center ">
            <Image
              src={`/images/${cate.name}/${cate.imageName[0].imageName}`}
              height={200}
              width={200}
              className="pb-10 h-full"
              style={{ objectFit: "contain" }}
              alt='category image' />
          </div>
          <p className="capitalize font-mr max-h-[50px] absolute  bottom-2 font-bold text-[33px]">{cate.name}</p>
        </div>
      </Link>
    </div>
  )

}
export function Categories({ categories }: PropsType) {
  return (
    <div>
      <Element name={'categories'}>
        <div className="bg-td flex flex-col justify-center items-center border-[2px] border-gold mx-1 lg:mx-2 gap-8 py-[40px] pb-[60px] ">
          <p className="text-black font-mr font-bold text-4xl pb-2 lg:text-[50px]">Our Categories</p>
          <div style={{ WebkitOverflowScrolling: "touch" }} className="flex lg:gap-8 flex-col lg:flex-row flex-wrap justify-center items-center gap-4">
            {categories.map((cate) => {
              return <CategoryEntry cate={cate} />
            }
            )}
          </div>
        </div>
      </Element>
    </div>
  )
}
