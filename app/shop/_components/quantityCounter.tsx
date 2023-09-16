import { Plus, Minus } from "lucide-react";

export function QuantityCounter({ variation, quantity, setQuantity }: any) {
  return (
    <div className="grid gap-1">
      <p className="tracking-wide text-[20px] uppercase font-bold leading-10">QUANTITY: </p>
      <div className="flex justify-start">
        <div className={`flex border-gold border-[2px] text-whitish gap-0 items-center ${variation == 2 ? "bg-pr" : "bg-sd"}`}>
          <div
            className="px-4 py-1 cursor-pointer"
            onClick={() => { if (quantity != 1) { setQuantity((prev: any) => prev - 1) } }}>
            <Minus color="#D8B4A0" />
          </div>
          <p className="px-4 py-1 border-x-[2px] border-gold text-whitish text-[30px] font-bold">
            {quantity}
          </p>
          <div
            className="px-4 py-1 cursor-pointer"
            onClick={() => { setQuantity((prev: any) => prev + 1) }}>
            <Plus color="#D8B4A0" />
          </div>
        </div>
      </div>
    </div>
  )
}
