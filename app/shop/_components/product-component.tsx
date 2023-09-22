import Image from "next/image"
import { Product } from "@prisma/client"
import { PuffSpinner } from "../../dashboard/_components/ui/loader"
import Link from "next/link"


export default function ProductComponent({ product }: { product: Product & { imagesNames: Array<{ imageName: string }> } }) {
	if (!product) {
		return <></>
	}
	return <Link href={`/shop/${product.categoryName}/${product.id}/`} className="flex mx-[0px] lg:mx-[8px] max-w-[180px] lg:max-w-[420px] justify-center items-center">
		<div className="flex flex-col justify-center items-start gap-2">
			<div className="bg-sd relative max-w-[180px] flex justify-center items-center lg:max-w-[420px] lg:max-h-[420px] max-h-[180px] animate-pulse">
				<div className="absolute z-0">
					<PuffSpinner color={"#D8B4A0"} />
				</div>
				<Image className="w-[180px] z-10 lg:w-[420px] lg:h-[420px] border-0 h-[160]" alt="product image" height={800} width={800} src={`https://dams-images.s3.eu-central-1.amazonaws.com/${product.imagesNames[0].imageName}`} />
			</div>
			<div className="flex flex-col justify-start ml-[1px] items-start gap-0">
				<p className="uppercase font-bold text-[15px]  lg:text-[23px] lg:font-bold font-mr">{product.name}</p>
				<p className="text-[15px] font-semibold lg:font-medium lg:text-[22px]">{product.price} DZD</p>
			</div>
		</div>
	</Link>
}
