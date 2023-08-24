import Link from "next/link";
import Image from "next/image"
import { Category } from "@prisma/client";

export function Categories({ categories }: Category[]) {
  console.log(categories)
  return (<div className="bg-td grid justify-center items-center">
    <p className="text-black font-bold font-xl">Our Categories</p>

    {categories.map((cate: Category) => <div className="bg-sd flex-col rounded-xl w-[100px] h-[60px]">
      <Image src={`/images/${cate.name}/${cate.imageName[0].imageName}`} width={400} height={400} alt='category image' />
    </div>
    )}

  </div>
  )
}
