import { Plus, Minus } from "lucide-react";

export function QuantityCounter({ quantity, setQuantity }: any) {
  return (
    <div className="grid gap-3">
      <p className="tracking-wide6 text-[2.145rem] font-bold leading-10">QUANTITY: </p>
      <div className="flex justify-start">
        <div className="flex border-gold border-[1px] bg-sd text-whitish gap-0 items-center">
          <button
            className="px-4 py-1"
            onClick={() => { if (quantity != 1) { setQuantity((prev: any) => prev - 1) } }}>
            <Minus color="#D8B4A0" />
          </button>
          <p className="px-4 py-1 border-x-[1px] border-gold text-whitish text-[30px] font-bold">
            {quantity}
          </p>
          <button
            className="px-4 py-1"
            onClick={() => { setQuantity((prev: any) => prev + 1) }}>
            <Plus color="#D8B4A0" />
          </button>
        </div>
      </div>
    </div>
  )
}
