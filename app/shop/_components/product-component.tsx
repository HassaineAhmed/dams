import { Product } from "@prisma/client"
export default function ProductComponent({ product } : { product: Product }){
  return <div>
    product
  </div>
}
