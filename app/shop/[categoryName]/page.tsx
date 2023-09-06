import { Navbar } from "../_components/navbar"
import Image from "next/image"
import { Category, Product } from "@prisma/client"
import { DownFooter } from "../_components/footer"
import { PuffSpinner } from "@/_components/ui/loader";
import Link from "next/link"

type TProduct = {
	id : string,
	name: string,
	price: number,
	imagesNames: { imageName: string }[]
}

export default async function Page({ params }: { params: { categoryName: string } }) {
	const categoryname = params.categoryName
	const res = await fetch("https://dams-shop.vercel.app/api/pages/home")
	const { categories } = await res.json();
	const category = categories.filter((category: Category) => category.name == categoryname)[0]

	return (
		<div className="max-w-[100%]  flex flex-col items-between min-h-[100vh] overflow-hidden text-whitish animate-fadeInFromUp">
			<Navbar variation={"withBg"} />
			<div className="lg:py-16 py-8 pb-4 lg:pb-16 px-4 flex-1 h-[100%]">
				<div className="">
					<p className="text-whitish lg:pl-20 text-start text-[35px] lg:text-[60px] font-bold uppercase" >{category?.name}:</p>
				</div>
				<div className="flex flex-wrap lg:gap-y-14 gap-y-6 lg:gap-x-1 justify-center lg:justify-start lg:p-10 lg:px-20 pt-5 ">
					{category?.Product.map((product: TProduct) => <Link key={product.name} href={`/shop/${categoryname}/${product.id}`}>
						<Itemo src={`/images/${category.name}/${product.name}/${product.imagesNames[0].imageName}`} descreption={product.name} price={product.price} /> </Link>
					)}

				</div>
			</div>
			<DownFooter />
		</div>
	)
}

function Itemo({ src, descreption, price }: { src: string, descreption: string, price: number }) {
	return (
		<div className="pic-of-items">
			<div className="flex gap-[1px] justify-center flex-col min-h-full lg:justify-between">
				<div className="bg-sd relative w-[350px] flex justify-center items-center lg:w-[420px] lg:h-[420px] h-[350px] animate-pulse">
					<div className="absolute z-0">
						<PuffSpinner color={"#D8B4A0"} />
					</div>
					<Image className="w-[350px] z-10 lg:w-[420px] lg:h-[420px] border-0 h-[350]" alt="product image" height={800} width={800} src={src} />
				</div>
				<p className="ml-[2px] lg:text-[22px] text-[20px] font-bold pt-[1px] leading-normal uppercase">{descreption}</p>
				<p className="ml-[2px] lg:text-[22px] text-[20px] font-medium leading-7">{price} DZD </p>
			</div>

		</div>

	)
}

