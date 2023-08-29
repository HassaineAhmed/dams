import Image from "next/image"
import { Product } from "@prisma/client"

export default function ProductComponent({ product }: { product: Product & { imagesNames: Array<{ imageName: string }> } }) {
  if (!product) {
    return <></>
  }
  return <div className="flex max-w-[50vw] lg:max-w-[405px] justify-center items-center">
    <div className="flex flex-col justify-center items-start gap-2">
      <Image src={`/images/${product.categoryName}/${product.name}/${product.imagesNames[0].imageName}`} height={800} width={800} alt="product" />
      <div className="flex flex-col justify-start ml-[1px] items-start gap-0">
        <p className="uppercase font-bold text-[15px]  lg:text-[25px] lg:font-bold font-mr">{product.name}</p>
        <p className="text-[15px] font-semibold lg:font-medium lg:text-[22px]">{product.price} DZD</p>
      </div>
    </div>
  </div>
}
