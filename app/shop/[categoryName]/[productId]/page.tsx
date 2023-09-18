import { Navbar } from "../../_components/navbar"

import { DownFooter } from "../../_components/footer"
import { ImagesScroller } from "../../_components/imagesScroller"
import { BuyForm1 } from "../../_components/buyForm1"
import { Product } from "@prisma/client"
import { NotFoundPage } from "../../_components/notFoundPage"

type TProduct = Product & {
	imagesNames: { imageName: string }[]
}

export default async function Page({ params }: { params: { categoryName: string, productId: string } }) {
	const productId = params.productId
	const categoryName = params.categoryName
	const res = await fetch("https://dams-shop.vercel.app/api/pages/home", { next: { tags: ["mainData"] } })
	const data = await res.json()

	let products = data.products
	const product: TProduct = products.filter((product: Product) => product.id == productId)[0];
	if (!product) {
		return <NotFoundPage />
	}

	const productinfoFirst = "uppercase lg:text-[2.9rem] text-[29px] font-bold leading-10"
	const productinfoFirst2 = " uppercase lg:text-[2.6rem] text-[29px] font-bold leading-10"
	const productinfoSecond = "text-gold w-96 text-[19px] lg:text-[1.47rem] text-gold font-bold leading-relaxed tracking-widest"
	const productinfoSecondSpan = "inline-block h-6 text-whitish text-[17px] leading-relaxed font-regular font-[600] font-lora"
	return (
		<div className="flex flex-col min-h-[100vh] text-whitish animate-fadeInFromUp">
			<Navbar variation={"withBg"} />
			<div className="flex justify-center items-start py-[40px] lg:py-2 lg:pt-[90px] min-h-[100vh]">
				<div className="flex  flex-col lg:flex-row gap-5 lg:gap-8">
					<ImagesScroller images={product.imagesNames} />
					<div className="max-w-[350px] lg:max-w-[100vw] flex gap-2 lg:gap-4 flex-col lg:pl-[3rem]">
						<div className="lg:gap-5 flex-col flex">
							<p className={productinfoFirst}>{product.name}</p>
							<p className={productinfoFirst2}>{product.price} DZD</p>
						</div>

						<div className="flex flex-col ">
							<p className={productinfoSecond} >MATERIAL: <span className={productinfoSecondSpan} >81%coton, 19%els</span></p>
							<p className={productinfoSecond} >FIT: <span className={productinfoSecondSpan}>81%coton, 19%els</span></p>
							<p className={productinfoSecond}>DESIGN: <span className={productinfoSecondSpan}>81%coton, 19%els</span> </p>
						</div>

						<BuyForm1 categoryName={categoryName} productId={productId} />

					</div>
				</div>
			</div>

			<DownFooter />
		</div>

	)
}

{/*
				<div className={bigParent}>
					

					</div>
									</div>
				<div className="rest-text">

				</div> */}
