import Image from "next/image"
import { Product } from "@prisma/client"
import { PuffSpinner } from "../../dashboard/_components/ui/loader"

export default function ProductComponent({ product }: { product: Product & { imagesNames: Array<{ imageName: string }> } }) {
	if (!product) {
		return <></>
	}
	return <div className="flex max-w-[50vw] lg:max-w-[405px] justify-center items-center">
		<div className="flex flex-col justify-center items-start gap-2">
			<div className="p-0 w-auto px-0 mx-0 overflow-hidden flex justify-center items-center animate-pulse">
				<div className="absolute z-0">
					<PuffSpinner color={"#D8B4A0"} />
				</div>
				<Image className="z-10 bg-sd" src={`https://dams-images.s3.eu-central-1.amazonaws.com/${product.imagesNames[0].imageName}`} height={800} width={800} alt="product" />
			</div>
			<div className="flex flex-col justify-start ml-[1px] items-start gap-0">
				<p className="uppercase font-bold text-[15px]  lg:text-[25px] lg:font-bold font-mr">{product.name}</p>
				<p className="text-[15px] font-semibold lg:font-medium lg:text-[22px]">{product.price} DZD</p>
			</div>
		</div>
	</div>
}
