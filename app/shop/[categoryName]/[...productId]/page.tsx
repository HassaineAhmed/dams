import { Navbar } from "../../_components/navbar"

import { DownFooter } from "../../_components/footer"
import { SizerPicker } from "../../_components/sizesPicker"
import { ImagesScroller } from "../../_components/imagesScroller"

import { Product } from "@prisma/client"

type TProduct = Product & {
	imagesNames: { imageName: string }[]
}

export default async function Page({ params }: { params: { productId: string } }) {
	await fetch("http://localhost:3000/api/revalidate-data")
	const productId = params.productId[0]
	//const [size, SetSize] = useState("")
	const res = await fetch("http://localhost:3000/api/pages/home")
	const data = await res.json()

	let products = data.products
	const product: TProduct = products.filter((product: Product) => product.id == productId)[0];

	const bigParent = "bigParent flex flex-row flex-wrap gap-0 justify-center"
	const productinfoFirst = "uppercase text-[2.9rem] font-bold leading-10"
	const productinfoSecond = "text-gold w-96 text-[1.47rem] font-bold leading-relaxed tracking-widest"
	const productinfoSecondSpan = "inline-block  h-6 text-whitish text-[1.2rem] leading-relaxed font-regular font-[400] font-mr"
	const sizeP = "text-xl font-bold leading-10 "
	const buydiv = "mt-3 ml-0 px-[5%]   h-12 bg-teal-900 border border-gold text-center"
	const buybutton = "mt-2 text-[2.75rem]  pb-[1.3rem] pt-[1rem] font-bold leading-10 w-[20rem]  bg-teal-900 border border-gold"
	const sizechart = "w-[9.5rem] pl-[0.2rem] pr-[0.2rem] pt-[0.4rem] bg-teal-900 border border-gold "
	return (
		<div className="max-w-[100%] flex flex-col min-h-[100vh] overflow-hidden text-whitish animate-fadeInFromUp">
			<Navbar variation={"withBg"} />

			<div className="flex flex-col lg:flex-row h-[100%]  lg:pt-[90px] pt-10 flex-1 justify-center items-center gap-8">
				<ImagesScroller images={product.imagesNames} />
				{/* ----------------------------------- */}
				<div className="productinfo flex flex-wrap gap-8 flex-col pl-[3rem] pb-[8%] lg:h-[100vh]">

					<div className="gap-5 flex-col flex">
						<p className={productinfoFirst}>{product.name}</p>
						<p className={productinfoFirst}>{product.price} DZD</p>
					</div>

					<div className="flex flex-col gap-2">
						<p className={productinfoSecond} >MATERIAL: <span className={productinfoSecondSpan} >81%coton, 19%els</span></p>
						<p className={productinfoSecond} >FIT: <span className={productinfoSecondSpan}>81%coton, 19%els</span></p>
						<p className={productinfoSecond}>DESIGN: <span className={productinfoSecondSpan}>81%coton, 19%els</span> </p>
					</div>

					<SizerPicker />

					<button className={buybutton}>BUY NOW</button>
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
