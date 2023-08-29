import { Navbar } from "../_components/navbar"
import prismadb from "../../dashboard/_lib/prismadb"
import Image from "next/image"
import { Category, Product } from "@prisma/client"
import { DownFooter } from "../_components/footer"

type TProduct = Product & { imagesNames: Array<{ imageName: string }> };
type TCategory = Category & { Product: TProduct[] }

export default async function Page({ params }: { params: { categoryName: string } }) {
	const categoryname = params.categoryName
	const category: TCategory = await prismadb.category.findFirst({
		where: { name: categoryname },
		include: { Product: { include: { imagesNames: { select: { imageName: true } } } } }
	})

	return (
		<div className="max-w-[100%]  flex flex-col items-between min-h-[100vh] overflow-hidden text-whitish animate-fadeInFromUp">
			<Navbar variation={"withBg"} />
			<div className="lg:py-16 py-8 pb-16 px-4 flex-1 h-[100%]">
				<div className="">
					<p className="text-whitish lg:pl-20 text-start text-[35px] lg:text-[60px] font-bold uppercase" >{category.name}:</p>
				</div>
				<div className="flex flex-wrap lg:gap-y-14 gap-y-6 lg:gap-x-1 justify-start lg:p-10 lg:px-20 pt-5 ">
					{category.Product.map((product: TProduct) => <Itemo key={product.name} src={`/images/${category.name}/${product.name}/${product.imagesNames[0].imageName}`} descreption={product.name} price={product.price} />)}

				</div>
			</div>
			<DownFooter />
		</div>
	)
}

function Itemo({ src, descreption, price }: { src: string, descreption: string, price: number }) {
	return (
		<div className="pic-of-items">
			<div className="flex gap-[1px]  flex-col min-h-full lg:justify-between">
				<Image className="w-[350] lg:w-[420px] lg:h-[420px] h-[350]" alt="product image" height={800} width={800} src={src} />
				<p className="ml-[2px] lg:text-[22px] text-[20px] font-bold pt-[1px] leading-normal uppercase">{descreption}</p>
				<p className="ml-[2px] lg:text-[22px] text-[20px] font-medium leading-7">{price} DZD </p>
			</div>

		</div>

	)
}

