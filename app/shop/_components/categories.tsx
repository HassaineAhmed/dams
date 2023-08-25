import Link from "next/link";
import Image from "next/image"
import { Category } from "@prisma/client";

type PropsType = {
  categories: Array<Category & { imageName: Array<{ imageName: string }> }>
}

export function Categories({ categories }: PropsType) {
  return (
    <div className="bg-td flex flex-col justify-center items-center gap-6 py-6 ">
      <p className="text-black font-mr font-bold text-3xl">Our Categories</p>
      <div className="flex flex-col gap-4">
        {categories.map((cate) =>
          <Link href={"/shop"}>
            <div className="bg-sd p-4 relative items-center rounded-xl flex flex-col items-center w-[280px] h-[200px]">
              <div className="flex h-[130px] max-w-[60%] items-center justify-center ">
                <Image
                  src={`/images/${cate.name}/${cate.imageName[0].imageName}`}
                  height={200}
                  width={200}
                  style={{ maxHeight: '130px', width: 'auto', objectFit: "contain" }}
                  alt='category image' />
              </div>
              <p className="capitalize font-mr  absolute  bottom-2 font-bold text-[33px]">{cate.name}</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}
