import ProductComponent from "./product-component"
import { Product } from "@prisma/client"

export function TabSection({ products }: { products: Product[] }) {
  console.log("products : ", products)
  return (
    <div className="mx-7 border-y-[2px] border-gold mt-2 py-4">
      <div className="">
        <div className="flex justify-center gap-6 items-center">
          <p className="font-mr font-bold text-[19px] py-1 border-b-[1px] border-white">Trending</p>
          <p className="font-mr font-bold text-[19px] opacity-90">New Arrival</p>
          <p className="font-mr font-bold text-[19px] opacity-90">Coming</p>
        </div>
      </div>
    </div>
  )
}
