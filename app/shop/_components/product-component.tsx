import Image from "next/image"
import { Product } from "@prisma/client"

export default function ProductComponent({ product }: { product: Product }) {
  if (!product) {
    return <></>
  }
  return <div className="flex max-w-[50vw] justify-center items-center w-full">
    <div className="flex flex-col justify-center items-start gap-2">
      <Image src={`/images/${product.categoryName}/${product.name}/${product.imagesNames[0].imageName}`} height={800} width={800} alt="product" />
      <div className="flex flex-col justify-start ml-1 items-start gap-0">
        <p className="font-bold text-[15px]">{product.name}</p>
        <p className="text-[15px] font-semibold">{product.price} DZD</p>
      </div>
    </div>
  </div>
}
